"""
Export demand forecasting model visualizations to JSON format for website.
This script trains the demand prediction model and exports all required visualizations.
"""

import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.utils
import json
from pathlib import Path
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb

print("Loading data...")

# Load the filtered data
data_path = Path(__file__).parent.parent / 'data' / 'columbia_filtered_citibike.csv'
df = pd.read_csv(data_path, parse_dates=['started_at', 'ended_at'])

print(f"Loaded {len(df):,} trips")

# Columbia station IDs
columbia_stations = [
	'7783.18',  # Broadway & W 122 St
	'7741.04',  # Morningside Dr & Amsterdam Ave
	'7745.07',  # W 120 St & Claremont Ave
	'7727.07',  # Amsterdam Ave & W 119 St
	'7713.11',  # W 116 St & Broadway
	'7692.11',  # W 116 St & Amsterdam Ave
	'7713.01'   # W 113 St & Broadway
]

# Load academic calendar
calendar_path = Path(__file__).parent.parent / 'data' / 'columbia_academic_calendar.csv'
academic_calendar = pd.read_csv(calendar_path, parse_dates=['date'])

print(f"Loaded {len(academic_calendar)} academic calendar events")

# Extract academic calendar features
semester_starts = academic_calendar[academic_calendar['event_type'] == 'semester_start']['date'].tolist()
semester_ends = academic_calendar[academic_calendar['event_type'] == 'semester_end']['date'].tolist()
holidays = academic_calendar[academic_calendar['event_type'] == 'holiday']['date'].tolist()
finals_dates = academic_calendar[academic_calendar['event_type'] == 'finals']['date'].tolist()
study_days = academic_calendar[academic_calendar['event_type'] == 'study_day']['date'].tolist()
breaks = academic_calendar[academic_calendar['event_type'].str.contains('break')]['date'].tolist()

# Define active semester periods
semester_periods = []
for start in semester_starts:
	corresponding_ends = [e for e in semester_ends if e > start]
	if corresponding_ends:
		end = min(corresponding_ends)
		semester_periods.append((start, end))

print("Aggregating data to hourly level...")

# Extract hour from timestamps
df['start_hour'] = df['started_at'].dt.floor('H')
df['end_hour'] = df['ended_at'].dt.floor('H')

# Calculate departures
departures = df[df['start_station_id'].isin(columbia_stations)].groupby(
	['start_station_id', 'start_hour']
).size().reset_index(name='departures')
departures.columns = ['station_id', 'hour', 'departures']

# Calculate arrivals
arrivals = df[
	(df['end_station_id'].isin(columbia_stations)) &
	(df['end_station_id'].notna())
].groupby(['end_station_id', 'end_hour']).size().reset_index(name='arrivals')
arrivals.columns = ['station_id', 'hour', 'arrivals']

# Merge
station_hours = departures.merge(arrivals, on=['station_id', 'hour'], how='outer')
station_hours['departures'] = station_hours['departures'].fillna(0).astype(int)
station_hours['arrivals'] = station_hours['arrivals'].fillna(0).astype(int)
station_hours['net_flow'] = station_hours['arrivals'] - station_hours['departures']

# Create complete time series
min_hour = station_hours['hour'].min()
max_hour = station_hours['hour'].max()
all_hours = pd.date_range(start=min_hour, end=max_hour, freq='H')

all_combinations = pd.MultiIndex.from_product(
	[columbia_stations, all_hours],
	names=['station_id', 'hour']
).to_frame(index=False)

station_hours = all_combinations.merge(station_hours, on=['station_id', 'hour'], how='left')
station_hours['departures'] = station_hours['departures'].fillna(0).astype(int)
station_hours['arrivals'] = station_hours['arrivals'].fillna(0).astype(int)
station_hours['net_flow'] = station_hours['net_flow'].fillna(0).astype(int)

print(f"Created station-hour dataset: {len(station_hours):,} rows")

print("Engineering features...")

# Extract date components
station_hours['date'] = station_hours['hour'].dt.date
station_hours['hour_of_day'] = station_hours['hour'].dt.hour
station_hours['day_of_week'] = station_hours['hour'].dt.dayofweek
station_hours['month'] = station_hours['hour'].dt.month
station_hours['is_weekend'] = (station_hours['day_of_week'] >= 5).astype(int)

# Cyclical encoding
station_hours['hour_sin'] = np.sin(2 * np.pi * station_hours['hour_of_day'] / 24)
station_hours['hour_cos'] = np.cos(2 * np.pi * station_hours['hour_of_day'] / 24)
station_hours['day_sin'] = np.sin(2 * np.pi * station_hours['day_of_week'] / 7)
station_hours['day_cos'] = np.cos(2 * np.pi * station_hours['day_of_week'] / 7)
station_hours['month_sin'] = np.sin(2 * np.pi * (station_hours['month'] - 1) / 12)
station_hours['month_cos'] = np.cos(2 * np.pi * (station_hours['month'] - 1) / 12)

# Rush hour
station_hours['is_rush_hour'] = (
	(station_hours['is_weekend'] == 0) &
	(
		((station_hours['hour_of_day'] >= 7) & (station_hours['hour_of_day'] <= 9)) |
		((station_hours['hour_of_day'] >= 16) & (station_hours['hour_of_day'] <= 18))
	)
).astype(int)

# Academic calendar features
station_hours['date'] = pd.to_datetime(station_hours['date'])

def is_in_semester(date):
	for start, end in semester_periods:
		if start <= date <= end:
			return 1
	return 0

station_hours['is_semester'] = station_hours['date'].apply(is_in_semester)

holidays_set = set(pd.to_datetime(holidays))
national_holidays = [
	'2024-01-01', '2024-07-04', '2024-12-25', '2024-12-31',
	'2025-01-01', '2025-07-04', '2025-12-25', '2025-12-31'
]
national_holidays_set = set(pd.to_datetime(national_holidays))
all_holidays = holidays_set.union(national_holidays_set)
station_hours['is_holiday'] = station_hours['date'].isin(all_holidays).astype(int)

finals_set = set(pd.to_datetime(finals_dates))
station_hours['is_finals'] = station_hours['date'].isin(finals_set).astype(int)

study_days_set = set(pd.to_datetime(study_days))
station_hours['is_study_day'] = station_hours['date'].isin(study_days_set).astype(int)

breaks_set = set(pd.to_datetime(breaks))
station_hours['is_break'] = station_hours['date'].isin(breaks_set).astype(int)

def days_since_semester_start(date):
	past_starts = [s for s in semester_starts if s <= date]
	if past_starts:
		most_recent_start = max(past_starts)
		return (date - most_recent_start).days
	return 999

station_hours['days_since_semester_start'] = station_hours['date'].apply(days_since_semester_start)

# Sort by station and time for lag features
station_hours = station_hours.sort_values(['station_id', 'hour']).reset_index(drop=True)

# Lag features
station_hours['departures_lag_1h'] = station_hours.groupby('station_id')['departures'].shift(1)
station_hours['departures_lag_24h'] = station_hours.groupby('station_id')['departures'].shift(24)
station_hours['departures_lag_168h'] = station_hours.groupby('station_id')['departures'].shift(168)
station_hours['arrivals_lag_1h'] = station_hours.groupby('station_id')['arrivals'].shift(1)
station_hours['total_trips_lag_1h'] = station_hours['departures_lag_1h'] + station_hours['arrivals_lag_1h']

# Rolling averages
station_hours['departures_rolling_avg_24h'] = station_hours.groupby('station_id')['departures'].transform(
	lambda x: x.rolling(window=24, min_periods=1).mean()
)
station_hours['departures_rolling_avg_7d'] = station_hours.groupby('station_id')['departures'].transform(
	lambda x: x.rolling(window=168, min_periods=1).mean()
)

# System-wide features
system_wide = station_hours.groupby('hour').agg({
	'departures': 'sum',
	'arrivals': 'sum'
}).reset_index()
system_wide.columns = ['hour', 'system_departures', 'system_arrivals']

station_hours = station_hours.merge(system_wide, on='hour', how='left')
station_hours = station_hours.sort_values('hour').reset_index(drop=True)
station_hours['system_departures_lag_1h'] = station_hours['system_departures'].shift(1)
station_hours['system_total_trips_lag_1h'] = (
	station_hours['system_departures'].shift(1) + station_hours['system_arrivals'].shift(1)
)
station_hours = station_hours.sort_values(['station_id', 'hour']).reset_index(drop=True)

# Interaction features
station_hours['semester_weekday'] = (
	station_hours['is_semester'] * (1 - station_hours['is_weekend'])
)
station_hours['hour_weekend_interaction'] = (
	station_hours['hour_of_day'] * station_hours['is_weekend']
)

# Historical average
historical_avg = station_hours.groupby(
	['station_id', 'hour_of_day', 'is_weekend']
)['departures'].transform('mean')
station_hours['historical_avg_departures'] = historical_avg

print("Preparing data for modeling...")

# Drop NaN rows from lag features
station_hours_clean = station_hours.dropna(subset=[
	'departures_lag_1h', 'departures_lag_24h', 'departures_lag_168h', 'system_departures_lag_1h'
]).copy()

# Time-based split
train_end = pd.Timestamp('2025-08-31 23:00:00')
val_end = pd.Timestamp('2025-09-30 23:00:00')

train_data = station_hours_clean[station_hours_clean['hour'] <= train_end].copy()
val_data = station_hours_clean[
	(station_hours_clean['hour'] > train_end) &
	(station_hours_clean['hour'] <= val_end)
].copy()
test_data = station_hours_clean[station_hours_clean['hour'] > val_end].copy()

print(f"Train: {len(train_data):,} rows")
print(f"Val: {len(val_data):,} rows")
print(f"Test: {len(test_data):,} rows")

# Feature columns
feature_cols = [
	'hour_sin', 'hour_cos', 'day_sin', 'day_cos', 'month_sin', 'month_cos',
	'is_weekend', 'is_rush_hour',
	'is_semester', 'is_holiday', 'is_finals', 'is_study_day', 'is_break',
	'days_since_semester_start',
	'departures_lag_1h', 'departures_lag_24h', 'departures_lag_168h',
	'arrivals_lag_1h', 'total_trips_lag_1h',
	'departures_rolling_avg_24h', 'departures_rolling_avg_7d',
	'system_departures_lag_1h', 'system_total_trips_lag_1h',
	'historical_avg_departures',
	'semester_weekday', 'hour_weekend_interaction'
]

# Encode station_id
le = LabelEncoder()
station_hours_clean['station_id_encoded'] = le.fit_transform(station_hours_clean['station_id'])
train_data['station_id_encoded'] = le.transform(train_data['station_id'])
val_data['station_id_encoded'] = le.transform(val_data['station_id'])
test_data['station_id_encoded'] = le.transform(test_data['station_id'])

feature_cols.append('station_id_encoded')

# Prepare X and y
X_train = train_data[feature_cols]
y_train = train_data['departures']

X_val = val_data[feature_cols]
y_val = val_data['departures']

X_test = test_data[feature_cols]
y_test = test_data['departures']

print("\nTraining models...")

# Baseline
y_pred_baseline = test_data['historical_avg_departures'].values
mae_baseline = mean_absolute_error(y_test, y_pred_baseline)
rmse_baseline = np.sqrt(mean_squared_error(y_test, y_pred_baseline))
r2_baseline = r2_score(y_test, y_pred_baseline)

print(f"Baseline - MAE: {mae_baseline:.3f}, R²: {r2_baseline:.3f}")

# Linear Regression
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
y_pred_lr = lr_model.predict(X_test)
mae_lr = mean_absolute_error(y_test, y_pred_lr)
rmse_lr = np.sqrt(mean_squared_error(y_test, y_pred_lr))
r2_lr = r2_score(y_test, y_pred_lr)

print(f"Linear Regression - MAE: {mae_lr:.3f}, R²: {r2_lr:.3f}")

# Random Forest
rf_model = RandomForestRegressor(
	n_estimators=200,
	max_depth=20,
	min_samples_split=5,
	random_state=42,
	n_jobs=-1
)
rf_model.fit(X_train, y_train)
y_pred_rf = rf_model.predict(X_test)
mae_rf = mean_absolute_error(y_test, y_pred_rf)
rmse_rf = np.sqrt(mean_squared_error(y_test, y_pred_rf))
r2_rf = r2_score(y_test, y_pred_rf)

print(f"Random Forest - MAE: {mae_rf:.3f}, R²: {r2_rf:.3f}")

# XGBoost
xgb_model = xgb.XGBRegressor(
	n_estimators=500,
	learning_rate=0.05,
	max_depth=7,
	subsample=0.8,
	colsample_bytree=0.8,
	reg_alpha=0.1,
	reg_lambda=1.0,
	min_child_weight=3,
	random_state=42,
	n_jobs=-1,
	early_stopping_rounds=50
)

xgb_model.fit(
	X_train, y_train,
	eval_set=[(X_val, y_val)],
	verbose=0
)

y_pred_xgb = xgb_model.predict(X_test)
mae_xgb = mean_absolute_error(y_test, y_pred_xgb)
rmse_xgb = np.sqrt(mean_squared_error(y_test, y_pred_xgb))
r2_xgb = r2_score(y_test, y_pred_xgb)

print(f"XGBoost - MAE: {mae_xgb:.3f}, R²: {r2_xgb:.3f}")

# Create output directory
output_dir = Path(__file__).parent.parent / 'frontend' / 'public' / 'data' / 'forecasting'
output_dir.mkdir(parents=True, exist_ok=True)

print(f"\nExporting visualizations to {output_dir}...")

# 1. Model Comparison
print("Generating model comparison chart...")
models = ['Baseline\n(Historical Avg)', 'Linear\nRegression', 'Random\nForest', 'XGBoost']
mae_values = [mae_baseline, mae_lr, mae_rf, mae_xgb]
r2_values = [r2_baseline, r2_lr, r2_rf, r2_xgb]
rmse_values = [rmse_baseline, rmse_lr, rmse_rf, rmse_xgb]

fig_comparison = make_subplots(
	rows=1, cols=3,
	subplot_titles=('MAE (lower is better)', 'R² (higher is better)', 'RMSE (lower is better)')
)

fig_comparison.add_trace(
	go.Bar(x=models, y=mae_values, name='MAE', marker_color='#0070f3', showlegend=False),
	row=1, col=1
)
fig_comparison.add_trace(
	go.Bar(x=models, y=r2_values, name='R²', marker_color='#0070f3', showlegend=False),
	row=1, col=2
)
fig_comparison.add_trace(
	go.Bar(x=models, y=rmse_values, name='RMSE', marker_color='#0070f3', showlegend=False),
	row=1, col=3
)

fig_comparison.update_yaxes(title_text='MAE (departures)', row=1, col=1)
fig_comparison.update_yaxes(title_text='R² Score', row=1, col=2)
fig_comparison.update_yaxes(title_text='RMSE (departures)', row=1, col=3)

fig_comparison.update_layout(
	height=400,
	title_text='Model Performance Comparison',
	template='plotly_white'
)

with open(output_dir / 'model_comparison.json', 'w') as f:
	json.dump(fig_comparison.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print("✓ Saved model_comparison.json")

# 2. Feature Importance
print("Generating feature importance chart...")
feature_importance_xgb = pd.DataFrame({
	'feature': feature_cols,
	'importance': xgb_model.feature_importances_
}).sort_values('importance', ascending=False).head(15)

fig_importance = px.bar(
	feature_importance_xgb,
	x='importance',
	y='feature',
	orientation='h',
	title='XGBoost: Top 15 Features for Departure Prediction',
	labels={'importance': 'Importance Score', 'feature': 'Feature'},
	color_discrete_sequence=['#0070f3']
)

fig_importance.update_layout(
	height=500,
	yaxis={'categoryorder': 'total ascending'}
)

with open(output_dir / 'feature_importance.json', 'w') as f:
	json.dump(fig_importance.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print("✓ Saved feature_importance.json")

# 3. Time Series Prediction (sample station)
print("Generating time series prediction chart...")
sample_station = '7713.01'
sample_data = test_data[test_data['station_id'] == sample_station].copy()
sample_data['predicted_departures'] = y_pred_xgb[:len(sample_data)]

fig_timeseries = go.Figure()
fig_timeseries.add_trace(go.Scatter(
	x=sample_data['hour'],
	y=sample_data['departures'],
	mode='lines',
	name='Actual Departures',
	line=dict(color='#0070f3', width=2)
))
fig_timeseries.add_trace(go.Scatter(
	x=sample_data['hour'],
	y=sample_data['predicted_departures'],
	mode='lines',
	name='Predicted Departures',
	line=dict(color='#ff6b6b', width=2, dash='dash')
))

fig_timeseries.update_layout(
	title='Actual vs Predicted Departures: W 113 St & Broadway (October 2025)',
	xaxis_title='Date/Time',
	yaxis_title='Departures (Demand)',
	height=500,
	template='plotly_white',
	hovermode='x unified'
)

with open(output_dir / 'time_series_prediction.json', 'w') as f:
	json.dump(fig_timeseries.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print("✓ Saved time_series_prediction.json")

# 4. Model Summary
print("Generating model summary...")
model_summary = {
	'best_model': 'XGBoost - Departures',
	'mae': round(mae_xgb, 3),
	'rmse': round(rmse_xgb, 3),
	'r2': round(r2_xgb, 3),
	'total_trips': 529908,
	'stations': 7,
	'date_range': {
		'start': '2024-01-01',
		'end': '2025-10-31'
	},
	'test_mean_departures': round(y_test.mean(), 2),
	'features_used': len(feature_cols),
	'train_samples': len(train_data),
	'test_samples': len(test_data)
}

with open(output_dir / 'model_summary.json', 'w') as f:
	json.dump(model_summary, f, indent=2)

print("✓ Saved model_summary.json")

print(f"\n✅ Export complete! Generated 4 files in {output_dir}")
print(f"   - model_comparison.json")
print(f"   - feature_importance.json")
print(f"   - time_series_prediction.json")
print(f"   - model_summary.json")

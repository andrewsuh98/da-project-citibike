"""
Export visualizations from temporal patterns analysis to JSON format.
This script generates all charts for the website.
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import plotly.utils
import json
from pathlib import Path

# Load the filtered data
data_path = Path(__file__).parent.parent / 'data' / 'columbia_filtered_citibike.csv'
df = pd.read_csv(data_path, parse_dates=['started_at', 'ended_at'])

print(f"Loaded {len(df):,} trips")

# Calculate trip duration
df['trip_duration_minutes'] = (df['ended_at'] - df['started_at']).dt.total_seconds() / 60

# Filter out trips with no end station and negative durations
df = df[~df["end_station_id"].isna()]
df = df[df['trip_duration_minutes'] > 0]

# Extract temporal features
df['hour_of_day'] = df['started_at'].dt.hour
df['day_of_week'] = df['started_at'].dt.dayofweek
df['day_name'] = df['started_at'].dt.day_name()
df['month'] = df['started_at'].dt.month
df['month_name'] = df['started_at'].dt.strftime('%Y-%m')
df['date'] = df['started_at'].dt.date
df['is_weekend'] = df['day_of_week'] >= 5

# Season mapping
def get_season(month):
	if month in [12, 1, 2]:
		return 'Winter'
	elif month in [3, 4, 5]:
		return 'Spring'
	elif month in [6, 7, 8]:
		return 'Summer'
	else:
		return 'Fall'

df['season'] = df['month'].apply(get_season)

# Time period categorization
def get_time_period(hour):
	if 6 <= hour < 10:
		return 'Morning Rush'
	elif 10 <= hour < 16:
		return 'Midday'
	elif 16 <= hour < 20:
		return 'Evening Rush'
	else:
		return 'Night'

df['time_period'] = df['hour_of_day'].apply(get_time_period)

print(f"Processing {len(df):,} trips after filtering")

# Create output directory
output_dir = Path(__file__).parent.parent / 'frontend' / 'public' / 'data' / 'temporal'
output_dir.mkdir(parents=True, exist_ok=True)

# 1. Hourly trips bar chart
print("Generating hourly trips chart...")
hourly_trips = df.groupby('hour_of_day').size().reset_index(name='trip_count')

fig_hourly = px.bar(
	hourly_trips,
	x='hour_of_day',
	y='trip_count',
	title='Total Trips by Hour of Day',
	labels={'hour_of_day': 'Hour of Day', 'trip_count': 'Number of Trips'},
	color_discrete_sequence=['#0070f3']
)

fig_hourly.update_layout(
	xaxis=dict(tickmode='linear', tick0=0, dtick=1),
	height=400
)

# Export to JSON using Plotly's JSON encoder
with open(output_dir / 'hourly_trips.json', 'w') as f:
	json.dump(fig_hourly.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved hourly_trips.json")

# 2. Day/Hour heatmap
print("Generating day/hour heatmap...")
day_hour_pivot = df.groupby(['day_name', 'hour_of_day']).size().reset_index(name='trip_count')

# Order days properly
day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_hour_pivot['day_name'] = pd.Categorical(day_hour_pivot['day_name'], categories=day_order, ordered=True)
day_hour_pivot = day_hour_pivot.sort_values('day_name')

# Pivot for heatmap
heatmap_data = day_hour_pivot.pivot(index='day_name', columns='hour_of_day', values='trip_count')

fig_heatmap = px.imshow(
	heatmap_data,
	labels=dict(x='Hour of Day', y='Day of Week', color='Trips'),
	x=heatmap_data.columns,
	y=heatmap_data.index,
	color_continuous_scale='Blues',
	aspect='auto',
	title='Trip Activity Heatmap: Day of Week × Hour of Day'
)

fig_heatmap.update_layout(height=500)

with open(output_dir / 'day_hour_heatmap.json', 'w') as f:
	json.dump(fig_heatmap.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved day_hour_heatmap.json")

# 3. Summary statistics
print("Generating summary statistics...")
total_days = (df['started_at'].max() - df['started_at'].min()).days + 1

# Calculate distance using haversine formula
import numpy as np

def haversine_distance(lat1, lon1, lat2, lon2):
	R = 6371  # Earth radius in km
	lat1, lon1, lat2, lon2 = np.radians(lat1), np.radians(lon1), np.radians(lat2), np.radians(lon2)
	dlat = lat2 - lat1
	dlon = lon2 - lon1
	a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
	c = 2 * np.arcsin(np.sqrt(a))
	return R * c

df['distance_km'] = haversine_distance(
	df['start_lat'].values, df['start_lng'].values,
	df['end_lat'].values, df['end_lng'].values
)

max_duration_minutes = df['trip_duration_minutes'].max()
max_distance_km = df['distance_km'].max()

summary_stats = {
	'total_trips': int(len(df)),
	'date_range': {
		'start': df['started_at'].min().strftime('%Y-%m-%d'),
		'end': df['started_at'].max().strftime('%Y-%m-%d')
	},
	'total_days': total_days,
	'avg_trips_per_day': round(len(df) / total_days, 1),
	'user_distribution': {
		'member': int((df['member_casual'] == 'member').sum()),
		'casual': int((df['member_casual'] == 'casual').sum()),
		'member_percentage': round((df['member_casual'] == 'member').sum() / len(df) * 100, 1)
	},
	'bike_distribution': {
		'classic_bike': int((df['rideable_type'] == 'classic_bike').sum()),
		'electric_bike': int((df['rideable_type'] == 'electric_bike').sum()),
		'electric_percentage': round((df['rideable_type'] == 'electric_bike').sum() / len(df) * 100, 1)
	},
	'trip_duration': {
		'median_minutes': round(df['trip_duration_minutes'].median(), 1),
		'q25_minutes': round(df['trip_duration_minutes'].quantile(0.25), 1),
		'q75_minutes': round(df['trip_duration_minutes'].quantile(0.75), 1),
		'mean_minutes': round(df['trip_duration_minutes'].mean(), 1),
		'max_minutes': round(max_duration_minutes, 1),
		'max_hours': round(max_duration_minutes / 60, 1)
	},
	'trip_distance': {
		'max_km': round(max_distance_km, 2),
		'max_miles': round(max_distance_km * 0.621371, 2)
	},
	'peak_hour': int(hourly_trips.loc[hourly_trips['trip_count'].idxmax(), 'hour_of_day']),
	'peak_hour_trips': int(hourly_trips['trip_count'].max())
}

with open(output_dir / 'summary_stats.json', 'w') as f:
	json.dump(summary_stats, f, indent=2)

print(f"✓ Saved summary_stats.json")

# 4. Member vs Casual hourly patterns
print("Generating member vs casual hourly patterns...")
hourly_by_type = df.groupby(['hour_of_day', 'member_casual']).size().reset_index(name='trip_count')

fig_member_casual = px.line(
	hourly_by_type,
	x='hour_of_day',
	y='trip_count',
	color='member_casual',
	title='Hourly Usage Patterns: Member vs Casual Users',
	labels={'hour_of_day': 'Hour of Day', 'trip_count': 'Number of Trips', 'member_casual': 'User Type'},
	markers=True
)

fig_member_casual.update_layout(
	height=400,
	hovermode='x unified',
	xaxis=dict(tickmode='linear', tick0=0, dtick=2)
)

with open(output_dir / 'member_casual_hourly.json', 'w') as f:
	json.dump(fig_member_casual.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved member_casual_hourly.json")

# 5. Weekday vs Weekend by User Type
print("Generating weekday vs weekend by user type...")
day_type_user = df.groupby(['is_weekend', 'member_casual']).size().reset_index(name='trip_count')
day_type_user['day_type'] = day_type_user['is_weekend'].map({False: 'Weekday', True: 'Weekend'})

fig_day_user = px.bar(
	day_type_user,
	x='day_type',
	y='trip_count',
	color='member_casual',
	title='User Type Distribution: Weekday vs Weekend',
	labels={'day_type': 'Day Type', 'trip_count': 'Number of Trips', 'member_casual': 'User Type'},
	barmode='group'
)

fig_day_user.update_layout(height=400)

with open(output_dir / 'weekday_weekend_by_user.json', 'w') as f:
	json.dump(fig_day_user.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved weekday_weekend_by_user.json")

# 6. Day of Week
print("Generating day of week chart...")
day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_counts = df['day_name'].value_counts().reindex(day_order)

fig_day_week = px.bar(
	x=day_counts.index,
	y=day_counts.values,
	title='Total Trips by Day of Week',
	labels={'x': 'Day of Week', 'y': 'Number of Trips'},
	color_discrete_sequence=['#0070f3']
)

fig_day_week.update_layout(height=400)

with open(output_dir / 'day_of_week.json', 'w') as f:
	json.dump(fig_day_week.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved day_of_week.json")

# 7. Time Period Distribution
print("Generating time period distribution...")
time_period_counts = df['time_period'].value_counts().reindex(
	['Morning Rush', 'Midday', 'Evening Rush', 'Night']
)

fig_time_period = px.bar(
	x=time_period_counts.index,
	y=time_period_counts.values,
	title='Trips by Time Period',
	labels={'x': 'Time Period', 'y': 'Number of Trips'},
	color_discrete_sequence=['#0070f3']
)

fig_time_period.update_layout(height=400)

with open(output_dir / 'time_period.json', 'w') as f:
	json.dump(fig_time_period.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved time_period.json")

# 8. Monthly Time Series
print("Generating monthly time series...")
monthly_trips = df.groupby('month_name').size().reset_index(name='trip_count')
monthly_trips = monthly_trips.sort_values('month_name')

fig_monthly = px.line(
	monthly_trips,
	x='month_name',
	y='trip_count',
	title='Monthly Trip Totals (Jan 2024 - Oct 2025)',
	labels={'month_name': 'Month', 'trip_count': 'Number of Trips'},
	markers=True
)

fig_monthly.update_layout(
	height=500,
	hovermode='x unified',
	xaxis=dict(
		tickangle=-45,
		tickmode='array',
		tickvals=monthly_trips['month_name'].tolist(),
		ticktext=monthly_trips['month_name'].tolist()
	)
)

with open(output_dir / 'monthly_timeseries.json', 'w') as f:
	json.dump(fig_monthly.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved monthly_timeseries.json")

# 9. Seasonal Comparison
print("Generating seasonal comparison...")
from plotly.subplots import make_subplots

season_order = ['Winter', 'Spring', 'Summer', 'Fall']
seasonal_trips = df.groupby('season').size().reindex(season_order)
season_months = df.groupby('season')['month_name'].nunique().reindex(season_order)
avg_trips_per_month = seasonal_trips / season_months

fig_seasonal = make_subplots(
	rows=1, cols=2,
	subplot_titles=('Total Trips by Season', 'Average Trips per Month')
)

fig_seasonal.add_trace(
	go.Bar(x=seasonal_trips.index.tolist(), y=seasonal_trips.values.tolist(), name='Total', marker_color='#0070f3'),
	row=1, col=1
)

fig_seasonal.add_trace(
	go.Bar(x=avg_trips_per_month.index.tolist(), y=avg_trips_per_month.values.tolist(), name='Average', marker_color='#0070f3'),
	row=1, col=2
)

fig_seasonal.update_layout(height=400, title_text='Seasonal Patterns', showlegend=False)
fig_seasonal.update_yaxes(title_text='Number of Trips', row=1, col=1)
fig_seasonal.update_yaxes(title_text='Avg Trips per Month', row=1, col=2)

with open(output_dir / 'seasonal_comparison.json', 'w') as f:
	json.dump(fig_seasonal.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved seasonal_comparison.json")

# 10. Seasonal Hourly Patterns
print("Generating seasonal hourly patterns...")
season_hour = df.groupby(['season', 'hour_of_day']).size().reset_index(name='trip_count')

fig_season_hour = px.line(
	season_hour,
	x='hour_of_day',
	y='trip_count',
	color='season',
	category_orders={'season': season_order},
	title='Hourly Patterns by Season',
	labels={'hour_of_day': 'Hour of Day', 'trip_count': 'Number of Trips', 'season': 'Season'},
	markers=True
)

fig_season_hour.update_layout(
	height=500,
	hovermode='x unified',
	xaxis=dict(tickmode='linear', tick0=0, dtick=2)
)

with open(output_dir / 'seasonal_hourly.json', 'w') as f:
	json.dump(fig_season_hour.to_dict(), f, cls=plotly.utils.PlotlyJSONEncoder)

print(f"✓ Saved seasonal_hourly.json")

print(f"\n✅ Export complete! Generated 10 files in {output_dir}")
print(f"   - hourly_trips.json")
print(f"   - day_hour_heatmap.json")
print(f"   - summary_stats.json")
print(f"   - member_casual_hourly.json")
print(f"   - weekday_weekend_by_user.json")
print(f"   - day_of_week.json")
print(f"   - time_period.json")
print(f"   - monthly_timeseries.json")
print(f"   - seasonal_comparison.json")
print(f"   - seasonal_hourly.json")

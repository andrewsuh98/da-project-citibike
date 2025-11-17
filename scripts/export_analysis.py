"""
Export sample visualizations from temporal patterns analysis to JSON format.
This script generates 3 sample charts for the MVP website.
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

# Filter outliers: remove trips < 1 minute or > 180 minutes
df['trip_duration_minutes'] = (df['ended_at'] - df['started_at']).dt.total_seconds() / 60
df = df[(df['trip_duration_minutes'] >= 1) & (df['trip_duration_minutes'] <= 180)]

# Extract temporal features
df['hour_of_day'] = df['started_at'].dt.hour
df['day_of_week'] = df['started_at'].dt.dayofweek
df['day_name'] = df['started_at'].dt.day_name()

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
		'mean_minutes': round(df['trip_duration_minutes'].mean(), 1)
	},
	'peak_hour': int(hourly_trips.loc[hourly_trips['trip_count'].idxmax(), 'hour_of_day']),
	'peak_hour_trips': int(hourly_trips['trip_count'].max())
}

with open(output_dir / 'summary_stats.json', 'w') as f:
	json.dump(summary_stats, f, indent=2)

print(f"✓ Saved summary_stats.json")

print(f"\n✅ Export complete! Generated 3 files in {output_dir}")
print(f"   - hourly_trips.json")
print(f"   - day_hour_heatmap.json")
print(f"   - summary_stats.json")

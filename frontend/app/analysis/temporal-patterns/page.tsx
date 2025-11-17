import PlotlyChart from '@/components/PlotlyChart';
import { PlotlyData, SummaryStats } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

async function loadChartData(filename: string): Promise<PlotlyData> {
	const filePath = path.join(process.cwd(), 'public/data/temporal', filename);
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents);
}

async function loadSummaryStats(): Promise<SummaryStats> {
	const filePath = path.join(process.cwd(), 'public/data/temporal/summary_stats.json');
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents);
}

export default async function TemporalPatternsPage() {
	// Load all data
	const [hourlyTripsData, heatmapData, summaryStats] = await Promise.all([
		loadChartData('hourly_trips.json'),
		loadChartData('day_hour_heatmap.json'),
		loadSummaryStats()
	]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Page Header */}
			<div className="mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Temporal Patterns Analysis
				</h1>
				<p className="text-lg text-gray-600">
					Understanding how Citi Bike usage varies by time of day, day of week, and season around Columbia University.
				</p>
			</div>

			{/* Research Question */}
			<div className="bg-blue-50 border-l-4 border-primary rounded-r-lg p-6 mb-12">
				<h2 className="text-lg font-semibold text-gray-900 mb-2">Research Question</h2>
				<p className="text-gray-700">
					How does Citi Bike usage vary near Columbia University by season, weekday, and time of day?
				</p>
			</div>

			{/* Overall Statistics */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Statistics</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">Total Trips</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">
							{summaryStats.total_trips.toLocaleString()}
						</p>
						<p className="text-sm text-gray-600">
							From {summaryStats.date_range.start} to {summaryStats.date_range.end}
						</p>
						<p className="text-sm text-gray-600 mt-1">
							Average {summaryStats.avg_trips_per_day} trips/day
						</p>
					</div>

					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">User Distribution</h3>
						<div className="mb-3">
							<p className="text-sm text-gray-600">Members</p>
							<p className="text-2xl font-bold text-gray-900">
								{summaryStats.user_distribution.member_percentage}%
							</p>
							<p className="text-sm text-gray-600">
								{summaryStats.user_distribution.member.toLocaleString()} trips
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-600">Casual</p>
							<p className="text-xl font-bold text-gray-900">
								{(100 - summaryStats.user_distribution.member_percentage).toFixed(1)}%
							</p>
							<p className="text-sm text-gray-600">
								{summaryStats.user_distribution.casual.toLocaleString()} trips
							</p>
						</div>
					</div>

					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">Trip Duration</h3>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm text-gray-600">Median:</span>
								<span className="text-sm font-semibold text-gray-900">
									{summaryStats.trip_duration.median_minutes} min
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-gray-600">25th percentile:</span>
								<span className="text-sm font-semibold text-gray-900">
									{summaryStats.trip_duration.q25_minutes} min
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-gray-600">75th percentile:</span>
								<span className="text-sm font-semibold text-gray-900">
									{summaryStats.trip_duration.q75_minutes} min
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Hourly Patterns */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Hourly Usage Patterns</h2>
				<p className="text-gray-600 mb-6">
					Understanding when bikes are used throughout the day reveals clear commute patterns
					with peak usage during morning and evening rush hours.
				</p>

				<PlotlyChart
					data={hourlyTripsData.data}
					layout={hourlyTripsData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
					<p className="text-gray-700">
						Peak hour is <strong>{summaryStats.peak_hour}:00</strong> with{' '}
						<strong>{summaryStats.peak_hour_trips.toLocaleString()} trips</strong>, indicating strong
						commute patterns aligned with typical work/school schedules.
					</p>
				</div>
			</div>

			{/* Day/Hour Heatmap */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Heatmap: Day × Hour</h2>
				<p className="text-gray-600 mb-6">
					This heatmap reveals usage patterns across different days of the week and hours of the day,
					showing distinct weekday commute patterns versus weekend recreational usage.
				</p>

				<PlotlyChart
					data={heatmapData.data}
					layout={heatmapData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Observations</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Weekdays show clear morning (7-9 AM) and evening (5-7 PM) peaks</li>
						<li>Weekend usage is more spread throughout midday hours</li>
						<li>Night hours (10 PM - 6 AM) show consistently low usage across all days</li>
						<li>Wednesday and Thursday typically show highest weekday activity</li>
					</ul>
				</div>
			</div>

			{/* Key Findings */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Key Findings Summary</h2>

				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Time of Day Patterns</h3>
						<p className="text-gray-700">
							Usage shows clear commute patterns with peaks during morning (7-9 AM) and evening (5-7 PM) rush hours.
							Member users drive weekday commute peaks, while casual users show more midday and weekend activity.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Day of Week Patterns</h3>
						<p className="text-gray-700">
							Weekday usage dominates, consistent with Columbia University academic and commute patterns.
							Weekend usage is lower but shows different hourly patterns with later starts and more
							spread throughout the day.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Implications for Infrastructure</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
							<li>Peak demand periods require sufficient bike and dock capacity</li>
							<li>Rebalancing operations should focus on morning and evening commute times</li>
							<li>Member vs casual patterns may require different station configurations</li>
							<li>Consider dynamic capacity adjustments based on time of day and day of week</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Methodology Note */}
			<div className="bg-gray-50 rounded-lg p-6">
				<h3 className="font-semibold text-gray-900 mb-2">Methodology Note</h3>
				<p className="text-sm text-gray-600">
					Trip duration outliers (&lt; 1 minute or &gt; 180 minutes) were removed to ensure data quality.
					Analysis uses median values for trip duration due to log-normal distribution.
					All visualizations are interactive - hover for details, zoom and pan to explore.
				</p>
			</div>
		</div>
	);
}

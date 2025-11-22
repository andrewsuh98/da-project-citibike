import PlotlyChart from '@/components/PlotlyChart';
import { PlotlyData, SummaryStats } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

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
	const [
		hourlyTripsData,
		heatmapData,
		memberCasualHourlyData,
		weekdayWeekendUserData,
		dayOfWeekData,
		timePeriodData,
		monthlyTimeseriesData,
		seasonalComparisonData,
		seasonalHourlyData,
		tripDurationData,
		userTypeData,
		bikeTypeData,
		summaryStats
	] = await Promise.all([
		loadChartData('hourly_trips.json'),
		loadChartData('day_hour_heatmap.json'),
		loadChartData('member_casual_hourly.json'),
		loadChartData('weekday_weekend_by_user.json'),
		loadChartData('day_of_week.json'),
		loadChartData('time_period.json'),
		loadChartData('monthly_timeseries.json'),
		loadChartData('seasonal_comparison.json'),
		loadChartData('seasonal_hourly.json'),
		loadChartData('trip_duration_histogram.json'),
		loadChartData('user_type_distribution.json'),
		loadChartData('bike_type_distribution.json'),
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

			{/* Trip Characteristics */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Characteristics</h2>
				<p className="text-gray-600 mb-6">
					Understanding trip duration patterns and the distribution of user types and bike types
					provides insights into how the system is being used.
				</p>

				{/* User Type and Bike Type Pie Charts */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">User Type Distribution</h3>
						<PlotlyChart
							data={userTypeData.data}
							layout={userTypeData.layout}
							className="w-full"
						/>
						<div className="mt-4 bg-blue-50 rounded-lg p-4">
							<p className="text-sm text-gray-700">
								<strong>{summaryStats.user_distribution.member_percentage}% members</strong> vs{' '}
								{(100 - summaryStats.user_distribution.member_percentage).toFixed(1)}% casual riders.
								The high member percentage suggests the system is primarily used for regular commuting
								rather than tourism or occasional use.
							</p>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Bike Type Distribution</h3>
						<PlotlyChart
							data={bikeTypeData.data}
							layout={bikeTypeData.layout}
							className="w-full"
						/>
						<div className="mt-4 bg-blue-50 rounded-lg p-4">
							<p className="text-sm text-gray-700">
								<strong>{summaryStats.bike_distribution.electric_percentage}% electric bikes</strong> vs{' '}
								{(100 - summaryStats.bike_distribution.electric_percentage).toFixed(1)}% classic bikes.
								The strong preference for electric bikes reflects Columbia's hilly terrain and the convenience
								of e-assist for longer or more strenuous rides.
							</p>
						</div>
					</div>
				</div>

				{/* Trip Duration Histogram */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Duration Distribution</h3>
					<PlotlyChart
						data={tripDurationData.data}
						layout={tripDurationData.layout}
						className="w-full"
					/>
					<div className="mt-4 bg-blue-50 rounded-lg p-4">
						<p className="text-sm text-gray-700">
							<strong>Insight:</strong> The median trip duration is {summaryStats.trip_duration.median_minutes} minutes,
							with most trips falling between {summaryStats.trip_duration.q25_minutes} and {summaryStats.trip_duration.q75_minutes} minutes.
							This log-normal distribution is typical of bike-share systems, where most trips are short commutes
							or errands, with a long tail of longer recreational rides.
						</p>
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

			{/* Member vs Casual Hourly Patterns */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Member vs Casual User Patterns</h2>
				<p className="text-gray-600 mb-6">
					Comparing hourly usage between member and casual riders reveals distinct behavioral patterns.
					Members show strong commute peaks, while casual users exhibit more leisure-oriented usage.
				</p>

				<PlotlyChart
					data={memberCasualHourlyData.data}
					layout={memberCasualHourlyData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Observations</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Members show sharp peaks at 8-9 AM and 5-6 PM (typical commute times)</li>
						<li>Casual users have more consistent usage throughout the day</li>
						<li>Casual usage peaks in afternoon/evening (12 PM - 6 PM)</li>
						<li>Member usage significantly exceeds casual usage during rush hours</li>
					</ul>
				</div>
			</div>

			{/* Time Period Distribution */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Usage by Time Period</h2>
				<p className="text-gray-600 mb-6">
					Categorizing trips into time periods (Morning Rush, Midday, Evening Rush, Night)
					shows the distribution of usage throughout the day.
				</p>

				<PlotlyChart
					data={timePeriodData.data}
					layout={timePeriodData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
					<p className="text-gray-700">
						Evening Rush (4-8 PM) shows the highest usage, followed by Midday and Morning Rush.
						Night hours (8 PM - 6 AM) account for the smallest share, consistent with
						typical urban bike-share usage patterns.
					</p>
				</div>
			</div>

			{/* Day of Week */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly Patterns</h2>
				<p className="text-gray-600 mb-6">
					Trip volumes vary across days of the week, with clear differences between
					weekdays and weekends reflecting Columbia's academic calendar and commute patterns.
				</p>

				<PlotlyChart
					data={dayOfWeekData.data}
					layout={dayOfWeekData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Observations</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Weekdays (Monday-Friday) show consistently higher usage than weekends</li>
						<li>Mid-week days (Tuesday-Thursday) typically have highest volumes</li>
						<li>Saturday shows lowest usage, followed by Sunday</li>
						<li>Pattern aligns with Columbia University academic schedule</li>
					</ul>
				</div>
			</div>

			{/* Weekday vs Weekend by User Type */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Weekday vs Weekend User Behavior</h2>
				<p className="text-gray-600 mb-6">
					Breaking down usage by day type and user category reveals how different user groups
					contribute to weekday and weekend ridership.
				</p>

				<PlotlyChart
					data={weekdayWeekendUserData.data}
					layout={weekdayWeekendUserData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
					<p className="text-gray-700">
						Members dominate both weekday and weekend usage, but the gap narrows on weekends.
						Casual users represent a larger proportion of weekend trips, suggesting more
						recreational usage patterns compared to member commuting behavior.
					</p>
				</div>
			</div>

			{/* Monthly Time Series */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Trends</h2>
				<p className="text-gray-600 mb-6">
					Tracking ridership month-by-month from January 2024 to October 2025 reveals
					seasonal patterns, growth trends, and the impact of weather and academic calendar.
				</p>

				<PlotlyChart
					data={monthlyTimeseriesData.data}
					layout={monthlyTimeseriesData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Observations</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Strong seasonal variation with summer peaks and winter lows</li>
						<li>Peak months show 2-3× the ridership of lowest months</li>
						<li>Dips in December/January correlate with winter break</li>
						<li>May-October consistently show higher usage (favorable weather + academic year)</li>
					</ul>
				</div>
			</div>

			{/* Seasonal Comparison */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Patterns</h2>
				<p className="text-gray-600 mb-6">
					Aggregating data by season highlights the significant impact of weather conditions
					and academic calendar on Citi Bike usage around Columbia University.
				</p>

				<PlotlyChart
					data={seasonalComparisonData.data}
					layout={seasonalComparisonData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
					<p className="text-gray-700">
						Summer shows the highest total trips, followed by Fall. Spring shows moderate usage,
						while Winter has the lowest ridership. This pattern reflects both weather conditions
						(temperature, precipitation) and Columbia's academic calendar (summer courses, breaks).
					</p>
				</div>
			</div>

			{/* Seasonal Hourly Patterns */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Hourly Patterns by Season</h2>
				<p className="text-gray-600 mb-6">
					Examining how hourly usage patterns shift across seasons reveals the interaction
					between time of day and seasonal factors.
				</p>

				<PlotlyChart
					data={seasonalHourlyData.data}
					layout={seasonalHourlyData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Observations</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Peak hours remain consistent across seasons (morning and evening rush)</li>
						<li>Summer shows higher usage across all hours compared to other seasons</li>
						<li>Winter shows the most dramatic peaks/valleys (concentrated commute usage)</li>
						<li>Fall and Spring show similar patterns, bridging Summer and Winter extremes</li>
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
				<p className="text-sm text-gray-600 mb-4">
					Trip duration outliers (&lt; 1 minute or &gt; 180 minutes) were removed to ensure data quality.
					Analysis uses median values for trip duration due to log-normal distribution.
					All visualizations are interactive - hover for details, zoom and pan to explore.
				</p>
				<Link
					href="/methodology"
					className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
				>
					View Detailed Methodology →
				</Link>
			</div>
		</div>
	);
}

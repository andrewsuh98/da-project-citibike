import Link from 'next/link';
import { SummaryStats } from '@/lib/types';

export default async function Home() {
	// Load summary statistics
	const summaryStats: SummaryStats = await fetch(
		`file://${process.cwd()}/public/data/temporal/summary_stats.json`,
		{ cache: 'force-cache' }
	).then(res => res.json()).catch(() => {
		// Fallback if file read fails
		const fs = require('fs');
		const path = require('path');
		const filePath = path.join(process.cwd(), 'public/data/temporal/summary_stats.json');
		return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	});

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Hero Section */}
			<div className="text-center mb-16">
				<h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
					Columbia Citi Bike Analysis
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					Comprehensive analysis of Citi Bike usage patterns around Columbia University,
					covering {summaryStats.total_trips.toLocaleString()} trips from {summaryStats.date_range.start} to {summaryStats.date_range.end}
				</p>
			</div>

			{/* Key Statistics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Total Trips</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.total_trips.toLocaleString()}
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Date Range</div>
					<div className="text-lg font-bold text-gray-900">
						{summaryStats.total_days} days
					</div>
					<div className="text-sm text-gray-600 mt-1">
						{summaryStats.avg_trips_per_day} avg/day
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Member Users</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.user_distribution.member_percentage}%
					</div>
					<div className="text-sm text-gray-600 mt-1">
						{summaryStats.user_distribution.member.toLocaleString()} trips
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Electric Bikes</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.bike_distribution.electric_percentage}%
					</div>
					<div className="text-sm text-gray-600 mt-1">
						{summaryStats.bike_distribution.electric_bike.toLocaleString()} trips
					</div>
				</div>
			</div>

			{/* Features Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
				{/* Historical Analysis */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Historical Analysis</h2>
					<p className="text-gray-700 mb-4">
						Comprehensive analysis of {summaryStats.total_trips.toLocaleString()} trips from {summaryStats.date_range.start} to {summaryStats.date_range.end}.
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
						<li>Temporal patterns (hourly, daily, seasonal)</li>
						<li>User behavior (members vs casual riders)</li>
						<li>Peak usage times and commute patterns</li>
						<li>Bike type preferences (classic vs electric)</li>
					</ul>
					<Link
						href="/analysis/temporal-patterns"
						className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
					>
						View Historical Analysis →
					</Link>
				</div>

				{/* Live Status */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Live Station Status</h2>
					<p className="text-gray-700 mb-4">
						Real-time availability data for all 7 Columbia area stations, updated every 3 minutes.
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
						<li>Current bike availability (classic & e-bike)</li>
						<li>Available docking spaces</li>
						<li>Interactive map visualization</li>
						<li>Station status indicators</li>
					</ul>
					<Link
						href="/live/status"
						className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
					>
						View Live Status →
					</Link>
				</div>
			</div>

			{/* Stations Overview */}
			<div className="bg-white rounded-lg shadow p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Columbia University Stations</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
					<div>• Broadway & W 122 St</div>
					<div>• Morningside Dr & Amsterdam Ave</div>
					<div>• W 120 St & Claremont Ave</div>
					<div>• Amsterdam Ave & W 119 St</div>
					<div>• W 116 St & Broadway</div>
					<div>• W 116 St & Amsterdam Ave</div>
					<div>• W 113 St & Broadway</div>
				</div>
			</div>

			{/* Methodology */}
			<div className="bg-white rounded-lg shadow p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
				<div className="prose max-w-none text-gray-700">
					<p className="mb-4">
						<strong>Data Source:</strong> Citi Bike System Data (publicly available monthly CSV files)
					</p>
					<p className="mb-4">
						<strong>Data Processing:</strong> Filtered 529,908 trips where either start or end station
						is within the Columbia University area. Removed outlier trips (&lt; 1 min or &gt; 180 min).
					</p>
					<p className="mb-4">
						<strong>Analysis Tools:</strong> Python (pandas, plotly), Jupyter notebooks for exploratory analysis,
						Next.js/React for web visualization
					</p>
					<p>
						<strong>Time Period:</strong> {summaryStats.date_range.start} to {summaryStats.date_range.end} ({summaryStats.total_days} days)
					</p>
				</div>
			</div>
		</div>
	);
}

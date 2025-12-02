import Link from 'next/link';
import { SummaryStats } from '@/lib/types';

export default async function Home() {
	// Load summary statistics
	const summaryStats = await fetch(
		`file://${process.cwd()}/public/data/temporal/summary_stats.json`,
		{ cache: 'force-cache' }
	).then(res => res.json()).catch(() => {
		const fs = require('fs');
		const path = require('path');
		const filePath = path.join(process.cwd(), 'public/data/temporal/summary_stats.json');
		return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	}) as SummaryStats;

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
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Total Trips</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.total_trips.toLocaleString()}
					</div>
					<div className="text-sm text-gray-600 mt-1">
						Jan 2024 - Oct 2025
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Peak Hour</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.peak_hour === 0 ? '12 AM' : summaryStats.peak_hour < 12 ? `${summaryStats.peak_hour} AM` : summaryStats.peak_hour === 12 ? '12 PM' : `${summaryStats.peak_hour - 12} PM`}
					</div>
					<div className="text-sm text-gray-600 mt-1">
						{summaryStats.peak_hour_trips.toLocaleString()} trips
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Median Trip</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.trip_duration.median_minutes} min
					</div>
					<div className="text-sm text-gray-600 mt-1">
						Typical ride duration
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-sm font-medium text-gray-500 mb-2">Member Rides</div>
					<div className="text-3xl font-bold text-gray-900">
						{summaryStats.user_distribution.member_percentage.toFixed(0)}%
					</div>
					<div className="text-sm text-gray-600 mt-1">
						vs {(100 - summaryStats.user_distribution.member_percentage).toFixed(0)}% casual
					</div>
				</div>
			</div>

			{/* Features Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
				{/* Historical Analysis */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Historical Analysis</h2>
					<p className="text-gray-700 mb-4">
						Comprehensive analysis of {summaryStats.total_trips.toLocaleString()} trips from Jan 2024 to Oct 2025.
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

				{/* Demand Forecasting */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Demand Forecasting</h2>
					<p className="text-gray-700 mb-4">
						XGBoost model predicting hourly bike demand for proactive station rebalancing.
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
						<li>R² = 0.722, MAE = 1.63 departures/hour</li>
						<li>27 engineered features</li>
						<li>Academic calendar and temporal patterns</li>
						<li>Enables proactive rebalancing strategies</li>
					</ul>
					<Link
						href="/analysis/demand-forecasting"
						className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
					>
						View Demand Forecasting →
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

				{/* Methodology */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
					<p className="text-gray-700 mb-4">
						Comprehensive data analysis using Citi Bike System Data from {summaryStats.date_range.start} to {summaryStats.date_range.end}.
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
						<li>529,908 trips filtered for Columbia area</li>
						<li>Python (pandas, plotly) for analysis</li>
						<li>Next.js/React for visualization</li>
						<li>Jupyter notebooks for exploration</li>
					</ul>
					<Link
						href="/methodology"
						className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
					>
						View Detailed Methodology →
					</Link>
				</div>
			</div>

			{/* Stations Overview */}
			<div className="bg-white rounded-lg shadow p-8">
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
		</div>
	);
}

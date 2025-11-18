'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const StationMap = dynamic(() => import('@/components/StationMap'), {
	ssr: false,
	loading: () => <div className="w-full h-[500px] bg-gray-100 rounded-lg animate-pulse" />
});

interface StationData {
	station_id: string;
	name: string;
	lat: number;
	lon: number;
	capacity: number;
	num_bikes_available: number;
	num_ebikes_available: number;
	num_classic_bikes_available: number;
	num_docks_available: number;
	is_installed: number;
	is_renting: number;
	is_returning: number;
	last_reported: number;
	percent_full: number;
}

interface StatusResponse {
	stations: StationData[];
	summary: {
		total_stations: number;
		total_bikes_available: number;
		total_docks_available: number;
		total_capacity: number;
		overall_percent_full: number;
	};
	last_updated: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function LiveStatusPage() {
	const [data, setData] = useState<StatusResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [lastFetch, setLastFetch] = useState<Date | null>(null);
	const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(300);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch(`${API_URL}/api/stations/status`);

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			const json = await response.json();
			setData(json);
			setLastFetch(new Date());
			setSecondsUntilRefresh(300);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch data');
			console.error('Error fetching station data:', err);
		} finally {
			setLoading(false);
		}
	};

	// Initial fetch and auto-refresh
	useEffect(() => {
		fetchData();

		const refreshTimer = setInterval(() => {
			fetchData();
		}, REFRESH_INTERVAL);

		return () => clearInterval(refreshTimer);
	}, []);

	// Countdown timer
	useEffect(() => {
		const countdownTimer = setInterval(() => {
			setSecondsUntilRefresh((prev) => (prev > 0 ? prev - 1 : 300));
		}, 1000);

		return () => clearInterval(countdownTimer);
	}, []);

	// Helper function to get status color
	const getStatusColor = (station: StationData): string => {
		if (!station.is_installed || !station.is_renting) {
			return 'gray';
		}
		if (station.num_bikes_available === 0) {
			return 'red';
		}
		if (station.percent_full < 10) {
			return 'yellow';
		}
		return 'green';
	};

	// Helper function to get status label
	const getStatusLabel = (station: StationData): string => {
		if (!station.is_installed) return 'Offline';
		if (!station.is_renting) return 'Not Renting';
		if (station.num_bikes_available === 0) return 'Empty';
		if (station.percent_full < 10) return 'Low';
		return 'Available';
	};

	const formatTime = (timestamp: number) => {
		if (!timestamp) return 'N/A';
		return new Date(timestamp * 1000).toLocaleTimeString();
	};

	if (loading && !data) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">Live Station Status</h1>
				<div className="flex items-center justify-center h-64">
					<div className="animate-pulse text-gray-600">Loading station data...</div>
				</div>
			</div>
		);
	}

	if (error && !data) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">Live Station Status</h1>
				<div className="bg-red-50 border border-red-200 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Data</h3>
					<p className="text-red-700 mb-4">{error}</p>
					<button
						onClick={fetchData}
						className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">Live Station Status</h1>
				<p className="text-lg text-gray-600">
					Real-time Citi Bike availability for Columbia University area stations
				</p>
			</div>

			{/* Summary Stats */}
			{data && (
				<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div>
							<div className="text-sm text-gray-500">Total Bikes Available</div>
							<div className="text-3xl font-bold text-gray-900">
								{data.summary.total_bikes_available}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-500">Total Docks Available</div>
							<div className="text-3xl font-bold text-gray-900">
								{data.summary.total_docks_available}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-500">Total Capacity</div>
							<div className="text-3xl font-bold text-gray-900">
								{data.summary.total_capacity}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-500">Overall Utilization</div>
							<div className="text-3xl font-bold text-gray-900">
								{data.summary.overall_percent_full}%
							</div>
						</div>
					</div>

					<div className="mt-4 flex items-center justify-between text-sm text-gray-600">
						<div>
							Last updated: {lastFetch ? lastFetch.toLocaleTimeString() : 'N/A'}
						</div>
						<div>
							Next refresh in: {Math.floor(secondsUntilRefresh / 60)}:{String(secondsUntilRefresh % 60).padStart(2, '0')}
						</div>
						<button
							onClick={fetchData}
							disabled={loading}
							className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
						>
							{loading ? 'Refreshing...' : 'Refresh Now'}
						</button>
					</div>
				</div>
			)}

			{/* Info Banner */}
			<div className="bg-blue-50 border-l-4 border-primary rounded-r-lg p-4 mb-8">
				<p className="text-sm text-gray-700">
					<strong>Data Source:</strong> Citi Bike General Bikeshare Feed Specification (GBFS) API.
					Data updates automatically every 5 minutes.
				</p>
			</div>

			{/* Station Map */}
			{data && (
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Station Map</h2>
					<StationMap stations={data.stations} />
					<div className="mt-4 flex items-center justify-center gap-6 text-sm">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded-full bg-green-500"></div>
							<span className="text-gray-600">Available (&gt;30%)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded-full bg-yellow-500"></div>
							<span className="text-gray-600">Low (10-30%)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded-full bg-red-500"></div>
							<span className="text-gray-600">Empty (0%)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded-full bg-gray-400"></div>
							<span className="text-gray-600">Offline</span>
						</div>
					</div>
				</div>
			)}

			{/* Station Cards Grid */}
			{data && (
				<div>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Station Details</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{data.stations.map((station) => {
						const statusColor = getStatusColor(station);
						const statusLabel = getStatusLabel(station);

						return (
							<div key={station.station_id} className="bg-white rounded-lg shadow-lg p-6">
								{/* Station Name */}
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									{station.name}
								</h3>

								{/* Status Badge */}
								<div className="mb-4">
									<span
										className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
											statusColor === 'green'
												? 'bg-green-100 text-green-800'
												: statusColor === 'yellow'
												? 'bg-yellow-100 text-yellow-800'
												: statusColor === 'red'
												? 'bg-red-100 text-red-800'
												: 'bg-gray-100 text-gray-800'
										}`}
									>
										{statusLabel}
									</span>
								</div>

								{/* Bikes and Docks */}
								<div className="space-y-3 mb-4">
									<div className="flex items-center justify-between">
										<span className="text-gray-600">🚲 Classic Bikes:</span>
										<span className="text-2xl font-bold text-gray-900">
											{station.num_classic_bikes_available}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-gray-600">⚡ E-Bikes:</span>
										<span className="text-2xl font-bold text-gray-900">
											{station.num_ebikes_available}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-gray-600">🅿️ Docks:</span>
										<span className="text-2xl font-bold text-gray-900">
											{station.num_docks_available}
										</span>
									</div>
								</div>

								{/* Capacity Bar */}
								<div className="mb-3">
									<div className="flex justify-between text-sm text-gray-600 mb-1">
										<span>Capacity</span>
										<span>{station.percent_full}% full</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className={`h-2 rounded-full ${
												statusColor === 'green'
													? 'bg-green-500'
													: statusColor === 'yellow'
													? 'bg-yellow-500'
													: statusColor === 'red'
													? 'bg-red-500'
													: 'bg-gray-400'
											}`}
											style={{ width: `${station.percent_full}%` }}
										/>
									</div>
								</div>

								{/* Last Reported */}
								<div className="text-xs text-gray-500">
									Last updated: {formatTime(station.last_reported)}
								</div>
							</div>
						);
					})}
					</div>
				</div>
			)}

			{/* Error Banner (if error but we have cached data) */}
			{error && data && (
				<div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
					<p className="text-sm text-yellow-800">
						<strong>Warning:</strong> Failed to fetch latest data. Showing cached data. {error}
					</p>
				</div>
			)}
		</div>
	);
}

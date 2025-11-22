export default function MethodologyPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Page Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Methodology</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					A detailed overview of our data collection, processing, and analysis methods
				</p>
			</div>

			{/* Data Collection */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection</h2>
				<div className="prose max-w-none text-gray-700">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Historical Trip Data</h3>
					<p className="mb-4">
						We collected historical Citi Bike trip data from January 2024 to October 2025,
						sourced from <a href="https://citibikenyc.com/system-data" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Citi Bike System Data</a>.
						The dataset includes 96 monthly CSV files containing detailed trip information.
					</p>
					<ul className="list-disc pl-6 mb-4">
						<li>Total raw dataset size: ~15 GB</li>
						<li>Total trips in raw data: ~84 million</li>
						<li>Filtered dataset: 529,908 trips involving Columbia stations</li>
					</ul>

					<h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Real-Time Station Status</h3>
					<p className="mb-4">
						Live station status data is fetched from the <a href="https://gbfs.citibikenyc.com/gbfs/gbfs.json" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Citi Bike GBFS (General Bikeshare Feed Specification) API</a>.
						This provides real-time information on bike availability, dock availability, and station status.
					</p>
				</div>
			</div>

			{/* Station Selection */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Station Selection</h2>
				<div className="prose max-w-none text-gray-700">
					<p className="mb-4">
						We focused our analysis on 7 Citi Bike stations in the Columbia University area,
						covering Morningside Heights and Manhattanville neighborhoods:
					</p>
					<ul className="list-disc pl-6 mb-4">
						<li>Broadway & W 122 St (Station ID: 7783.18)</li>
						<li>Morningside Dr & Amsterdam Ave (Station ID: 7741.04)</li>
						<li>W 120 St & Claremont Ave (Station ID: 7745.07)</li>
						<li>Amsterdam Ave & W 119 St (Station ID: 7727.07)</li>
						<li>W 116 St & Broadway (Station ID: 7713.11)</li>
						<li>W 116 St & Amsterdam Ave (Station ID: 7692.11)</li>
						<li>W 113 St & Broadway (Station ID: 7713.01)</li>
					</ul>
					<p>
						These stations were selected based on their proximity to Columbia University campus
						and high relevance to student and staff commuting patterns.
					</p>
				</div>
			</div>

			{/* Data Processing */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Data Processing</h2>
				<div className="prose max-w-none text-gray-700">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Filtering Process</h3>
					<p className="mb-4">
						From the complete Citi Bike dataset, we filtered trips where either the origin
						(<code>start_station_id</code>) or destination (<code>end_station_id</code>)
						was one of our 7 Columbia-area stations. This resulted in 529,908 trips.
					</p>

					<h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Data Schema</h3>
					<p className="mb-4">Each trip record contains 13 fields:</p>
					<ul className="list-disc pl-6 mb-4">
						<li><strong>ride_id:</strong> Unique trip identifier</li>
						<li><strong>rideable_type:</strong> Bike type (classic_bike, electric_bike)</li>
						<li><strong>started_at, ended_at:</strong> Trip start and end timestamps</li>
						<li><strong>start_station_name, start_station_id:</strong> Origin station details</li>
						<li><strong>end_station_name, end_station_id:</strong> Destination station details</li>
						<li><strong>start_lat, start_lng, end_lat, end_lng:</strong> GPS coordinates</li>
						<li><strong>member_casual:</strong> User type (member or casual rider)</li>
					</ul>

					<h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Data Pipeline</h3>
					<ol className="list-decimal pl-6 mb-4">
						<li>Load all 96 monthly CSV files using Python pandas</li>
						<li>Parse datetime columns (<code>started_at</code>, <code>ended_at</code>)</li>
						<li>Filter trips involving Columbia stations</li>
						<li>Sort by trip start and end times</li>
						<li>Export to consolidated CSV file (columbia_filtered_citibike.csv, ~52 MB)</li>
					</ol>
				</div>
			</div>

			{/* Analysis Methods */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Methods</h2>
				<div className="prose max-w-none text-gray-700">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Temporal Analysis</h3>
					<p className="mb-4">
						We analyze usage patterns across multiple time scales:
					</p>
					<ul className="list-disc pl-6 mb-4">
						<li><strong>Seasonal trends:</strong> Monthly aggregation to identify seasonal variations</li>
						<li><strong>Weekly patterns:</strong> Day-of-week analysis to understand weekday vs. weekend usage</li>
						<li><strong>Hourly distribution:</strong> Hour-of-day analysis to identify peak usage times</li>
					</ul>

					<h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Station-Level Metrics</h3>
					<p className="mb-4">Key metrics calculated for each station:</p>
					<ul className="list-disc pl-6 mb-4">
						<li><strong>Total trips:</strong> Count of trips originating or ending at the station</li>
						<li><strong>Inflow/Outflow balance:</strong> Net difference between arriving and departing bikes</li>
						<li><strong>Bike type distribution:</strong> Breakdown of classic vs. electric bike usage</li>
						<li><strong>User type distribution:</strong> Member vs. casual rider proportions</li>
					</ul>

					<h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Visualization Tools</h3>
					<p className="mb-4">
						We use interactive visualizations built with Plotly and deck.gl to present findings:
					</p>
					<ul className="list-disc pl-6 mb-4">
						<li><strong>Time series charts:</strong> Track usage trends over time</li>
						<li><strong>Heatmaps:</strong> Display hour-by-day usage patterns</li>
						<li><strong>Bar charts:</strong> Compare metrics across stations</li>
						<li><strong>3D map visualization:</strong> Real-time station status with geographic context</li>
					</ul>
				</div>
			</div>

			{/* Technologies */}
			<div className="bg-white rounded-lg shadow-lg p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies & Tools</h2>
				<div className="prose max-w-none text-gray-700">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Data Processing</h3>
							<ul className="list-disc pl-6">
								<li>Python 3.x</li>
								<li>pandas (data manipulation)</li>
								<li>Jupyter notebooks (exploratory analysis)</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Visualization</h3>
							<ul className="list-disc pl-6">
								<li>Plotly (interactive charts)</li>
								<li>deck.gl (3D map visualization)</li>
								<li>MapLibre (map rendering)</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Web Application</h3>
							<ul className="list-disc pl-6">
								<li>Next.js 14 (React framework)</li>
								<li>TypeScript</li>
								<li>TailwindCSS (styling)</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Backend</h3>
							<ul className="list-disc pl-6">
								<li>FastAPI (Python web framework)</li>
								<li>RESTful API design</li>
								<li>GBFS API integration</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

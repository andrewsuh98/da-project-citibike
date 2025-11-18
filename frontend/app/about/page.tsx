export default function AboutPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Page Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">About the Project</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					A data analysis project studying Citi Bike usage patterns around Columbia University
				</p>
			</div>

			{/* Project Team */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Team</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{/* Team Member 1 */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							M1
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Team Member 1</h3>
						<p className="text-sm text-gray-600 mb-3">Role / Focus Area</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Team Member 2 */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							M2
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Team Member 2</h3>
						<p className="text-sm text-gray-600 mb-3">Role / Focus Area</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Team Member 3 */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							M3
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Team Member 3</h3>
						<p className="text-sm text-gray-600 mb-3">Role / Focus Area</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Team Member 4 */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							M4
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Team Member 4</h3>
						<p className="text-sm text-gray-600 mb-3">Role / Focus Area</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Team Member 5 */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							M5
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Team Member 5</h3>
						<p className="text-sm text-gray-600 mb-3">Role / Focus Area</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>
				</div>
			</div>

			{/* Project Info */}
			<div className="bg-white rounded-lg shadow p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Project Information</h2>
				<div className="prose max-w-none text-gray-700">
					<p className="mb-4">
						This project analyzes Citi Bike usage patterns around Columbia University,
						covering 529,908 trips from January 2024 to October 2025 across 7 stations
						in the Morningside Heights and Manhattanville area.
					</p>
					<p className="mb-4">
						<strong>Technologies Used:</strong> Python (pandas, plotly), Next.js, React,
						FastAPI, TypeScript, TailwindCSS, deck.gl, MapLibre
					</p>
					<p>
						<strong>Data Sources:</strong> Citi Bike System Data (historical CSV files)
						and GBFS API (real-time station status)
					</p>
				</div>
			</div>
		</div>
	);
}

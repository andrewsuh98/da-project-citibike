export default function AboutPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Page Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">About the Project</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
					A data analysis project studying Citi Bike usage patterns around Columbia University
				</p>
				<p className="text-lg text-gray-500">
					Columbia IEOR - Data Analytics Course
				</p>
			</div>

			{/* Project Team */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Team</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{/* Andrew Suh */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							AS
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Andrew Suh</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="https://github.com/andrewsuh98" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Afroditi Fragkiadaki */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							AF
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Afroditi Fragkiadaki</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Lexi Liu */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							LL
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Lexi Liu</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Naiyapak Boondee */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							NB
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Naiyapak Boondee</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="#" className="text-primary hover:underline">GitHub</a>
							<a href="#" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Zicheng Ni */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
							ZN
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Zicheng Ni</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
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

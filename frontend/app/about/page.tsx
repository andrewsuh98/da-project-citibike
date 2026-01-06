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
					{/* Afroditi Fragkiadaki */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<img
							src="/photos/Afroditi.jpeg"
							alt="Afroditi Fragkiadaki"
							className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
						/>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Afroditi Fragkiadaki</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="https://github.com/afroditifragiadaki" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
							<a href="https://www.linkedin.com/in/aphroditi-fragkiadaki/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Andrew Suh */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<img
							src="/photos/Andrew.jpeg"
							alt="Andrew Suh"
							className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
						/>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Andrew Suh</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="https://github.com/andrewsuh98" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
							<a href="https://www.linkedin.com/in/andrewwsuh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Naiyapak Boondee */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<img
							src="/photos/Eve.jpeg"
							alt="Naiyapak Boondee"
							className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
						/>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Naiyapak Boondee</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="https://github.com/naiyapakeve" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
							<a href="https://www.linkedin.com/in/naiyapakboondee/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Zhesan Liu */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<img
							src="/photos/Zhesan.jpeg"
							alt="Zhesan Liu"
							className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
						/>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Zhesan Liu</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="https://github.com/liuzhesan" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
							<a href="https://www.linkedin.com/in/zhesan-liu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>

					{/* Zicheng Ni */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<img
							src="/photos/Zicheng.jpeg"
							alt="Zicheng Ni"
							className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
						/>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Zicheng Ni</h3>
						<p className="text-sm text-gray-600 mb-3">MS in Business Analytics</p>
						<div className="flex justify-center gap-3 text-sm">
							<a href="https://github.com/zichengni" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
							<a href="https://www.linkedin.com/in/zichengni/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
						</div>
					</div>
				</div>
			</div>

			{/* Project Info */}
			<div className="bg-white rounded-lg shadow p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Project Information</h2>
				<div className="prose max-w-none text-gray-700">
					<p className="mb-4">
						This project was completed for <strong>IEOR 4523: Data Analytics</strong> at Columbia University (Fall 2025).
						The objective was to perform comprehensive data analysis on a real-world dataset and develop predictive models
						to extract actionable insights.
					</p>
					<p className="mb-4">
						We analyzed Citi Bike usage patterns around Columbia University, examining 529,908 trips from January 2024
						to October 2025 across 7 stations in the Morningside Heights and Manhattanville area. Our analysis includes
						temporal pattern exploration, user behavior insights, and an XGBoost machine learning model for hourly demand
						forecasting (R² = 0.722).
					</p>
					<p className="mb-4">
						<strong>Technologies Used:</strong> Python (pandas, NumPy, plotly, scikit-learn, XGBoost), Next.js, React,
						FastAPI, TypeScript, TailwindCSS, deck.gl, MapLibre
					</p>
					<p>
						<strong>Data Sources:</strong> Citi Bike System Data (publicly available historical CSV files)
						and GBFS API (real-time station status)
					</p>
				</div>
			</div>
		</div>
	);
}

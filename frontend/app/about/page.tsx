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
					{/* Afroditi Fragkiadaki */}
					<div className="bg-gray-50 rounded-lg p-6 text-center">
						<img
							src="https://media.licdn.com/dms/image/v2/D4D03AQEKx7ZXcCxOsA/profile-displayphoto-crop_800_800/B4DZnQAZ5sKQAI-/0/1760131391909?e=1765411200&v=beta&t=fiY8Zk_OSVBqIlXlKWlRy88KI5IlMfWqX444Focn53E"
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
							src="https://media.licdn.com/dms/image/v2/D4E03AQF2pUvxIdmfXA/profile-displayphoto-crop_800_800/B4EZmc8oa6HoAI-/0/1759274764279?e=1765411200&v=beta&t=lumsewJRmlYOrzkCM-8UIEKwz9pbz_84OURyBv0uSrU"
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
							src="https://media.licdn.com/dms/image/v2/D5603AQFZaXqSUcZ40A/profile-displayphoto-crop_800_800/B56ZnP2VMfG0AI-/0/1760128752618?e=1765411200&v=beta&t=2JyUJt6UzEhNC8i8RzUP18B4qT6d-WMBgnwC3-hnTKs"
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
							src="https://media.licdn.com/dms/image/v2/D5635AQF9w03QaA-8oA/profile-framedphoto-shrink_800_800/B56Zc1V4zCHoAg-/0/1748946619900?e=1765310400&v=beta&t=lMs580u8U1irLPqkn-ZKb-JbP5GsxI7uZ5tiq3O34Xc"
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
							src="https://media.licdn.com/dms/image/v2/D4E35AQFOca-0JpnrbA/profile-framedphoto-shrink_800_800/B4EZouWcaoKkAg-/0/1761714227111?e=1765310400&v=beta&t=c7b2nQEU7whZHDnsMbqHL_5corOqg2eZYzgOc5b-Iq8"
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

import Link from 'next/link';

export default function Navigation() {
	return (
		<nav className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<Link href="/" className="flex items-center">
							<span className="text-xl font-bold text-gray-900">
								Columbia Citi Bike Analysis
			</span>
						</Link>
					</div>
					<div className="flex items-center space-x-8">
						<Link
							href="/"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							Home
						</Link>
						<Link
							href="/analysis/temporal-patterns"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							Analysis
						</Link>
						<a
							href="https://github.com/yourusername/da-project-citibike"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							GitHub
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}

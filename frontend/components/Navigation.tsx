'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

	return (
		<nav className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex items-center">
							<span className="text-xl font-bold text-gray-900">
								Columbia Citi Bike Analysis
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							Home
						</Link>

						{/* Analysis Dropdown */}
						<div className="relative group">
							<button className="text-gray-700 hover:text-primary transition-colors flex items-center">
								Analysis
								<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
								</svg>
							</button>
							<div className="absolute hidden group-hover:block left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
								<Link
									href="/analysis/temporal-patterns"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-md"
								>
									Temporal Patterns
								</Link>
								<Link
									href="/analysis/demand-forecasting"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary last:rounded-b-md"
								>
									Demand Forecasting
								</Link>
							</div>
						</div>

						<Link
							href="/live/status"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							Live Status
						</Link>
						<Link
							href="/methodology"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							Methodology
						</Link>
						<Link
							href="/about"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							About
						</Link>
						<a
							href="https://github.com/andrewsuh98/da-project-citibike"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							GitHub
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{!isMenuOpen ? (
								<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							) : (
								<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
						<Link
							href="/"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</Link>

						{/* Mobile Analysis Dropdown */}
						<div>
							<button
								onClick={() => setIsAnalysisOpen(!isAnalysisOpen)}
								className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							>
								<div className="flex items-center justify-between">
									<span>Analysis</span>
									<svg className={`w-4 h-4 transition-transform ${isAnalysisOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
									</svg>
								</div>
							</button>
							{isAnalysisOpen && (
								<div className="pl-4 space-y-1">
									<Link
										href="/analysis/temporal-patterns"
										className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
										onClick={() => {
											setIsMenuOpen(false);
											setIsAnalysisOpen(false);
										}}
									>
										Temporal Patterns
									</Link>
									<Link
										href="/analysis/demand-forecasting"
										className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
										onClick={() => {
											setIsMenuOpen(false);
											setIsAnalysisOpen(false);
										}}
									>
										Demand Forecasting
									</Link>
								</div>
							)}
						</div>

						<Link
							href="/live/status"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							Live Status
						</Link>
						<Link
							href="/methodology"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							Methodology
						</Link>
						<Link
							href="/about"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							About
						</Link>
						<a
							href="https://github.com/andrewsuh98/da-project-citibike"
							target="_blank"
							rel="noopener noreferrer"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							GitHub
						</a>
					</div>
				</div>
			)}
		</nav>
	);
}

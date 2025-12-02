'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
						<Link
							href="/analysis/temporal-patterns"
							className="text-gray-700 hover:text-primary transition-colors"
						>
							Analysis
						</Link>
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
						<Link
							href="/analysis/temporal-patterns"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							Analysis
						</Link>
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

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
	title: "Columbia Citi Bike Analysis",
	description: "Analysis of Citi Bike usage patterns around Columbia University",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased bg-gray-50">
				<Navigation />
				<main className="min-h-screen">
					{children}
				</main>
				<footer className="bg-white border-t border-gray-200 py-8 mt-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-6">
							<img
								src="/images/columbia-logo.png"
								alt="Columbia University"
								className="h-10 sm:h-12 mx-auto mb-4"
							/>
						</div>

						<div className="text-center text-gray-700 mb-4">
							<p className="text-base font-semibold mb-1">Columbia University Citi Bike Analysis © 2025</p>
							<p className="text-sm text-gray-600">MS in Business Analytics | IEOR Department</p>
						</div>

						<div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
							<a href="/about" className="hover:text-primary hover:underline">About</a>
							<span className="hidden sm:inline">|</span>
							<a href="/methodology" className="hover:text-primary hover:underline">Methodology</a>
							<span className="hidden sm:inline">|</span>
							<a href="/analysis/temporal-patterns" className="hover:text-primary hover:underline">Analysis</a>
							<span className="hidden sm:inline">|</span>
							<a href="https://github.com/andrewsuh98/da-project-citibike" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">GitHub</a>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}

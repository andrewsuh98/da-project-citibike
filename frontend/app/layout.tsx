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
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
						<p>Columbia University Citi Bike Analysis © 2025</p>
						<p className="text-sm mt-2">
							Data Source: <a href="https://citibikenyc.com/system-data" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Citi Bike System Data</a>
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
}

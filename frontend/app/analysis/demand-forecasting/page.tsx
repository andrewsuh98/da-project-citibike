import PlotlyChart from '@/components/PlotlyChart';
import { PlotlyData, SummaryStats } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

async function loadChartData(filename: string): Promise<PlotlyData> {
	const filePath = path.join(process.cwd(), 'public/data/forecasting', filename);
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents);
}

async function loadModelSummary(): Promise<any> {
	const filePath = path.join(process.cwd(), 'public/data/forecasting/model_summary.json');
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents);
}

export default async function DemandForecastingPage() {
	// Load all data
	const [
		modelComparisonData,
		featureImportanceData,
		timeSeriesPredictionData,
		modelSummary
	] = await Promise.all([
		loadChartData('model_comparison.json'),
		loadChartData('feature_importance.json'),
		loadChartData('time_series_prediction.json'),
		loadModelSummary()
	]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Page Header */}
			<div className="mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Demand Forecasting Model
				</h1>
				<p className="text-lg text-gray-600">
					Predicting hourly bike demand at Columbia stations using machine learning to optimize station rebalancing and capacity planning.
				</p>
			</div>

			{/* Research Question */}
			<div className="bg-blue-50 border-l-4 border-primary rounded-r-lg p-6 mb-12">
				<h2 className="text-lg font-semibold text-gray-900 mb-2">Research Question</h2>
				<p className="text-gray-700">
					Can we accurately predict hourly bike demand at Columbia stations to optimize rebalancing operations and improve user experience?
				</p>
			</div>

			{/* Model Overview */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Model Overview</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">Best Model</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">XGBoost</p>
						<p className="text-sm text-gray-600 mb-3">Gradient boosting ensemble</p>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600">MAE:</span>
								<span className="font-semibold text-gray-900">{modelSummary.mae} departures</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">R²:</span>
								<span className="font-semibold text-gray-900">{modelSummary.r2}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">RMSE:</span>
								<span className="font-semibold text-gray-900">{modelSummary.rmse}</span>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">Dataset</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">
							{(modelSummary.total_trips / 1000).toFixed(0)}K
						</p>
						<p className="text-sm text-gray-600 mb-3">Total trips analyzed</p>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600">Stations:</span>
								<span className="font-semibold text-gray-900">{modelSummary.stations}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Date range:</span>
								<span className="font-semibold text-gray-900">2024-2025</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Features:</span>
								<span className="font-semibold text-gray-900">{modelSummary.features_used}</span>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">Test Performance</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">
							{(modelSummary.test_samples / 1000).toFixed(1)}K
						</p>
						<p className="text-sm text-gray-600 mb-3">Test set hours</p>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600">Avg demand:</span>
								<span className="font-semibold text-gray-900">{modelSummary.test_mean_departures} trips/hr</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Period:</span>
								<span className="font-semibold text-gray-900">Oct 2025</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Stations:</span>
								<span className="font-semibold text-gray-900">{modelSummary.stations}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Model Comparison */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Model Performance Comparison</h2>
				<p className="text-gray-600 mb-6">
					We compared four different modeling approaches: a simple baseline (historical average), linear regression, random forest, and gradient boosting (XGBoost). XGBoost achieves the best performance.
				</p>

				<PlotlyChart
					data={modelComparisonData.data}
					layout={modelComparisonData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
					<p className="text-gray-700">
						<strong>XGBoost outperforms the baseline by 50% in MAE</strong>, reducing average prediction error from 3.26 to 1.63 departures per hour. The model explains 72.2% of variance in departures (R² = 0.722), compared to -25.9% for the baseline, indicating the learned patterns significantly outperform historical averages alone.
					</p>
				</div>
			</div>

			{/* Feature Importance */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Key Predictive Features</h2>
				<p className="text-gray-600 mb-6">
					The XGBoost model relies on a diverse set of features to make accurate predictions. The chart below shows the 15 most important features, ranked by their contribution to the model's predictions.
				</p>

				<PlotlyChart
					data={featureImportanceData.data}
					layout={featureImportanceData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-3">Top Predictive Features</h3>
					<ul className="space-y-2 text-gray-700">
						<li className="flex items-start">
							<span className="text-primary font-bold mr-3">1.</span>
							<span><strong>System departures lag (1h):</strong> Total departures across all Columbia stations 1 hour ago. Most important because recent system-wide activity is the strongest predictor of future demand.</span>
						</li>
						<li className="flex items-start">
							<span className="text-primary font-bold mr-3">2.</span>
							<span><strong>System total trips lag (1h):</strong> Total system activity (arrivals + departures) from previous hour. Captures overall bike circulation patterns.</span>
						</li>
						<li className="flex items-start">
							<span className="text-primary font-bold mr-3">3.</span>
							<span><strong>Historical average:</strong> Average departures for this station-hour-daytype combination. Captures recurring patterns across time.</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Time Series Prediction */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Actual vs Predicted Departures</h2>
				<p className="text-gray-600 mb-6">
					This visualization shows the model's performance on a sample station during the October 2025 test period. The blue line represents actual observed departures (demand), while the red dashed line represents the model's predictions.
				</p>

				<PlotlyChart
					data={timeSeriesPredictionData.data}
					layout={timeSeriesPredictionData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Model Performance</h3>
					<p className="text-gray-700">
						The model successfully captures the temporal patterns in demand, including rush hour peaks and off-peak valleys. It tracks actual departures closely, though occasional spikes (likely due to external events) are underestimated. The model's ability to predict these patterns enables proactive rebalancing strategies.
					</p>
				</div>
			</div>

			{/* How the Model Works */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">How the Model Works</h2>

				{/* Data Preparation */}
				<div className="mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Data Preparation</h3>
					<div className="bg-gray-50 rounded-lg p-6 space-y-2 text-sm text-gray-700">
						<p><strong>Raw data:</strong> 529,908 trips from January 2024 to October 2025</p>
						<p><strong>Aggregation:</strong> Grouped by station and hour to create hourly departure/arrival counts</p>
						<p><strong>Time series:</strong> Created complete time series with 91,028 station-hour records (May 2024 - Oct 2025)</p>
						<p><strong>Train/val/test split:</strong> {modelSummary.train_samples.toLocaleString()} training hours, {modelSummary.test_samples.toLocaleString()} test hours (time-based split to prevent data leakage)</p>
					</div>
				</div>

				{/* Feature Engineering */}
				<div className="mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Feature Engineering ({modelSummary.features_used} Features)</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="font-semibold text-gray-900 mb-2 text-sm">Temporal Features (8)</h4>
							<ul className="space-y-1 text-sm text-gray-700">
								<li>• Cyclical encoding: hour, day of week, month</li>
								<li>• Rush hour indicator (7-9am, 4-6pm weekdays)</li>
								<li>• Weekend flag</li>
							</ul>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="font-semibold text-gray-900 mb-2 text-sm">Academic Calendar (6)</h4>
							<ul className="space-y-1 text-sm text-gray-700">
								<li>• Semester period, holidays, finals</li>
								<li>• Study days, break periods</li>
								<li>• Days since semester start</li>
							</ul>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="font-semibold text-gray-900 mb-2 text-sm">Lag Features (5)</h4>
							<ul className="space-y-1 text-sm text-gray-700">
								<li>• Departures 1h, 24h, 168h ago</li>
								<li>• Arrivals 1 hour ago</li>
								<li>• Total trips 1 hour ago</li>
							</ul>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="font-semibold text-gray-900 mb-2 text-sm">Aggregated Features (3)</h4>
							<ul className="space-y-1 text-sm text-gray-700">
								<li>• Rolling averages (24h, 7-day)</li>
								<li>• System-wide departures lag</li>
								<li>• Historical average by hour</li>
							</ul>
						</div>
					</div>
					<p className="text-xs text-gray-600 mt-4">
						<strong>Key insight:</strong> Cyclical encoding (sine/cosine) captures that hour 23 and hour 0 are only 1 hour apart, not 23 hours.
					</p>
				</div>

				{/* Model Training */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Model Training</h3>
					<div className="bg-gray-50 rounded-lg p-6 space-y-3 text-sm text-gray-700">
						<p><strong>Models compared:</strong> Baseline (historical average) → Linear Regression → Random Forest → XGBoost</p>
						<p><strong>XGBoost configuration:</strong> 500 trees, learning rate 0.05, max depth 7, with early stopping on validation set to prevent overfitting</p>
						<p><strong>Target variable:</strong> Hourly departures (demand) at each station</p>
						<p><strong>Evaluation:</strong> MAE (mean absolute error in departures), RMSE, and R² (variance explained) on held-out October 2025 test set</p>
					</div>
				</div>
			</div>

			{/* Key Findings */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Key Findings Summary</h2>

				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Model Accuracy</h3>
						<p className="text-gray-700">
							XGBoost achieves <strong>R² = 0.722</strong> (explains 72% of variance) with <strong>MAE = 1.63 departures/hour</strong>. This represents a 50% improvement over the baseline historical average, demonstrating that learned patterns significantly outperform simple heuristics.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Most Important Signals</h3>
						<p className="text-gray-700">
							Recent demand (system departures 1 hour ago) is the strongest predictor. The model also heavily relies on historical patterns and academic calendar information, indicating that demand follows both immediate momentum and longer-term seasonal/academic cycles.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Why It Works</h3>
						<p className="text-gray-700">
							The model combines multiple signal types—recent activity, historical patterns, temporal cycles, and academic calendar events—to capture the complex dynamics of bike-share demand. No single factor dominates; instead, the ensemble approach leverages diverse information sources.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Applications</h3>
						<ul className="space-y-2 text-gray-700">
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>Rebalancing optimization:</strong> Predict when stations will run out of bikes or become full, enabling proactive rebalancing</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>Capacity planning:</strong> Identify underutilized periods and high-demand times to optimize dock/bike allocation</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>User experience:</strong> Alert users about expected bike availability at their preferred stations</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>Infrastructure planning:</strong> Use demand forecasts to guide future station expansion or consolidation</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Methodology Link */}
			<div className="bg-gray-50 rounded-lg p-6">
				<h3 className="font-semibold text-gray-900 mb-2">Methodology & Technical Details</h3>
				<p className="text-sm text-gray-600 mb-4">
					For a comprehensive explanation of our data processing, feature engineering, and model selection methodology, please visit our methodology page.
				</p>
				<Link
					href="/methodology"
					className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
				>
					View Detailed Methodology →
				</Link>
			</div>
		</div>
	);
}

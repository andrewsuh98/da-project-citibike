import PlotlyChart from '@/components/PlotlyChart';
import { PlotlyData } from '@/lib/types';
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
		dataSplitData,
		modelComparisonData,
		errorDistributionData,
		featureImportanceData,
		timeSeriesPredictionData,
		modelSummary
	] = await Promise.all([
		loadChartData('data_split.json'),
		loadChartData('model_comparison.json'),
		loadChartData('error_distribution.json'),
		loadChartData('feature_importance.json'),
		loadChartData('time_series_prediction.json'),
		loadModelSummary()
	]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Section 1: Page Header */}
			<div className="mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Demand Forecasting Model
				</h1>
				<p className="text-lg text-gray-600 mb-6">
					Using machine learning to predict hourly bike demand at Columbia stations for optimized rebalancing and capacity planning.
				</p>

				{/* Research Question */}
				<div className="bg-blue-50 border-l-4 border-primary rounded-r-lg p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">Research Question</h2>
					<p className="text-gray-700">
						Can we accurately predict hourly bike demand at Columbia stations to optimize rebalancing operations and improve user experience?
					</p>
				</div>
			</div>

			{/* Section 2: ML Pipeline Overview */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">Machine Learning Pipeline</h2>
				<p className="text-gray-600 mb-6">
					Our demand forecasting system follows a standard machine learning pipeline, from raw trip data to actionable hourly predictions.
				</p>

				<div className="flex justify-center mb-6">
					<img
						src="/data/forecasting/pipeline_diagram.svg"
						alt="ML Pipeline Diagram"
						className="w-full max-w-md"
					/>
				</div>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Pipeline Overview</h3>
					<p className="text-gray-700">
						The pipeline transforms 529,908 raw trip records into hourly demand forecasts through systematic data preparation, feature engineering, model training, and evaluation stages. Each stage builds upon the previous one to create increasingly refined predictions.
					</p>
				</div>
			</div>

			{/* Section 3: Data Preparation */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Preparation</h2>
				<p className="text-gray-600 mb-6">
					The first step transforms raw trip-level data into hourly station-level records suitable for time series forecasting.
				</p>

				<div className="bg-gray-50 rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Data Processing Steps</h3>
					<div className="space-y-3 text-sm text-gray-700">
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">•</span>
							<span><strong>Raw Data:</strong> 529,908 individual trips from January 2024 to October 2025 across 7 Columbia area stations</span>
						</div>
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">•</span>
							<span><strong>Temporal Aggregation:</strong> Group trips by station and hour, count departures and arrivals per station-hour combination</span>
						</div>
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">•</span>
							<span><strong>Time Series Completion:</strong> Fill missing hours with zero trips to create continuous 91,028 station-hour records</span>
						</div>
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">•</span>
							<span><strong>Temporal Filtering:</strong> Focus on May 2024 - October 2025 period with sufficient data coverage</span>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Train/Validation/Test Split</h3>
					<p className="text-sm text-gray-600 mb-4">
						Time-based split ensures no data leakage: the model never sees future data during training.
					</p>
					<PlotlyChart
						data={dataSplitData.data}
						layout={dataSplitData.layout}
						className="w-full"
					/>
				</div>

				<div className="bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Why Time-Based Splitting?</h3>
					<p className="text-gray-700">
						Unlike random splitting, time-based splitting mimics real-world deployment: the model trains on historical data and predicts future demand. This prevents data leakage and provides realistic performance estimates. The test set (October 2025) represents genuine future predictions.
					</p>
				</div>
			</div>

			{/* Section 4: Feature Engineering */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">2. Feature Engineering</h2>
				<p className="text-gray-600 mb-6">
					Feature engineering transforms raw hourly departure counts into 27 predictive features that capture multiple dimensions of bike demand patterns. Each feature category addresses a specific aspect of what drives demand at Columbia stations.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="font-semibold text-gray-900 mb-2 text-sm">Temporal Features (8)</h4>
						<ul className="space-y-1 text-sm text-gray-700">
							<li>• Cyclical encoding: hour, day of week, month (sine/cosine)</li>
							<li>• Rush hour indicator (7-9am, 4-6pm weekdays)</li>
							<li>• Weekend flag</li>
						</ul>
						<p className="text-xs text-gray-600 mt-2 italic">Captures daily and weekly usage cycles</p>
					</div>

					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="font-semibold text-gray-900 mb-2 text-sm">Academic Calendar (6)</h4>
						<ul className="space-y-1 text-sm text-gray-700">
							<li>• Semester period, holidays, finals weeks</li>
							<li>• Study days, spring/winter breaks</li>
							<li>• Days since semester start</li>
						</ul>
						<p className="text-xs text-gray-600 mt-2 italic">Columbia-specific seasonal patterns</p>
					</div>

					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="font-semibold text-gray-900 mb-2 text-sm">Lag Features (5)</h4>
						<ul className="space-y-1 text-sm text-gray-700">
							<li>• Departures 1 hour, 24 hours, 1 week ago</li>
							<li>• Arrivals 1 hour ago</li>
							<li>• Total trips (departures + arrivals) 1 hour ago</li>
						</ul>
						<p className="text-xs text-gray-600 mt-2 italic">Recent demand momentum and weekly patterns</p>
					</div>

					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="font-semibold text-gray-900 mb-2 text-sm">Aggregated Features (8)</h4>
						<ul className="space-y-1 text-sm text-gray-700">
							<li>• Rolling averages: 24-hour, 7-day windows</li>
							<li>• System-wide departures (all 7 stations) 1h ago</li>
							<li>• System-wide total trips 1h ago</li>
							<li>• Historical average by station-hour-daytype</li>
							<li>• Interaction features (e.g., hour × is_weekend)</li>
							<li>• Station encoding</li>
						</ul>
						<p className="text-xs text-gray-600 mt-2 italic">Network-wide trends and baseline patterns</p>
					</div>
				</div>

				<div className="bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Design Choice: Cyclical Encoding</h3>
					<p className="text-gray-700">
						For temporal features like hour, day of week, and month, we use cyclical encoding (sine/cosine transformations) instead of raw numeric values. This preserves the circular nature of time: hour 23 (11pm) and hour 0 (midnight) are numerically 23 units apart, but in reality they're only 1 hour apart. This allows the model to correctly learn that late-night and early-morning hours have similar demand patterns, despite being distant in numeric value.
					</p>
				</div>
			</div>

			{/* Section 5: Model Training */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">3. Model Training</h2>
				<p className="text-gray-600 mb-6">
					We compared four modeling approaches to identify the best predictor of hourly bike demand.
				</p>

				<div className="bg-gray-50 rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Models Compared</h3>
					<div className="space-y-3 text-sm text-gray-700">
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">1.</span>
							<span><strong>Baseline (Historical Average):</strong> Simple heuristic using average departures for each station-hour-daytype combination</span>
						</div>
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">2.</span>
							<span><strong>Linear Regression:</strong> Ridge regression with all 27 features, assumes linear relationships</span>
						</div>
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">3.</span>
							<span><strong>Random Forest:</strong> Ensemble of 200 decision trees (max_depth=20, min_samples_split=5)</span>
						</div>
						<div className="flex items-start">
							<span className="text-primary font-bold mr-3">4.</span>
							<span><strong>XGBoost:</strong> Gradient boosting with 500 trees, learning_rate=0.05, max_depth=7, early stopping on validation set</span>
						</div>
					</div>
				</div>

				<PlotlyChart
					data={modelComparisonData.data}
					layout={modelComparisonData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
					<p className="text-gray-700">
						<strong>XGBoost achieves the best performance</strong> with MAE = 1.63 departures/hour and R² = 0.722. This represents a 50% improvement over the baseline (MAE = 3.26), demonstrating that machine learning patterns significantly outperform simple historical averages. The negative R² for the baseline (-0.259) indicates that historical averages perform worse than simply predicting the mean for all samples.
					</p>
				</div>
			</div>

			{/* Section 6: Model Evaluation */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">4. Model Evaluation</h2>
				<p className="text-gray-600 mb-6">
					Rigorous evaluation on held-out October 2025 test data ensures the model generalizes to unseen future periods.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">MAE</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">{modelSummary.mae}</p>
						<p className="text-sm text-gray-600">Mean Absolute Error (departures)</p>
						<p className="text-xs text-gray-500 mt-2">Average prediction error magnitude</p>
					</div>

					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">RMSE</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">{modelSummary.rmse}</p>
						<p className="text-sm text-gray-600">Root Mean Squared Error (departures)</p>
						<p className="text-xs text-gray-500 mt-2">Penalizes large errors more heavily</p>
					</div>

					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">R² Score</h3>
						<p className="text-3xl font-bold text-gray-900 mb-2">{modelSummary.r2}</p>
						<p className="text-sm text-gray-600">Variance Explained (0-1 scale)</p>
						<p className="text-xs text-gray-500 mt-2">Proportion of variance captured by model</p>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Prediction Error Distribution</h3>
					<p className="text-sm text-gray-600 mb-4">
						The distribution of prediction errors (actual - predicted) shows model bias and accuracy. Ideally, errors center near zero with minimal spread.
					</p>
					<PlotlyChart
						data={errorDistributionData.data}
						layout={errorDistributionData.layout}
						className="w-full"
					/>
				</div>

				<div className="bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Evaluation Results</h3>
					<p className="text-gray-700">
						The error distribution is roughly centered near zero, indicating unbiased predictions. The MAE of 1.63 departures means the model's average error is less than 2 bikes per hour—highly accurate for operational planning. The R² of 0.722 means the model explains 72% of demand variance, significantly better than the baseline's negative R².
					</p>
				</div>
			</div>

			{/* Section 7: Feature Importance */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">5. Feature Importance Analysis</h2>
				<p className="text-gray-600 mb-6">
					Understanding which features drive predictions reveals the key factors influencing bike demand.
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
							<span><strong>System departures lag (1h):</strong> Total departures across all Columbia stations 1 hour ago. Recent system-wide activity is the strongest predictor—when the entire network is busy, individual stations will be too.</span>
						</li>
						<li className="flex items-start">
							<span className="text-primary font-bold mr-3">2.</span>
							<span><strong>System total trips lag (1h):</strong> Total system activity (arrivals + departures) from the previous hour. Captures overall bike circulation momentum.</span>
						</li>
						<li className="flex items-start">
							<span className="text-primary font-bold mr-3">3.</span>
							<span><strong>Historical average:</strong> Average departures for this station-hour-daytype combination. Recurring patterns across time provide a stable baseline.</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Section 8: Predictions */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">6. Making Predictions</h2>
				<p className="text-gray-600 mb-6">
					The trained model generates hourly demand forecasts by processing the 27 engineered features through the XGBoost ensemble.
				</p>

				<PlotlyChart
					data={timeSeriesPredictionData.data}
					layout={timeSeriesPredictionData.layout}
					className="w-full"
				/>

				<div className="mt-6 bg-blue-50 rounded-lg p-6">
					<h3 className="font-semibold text-gray-900 mb-2">Prediction Quality</h3>
					<p className="text-gray-700">
						The model successfully captures temporal demand patterns including rush hour peaks (morning and evening) and off-peak valleys. It tracks actual departures closely throughout October 2025 test period. Occasional spikes (likely due to special events or weather) are underestimated, but overall the predictions enable proactive rebalancing 1-24 hours in advance.
					</p>
				</div>
			</div>

			{/* Section 9: Key Findings */}
			<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Key Findings & Applications</h2>

				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Model Performance</h3>
						<p className="text-gray-700">
							XGBoost achieves <strong>R² = 0.722</strong> (explains 72% of demand variance) with <strong>MAE = 1.63 departures/hour</strong>. This represents a 50% improvement over baseline historical averages, demonstrating that learned patterns from 27 engineered features significantly outperform simple heuristics.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Key Predictive Signals</h3>
						<p className="text-gray-700">
							Recent system-wide activity (1 hour ago) is the strongest predictor. The model also relies heavily on historical patterns and academic calendar information, indicating demand follows both immediate momentum and longer-term seasonal/academic cycles. No single factor dominates—the ensemble leverages diverse information.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Applications</h3>
						<ul className="space-y-2 text-gray-700">
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>Proactive Rebalancing:</strong> Predict when stations will run out of bikes or become full 1-24 hours in advance, enabling efficient truck routing</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>Capacity Planning:</strong> Identify underutilized periods and high-demand times to optimize dock/bike allocation across the 7-station network</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>User Experience:</strong> Power mobile app alerts about expected bike availability at preferred stations, reducing user frustration</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary font-bold mr-3">•</span>
								<span><strong>Infrastructure Planning:</strong> Use demand forecasts to guide decisions about future station expansion, relocation, or capacity increases</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Future Improvements</h3>
						<p className="text-gray-700">
							Potential enhancements include weather data integration (temperature, precipitation), event calendars (concerts, sports games), real-time API deployment for live predictions, per-station model tuning, and multi-step ahead forecasting (24-72 hours).
						</p>
					</div>
				</div>
			</div>

			{/* Section 10: Methodology Link */}
			<div className="bg-gray-50 rounded-lg p-6">
				<h3 className="font-semibold text-gray-900 mb-2">Methodology & Technical Details</h3>
				<p className="text-sm text-gray-600 mb-4">
					For comprehensive documentation of data processing pipelines, feature engineering techniques, model hyperparameter tuning, and evaluation methodology, visit our methodology page.
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

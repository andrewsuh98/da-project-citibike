'use client';

import dynamic from 'next/dynamic';
import { PlotParams } from 'react-plotly.js';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), {
	ssr: false,
	loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
		<p className="text-gray-500">Loading chart...</p>
	</div>
});

interface PlotlyChartProps {
	data: PlotParams['data'];
	layout?: PlotParams['layout'];
	config?: PlotParams['config'];
	className?: string;
}

export default function PlotlyChart({ data, layout, config, className }: PlotlyChartProps) {
	const defaultConfig: PlotParams['config'] = {
		responsive: true,
		displayModeBar: true,
		displaylogo: false,
		...config
	};

	const defaultLayout: PlotParams['layout'] = {
		autosize: true,
		paper_bgcolor: 'white',
		plot_bgcolor: 'white',
		font: {
			family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		},
		...layout
	};

	return (
		<div className={className}>
			<Plot
				data={data}
				layout={defaultLayout}
				config={defaultConfig}
				useResizeHandler={true}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}

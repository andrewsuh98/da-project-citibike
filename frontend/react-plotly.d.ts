declare module 'react-plotly.js' {
	import { Component } from 'react';
	import { PlotlyHTMLElement } from 'plotly.js';

	export interface PlotParams {
		data: Array<any>;
		layout?: Partial<any>;
		config?: Partial<any>;
		frames?: Array<any>;
		useResizeHandler?: boolean;
		style?: React.CSSProperties;
		className?: string;
		onInitialized?: (figure: Readonly<PlotParams>, graphDiv: Readonly<PlotlyHTMLElement>) => void;
		onUpdate?: (figure: Readonly<PlotParams>, graphDiv: Readonly<PlotlyHTMLElement>) => void;
		onPurge?: (figure: Readonly<PlotParams>, graphDiv: Readonly<PlotlyHTMLElement>) => void;
		onError?: (err: Readonly<Error>) => void;
		onAfterPlot?: () => void;
		onBeforePlot?: () => void;
		onClick?: (event: Readonly<any>) => void;
		onHover?: (event: Readonly<any>) => void;
		onUnhover?: (event: Readonly<any>) => void;
		onSelected?: (event: Readonly<any>) => void;
		onDeselect?: () => void;
		onRelayout?: (event: Readonly<any>) => void;
		onRestyle?: (event: Readonly<any>) => void;
		onRedraw?: () => void;
		onAnimated?: () => void;
		onAnimatingFrame?: (event: Readonly<any>) => void;
		onAnimationInterrupted?: () => void;
		onAutoSize?: () => void;
		onTransitioning?: () => void;
		onTransitionInterrupted?: () => void;
		divId?: string;
		revision?: number;
		onDoubleClick?: () => void;
		onClickAnnotation?: (event: Readonly<any>) => void;
		onSliderChange?: (event: Readonly<any>) => void;
		onSliderEnd?: (event: Readonly<any>) => void;
		onSliderStart?: (event: Readonly<any>) => void;
		onLegendClick?: (event: Readonly<any>) => boolean;
		onLegendDoubleClick?: (event: Readonly<any>) => boolean;
		onButtonClicked?: (event: Readonly<any>) => void;
		onWebGlContextLost?: () => void;
	}

	export default class Plot extends Component<PlotParams> {}
}

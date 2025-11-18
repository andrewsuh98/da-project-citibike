'use client';

import { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

interface StationData {
	station_id: string;
	name: string;
	lat: number;
	lon: number;
	capacity: number;
	num_bikes_available: number;
	num_ebikes_available: number;
	num_classic_bikes_available: number;
	num_docks_available: number;
	is_installed: number;
	is_renting: number;
	is_returning: number;
	last_reported: number;
	percent_full: number;
}

interface StationMapProps {
	stations: StationData[];
}

const INITIAL_VIEW_STATE = {
	longitude: -73.962433,
	latitude: 40.808271,
	zoom: 14.8,
	pitch: 20
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export default function StationMap({ stations }: StationMapProps) {
	const [mounted, setMounted] = useState(false);
	const [webGLSupported, setWebGLSupported] = useState(true);

	useEffect(() => {
		// Check for WebGL support
		try {
			const canvas = document.createElement('canvas');
			const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
			if (!gl) {
				setWebGLSupported(false);
			}
		} catch (e) {
			setWebGLSupported(false);
		}
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-full h-[500px] bg-gray-100 rounded-lg animate-pulse" />;
	}

	if (!webGLSupported) {
		return (
			<div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
				<div className="text-center text-gray-600">
					<p className="text-lg font-semibold mb-2">Map visualization unavailable</p>
					<p className="text-sm">Your browser does not support WebGL</p>
				</div>
			</div>
		);
	}

	// Helper function to get color based on availability
	const getStationColor = (station: StationData): [number, number, number] => {
		if (!station.is_installed || !station.is_renting) {
			return [156, 163, 175]; // gray
		}
		if (station.num_bikes_available === 0) {
			return [239, 68, 68]; // red
		}
		if (station.percent_full < 10) {
			return [234, 179, 8]; // yellow
		}
		return [34, 197, 94]; // green
	};

	const layers = [
		new ScatterplotLayer({
			id: 'stations',
			data: stations,
			pickable: true,
			opacity: 0.8,
			stroked: true,
			filled: true,
			radiusScale: 1,
			radiusMinPixels: 8,
			radiusMaxPixels: 20,
			lineWidthMinPixels: 2,
			getPosition: (d: StationData) => [d.lon, d.lat],
			getRadius: (d: StationData) => Math.sqrt(d.capacity) * 3,
			getFillColor: (d: StationData) => getStationColor(d),
			getLineColor: [255, 255, 255],
			updateTriggers: {
				getFillColor: stations.map(s => s.num_bikes_available).join(',')
			}
		}),
		new TextLayer({
			id: 'columbia-label',
			data: [{
				name: 'Columbia University',
				coordinates: [-73.9626, 40.8075]
			}],
			pickable: false,
			getPosition: (d: any) => d.coordinates,
			getText: (d: any) => d.name,
			getSize: 16,
			getColor: [255, 255, 255],
			getAngle: 0,
			getTextAnchor: 'middle',
			getAlignmentBaseline: 'center',
			fontFamily: 'Arial, sans-serif',
			outlineWidth: 2,
			outlineColor: [0, 0, 0]
		})
	];

	return (
		<div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg relative">
			<DeckGL
				initialViewState={INITIAL_VIEW_STATE}
				controller={true}
				layers={layers}
				style={{ position: 'relative', width: '100%', height: '100%' }}
				_typedArrayManagerProps={{
					overAlloc: 1,
					poolSize: 0
				}}
				getTooltip={({ object }: { object?: StationData }) => {
					if (!object) return null;
					return {
						html: `
							<div class="station-tooltip">
								<strong>${object.name}</strong><br/>
								🚲 Classic: ${object.num_classic_bikes_available}<br/>
								⚡ E-Bikes: ${object.num_ebikes_available}<br/>
								🅿️ Docks: ${object.num_docks_available}<br/>
								<em>${object.percent_full}% full</em>
							</div>
						`,
						style: {
							backgroundColor: 'white',
							padding: '8px 12px',
							borderRadius: '8px',
							boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
							fontSize: '14px',
							lineHeight: '1.5'
						}
					};
				}}
			>
				<Map
					mapLib={import('maplibre-gl')}
					mapStyle={MAP_STYLE}
					reuseMaps
					style={{ width: '100%', height: '100%' }}
				/>
			</DeckGL>
		</div>
	);
}

# Columbia Citi Bike Analysis Dashboard

A professional web application showcasing analysis of Citi Bike usage patterns around Columbia University.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Visualizations:** Plotly.js via react-plotly.js
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   └── analysis/
│       └── temporal-patterns/
│           └── page.tsx         # Temporal patterns analysis
├── components/                   # Reusable components
│   ├── Navigation.tsx           # Site navigation
│   └── PlotlyChart.tsx          # Plotly chart wrapper
├── lib/                         # Utilities
│   └── types.ts                 # TypeScript interfaces
└── public/
    └── data/
        └── temporal/            # Pre-generated JSON data
            ├── hourly_trips.json
            ├── day_hour_heatmap.json
            └── summary_stats.json
```

## Data Generation

The visualization data is generated from Jupyter notebooks using the export script:

```bash
# From project root
python scripts/export_analysis.py
```

This creates JSON files in `frontend/public/data/temporal/` that are loaded by the Next.js pages.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Manual Deployment

```bash
npm run build
npm start
```

## Features

- **Homepage:** Project overview with key statistics
- **Temporal Patterns:** Interactive visualizations of usage patterns by hour, day, and season
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Interactive Charts:** Zoom, pan, and hover on all Plotly visualizations
- **Static Generation:** Fast loading via pre-rendered pages

## Future Enhancements

- Live dashboard with real-time Citi Bike GBFS API data
- Additional analysis pages (station profiles, route analysis)
- User filters and custom date ranges
- Data export functionality

## License

MIT

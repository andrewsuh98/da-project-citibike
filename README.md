# Citi Bike Mobility Patterns Around Columbia University

An evidence-based analysis of Citi Bike usage patterns near Columbia University to assess infrastructure needs and rebalancing operations.

## Project Overview

This project analyzes Citi Bike trip data around Columbia University (Morningside Heights & Manhattanville) to understand usage patterns, capacity constraints, and operational optimization opportunities.

## Research Questions

1. How does Citi Bike usage vary near Columbia University by season, weekday, and time of day?
2. Do current bike and dock levels meet demand, or are certain stations consistently empty/full?
3. Are there temporal or spatial patterns suggesting a need for more bikes or rebalancing operations?
4. How do weather and academic calendar events (midterms, commencement) affect usage volume?

## Dataset

**Primary Data:**

- **Citi Bike NYC System Data** - Trip-level data with start/end stations, timestamps, and dock availability
- Coverage: January 2024 - October 2025
- Filtered dataset: 529,908 trips involving Columbia area stations

**Contextual Data (planned):**

- Weather data via NOAA API
- Columbia academic calendar for event analysis

**Columbia Area Stations (7 total):**

- W 116 St & Amsterdam Ave (7692.11)
- W 113 St & Broadway (7713.01)
- W 116 St & Broadway (7713.11)
- Amsterdam Ave & W 119 St (7727.07)
- Broadway & W 122 St (7783.18)
- Morningside Dr & Amsterdam Ave (7741.04)
- W 120 St & Claremont Ave (7745.07)

## Methodology

### Data Processing

1. **Filter trip data** for stations around Columbia (Morningside Heights & Manhattanville)
2. **Temporal analysis** of hourly and daily ridership trends
3. **Utilization metrics** computation at the station level
4. **Imbalance detection** using inflow/outflow ratios and station downtime metrics

### Analysis Approach

- Seasonal and weekday variation analysis
- Peak demand identification by time of day
- Station capacity stress assessment
- Weather correlation analysis
- Academic calendar event impact analysis

### Visualizations

- Station-level heatmaps
- Peak-demand time series plots
- Capacity stress charts
- Interactive station maps
- Inflow/outflow balance diagrams

## Expected Insights

1. **Infrastructure Assessment** - Evidence-based evaluation of whether more bikes or docks are needed around Columbia
2. **Demand Patterns** - Identification of high-demand hours and under-served stations
3. **Operational Recommendations** - Actionable guidance for rebalancing operations and infrastructure planning
4. **Usage Drivers** - Understanding of how weather and academic events impact ridership

## Repository Structure

```
.
├── data/
│   ├── .gitkeep                           # Empty data directory structure
│   └── columbia_filtered_citibike.csv     # Filtered dataset (not tracked)
├── notebooks/
│   ├── load_and_filter_citibike_data.ipynb  # Data loading and filtering pipeline
│   └── example.ipynb                         # Analysis starter notebook
├── requirements.txt                       # Python dependencies
├── .gitignore                            # Git ignore rules
└── README.md                             # This file
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/andrewsuh98/da-project-citibike
cd da-project-citibike
```

2. Create and activate virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Download data files:

- The filtered dataset (`columbia_filtered_citibike.csv`) will be provided via cloud drive link
- Place the file in the `data/` directory

5. Start analyzing:

```bash
jupyter notebook notebooks/example.ipynb
```

## Data Files

**Note:** Raw data files are not tracked in this repository due to size (~15GB total).

The filtered dataset (`columbia_filtered_citibike.csv`) will be shared via cloud drive link and contains only trips involving Columbia area stations (~52MB, 529K rows).

## Analysis Workflow

1. **Data Loading** - Use `load_and_filter_citibike_data.ipynb` to:
   - Load all 96 monthly Citi Bike CSV files (2024-2025)
   - Filter for Columbia University area stations
   - Sort chronologically and export filtered dataset

2. **Exploratory Analysis** - Use `example.ipynb` to:
   - Load pre-filtered dataset
   - Visualize station locations
   - Perform temporal and spatial analysis

3. **Advanced Analysis** - Create additional notebooks for:
   - Weather correlation analysis
   - Academic calendar event impact
   - Station capacity modeling
   - Rebalancing optimization

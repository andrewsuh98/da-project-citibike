# Product Requirements Document (PRD)
## Columbia Citi Bike Analysis Dashboard

**Version:** 1.0
**Date:** 2025-11-17
**Author:** Andrew Suh
**Status:** Phase 1 - Static Analysis Website

---

## Executive Summary

A professional web application showcasing comprehensive analysis of Citi Bike usage patterns around Columbia University. The project will be delivered in two phases: (1) a static analysis website displaying historical patterns from 529,908 trips, and (2) a live dashboard integrating real-time Citi Bike GBFS API data.

**Target Audience:** Recruiters, hiring managers, urban planners, researchers, data enthusiasts

**Primary Goal:** Demonstrate data analysis capabilities through an interactive, professional web presence

---

## 1. Project Overview

### 1.1 Background

This project analyzes Citi Bike usage patterns across 7 Columbia University area stations, covering trips from January 2024 to October 2025. The analysis reveals temporal patterns (hourly, daily, seasonal), user behaviors (member vs casual), and operational insights.

### 1.2 Objectives

**Phase 1 (Current Focus):**
- Create a professional static website showcasing temporal patterns analysis
- Display interactive Plotly visualizations in a modern web interface
- Establish architecture for future expansion
- Deploy publicly for portfolio/showcase purposes

**Phase 2 (Future):**
- Integrate real-time station status from Citi Bike GBFS API
- Add live dashboard with current availability
- Implement recent trends analysis (last 24 hours)
- Enable dynamic filtering and exploration

### 1.3 Success Criteria

**Phase 1:**
- Website loads in < 2 seconds on broadband
- All visualizations interactive (zoom, pan, hover)
- Responsive design works on mobile, tablet, desktop
- Deployed to production with custom domain
- Professional appearance suitable for portfolio

**Phase 2:**
- Live data refreshes every 5 minutes
- Station status displays within 3 seconds of request
- API response times < 500ms
- 99% uptime for backend services

---

## 2. User Personas

### Persona 1: Technical Recruiter
**Goal:** Assess candidate's technical skills, data visualization ability, full-stack capabilities
**Needs:** Clear presentation of analysis, evidence of technical skills, professional design
**Journey:** Landing page → Browse analysis → View visualizations → Check GitHub/resume

### Persona 2: Hiring Manager (Data/Engineering)
**Goal:** Evaluate depth of analysis, code quality, technical decisions
**Needs:** Comprehensive analysis, well-documented code, scalable architecture
**Journey:** Deep dive into analysis → Examine methodology → Review code → Assess technical choices

### Persona 3: Urban Planner / Researcher
**Goal:** Understand Citi Bike usage patterns for planning purposes
**Needs:** Clear insights, actionable data, ability to explore patterns
**Journey:** Find specific insights → Examine temporal patterns → Review seasonal trends → Download/cite data

### Persona 4: General Public / Data Enthusiast
**Goal:** Learn about Citi Bike usage, explore interesting patterns
**Needs:** Intuitive navigation, engaging visualizations, clear explanations
**Journey:** Browse homepage → Discover interesting patterns → Interact with charts → Share findings

---

## 3. Functional Requirements

### 3.1 Phase 1: Static Analysis Website

#### 3.1.1 Homepage
**FR-1.1:** Display project overview with key statistics
- Total trips analyzed: 529,908
- Date range: January 2024 - October 2025
- Number of stations: 7
- Analysis categories available

**FR-1.2:** Show navigation to different analysis sections
- Temporal Patterns (current focus)
- Future: Station Analysis, Route Visualization, etc.

**FR-1.3:** Include project description and methodology summary

**FR-1.4:** Provide links to GitHub repository and data sources

#### 3.1.2 Temporal Patterns Analysis Page

**FR-2.1:** Display overall statistics section
- Total trips with filtering criteria
- User type distribution (member vs casual)
- Bike type distribution (classic vs electric)
- Trip duration statistics (median, quartiles)

**FR-2.2:** Show hourly usage patterns
- Bar chart: Total trips by hour of day
- Identify and highlight peak hours
- Interactive Plotly chart with zoom/pan/hover

**FR-2.3:** Display day-of-week × hour-of-day heatmap
- Color-coded intensity showing trip volumes
- Ordered days (Monday-Sunday)
- Hours 0-23 on x-axis
- Interactive tooltips showing exact counts

**FR-2.4:** Compare member vs casual usage patterns
- Line chart showing hourly patterns for each user type
- Highlight differences in commute patterns
- Toggle visibility for each user type

**FR-2.5:** Show time period distribution
- Morning Rush (6-10am)
- Midday (10am-4pm)
- Evening Rush (4-8pm)
- Night (8pm-6am)
- Bar chart with percentages

**FR-2.6:** Display day-of-week analysis
- Total trips per day of week
- Average trips per day (accounting for unequal sample sizes)
- Weekday vs weekend comparison

**FR-2.7:** Show seasonal patterns
- Monthly time series (Jan 2024 - Oct 2025)
- Seasonal aggregation (Winter, Spring, Summer, Fall)
- Identify peak and lowest months
- Display seasonal variation ratio

**FR-2.8:** Present key findings summary
- Summary statistics table
- Written interpretation of patterns
- Implications for infrastructure planning

**FR-2.9:** All visualizations must be interactive
- Plotly zoom, pan, hover functionality
- Responsive sizing for different screens
- Export options (PNG, SVG) via Plotly toolbar

#### 3.1.3 Navigation & Layout

**FR-3.1:** Site-wide navigation bar
- Logo/project title
- Links to analysis sections
- GitHub repository link
- About/Contact information

**FR-3.2:** Responsive design
- Mobile: Single column, stacked charts
- Tablet: 2-column layout where appropriate
- Desktop: Full-width optimized layout
- Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)

**FR-3.3:** Consistent visual design
- Color scheme reflecting data theme
- Typography hierarchy (headings, body, captions)
- Spacing and padding standards
- Professional, clean aesthetic

#### 3.1.4 Performance Requirements

**FR-4.1:** Page load performance
- Initial page load < 2 seconds on broadband
- Time to interactive < 3 seconds
- Lighthouse performance score > 90

**FR-4.2:** Chart rendering
- Charts render within 1 second of page load
- Smooth interactions (60fps)
- No layout shift during loading

**FR-4.3:** Asset optimization
- Images optimized (WebP format where supported)
- Plotly.js loaded via CDN (reduce bundle size)
- Code splitting for route-based loading

### 3.2 Phase 2: Live Data Dashboard (Future)

#### 3.2.1 Live Station Status Page

**FR-5.1:** Display real-time station availability
- Current bikes available
- Current docks available
- Station operational status
- Last update timestamp

**FR-5.2:** Interactive station map
- Markers for each Columbia station
- Color-coded by availability (full, available, low, empty)
- Click marker for station details
- Zoom/pan functionality

**FR-5.3:** Station status table
- Sortable columns (name, bikes, docks, % full)
- Search/filter by station name
- Refresh indicator and manual refresh button

**FR-5.4:** Auto-refresh functionality
- Update data every 5 minutes automatically
- Show countdown to next refresh
- Manual refresh button
- Pause auto-refresh option

#### 3.2.2 Recent Trends Page

**FR-6.1:** Last 24 hours analysis
- Hourly trip volumes
- Station usage distribution
- User type breakdown

**FR-6.2:** Current vs historical comparison
- Overlay current day pattern with historical average
- Highlight anomalies or unusual patterns

**FR-6.3:** Trend indicators
- Usage up/down compared to typical
- Busiest stations in last 24 hours

---

## 4. Technical Requirements

### 4.1 Phase 1: Technology Stack

#### 4.1.1 Frontend
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5.x
- **UI Library:** React 19
- **Styling:** TailwindCSS 3.x
- **Visualization:** Plotly.js via react-plotly.js
- **Build Tool:** Next.js built-in (Turbopack)

#### 4.1.2 Data Pipeline
- **Source:** Jupyter notebook (`temporal_patterns_andrew.ipynb`)
- **Export Script:** Python script to convert DataFrames/Plotly figures to JSON
- **Format:** Static JSON files in `public/data/` directory
- **Processing:** Pre-computed at build time (no runtime processing)

#### 4.1.3 Hosting & Deployment
- **Platform:** Vercel
- **Plan:** Free tier (100GB bandwidth, unlimited projects)
- **Domain:** Default vercel.app domain initially (custom domain optional)
- **CI/CD:** Automatic deployment on git push to main branch
- **SSL:** Automatic HTTPS via Vercel

### 4.2 Phase 2: Technology Stack (Future)

#### 4.2.1 Backend
- **Framework:** FastAPI 0.1xx+
- **Language:** Python 3.12+
- **Libraries:**
	- `pandas` for data processing
	- `httpx` for async HTTP requests
	- `plotly` for chart generation
	- `redis` (optional) for caching
- **Hosting:** Render.com or Railway.app ($7-20/month)

#### 4.2.2 External APIs
- **Citi Bike GBFS API:** https://gbfs.citibikenyc.com/gbfs/gbfs.json
- **Endpoints:**
	- `station_information.json` - Static station metadata
	- `station_status.json` - Real-time availability
- **Rate Limits:** No official limit documented, respect reasonable usage
- **Update Frequency:** Poll every 5 minutes

#### 4.2.3 Database (Optional)
- **Type:** PostgreSQL 15+ (if needed for historical tracking)
- **Purpose:** Store historical snapshots of station status
- **Alternative:** Redis for short-term caching only

### 4.3 Data Schema

#### 4.3.1 Static Analysis Data (Phase 1)

**File: `public/data/temporal/hourly_trips.json`**
```json
{
	"data": [{
		"x": [0, 1, 2, ..., 23],
		"y": [1234, 890, 567, ...],
		"type": "bar",
		"marker": {"color": "#636EFA"}
	}],
	"layout": {
		"title": "Total Trips by Hour of Day",
		"xaxis": {"title": "Hour of Day"},
		"yaxis": {"title": "Number of Trips"}
	}
}
```

**File: `public/data/temporal/day_hour_heatmap.json`**
```json
{
	"data": [{
		"z": [[row1], [row2], ..., [row7]],
		"x": [0, 1, 2, ..., 23],
		"y": ["Monday", "Tuesday", ..., "Sunday"],
		"type": "heatmap",
		"colorscale": "Blues"
	}],
	"layout": {
		"title": "Trip Activity Heatmap",
		"xaxis": {"title": "Hour of Day"},
		"yaxis": {"title": "Day of Week"}
	}
}
```

**File: `public/data/temporal/summary_stats.json`**
```json
{
	"total_trips": 529908,
	"date_range": {
		"start": "2024-01-01",
		"end": "2025-10-31"
	},
	"user_distribution": {
		"member": 423126,
		"casual": 106782
	},
	"bike_distribution": {
		"classic_bike": 317945,
		"electric_bike": 211963
	},
	"trip_duration": {
		"median_minutes": 8.5,
		"q25_minutes": 5.2,
		"q75_minutes": 14.3,
		"mean_minutes": 11.7
	},
	"peak_hour": 17,
	"peak_day": "Wednesday"
}
```

#### 4.3.2 Live API Responses (Phase 2)

**Endpoint: `GET /api/stations/columbia`**
```json
{
	"stations": [
		{
			"station_id": "7783.18",
			"name": "Broadway & W 122 St",
			"lat": 40.8147,
			"lon": -73.9626,
			"capacity": 35
		},
		...
	],
	"count": 7,
	"last_updated": "2025-01-17T15:30:00Z"
}
```

**Endpoint: `GET /api/stations/live-status`**
```json
{
	"stations": [
		{
			"station_id": "7783.18",
			"name": "Broadway & W 122 St",
			"num_bikes_available": 12,
			"num_docks_available": 23,
			"is_installed": true,
			"is_renting": true,
			"is_returning": true,
			"last_reported": 1737126600,
			"percent_full": 34.3
		},
		...
	],
	"timestamp": "2025-01-17T15:30:00Z"
}
```

### 4.4 API Specifications (Phase 2)

#### Base URL
```
Production: https://citibike-api.render.com
Development: http://localhost:8000
```

#### Authentication
- None required (public read-only API)
- Rate limiting: 100 requests/minute per IP (future consideration)

#### Endpoints

**GET /api/stations/columbia**
- **Description:** Returns list of Columbia area stations with metadata
- **Parameters:** None
- **Response:** JSON array of station objects
- **Cache:** 24 hours (stations rarely change)

**GET /api/stations/live-status**
- **Description:** Current availability for Columbia stations
- **Parameters:**
	- `refresh=true` (optional) - Force refresh from GBFS API
- **Response:** JSON array of station status objects
- **Cache:** 5 minutes

**GET /api/trips/recent-stats**
- **Description:** Aggregated statistics for last 24 hours
- **Parameters:**
	- `hours=24` (optional) - Number of hours to analyze (default 24)
- **Response:** JSON object with aggregated metrics
- **Cache:** 15 minutes

**GET /health**
- **Description:** Health check endpoint
- **Response:** `{"status": "ok", "timestamp": "..."}`

#### Error Handling
```json
{
	"error": {
		"code": "STATION_NOT_FOUND",
		"message": "Station with ID 7783.18 not found",
		"status": 404
	}
}
```

Common error codes:
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (station doesn't exist)
- `500` - Internal Server Error
- `503` - Service Unavailable (GBFS API down)

---

## 5. User Interface Design

### 5.1 Design Principles
- **Clarity:** Data visualizations are primary focus
- **Professionalism:** Clean, modern design suitable for portfolio
- **Accessibility:** WCAG 2.1 AA compliant
- **Responsiveness:** Mobile-first approach
- **Performance:** Fast, lightweight, optimized

### 5.2 Color Palette

**Primary Colors:**
- Primary Blue: `#0070f3` (Vercel/Next.js brand)
- Dark Gray: `#1a1a1a` (text)
- Light Gray: `#f5f5f5` (backgrounds)

**Chart Colors:**
- Default: Plotly's default palette
- Heatmaps: Blues scale
- Emphasis: Red for highlights

**Status Colors (Phase 2):**
- Available: `#10b981` (green)
- Low: `#f59e0b` (amber)
- Empty: `#ef4444` (red)
- Offline: `#6b7280` (gray)

### 5.3 Typography
- **Headings:** Inter (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Code:** JetBrains Mono (if showing code snippets)
- **Sizes:**
	- H1: 2.5rem (40px)
	- H2: 2rem (32px)
	- H3: 1.5rem (24px)
	- Body: 1rem (16px)
	- Caption: 0.875rem (14px)

### 5.4 Layout Specifications

**Desktop (1024px+):**
- Max content width: 1280px
- Padding: 2rem (32px)
- Chart width: 100% of container
- Two-column sections where appropriate

**Tablet (768px - 1023px):**
- Max content width: 100%
- Padding: 1.5rem (24px)
- Single column with full-width charts

**Mobile (< 768px):**
- Max content width: 100%
- Padding: 1rem (16px)
- Single column
- Charts scale to full width
- Simplified navigation (hamburger menu)

### 5.5 Component Specifications

#### Navigation Bar
- Height: 64px
- Fixed position at top
- Logo/title on left
- Navigation links center/right
- Mobile: Hamburger menu

#### Chart Container
- White background
- Border radius: 8px
- Box shadow: subtle (0 1px 3px rgba(0,0,0,0.1))
- Padding: 1.5rem
- Margin bottom: 2rem

#### Section Headers
- Border bottom: 2px solid light gray
- Margin bottom: 1.5rem
- Padding bottom: 0.5rem

---

## 6. Development Requirements

### 6.1 Code Quality Standards

#### 6.1.1 TypeScript
- Strict mode enabled
- No `any` types (use proper typing)
- Interface definitions for all data structures
- Exported types for reusable components

#### 6.1.2 React Best Practices
- Functional components only
- Hooks for state management
- Prop types validation
- Component composition over inheritance

#### 6.1.3 Code Organization
```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── analysis/
│       └── temporal-patterns/
│           └── page.tsx
├── components/            # Reusable components
│   ├── Navigation.tsx
│   ├── PlotlyChart.tsx
│   └── StatCard.tsx
├── lib/                   # Utilities
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
├── public/
│   └── data/             # Static JSON files
└── styles/
    └── globals.css       # Global styles
```

#### 6.1.4 Version Control
- Git workflow: feature branches → PR → main
- Commit message format: Conventional Commits
- Branch naming: `feature/`, `fix/`, `docs/`
- No direct commits to main branch

### 6.2 Testing Requirements (Phase 1 - Basic)

#### 6.2.1 Manual Testing Checklist
- [ ] All pages load without errors
- [ ] All charts render correctly
- [ ] Hover/zoom/pan interactions work
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation links work
- [ ] External links open correctly
- [ ] Performance meets requirements (Lighthouse)

#### 6.2.2 Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 6.3 Documentation Requirements

#### 6.3.1 Code Documentation
- JSDoc comments for complex functions
- README.md in frontend/ directory
- Component prop documentation
- Setup/installation instructions

#### 6.3.2 User Documentation
- About page explaining project
- Methodology section
- Data sources and citations
- Contact/links section

---

## 7. Deployment & Operations

### 7.1 Phase 1: Static Site Deployment

#### 7.1.1 Vercel Configuration
```json
{
	"buildCommand": "npm run build",
	"outputDirectory": ".next",
	"framework": "nextjs",
	"installCommand": "npm install"
}
```

#### 7.1.2 Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_GA_ID=<optional-analytics-id>
```

#### 7.1.3 Build Process
1. Push code to GitHub repository
2. Vercel automatically triggers build
3. Next.js compiles TypeScript → JavaScript
4. Static assets optimized
5. Deploy to global CDN
6. DNS updated automatically

#### 7.1.4 Monitoring
- Vercel Analytics (free tier)
- Lighthouse CI for performance monitoring
- GitHub Issues for bug tracking

### 7.2 Phase 2: Full-Stack Deployment (Future)

#### 7.2.1 Backend Hosting (Render.com)
- **Service Type:** Web Service
- **Environment:** Python 3.12
- **Instance Type:** Starter ($7/month) or higher
- **Region:** US East (closest to Citi Bike API)
- **Health Check:** `/health` endpoint

#### 7.2.2 Backend Environment Variables
```
CITI_BIKE_API_BASE_URL=https://gbfs.citibikenyc.com/gbfs
CORS_ORIGINS=https://your-project.vercel.app
REDIS_URL=<if-using-caching>
DATABASE_URL=<if-using-postgres>
```

#### 7.2.3 CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
	CORSMiddleware,
	allow_origins=["https://your-project.vercel.app"],
	allow_methods=["GET"],
	allow_headers=["*"],
)
```

#### 7.2.4 Monitoring & Logging
- Render.com built-in logs
- Sentry for error tracking (optional)
- Uptime monitoring (UptimeRobot or similar)
- API performance metrics

---

## 8. Project Timeline

### 8.1 Phase 1: Static Analysis Website

**Week 1: Setup & Data Export**
- Day 1-2: Create data export script
	- Extract data from notebook
	- Export Plotly figures to JSON
	- Export summary statistics
- Day 3-4: Initialize Next.js project
	- Setup TypeScript + TailwindCSS
	- Install dependencies
	- Configure project structure
- Day 5: Create basic layout & navigation

**Week 2: Core Development**
- Day 1-2: Build homepage
	- Project overview
	- Key statistics
	- Navigation to analysis
- Day 3-5: Temporal patterns page
	- Load JSON data
	- Render Plotly charts
	- Add explanatory text
	- Style components

**Week 3: Polish & Deploy**
- Day 1-2: Responsive design
	- Test on mobile/tablet/desktop
	- Fix layout issues
	- Optimize chart sizing
- Day 3: Performance optimization
	- Run Lighthouse audits
	- Optimize assets
	- Code splitting
- Day 4: Testing & bug fixes
- Day 5: Deploy to Vercel

**Total Duration:** 3 weeks (estimated 40-60 hours)

### 8.2 Phase 2: Live Dashboard (Future)

**Week 4-5: Backend Development**
- Setup FastAPI project
- Integrate Citi Bike GBFS API
- Create endpoints
- Deploy to Render

**Week 6-7: Frontend Development**
- Live station status page
- Recent trends page
- Auto-refresh functionality
- Integration with backend

**Week 8: Testing & Launch**
- End-to-end testing
- Performance optimization
- Documentation
- Production deployment

**Total Duration:** 5 weeks additional (estimated 60-80 hours)

---

## 9. Risks & Mitigations

### 9.1 Phase 1 Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Plotly.js bundle size too large | High | Medium | Use CDN instead of bundling, lazy load charts |
| JSON files too large | Medium | Low | Pre-aggregate data, split into multiple files |
| Browser compatibility issues | Medium | Low | Test on multiple browsers, use polyfills |
| Vercel bandwidth limits | Low | Low | Monitor usage, optimize assets, consider alternatives |
| Design not professional enough | Medium | Medium | Use design system (TailwindUI), get feedback |

### 9.2 Phase 2 Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Citi Bike API unavailable | High | Low | Implement caching, fallback to cached data |
| API rate limiting | Medium | Medium | Respect rate limits, implement backoff |
| Backend hosting costs too high | Medium | Low | Optimize queries, use caching, monitor usage |
| Real-time performance issues | Medium | Medium | Use WebSockets instead of polling, optimize queries |
| Data privacy concerns | Low | Low | No personal data collected, comply with terms |

---

## 10. Success Metrics

### 10.1 Phase 1 Metrics

**Technical Performance:**
- ✓ Lighthouse Performance Score ≥ 90
- ✓ Lighthouse Accessibility Score ≥ 90
- ✓ First Contentful Paint < 1.5s
- ✓ Time to Interactive < 3s
- ✓ Total Bundle Size < 500KB (gzipped)

**Functionality:**
- ✓ All charts render correctly
- ✓ All interactions work (zoom, pan, hover)
- ✓ Responsive on mobile/tablet/desktop
- ✓ Zero console errors

**User Engagement (if analytics enabled):**
- Average time on site > 2 minutes
- Pages per session > 2
- Bounce rate < 60%

### 10.2 Phase 2 Metrics (Future)

**Technical Performance:**
- API response time < 500ms (p95)
- Backend uptime ≥ 99%
- Live data refresh working reliably
- No data staleness > 10 minutes

**User Engagement:**
- Live dashboard page views
- Average time on live pages
- Interaction with filters/controls

---

## 11. Future Enhancements

### 11.1 Additional Analysis Pages
- Station-level deep dives
- Route analysis and popular paths
- Weather correlation analysis
- Academic calendar impact study

### 11.2 Interactive Features
- Custom date range selection
- Station comparison tool
- Export data to CSV
- Share specific insights (social sharing)

### 11.3 Advanced Visualizations
- Animated route flows (already prototyped)
- 3D visualizations
- Network graph analysis
- Predictive models

### 11.4 Community Features
- Comments or discussions
- User-submitted analyses
- API for external developers
- Data download portal

---

## 12. Appendices

### 12.1 Columbia University Station IDs
```
7783.18 - Broadway & W 122 St
7741.04 - Morningside Dr & Amsterdam Ave
7745.07 - W 120 St & Claremont Ave
7727.07 - Amsterdam Ave & W 119 St
7713.11 - W 116 St & Broadway
7692.11 - W 116 St & Amsterdam Ave
7713.01 - W 113 St & Broadway
```

### 12.2 Data Sources
- **Primary:** Citi Bike System Data
	- URL: https://citibikenyc.com/system-data
	- Format: Monthly CSV files
	- License: Public domain

- **Live Data:** Citi Bike GBFS API
	- URL: https://gbfs.citibikenyc.com/gbfs/gbfs.json
	- Format: JSON (GBFS specification)
	- Update frequency: Every 1-2 minutes

### 12.3 References
- Next.js Documentation: https://nextjs.org/docs
- Plotly.js Documentation: https://plotly.com/javascript/
- TailwindCSS Documentation: https://tailwindcss.com/docs
- GBFS Specification: https://github.com/MobilityData/gbfs
- Vercel Deployment: https://vercel.com/docs

### 12.4 Version History
- v1.0 (2025-11-17): Initial PRD, Phase 1 focus

---

## 13. Approval & Sign-off

**Prepared by:** Andrew Suh
**Date:** 2025-11-17
**Status:** Ready for Development

**Phase 1 Approved:** ☐ Yes ☐ No ☐ Pending
**Phase 2 Scope Agreed:** ☐ Yes ☐ No ☐ Pending

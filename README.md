# Alaska Radar Viewer

A GitHub Pages application that displays real-time NEXRAD radar observations for Alaska, with HRRR CONUS data available for comparison.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **NEXRAD**: Real-time observations - **Primary Alaska coverage**
  - **HRRR CONUS**: Forecast model data (limited/no Alaska coverage)
- Independent layer toggle controls
- Auto-refresh every 15 minutes
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## Data Sources

### NEXRAD Real-Time Radar (Primary)
- Iowa Environmental Mesonet NEXRAD composite (N0Q product)
- **Real-time observations**
- **Full Alaska coverage**
- Updates continuously

### HRRR CONUS (Secondary)
- Iowa Environmental Mesonet HRRR composite tiles
- Composite reflectivity (REFC parameter)
- Hourly model runs
- **CONUS coverage only** - does not include Alaska
- Auto-detects most recent available data

## Important Note: Alaska HRRR Data

**Alaska HRRR model data is NOT available as pre-rendered tiles.**

While NOAA produces HRRR forecasts for Alaska, they are only distributed as GRIB2 files (100+ MB) which require:
- Server-side processing to extract and render
- A tile generation service
- Cannot be processed in the browser due to size and CORS restrictions

To add Alaska HRRR support, you would need to:
1. Set up a backend service to fetch GRIB2 files from AWS S3
2. Parse GRIB2 and extract composite reflectivity
3. Generate and serve tiles or WMS

**For now, NEXRAD provides the best real-time Alaska radar coverage.**

## How It Works

1. **Tile Loading**: Fetches pre-rendered HRRR composite reflectivity tiles
2. **Availability Check**: Tries multiple recent hours to find the latest available data
3. **Leaflet Display**: Shows tiles as overlay layers on the map
4. **NEXRAD Layer**: Provides real-time baseline for comparison

## Deployment

The site automatically deploys to GitHub Pages when you push to any branch starting with `claude/` via GitHub Actions.

## Local Development

Simply open `index.html` in a web browser to test locally.

## Usage

- **Refresh HRRR**: Manually fetch latest HRRR Alaska GRIB2 data
- **Hide/Show HRRR**: Toggle the HRRR forecast overlay
- **Hide/Show NEXRAD**: Toggle the NEXRAD real-time radar
- **Zoom/Pan**: Standard Leaflet map controls

## Technology Stack

- Leaflet.js for interactive mapping
- OpenStreetMap tiles for base layer
- Iowa Environmental Mesonet for HRRR and NEXRAD tile services
- GitHub Pages for hosting
- GitHub Actions for CI/CD

## File Structure

```
├── index.html           # Main application
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment
└── README.md
```

## Technical Details

- **HRRR Data**: Pre-rendered composite reflectivity tiles
- **Coverage**: CONUS (includes parts of Alaska)
- **Reflectivity Range**: 5-75+ dBZ
- **Update Frequency**: Hourly (HRRR), Real-time (NEXRAD)
- **Auto-refresh**: Every 15 minutes
- **Tile Format**: PNG tiles via XYZ tile service

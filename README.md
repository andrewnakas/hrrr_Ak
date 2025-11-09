# Alaska HRRR + NEXRAD Radar Viewer

A GitHub Pages application that displays HRRR (High-Resolution Rapid Refresh) composite reflectivity forecast data alongside real-time NEXRAD observations on an interactive Leaflet map.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **HRRR**: Composite reflectivity forecast tiles
  - **NEXRAD**: Real-time observations for comparison
- Independent layer toggle controls
- Auto-refresh every 15 minutes
- Manual refresh for HRRR data
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## Data Sources

### HRRR Composite Reflectivity
- Iowa Environmental Mesonet HRRR composite tiles
- Composite reflectivity (REFC parameter)
- Hourly model runs
- CONUS coverage (includes parts of Alaska)
- Auto-detects most recent available data

### NEXRAD Real-Time Radar
- Iowa Environmental Mesonet NEXRAD composite (N0Q product)
- Real-time observations
- Full Alaska and CONUS coverage
- Updates continuously

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

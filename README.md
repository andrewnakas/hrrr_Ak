# Alaska HRRR Radar Viewer

A GitHub Pages application that displays Alaska HRRR (High-Resolution Rapid Refresh) forecast radar data alongside real-time NEXRAD observations on an interactive Leaflet map.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **HRRR Alaska**: 0-hour forecast composite reflectivity (REFC) from GRIB2 files
  - **NEXRAD**: Real-time observations for alignment and verification
- GRIB2 file parsing and rendering
- Independent layer toggle controls
- Auto-refresh every 15 minutes
- Manual refresh for HRRR data
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## Data Sources

### Primary: HRRR Alaska
- Fetches GRIB2 files from NOAA NOMADS
- Composite reflectivity (REFC parameter)
- 0-hour forecast (F000)
- 1299x919 grid covering Alaska
- Updated hourly (with 1-2 hour processing delay)

### Secondary: NEXRAD
- Iowa Environmental Mesonet's NEXRAD composite (N0Q product)
- Real-time observations
- Provides baseline for alignment with HRRR data
- Full Alaska and CONUS coverage

## How It Works

1. **GRIB2 Fetching**: Downloads HRRR Alaska GRIB2 files from NOAA NOMADS via CORS proxy
2. **GRIB2 Parsing**: Custom JavaScript parser (`grib2-parser.js`) extracts REFC data
3. **Canvas Rendering**: Converts GRIB2 data to canvas with reflectivity color mapping
4. **Leaflet Overlay**: Displays canvas as image overlay with proper Alaska bounds
5. **NEXRAD Layer**: Provides real-time baseline for comparison and alignment

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
- Custom GRIB2 parser for HRRR data processing
- Canvas API for radar rendering
- NOAA NOMADS for HRRR Alaska GRIB2 files
- Iowa Environmental Mesonet for NEXRAD data
- GitHub Pages for hosting
- GitHub Actions for CI/CD

## File Structure

```
├── index.html           # Main application
├── grib2-parser.js     # GRIB2 file parser
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment
└── README.md
```

## Technical Details

- **HRRR Alaska Grid**: 1299 × 919 points
- **Projection**: Lambert Conformal (Alaska-centered)
- **Geographic Bounds**: 51°N to 71.5°N, 179°W to 130°W
- **Reflectivity Range**: 5-75+ dBZ
- **Update Frequency**: Hourly (HRRR), Real-time (NEXRAD)
- **Auto-refresh**: Every 15 minutes

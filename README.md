# Alaska Radar Viewer

A GitHub Pages application that displays real-time radar observations for Alaska using NOAA's official MRMS radar service and Iowa Environmental Mesonet data.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **NOAA MRMS Radar**: Official real-time radar - **Full Alaska + CONUS coverage**
  - **Iowa Mesonet NEXRAD**: Alternative real-time source for comparison
- Independent layer toggle controls
- Auto-refresh every 15 minutes
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## Data Sources

### NOAA MRMS Radar (Primary)
- **Service**: NOAA Weather Map Services WMS ImageServer
- **Coverage**: ✅ **Alaska, CONUS, Caribbean, Guam, Hawaii**
- **Data**: Multi-Radar Multi-Sensor (MRMS) algorithm
- **Update frequency**: Every 10 minutes
- **Window**: 4-hour moving window
- **Protocol**: WMS 1.3.0 via Leaflet WMS layer

**Why this works for Alaska:**
- Official NOAA service explicitly includes Alaska coverage
- Real-time radar composites from multiple sources
- No CORS restrictions
- Professional-grade reliability

### Iowa Environmental Mesonet NEXRAD (Secondary)
- Iowa Environmental Mesonet NEXRAD composite (N0Q product)
- Real-time observations
- Full Alaska and CONUS coverage
- Alternative view for comparison

## About Alaska HRRR Model Data

HRRR forecast model data for Alaska exists but is **NOT available as pre-rendered tiles**. To access Alaska HRRR, see:
- **Static images**: https://rapidrefresh.noaa.gov/alaska/ (web viewer)
- **GRIB2 files**: AWS S3 `noaa-hrrr-bdp-pds` bucket (requires backend processing)
- **Python access**: Use Herbie package to download GRIB2 files

For browser-based visualization, the NOAA MRMS radar provides excellent real-time Alaska coverage.

## How It Works

1. **WMS Layer**: Loads NOAA MRMS radar via WMS protocol with Leaflet
2. **Alaska Coverage**: WMS service explicitly includes Alaska in coverage area
3. **Tile Layer**: Iowa Mesonet NEXRAD loaded as standard XYZ tiles
4. **Dual Display**: Both layers shown simultaneously with independent opacity controls
5. **Auto-refresh**: Layers reload every 15 minutes to get latest data

## Deployment

The site automatically deploys to GitHub Pages when you push to any branch starting with `claude/` via GitHub Actions.

## Local Development

Simply open `index.html` in a web browser to test locally.

## Usage

- **Refresh All**: Manually reload both radar layers
- **Hide/Show NOAA**: Toggle the NOAA MRMS radar overlay
- **Hide/Show Iowa**: Toggle the Iowa Mesonet NEXRAD overlay
- **Zoom/Pan**: Standard Leaflet map controls

## Technology Stack

- Leaflet.js for interactive mapping (with WMS support)
- OpenStreetMap tiles for base layer
- NOAA Weather Map Services WMS for Alaska radar coverage
- Iowa Environmental Mesonet for NEXRAD comparison layer
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

- **Primary Data**: NOAA MRMS radar via WMS ImageServer
- **Coverage**: Alaska, CONUS, Caribbean, Guam, Hawaii
- **Reflectivity Range**: 5-75+ dBZ
- **Update Frequency**: Every 10 minutes (NOAA), Real-time (Iowa Mesonet)
- **Auto-refresh**: Every 15 minutes
- **Formats**: WMS 1.3.0 (NOAA) + PNG XYZ tiles (Iowa Mesonet)
- **Service URL**: `mapservices.weather.noaa.gov/eventdriven/services/radar/radar_base_reflectivity_time/ImageServer/WMSServer`

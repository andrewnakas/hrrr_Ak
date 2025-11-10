# Alaska HRRR Radar Viewer

A GitHub Pages application displaying Alaska HRRR (High-Resolution Rapid Refresh) composite reflectivity forecast data using real GRIB2 files from NOAA's AWS S3 bucket, rendered via TiTiler.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **HRRR Alaska**: NOAA forecast model composite reflectivity (3km resolution) - **Full Alaska coverage**
  - **NEXRAD (Backup)**: Real-time radar observations
- Independent layer toggle controls
- Auto-refresh every 3 hours (when new HRRR runs available)
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## How It Works

This application uses actual HRRR Alaska GRIB2 files from NOAA's public AWS S3 bucket and renders them as PNG map overlays using TiTiler, a dynamic raster tile server. This is the same approach used by Development Seed's NOAA HRRR Browser.

1. **Determine HRRR Run**: Finds most recent 3-hour HRRR Alaska run (00, 03, 06, 09, 12, 15, 18, 21 UTC)
2. **Access GRIB2 File**: Locates the F000 (0-hour forecast) composite reflectivity GRIB2 file on AWS S3
3. **Render via TiTiler**: TiTiler reads the GRIB2 file and renders it as a georeferenced PNG with custom colormap
4. **Display on Map**: Leaflet displays the rendered image as an overlay with proper Alaska bounds
5. **Auto-refresh**: Reloads HRRR image every 3 hours when new model run available

## Data Sources

### HRRR Alaska (Primary)
- **Service**: TiTiler rendering NOAA HRRR Alaska GRIB2 files from AWS S3
- **Data Source**: `s3://noaa-hrrr-bdp-pds/hrrr.YYYYMMDD/alaska/`
- **File**: `hrrr.tHHz.wrfsfcf00.ak.grib2` (surface fields, F000)
- **Band**: 1 (composite reflectivity at surface)
- **Coverage**: ✅ **Full Alaska domain** (51°N-71.5°N, 179°W-130°W)
- **Resolution**: 3km
- **Update frequency**: Every 3 hours (00, 03, 06, 09, 12, 15, 18, 21 UTC)
- **Forecast**: 0-hour (F000) - analysis/nowcast
- **TiTiler**: `https://raster.eoapi.dev/external/bbox/`
- **Format**: PNG image overlay dynamically rendered from GRIB2

### NEXRAD (Backup)
- **Service**: Iowa Environmental Mesonet NEXRAD composite (N0Q product)
- **Coverage**: Full Alaska and CONUS
- **Type**: Real-time radar observations
- **Update**: Near real-time
- **Format**: XYZ tile service

## Deployment

The site automatically deploys to GitHub Pages when you push to any branch starting with `claude/` via GitHub Actions.

## Local Development

Simply open `index.html` in a web browser to test locally.

## Usage

- **Refresh HRRR**: Manually reload latest HRRR Alaska image
- **Hide/Show HRRR**: Toggle the HRRR Alaska forecast overlay
- **Hide/Show NEXRAD**: Toggle the NEXRAD real-time radar
- **Zoom/Pan**: Standard Leaflet map controls

## Technology Stack

- **Leaflet.js** - Interactive mapping with image overlay support
- **OpenStreetMap** - Base map tiles
- **TiTiler** - Dynamic GRIB2 to PNG rendering (via raster.eoapi.dev)
- **AWS S3** - NOAA HRRR Alaska GRIB2 file storage (noaa-hrrr-bdp-pds bucket)
- **Iowa Environmental Mesonet** - NEXRAD backup tiles
- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD pipeline

## File Structure

```
├── index.html           # Main application
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment
└── README.md
```

## Technical Details

### HRRR Alaska Data Access

**AWS S3 Path Pattern:**
```
s3://noaa-hrrr-bdp-pds/hrrr.YYYYMMDD/alaska/hrrr.tHHz.wrfsfcf00.ak.grib2
```

**Example URL:**
```
https://noaa-hrrr-bdp-pds.s3.amazonaws.com/hrrr.20251110/alaska/hrrr.t00z.wrfsfcf00.ak.grib2
```

**TiTiler Rendering:**
```javascript
const gribUrl = `https://noaa-hrrr-bdp-pds.s3.amazonaws.com/hrrr.${dateStr}/alaska/hrrr.${hourStr}.wrfsfcf00.ak.grib2`;
const vrtUrl = `vrt://${gribUrl}?bands=1`;
const bbox = '-179.0,51.0,-130.0,71.5';  // min_lon,min_lat,max_lon,max_lat
const tileUrl = `https://raster.eoapi.dev/external/bbox/${bbox}.png?url=${vrtUrl}&colormap=${colormap}&dst_crs=epsg:3857`;
```

**Composite Reflectivity Colormap (dBZ):**
- 5-10 dBZ: Light cyan (light precipitation)
- 10-20 dBZ: Blue (light to moderate precipitation)
- 20-35 dBZ: Green (moderate to heavy precipitation)
- 35-50 dBZ: Yellow to orange (heavy precipitation)
- 50-65 dBZ: Red (very heavy precipitation)
- 65-75 dBZ: Magenta/purple (extreme precipitation)

### Model Specifications

- **Model**: HRRR Alaska (hrrrak)
- **Resolution**: 3km horizontal grid spacing
- **Domain**: Full Alaska
- **Update Schedule**: Every 3 hours (00Z, 03Z, 06Z, 09Z, 12Z, 15Z, 18Z, 21Z)
- **Forecast Length**: 0-48 hours (this app uses F000/analysis only)
- **Data Latency**: Typically available 1-2 hours after model run time
- **File Format**: GRIB2
- **File Size**: ~20-30 MB per file (all bands)
- **Rendered Image**: ~10-20 KB PNG

## How This Solution Works

### The Problem
NOAA's rapidrefresh.noaa.gov Alaska service uses CGI scripts that were experiencing service disruptions. There are no pre-rendered tile services for Alaska HRRR composite reflectivity (unlike CONUS HRRR which has Iowa Mesonet tiles).

### The Solution
1. **Direct GRIB2 Access**: HRRR Alaska GRIB2 files are publicly available on AWS S3 (`noaa-hrrr-bdp-pds` bucket)
2. **TiTiler Processing**: TiTiler is a dynamic tile server that can read GRIB2 files and render them as images
3. **VRT URL**: Using GDAL's Virtual Raster (VRT) format, we can reference the S3 GRIB2 file and select specific bands
4. **Bounding Box Rendering**: TiTiler's `/external/bbox/` endpoint renders exactly the geographic area we need (Alaska)
5. **Custom Colormap**: We apply the standard NOAA composite reflectivity colormap to the rendered image
6. **Client-Side**: Everything runs in the browser - no server-side processing needed for the GitHub Pages app

### Credits
This approach is based on Development Seed's [NOAA HRRR Browser](https://github.com/developmentseed/noaa-hrrr-browser), which demonstrates using TiTiler to visualize HRRR model data. We adapted their method for Alaska-specific GRIB2 files.

## License

MIT License - This project uses publicly available NOAA data and open-source tools.

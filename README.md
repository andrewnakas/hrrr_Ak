# Alaska HRRR Radar Viewer

A GitHub Pages application that displays Alaska HRRR (High-Resolution Rapid Refresh) composite reflectivity forecast data directly from NOAA's RapidRefresh service, using the same method as NOAA's DESI tool.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **HRRR Alaska**: Official NOAA forecast model composite reflectivity - **Full Alaska coverage**
  - **NEXRAD**: Real-time observations for comparison
- Independent layer toggle controls
- Auto-refresh every 3 hours (when new HRRR runs available)
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## Data Sources

### HRRR Alaska (Primary)
- **Service**: NOAA RapidRefresh Alaska Model Graphics
- **URL**: `rapidrefresh.noaa.gov/alaska/displayMapUpdated.cgi`
- **Coverage**: ✅ **Full Alaska domain**
- **Product**: Composite reflectivity at surface (cref_full_sfc)
- **Update frequency**: Every 3 hours (00, 03, 06, 09, 12, 15, 18, 21 UTC)
- **Forecast**: 0-hour (F000) - current analysis
- **Format**: Static PNG image overlays
- **Model**: HRRR Alaska (hrrrak_ncep_jet)

**How we get the data:**
- Same method used by NOAA's DESI visualization tool
- Direct access to NOAA's CGI-generated HRRR Alaska images
- Parameters: runtime (YYYYMMDDHH), plot_type (cref_full_sfc), fcst (000)
- Image overlaid on map with proper Alaska geographic bounds

### NEXRAD (Backup/Comparison)
- Iowa Environmental Mesonet NEXRAD composite (N0Q product)
- Real-time observations
- Full Alaska and CONUS coverage
- Lower opacity for comparison with HRRR forecast

## How It Works

1. **Determine HRRR Run**: Finds most recent 3-hour HRRR Alaska run (00, 03, 06, 09, 12, 15, 18, 21 UTC)
2. **Build Image URL**: Constructs URL with runtime and parameters for composite reflectivity
3. **Image Overlay**: Uses Leaflet's L.imageOverlay() to display PNG over Alaska bounds
4. **NEXRAD Layer**: Loads real-time NEXRAD tiles for comparison
5. **Auto-refresh**: Reloads HRRR image every 3 hours when new model run available

**Same as DESI**: This implementation uses the exact same `displayMapUpdated.cgi` endpoint that powers NOAA's DESI visualization tool at sites.gsl.noaa.gov/desi/

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

- Leaflet.js for interactive mapping (with image overlay support)
- OpenStreetMap tiles for base layer
- NOAA RapidRefresh CGI scripts for HRRR Alaska images
- Iowa Environmental Mesonet for NEXRAD comparison tiles
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

- **HRRR Model**: 3-km resolution Alaska domain
- **Update Schedule**: Every 3 hours (00Z, 03Z, 06Z, 09Z, 12Z, 15Z, 18Z, 21Z)
- **Coverage**: Full Alaska (51°N-71.5°N, 179°W-130°W)
- **Reflectivity Range**: 5-75+ dBZ
- **Image Format**: PNG overlays from NOAA RapidRefresh
- **Auto-refresh**: Every 3 hours (aligned with model runs)
- **CGI Endpoint**: `https://rapidrefresh.noaa.gov/alaska/displayMapUpdated.cgi`
- **Parameters**:
  - keys: `hrrrak_ncep_jet:`
  - plot_type: `cref_full_sfc` (composite reflectivity)
  - fcst: `000` (0-hour/analysis)
  - domain: `full:hrrrak` (full Alaska domain)

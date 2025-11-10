# Alaska Radar Viewer

A GitHub Pages application displaying Alaska radar data with NEXRAD real-time observations and attempted HRRR (High-Resolution Rapid Refresh) composite reflectivity forecast data from NOAA's RapidRefresh service.

## Features

- Interactive map centered on Alaska
- **Dual-layer radar display:**
  - **NEXRAD (Primary)**: Real-time radar observations - **Reliable Alaska coverage**
  - **HRRR Alaska (Attempted)**: NOAA forecast model composite reflectivity - **Currently limited availability**
- Independent layer toggle controls
- Auto-refresh every 3 hours (for HRRR when available)
- Reflectivity color mapping (5-75+ dBZ)
- Responsive design

## Important Note

**Alaska HRRR imagery availability is currently limited.** The NOAA rapidrefresh.noaa.gov service that provides Alaska HRRR composite reflectivity images is experiencing service limitations. The application attempts to load HRRR Alaska imagery, but it may not display reliably. NEXRAD real-time radar provides consistent, reliable coverage for Alaska.

## Data Sources

### NEXRAD (Primary - Reliable)
- **Service**: Iowa Environmental Mesonet NEXRAD composite (N0Q product)
- **Coverage**: ✅ **Full Alaska and CONUS coverage**
- **Type**: Real-time radar observations
- **Update**: Near real-time
- **Reliability**: High - consistent tile service
- **Format**: XYZ tile service
- **Attribution**: Iowa Environmental Mesonet

### HRRR Alaska (Attempted - Limited Availability)
- **Service**: NOAA RapidRefresh Alaska Model Graphics
- **URL**: `rapidrefresh.noaa.gov/alaska/displayMapUpdated.cgi`
- **Coverage**: Full Alaska domain (when available)
- **Product**: Composite reflectivity at surface (cref_full_sfc)
- **Update frequency**: Every 3 hours (00, 03, 06, 09, 12, 15, 18, 21 UTC) when service is operational
- **Forecast**: 0-hour (F000) - current analysis
- **Format**: CGI-generated image overlays
- **Model**: HRRR Alaska (hrrrak_ncep_jet)
- **Current Status**: ⚠️ **Service experiencing limitations** - NOAA rapidrefresh.noaa.gov may not serve images reliably

**How we attempt to get HRRR data:**
- Same method used by NOAA's DESI visualization tool
- Attempts to access NOAA's CGI-generated HRRR Alaska images
- Parameters: runtime (YYYYMMDDHH), plot_type (cref_full_sfc), fcst (000)
- Image overlay with Alaska geographic bounds
- **Note**: May fail silently if service is unavailable

## How It Works

1. **NEXRAD Tiles**: Loads reliable real-time NEXRAD radar tiles from Iowa Mesonet covering Alaska
2. **Determine HRRR Run**: Attempts to find most recent 3-hour HRRR Alaska run (00, 03, 06, 09, 12, 15, 18, 21 UTC)
3. **Build HRRR URL**: Constructs URL with runtime and parameters for composite reflectivity
4. **Image Overlay Attempt**: Uses Leaflet's L.imageOverlay() to attempt displaying HRRR PNG over Alaska bounds
5. **Auto-refresh**: Attempts to reload HRRR image every 3 hours when new model run should be available

**Same Method as DESI**: The HRRR implementation uses the exact same `displayMapUpdated.cgi` endpoint that powers NOAA's DESI visualization tool at sites.gsl.noaa.gov/desi/, but both may be affected by service availability limitations.

## Deployment

The site automatically deploys to GitHub Pages when you push to any branch starting with `claude/` via GitHub Actions.

## Local Development

Simply open `index.html` in a web browser to test locally.

## Usage

- **Refresh HRRR**: Manually attempt to reload latest HRRR Alaska image
- **Hide/Show HRRR**: Toggle the HRRR Alaska forecast overlay attempt
- **Hide/Show NEXRAD**: Toggle the NEXRAD real-time radar (primary layer)
- **Zoom/Pan**: Standard Leaflet map controls

**Tip**: NEXRAD provides the most reliable radar coverage for Alaska. HRRR Alaska is attempted but may not be visible if the NOAA service is unavailable.

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
- **Update Schedule**: Every 3 hours (00Z, 03Z, 06Z, 09Z, 12Z, 15Z, 18Z, 21Z) when operational
- **Coverage**: Full Alaska (51°N-71.5°N, 179°W-130°W)
- **Reflectivity Range**: 5-75+ dBZ
- **Image Format**: Attempted PNG overlays from NOAA RapidRefresh
- **Auto-refresh**: Every 3 hours (aligned with model runs when available)
- **CGI Endpoint**: `https://rapidrefresh.noaa.gov/alaska/displayMapUpdated.cgi`
- **Parameters**:
  - keys: `hrrrak_ncep_jet:`
  - plot_type: `cref_full_sfc` (composite reflectivity)
  - fcst: `000` (0-hour/analysis)
  - domain: `full:hrrrak` (full Alaska domain)

## Known Limitations

### Alaska HRRR Imagery Availability

**Current Status**: The NOAA rapidrefresh.noaa.gov Alaska service that provides HRRR composite reflectivity imagery is experiencing limitations. Investigation revealed:

1. **Service Status**: The rapidrefresh.noaa.gov/alaska site shows: "The U.S. Government is closed. This site will not be updated."
2. **CGI Errors**: All displayMapUpdated.cgi requests return "ERROR IN DISPLAY MAP - COULD NOT DISPLAY IMAGES"
3. **No Tile Service**: Unlike CONUS HRRR, there is no tile-based service available for Alaska HRRR composite reflectivity
4. **GRIB2 Alternative**: Raw GRIB2 files are available via AWS S3/NOMADS but require server-side processing (TiTiler, Herbie, etc.) which isn't feasible for a client-side GitHub Pages application

**Workaround**: The application uses NEXRAD real-time radar observations from Iowa Environmental Mesonet, which provides reliable Alaska coverage. NEXRAD shows actual radar returns (observations) rather than model forecasts.

**Future**: The HRRR Alaska overlay code remains in place and will automatically work if/when the NOAA service resumes normal operations.

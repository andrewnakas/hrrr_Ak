# Alaska HRRR REFC Radar Viewer

A GitHub Pages application that displays Alaska HRRR (High-Resolution Rapid Refresh) REFC (Composite Reflectivity) radar data on an interactive Leaflet map.

## Features

- Interactive map centered on Alaska
- Real-time radar imagery overlay
- Auto-refresh every 5 minutes
- Manual refresh button
- Toggle overlay visibility
- Responsive design

## Data Source

The application fetches radar data from NOAA NowCOAST service, with fallback to Iowa Environmental Mesonet NEXRAD imagery.

## Deployment

The site automatically deploys to GitHub Pages when you push to any branch starting with `claude/` via GitHub Actions.

## Local Development

Simply open `index.html` in a web browser to test locally.

## Usage

- **Refresh**: Click the refresh button to fetch the latest radar data
- **Toggle**: Show/hide the radar overlay
- **Zoom**: Use mouse wheel or zoom controls to zoom in/out
- **Pan**: Click and drag to pan the map

## Technology Stack

- Leaflet.js for interactive mapping
- OpenStreetMap tiles for base layer
- NOAA NowCOAST for radar data
- GitHub Pages for hosting
- GitHub Actions for CI/CD

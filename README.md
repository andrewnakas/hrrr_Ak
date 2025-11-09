# Alaska Radar Viewer

A GitHub Pages application that displays real-time Alaska radar data (NEXRAD composite reflectivity) on an interactive Leaflet map.

## Features

- Interactive map centered on Alaska
- Real-time NEXRAD radar imagery overlay
- Auto-refresh every 5 minutes
- Manual refresh button
- Toggle overlay visibility
- Responsive design

## Data Source

The application uses Iowa Environmental Mesonet's NEXRAD composite reflectivity (N0Q product) which provides real-time radar coverage for Alaska and the continental United States, with RainViewer as a fallback.

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

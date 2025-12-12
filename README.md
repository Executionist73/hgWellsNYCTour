# Wellsian NYC Tour

A self-guided walking tour website featuring New York City locations connected to H.G. Wells' 1906 visit to America. Features an interactive map with location pins and historical narratives with audio content and transcripts.

## Features

- **Classic Literary Theme**: Vintage-inspired design with warm amber tones and classic typography
- **Interactive Map**: Leaflet-powered map with 11 historical NYC locations
  - Hover over pins to see location information
  - Click pins to smoothly scroll to corresponding narrative sections
  - Shows walking route between Upper Manhattan locations
- **Historical Narratives**: Each location includes:
  - Excerpts from H.G. Wells' writings about New York
  - Audio narration for select locations (4 audio files)
  - Full transcript display with expand/collapse functionality
  - Historical context and references
- **Additional Content**: Includes the 1940 Orson Welles and H.G. Wells interview
- **Complete Works Cited**: Comprehensive bibliography with all sources
- **Responsive Design**: Works beautifully on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding Audio Files

Place your audio files in the `public/audio/` directory and update the `audioUrl` paths in `lib/locations.ts` to match your file names.

Example:
- `public/audio/location-1.mp3`
- `public/audio/location-2.mp3`
- etc.

### Customizing Locations

Edit `lib/locations.ts` to add, remove, or modify tour locations. Each location includes:
- `id`: Unique identifier
- `name`: Display name
- `description`: Short description shown in map popup
- `coordinates`: [latitude, longitude] array
- `audioUrl`: Path to audio file
- `transcript`: Full text transcript

## Project Structure

```
bike-tour-website/
├── app/
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles and theme
├── components/
│   ├── Header.tsx       # Site header component
│   ├── TourMap.tsx      # Interactive map component
│   └── AudioSection.tsx # Audio player with transcript
├── lib/
│   └── locations.ts     # Location data and types (11 locations)
├── public/
│   ├── audio/           # Audio files (4 MP3s)
│   └── images/          # Location icons
└── WellsTour/           # Source materials
    ├── Audio/           # Original audio recordings
    ├── Map/             # KML map data
    └── Text/            # Original text content (DOCX/PDF)
```

## Design Theme

The website features a classic, literary aesthetic appropriate for historical content:

- **Colors**: Warm amber tones (#92400e and variations), subtle gradients
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Style**: Vintage academic feel with subtle textures, borders, and shadows
- **Layout**: Split-screen design with sticky map on one side, scrolling content on the other

## Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety throughout
- **Tailwind CSS 4**: Utility-first styling
- **React Leaflet**: Interactive map integration with OpenStreetMap
- **Lucide React**: Icon components

## Build

```bash
npm run build
npm start
```

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch:**
   - The workflow will automatically build and deploy your site
   - Your site will be available at `https://[username].github.io/[repository-name]/`

3. **Manual deployment:**
   - You can also trigger the workflow manually from the Actions tab

The deployment workflow:
- Builds the Next.js static export
- Deploys to the `gh-pages` branch automatically
- Configures the correct base path for your repository

### Local Testing

To test the static export locally:

```bash
npm run build
npx serve out
```

## License

MIT

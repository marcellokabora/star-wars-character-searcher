# Star Wars Character Searcher

A web application that allows users to search for Star Wars characters and view their basic details using the SWAPI (Star Wars API).

## Features

- **Search Bar**: Search for Star Wars characters by name with debounced input (300ms delay)
- **Character List**: Display matching characters showing name and birth year
- **Inline Character Profile**: Click a character to expand an inline detail view showing:
  - Name
  - Birth Year
  - Gender
- **Loading Spinner**: Visual feedback while fetching data from the API
- **Error Handling**: Graceful handling of API errors with user-friendly messages
- **Empty States**:
  - Initial prompt: "Search for a character above"
  - No results: "No characters found"

## Tech Stack

- **Framework**: [Lit](https://lit.dev/) (Web Components)
- **Language**: Vanilla JavaScript (ES6+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Scoped CSS within components
- **API**: [SWAPI](https://swapi.dev/) (Star Wars API)

## Project Structure

```
sw-character-search/
├── index.html              # Main HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration (optional)
├── README.md               # This file
└── src/
    ├── main.js             # App entry point (imports all components)
    ├── components/
    │   ├── sw-app.js           # Main app shell component
    │   ├── sw-search-input.js  # Search input with debouncing
    │   ├── sw-character-list.js # Character list with inline details
    │   └── sw-spinner.js       # Loading spinner component
    └── services/
        └── swapi-service.js    # SWAPI fetch logic
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/sw-character-search.git
   cd sw-character-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |

## API Reference

This app uses the [SWAPI People endpoint](https://swapi.dev/documentation#people):

- **Search endpoint**: `https://swapi.dev/api/people/?search={query}`
- **Response fields used**:
  - `name` - Character's name
  - `birth_year` - Birth year (e.g., "19BBY")
  - `gender` - Gender (male, female, n/a, etc.)

## Component Architecture

### `<sw-app>`

Main application shell that:

- Manages global state (characters, loading, error, hasSearched)
- Listens for `search` events from `<sw-search-input>`
- Renders conditional UI based on state

### `<sw-search-input>`

Search input component that:

- Debounces user input (300ms)
- Dispatches custom `search` event with query string

### `<sw-character-list>`

Character list component that:

- Receives `characters` array as property
- Tracks `selectedUrl` for expanded character
- Renders inline detail view for selected character

### `<sw-spinner>`

Simple loading spinner with CSS keyframe animation.

## Browser Support

This app uses modern web standards (Web Components, ES6+) and should work in all modern browsers:

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## Acknowledgments

- [SWAPI](https://swapi.dev/) - The Star Wars API
- [Lit](https://lit.dev/) - Simple. Fast. Web Components.
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

# Theme System Documentation

## Overview

The portfolio now includes a comprehensive theme system that allows users to switch between different color schemes. The theme switcher is integrated into the navigation bar as a dropdown menu.

## Available Themes

1. **Default** - Original orange/red gradient theme
2. **Ocean Blue** - Cool blue tones inspired by the ocean
3. **Forest Green** - Natural green tones
4. **Sunset Purple** - Purple and pink gradient
5. **Midnight** - Dark purple/blue theme
6. **Coral Reef** - Warm coral and pink tones

## Available Fonts

1. **Baloo 2** (Default) - Friendly, rounded cursive font
2. **Roboto** - Modern, clean sans-serif
3. **Open Sans** - Highly readable sans-serif
4. **Montserrat** - Geometric sans-serif
5. **Poppins** - Geometric sans-serif with a friendly feel
6. **Lato** - Humanist sans-serif
7. **Nunito** - Rounded sans-serif
8. **Raleway** - Elegant thin sans-serif
9. **Ubuntu** - Modern humanist sans-serif
10. **Source Code Pro** - Monospace font for a technical look

## How It Works

### Theme System Components

1. **`js/themes.js`** - Core theme configuration and management

   - Contains all theme definitions with color variables
   - `applyTheme(themeName)` - Applies a theme by updating CSS variables
   - `getCurrentTheme()` - Gets the saved theme preference
   - `initializeTheme()` - Loads saved theme on page load

2. **`components/theme-switcher.js`** - Web component for the theme dropdown

   - Displays current theme
   - Shows dropdown menu with all available themes
   - Handles theme selection and updates
   - Syncs with localStorage for persistence

3. **CSS Variables** - All colors are defined as CSS custom properties in `:root`
   - Themes update these variables dynamically
   - All components automatically reflect theme changes

### Font System Components

1. **`js/fonts.js`** - Core font configuration and management

   - Contains all font definitions with Google Fonts integration
   - `applyFont(fontKey)` - Applies a font by loading it dynamically and updating CSS variables
   - `getCurrentFont()` - Gets the saved font preference
   - `initializeFont()` - Loads saved font on page load

2. **`components/font-switcher.js`** - Web component for the font dropdown
   - Displays current font
   - Shows dropdown menu with all available fonts
   - Handles font selection and updates
   - Syncs with localStorage for persistence
   - Dynamically loads Google Fonts on demand

### Adding a New Theme

To add a new theme, edit `js/themes.js` and add a new theme object:

```javascript
newTheme: {
  name: 'Display Name',
  font: {
    name: 'Font Name',
    family: '"Font Family", fallback',
    googleFont: 'Font+Name:wght@400;700'
  },
  colors: {
    '--primary-bg': '#hexcolor',
    '--primary-text': '#hexcolor',
    // ... add all required color variables
  }
}
```

Then add the theme option to `components/theme-switcher.js`:

```html
<li><a href="#" data-theme="newTheme">Display Name</a></li>
```

### Customizing Themes

All customizable colors are defined in the theme configuration. Each theme includes:

- **Primary Colors**: Background and text colors
- **Gradient Colors**: Used for accents and decorative elements
- **Container Background**: Main section background gradients
- **Navigation Colors**: Nav bar styling
- **Scrollbar Colors**: Custom scrollbar appearance
- **UI Element Colors**: Chips, tooltips, modals, etc.

### Usage

Users can:

1. **Change Theme**: Click the theme dropdown in the navigation bar and select any theme
2. **Change Font**: Click the font dropdown in the navigation bar and select any font
3. **Instant Apply**: Changes are applied instantly
4. **Persistent**: Selections are saved and persist across page reloads

### Technical Details

- **Storage**: Theme preference stored in `localStorage`
- **Initialization**: Theme loads before page render to prevent flashing
- **Performance**: Uses CSS custom properties for instant color switching
- **Font Loading**: Google Fonts loaded dynamically on theme selection
- **Caching**: Fonts are cached by the browser after first load
- **Compatibility**: Works across all modern browsers

## File Structure

```
Portfolio/
├── js/
│   └── themes.js                # Theme definitions (colors + fonts)
├── components/
│   ├── theme-switcher.js       # Theme switcher web component
│   └── navbar.js               # Updated to include theme switcher
├── css/
│   ├── style.css               # Updated with CSS variables
│   └── Home.css                # Updated with CSS variables
└── index.html                  # Loads theme system
```

## Browser Support

The theme system works in all modern browsers that support:

- CSS Custom Properties (CSS Variables)
- ES6 Modules
- Web Components
- LocalStorage
- Dynamic Font Loading

This includes Chrome, Firefox, Safari, and Edge (latest versions).

## Example Usage

### Programmatic Theme Change

```javascript
import { applyTheme } from "./js/themes.js";
applyTheme("ocean"); // Switch to Ocean Blue theme (colors + font)
```

### Get Current Theme

```javascript
import { getCurrentTheme } from "./js/themes.js";

const theme = getCurrentTheme(); // e.g., 'default'
```

- LocalStorage
- Dynamic Font Loading

This includes Chrome, Firefox, Safari, and Edge (latest versions).

## Example Usage

### Programmatic Theme Change

```javascript
import { applyTheme } from "./js/themes.js";
applyTheme("ocean"); // Switch to Ocean Blue theme
```

### Programmatic Font Change

```javascript
import { applyFont } from "./js/fonts.js";
applyFont("roboto"); // Switch to Roboto font
```

### Get Current Settings

```javascript
import { getCurrentTheme } from "./js/themes.js";
import { getCurrentFont } from "./js/fonts.js";

const theme = getCurrentTheme(); // e.g., 'default'
const font = getCurrentFont(); // e.g., 'baloo'
```

# Translation System - Modular Structure

This document explains the new modular translation system for the portfolio website.

## File Structure

```
js/
├── translate.js              # Main translation logic and initialization
├── translate-backup.js       # Backup of original translate.js
└── translations/
    ├── index.js              # Central exports for all translations
    ├── en.js                 # English translations
    ├── nl.js                 # Dutch translations
    └── mi.js                 # Minionese translations
```

## How It Works

### 1. Translation Files (`translations/`)
Each language has its own file with clean, organized translations:

- **`en.js`** - English translations
- **`nl.js`** - Dutch translations  
- **`mi.js`** - Minionese translations
- **`index.js`** - Combines all translations into a single export

### 2. Main Translation Logic (`translate.js`)
The main file handles:
- Loading translations from the modular files
- Updating DOM elements with `data-i18n` attributes
- Managing language switching
- Saving user preferences
- Setting up event listeners

### 3. Language Configuration
Languages are configured in a clean object:
```javascript
const LANGUAGE_CONFIG = {
  en: { name: "English", default: true },
  nl: { name: "Nederlands" },
  mi: { name: "Minionese" }
};
```

## Benefits of This Structure

### ✅ **Better Organization**
- Each language is in its own file
- Easy to find and edit specific translations
- Clear separation of concerns

### ✅ **Easier Maintenance**
- Add new languages by creating a new file in `translations/`
- Update translations without scrolling through massive files
- Better version control with smaller, focused files

### ✅ **Improved Readability**
- Clean, focused files
- No more 300+ line translation objects
- Better code documentation

### ✅ **Scalability**
- Easy to add new languages
- Simple to add translation categories
- Modular imports allow for code splitting

## Adding a New Language

1. Create a new file: `translations/[language-code].js`
2. Export the translations object:
   ```javascript
   export const [languageCode] = {
     // translations here
   };
   ```
3. Add the import to `translations/index.js`:
   ```javascript
   import { [languageCode] } from './[language-code].js';
   ```
4. Add to the exports object in `translations/index.js`:
   ```javascript
   export const translations = {
     en,
     nl,
     mi,
     [languageCode] // Add your new language here
   };
   ```
5. Update `LANGUAGE_CONFIG` in `translate.js`

## HTML Updates

All HTML files now use ES6 modules:
```html
<script type="module" defer src="js/translate.js"></script>
```

## Backward Compatibility

The original `translate.js` is backed up as `translate-backup.js` for reference or rollback if needed.

## Usage

The system works exactly the same as before:
- Use `data-i18n="key"` attributes on HTML elements
- Language switching works automatically
- Preferences are saved to localStorage
- Age display integration works as before

The only difference is the improved file organization and maintainability!

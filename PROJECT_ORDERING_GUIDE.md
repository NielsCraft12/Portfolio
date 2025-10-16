# Project Ordering System Documentation

## Overview

The project ordering system allows you to customize the order of project cards on your portfolio website using URL parameters. The system remembers your preference and applies it when you visit the site normally.

## How to Use

### Basic Usage

Add an `order` parameter to your URL with comma-separated project identifiers:

```
https://yourwebsite.com/?order=portfolio,merge-packing,wa-lch
```

### Available Project Identifiers

You can use any of these identifiers to reference projects:

- `wa-lch-origins` - WA-LCH Origins (2025)
- `portfolio` - Portfolio Website (2025)
- `merge-packing` - Merge Packing (2025)
- `wa-lch` - WA-LCH (2024)
- `you-only-have-one-box` - You Only Have One Box (2024)
- `slimetastic-punchout` - Slimetastic Punchout (2024)
- `3d-printing` - 3D Printing Projects (2025)

### Examples

#### Example 1: Put Portfolio first (will auto-switch to "Web" tab)

```
https://yourwebsite.com/?order=portfolio,wa-lch-origins,merge-packing,wa-lch
```

#### Example 2: Show newest games first (will auto-switch to "Games" tab)

```
https://yourwebsite.com/?order=wa-lch-origins,merge-packing,you-only-have-one-box,slimetastic-punchout,wa-lch
```

#### Example 3: Mixed custom order starting with a game (will auto-switch to "Games" tab)

```
https://yourwebsite.com/?order=merge-packing,portfolio,slimetastic-punchout
```

### How It Works

1. **URL Parameters**: When you visit a URL with the `order` parameter, the system reads the custom order
2. **Automatic Category Switch**: The system automatically switches to the category tab of the first project in your custom order
3. **Immediate Application**: The projects are reordered immediately when the page loads
4. **Persistent Storage**: Your custom order is saved in browser storage (localStorage)
5. **Memory**: When you visit the site normally (without URL parameters), it remembers and applies your last custom order
6. **Override**: Visiting with a new `order` parameter will override the previous custom order

### Technical Details

#### Project Identification

Projects can be identified by:

- **Slug**: Short identifier like `portfolio`, `wa-lch`
- **File name**: Part of the project HTML file name
- **Title**: Part of the project title text

#### Order Behavior

- Projects specified in the `order` parameter appear first in that exact order
- Any projects not mentioned in the custom order appear after the specified ones in their default order
- The system respects the existing project filtering (games, web, etc.)
- Maximum 6 projects are shown as per the original design

#### Persistence

- Custom orders are stored in `localStorage` with key `portfolio-custom-order`
- Orders persist across browser sessions
- Only overridden when a new URL with `order` parameter is visited

### Reset to Default

To reset to the default order:

1. Visit the site without any `order` parameter
2. Use browser developer tools to clear localStorage: `localStorage.removeItem('portfolio-custom-order')`
3. Or use the built-in reset function: `window.projectOrdering.resetOrder()`

### Browser Compatibility

- Works in all modern browsers that support:
  - URLSearchParams API
  - localStorage API
  - ES6+ JavaScript features

### Notes

- The custom ordering works independently of the project category filtering (Games, Web, etc.)
- **Automatic Category Switch**: When using URL parameters, the system automatically switches to the category of the first project in your order
- Projects not included in the URL parameter will appear after the specified ones
- Invalid project identifiers in the URL are ignored
- Case-sensitive project identifiers

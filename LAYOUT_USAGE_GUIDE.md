# Project Layout Usage Guide

This guide explains how to use the new project layout template that's been integrated into your portfolio.

## What's Been Updated

The `wa-lch.html` file has been converted to use your existing portfolio structure with:

✅ **Integrated Navigation**: Uses your existing `nav-bar` component  
✅ **Translation Support**: All text elements support your translation system  
✅ **Existing CSS**: Uses your `ProjectPage.css` styling  
✅ **Responsive Design**: Mobile-friendly layout with sidebar that collapses  
✅ **Image Modals**: Click screenshots to view them enlarged  
✅ **Code Blocks**: GitHub integration with syntax highlighting  

## How to Customize for Other Projects

### 1. Copy the Template
```bash
# Copy wa-lch.html as a starting point for new projects
cp projects/wa-lch.html projects/your-new-project.html
```

### 2. Update the PROJECT_DATA Configuration

Edit the JavaScript configuration object to match your project:

```javascript
const PROJECT_DATA = {
  // Project Info
  title: "Your Project Name",
  authorName: "Niels de Laat",

  // Main Content Sections
  sections: [
    {
      title: "Description", 
      content: "Your project description..."
    },
    {
      title: "Key Features",
      type: "list",
      items: [
        "Feature 1",
        "Feature 2", 
        "Feature 3"
      ]
    }
  ],

  // Code Examples
  codeBlocks: [
    {
      githubUrl: "https://github.com/NielsCraft12/your-repo",
      code: `// Your code example here
function example() {
  console.log("Hello World");
}`
    }
  ],

  // Project Images/Videos
  media: [
    {
      type: "image",
      src: "../images/webp/your-project.webp",
      alt: "Your Project Screenshot"
    }
  ],

  // Sidebar Content
  sidebar: {
    trailerUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    screenshots: [
      { src: "../images/png/your-project-1.png", alt: "Screenshot 1" },
      { src: "../images/png/your-project-2.png", alt: "Screenshot 2" }
    ],
    githubUrl: "https://github.com/NielsCraft12/your-repo"
  },

  // Embed (for playable games, etc.)
  embed: {
    enabled: true, // Set to false if no embed
    url: "https://your-game-url.com"
  }
};
```

### 3. Update Translation Keys

Add these translation keys to your language files (`js/translations/en.js`, `nl.js`, `mi.js`):

```javascript
// Add to your translation files
projects: {
  your_project_name: {
    title: "Your Project Title",
    description: "Project description for meta tags",
    trailer: "Trailer",
    screenshots: "Screenshots", 
    explore_code: "Explore Code",
    try_it_out: "Try It Out",
    sections: {
      0: {
        title: "Description",
        content: "Your project description..."
      },
      1: {
        title: "Key Features",
        items: {
          0: "Feature 1",
          1: "Feature 2",
          2: "Feature 3"
        }
      }
    }
  }
}
```

### 4. Update HTML Meta Tags

Change the title and meta information:

```html
<title data-i18n="projects.your_project.title">Your Project | Niels de Laat</title>
<meta name="description" data-i18n="projects.your_project.description" content="Your project description">
```

## Layout Features

### Responsive Grid Layout
- **Desktop**: Main content + sidebar in 2-column layout
- **Mobile**: Stacked single-column layout
- **Sticky Sidebar**: Stays in view while scrolling (desktop only)

### Interactive Elements
- **Image Modal**: Click any screenshot to view enlarged
- **Smooth Scrolling**: Anchor links scroll smoothly
- **GitHub Integration**: Code blocks link directly to repositories
- **Video Embeds**: YouTube trailers and game embeds

### Styling Customization

The layout uses CSS variables for easy customization in `css/ProjectPage.css`:

```css
:root {
  --primary-bg: #1a1a1a;        /* Main background */
  --accent-color: #4CAF50;      /* Green accent color */
  --text-color: #e0e0e0;        /* Main text color */
  --max-width: 1400px;          /* Max content width */
  --sidebar-width: 350px;       /* Sidebar width */
  /* ... more variables ... */
}
```

## Best Practices

1. **Images**: Use WebP format for better performance
2. **Screenshots**: Keep them consistently sized (around 350px width for sidebar)
3. **Code Blocks**: Keep them readable and well-commented
4. **Content**: Write clear, concise descriptions
5. **Translation**: Always add translation keys for new content

## Example Projects to Convert

You can apply this layout to your other projects:
- `3d-printing.html`
- `portfolio.html` 
- `mage-with-rage.html`
- `merge-packing.html`
- `Slimetastic-Punchout.html`

Each just needs the PROJECT_DATA configuration updated and translation keys added.
// Font configuration
export const fonts = {
  baloo: {
    name: "Baloo 2",
    family: '"Baloo 2", cursive',
    googleFont: "Baloo+2:wght@400;700",
  },
  roboto: {
    name: "Roboto",
    family: '"Roboto", sans-serif',
    googleFont: "Roboto:wght@400;700",
  },
  openSans: {
    name: "Open Sans",
    family: '"Open Sans", sans-serif',
    googleFont: "Open+Sans:wght@400;700",
  },
  montserrat: {
    name: "Montserrat",
    family: '"Montserrat", sans-serif',
    googleFont: "Montserrat:wght@400;700",
  },
  poppins: {
    name: "Poppins",
    family: '"Poppins", sans-serif',
    googleFont: "Poppins:wght@400;700",
  },
  lato: {
    name: "Lato",
    family: '"Lato", sans-serif',
    googleFont: "Lato:wght@400;700",
  },
  nunito: {
    name: "Nunito",
    family: '"Nunito", sans-serif',
    googleFont: "Nunito:wght@400;700",
  },
  raleway: {
    name: "Raleway",
    family: '"Raleway", sans-serif',
    googleFont: "Raleway:wght@400;700",
  },
  ubuntu: {
    name: "Ubuntu",
    family: '"Ubuntu", sans-serif',
    googleFont: "Ubuntu:wght@400;700",
  },
  sourceCodePro: {
    name: "Source Code Pro",
    family: '"Source Code Pro", monospace',
    googleFont: "Source+Code+Pro:wght@400;700",
  },
};

// Load Google Font dynamically
function loadGoogleFont(fontKey) {
  const font = fonts[fontKey];
  if (!font) return;

  // Check if font link already exists
  const existingLink = document.querySelector(`link[data-font="${fontKey}"]`);
  if (existingLink) return;

  // Create and append font link
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`;
  link.setAttribute("data-font", fontKey);
  document.head.appendChild(link);
}

// Font management functions
export function applyFont(fontKey) {
  const font = fonts[fontKey];
  if (!font) {
    console.error(`Font '${fontKey}' not found`);
    return;
  }

  // Load the Google Font if not already loaded
  loadGoogleFont(fontKey);

  // Apply font family to root
  const root = document.documentElement;
  root.style.setProperty("--font-family", font.family);
  document.body.style.fontFamily = font.family;

  // Save preference
  localStorage.setItem("preferredFont", fontKey);

  // Dispatch event for other components
  window.dispatchEvent(
    new CustomEvent("fontChanged", {
      detail: { font: fontKey },
    })
  );
}

export function getCurrentFont() {
  return localStorage.getItem("preferredFont") || "baloo";
}

export function initializeFont() {
  const savedFont = getCurrentFont();
  applyFont(savedFont);
}

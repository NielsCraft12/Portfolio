// Add this before the modal code
function updateNavigationLinks(lang) {
  document.querySelectorAll('.links-container a[href*="?lang"]').forEach((link) => {
    link.href = link.href.replace("?lang", `?lang=${lang}`);
  });
}

// Get modal elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementsByClassName("modal-close")[0];

// Add click event to all screenshots to open modal

// Store last focused element for accessibility
let lastFocusedElement = null;

// Add click event to all screenshots to open modal
document.querySelectorAll(".ScreenShots").forEach((img) => {
  img.onclick = function () {
    lastFocusedElement = document.activeElement;
    modal.style.display = "block";
    modalImg.src = this.src;
    modalImg.alt = this.alt || '';
    document.body.classList.add("modal-open"); // Prevent background scroll
    closeBtn.focus();
  };
});

// Close modal when clicking close button


function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open"); // Restore scroll
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

closeBtn.onclick = closeModal;

// Close modal when clicking outside the image


// Improved: close modal when clicking outside the image (even if modal has inner wrappers)
modal.addEventListener('mousedown', function(event) {
  // Only close if click is directly on the modal background, not on children (like the image or close button)
  if (event.target === modal) {
    closeModal();
  }
});

// Keyboard accessibility: ESC to close
window.addEventListener('keydown', function(event) {
  if (modal.style.display === "block") {
    if (event.key === "Escape") {
      closeModal();
    }
    // Trap focus inside modal
    if (event.key === "Tab") {
      const focusable = [closeBtn];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }
});

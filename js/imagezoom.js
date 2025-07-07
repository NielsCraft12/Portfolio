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
    modal.classList.add("show");
    modalImg.src = this.src;
    modalImg.alt = this.alt || "";
    document.body.classList.add("modal-open"); // Prevent background scroll
    closeBtn.focus();
  };
});

// Close modal when clicking close button

function closeModal() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open"); // Restore scroll
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

closeBtn.onclick = closeModal;

// Close modal when clicking outside the image

// Improved: close modal when clicking outside the image (even if modal has inner wrappers)
modal.addEventListener("mousedown", function (event) {
  if (!modalImg.complete || modalImg.naturalWidth === 0) return;

  const rect = modalImg.getBoundingClientRect();
  const { naturalWidth, naturalHeight } = modalImg;
  const elemAspect = rect.width / rect.height;
  const imgAspect = naturalWidth / naturalHeight;

  let left, right, top, bottom;
  if (imgAspect > elemAspect) {
    // Image fills width, letterbox top/bottom
    const displayHeight = rect.width / imgAspect;
    top = rect.top + (rect.height - displayHeight) / 2;
    bottom = top + displayHeight;
    left = rect.left;
    right = rect.right;
  } else {
    // Image fills height, pillarbox left/right
    const displayWidth = rect.height * imgAspect;
    left = rect.left + (rect.width - displayWidth) / 2;
    right = left + displayWidth;
    top = rect.top;
    bottom = rect.bottom;
  }

  const { clientX: x, clientY: y } = event;
  if (x < left || x > right || y < top || y > bottom) closeModal();
});

// Keyboard accessibility: ESC to close
window.addEventListener("keydown", function (event) {
  if (modal.classList.contains("show")) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
});

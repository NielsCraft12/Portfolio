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
document.querySelectorAll(".ScreenShots").forEach((img) => {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  };
});

// Close modal when clicking close button
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside the image
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

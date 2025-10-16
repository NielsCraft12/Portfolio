// Close mobile navbar when clicking on a link
document.addEventListener("DOMContentLoaded", function () {
  const sidebarCheckbox = document.getElementById("sidebar-active");
  const navLinks = document.querySelectorAll('.links-container a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Uncheck the checkbox to close the sidebar
      if (sidebarCheckbox && sidebarCheckbox.checked) {
        sidebarCheckbox.checked = false;
      }
    });
  });
});

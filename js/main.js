function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Adjust age if today's date is before the birthday this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

function updateAgeDisplay() {
  const birthday = "2005-03-20"; // Set your birth date here (YYYY-MM-DD)
  const ageElement = document.getElementById("age");
  ageElement.textContent = calculateAge(birthday);
}

// Update age display when the page loads
window.onload = updateAgeDisplay;

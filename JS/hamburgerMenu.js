const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.getElementById("mobileMenu");

// Toggla hamburgermenyn
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Stäng meny när länk klickas
document.querySelectorAll("#mobileMenu .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

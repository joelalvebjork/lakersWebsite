import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Initiera Firebase Auth
const auth = getAuth();

// Hämta referens till logout-knappen med ID
const logoutButton = document.getElementById('logoutButton'); // Här använder vi ID

// Lägg till en eventlyssnare för logout-knappen
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Om utloggningen lyckas, omdirigera användaren till login-sidan
    window.location.href = "login.html"; // Ändra till rätt URL för din login-sida
  }).catch((error) => {
    console.error("Error logging out:", error);
    alert("Something went wrong while logging out.");
  });
});

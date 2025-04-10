import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Initiera Firebase Auth
const auth = getAuth();

// Hämta referens till inloggningsformuläret
const submit = document.getElementById('loginSubmit');
submit.addEventListener("click", function(event) {
  event.preventDefault();

  // Hämta användarens input
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Logga in med e-post och lösenord
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // När inloggning är lyckad, omdirigera till en annan sida
      alert("Logged in as: " + user.displayName);
      window.location.href = "../HTML/account.html"; // Exempel på omdirigering till startsidan
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Login error:", errorMessage);
      alert("Error when logging in: " + errorMessage);
    });
});

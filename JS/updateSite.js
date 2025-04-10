import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", () => {
  const loginLinks = document.querySelectorAll('.login-link');

  function updateNavbar(user) {
    // Bestäm om vi är i HTML-mappen genom att kolla sökvägen
    const isInHTMLFolder = window.location.pathname.includes("/HTML/");
  
    loginLinks.forEach(link => {
      if (user) {
        link.textContent = "Account";
        // Om vi är utanför HTML-mappen (t.ex. index.html i roten) ska vi ange sökvägen "HTML/account.html"
        link.href = isInHTMLFolder ? "account.html" : "HTML/account.html";
      } else {
        link.textContent = "Log In";
        // Samma logik för inloggningssida
        link.href = isInHTMLFolder ? "login.html" : "HTML/login.html";
      }
    });
  }
  

  // Körs när användaren loggas in/ut
  onAuthStateChanged(auth, async (user) => {
    updateNavbar(user);

    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("No user data found in Firestore.");
        return;
      }

      const userData = docSnap.data();

      // Endast försök att sätta om elementet finns på sidan
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value || "";
      };

      setText('userUsername', userData.username);
      setText('userEmail', userData.email);
      setText('userPhone', userData.phone);
      setText('userBirthday', userData.birthday);
      setText('userCountry', userData.country);

    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  });
});

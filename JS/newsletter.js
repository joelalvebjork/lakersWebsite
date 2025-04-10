import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBEwrubA67wke6wk6vYdrUdRuuCT94ZxCw",
  authDomain: "lakers-5c2d3.firebaseapp.com",
  projectId: "lakers-5c2d3",
  storageBucket: "lakers-5c2d3.appspot.com",
  messagingSenderId: "528273354470",
  appId: "1:528273354470:web:57ea2b6a68d43cea9ed527",
  measurementId: "G-VKG17T2G5S"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Hämta formuläret med klassen "newsletter"
const newsletterForm = document.querySelector(".newsletter");
const emailInput = document.getElementById("newsletterEmail");

newsletterForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    alert("Please fill in your email address.");
    return;
  }

  try {
    await addDoc(collection(db, "newsletter_subscribers"), {
      email,
      subscribedAt: serverTimestamp()
    });

    alert("Thank you! You are now subscribed to our newsletter.");
    newsletterForm.reset();
  } catch (error) {
    console.error("Error during subscription:", error);
    alert("Something went wrong. Please try again later.");
  }
});

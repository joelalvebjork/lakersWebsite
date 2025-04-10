import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// 🔧 Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBEwrubA67wke6wk6vYdrUdRuuCT94ZxCw",
  authDomain: "lakers-5c2d3.firebaseapp.com",
  projectId: "lakers-5c2d3",
  storageBucket: "lakers-5c2d3.appspot.com", // 🔧 fixad här
  messagingSenderId: "528273354470",
  appId: "1:528273354470:web:57ea2b6a68d43cea9ed527",
  measurementId: "G-VKG17T2G5S"
};

// 🔌 Initiera Firebase om inte redan gjort
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// 📬 Formulärhantering
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  try {
    await addDoc(collection(db, "contactForms"), {
      name,
      email,
      phone,
      message,
      timestamp: serverTimestamp()
    });

    alert("Thank you! Your message has been sent.");
    contactForm.reset();
  } catch (error) {
    console.error("Something went wrong:", error);
    alert("Something went wrong. Try again.");
  }
});

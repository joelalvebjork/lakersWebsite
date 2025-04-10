import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Hämta referens till knappen för att radera kontot
const deleteAccountButton = document.getElementById('deleteAccountButton');

// Lägg till event listener på delete account-knappen
deleteAccountButton.addEventListener('click', function() {
  const user = auth.currentUser;  // Hämta den aktuella användaren
  if (user) {
    // Uppdatera active till false i Firestore innan användaren tas bort
    const userDocRef = doc(db, "users", user.uid);
    
    // Uppdatera användardokumentet med active: false
    updateDoc(userDocRef, {
      active: false
    }).then(() => {
      // Efter att active har uppdaterats, radera användaren från Firebase Auth
      deleteUser(user).then(() => {
        alert("Account successfully deleted.");
        window.location.href = "login.html";  // Redirect till login-sidan efter borttagning
      }).catch((error) => {
        console.error("Error deleting account from Firebase Auth:", error);
        alert("Your account could not be deleted. Please try again later.");
      });
    }).catch((error) => {
      console.error("Error updating active status:", error);
      alert("Unable to update account status. Please try again later.");
    });
  } else {
    alert("No user is logged in.");
  }
});

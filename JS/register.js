// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEwrubA67wke6wk6vYdrUdRuuCT94ZxCw",
  authDomain: "lakers-5c2d3.firebaseapp.com",
  projectId: "lakers-5c2d3",
  storageBucket: "lakers-5c2d3.firebasestorage.app",
  messagingSenderId: "528273354470",
  appId: "1:528273354470:web:57ea2b6a68d43cea9ed527",
  measurementId: "G-VKG17T2G5S"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Länderlista 
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "USA",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];


// --- Skapa användarkonto ---
const submit = document.getElementById('registerSubmit');
submit.addEventListener("click", function(event) {
  event.preventDefault();

  // Hämta användarens input
  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const passwordRepeat = document.getElementById('registerPasswordRepeat').value;
  const phone = document.getElementById('registerPhone').value.trim();
  const birthday = document.getElementById('registerBirthday').value.trim();
  const country = document.getElementById('registerCountry').value.toLowerCase();

   // Kontrollera att alla fält är ifyllda
    if (!username || !email || !password || !passwordRepeat || !phone || !birthday || !country) {
    alert("Please fill in all fields..");
    return;
  }

  // Kontrollera om lösenorden stämmer
  if (password !== passwordRepeat) {
    alert("Failed to repeat passwords.");
    return;
  }

  if (!/^\d+$/.test(phone)) {
    alert("The phone number must only contain numbers.");
    return;
  }

  if (!countries.some(c => c.toLowerCase() === country)) {
    alert("Invalid country. Please select a valid country.");
    return;
  }
  

  // Skapa användaren
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Uppdatera användarens visningsnamn
      return updateProfile(user, {
        displayName: username
      }).then(() => {
        return saveUserDataToFirestore(user, phone, birthday, country);
      });
    })
    .then(() => {
      alert("Account created with username: " + username);
      window.location.href = "../HTML/account.html";
    })
    .catch((error) => {
      console.error("Error code:", error.code);
      alert("Fel: " + error.message);
    });
});

// --- Spara användardata i Firestore ---
async function saveUserDataToFirestore(user, phone, birthday, country) {
  try {
    await setDoc(doc(db, "users", user.uid), {
      username: user.displayName,
      email: user.email,
      phone: phone,
      birthday: birthday,
      country: country,
      active: true
    });

    console.log("User data saved in Firestore!");
  } catch (error) {
    console.error("Error saving user data in Firestore:", error);
    alert("Error saving to Firestore: " + error.message);
  }
}

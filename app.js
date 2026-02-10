import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 signOut,
 onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
 getFirestore,
 doc,
 setDoc,
 getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBPIjxx7Qqoi2kFgBpVx1Lug-YLQSgMJSQ",
  authDomain: "cc106-729f4.firebaseapp.com",
  projectId: "cc106-729f4",
  storageBucket: "cc106-729f4.firebasestorage.app",
  messagingSenderId: "178421055506",
  appId: "1:178421055506:web:71f84a8a22216d0ef0d8cb"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.registerUser = function () {
 const firstName = document.getElementById("firstName").value;
 const lastName = document.getElementById("lastName").value;
 const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;
 createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
 const user = userCredential.user;
 setDoc(doc(db, "users", user.uid), {
 firstName: firstName,
 lastName: lastName,
 email: email,
 createdAt: new Date()
 });
 alert("Registration successful!");
 window.location.href = "index.html";
 })
 .catch((error) => {
 alert(error.message);
 });
};

window.loginUser = function () {
 const email = document.getElementById("loginEmail").value;
 const password = document.getElementById("loginPassword").value;
 signInWithEmailAndPassword(auth, email, password)
 .then(() => {
 alert("Login successful!");
 window.location.href = "dashboard.html";
 })
 .catch((error) => {
 alert(error.message);
 });
};

onAuthStateChanged(auth, async (user) => {
 if (user && document.getElementById("userInfo")) {
 const docRef = doc(db, "users", user.uid);
 const docSnap = await getDoc(docRef);
 if (docSnap.exists()) {
 const data = docSnap.data();
 document.getElementById("userInfo").innerHTML =
 `<p>Name: ${data.firstName} ${data.lastName}</p>
 <p>Email: ${data.email}</p>`;
 }
 } else if (!user && window.location.pathname.includes("dashboard.html")) {
 window.location.href = "index.html";
 }
});
window.logoutUser = function () {
 signOut(auth).then(() => {
 alert("Logged out successfully!");
 window.location.href = "index.html";
 });
};
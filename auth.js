import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  console.log("Register button working!");
  console.log("Name:", name);
  console.log("Email:", email);

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Firebase User:", userCredential.user);

    Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'Your account has been created successfully.',
      confirmButtonColor: '#5267e8'
    }).then(() => {
      window.location.href = "login.html";
    });

  } catch (error) {

    console.error("Firebase Error:", error);

    Swal.fire({
      icon: 'error',
      title: 'Registration Error',
      text: error.message,
      confirmButtonColor: '#5267e8'
    });

  }

});
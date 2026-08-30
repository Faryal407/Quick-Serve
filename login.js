import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;


  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'Welcome back to QuickServe',
      confirmButtonColor: '#5267e8'
    }).then(() => {
      window.location.href = "index.html";
    });


  } catch (error) {

    console.error(error);

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password.',
        confirmButtonColor: '#5267e8'
      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonColor: '#5267e8'
      });

    }

  }

});
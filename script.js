
// MOBILE MENU 

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  if (navLinks.classList.contains("show")) {
    menuBtn.innerHTML = "✕";
  } else {
    menuBtn.innerHTML = "☰";
  }
});


// SCROLL

function scrollToServices() {
  document.getElementById("services").scrollIntoView({
    behavior: "smooth"
  });
}


// SEARCH

function searchProviders() {

  const searchValue =
    document.getElementById("searchInput").value
      .toLowerCase()
      .trim();

  const cards =
    document.querySelectorAll(".provider-card");

  let found = false;

  cards.forEach(card => {

    const service =
      card.dataset.service.toLowerCase();

    const provider =
      card.querySelector("h3").textContent.toLowerCase();

    if (
      searchValue === "" ||
      service.includes(searchValue) ||
      provider.includes(searchValue)
    ) {

      card.style.display = "block";
      found = true;

    } else {

      card.style.display = "none";

    }

  });

  document.getElementById("providers")
    .scrollIntoView({ behavior: "smooth" });

  if (!found && searchValue !== "") {

    setTimeout(() => {
      Swal.fire({
        icon: 'info',
        title: 'No Provider Found',
        text: 'Try Plumbing, Electrical, Cleaning or AC Repair.',
        confirmButtonColor: '#5267e8'
      });
    }, 500);

  }
}


// SERVICE FILTER

function filterService(service) {

  const cards =
    document.querySelectorAll(".provider-card");

  cards.forEach(card => {

    if (card.dataset.service === service) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

  document.getElementById("providers")
    .scrollIntoView({ behavior: "smooth" });

}


// BOOKING MODAL

const modal =
  document.getElementById("bookingModal");

const selectedProvider =
  document.getElementById("selectedProvider");


function bookProvider(providerName) {

  selectedProvider.innerHTML =
    `Booking request for <strong>${providerName}</strong>`;

  modal.classList.add("active");

}


// CLOSE MODAL 

function closeModal() {
  modal.classList.remove("active");
}


window.addEventListener("click", (event) => {

  if (event.target === modal) {
    closeModal();
  }

});


// BOOKING FORM

const bookingForm =
  document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const bookingId =
    "QS-" +
    Math.floor(100000 + Math.random() * 900000);

  Swal.fire({
    icon: 'success',
    title: 'Booking Submitted!',
    html: `Your Booking ID: <strong>${bookingId}</strong>`,
    confirmButtonColor: '#5267e8'
  });

  bookingForm.reset();

  closeModal();

});


// FIREBASE AUTH & NAVBAR

import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

// Check user authentication status
onAuthStateChanged(auth, (user) => {
  const navLinks = document.getElementById("navLinks");
  
  if (user) {
    // User is logged in - update navbar
    const userName = user.displayName || user.email.split("@")[0];
    
    // Remove login/register links and add dashboard/logout
    navLinks.innerHTML = `
      <a href="dashboard.html" class="active">Dashboard</a>
      <a href="#" class="profile-link" onclick="alert('Profile page coming soon')">Profile</a>
      <a href="javascript:void(0)" onclick="logoutUser()" style="color: #e74c3c;">Logout</a>
    `;
  }
});

function showLogin() {
  window.location.href = "login.html";
}

function showRegister() {
  window.location.href = "register.html";
}

function logoutUser() {
  signOut(auth)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: 'You have been logged out successfully.',
        confirmButtonColor: '#5267e8'
      }).then(() => {
        window.location.href = "index.html";
      });
    })
    .catch((error) => {
      console.error("Logout error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during logout.',
        confirmButtonColor: '#5267e8'
      });
    });
}


// VIEW ALL PROVIDERS

function showAllProviders() {

  const cards =
    document.querySelectorAll(".provider-card");

  cards.forEach(card => {
    card.style.display = "block";
  });

  document.getElementById("providers")
    .scrollIntoView({
      behavior: "smooth"
    });

}

// Make functions globally accessible for HTML onclick handlers
window.scrollToServices = scrollToServices;
window.searchProviders = searchProviders;
window.filterService = filterService;
window.bookProvider = bookProvider;
window.closeModal = closeModal;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.logoutUser = logoutUser;
window.showAllProviders = showAllProviders;
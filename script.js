
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


// LOGIN 

function showLogin() {
  window.location.href = "login.html";
}

function showRegister() {
  window.location.href = "register.html";
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
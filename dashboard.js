import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    loadDashboard(user);
  } else {
    // User is not logged in, redirect to login
    window.location.href = "login.html";
  }
});

// Load Dashboard
function loadDashboard(user) {
  const userEmail = user.email;
  const userName = user.displayName || user.email.split("@")[0];

  // Set user info
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userName").textContent = userName;

  // Load data from localStorage
  loadServices();
  loadBookings();
  updateStats();
}

// Load Services
function loadServices() {
  const services = JSON.parse(localStorage.getItem("userServices")) || [];
  const servicesContainer = document.getElementById("servicesContainer");

  if (services.length === 0) {
    servicesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>No Services Yet</h3>
        <p>Start by adding your first service to get bookings</p>
        <button class="btn-primary" onclick="openAddService()">Add Your First Service</button>
      </div>
    `;
    return;
  }

  servicesContainer.innerHTML = services
    .map(
      (service, index) => `
    <div class="service-card">
      <div class="service-header">
        <span class="service-category">${service.category}</span>
        <h3>${service.name}</h3>
      </div>
      <div class="service-description">
        ${service.description}
      </div>
      <div class="service-footer">
        <div class="service-price">$${parseFloat(service.price).toFixed(2)}/hr</div>
        <div class="service-actions">
          <button class="edit-btn" onclick="editService(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteService(${index})">Delete</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Load Bookings
function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
  const bookingsContainer = document.getElementById("bookingsContainer");

  if (bookings.length === 0) {
    bookingsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>No Bookings Yet</h3>
        <p>Your bookings will appear here</p>
      </div>
    `;
    return;
  }

  bookingsContainer.innerHTML = bookings
    .map(
      (booking) => `
    <div class="booking-item">
      <div class="booking-info">
        <div class="booking-service">${booking.serviceName}</div>
        <div class="booking-customer">Customer: ${booking.customerName}</div>
        <div class="booking-date">${booking.date} at ${booking.time}</div>
      </div>
      <span class="booking-status status-${booking.status.toLowerCase()}">${booking.status}</span>
      <button class="booking-action" onclick="viewBookingDetails('${booking.id}')">View Details</button>
    </div>
  `
    )
    .join("");
}

// Update Stats
function updateStats() {
  const services = JSON.parse(localStorage.getItem("userServices")) || [];
  const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];

  document.getElementById("totalServices").textContent = services.length;
  document.getElementById("totalBookings").textContent = bookings.length;

  // Calculate total earnings
  const totalEarnings = bookings
    .filter((b) => b.status === "Completed")
    .reduce((sum, b) => sum + parseFloat(b.amount || 0), 0);

  document.getElementById("totalEarnings").textContent = `$${totalEarnings.toFixed(2)}`;
}

// Open Add Service Modal
function openAddService() {
  document.getElementById("serviceModal").classList.add("show");
}

// Close Service Modal
function closeServiceModal() {
  document.getElementById("serviceModal").classList.remove("show");
  document.getElementById("serviceForm").reset();
}

// Close Profile Modal
function closeProfileModal() {
  document.getElementById("profileModal").classList.remove("show");
  document.getElementById("profileForm").reset();
}

// Handle Service Form Submit
document.getElementById("serviceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const newService = {
    name: document.getElementById("serviceName").value,
    category: document.getElementById("serviceCategory").value,
    description: document.getElementById("serviceDescription").value,
    price: document.getElementById("servicePrice").value,
    availability: document.getElementById("serviceAvailability").value,
    id: Date.now(),
  };

  // Save to localStorage
  const services = JSON.parse(localStorage.getItem("userServices")) || [];
  services.push(newService);
  localStorage.setItem("userServices", JSON.stringify(services));

  Swal.fire({
    icon: "success",
    title: "Service Added!",
    text: "Your service has been added successfully.",
    confirmButtonColor: "#5267e8",
  }).then(() => {
    closeServiceModal();
    loadServices();
    updateStats();
  });
});

// Edit Service
function editService(index) {
  const services = JSON.parse(localStorage.getItem("userServices")) || [];
  const service = services[index];

  document.getElementById("serviceName").value = service.name;
  document.getElementById("serviceCategory").value = service.category;
  document.getElementById("serviceDescription").value = service.description;
  document.getElementById("servicePrice").value = service.price;
  document.getElementById("serviceAvailability").value = service.availability;

  // Update form submit to update instead of add
  const form = document.getElementById("serviceForm");
  const originalHandler = form.onsubmit;

  form.onsubmit = (e) => {
    e.preventDefault();
    services[index] = {
      ...service,
      name: document.getElementById("serviceName").value,
      category: document.getElementById("serviceCategory").value,
      description: document.getElementById("serviceDescription").value,
      price: document.getElementById("servicePrice").value,
      availability: document.getElementById("serviceAvailability").value,
    };

    localStorage.setItem("userServices", JSON.stringify(services));

    Swal.fire({
      icon: "success",
      title: "Service Updated!",
      text: "Your service has been updated successfully.",
      confirmButtonColor: "#5267e8",
    }).then(() => {
      form.onsubmit = originalHandler;
      closeServiceModal();
      loadServices();
      updateStats();
    });
  };

  openAddService();
}

// Delete Service
function deleteService(index) {
  Swal.fire({
    title: "Delete Service?",
    text: "Are you sure you want to delete this service?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#667085",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const services = JSON.parse(localStorage.getItem("userServices")) || [];
      services.splice(index, 1);
      localStorage.setItem("userServices", JSON.stringify(services));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Service has been deleted.",
        confirmButtonColor: "#5267e8",
      }).then(() => {
        loadServices();
        updateStats();
      });
    }
  });
}

// View Bookings
function viewBookings() {
  document.querySelector("#bookings").scrollIntoView({ behavior: "smooth" });
}

// View Booking Details
function viewBookingDetails(bookingId) {
  Swal.fire({
    title: "Booking Details",
    text: "Full booking details would display here",
    confirmButtonColor: "#5267e8",
  });
}

// Logout Function
function logout() {
  Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#5267e8",
    cancelButtonColor: "#667085",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            confirmButtonColor: "#5267e8",
          }).then(() => {
            window.location.href = "index.html";
          });
        })
        .catch((error) => {
          console.error("Logout error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred during logout.",
            confirmButtonColor: "#5267e8",
          });
        });
    }
  });
}

// Sample data initialization (for demo purposes)
function initializeSampleData() {
  const existingServices = localStorage.getItem("userServices");
  if (!existingServices) {
    const sampleServices = [
      {
        id: 1,
        name: "House Cleaning",
        category: "cleaning",
        description: "Professional house cleaning service with attention to detail",
        price: "50",
        availability: "weekdays",
      },
      {
        id: 2,
        name: "Plumbing Repairs",
        category: "plumbing",
        description: "Quick and reliable plumbing repair services",
        price: "75",
        availability: "anytime",
      },
    ];
    localStorage.setItem("userServices", JSON.stringify(sampleServices));
  }

  const existingBookings = localStorage.getItem("userBookings");
  if (!existingBookings) {
    const sampleBookings = [
      {
        id: 1,
        serviceName: "House Cleaning",
        customerName: "John Doe",
        date: "2024-09-15",
        time: "10:00 AM",
        status: "Confirmed",
        amount: "100",
      },
      {
        id: 2,
        serviceName: "Plumbing Repairs",
        customerName: "Jane Smith",
        date: "2024-09-16",
        time: "2:00 PM",
        status: "Pending",
        amount: "150",
      },
    ];
    localStorage.setItem("userBookings", JSON.stringify(sampleBookings));
  }
}

// Initialize on page load
initializeSampleData();

// Close modals when clicking outside
window.addEventListener("click", (event) => {
  const serviceModal = document.getElementById("serviceModal");
  const profileModal = document.getElementById("profileModal");

  if (event.target === serviceModal) {
    serviceModal.classList.remove("show");
  }
  if (event.target === profileModal) {
    profileModal.classList.remove("show");
  }
});

// Make functions globally accessible
window.openAddService = openAddService;
window.closeServiceModal = closeServiceModal;
window.closeProfileModal = closeProfileModal;
window.viewBookings = viewBookings;
window.viewBookingDetails = viewBookingDetails;
window.editService = editService;
window.deleteService = deleteService;
window.logout = logout;

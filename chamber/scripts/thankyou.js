// Populate thank-you page from URL query parameters
const params = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent = params.get("firstName") || '';
document.getElementById("lastName").textContent = params.get("lastName") || '';
document.getElementById("email").textContent = params.get("email") || '';
document.getElementById("phone").textContent = params.get("phone") || '';
document.getElementById("organization").textContent = params.get("organization") || '';
document.getElementById("timestamp").textContent = params.get("timestamp") || '';

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();


// Set hidden timestamp
    document.getElementById("timestamp").value = new Date().toISOString();
    document.getElementById("year").textContent = new Date().getFullYear();

    // Modal logic
    const buttons = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.modal).style.display = "block";
      });
    });

    closes.forEach(close => {
      close.addEventListener("click", () => {
        close.closest(".modal").style.display = "none";
      });
    });

    window.onclick = (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    };
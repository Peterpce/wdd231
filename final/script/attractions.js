const container = document.getElementById("attractions-list");

async function loadAttractions() {
  try {
    const res = await fetch("data/attractions.json");
    if (!res.ok) throw new Error("Failed to load data");
    const data = await res.json();

    // Clear container and let CSS handle layout
    container.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("attraction-card");

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";

      const textContent = document.createElement("div");
      textContent.classList.add("text-content");
      textContent.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Best Time:</strong> ${item.bestTime}</p>
        <button class="details-btn">View Details</button>
      `;

      card.appendChild(img);
      card.appendChild(textContent);
      container.appendChild(card);

      // Modal interaction
      textContent.querySelector(".details-btn").addEventListener("click", () => {
        showModal(item);
      });
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="error">Unable to load attractions at this time.</p>`;
  }
}

loadAttractions();

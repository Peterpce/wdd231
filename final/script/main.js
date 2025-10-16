/// ====== Hamburger Menu ======
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ====== Modal Function ======
export function showModal(item) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${item.name}</h2>
      <img src="${item.image}" alt="${item.name}" style="max-width:100%;height:auto;">
      <p>${item.description}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Best Time to Visit:</strong> ${item.bestTime}</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal
  modal.querySelector('.close').addEventListener('click', () => {
    modal.remove();
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ====== Load Featured Attractions ======
const attractionContainer = document.getElementById('attraction-preview');

async function loadFeaturedAttractions() {
  try {
    const response = await fetch('data/attractions.json'); // adjust path if needed
    if (!response.ok) throw new Error('Failed to fetch attractions data');
    const data = await response.json();

    // Use array method to select first 3 attractions for home page preview
    const featured = data.slice(0, 3);

    featured.forEach(item => {
      // Create card
      const card = document.createElement('div');
      card.classList.add('card'); // updated class for CSS grid

      // Build inner HTML
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p class="description">${item.description}</p>
          <button class="details-btn">More Info</button>
        </div>
      `;

      // Append card to container
      attractionContainer.appendChild(card);

      // Modal on button click
      card.querySelector('.details-btn').addEventListener('click', () => {
        showModal(item);
      });
    });
  } catch (error) {
    console.error(error);
    attractionContainer.innerHTML = `<p>Failed to load attractions. Please try again later.</p>`;
  }
}

// Initialize
loadFeaturedAttractions();

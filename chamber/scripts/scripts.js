// ----------------------------
// Footer Dynamic Year & Last Modified
// ----------------------------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ----------------------------
// Hamburger Menu Toggle
// ----------------------------
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// ----------------------------
// Weather API Integration
// ----------------------------
const apiKey = "YOUR_OPENWEATHERMAP_KEY"; // Replace with your API key
const city = "Timbuktu";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    // Current weather
    const current = data.list[0];
    document.getElementById("current-weather").innerHTML = `
      <p><strong>Temperature:</strong> ${current.main.temp} °C</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}</p>
    `;

    // 3-Day Forecast (noon)
    let forecastHTML = "<h3>3-Day Forecast</h3><ul>";
    const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(1, 4);
    forecastDays.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      forecastHTML += `<li><strong>${date}:</strong> ${day.main.temp} °C, ${day.weather[0].description}</li>`;
    });
    forecastHTML += "</ul>";
    document.getElementById("forecast").innerHTML = forecastHTML;

  } catch (err) {
    console.error("Weather fetch error:", err);
    document.getElementById("current-weather").textContent = "Unable to load weather.";
  }
}

fetchWeather();

// ----------------------------
// Business Spotlights from JSON
// ----------------------------
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter only Gold or Silver members
    const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    // Randomly select 2–3 members
    const spotlights = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    spotlights.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        <img src="${member.logo}" alt="${member.name} logo" />
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership:</strong> ${member.membership}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Spotlight fetch error:", err);
    document.getElementById("spotlight-container").textContent = "Unable to load spotlights.";
  }
}

loadSpotlights();

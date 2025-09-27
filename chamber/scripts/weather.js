document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "d4aa2fe678c1ae90ae16e1778bf9a725"; // your OpenWeatherMap key
  const LAT = 16.7666;  // Timbuktu latitude
  const LON = -3.0026;  // Timbuktu longitude
  const UNITS = "metric";
  const CACHE_KEY = "weatherData";
  const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

  const currentEl = document.getElementById("current-weather");
  const forecastEl = document.getElementById("forecast");

  // Show loading indicators
  currentEl.textContent = "Loading current weather...";
  forecastEl.textContent = "Loading forecast...";

  async function fetchWeather() {
    try {
      const now = Date.now();
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY));

      // Use cached data if valid
      if (cached && now - cached.timestamp < CACHE_TIME) {
        displayWeather(cached.data);
        return;
      }

      // Fetch current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
      const currentRes = await fetch(currentUrl);
      if (!currentRes.ok) throw new Error(`Current weather fetch failed: ${currentRes.status}`);
      const currentData = await currentRes.json();

      // Fetch 5-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error(`Forecast fetch failed: ${forecastRes.status}`);
      const forecastData = await forecastRes.json();

      const data = { current: currentData, forecast: forecastData };

      // Cache the data
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data }));

      // Display weather
      displayWeather(data);

    } catch (error) {
      console.error("Weather fetch failed:", error);
      currentEl.textContent = "Weather data unavailable.";
      forecastEl.textContent = "";
    }
  }

  function displayWeather(data) {
    // Current weather
    const current = data.current;
    currentEl.innerHTML = `
      <p><strong>Current Temperature:</strong> ${current.main.temp.toFixed(1)}°C</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}</p>
    `;

    // 3-day forecast (midday UTC)
    const forecastItems = data.forecast.list
      .filter(f => f.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    let forecastHTML = "<h3>3-Day Forecast</h3>";
    forecastItems.forEach(item => {
      const date = new Date(item.dt_txt + " UTC").toLocaleDateString("en-US", { weekday: "long" });
      forecastHTML += `
        <p><strong>${date}:</strong> ${item.main.temp.toFixed(1)}°C, ${item.weather[0].description}</p>
      `;
    });

    forecastEl.innerHTML = forecastHTML;
  }

  fetchWeather();
});

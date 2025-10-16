// script6/data.js
export async function getAttractions() {
  try {
    const res = await fetch('../data/attractions.json'); // correct relative path
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    // Ensure we return an array
    return Array.isArray(json) ? json : json.items || [];
  } catch (err) {
    console.error('Error fetching attractions.json', err);
    return []; // fallback empty array
  }
}

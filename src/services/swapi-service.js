/**
 * SWAPI Service - Handles all Star Wars API calls
 */

const BASE_URL = 'https://swapi.dev/api';

/**
 * Search for Star Wars characters by name
 * @param {string} query - The search query
 * @returns {Promise<Array>} Array of character objects
 */
export async function searchCharacters(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const response = await fetch(`${BASE_URL}/people/?search=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
}

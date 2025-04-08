// API utility for making requests to the backend

// Get the API URL from environment variables, with a fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/metrics/';

/**
 * Fetch data from the API
 * @param {string} endpoint - API endpoint (without leading slash)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Promise resolving to JSON response
 */
export const fetchFromAPI = async (endpoint, options = { headers: {} }) => {
  try {
    const url = `${API_URL}/${endpoint}`;
    console.log(`Making API request to: ${url}`);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Common API methods
 */
const api = {
  getPlaylistEfficiency: async (filters) => {
    return await fetchFromAPI(`playlist-efficiency?${new URLSearchParams(filters)}`);
  },
  getRegionalStrengthScore: async (filters) => {
    return await fetchFromAPI(`regional-strength-score?${new URLSearchParams(filters)}`);
  },
  getPlaylistRetentionRate: async (filters) => {
    return await fetchFromAPI(`playlist-retention-rate?${new URLSearchParams(filters)}`);
  },
  getFollowerConversionRate: async (filters) => {
    return await fetchFromAPI(`follower-conversion-rate?${new URLSearchParams(filters)}`);
  },
  getListenerToStreamRatio: async (filters) => {
    return await fetchFromAPI(`listener-to-stream-ratio?${new URLSearchParams(filters)}`);
  },
  getSevenDayGrowthRate: async (filters) => {
    return await fetchFromAPI(`seven-day-growth-rate?${new URLSearchParams(filters)}`);
  },
};

export default api;
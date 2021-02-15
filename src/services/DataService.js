const BASE_URL = 'https://statsapi.web.nhl.com';

export const DataService = {
  fetch: async (path, settings = {}) => {
    try {
      const response = await fetch(BASE_URL + path, settings);
      return await response.json();
    } catch (e) {
      console.error(`Error fetching ${path}`, e.message);
      return {
        error: e
      }
    }
  }
};

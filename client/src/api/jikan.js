const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Jikan request failed: ${res.status}`);
  }
  return res.json();
};

export const searchAnime = async (query, limit = 5) => {
  const trimmed = query?.trim();
  if (!trimmed) return [];

  const url = `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(trimmed)}&limit=${limit}&sfw=true`;
  const data = await fetchJson(url);
  return data?.data || [];
};

export const getAnimeByTitle = async (title) => {
  const results = await searchAnime(title, 1);
  return results[0] || null;
};

export const searchCharacters = async (query, limit = 8) => {
  const trimmed = query?.trim();
  if (!trimmed) return [];

  const url = `${JIKAN_BASE_URL}/characters?q=${encodeURIComponent(trimmed)}&limit=${limit}`;
  const data = await fetchJson(url);
  return data?.data || [];
};

export const getAnimeCharacters = async (animeId) => {
  if (!animeId) return [];

  const url = `${JIKAN_BASE_URL}/anime/${animeId}/characters`;
  const data = await fetchJson(url);
  return data?.data || [];
};

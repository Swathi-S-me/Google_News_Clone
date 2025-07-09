const STORAGE_KEY = "savedSearches"; // ✅ match everywhere

export const saveSearchQuery = (query: string) => {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!stored.includes(query)) {
    stored.push(query);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
};

export const getSavedSearches = (): string[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const removeSavedSearch = (query: string) => {
  const saved = getSavedSearches().filter((item) => item !== query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
};

const getCurrentUser = (): string | null => {
  return localStorage.getItem("currentUser");
};

const getStorageKey = (): string | null => {
  const user = getCurrentUser();
  return user ? `savedSearches_${user}` : null;
};

export const saveSearchQuery = (query: string): void => {
  const key = getStorageKey();
  if (!key) return;

  const existing: string[] = JSON.parse(localStorage.getItem(key) || "[]");

  if (!existing.includes(query)) {
    existing.push(query);
    localStorage.setItem(key, JSON.stringify(existing));
  }
};

export const getSavedSearches = (): string[] => {
  const key = getStorageKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const removeSavedSearch = (query: string): void => {
  const key = getStorageKey();
  if (!key) return;

  const updated = getSavedSearches().filter((item) => item !== query);
  localStorage.setItem(key, JSON.stringify(updated));
};

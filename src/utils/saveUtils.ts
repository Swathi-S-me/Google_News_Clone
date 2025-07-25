// const getCurrentUser = (): string | null => {
//   return localStorage.getItem("currentUser");
// };

// const getStorageKey = (): string => {
//   const user = getCurrentUser();
//   return `savedSearches_${user || "guest"}`;
// };

// export const saveSearchQuery = (query: string) => {
//   const key = getStorageKey();
//   const stored = JSON.parse(localStorage.getItem(key) || "[]");
//   if (!stored.includes(query)) {
//     stored.push(query);
//     localStorage.setItem(key, JSON.stringify(stored));
//   }
// };

// export const getSavedSearches = (): string[] => {
//   return JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
// };

// export const removeSavedSearch = (query: string) => {
//   const key = getStorageKey();
//   const saved = getSavedSearches().filter((item) => item !== query);
//   localStorage.setItem(key, JSON.stringify(saved));
// };


// utils/saveUtils.ts

const getCurrentUser = (): string | null => {
  return localStorage.getItem("currentUser");
};

const getStorageKey = (): string => {
  const user = getCurrentUser();
  return user ? `savedSearches_${user}` : "";
};

export const saveSearchQuery = (query: string) => {
  const key = getStorageKey();
  if (!key) return;
  const stored = JSON.parse(localStorage.getItem(key) || "[]");
  if (!stored.includes(query)) {
    stored.push(query);
    localStorage.setItem(key, JSON.stringify(stored));
  }
};

export const getSavedSearches = (): string[] => {
  const key = getStorageKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const removeSavedSearch = (query: string) => {
  const key = getStorageKey();
  if (!key) return;
  const saved = getSavedSearches().filter((item) => item !== query);
  localStorage.setItem(key, JSON.stringify(saved));
};

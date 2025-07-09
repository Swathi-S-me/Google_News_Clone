import type { NewsItem } from "../types/types";

export const fetchTopHeadlines = async (
  language: string
): Promise<NewsItem[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=10&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );
  const data = await response.json();
  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("Invalid news format");
  }
  return data.articles;
};

export const searchNews = async (
  query: string,
  language: string
): Promise<NewsItem[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=popularity&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );
  const data = await response.json();
  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("Invalid news format");
  }
  return data.articles;
};

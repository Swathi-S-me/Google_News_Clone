// import type { NewsItem } from "../types/types";

// export const fetchTopHeadlines = async (
//   language: string
// ): Promise<NewsItem[]> => {
//   const response = await fetch(
//     `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=10&apiKey=${
//       import.meta.env.VITE_NEWS_API_KEY
//     }`
//   );
//   const data = await response.json();
//   if (!data.articles || !Array.isArray(data.articles)) {
//     throw new Error("Invalid news format");
//   }
//   return data.articles;
// };

// export const searchNews = async (
//   query: string,
//   language: string
// ): Promise<NewsItem[]> => {
//   const response = await fetch(
//     `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=popularity&apiKey=${
//       import.meta.env.VITE_NEWS_API_KEY
//     }`
//   );
//   const data = await response.json();
//   if (!data.articles || !Array.isArray(data.articles)) {
//     throw new Error("Invalid news format");
//   }
//   return data.articles;
// };







import type { NewsItem } from "../types/types";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;


const fetchTopHeadlines = async (language: string): Promise<NewsItem[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=10&apiKey=${API_KEY}`
  );
  const data = await response.json();
  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("Invalid news format");
  }
  return data.articles;
};

export async function searchNews(topic: string, language: string) {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&language=${language}&sortBy=popularity&apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch news");
  const data = await response.json();
  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("Invalid news format");
  }
  return data.articles; 
}


export const useTopHeadlines = (language: string) => {
  return useQuery({
    queryKey: ["topHeadlines", language],
    queryFn: () => fetchTopHeadlines(language),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchNews = (query: string, language: string) => {
  return useQuery({
    queryKey: ["searchNews", query, language],
    queryFn: () => searchNews(query, language),
    enabled: !!query, 
    staleTime: 1000 * 60 * 5,
  });
};


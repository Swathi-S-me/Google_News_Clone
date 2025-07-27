import type { NewsItem } from "../types/types";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const fetchNewsData = async (url: string): Promise<NewsItem[]> => {
  const response = await fetch(url, {
    headers: {
      "Accept-Encoding": "gzip, deflate, br",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch news");

  const data = await response.json();

  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("Invalid news format");
  }

  return data.articles;
};

const fetchTopHeadlines = (language: string): Promise<NewsItem[]> => {
  const url = `https://newsapi.org/v2/top-headlines?language=${language}&pageSize=10&apiKey=${API_KEY}`;
  return fetchNewsData(url);
};

export const searchNews = (
  topic: string,
  language: string
): Promise<NewsItem[]> => {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    topic
  )}&language=${language}&sortBy=popularity&apiKey=${API_KEY}`;
  return fetchNewsData(url);
};

export const useTopHeadlines = (language: string) =>
  useQuery({
    queryKey: ["topHeadlines", language],
    queryFn: () => fetchTopHeadlines(language),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

export const useSearchNews = (query: string, language: string) =>
  useQuery({
    queryKey: ["searchNews", query, language],
    queryFn: () => searchNews(query, language),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

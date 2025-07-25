// import { useEffect, useState } from "react";
// import { searchNews } from "../api/fetchNews";
// import type { NewsItem } from "../types/types";

// export function useNewsFetch(search: string, menu: string, language: string, active: boolean) {
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (!active) return;

//     const timeout = setTimeout(async () => {
//       try {
//         setLoading(true);
//         const topic = search || menu || "politics";
//         const result = await searchNews(topic, language);
//         setNews(result);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [search, menu, language, active]);

//   return { news, loading };
// }

import { useQuery } from "@tanstack/react-query";
import { searchNews } from "../api/fetchNews"; 
import type { NewsItem } from "../types/types";

export function useNewsFetch(
  search: string,
  menu: string,
  language: string,
  active: boolean
) {
  const topic = search || menu || "politics";

  const {
    data = [],
    isLoading,
  } = useQuery<NewsItem[]>({
    queryKey: ["news", topic, language],
    queryFn: () => searchNews(topic, language), 
    enabled: active,
    staleTime: 1000 * 60,
    retry: 1,
  });

  return { news: data, loading: isLoading };
}

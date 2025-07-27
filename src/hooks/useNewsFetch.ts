import { useQuery } from "@tanstack/react-query";
import { searchNews } from "../api/fetchNews";
import type { NewsItem } from "../types/types";

export function useNewsFetch(
  search: string,
  menu: string,
  language: string,
  active: boolean
) {
  const topic = search?.trim() || menu?.trim() || "politics";

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery<NewsItem[]>({
    queryKey: ["news", topic, language],
    queryFn: () => searchNews(topic, language),
    enabled: active && !!topic && !!language,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    news: data,
    loading: isLoading || isFetching,
    error: isError,
  };
}

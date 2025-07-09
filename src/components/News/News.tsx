import { useEffect, useMemo, useRef } from "react";
import type { NewsProps } from "../../types/types";
import { auth } from "../../firebase/firebase";
import { googlesignin } from "../../utils/authUtils";
import { SiGooglenews } from "react-icons/si";
import { saveSearchQuery, getSavedSearches } from "../../utils/saveUtils";

let debounceTimer: NodeJS.Timeout;

function News({
  news = [],
  search = "",
  category = "All",
  loading = false,
}: NewsProps) {
  const isLoggedIn = !!auth.currentUser;
  const savedSearchRef = useRef<string | null>(null);

  const filteredNews = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    const lowerCategory = category.toLowerCase();

    return news.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";
      const source = item.source?.name?.toLowerCase() ?? "";

      const titleMatch = title.includes(lowerSearch);
      const categoryMatch =
        category === "All" || source.includes(lowerCategory);

      return titleMatch && categoryMatch;
    });
  }, [news, search, category]);

  // ✅ Save only the full search once after debounce
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const trimmedSearch = search.trim();

    debounceTimer = setTimeout(() => {
      const alreadySaved = getSavedSearches().includes(trimmedSearch);

      if (
        !loading &&
        trimmedSearch &&
        filteredNews.length === 0 &&
        !alreadySaved &&
        savedSearchRef.current !== trimmedSearch
      ) {
        saveSearchQuery(trimmedSearch);
        savedSearchRef.current = trimmedSearch; // mark as saved
      }
    }, 500); // Wait for 500ms of no typing

    return () => clearTimeout(debounceTimer); // cleanup
  }, [search, filteredNews, loading]);

  const displayNews = isLoggedIn ? filteredNews : filteredNews.slice(0, 5);

  return (
    <div className="w-screen bg-gray-100 min-h-screen pt-4">
      <div className="bg-white w-10/12 mx-auto p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <h1 className="text-center col-span-3 text-gray-500 text-lg">
            Fetching news...
          </h1>
        ) : displayNews.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-12">
            <SiGooglenews className="w-20 h-20 mb-4 opacity-60" />
            <h2 className="text-gray-600 text-lg font-medium mb-2">
              No results found
            </h2>
            <p className="text-gray-500 text-sm italic">
              for "<span className="font-semibold">{search}</span>"
            </p>
          </div>
        ) : (
          displayNews.map((data, index) => (
            <a
              key={index}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:shadow-md transition rounded-lg overflow-hidden bg-white"
              aria-label={`Open article: ${data.title}`}
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-blue-600 font-semibold uppercase">
                    {data.source?.name || "Unknown Source"}
                  </h1>
                  <h2 className="text-lg font-bold text-gray-800 hover:underline">
                    {data.title || "No title available"}
                  </h2>
                </div>
                {data.urlToImage && (
                  <img
                    src={data.urlToImage}
                    alt={data.title || "News image"}
                    className="w-full h-40 object-cover mt-3 rounded-md"
                  />
                )}
              </div>
            </a>
          ))
        )}
      </div>

      {!loading && !isLoggedIn && (
        <button
          className="text-sm text-blue-500 mt-5 underline hover:text-blue-700 block mx-auto"
          onClick={googlesignin}
        >
          Login to see more news and personalized recommendations.
        </button>
      )}
    </div>
  );
}

export default News;

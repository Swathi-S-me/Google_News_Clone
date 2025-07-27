import { useEffect, useMemo, useRef } from "react";
import type { NewsProps } from "../../types/types";
import { auth } from "../../firebase/firebase";
import { googleSignIn } from "../../utils/authUtils";
import { SiGooglenews } from "react-icons/si";
import { saveSearchQuery, getSavedSearches } from "../../utils/saveUtils";
import * as S from "../../styles/sharedStyles";

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
        savedSearchRef.current = trimmedSearch;
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search, filteredNews, loading]);

  const displayNews = isLoggedIn ? filteredNews : filteredNews.slice(0, 5);

  return (
    <div className={`${S.wScreen} ${S.bgGray100} ${S.minHScreen} ${S.pt4}`}>
      <main
        className={`${S.bgWhite} ${S.w10_12} ${S.mxAuto} ${S.p6} ${S.roundedLg} ${S.shadow} ${S.grid} ${S.gridCols1} ${S.mdGridCols2} lg:grid-cols-3 ${S.gap5}`}
        role="main"
        aria-label="News content"
      >
        {loading ? (
          <h1
            className={`${S.textCenter} ${S.gridCols3} ${S.textGray500} ${S.textLg}`}
          >
            Fetching news...
          </h1>
        ) : displayNews.length === 0 ? (
          <div
            className={`${S.gridCols3} ${S.flex} ${S.flexCol} ${S.itemsCenter} ${S.justifyCenter} ${S.py12}`}
          >
            <SiGooglenews
              className={`${S.w20} ${S.h20} ${S.mb4} ${S.opacity60}`}
              aria-hidden="true"
            />
            <h2
              className={`${S.textGray600} ${S.textLg} ${S.fontMedium} ${S.mb2}`}
            >
              No results found
            </h2>
            <p className={`${S.textGray500} ${S.textSm} ${S.textItalic}`}>
              for "<span className={S.fontSemibold}>{search}</span>"
            </p>
          </div>
        ) : (
          displayNews.map((data) => {
            const title = data.title || "Untitled article";
            const source = data.source?.name || "Unknown Source";

            return (
              <a
                key={data.url}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${S.block} ${S.hoverShadowMd} ${S.transition} ${S.roundedLg} ${S.overflowHidden} ${S.bgWhite}`}
                aria-label={`Read article titled ${title}`}
              >
                <article
                  className={`${S.p4} ${S.flex} ${S.flexCol} ${S.justifyBetween} h-full`}
                >
                  <header className={`${S.flex} ${S.flexCol} ${S.gap2}`}>
                    <h1
                      className={`${S.textSm} ${S.textBlue600} ${S.fontSemibold} ${S.uppercase}`}
                    >
                      {source}
                    </h1>
                    <h2
                      className={`${S.textLg} ${S.fontBold} ${S.textGray800} hover:underline`}
                    >
                      {title}
                    </h2>
                  </header>

                  {data.urlToImage && (
                    <img
                      src={data.urlToImage}
                      alt={title}
                      loading="lazy"
                      width="100%"
                      height="auto"
                      className={`${S.wFull} ${S.h40} ${S.objectCover} ${S.mt3} ${S.roundedMd}`}
                    />
                  )}
                </article>
              </a>
            );
          })
        )}
      </main>

      {!loading && !isLoggedIn && (
        <button
          className={`${S.textSm} ${S.textBlue600} ${S.mt3} ${S.underline} hover:${S.textBlue600} ${S.block} ${S.mxAuto} cursor-pointer`}
          onClick={googleSignIn}
          aria-label="Login with Google to view more news"
        >
          Login to see more news and personalized recommendations.
        </button>
      )}
    </div>
  );
}

export default News;

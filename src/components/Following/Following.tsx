import { useEffect, useState, useCallback } from "react";
import { getSavedSearches, removeSavedSearch } from "../../utils/saveUtils";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import * as S from "../../styles/sharedStyles";

function Following() {
  const [searches, setSearches] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("currentUser")
  );

  const updateSearches = useCallback(() => {
    const uid = localStorage.getItem("currentUser");
    setUserId(uid);
    setSearches(uid ? getSavedSearches() : []);
  }, []);

  useEffect(() => {
    updateSearches();
    window.addEventListener("storage", updateSearches);
    return () => window.removeEventListener("storage", updateSearches);
  }, [updateSearches]);

  const handleDelete = useCallback((query: string) => {
    removeSavedSearch(query);
    setSearches(getSavedSearches());
  }, []);

  if (!userId) {
    return (
      <div
        className={`${S.textGray500} ${S.textCenter} ${S.textLg} ${S.py8} ${S.bgWhite} ${S.roundedLg} ${S.shadowInner}`}
        role="alert"
        aria-live="polite"
      >
        Please log in to view your saved searches.
      </div>
    );
  }

  return (
    <main className={`${S.p6} ${S.maxW4xl} ${S.mxAuto}`}>
      <h1 className={`${S.text3xl} ${S.fontBold} ${S.mb6} ${S.textGray800}`}>
        Searches
      </h1>

      {searches.length === 0 ? (
        <p
          className={`${S.textGray500} ${S.textCenter} ${S.textLg} ${S.py8} ${S.bgWhite} ${S.roundedLg} ${S.shadowInner}`}
          role="status"
        >
          You haven't saved any searches yet.
        </p>
      ) : (
        <ul className={`${S.grid} ${S.gap4}`} role="list">
          {searches.map((query, index) => (
            <li
              key={index}
              className={`${S.flex} ${S.itemsCenter} ${S.justifyBetween} ${S.px5} ${S.py4} ${S.bgWhite} ${S.roundedXl} ${S.shadowMd} ${S.hoverShadowLg} ${S.transition}`}
            >
              <div className={`${S.flex} ${S.itemsCenter} ${S.gap4}`}>
                <FiSearch
                  className={`${S.textXl} ${S.textGray500}`}
                  aria-hidden="true"
                />
                <span
                  className={`${S.textLg} ${S.textBlue700} ${S.fontMedium}`}
                >
                  {query}
                </span>
              </div>

              <button
                onClick={() => handleDelete(query)}
                className={`${S.p2} ${S.textRed500} ${S.hoverTextRed700} ${S.roundedFull} ${S.transition} ${S.cursorPointer}`}
                title="Delete search"
                aria-label={`Delete saved search ${query}`}
              >
                <FiTrash2 className={S.textXl} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Following;

// import { useState } from "react";
// import { getSavedSearches, removeSavedSearch } from "../../utils/saveUtils";
// import { FiSearch, FiTrash2 } from "react-icons/fi";
// import * as S from "../../styles/sharedStyles";

// function Following() {
//   const [savedSearches, setSavedSearches] = useState(getSavedSearches());

//   const handleDelete = (query: string) => {
//     removeSavedSearch(query);
//     setSavedSearches(getSavedSearches());
//   };

//   return (
//     <div className={`${S.p6} ${S.maxW4xl} ${S.mxAuto}`}>
//       <h1 className={`${S.text3xl} ${S.fontBold} ${S.mb6} ${S.textGray800}`}>
//         Searches
//       </h1>

//       {savedSearches.length === 0 ? (
//         <div
//           className={`${S.textGray500} ${S.textCenter} ${S.textLg} ${S.py8} ${S.bgWhite} ${S.roundedLg} ${S.shadowInner}`}
//         >
//           You haven't saved any searches yet.
//         </div>
//       ) : (
//         <div className={`${S.grid} ${S.gap4}`}>
//           {savedSearches.map((query, index) => (
//             <div
//               key={index}
//               className={`${S.flex} ${S.itemsCenter} ${S.justifyBetween} ${S.px5} ${S.py4} ${S.bgWhite} ${S.roundedXl} ${S.shadowMd} ${S.hoverShadowLg} ${S.transition}`}
//             >
//               <div className={`${S.flex} ${S.itemsCenter} ${S.gap4}`}>
//                 <FiSearch className={`${S.textXl} ${S.textGray500}`} />
//                 <span
//                   className={`${S.textLg} ${S.textBlue700} ${S.fontMedium}`}
//                 >
//                   {query}
//                 </span>
//               </div>

//               <button
//                 onClick={() => handleDelete(query)}
//                 className={`${S.p2} ${S.textRed500} ${S.hoverTextRed700} ${S.roundedFull} ${S.transition} ${S.cursorPointer}`}
//                 title="Delete search"
//               >
//                 <FiTrash2 className={S.textXl} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Following;



// pages/Following.tsx
import { useEffect, useState } from "react";
import {
  getSavedSearches,
  removeSavedSearch,
} from "../../utils/saveUtils";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import * as S from "../../styles/sharedStyles";

function Following() {
  const [searches, setSearches] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("currentUser")
  );

  // Update on user switch
  useEffect(() => {
    const handleUserChange = () => {
      const uid = localStorage.getItem("currentUser");
      setUserId(uid);
      setSearches(uid ? getSavedSearches() : []);
    };

    handleUserChange();

    // If you want to listen for external tab changes
    window.addEventListener("storage", handleUserChange);
    return () => window.removeEventListener("storage", handleUserChange);
  }, []);

  useEffect(() => {
    setSearches(userId ? getSavedSearches() : []);
  }, [userId]);

  const handleDelete = (query: string) => {
    removeSavedSearch(query);
    setSearches(getSavedSearches());
  };

  if (!userId) {
    return (
      <div
        className={`${S.textGray500} ${S.textCenter} ${S.textLg} ${S.py8} ${S.bgWhite} ${S.roundedLg} ${S.shadowInner}`}
      >
        Please log in to view your saved searches.
      </div>
    );
  }

  return (
    <div className={`${S.p6} ${S.maxW4xl} ${S.mxAuto}`}>
      <h1 className={`${S.text3xl} ${S.fontBold} ${S.mb6} ${S.textGray800}`}>
        Searches
      </h1>

      {searches.length === 0 ? (
        <div
          className={`${S.textGray500} ${S.textCenter} ${S.textLg} ${S.py8} ${S.bgWhite} ${S.roundedLg} ${S.shadowInner}`}
        >
          You haven't saved any searches yet.
        </div>
      ) : (
        <div className={`${S.grid} ${S.gap4}`}>
          {searches.map((query, index) => (
            <div
              key={index}
              className={`${S.flex} ${S.itemsCenter} ${S.justifyBetween} ${S.px5} ${S.py4} ${S.bgWhite} ${S.roundedXl} ${S.shadowMd} ${S.hoverShadowLg} ${S.transition}`}
            >
              <div className={`${S.flex} ${S.itemsCenter} ${S.gap4}`}>
                <FiSearch className={`${S.textXl} ${S.textGray500}`} />
                <span className={`${S.textLg} ${S.textBlue700} ${S.fontMedium}`}>
                  {query}
                </span>
              </div>

              <button
                onClick={() => handleDelete(query)}
                className={`${S.p2} ${S.textRed500} ${S.hoverTextRed700} ${S.roundedFull} ${S.transition} ${S.cursorPointer}`}
                title="Delete search"
              >
                <FiTrash2 className={S.textXl} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Following;

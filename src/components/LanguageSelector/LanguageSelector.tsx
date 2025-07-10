import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import type { LanguageOption, langProps } from "../../types/types";
import * as S from "../../styles/sharedStyles";

const languages: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
];

export default function LanguageSelector({
  isOpen,
  onClose,
  selected,
  onSelect,
}: langProps) {
  const [search, setSearch] = useState("");
  const [tempSelected, setTempSelected] = useState(selected);

  useEffect(() => {
    setTempSelected(selected);
  }, [selected, isOpen]);

  const filtered = languages.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className={`${S.fixed} ${S.inset0} ${S.z50} ${S.backdropBlurSm} ${S.bgBlack50} ${S.flex} ${S.itemsCenter} ${S.justifyCenter}`}
    >
      <div
        className={`${S.bgWhite} ${S.rounded} ${S.p6} ${S.wFull} ${S.maxWmd} ${S.maxH90vh} ${S.overflowYAuto}`}
      >
        <h2 className={`${S.textXl} ${S.fontSemibold} ${S.mb4}`}>
          Language and region of interest
        </h2>

        {/* Search */}
        <div
          className={`${S.flex} ${S.itemsCenter} ${S.bgGray100} ${S.px3} ${S.py2} ${S.rounded} ${S.mb4}`}
        >
          <FaSearch className={S.textGray500} />
          <input
            type="text"
            placeholder="Search for language or region"
            className="bg-gray-100 outline-none ml-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Language List */}
        <div>
          <h3
            className={`${S.textSm} ${S.fontSemibold} ${S.textGray500} ${S.mb2}`}
          >
            Suggested
          </h3>
          {[...filtered.slice(0, 2), ...filtered.slice(2)].map((lang) => (
            <label
              key={lang.code}
              className={`${S.flex} ${S.itemsCenter} ${S.spaceX2} ${S.py2} ${S.px2} ${S.rounded} ${S.hoverBgGray100} ${S.cursorPointer}`}
            >
              <input
                type="radio"
                name="language"
                checked={tempSelected === lang.code}
                onChange={() => setTempSelected(lang.code)}
              />
              <span>{lang.name}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className={`${S.flex} ${S.justifyEnd} ${S.spaceX2} ${S.mt6}`}>
          <button
            onClick={onClose}
            className={`${S.px4} ${S.py2} ${S.rounded} ${S.textBlue600} ${S.hoverBgGray100} ${S.cursorPointer}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelect(tempSelected);
              onClose();
            }}
            className={`${S.px4} ${S.py2} ${S.bgBlue500} ${S.textWhite} ${S.rounded} ${S.cursorPointer}`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

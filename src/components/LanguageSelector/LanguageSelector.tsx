import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import type { LanguageOption, langProps } from "../../types/types";

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
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-md p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Language and region of interest
        </h2>

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded mb-4">
          <FaSearch className="text-gray-500" />
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
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Suggested</h3>
          {[...filtered.slice(0, 2), ...filtered.slice(2)].map((lang) => (
            <label
              key={lang.code}
              className="flex items-center space-x-2 py-2 px-2 rounded hover:bg-gray-100 cursor-pointer"
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
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-blue-600 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelect(tempSelected); // Finalize selection
              onClose(); // Then close
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

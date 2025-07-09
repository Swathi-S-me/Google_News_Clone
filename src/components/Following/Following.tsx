import { useState } from "react";
import { getSavedSearches, removeSavedSearch } from "../../utils/saveUtils";
import { FiSearch, FiTrash2 } from "react-icons/fi";

function Following() {
  const [savedSearches, setSavedSearches] = useState(getSavedSearches());

  const handleDelete = (query: string) => {
    removeSavedSearch(query);
    setSavedSearches(getSavedSearches());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"> Searches</h1>

      {savedSearches.length === 0 ? (
        <div className="text-gray-500 text-center text-lg py-8 bg-white rounded-lg shadow-inner">
          You haven't saved any searches yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {savedSearches.map((query, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <FiSearch className="text-xl text-gray-500" />
                <span className="text-lg text-blue-700 font-medium">
                  {query}
                </span>
              </div>

              <button
                onClick={() => handleDelete(query)}
                className="p-2 text-red-500 hover:text-red-700 rounded-full transition cursor-pointer"
                title="Delete search"
              >
                <FiTrash2 className="text-xl" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Following;

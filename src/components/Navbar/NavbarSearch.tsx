import search from "../../assets/search.png";

export default function NavbarSearch({ setSearch }: { setSearch: (val: string) => void }) {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-xl">
      <img src={search} alt="search" className="w-4 h-4" />
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for news"
        className="ml-2 bg-gray-100 outline-none w-full text-sm"
      />
    </div>
  );
}

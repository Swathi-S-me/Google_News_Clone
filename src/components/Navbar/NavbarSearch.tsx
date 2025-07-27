import search from "../../assets/search.png";
import * as S from "../../styles/sharedStyles";

export default function NavbarSearch({
  setSearch,
}: {
  setSearch: (val: string) => void;
}) {
  return (
    <div
      role="search"
      className={`${S.flex} ${S.itemsCenter} ${S.bgGray100} ${S.roundedLg} ${S.px3} ${S.py2} ${S.wFull} ${S.maxWXL}`}
    >
      <img
        src={search}
        alt="Search Icon"
        width={16}
        height={16}
        loading="lazy"
        className="w-4 h-4"
      />
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for news"
        aria-label="Search news"
        className="ml-2 bg-gray-100 outline-none w-full text-sm"
      />
    </div>
  );
}

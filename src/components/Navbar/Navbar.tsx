import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLogo from "./NavbarLogo";
import NavbarSearch from "./NavbarSearch";
import NavbarIcons from "./NavbarIcons";
import * as S from "../../styles/sharedStyles";
import type { NavbarProps } from "../../types/types";

export default function Navbar({
  setSearch,
  selectedLang,
  onLangChange,
}: NavbarProps) {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <div
        className={`${S.flex} ${S.justifyBetween} ${S.itemsCenter} ${S.bgWhite} ${S.shadow} ${S.px6} ${S.py3} ${S.relative}`}
      >
        <NavbarLogo />
        <NavbarSearch setSearch={setSearch} />
        <NavbarIcons selectedLang={selectedLang} onLangChange={onLangChange} />
      </div>
    </>
  );
}

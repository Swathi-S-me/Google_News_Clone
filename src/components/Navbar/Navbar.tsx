import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLogo from "./NavbarLogo";
import NavbarSearch from "./NavbarSearch";
import NavbarIcons from "./NavbarIcons";
import type { NavbarProps } from "../../types/types";

export default function Navbar({ setSearch, selectedLang, onLangChange }: NavbarProps) {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="w-full bg-white shadow px-6 py-3 flex items-center justify-between relative">
        <NavbarLogo />
        <NavbarSearch setSearch={setSearch} />
        <NavbarIcons selectedLang={selectedLang} onLangChange={onLangChange} />
      </div>
    </>
  );
}

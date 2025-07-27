import { useEffect, useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import Menubar from "../components/Menubar/Menubar";
import Navbar from "../components/Navbar/Navbar";
import News from "../components/News/News";
import Home from "../components/Home/Home";
import Weather from "../components/Weather/Weather";
import { useNewsFetch } from "../hooks/useNewsFetch";
import * as S from "../styles/sharedStyles";

export default function Main() {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("Home");

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  const { location } = useRouterState();
  const pathname = location.pathname;
  const isHomePage = pathname === "/";

  const { news, loading } = useNewsFetch(search, menu, language, isHomePage);
  const date = new Date();

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <div className={`${S.overflowXHidden} ${S.bgGray100} ${S.minHScreen}`}>
      <Navbar
        setSearch={setSearch}
        selectedLang={language}
        onLangChange={setLanguage}
      />

      <Menubar setMenu={setMenu} />

      <div className={`${S.pt5} ${S.px4}`}>
        {isHomePage ? (
          <>
            <div
              className={`${S.flex} ${S.justifyBetween} ${S.itemsStart} ${S.px4}`}
            >
              <div>
                <h1 className={`${S.text3xl} ${S.fontSemibold}`}>
                  Your Briefing
                </h1>
                <h1 className={`${S.textGray500} ${S.textSm} ${S.mt2}`}>
                  {date.toLocaleString()}
                </h1>
              </div>
              <Weather />
            </div>

            <Home news={news} />
            <News news={news} search={search} loading={loading} />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

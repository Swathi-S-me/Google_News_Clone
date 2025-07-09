import { useEffect, useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import Menubar from "../components/Menubar/Menubar";
import Navbar from "../components/Navbar/Navbar";
import News from "../components/News/News";
import Home from "../components/Home/Home";
// import { type NewsItem } from "../Types/types";
import { useNewsFetch } from "../hooks/useNewsFetch"; 

export default function Main() {
  // const [news, setNews] = useState<NewsItem[] | undefined>();
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("Home");
  const [language, setLanguage] = useState("en");
  // const [loading, setLoading] = useState(true);

  // const { location } = useRouterState();
  // const pathname = location.pathname;

   const { location } = useRouterState();
  const pathname = location.pathname;
  const active = pathname === "/";

  const { news, loading } = useNewsFetch(search, menu, language, active);

  const date = new Date();

  // const getNews = async () => {
  //   try {
  //     setLoading(true);
  //     const topic = search || menu || "politics";
  //     const res = await fetch(
  //       `https://newsapi.org/v2/everything?q=${topic}&language=${language}&sortBy=popularity&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
  //     );
  //     const json = await res.json();
  //     setNews(json.articles);
  //   } catch (error) {
  //     console.error("Failed to fetch news", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (pathname === "/") getNews();
  //   }, 500);
  //   return () => clearTimeout(timeout);
  // }, [search, language, menu, pathname]);
useEffect(() => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) setLanguage(savedLang);
}, []);

useEffect(() => {
  localStorage.setItem("lang", language);
}, [language]);

  return (
    <>
    <div className="overflow-x-hidden bg-gray-100 min-h-screen">
      <Navbar
        setSearch={setSearch}
        selectedLang={language}
        onLangChange={setLanguage}
      />
      <Menubar setMenu={setMenu} />

      <div className="pt-5 px-4">
        {/* Render homepage content only at `/` */}
        {pathname === "/" && (
          <>
            <h1 className="text-3xl font-semibold">Your Briefing</h1>
            <h1 className="text-gray-500 text-sm mt-2">
              {date.toLocaleString()}
            </h1>
            <Home news={news} />
            <News news={news} search={search} loading={loading} />
          </>
        )}

        {/* Render routed components (e.g., /following) */}
        {pathname !== "/" && <Outlet />}
      </div>
    </div>
    
    </>
  );
}

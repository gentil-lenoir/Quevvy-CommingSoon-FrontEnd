// src/App.tsx
// ─── Simple client-side router ───────────────────────────────────────────────
// Works with React Router v6 or Next.js app router.
// Below is a standalone example using window.location for demonstration.

import { useEffect, useState } from "react";
import Home from "./views/Home.tsx";
import Donate from "./views/Donate.tsx";
import Donors from "./views/Donors.tsx";
import { NotFound, ServerError } from "./components/ErrorPages.tsx";

function getPage() {
  const path = window.location.pathname;
  if (path === "/" || path === "/home") return "home";
  if (path === "/donate") return "donate";
  if (path === "/donors") return "donors";
  if (path === "/500") return "500";
  return "404";
}

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    // Handle SPA navigation
    const handler = () => setPage(getPage());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  if (page === "home") return <Home />;
  if (page === "donate") return <Donate />;
  if (page === "donors") return <Donors />;
  if (page === "500") return <ServerError />;
  return <NotFound />;
}

// ─── If using Next.js App Router, map files like this: ───────────────────────
//
//  app/
//  ├── page.tsx          → import Home from "@/pages/Home"; export default Home;
//  ├── donate/
//  │   └── page.tsx      → import Donate from "@/pages/Donate"; export default Donate;
//  ├── donors/
//  │   └── page.tsx      → import Donors from "@/pages/Donors"; export default Donors;
//  ├── not-found.tsx     → import { NotFound } from "@/pages/ErrorPages"; export default NotFound;
//  └── error.tsx         → import { ServerError } from "@/pages/ErrorPages"; export default ServerError;
//
// ─── If using React Router v6: ───────────────────────────────────────────────
//
//  import { BrowserRouter, Routes, Route } from "react-router-dom";
//  <BrowserRouter>
//    <Routes>
//      <Route path="/" element={<Home />} />
//      <Route path="/donate" element={<Donate />} />
//      <Route path="/donors" element={<Donors />} />
//      <Route path="*" element={<NotFound />} />
//    </Routes>
//  </BrowserRouter>
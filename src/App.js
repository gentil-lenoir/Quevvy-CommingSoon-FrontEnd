import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home.tsx";
import Donors from "./views/Donors.tsx";
import Donate from "./views/Donate.tsx";
// import {Analytics} from '@vercel/analytics/react';

function App() {
  return (
    <Router>
      {/* <Analytics /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donation" element={<Donate />} />
        <Route path="/donors" element={<Donors />} />
      </Routes>
    </Router>
  );
}

export default App;
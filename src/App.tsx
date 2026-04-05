import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Donors from "./views/Donors";
import Donate from "./views/Donate";
import {Analytics} from '@vercel/analytics/react';

const App: FC = () => {
  return (
    <Router>
      <Analytics />
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

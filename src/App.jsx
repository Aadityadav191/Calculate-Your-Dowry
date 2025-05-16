import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Calculate from "./Pages/Calculate/Calculate"; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calculate" element={<Calculate />} />
      </Routes>
    </Router>
  );
}

export default App;

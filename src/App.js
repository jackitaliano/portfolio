import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { About } from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<About />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import React from "react";

import { About, Projects } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <Projects />
    </div>
  );
}

export default App;

import "./App.css";
import React from "react";

import { About, Projects, Contact } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;

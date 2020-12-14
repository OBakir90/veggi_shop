import React from "react";
import { render } from "react-dom";
import Home from "./components/Home.jsx";

const App = () => {
  return (
  <Home />
  )
};

render(<App/>, document.getElementById("root"));

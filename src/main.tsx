import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./hooks/use-theme";
import "./index.css";

ReactDOM.render(
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

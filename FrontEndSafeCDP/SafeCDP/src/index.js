import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import "./css/index.css";
import App from "./App";
require("dotenv").config();

ReactDOM.render(
  <Router>
    <HashRouter>
      <App />
    </HashRouter>
  </Router>,
  document.getElementById("root")
);

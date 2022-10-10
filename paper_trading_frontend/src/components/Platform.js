import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import BaseRouter from "./Routes";


function Platform() {
  return (
    <Router>
      <Navbar />
      <BaseRouter />
    </Router>
  )
}

export default Platform
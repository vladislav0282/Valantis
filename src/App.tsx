import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <BrowserRouter basename="/Valantis">
      <AppRouter />
    </BrowserRouter>
  );
};
export default App;

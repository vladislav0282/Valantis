import { Routes, Route } from "react-router-dom";

import ValantisPage from "../pages/ValantisPage";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import NotFound from "./NotFound";

const publicRoutes = [
  { path: "/", Component: ValantisPage },
  { path: "*", Component: NotFound },
  { path: "/valantis", Component: ValantisPage },
];

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;

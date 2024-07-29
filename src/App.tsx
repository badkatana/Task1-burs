import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RuPage from "./pages/404Page";
import VariantPage from "./pages/variantPage";

function App() {
  const routes = [
    {
      path: "/*",
      Component: VariantPage(),
    },
    {
      path: "sdfsdsds",
      Component: RuPage(),
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route path={path} element={Component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

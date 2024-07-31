import { BrowserRouter, Route, Routes } from "react-router-dom";
import VariantPage from "./pages/variantPage";

function App() {
  const routes = [
    {
      path: "/*",
      Component: VariantPage(),
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

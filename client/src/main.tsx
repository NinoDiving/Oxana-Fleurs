import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import BackOfficeFlowers from "./components/BackOffice/BackOfficeFlowers/BackOfficeFlowers.tsx";
import BackOfficePlantes from "./components/BackOffice/BackOfficePlants/BackOfficePlants.tsx";
import BackOfficeHome from "./components/BackOffice/Home/BackOfficeHome.tsx";
import TopProducts from "./components/BackOffice/TopProducts/TopProducts.tsx";
import Bouquet from "./components/Bouquet/Bouquet.tsx";
import Home from "./components/Home/Home.tsx";
import Plants from "./components/Plants/Plants.tsx";
import Product from "./components/Product/Product.tsx";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <BackOfficeHome />,
  },
  {
    path: "/admin-fleurs",
    element: <BackOfficeFlowers />,
  },
  {
    path: "/admin-plantes",
    element: <BackOfficePlantes />,
  },
  {
    path: "/admin-top-produits",
    element: <TopProducts />,
  },
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bouquets",
        element: <Bouquet />,
      },
      {
        path: "/plantes",
        element: <Plants />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

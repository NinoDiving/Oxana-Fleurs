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
import UserProfile from "./components/UserProfile/UserProfile.tsx";
import { ProtectedRoute } from "./services/ProtectedRoute/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <BackOfficeHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-fleurs",
    element: (
      <ProtectedRoute>
        <BackOfficeFlowers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-plantes",
    element: (
      <ProtectedRoute>
        <BackOfficePlantes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-top-produits",
    element: (
      <ProtectedRoute>
        <TopProducts />
      </ProtectedRoute>
    ),
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
      {
        path: "/login",
        element: <UserProfile />,
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

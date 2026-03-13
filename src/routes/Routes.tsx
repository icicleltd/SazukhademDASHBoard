import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import PortfolioSection from "../pages/Dashboard/PortfolioSection/PortfolioSection";
import Shop from "../pages/Dashboard/shop/Shop";
import Customer from "../pages/Dashboard/shop/Customer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "portfolio-section",
        element: <PortfolioSection />,
      },
      {
        path: "shop-section",
        element: <Shop />,
      },
      {
        path: "customer-section",
        element: <Customer />,
      },
    ],
  },
]);

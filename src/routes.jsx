import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // contains NavBar + <Outlet/> + Footer
import Home from "./Home";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import LoginPage from "./LoginPage";
import Registeration from "./Registeration";
import Shopping from "./Shopping";
import AdminPortal from "./Admin/AdminPortal";
import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Product/Products";
import Orders from "./Admin/Orders";
import Customers from "./Admin/Customers";
import Payments from "./Admin/Payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout with NavBar + Footer + Outlet
    children: [
      { index: true, element: <Home /> },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "cart", element: <Cart /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "loginPage", element: <LoginPage /> },
      { path: "loginPage/registeration", element: <Registeration /> },
      { path: "shopNow", element: <Shopping /> },

      // === Admin Nested Routes ===
      {
        path: "/admin",
        element: <AdminPortal />, // Admin layout with its own navbar + Outlet
        children: [
          { index: true, element: <Dashboard /> }, // default route /admin
          { path: "products", element: <Products /> },
          { path: "orders", element: <Orders /> },
          { path: "customers", element: <Customers /> },
          { path: "payments", element: <Payments /> },
        ],
      },
    ],
  },
]);

export default router;

import { Outlet, createBrowserRouter } from "react-router-dom";
import Page from "./Page";
import NotFound from "./app/NotFound";
import Splash from "./app/Splash";
import Tour from "./app/Tour";
import Qr from "./app/Qr";
import Fav from "./app/Fav";
import Menu from "./app/Menu";
import TourDetail from "./app/TourDetail";
import SignUp from "./app/SignUp";
import SignIn from "./app/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Splash />,
      },
      {
        path: "home",
        element: <Page />,
      },
      {
        path: "tour",
        element: <Tour />,
      },
      {
        path: "qr",
        element: (
          <ProtectedRoute>
            <Qr />
          </ProtectedRoute>
        ),
      },
      {
        path: "fav",
        element: (
          <ProtectedRoute>
            <Fav />
          </ProtectedRoute>
        ),
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "tour/:id",
        element: <TourDetail />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;

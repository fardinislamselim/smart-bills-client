import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Bills from "../pages/Bills";
import BillDetails from "../pages/BillDetails";
import MyPayBills from "../pages/MyPayBills";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivetRout from "./PrivetRout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "bills", Component: Bills },
      {
        path: "bills/:id",
        element: (
          <PrivetRout>
            <BillDetails></BillDetails>
          </PrivetRout>
        ),
      },
      {
        path: "mypaybills",
        element: (
          <PrivetRout>
            <MyPayBills />
          </PrivetRout>
        ),
      },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);

export default router;

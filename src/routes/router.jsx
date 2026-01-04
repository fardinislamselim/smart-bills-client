import { createBrowserRouter } from "react-router";
import Loading from "../components/Loading";
import RootLayout from "../layout/RootLayout";
import BillDetails from "../pages/BillDetails";
import Bills from "../pages/Bills";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyPayBills from "../pages/MyPayBills";
import Register from "../pages/Register";
import PrivetRout from "./PrivetRout";

import DashboardLayout from "../layout/DashboardLayout";
import AddBill from "../pages/AddBill";
import DashboardHome from "../pages/DashboardHome";
import ManageBills from "../pages/ManageBills";
import ManageUsers from "../pages/ManageUsers";
import Profile from "../pages/Profile";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "bills", Component: Bills },
      {
        path: "bill/:id",
        element: (
          <PrivetRout>
            <BillDetails></BillDetails>
          </PrivetRout>
        ),
      },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", Component: ErrorPage },
    ],
  },
  {
    path: "/dashboard",
    element: (
        <PrivetRout>
            <DashboardLayout />
        </PrivetRout>
    ),
    children: [
        { path: "user-home", element: <DashboardHome /> },
        { path: "admin-home", element: <AdminRoute><DashboardHome /></AdminRoute> },
        { path: "profile", element: <Profile /> },
        { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
        { path: "manage-bills", element: <AdminRoute><ManageBills /></AdminRoute> },
        { path: "add-bill", element: <AdminRoute><AddBill /></AdminRoute> },
        { path: "my-payments", element: <MyPayBills /> },
        { path: "all-transactions", element: <AdminRoute><MyPayBills /></AdminRoute> }, // Reusing MyPayBills for transaction list
    ]
  }
]);

export default router;

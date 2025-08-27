import { Layout } from "@/components/layouts/Layout";
import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ResetPassword from "@/pages/Auth/ResetPassword";
import VerifyOTP from "@/pages/Auth/VerifyOTP";
import HomePage from "@/pages/HomePage";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import UserDetailPage from "@/pages/Dashboard/AdminPages/userDetailpage";
import UserManagement from "@/pages/Dashboard/AdminPages/UserManagement";
import DriverDashboard from "@/pages/Dashboard/DriverDashboard";
import Profile from "@/pages/Dashboard/Profile";
import RiderDashboard from "@/pages/Dashboard/RiderDashboard";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "verify-otp", element: <VerifyOTP /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "dashboard/profile", element: <Profile /> },
      { path: "dashboard/user-management", element: <UserManagement /> },
      // { path: "dashboard/user-management/:id", element: <UserDetailWrapper /> },
      {
        path: "dashboard/user-management/:userId",
        element: <UserDetailPage />,
      },
      { path: "dashboard/rider", element: <RiderDashboard /> },
      { path: "dashboard/driver", element: <DriverDashboard /> },
      { path: "dashboard/admin", element: <AdminDashboard /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

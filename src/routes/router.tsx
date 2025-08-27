/* eslint-disable react-refresh/only-export-components */
// import { Layout } from "@/components/layouts/Layout";
// import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
// import Login from "@/pages/Auth/Login";
// import Register from "@/pages/Auth/Register";
// import ResetPassword from "@/pages/Auth/ResetPassword";
// import VerifyOTP from "@/pages/Auth/VerifyOTP";
// import HomePage from "@/pages/HomePage";

// import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
// import DriverManagement from "@/pages/Dashboard/AdminPages/DriverManagement";
// import ReportsOverview from "@/pages/Dashboard/AdminPages/ReportsOverView";
// import RideDetailPage from "@/pages/Dashboard/AdminPages/RideDetailPage";
// import RideManagement from "@/pages/Dashboard/AdminPages/RideManagement";
// import UserDetailPage from "@/pages/Dashboard/AdminPages/userDetailPage";
// import UserManagement from "@/pages/Dashboard/AdminPages/UserManagement";
// import DriverDashboard from "@/pages/Dashboard/DriverDashboard";
// import Profile from "@/pages/Dashboard/Profile";
// import RiderDashboard from "@/pages/Dashboard/RiderDashboard";
// import NotFound from "@/pages/NotFound";
// import { createBrowserRouter } from "react-router";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "login", element: <Login /> },
//       { path: "signup", element: <Register /> },
//       { path: "verify-otp", element: <VerifyOTP /> },
//       { path: "forgot-password", element: <ForgotPasswordPage /> },
//       { path: "reset-password", element: <ResetPassword /> },
//     ],
//   },

//   // Admin Dashboard
//   {
//     element: <DashboardLayout />,
//     children: [
//       { path: "dashboard/profile", element: <Profile /> },
//       { path: "dashboard/user-management", element: <UserManagement /> },
//       {
//         path: "dashboard/user-management/:userId",
//         element: <UserDetailPage />,
//       },
//       { path: "dashboard/driver-management", element: <DriverManagement /> },
//       { path: "dashboard/ride-management", element: <RideManagement /> },
//       {
//         path: "dashboard/ride-management/:rideId",
//         element: <RideDetailPage />,
//       },
//       {
//         path: "dashboard/analytics",
//         element: <ReportsOverview />,
//       },
//       { path: "dashboard/rider", element: <RiderDashboard /> },
//       { path: "dashboard/driver", element: <DriverDashboard /> },
//       { path: "dashboard/admin", element: <AdminDashboard /> },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

// export default router;

import { Layout } from "@/components/layouts/Layout";
import { createBrowserRouter, Navigate } from "react-router";

import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ResetPassword from "@/pages/Auth/ResetPassword";
import VerifyOTP from "@/pages/Auth/VerifyOTP";
import HomePage from "@/pages/HomePage";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import DriverDashboard from "@/pages/Dashboard/DriverDashboard";
import RiderDashboard from "@/pages/Dashboard/RiderDashboard";

import DriverManagement from "@/pages/Dashboard/AdminPages/DriverManagement";
import ReportsOverview from "@/pages/Dashboard/AdminPages/ReportsOverView";
import RideDetailPage from "@/pages/Dashboard/AdminPages/RideDetailPage";
import RideManagement from "@/pages/Dashboard/AdminPages/RideManagement";
import UserManagement from "@/pages/Dashboard/AdminPages/UserManagement";
import UserDetailPage from "@/pages/Dashboard/AdminPages/userDetailPage";

import Profile from "@/pages/Dashboard/Profile";
import NotFound from "@/pages/NotFound";

import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { type ReactElement } from "react";
import ProtectedRoute from "./ProtectedRoute";

/**
 * Small component that redirects /dashboard to /dashboard/{role}
 * after user data loads.
 */
const DashboardIndexRedirect = (): ReactElement => {
  const { data: user, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={`/dashboard/${user.role}`} replace />;
};

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
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  // All dashboard routes are now protected at the layout level
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Redirect /dashboard -> /dashboard/{role}
      { index: true, element: <DashboardIndexRedirect /> },

      // Common (accessible by any authenticated user)
      { path: "profile", element: <Profile /> },

      // Role specific roots
      {
        path: "admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "rider",
        element: (
          <ProtectedRoute roles={["rider"]}>
            <RiderDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "driver",
        element: (
          <ProtectedRoute roles={["driver"]}>
            <DriverDashboard />
          </ProtectedRoute>
        ),
      },

      // Admin-only nested pages
      {
        path: "user-management",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-management/:userId",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <UserDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "driver-management",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <DriverManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "ride-management",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <RideManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "ride-management/:rideId",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <RideDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <ReportsOverview />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Fallback
  { path: "*", element: <NotFound /> },
]);

export default router;

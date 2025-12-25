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

import GoOnline from "@/components/dashboard/driver/GoOnline";
import ActiveRide from "@/components/dashboard/rider/ActiveRide";
import AboutUs from "@/pages/AboutUs";
import PendingApproval from "@/pages/Auth/PendingApproval";
import Careers from "@/pages/Careers";
import Cities from "@/pages/Cities";
import Contact from "@/pages/Contact";
import NotificationAlert from "@/pages/Dashboard/AdminPages/NotificationAlert";
import DriverCurrentRide from "@/pages/Dashboard/DriverPages/DriverCurrentRide";
import RideRequestsPage from "@/pages/Dashboard/DriverPages/RideRequestsPage";
import BookRide from "@/pages/Dashboard/RiderPages/BookRide";
import RideHistory from "@/pages/Dashboard/RiderPages/RideHistory";
import RideHistoryDetail from "@/pages/Dashboard/RiderPages/RideHistoryDetail";
import Drivers from "@/pages/Drivers";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import License from "@/pages/License";
import Pricing from "@/pages/Pricing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ReportIssue from "@/pages/ReportIssue";
import Riders from "@/pages/Riders";
import Safety from "@/pages/Safety";
import TermsOfService from "@/pages/TermsOfService";
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
      { path: "faq", element: <FAQ /> },
      { path: "features", element: <Features /> },
      { path: "pricing", element: <Pricing /> },
      { path: "careers", element: <Careers /> },
      { path: "riders", element: <Riders /> },
      { path: "drivers", element: <Drivers /> },
      { path: "cities", element: <Cities /> },
      { path: "safety", element: <Safety /> },
      { path: "report", element: <ReportIssue /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "license", element: <License /> },
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
      {
        path: "goonline",
        element: (
          <ProtectedRoute roles={["driver"]}>
            <GoOnline />
          </ProtectedRoute>
        ),
      },
      {
        path: "ride-requests",
        element: (
          <ProtectedRoute roles={["driver"]}>
            <RideRequestsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "current-ride",
        element: (
          <ProtectedRoute roles={["driver"]}>
            <DriverCurrentRide />
          </ProtectedRoute>
        ),
      },
      {
        path: "ride-history",
        element: (
          <ProtectedRoute roles={["driver", "rider"]}>
            <RideHistory />
          </ProtectedRoute>
        ),
      },

      {
        path: "ride-history/:id",
        element: (
          <ProtectedRoute roles={["driver", "rider"]}>
            <RideHistoryDetail />
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
      {
        path: "notifications",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <NotificationAlert />
          </ProtectedRoute>
        ),
      },
      // rider routes
      {
        path: "book-ride",
        element: (
          <ProtectedRoute roles={["rider"]}>
            <BookRide />
          </ProtectedRoute>
        ),
      },
      {
        path: "active-ride",
        element: (
          <ProtectedRoute roles={["rider"]}>
            <ActiveRide />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "ride-history",
      //   element: (
      //     <ProtectedRoute roles={["rider"]}>
      //       <RideHistory />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },

  // Fallback
  { path: "pending-approval", element: <PendingApproval /> },
  { path: "*", element: <NotFound /> },
]);

export default router;

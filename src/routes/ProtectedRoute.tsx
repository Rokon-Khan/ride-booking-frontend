// import { useAuth } from "@/hooks/useAuth";
// import { Navigate, Outlet } from "react-router";

// interface ProtectedRouteProps {
//   roles?: Array<"admin" | "rider" | "driver">;
//   redirectTo?: string;
//   loadingFallback?: React.ReactNode;
// }

// const ProtectedRoute = ({
//   roles,
//   redirectTo = "/login",
//   loadingFallback = <div className="p-6 text-center">Loading...</div>,
// }: ProtectedRouteProps) => {
//   const { user, isLoading, isError, isAuthenticated } = useAuth();

//   if (isLoading) return loadingFallback;
//   if (isError || !isAuthenticated) return <Navigate to={redirectTo} replace />;

//   if (roles && user && !roles.includes(user.role)) {
//     return <Navigate to={`/dashboard/${user.role}`} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import { useAuth } from "@/hooks/useAuth";
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Array<"admin" | "rider" | "driver">;
  redirectTo?: string;
  loadingFallback?: ReactNode;
}

const ProtectedRoute = ({
  children,
  roles,
  redirectTo = "/login",
  loadingFallback = <div className="p-6 text-center">Loading...</div>,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isLoading, isError, isAuthenticated } = useAuth();

  if (isLoading) return <>{loadingFallback}</>;
  if (isError || !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.role)) {
    // If role mismatch, send them to their own dashboard root
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

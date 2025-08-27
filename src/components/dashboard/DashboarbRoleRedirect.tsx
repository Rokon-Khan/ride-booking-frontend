/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { Navigate } from "react-router";

const DashboardRoleRedirect = () => {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  const user = (data as any)?.data ?? data; // normalize

  if (isLoading) {
    return <div className="p-6 text-sm">Loading dashboard...</div>;
  }

  if (isError || !user?.role) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to determine user role. Please re-login.
      </div>
    );
  }

  return <Navigate to={`/dashboard/${user.role}`} replace />;
};

export default DashboardRoleRedirect;

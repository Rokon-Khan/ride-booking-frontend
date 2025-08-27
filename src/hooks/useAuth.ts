import { useUserInfoQuery } from "@/redux/features/auth/authApi";

export const useAuth = () => {
  const result = useUserInfoQuery(undefined);
  return {
    user: result.data,
    role: result.data?.role,
    isAuthenticated: !!result.data?._id,
    ...result,
  };
};

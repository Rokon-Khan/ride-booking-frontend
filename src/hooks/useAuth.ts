import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import Cookies from "js-cookie";

export const useAuth = () => {
  const token = Cookies.get("accessToken");
  const result = useUserInfoQuery(undefined, {
    skip: !token,
  });
  if (!token)
    return {
      isLoading: false,
      isError: false,
      user: null,
      isAuthenticated: false,
    };

  return {
    user: result.data,
    role: result.data?.role,
    isAuthenticated: !!result.data?._id,
    ...result,
  };
};

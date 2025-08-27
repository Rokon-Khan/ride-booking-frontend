/* eslint-disable react-refresh/only-export-components */
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/authApi";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

// User type based on your API response
interface User {
  _id: string;
  email: string;
  role: "admin" | "rider" | "driver";
  status: string;
  isEmailVerified: boolean;
  profile: {
    name: string;
    phone: string;
    address: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Use RTK Query hooks
  const {
    data: userInfoData,
    isLoading,
    isError,
    refetch: refetchUserInfo,
  } = useUserInfoQuery(undefined, {
    skip: false, // Always try to fetch user info on mount
  });

  const [logoutMutation] = useLogoutMutation();

  // Update user state when userInfoData changes
  useEffect(() => {
    if (userInfoData?.data) {
      setUser(userInfoData.data);
    } else if (isError) {
      setUser(null);
    }
  }, [userInfoData, isError]);

  // Refetch user data
  const refetchUser = () => {
    refetchUserInfo();
  };

  // Logout function using RTK Query mutation
  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      setUser(null);
      toast.success("Logged out successfully");
      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if logout fails on server, clear local state
      setUser(null);
      toast.success("Logged out successfully");
      window.location.href = "/login";
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading: isLoading,
    refetchUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

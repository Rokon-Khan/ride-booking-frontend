/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "rider" | "driver" | "admin";
  avatar?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  confirmPasswordReset: (
    token: string,
    newPassword: string
  ) => Promise<boolean>;
  pendingVerification: boolean;
  setPendingVerification: (pending: boolean) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "rider" | "driver";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rideshare.com",
    phone: "+1-555-0123",
    address: "123 Admin Street, City",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: "2",
    name: "John Driver",
    email: "driver@rideshare.com",
    phone: "+1-555-0456",
    address: "456 Driver Ave, City",
    role: "driver",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: "3",
    name: "Jane Rider",
    email: "rider@rideshare.com",
    phone: "+1-555-0789",
    address: "789 Rider Blvd, City",
    role: "rider",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    // Mock login - in real app, this would be an API call
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.role === role
    );
    if (foundUser && password === "password") {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem("auth_user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      address: "",
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
      isVerified: false,
    };

    mockUsers.push(newUser);
    setPendingVerification(true);
    localStorage.setItem("pending_user", JSON.stringify(newUser));
    return true;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Mock OTP verification - accept any 6-digit code
    if (otp.length === 6) {
      const pendingUser = localStorage.getItem("pending_user");
      if (pendingUser) {
        const user = JSON.parse(pendingUser);
        user.isVerified = true;
        setUser(user);
        setIsAuthenticated(true);
        setPendingVerification(false);
        localStorage.setItem("auth_user", JSON.stringify(user));
        localStorage.removeItem("pending_user");
        return true;
      }
    }
    return false;
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock password reset
    const foundUser = mockUsers.find((u) => u.email === email);
    return !!foundUser;
  };

  const confirmPasswordReset = async (
    token: string,
    newPassword: string
  ): Promise<boolean> => {
    // Mock password reset confirmation
    return token === "mock-token" && newPassword.length >= 6;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setPendingVerification(false);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("pending_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        verifyOTP,
        updateProfile,
        resetPassword,
        confirmPasswordReset,
        pendingVerification,
        setPendingVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

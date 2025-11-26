// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Car, Eye, EyeOff, Lock, Mail } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router";
// import { toast } from "sonner";
// import { z } from "zod";

// // ✅ Zod schema
// const loginSchema = z.object({
//   email: z.email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   });

//   const [login, { isLoading }] = useLoginMutation();

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       await login(data).unwrap();

//       // ✅ No localStorage needed, cookies are set by backend
//       toast.success("Login Successful!");
//       navigate("/dashboard/admin");
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-20">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         ></div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2 group">
//             <div className="p-3 bg-white rounded-lg shadow-strong group-hover:shadow-glow transition-all duration-300">
//               <Car className="h-8 w-8 text-primary" />
//             </div>
//             <span className="text-2xl font-heading font-bold text-white">
//               RideShare Pro
//             </span>
//           </Link>
//         </div>

//         <Card className="shadow-strong border-0">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Welcome Back</CardTitle>
//             <CardDescription>
//               Sign in to your RideShare Pro account
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     className={`pl-10 ${
//                       errors.email ? "border-destructive" : ""
//                     }`}
//                     {...register("email")}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-sm text-destructive">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     className={`pl-10 pr-10 ${
//                       errors.password ? "border-destructive" : ""
//                     }`}
//                     {...register("password")}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-destructive">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Forgot Password */}
//               <div className="text-right">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-primary hover:text-primary-light transition-colors"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full btn-hero"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Signing In..." : "Sign In"}
//               </Button>
//             </form>

//             {/* Sign Up Link */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   className="text-primary hover:text-primary-light font-medium transition-colors"
//                 >
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useAuth } from "@/hooks/useAuth";
// import { useAuth } from "@/context/AuthContext";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
// import { get } from "http";
import Cookies from "js-cookie";
import { Car, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Zod schema
const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const { user, refetchUser } = useAuth();
  // const { user } = useAuth();

  const role = Cookies.get("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (role) {
      const redirectPath = getRoleBasedRedirect(role);
      navigate(redirectPath, { replace: true });
    }
  }, [role, navigate]);

  // Function to determine redirect path based on user role
  const getRoleBasedRedirect = (role: string) => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "driver":
        return "/dashboard/driver";
      case "rider":
        return "/dashboard/rider";
      default:
        return "/dashboard";
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Login user - RTK Query will handle token storage automatically
      const response = await login(data).unwrap();

      if (response.status === "pending" || response.status === "blocked") {
        // ✅ clear any auth cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("role");

        navigate("/pending-approval");
        return;
      }

      toast.success("Login Successful!");

      // Navigate based on role from login response or wait for user data
      if (response.role) {
        const redirectPath = getRoleBasedRedirect(response.role);
        navigate(redirectPath, { replace: true });
      }
      // Note: If no role in response, navigation will happen via useEffect when user data is fetched
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 bg-white rounded-lg shadow-strong group-hover:shadow-glow transition-all duration-300">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-heading font-bold text-white">
              RideShare Pro
            </span>
          </Link>
        </div>

        <Card className="shadow-strong border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your RideShare Pro account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 ${
                      errors.password ? "border-destructive" : ""
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-light transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-hero"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary-light font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

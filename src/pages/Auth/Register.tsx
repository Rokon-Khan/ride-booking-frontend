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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRegisterMutation } from "@/redux/features/auth/authApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Car, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router";
// import { toast } from "sonner";
// import { z } from "zod";

// // ✅ Zod schema
// const registerSchema = z
//   .object({
//     email: z.email("Invalid email address"),
//     role: z.enum(["rider", "driver"], {
//       message: "Please select a role",
//     }),
//     vehicle: z
//       .object({
//         model: z.string().min(6, "Vehicle model is required"),
//         licensePlate: z.string().min(10, "License plate is required"),
//       })
//       .optional(),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string(),
//     profile: z.object({
//       name: z.string().min(1, "Name is required"),
//       phone: z.string().optional(),
//       avatarUrl: z.string().url().nullable().optional(),
//       address: z
//         .string()
//         .min(5, "Address must be at least 5 characters")
//         .optional(),
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   })
//   .refine(
//     (data) =>
//       data.role !== "driver" ||
//       (data.vehicle?.model && data.vehicle?.licensePlate),
//     {
//       path: ["vehicle"],
//       message: "Vehicle model & license plate are required for drivers",
//     }
//   );

// type RegisterFormValues = z.infer<typeof registerSchema>;

// const Register = () => {
//   const navigate = useNavigate();
//   const [registerUser, { isLoading }] = useRegisterMutation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       email: "",
//       role: undefined,
//       vehicle: { model: "", licensePlate: "" },
//       password: "",
//       confirmPassword: "",
//       profile: { name: "", phone: "", avatarUrl: null, address: "" },
//     },
//   });

//   const onSubmit = async (values: RegisterFormValues) => {
//     try {
//       const userInfo = {
//         email: values.email,
//         password: values.password,
//         role: values.role,
//         profile: {
//           name: values.profile.name,
//           phone: values.profile.phone || undefined,
//           avatarUrl: null, // default
//           address: "", // default
//         },
//         vehicle: {
//           model: values.vehicle?.model ?? "",
//           licensePlate: values.vehicle?.licensePlate ?? "",
//         },
//       };

//       if (values.role === "driver" && values.vehicle) {
//         userInfo.vehicle = {
//           model: values.vehicle.model,
//           licensePlate: values.vehicle.licensePlate,
//         };
//       }

//       await registerUser(userInfo).unwrap();

//       toast.success("Account created successfully!");
//       navigate("/verify-otp");
//     } catch (error: any) {
//       toast.error(error?.data?.error || "Registration failed");
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

//       <div className="relative z-10 w-full max-w-2xl">
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
//             <CardTitle className="text-2xl">Create Your Account</CardTitle>
//             <CardDescription>
//               Join RideShare Pro and start your journey today
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               {/* Full Name & Email */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       {...form.register("profile.name")}
//                       placeholder="Enter your full name"
//                       className="pl-10"
//                     />
//                   </div>
//                   <p className="text-sm text-destructive">
//                     {form.formState.errors.profile?.name?.message}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       {...form.register("email")}
//                       placeholder="Enter your email"
//                       type="email"
//                       className="pl-10"
//                     />
//                   </div>
//                   <p className="text-sm text-destructive">
//                     {form.formState.errors.email?.message}
//                   </p>
//                 </div>
//               </div>

//               {/* Phone & Role */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Phone (Optional)</Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       {...form.register("profile.phone")}
//                       placeholder="Enter your phone number"
//                       type="tel"
//                       className="pl-10"
//                     />
//                   </div>
//                   <p className="text-sm text-destructive">
//                     {form.formState.errors.profile?.phone?.message}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Role</Label>
//                   <Select
//                     onValueChange={(val) => form.setValue("role", val as any)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="rider">Rider</SelectItem>
//                       <SelectItem value="driver">Driver</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <p className="text-sm text-destructive">
//                     {form.formState.errors.role?.message}
//                   </p>
//                 </div>
//               </div>

//               {/* Driver fields */}
//               {form.watch("role") === "driver" && (
//                 <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
//                   <div className="space-y-2">
//                     <Label>Vehicle Name and Type</Label>
//                     <Input {...form.register("vehicle.model")} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Enter a Driver Valid License No:</Label>
//                     <Input {...form.register("vehicle.licensePlate")} />
//                   </div>
//                   <p className="text-sm text-destructive col-span-2">
//                     {form.formState.errors.vehicle?.message}
//                   </p>
//                 </div>
//               )}

//               {/* Passwords */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       {...form.register("password")}
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter password"
//                       className="pl-10 pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((p) => !p)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2"
//                     >
//                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                   <p className="text-sm text-destructive">
//                     {form.formState.errors.password?.message}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Confirm Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       {...form.register("confirmPassword")}
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm password"
//                       className="pl-10 pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword((p) => !p)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff size={16} />
//                       ) : (
//                         <Eye size={16} />
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-sm text-destructive">
//                     {form.formState.errors.confirmPassword?.message}
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full btn-hero"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating Account..." : "Create Account"}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-primary hover:text-primary-light font-medium"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Register;

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Simplified Zod schema (no vehicle)
const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["rider", "driver"], {
      message: "Please select a role",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    profile: z.object({
      name: z.string().min(1, "Name is required"),
      phone: z.string().optional(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      role: undefined,
      password: "",
      confirmPassword: "",
      profile: { name: "", phone: "" },
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
        role: values.role,
        profile: {
          name: values.profile.name,
          phone: values.profile.phone || undefined,
          avatarUrl: null, // always null at registration
        },
      };

      console.log("Registering user with info:", userInfo);

      await registerUser(userInfo).unwrap();
      toast.success("Account created Please Verify your email");

      navigate("/verify-otp", {
        state: {
          email: values.email,
        },
      });
    } catch (error: any) {
      toast.error(error?.data?.error || "Registration failed");
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

      <div className="relative z-10 w-full max-w-2xl">
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
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join RideShare Pro and start your journey today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...form.register("profile.name")}
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-destructive">
                    {form.formState.errors.profile?.name?.message}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...form.register("email")}
                      placeholder="Enter your email"
                      type="email"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email?.message}
                  </p>
                </div>
              </div>

              {/* Phone & Role */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...form.register("profile.phone")}
                      placeholder="Enter your phone number"
                      type="tel"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-destructive">
                    {form.formState.errors.profile?.phone?.message}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    onValueChange={(val) => form.setValue("role", val as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rider">Rider</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-destructive">
                    {form.formState.errors.role?.message}
                  </p>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...form.register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password?.message}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...form.register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-destructive">
                    {form.formState.errors.confirmPassword?.message}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-hero"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-light font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

// import { Link, useNavigate } from "react-router";
// import { ArrowLeft, Mail } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { toast } from "sonner";
// import { useForgotPasswordMutation } from "@/redux/features/auth/authApi"; // ✅ RTK endpoint

// const forgotPasswordSchema = z.object({
//   email: z.email("Please enter a valid email address"),
// });

// type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

//   const form = useForm<ForgotPasswordFormData>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = async (data: ForgotPasswordFormData) => {
//     try {
//       const res = await sendOtp({ email: data.email }).unwrap();

//       // ✅ success (redirect to /reset-password)
//       toast.success(res?.message || "OTP sent successfully!");
//       navigate("/reset-password", { state: { email: data.email } });
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to send OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <Card className="shadow-strong border-0">
//           <CardHeader className="text-center space-y-4">
//             <div className="flex items-center justify-between">
//               <Link
//                 to="/login"
//                 className="p-2 hover:bg-muted rounded-full transition-colors"
//               >
//                 <ArrowLeft className="h-5 w-5 text-muted-foreground" />
//               </Link>
//               <div className="flex-1" />
//             </div>

//             <div className="flex justify-center">
//               <div className="p-3 bg-primary/10 rounded-full">
//                 <Mail className="h-8 w-8 text-primary" />
//               </div>
//             </div>

//             <CardTitle className="text-2xl font-heading text-foreground">
//               Forgot Password?
//             </CardTitle>

//             <p className="text-muted-foreground">
//               No worries! Enter your email and we&apos;ll send you an OTP to reset
//               your password.
//             </p>
//           </CardHeader>

//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email Address</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           type="email"
//                           placeholder="Enter your email address"
//                           className="h-12"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full h-12 btn-cta"
//                 >
//                   {isLoading ? "Sending..." : "Send OTP"}
//                 </Button>
//               </form>
//             </Form>

//             <div className="mt-6 text-center">
//               <Link
//                 to="/login"
//                 className="text-sm text-primary hover:text-primary-dark transition-colors"
//               >
//                 Remember your password? Sign in
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

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
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.email("Valid email required"),
});

type Values = z.infer<typeof schema>;

const ForgotPasswordPage: React.FC = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    try {
      await forgotPassword({ email: values.email }).unwrap();
      toast.success("OTP sent to your email");
      navigate("/reset-password", { state: { email: values.email } });
    } catch (e: any) {
      toast.error(
        e?.data?.error || e?.data?.message || "Failed to send reset OTP"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset OTP.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm">
              <Link to="/login" className="text-primary hover:underline">
                Back to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

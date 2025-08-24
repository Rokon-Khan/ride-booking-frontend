/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

interface LocationState {
  email: string;
}

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const state = (location.state || {}) as LocationState;
  const email = state.email;

  const navigate = useNavigate();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (!email) {
      toast.error("Missing email context, please sign up again.");
      navigate("/signup");
    }
  }, [email, navigate]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle OTP Verification
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP code.");
      return;
    }

    try {
      await verifyEmail({
        otp,
        email: email,
      }).unwrap();
      toast.success("Your email has been successfully verified!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid OTP, try again.");
      setOtp("");
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    try {
      await resendOtp({
        email: email,
      }).unwrap();
      toast.success("A new OTP has been sent to your email.");
      setTimeLeft(120);
      setCanResend(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-strong border-0">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-between">
              <Link
                to="/signup"
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </Link>
              <div className="flex-1" />
            </div>
            <CardTitle className="text-2xl font-heading text-foreground">
              Verify Your Email
            </CardTitle>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to your email. Please enter
              it below to complete your registration.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* OTP Input */}
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isVerifying}
                className="w-full btn-cta"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>

            {/* Resend OTP */}
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>

              {!canResend ? (
                <p className="text-sm font-medium text-foreground">
                  Resend code in {formatTime(timeLeft)}
                </p>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-primary hover:text-primary-dark"
                >
                  {isResending ? "Resending..." : "Resend Code"}
                </Button>
              )}
            </div>

            {/* Back to login */}
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;

// New PendingApproval.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
// import { toast } from "sonner";

const PendingApproval = () => {
  // const [logout] = useLogoutMutation();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     // await logout().unwrap();
  //     // Optionally hard redirect or use navigation
  //     window.location.href = "/login";
  //   } catch {
  //     // swallow; could add toast
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Account is Blocked or Pending Approval
          </CardTitle>
          <CardDescription>
            Your account is awaiting approval from an administrator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              We appreciate your patience. You'll receive an email once your
              account is approved.
            </p>
            <p>In the meantime, you can log out or check back later.</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApproval;

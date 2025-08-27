import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBlockUserMutation,
  useViewUserQuery,
} from "@/redux/features/admin/adminApi";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { UserDetail } from "./UserDetail"; // Adjust the import path as needed

const UserDetailPage = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from URL
  const {
    data: user,
    isLoading,
    isError,
  } = useViewUserQuery({ userId: userId! });
  const [blockUser] = useBlockUserMutation();
  const navigate = useNavigate();

  const handleBlock = async (userId: string) => {
    try {
      await blockUser({ userId }).unwrap();
    } catch (err) {
      console.error("Failed to block user", err);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardContent>
          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !user) {
    return (
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardContent>
          <p className="text-center text-red-500">
            Failed to load user details.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-6">
      <Button
        variant="outline"
        onClick={handleBack}
        className="mb-4 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <UserDetail
        user={{
          id: user._id,
          profile: {
            name: user.profile?.name,
            phone: user.profile?.phone,
            avatarUrl: user.profile?.avatarUrl,
            address: user.profile?.address,
          },
          isEmailVerified: user.isEmailVerified,
        }}
        onBlock={handleBlock}
        loading={isLoading}
      />
    </div>
  );
};

export default UserDetailPage;

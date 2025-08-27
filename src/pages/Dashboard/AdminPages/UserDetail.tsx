import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface UserDetailProps {
  user: {
    id: string;
    profile: {
      name?: string | null;
      phone?: string | null;
      avatarUrl?: string | null;
      address?: string | null;
    };
    isEmailVerified: boolean;
  };
  onBlock: (id: string) => void;
  loading?: boolean;
}

export const UserDetail = ({ user, onBlock, loading }: UserDetailProps) => {
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex flex-col items-center text-center space-y-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.profile.avatarUrl ?? ""} alt="User avatar" />
          <AvatarFallback>{user.profile.name?.charAt(0) ?? "U"}</AvatarFallback>
        </Avatar>
        <CardTitle>{user.profile.name ?? "Not Provided"}</CardTitle>
        {user.isEmailVerified ? (
          <Badge className="bg-green-600">Verified Account</Badge>
        ) : (
          <Badge variant="destructive">Unverified</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2 text-left">
        <p>
          <strong>Phone:</strong> {user.profile.phone ?? "Not Provided"}
        </p>
        <p>
          <strong>Address:</strong> {user.profile.address ?? "Not Provided"}
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Block
          </Button>
          <Button>View</Button>{" "}
          {/* Consider removing or updating this button */}
        </div>
      </CardContent>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to block {user.profile.name ?? "this user"}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onBlock(user.id);
                setOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

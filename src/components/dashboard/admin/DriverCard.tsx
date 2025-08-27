/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useViewUserQuery } from "@/redux/features/admin/adminApi";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface DriverCardProps {
  driver: any;
  handleDriverAction: (
    id: string,
    action: "approve" | "suspend" | "reactivate"
  ) => void;
}

const DriverCard = ({ driver, handleDriverAction }: DriverCardProps) => {
  // If your endpoint returns the user object directly, this is correct:
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useViewUserQuery({
    userId: driver.user,
  });

  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">Loading user details...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6 text-red-600">
          Failed to load user: {JSON.stringify(error)}
        </CardContent>
      </Card>
    );
  }

  const driverName = user?.profile?.name || "Unknown Driver";
  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="font-semibold">{driverName}</h3>
              <Badge variant="default">{user?.role || "driver"}</Badge>
              <Badge variant={driver.approved ? "default" : "destructive"}>
                {driver.approved ? "Approved" : "Not Approved"}
              </Badge>
              <Badge variant={driver.suspended ? "destructive" : "default"}>
                {driver.suspended ? "Suspended" : "Active"}
              </Badge>
              <Badge variant={driver.available ? "default" : "secondary"}>
                {driver.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>{user?.email || "No email"}</div>
              <div>
                Vehicle:{" "}
                {driver.vehicle
                  ? `${driver.vehicle.model} (${driver.vehicle.licensePlate})`
                  : "No vehicle"}
              </div>
              <div>Earnings: ${driver.earnings}</div>
              <div>Joined: {createdDate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <Link to={`/dashboard/user-management/${user?._id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link> */}
            {!driver.approved && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsApproveDialogOpen(true)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            )}
            <Button
              variant={driver.suspended ? "default" : "destructive"}
              size="sm"
              onClick={() => setIsSuspendDialogOpen(true)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              {driver.suspended ? "Reactivate" : "Suspend"}
            </Button>
          </div>
        </div>
      </CardContent>

      {!driver.approved && (
        <AlertDialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve {driverName}?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDriverAction(driver._id, "approve");
                  setIsApproveDialogOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Yes, Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <AlertDialog
        open={isSuspendDialogOpen}
        onOpenChange={setIsSuspendDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {driver.suspended ? "Reactivate" : "Suspend"} {driverName}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDriverAction(
                  driver._id,
                  driver.suspended ? "reactivate" : "suspend"
                );
                setIsSuspendDialogOpen(false);
              }}
              className={
                driver.suspended
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              Yes, {driver.suspended ? "Reactivate" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default DriverCard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTroubleRideMutation } from "@/redux/features/auth/authApi";
import {
  useCancelRideMutation,
  useCurrentRideQuery,
} from "@/redux/features/rider/riderApi";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ActiveRide() {
  const { data: currentRide, isFetching: loadingCurrent } = useCurrentRideQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true, // fetch once when navigated here
      refetchOnFocus: false,
      refetchOnReconnect: false,
      pollingInterval: 10000, // stop auto refetch
    }
  );

  const [cancelRide, { isLoading: canceling }] = useCancelRideMutation();
  const [troubleRide, { isLoading: sendingSOS }] = useTroubleRideMutation();
  const [showSOSDialog, setShowSOSDialog] = useState(false);

  const handleCancel = async () => {
    if (!currentRide?._id) return;
    try {
      await cancelRide({ rideId: currentRide._id }).unwrap();
      toast.success("Ride canceled.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel ride.");
    }
  };

  const handleSOS = async () => {
    if (!currentRide?._id) return;
    try {
      await troubleRide({
        rideId: currentRide._id,
        message: "Emergency SOS activated",
        location: currentRide.pickup,
      }).unwrap();
      toast.success("SOS alert sent to admin!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send SOS alert.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Current Ride</h1>
        <p className="text-muted-foreground">
          Active ride status and quick actions
        </p>
      </div>

      {/* Current Ride Card */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Status</CardTitle>
          <CardDescription>
            {loadingCurrent
              ? "Loading current ride..."
              : currentRide
              ? "Active ride details"
              : "You have no active ride"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!currentRide && !loadingCurrent && (
            <p className="text-sm text-muted-foreground">
              No current ride. Please book one.
            </p>
          )}

          {currentRide && (
            <div className="space-y-2">
              <div className="flex flex-wrap text-sm gap-4">
                <div>
                  <span className="font-medium">Pickup:</span>{" "}
                  {currentRide.pickup.address}
                </div>
                <div>
                  <span className="font-medium">Destination:</span>{" "}
                  {currentRide.destination.address}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  {currentRide.status}
                </div>
                {currentRide.timestamps?.requested && (
                  <div className="text-xs text-muted-foreground">
                    Requested{" "}
                    {formatDistanceToNow(
                      new Date(currentRide.timestamps.requested),
                      { addSuffix: true }
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                {!["completed", "canceled"].includes(currentRide.status) && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={canceling}
                  >
                    {canceling ? "Canceling..." : "Cancel Ride"}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* SOS Button - Only show for accepted rides (not requested or completed) */}
          {/* {currentRide && !['requested', 'completed', 'canceled'].includes(currentRide.status) && (
            <div className="pt-4">
              <AlertDialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={sendingSOS}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {sendingSOS ? "Sending SOS..." : "Emergency SOS"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Emergency SOS</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you're in trouble with this ride? This will
                      send an emergency alert to the admin.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSOS}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Send SOS Alert
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )} */}

          {/* 🚨 SOS Button — Always visible, disabled until ride is accepted */}
          {currentRide && (
            <div className="pt-4">
              <AlertDialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={
                      sendingSOS ||
                      ["completed", "canceled"].includes(currentRide.status) ||
                      currentRide.status === "requested" // disable until accepted
                    }
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {sendingSOS ? "Sending SOS..." : "Emergency SOS"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Emergency SOS</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you’re in trouble with this ride? This will
                      send an emergency alert to the admin.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSOS}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Send SOS Alert
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

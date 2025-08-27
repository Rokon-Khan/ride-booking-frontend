/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  useDeleteRideAdminMutation,
  useUpdateRideStatusAdminMutation,
  useViewUserQuery,
} from "@/redux/features/admin/adminApi";
import { Eye, RefreshCcw, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export interface RideCardProps {
  ride: any;
  // Optional callback after destructive / status actions
  onAfterChange?: () => void;
  enableStatusChange?: boolean;
  enableDelete?: boolean;
}

type BadgeVariant =
  | "secondary"
  | "default"
  | "destructive"
  | "outline"
  | null
  | undefined;

const statusColorMap: Record<string, BadgeVariant> = {
  requested: "secondary",
  accepted: "default",
  picked_up: "default",
  in_transit: "default",
  completed: "default",
  canceled: "destructive",
};

const readableStatus = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const RideCard = ({
  ride,
  onAfterChange,
  enableDelete = true,
  enableStatusChange = true,
}: RideCardProps) => {
  // Fetch rider and driver users separately (each card is its own component -> OK).
  const {
    data: riderUserRaw,
    isLoading: riderLoading,
    isError: riderError,
  } = useViewUserQuery({ userId: ride.rider }, { skip: !ride?.rider });

  const {
    data: driverUserRaw,
    isLoading: driverLoading,
    isError: driverError,
  } = useViewUserQuery({ userId: ride?.driver }, { skip: !ride?.driver });

  // Your API sometimes wraps data in { data: user } depending on IResponse shape.
  const riderUser = (riderUserRaw as any)?.data || riderUserRaw;
  const driverUser = (driverUserRaw as any)?.data || driverUserRaw;

  console.log("Rider User:", riderUser);
  console.log("Driver User:", driverUser);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const [deleteRide, { isLoading: deleting }] = useDeleteRideAdminMutation();
  const [updateStatus, { isLoading: statusUpdating }] =
    useUpdateRideStatusAdminMutation();

  const currentStatus = ride.status;
  const timeline = ride.timestamps || {};

  const orderedTimelineKeys = useMemo(
    () =>
      [
        "requested",
        "accepted",
        "picked_up",
        "in_transit",
        "completed",
        "canceled",
      ].filter((k) => timeline[k]),
    [timeline]
  );

  const handleDelete = async () => {
    try {
      await deleteRide({ rideId: ride._id }).unwrap();
      setDeleteDialogOpen(false);
      onAfterChange?.();
    } catch (e) {
      console.error("Failed to delete ride", e);
    }
  };

  type NextStatus =
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "canceled";

  const possibleNextStatuses = (
    [
      "accepted",
      "picked_up",
      "in_transit",
      "completed",
      "canceled",
    ] as NextStatus[]
  ).filter((s) => s !== currentStatus);

  const handleStatusUpdate = async (newStatus: NextStatus) => {
    try {
      await updateStatus({
        rideId: ride._id,
        body: { status: newStatus },
      }).unwrap();
      setStatusDialogOpen(false);
      onAfterChange?.();
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const loading = riderLoading || driverLoading;
  const error = riderError || driverError;

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap gap-2 items-center">
              <h3 className="font-semibold text-lg">
                Ride #{ride._id.slice(-6)}
              </h3>
              <Badge variant={statusColorMap[currentStatus] || "secondary"}>
                {readableStatus(currentStatus)}
              </Badge>
              <Badge variant="outline">Fare: ${ride.fare}</Badge>
            </div>

            {loading && (
              <div className="text-sm text-muted-foreground">
                Loading users...
              </div>
            )}
            {error && (
              <div className="text-sm text-red-600">
                Failed to load rider or driver info.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Rider: </span>
                {riderUser?.profile?.name || "Unknown"}
                {riderUser?.email && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({riderUser?.email})
                  </span>
                )}
              </div>
              <div>
                <span className="font-medium text-foreground">Driver: </span>
                {driverUser?.profile?.name || "Unknown"}
                {driverUser?.email && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({driverUser.email})
                  </span>
                )}
              </div>
              <div>
                <span className="font-medium text-foreground">Pickup: </span>
                {ride.pickup?.address || "N/A"}
              </div>
              <div>
                <span className="font-medium text-foreground">
                  Destination:{" "}
                </span>
                {ride.destination?.address || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link to={`/dashboard/ride-management/${ride._id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
            {enableStatusChange && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setStatusDialogOpen(true)}
                disabled={statusUpdating}
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Status
              </Button>
            )}
            {enableDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Timeline */}
        {orderedTimelineKeys.length > 0 && (
          <div className="pt-2">
            <div className="text-xs font-medium mb-2 uppercase tracking-wide text-muted-foreground">
              Timeline
            </div>
            <div className="flex flex-wrap gap-2">
              {orderedTimelineKeys.map((k) => (
                <Badge
                  key={k}
                  variant={k === currentStatus ? "default" : "outline"}
                  className="text-xs"
                >
                  {readableStatus(k)}:{" "}
                  {new Date(timeline[k]).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete Ride #{ride._id.slice(-6)}?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Status Update Dialog */}
        <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Update Ride Status (current: {readableStatus(currentStatus)})
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {possibleNextStatuses.map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  disabled={statusUpdating}
                  onClick={() => handleStatusUpdate(s)}
                >
                  {readableStatus(s)}
                </Button>
              ))}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={statusUpdating}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default RideCard;

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
  useViewRideByIdQuery,
  useViewUserQuery,
} from "@/redux/features/admin/adminApi";
import { useMemo, useState } from "react";

interface RideDetailCardProps {
  rideId: string;
  onAfterChange?: () => void;
  showDelete?: boolean;
  showStatusChange?: boolean;
}

type BadgeVariant = "secondary" | "default" | "destructive" | "outline";
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

// Robustly extract the ride object from any shape
function extractRide(raw: any): any | undefined {
  if (!raw) return undefined;

  // Common shapes:
  // 1. { data: { _id, ... } }
  if (raw.data && typeof raw.data === "object" && raw.data._id) return raw.data;

  // 2. { data: { ride: { _id, ... } } }
  if (raw.data && raw.data.ride && raw.data.ride._id) return raw.data.ride;

  // 3. { ride: { _id, ... } }
  if (raw.ride && raw.ride._id) return raw.ride;

  // 4. Direct ride object
  if (raw._id) return raw;

  // 5. { data: something } but not sure if resolved yet
  return undefined;
}

// Normalize user hook usage (handles wrapper or raw)
const useUser = (rawId: any) => {
  const userId =
    typeof rawId === "string"
      ? rawId
      : rawId && typeof rawId === "object"
      ? rawId.user || rawId._id || rawId.id
      : undefined;

  const { data, isLoading, isError, error, refetch } = useViewUserQuery(
    { userId },
    { skip: !userId }
  );

  const user = (data as any)?.data || data;

  return { userId, user, isLoading, isError, error, refetch };
};

const RideDetailCard = ({
  rideId,
  onAfterChange,
  showDelete = true,
  showStatusChange = true,
}: RideDetailCardProps) => {
  const {
    data: rideRaw,
    isLoading,
    isError,
    error,
    refetch,
  } = useViewRideByIdQuery({ rideId });

  const ride = extractRide(rideRaw);

  // Fetch rider & driver users ONLY when we have ids
  const rider = useUser(ride?.rider);
  const driver = useUser(ride?.driver);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [updateStatus, { isLoading: statusUpdating }] =
    useUpdateRideStatusAdminMutation();
  const [deleteRide, { isLoading: deleting }] = useDeleteRideAdminMutation();

  const loadingUsers = rider.isLoading || driver.isLoading;

  const orderedTimelineKeys = useMemo(() => {
    const ts = ride?.timestamps || {};
    return [
      "requested",
      "accepted",
      "picked_up",
      "in_transit",
      "completed",
      "canceled",
    ].filter((k) => ts[k]);
  }, [ride]);

  type NextRideStatus =
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "canceled";
  const possibleNextStatuses = useMemo<NextRideStatus[]>(() => {
    if (!ride) return [];
    const all: NextRideStatus[] = [
      "accepted",
      "picked_up",
      "in_transit",
      "completed",
      "canceled",
    ];
    return all.filter((s) => s !== ride.status) as NextRideStatus[];
  }, [ride]);

  const handleStatus = async (newStatus: NextRideStatus) => {
    if (!ride) return;
    try {
      await updateStatus({
        rideId: ride._id,
        body: { status: newStatus },
      }).unwrap();
      setStatusDialogOpen(false);
      await refetch();
      onAfterChange?.();
    } catch (e) {
      console.error("Failed to update ride status", e);
    }
  };

  const handleDelete = async () => {
    if (!ride) return;
    try {
      await deleteRide({ rideId: ride._id }).unwrap();
      setDeleteDialogOpen(false);
      onAfterChange?.();
    } catch (e) {
      console.error("Failed to delete ride", e);
    }
  };

  // Loading state: wait until we either have a valid ride OR an error
  if (isLoading && !ride) {
    return (
      <Card>
        <CardContent className="p-6">Loading ride...</CardContent>
      </Card>
    );
  }

  if (isError || !ride) {
    return (
      <Card>
        <CardContent className="p-6 text-red-600 space-y-2">
          <div>Failed to load ride.</div>
          <details className="text-xs">
            <summary>Debug</summary>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify({ rideRaw, error }, null, 2)}
            </pre>
          </details>
        </CardContent>
      </Card>
    );
  }

  const riderName = rider.user?.profile?.name || "Unknown";
  const driverName = driver.user?.profile?.name || "Unknown";

  // If driver.user is missing repeatedly, backend is not returning a user id for ride.driver
  const driverDebugHint =
    !driver.user && driver.userId
      ? `(Attempted /users/${driver.userId})`
      : !driver.userId
      ? `(No usable driver user id; raw ride.driver: ${JSON.stringify(
          ride.driver
        )})`
      : "";

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold">
            Ride Detail #{(ride._id || "").slice(-6)}
          </h2>
          <Badge variant={statusColorMap[ride.status] || "secondary"}>
            {readableStatus(ride.status)}
          </Badge>
          <Badge variant="outline">Fare: ${ride.fare}</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div>
            <div className="font-medium mb-1">Pickup</div>
            <div className="text-muted-foreground">
              {ride.pickup?.address} (lat: {ride.pickup?.lat}, lng:{" "}
              {ride.pickup?.lng})
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Destination</div>
            <div className="text-muted-foreground">
              {ride.destination?.address} (lat: {ride.destination?.lat}, lng:{" "}
              {ride.destination?.lng})
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Rider</div>
            <div className="text-muted-foreground">
              {loadingUsers ? "Loading..." : riderName}
              {rider.user?.email && (
                <span className="ml-1 text-xs">({rider.user.email})</span>
              )}
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Driver</div>
            <div className="text-muted-foreground">
              {loadingUsers
                ? "Loading..."
                : driver.user
                ? driverName
                : driver.isError
                ? "Not found"
                : driverName}
              {driver.user?.email && (
                <span className="ml-1 text-xs">({driver.user.email})</span>
              )}
              {!driver.user && (
                <div className="text-[10px] opacity-70">{driverDebugHint}</div>
              )}
            </div>
          </div>
        </div>

        {orderedTimelineKeys.length > 0 && (
          <div>
            <div className="text-xs font-medium mb-2 uppercase tracking-wide text-muted-foreground">
              Timeline
            </div>
            <div className="flex flex-wrap gap-2">
              {orderedTimelineKeys.map((k) => (
                <Badge
                  key={k}
                  variant={k === ride.status ? "default" : "outline"}
                  className="text-xs"
                >
                  {readableStatus(k)}:{" "}
                  {new Date(ride.timestamps[k]).toLocaleString()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {showStatusChange && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setStatusDialogOpen(true)}
              disabled={statusUpdating}
            >
              Update Status
            </Button>
          )}
          {showDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={deleting}
            >
              Delete Ride
            </Button>
          )}
        </div>

        {/* Status Dialog */}
        <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Update Status (current: {readableStatus(ride.status)})
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {possibleNextStatuses.map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  disabled={statusUpdating}
                  onClick={() => handleStatus(s)}
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

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete Ride #{(ride._id || "").slice(-6)}?
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
      </CardContent>
    </Card>
  );
};

export default RideDetailCard;

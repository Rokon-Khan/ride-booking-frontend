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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTroubleRideMutation } from "@/redux/features/auth/authApi";
import {
  useAcceptRideMutation,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driverApi";
import type { IRide } from "@/types/common";
import {
  AlertTriangle,
  CheckCircle,
  Clock3,
  Loader2,
  Navigation,
  Phone,
  PlayCircle,
  Square,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface RideRequestCardProps {
  ride: IRide;
  isMine: boolean; // driver already assigned (or states != requested)
  isActive: boolean; // current active ride
  onAfterAction?: () => void; // refetch callback
}

const statusBadgeVariant: Record<string, any> = {
  requested: "secondary",
  accepted: "default",
  picked_up: "default",
  in_transit: "default",
  completed: "outline",
  canceled: "destructive",
};

const human = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const RideRequestCard = ({
  ride,
  isMine,
  isActive,
  onAfterAction,
}: RideRequestCardProps) => {
  const [acceptRide, { isLoading: accepting }] = useAcceptRideMutation();
  const [updateRideStatus, { isLoading: updating }] =
    useUpdateRideStatusMutation();
  const [troubleRide, { isLoading: sendingSOS }] = useTroubleRideMutation();

  const [expandingTimeline, setExpandingTimeline] = useState(false);
  const [showSOSDialog, setShowSOSDialog] = useState(false);

  const timelineKeys = useMemo(
    () =>
      (
        [
          "requested",
          "accepted",
          "picked_up",
          "in_transit",
          "completed",
          "canceled",
        ] as const
      ).filter((k) => ride.timestamps?.[k]),
    [ride.timestamps]
  );

  const possibleNext: string[] = useMemo(() => {
    switch (ride.status) {
      case "accepted":
        return ["picked_up", "canceled"];
      case "picked_up":
        return ["in_transit", "canceled"];
      case "in_transit":
        return ["completed", "canceled"];
      default:
        return [];
    }
  }, [ride.status]);

  const handleAccept = async () => {
    try {
      await acceptRide({ rideId: ride._id }).unwrap();
      toast.success("Ride accepted");
      onAfterAction?.();
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to accept ride");
    }
  };

  const handleAdvance = async (status: string) => {
    try {
      await updateRideStatus({
        rideId: ride._id,
        body: { status: status as any },
      }).unwrap();
      toast.success(`Ride marked ${human(status)}`);
      onAfterAction?.();
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update ride");
    }
  };

  const handleSOS = async () => {
    try {
      await troubleRide({
        rideId: ride._id,
        message: "Driver Emergency SOS activated",
        location: ride.pickup,
      }).unwrap();
      toast.success("SOS alert sent to admin!");
      setShowSOSDialog(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send SOS alert.");
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 space-y-3 bg-card/50",
        isActive && "border-primary shadow-sm"
      )}
    >
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-sm">Ride #{ride._id.slice(-6)}</h3>
          <Badge variant={statusBadgeVariant[ride.status] || "secondary"}>
            {human(ride.status)}
          </Badge>
          {isActive && (
            <Badge variant="outline" className="border-primary text-primary">
              Active
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            Fare: ${ride.fare?.toFixed(2) ?? "0.00"}
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Pickup: </span>
          {ride.pickup?.address || "N/A"}
        </div>
        <div>
          <span className="font-medium text-foreground">Destination: </span>
          {ride.destination?.address || "N/A"}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-1">
        {ride.status === "requested" && !isMine && (
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-success text-success-foreground"
            disabled={accepting}
          >
            {accepting && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
            Accept
          </Button>
        )}

        {isMine &&
          possibleNext.map((ns) => (
            <Button
              key={ns}
              size="sm"
              variant={ns === "canceled" ? "destructive" : "default"}
              onClick={() => handleAdvance(ns)}
              disabled={updating}
            >
              {updating && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
              {ns === "picked_up" && <PlayCircle className="h-4 w-4 mr-1" />}
              {ns === "in_transit" && <Navigation className="h-4 w-4 mr-1" />}
              {ns === "completed" && <CheckCircle className="h-4 w-4 mr-1" />}
              {ns === "canceled" && <Square className="h-4 w-4 mr-1" />}
              {human(ns)}
            </Button>
          ))}

        {isMine && (
          <Button size="sm" variant="outline">
            <Phone className="h-4 w-4 mr-1" /> Contact
          </Button>
        )}

        {/* Emergency SOS Button for active rides */}
        {isMine &&
          isActive &&
          !["completed", "canceled"].includes(ride.status) && (
            <AlertDialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={sendingSOS}
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {sendingSOS ? "Sending..." : "Emergency SOS"}
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
          )}
        {timelineKeys.length > 1 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpandingTimeline((p) => !p)}
          >
            <Clock3 className="h-4 w-4 mr-1" />
            {expandingTimeline ? "Hide Timeline" : "Timeline"}
          </Button>
        )}
      </div>

      {expandingTimeline && timelineKeys.length > 0 && (
        <div className="pt-2">
          <div className="flex flex-wrap gap-2">
            {timelineKeys.map((k) => (
              <Badge
                key={k}
                variant={k === ride.status ? "default" : "outline"}
                className="text-[10px]"
              >
                {human(k)}:{" "}
                {new Date(ride.timestamps![k]!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RideRequestCard;

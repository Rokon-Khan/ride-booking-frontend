// /* eslint-disable @typescript-eslint/no-explicit-any */

// // DriverDashboard.tsx
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   useAcceptRideMutation,
//   useAvailableRidesQuery,
//   useDriverAvailabilityQuery,
//   useDriverCurrentRideQuery,
//   useEarningsAggregateQuery,
//   useRejectRideMutation,
//   useUpdateRideStatusMutation,
// } from "@/redux/features/driver/driverApi";
// import {
//   Car,
//   CheckCircle,
//   Clock,
//   DollarSign,
//   Loader2,
//   MapPin,
//   Navigation,
//   Phone,
//   PlayCircle,
//   Square,
// } from "lucide-react";
// import { toast } from "sonner";

// export default function DashboardPage() {
//   const { data: availability } = useDriverAvailabilityQuery();
//   const isOnline = availability?.available ?? false;

//   const {
//     data: currentRideResp,
//     isLoading: currentRideLoading,
//     refetch: refetchCurrentRide,
//   } = useDriverCurrentRideQuery();

//   const { data: availableRidesResp, isLoading: availableRidesLoading } =
//     useAvailableRidesQuery(undefined, { skip: !isOnline });

//   const { data: earningsResp, isLoading: earningsLoading } =
//     useEarningsAggregateQuery();

//   const [acceptRide, { isLoading: accepting }] = useAcceptRideMutation();
//   const [rejectRide, { isLoading: rejecting }] = useRejectRideMutation();
//   const [updateStatus, { isLoading: updatingStatus }] =
//     useUpdateRideStatusMutation();

//   const currentRide = currentRideResp?.data || null;
//   const availableRides = availableRidesResp?.data || [];
//   const earnings = earningsResp?.data;

//   const handleAccept = async (rideId: string) => {
//     try {
//       await acceptRide({ rideId }).unwrap();
//       toast.success("Ride accepted");
//       refetchCurrentRide();
//     } catch (e: any) {
//       toast.error(e?.data?.message || "Failed to accept ride");
//     }
//   };

//   const handleReject = async (rideId: string) => {
//     try {
//       await rejectRide({ rideId }).unwrap();
//       toast.success("Ride rejected");
//     } catch (e: any) {
//       toast.error(e?.data?.message || "Failed to reject ride");
//     }
//   };

//   const progressRide = async (status: string) => {
//     if (!currentRide?._id) return;
//     try {
//       await updateStatus({
//         rideId: currentRide._id,
//         body: { status: status as any },
//       }).unwrap();
//       toast.success(`Ride marked ${status}`);
//       refetchCurrentRide();
//     } catch (e: any) {
//       toast.error(e?.data?.message || "Failed to update status");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Earnings & Stats */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4 flex items-center gap-3">
//             <DollarSign className="h-8 w-8 text-green-600" />
//             <div>
//               <p className="text-lg font-semibold">
//                 {earningsLoading
//                   ? "..."
//                   : earnings
//                   ? `$${earnings.earnings.toFixed(2)}`
//                   : "$0.00"}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 Total Earnings (Aggregate)
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 flex items-center gap-3">
//             <Car className="h-8 w-8 text-blue-600" />
//             <div>
//               <p className="text-lg font-semibold">
//                 {!isOnline
//                   ? "0"
//                   : availableRidesLoading
//                   ? "..."
//                   : availableRides.length.toString()}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 Available Ride Requests
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 flex items-center gap-3">
//             <Clock className="h-8 w-8 text-purple-600" />
//             <div>
//               <p className="text-lg font-semibold">
//                 {currentRideLoading
//                   ? "..."
//                   : currentRide
//                   ? "Active"
//                   : "No Active Ride"}
//               </p>
//               <p className="text-xs text-muted-foreground">Current Ride</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 flex items-center gap-3">
//             <Navigation className="h-8 w-8 text-orange-600" />
//             <div>
//               <p className="text-lg font-semibold">
//                 {isOnline ? "Receiving" : "Idle"}
//               </p>
//               <p className="text-xs text-muted-foreground">Dispatch</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Current Ride */}
//       {currentRide && (
//         <Card className="border-primary/40">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Car className="h-5 w-5" />
//               Active Ride
//               <Badge variant="secondary">{currentRide.status}</Badge>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2 text-sm">
//             <p className="flex items-center gap-2">
//               <MapPin className="h-4 w-4 text-green-600" />
//               <span>
//                 <strong>Pickup:</strong> {currentRide.pickup.address} (
//                 {currentRide.pickup.lat.toFixed(3)},
//                 {currentRide.pickup.lng.toFixed(3)})
//               </span>
//             </p>
//             <p className="flex items-center gap-2">
//               <MapPin className="h-4 w-4 text-red-600" />
//               <span>
//                 <strong>Destination:</strong> {currentRide.destination.address}{" "}
//                 ({currentRide.destination.lat.toFixed(3)},
//                 {currentRide.destination.lng.toFixed(3)})
//               </span>
//             </p>
//             {currentRide.fare && (
//               <p>
//                 <strong>Fare:</strong> ${currentRide.fare.toFixed(2)}
//               </p>
//             )}
//             <div className="flex flex-wrap gap-2 pt-2">
//               {currentRide.status === "accepted" && (
//                 <Button
//                   size="sm"
//                   onClick={() => progressRide("picked_up")}
//                   disabled={updatingStatus}
//                 >
//                   {updatingStatus && (
//                     <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                   )}
//                   <PlayCircle className="h-4 w-4 mr-1" /> Picked Up
//                 </Button>
//               )}
//               {currentRide.status === "picked_up" && (
//                 <Button
//                   size="sm"
//                   onClick={() => progressRide("in_transit")}
//                   disabled={updatingStatus}
//                 >
//                   {updatingStatus && (
//                     <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                   )}
//                   <Navigation className="h-4 w-4 mr-1" /> In Transit
//                 </Button>
//               )}
//               {currentRide.status === "in_transit" && (
//                 <Button
//                   size="sm"
//                   onClick={() => progressRide("completed")}
//                   className="bg-success text-success-foreground"
//                   disabled={updatingStatus}
//                 >
//                   {updatingStatus && (
//                     <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                   )}
//                   <CheckCircle className="h-4 w-4 mr-1" /> Complete
//                 </Button>
//               )}
//               {["accepted", "picked_up", "in_transit"].includes(
//                 currentRide.status
//               ) && (
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => progressRide("canceled")}
//                   disabled={updatingStatus}
//                 >
//                   {updatingStatus && (
//                     <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                   )}
//                   <Square className="h-4 w-4 mr-1" /> Cancel
//                 </Button>
//               )}
//               <Button size="sm" variant="outline">
//                 <Phone className="h-4 w-4 mr-1" /> Contact Rider
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Incoming (Available) Rides (only if online and none active) */}
//       {isOnline && !currentRide && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Incoming Ride Requests</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {availableRidesLoading && (
//               <div className="text-sm text-muted-foreground flex items-center gap-2">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Loading available rides...
//               </div>
//             )}
//             {!availableRidesLoading && availableRides.length === 0 && (
//               <p className="text-sm text-muted-foreground">
//                 No incoming requests right now.
//               </p>
//             )}
//             {availableRides.map((r) => (
//               <div
//                 key={r._id}
//                 className="border rounded-md p-4 flex flex-col gap-2"
//               >
//                 <div className="flex flex-wrap items-center gap-2">
//                   <Badge variant="outline">{r.status}</Badge>
//                   <span className="text-xs text-muted-foreground">
//                     ID: {r._id.slice(-6)}
//                   </span>
//                 </div>
//                 <p className="text-sm">
//                   <strong>Pickup:</strong> {r.pickup.address}
//                 </p>
//                 <p className="text-sm">
//                   <strong>Destination:</strong> {r.destination.address}
//                 </p>
//                 <div className="flex gap-2 pt-1">
//                   <Button
//                     size="sm"
//                     onClick={() => handleAccept(r._id)}
//                     disabled={accepting}
//                     className="bg-success text-success-foreground"
//                   >
//                     {accepting && (
//                       <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                     )}
//                     Accept
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     disabled={rejecting}
//                     onClick={() => handleReject(r._id)}
//                   >
//                     {rejecting && (
//                       <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                     )}
//                     Decline
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * DriverDashboard.tsx (fixed)

 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAcceptRideMutation,
  useAvailableRidesQuery,
  useDriverAvailabilityQuery,
  useDriverCurrentRideQuery,
  useEarningsAggregateQuery,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driverApi";
import type { IRide } from "@/types/common"; // adjust path if your common types differ
import {
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  PlayCircle,
  Square,
} from "lucide-react";
import { useCallback, type JSX } from "react";
import { toast } from "sonner";

export default function DriverDashboard() {
  // Availability (server authoritative)
  const { data: availability, isLoading: availabilityLoading } =
    useDriverAvailabilityQuery();
  const isOnline = availability?.available ?? false;

  // Current active ride (returns IResponse<IRide | null> from the hook) — unwrap to IRide | null
  const {
    data: currentRideResp,
    isLoading: currentRideLoading,
    refetch: refetchCurrentRide,
  } = useDriverCurrentRideQuery(undefined, {
    pollingInterval: 8000,
  });

  const currentRide: IRide | null = currentRideResp?.data ?? null;

  // Available rides – only query if online
  const {
    data: availableRides = [],
    isLoading: availableRidesLoading,
    refetch: refetchAvailableRides,
  } = useAvailableRidesQuery(undefined, {
    skip: !isOnline,
    pollingInterval: isOnline ? 8000 : 0,
  });

  // Earnings aggregate { total, rides }
  const { data: earningsResp, isLoading: earningsLoading } =
    useEarningsAggregateQuery(undefined, {
      pollingInterval: 30000,
    });

  const totalEarnings = earningsResp?.total ?? 0;

  const [acceptRide, { isLoading: accepting }] = useAcceptRideMutation();
  const [rejectRide, { isLoading: rejecting }] = useRejectRideMutation();
  const [updateStatus, { isLoading: updatingStatus }] =
    useUpdateRideStatusMutation();

  const handleAccept = useCallback(
    async (rideId: string) => {
      try {
        await acceptRide({ rideId }).unwrap();
        toast.success("Ride accepted");
        refetchCurrentRide();
        refetchAvailableRides();
      } catch (e: any) {
        toast.error(e?.data?.message || "Failed to accept ride");
      }
    },
    [acceptRide, refetchAvailableRides, refetchCurrentRide]
  );

  const handleReject = useCallback(
    async (rideId: string) => {
      try {
        await rejectRide({ rideId }).unwrap();
        toast.success("Ride rejected");
        refetchAvailableRides();
      } catch (e: any) {
        toast.error(e?.data?.message || "Failed to reject ride");
      }
    },
    [rejectRide, refetchAvailableRides]
  );

  const progressRide = useCallback(
    async (status: string) => {
      if (!currentRide?._id) return;
      try {
        await updateStatus({
          rideId: currentRide._id,
          body: { status: status as any },
        }).unwrap();
        toast.success(`Ride marked ${status}`);
        refetchCurrentRide();
      } catch (e: any) {
        toast.error(e?.data?.message || "Failed to update status");
      }
    },
    [currentRide?._id, updateStatus, refetchCurrentRide]
  );

  // Helper: conditionally render buttons for ride progression
  const renderRideProgressButtons = (ride: IRide) => {
    const buttons: JSX.Element[] = [];
    if (ride.status === "accepted") {
      buttons.push(
        <Button
          key="picked_up"
          size="sm"
          onClick={() => progressRide("picked_up")}
          disabled={updatingStatus}
        >
          {updatingStatus && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
          <PlayCircle className="h-4 w-4 mr-1" /> Picked Up
        </Button>
      );
    }
    if (ride.status === "picked_up") {
      buttons.push(
        <Button
          key="in_transit"
          size="sm"
          onClick={() => progressRide("in_transit")}
          disabled={updatingStatus}
        >
          {updatingStatus && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
          <Navigation className="h-4 w-4 mr-1" /> In Transit
        </Button>
      );
    }
    if (ride.status === "in_transit") {
      buttons.push(
        <Button
          key="completed"
          size="sm"
          onClick={() => progressRide("completed")}
          className="bg-success text-success-foreground"
          disabled={updatingStatus}
        >
          {updatingStatus && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
          <CheckCircle className="h-4 w-4 mr-1" /> Complete
        </Button>
      );
    }
    if (["accepted", "picked_up", "in_transit"].includes(ride.status)) {
      buttons.push(
        <Button
          key="canceled"
          size="sm"
          variant="destructive"
          onClick={() => progressRide("canceled")}
          disabled={updatingStatus}
        >
          {updatingStatus && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
          <Square className="h-4 w-4 mr-1" /> Cancel
        </Button>
      );
    }
    buttons.push(
      <Button key="contact" size="sm" variant="outline">
        <Phone className="h-4 w-4 mr-1" /> Contact Rider
      </Button>
    );
    return buttons;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-lg font-semibold">
                {earningsLoading ? "..." : `$${totalEarnings.toFixed(2)}`}
              </p>
              <p className="text-xs text-muted-foreground">
                Total Earnings (Aggregate)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-lg font-semibold">
                {availabilityLoading
                  ? "..."
                  : !isOnline
                  ? "0"
                  : availableRidesLoading
                  ? "..."
                  : availableRides.length}
              </p>
              <p className="text-xs text-muted-foreground">
                Available Ride Requests
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-lg font-semibold">
                {currentRideLoading
                  ? "..."
                  : currentRide
                  ? "Active"
                  : "No Active Ride"}
              </p>
              <p className="text-xs text-muted-foreground">Current Ride</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Navigation className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-lg font-semibold">
                {isOnline ? "Receiving" : "Idle"}
              </p>
              <p className="text-xs text-muted-foreground">Dispatch</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Ride */}
      {currentRide && (
        <Card className="border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Active Ride
              <Badge variant="secondary">{currentRide.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span>
                <strong>Pickup:</strong> {currentRide.pickup?.address} (
                {currentRide.pickup?.lat?.toFixed(3)},
                {currentRide.pickup?.lng?.toFixed(3)})
              </span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <span>
                <strong>Destination:</strong> {currentRide.destination?.address}{" "}
                ({currentRide.destination?.lat?.toFixed(3)},
                {currentRide.destination?.lng?.toFixed(3)})
              </span>
            </p>
            {typeof currentRide.fare === "number" && (
              <p>
                <strong>Fare:</strong> ${currentRide.fare.toFixed(2)}
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {renderRideProgressButtons(currentRide)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available (Incoming) Ride Requests */}
      {isOnline && !currentRide && (
        <Card>
          <CardHeader>
            <CardTitle>Incoming Ride Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableRidesLoading && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading available rides...
              </div>
            )}

            {!availableRidesLoading && availableRides.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No incoming requests right now.
              </p>
            )}

            {availableRides.map((r: any) => (
              <div
                key={r._id}
                className="border rounded-md p-4 flex flex-col gap-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{r.status}</Badge>
                  <span className="text-xs text-muted-foreground">
                    ID: {r._id.slice(-6)}
                  </span>
                </div>
                <p className="text-sm">
                  <strong>Pickup:</strong> {r.pickup?.address}
                </p>
                <p className="text-sm">
                  <strong>Destination:</strong> {r.destination?.address}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(r._id)}
                    disabled={accepting}
                    className="bg-success text-success-foreground"
                  >
                    {accepting && (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    )}
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={rejecting}
                    onClick={() => handleReject(r._id)}
                  >
                    {rejecting && (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    )}
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

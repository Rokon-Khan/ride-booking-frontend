// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   useDriverCurrentRideQuery,
//   useRejectRideMutation,
//   useUpdateRideStatusMutation,
// } from "@/redux/features/driver/driverApi";
// import { RefreshCcw, XCircle } from "lucide-react";
// import { useMemo, useState } from "react";

// type BadgeVariant =
//   | "secondary"
//   | "default"
//   | "destructive"
//   | "outline"
//   | null
//   | undefined;

// const statusColorMap: Record<string, BadgeVariant> = {
//   requested: "secondary",
//   accepted: "default",
//   picked_up: "default",
//   in_transit: "default",
//   completed: "default",
//   canceled: "destructive",
// };

// const readableStatus = (s: string) =>
//   s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// const DriverCurrentRide = () => {
//   const { data: currentRideResp, isLoading } =
//     useDriverCurrentRideQuery(undefined);
//   const ride = currentRideResp;

//   const [rejectRide, { isLoading: rejecting }] = useRejectRideMutation();
//   const [updateStatus, { isLoading: statusUpdating }] =
//     useUpdateRideStatusMutation();

//   const [statusDialogOpen, setStatusDialogOpen] = useState(false);

//   if (isLoading) {
//     return (
//       <Card>
//         <CardContent className="p-5">Loading current ride...</CardContent>
//       </Card>
//     );
//   }

//   if (!ride) {
//     return (
//       <Card>
//         <CardContent className="p-5 text-muted-foreground">
//           No active ride.
//         </CardContent>
//       </Card>
//     );
//   }

//   const currentStatus = ride.status;
//   const timeline = ride.timestamps || {};

//   const orderedTimelineKeys = useMemo(
//     () =>
//       ["requested", "accepted", "picked_up", "in_transit", "completed"].filter(
//         (k) => timeline[k]
//       ),
//     [timeline]
//   );

//   type NextStatus = "picked_up" | "in_transit" | "completed";

//   // driver can only move forward in the flow
//   const statusFlow: Record<string, NextStatus[]> = {
//     accepted: ["picked_up"],
//     picked_up: ["in_transit"],
//     in_transit: ["completed"],
//   };
//   const possibleNextStatuses = statusFlow[currentStatus] || [];

//   const handleReject = async () => {
//     try {
//       await rejectRide({ rideId: ride._id }).unwrap();
//     } catch (e) {
//       console.error("Failed to reject ride", e);
//     }
//   };

//   const handleStatusUpdate = async (newStatus: NextStatus) => {
//     try {
//       await updateStatus({
//         rideId: ride._id,
//         body: { status: newStatus },
//       }).unwrap();
//       setStatusDialogOpen(false);
//     } catch (e) {
//       console.error("Failed to update ride status", e);
//     }
//   };

//   return (
//     <Card>
//       <CardContent className="p-5 space-y-4">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//           <div className="space-y-2 flex-1">
//             <div className="flex flex-wrap gap-2 items-center">
//               <h3 className="font-semibold text-lg">
//                 Current Ride #{ride._id.slice(-6)}
//               </h3>
//               <Badge variant={statusColorMap[currentStatus] || "secondary"}>
//                 {readableStatus(currentStatus)}
//               </Badge>
//               <Badge variant="outline">Fare: ${ride.fare}</Badge>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
//               <div>
//                 <span className="font-medium text-foreground">Rider: </span>
//                 {(ride.rider as any)?.profile?.name ?? "Unknown"}
//               </div>
//               <div>
//                 <span className="font-medium text-foreground">Pickup: </span>
//                 {ride.pickup?.address || "N/A"}
//               </div>
//               <div>
//                 <span className="font-medium text-foreground">
//                   Destination:{" "}
//                 </span>
//                 {ride.destination?.address || "N/A"}
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {/* Reject only allowed if ride is still in accepted state */}
//             {currentStatus === "accepted" && (
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={handleReject}
//                 disabled={rejecting}
//               >
//                 <XCircle className="h-4 w-4 mr-2" />
//                 {rejecting ? "Rejecting..." : "Reject"}
//               </Button>
//             )}
//             {possibleNextStatuses.length > 0 && (
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => setStatusDialogOpen(true)}
//                 disabled={statusUpdating}
//               >
//                 <RefreshCcw className="h-4 w-4 mr-2" />
//                 Status
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Timeline */}
//         {orderedTimelineKeys.length > 0 && (
//           <div className="pt-2">
//             <div className="text-xs font-medium mb-2 uppercase tracking-wide text-muted-foreground">
//               Timeline
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {orderedTimelineKeys.map((k) => (
//                 <Badge
//                   key={k}
//                   variant={k === currentStatus ? "default" : "outline"}
//                   className="text-xs"
//                 >
//                   {readableStatus(k)}:{" "}
//                   {new Date(timeline[k]).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Status Update Dialog */}
//         <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Update Ride Status (current: {readableStatus(currentStatus)})
//               </AlertDialogTitle>
//             </AlertDialogHeader>
//             <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
//               {possibleNextStatuses.map((s) => (
//                 <Button
//                   key={s}
//                   variant="outline"
//                   size="sm"
//                   className="w-full justify-start"
//                   disabled={statusUpdating}
//                   onClick={() => handleStatusUpdate(s)}
//                 >
//                   {readableStatus(s)}
//                 </Button>
//               ))}
//             </div>
//             <AlertDialogFooter>
//               <AlertDialogCancel disabled={statusUpdating}>
//                 Close
//               </AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default DriverCurrentRide;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   useDriverCurrentRideQuery,
//   useRejectRideMutation,
//   useUpdateRideStatusMutation,
// } from "@/redux/features/driver/driverApi";
// import { RefreshCcw, XCircle } from "lucide-react";
// import { useMemo, useState } from "react";

// type BadgeVariant =
//   | "secondary"
//   | "default"
//   | "destructive"
//   | "outline"
//   | null
//   | undefined;

// const statusColorMap: Record<string, BadgeVariant> = {
//   requested: "secondary",
//   accepted: "default",
//   picked_up: "default",
//   in_transit: "default",
//   completed: "default",
//   canceled: "destructive",
// };

// const readableStatus = (s: string) =>
//   s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// const DriverCurrentRide = () => {
//   // Move all hooks to the top
//   const { data: currentRideResp, isLoading } =
//     useDriverCurrentRideQuery(undefined);
//   const [rejectRide, { isLoading: rejecting }] = useRejectRideMutation();
//   const [updateStatus, { isLoading: statusUpdating }] =
//     useUpdateRideStatusMutation();
//   const [statusDialogOpen, setStatusDialogOpen] = useState(false);

//   const ride = currentRideResp;

//   // Move useMemo after all hooks but before any returns
//   const orderedTimelineKeys = useMemo(
//     () =>
//       ["requested", "accepted", "picked_up", "in_transit", "completed"].filter(
//         (k) => ride?.timestamps?.[k]
//       ),
//     [ride?.timestamps]
//   );

//   // Early returns after all hooks
//   if (isLoading) {
//     return (
//       <Card>
//         <CardContent className="p-5">Loading current ride...</CardContent>
//       </Card>
//     );
//   }

//   if (!ride) {
//     return (
//       <Card>
//         <CardContent className="p-5 text-muted-foreground">
//           No active ride.
//         </CardContent>
//       </Card>
//     );
//   }

//   const currentStatus = ride.status;
//   const timeline = ride.timestamps || {};

//   type NextStatus = "picked_up" | "in_transit" | "completed";

//   const statusFlow: Record<string, NextStatus[]> = {
//     accepted: ["picked_up"],
//     picked_up: ["in_transit"],
//     in_transit: ["completed"],
//   };
//   const possibleNextStatuses = statusFlow[currentStatus] || [];

//   const handleReject = async () => {
//     try {
//       await rejectRide({ rideId: ride._id }).unwrap();
//     } catch (e) {
//       console.error("Failed to reject ride", e);
//     }
//   };

//   const handleStatusUpdate = async (newStatus: NextStatus) => {
//     try {
//       await updateStatus({
//         rideId: ride._id,
//         body: { status: newStatus },
//       }).unwrap();
//       setStatusDialogOpen(false);
//     } catch (e) {
//       console.error("Failed to update ride status", e);
//     }
//   };

//   return (
//     <Card>
//       <CardContent className="p-5 space-y-4">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//           <div className="space-y-2 flex-1">
//             <div className="flex flex-wrap gap-2 items-center">
//               <h3 className="font-semibold text-lg">
//                 Current Ride #{ride._id.slice(-6)}
//               </h3>
//               <Badge variant={statusColorMap[currentStatus] || "secondary"}>
//                 {readableStatus(currentStatus)}
//               </Badge>
//               <Badge variant="outline">Fare: ${ride.fare}</Badge>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
//               <div>
//                 <span className="font-medium text-foreground">Rider: </span>
//                 {(ride.rider as any)?.profile?.name ?? "Unknown"}
//               </div>
//               <div>
//                 <span className="font-medium text-foreground">Pickup: </span>
//                 {ride.pickup?.address || "N/A"}
//               </div>
//               <div>
//                 <span className="font-medium text-foreground">
//                   Destination:{" "}
//                 </span>
//                 {ride.destination?.address || "N/A"}
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {currentStatus === "accepted" && (
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={handleReject}
//                 disabled={rejecting}
//               >
//                 <XCircle className="h-4 w-4 mr-2" />
//                 {rejecting ? "Rejecting..." : "Reject"}
//               </Button>
//             )}
//             {possibleNextStatuses.length > 0 && (
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => setStatusDialogOpen(true)}
//                 disabled={statusUpdating}
//               >
//                 <RefreshCcw className="h-4 w-4 mr-2" />
//                 Status
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Timeline */}
//         {orderedTimelineKeys.length > 0 && (
//           <div className="pt-2">
//             <div className="text-xs font-medium mb-2 uppercase tracking-wide text-muted-foreground">
//               Timeline
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {orderedTimelineKeys.map((k) => (
//                 <Badge
//                   key={k}
//                   variant={k === currentStatus ? "default" : "outline"}
//                   className="text-xs"
//                 >
//                   {readableStatus(k)}:{" "}
//                   {new Date(timeline[k]).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Status Update Dialog */}
//         <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Update Ride Status (current: {readableStatus(currentStatus)})
//               </AlertDialogTitle>
//             </AlertDialogHeader>
//             <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
//               {possibleNextStatuses.map((s) => (
//                 <Button
//                   key={s}
//                   variant="outline"
//                   size="sm"
//                   className="w-full justify-start"
//                   disabled={statusUpdating}
//                   onClick={() => handleStatusUpdate(s)}
//                 >
//                   {readableStatus(s)}
//                 </Button>
//               ))}
//             </div>
//             <AlertDialogFooter>
//               <AlertDialogCancel disabled={statusUpdating}>
//                 Close
//               </AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default DriverCurrentRide;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
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
  useDriverCurrentRideQuery,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driverApi";
import { RefreshCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

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

const DriverCurrentRide = () => {
  // Hooks at the top
  const { data: currentRideResp, isLoading } =
    useDriverCurrentRideQuery(undefined);
  const [rejectRide, { isLoading: rejecting }] = useRejectRideMutation();
  const [updateStatus, { isLoading: statusUpdating }] =
    useUpdateRideStatusMutation();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const ride = currentRideResp?.data;

  const orderedTimelineKeys = useMemo(
    () =>
      ["requested", "accepted", "picked_up", "in_transit", "completed"].filter(
        (k) => ride?.timestamps?.[k]
      ),
    [ride?.timestamps]
  );

  // Early returns after all hooks
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-5">Loading current ride...</CardContent>
      </Card>
    );
  }

  // Check if ride or ride._id is undefined
  if (!ride || !ride._id) {
    return (
      <Card>
        <CardContent className="p-5 text-muted-foreground">
          No active ride.
        </CardContent>
      </Card>
    );
  }

  const currentStatus = ride.status;
  const timeline = ride.timestamps || {};

  type NextStatus = "picked_up" | "in_transit" | "completed";

  const statusFlow: Record<string, NextStatus[]> = {
    accepted: ["picked_up"],
    picked_up: ["in_transit"],
    in_transit: ["completed"],
  };
  const possibleNextStatuses = statusFlow[currentStatus] || [];

  const handleReject = async () => {
    try {
      await rejectRide({ rideId: ride._id }).unwrap();
    } catch (e) {
      console.error("Failed to reject ride", e);
    }
  };

  const handleStatusUpdate = async (newStatus: NextStatus) => {
    try {
      await updateStatus({
        rideId: ride._id,
        body: { status: newStatus },
      }).unwrap();
      setStatusDialogOpen(false);
    } catch (e) {
      console.error("Failed to update ride status", e);
    }
  };

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap gap-2 items-center">
              <h3 className="font-semibold text-lg">
                Current Ride #{ride._id?.slice(-6) || "N/A"}
              </h3>
              <Badge variant={statusColorMap[currentStatus] || "secondary"}>
                {readableStatus(currentStatus)}
              </Badge>
              <Badge variant="outline">Fare: ${ride.fare ?? "N/A"}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Rider: </span>
                {(ride.rider as any)?.profile?.name ?? "Unknown"}
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
            {currentStatus === "accepted" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReject}
                disabled={rejecting}
              >
                <XCircle className="h-4 w-4 mr-2" />
                {rejecting ? "Rejecting..." : "Reject"}
              </Button>
            )}
            {possibleNextStatuses.length > 0 && (
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

export default DriverCurrentRide;

/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // GoOnline.tsx
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   useDriverAvailabilityQuery,
//   useSetAvailabilityMutation,
// } from "@/redux/features/driver/driverApi";
// import { Activity, Loader2 } from "lucide-react";
// import { toast } from "sonner";

// export default function GoOnline() {
//   const { data: availabilityResp, isLoading: availabilityLoading } =
//     useDriverAvailabilityQuery();
//   const isOnline = availabilityResp?.available ?? false;

//   const [setAvailability, { isLoading: togglingAvailability }] =
//     useSetAvailabilityMutation();

//   const handleToggleOnline = async () => {
//     try {
//       const next = !isOnline;
//       await setAvailability({ available: next }).unwrap();
//       toast.success(
//         next ? "You are now available for rides" : "You are offline"
//       );
//     } catch (e: any) {
//       toast.error(e?.data?.message || "Failed to toggle availability");
//     }
//   };

//   if (availabilityLoading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <Card>
//       <CardContent className="p-5 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Activity
//             className={`h-6 w-6 ${
//               isOnline ? "text-green-500" : "text-muted-foreground"
//             }`}
//           />
//           <div>
//             <p className="font-medium">
//               Status:{" "}
//               <span
//                 className={`${
//                   isOnline ? "text-green-600" : "text-muted-foreground"
//                 }`}
//               >
//                 {isOnline ? "Online" : "Offline"}
//               </span>
//             </p>
//             <p className="text-xs text-muted-foreground">
//               Toggle availability to receive new ride requests.
//             </p>
//           </div>
//         </div>
//         <Button
//           variant={isOnline ? "destructive" : "default"}
//           onClick={handleToggleOnline}
//           disabled={togglingAvailability}
//         >
//           {togglingAvailability && (
//             <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//           )}
//           {isOnline ? "Go Offline" : "Go Online"}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDriverAvailabilityQuery,
  useSetAvailabilityMutation,
} from "@/redux/features/driver/driverApi";
import { Activity, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function GoOnline() {
  const {
    data: availabilityResp,
    isLoading: availabilityLoading,
    refetch,
  } = useDriverAvailabilityQuery();
  const isOnline = availabilityResp?.available ?? false;

  const [setAvailability, { isLoading: togglingAvailability }] =
    useSetAvailabilityMutation();

  const handleToggleOnline = async () => {
    try {
      const next = !isOnline;
      const response = await setAvailability({ available: next }).unwrap();
      const updatedStatus = response.driver?.available ?? next;
      toast.success(
        updatedStatus ? "You are now available for rides" : "You are offline"
      );
      refetch(); // Manually refetch to ensure UI updates with latest availability
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to toggle availability");
    }
  };

  if (availabilityLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Activity
            className={`h-6 w-6 ${
              isOnline ? "text-green-500" : "text-muted-foreground"
            }`}
          />
          <div>
            <p className="font-medium">
              Status:{" "}
              <span
                className={`${
                  isOnline ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Toggle availability to receive new ride requests.
            </p>
          </div>
        </div>
        <Button
          variant={isOnline ? "destructive" : "default"}
          onClick={handleToggleOnline}
          disabled={togglingAvailability}
        >
          {togglingAvailability && (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          )}
          {isOnline ? "Go Offline" : "Go Online"}
        </Button>
      </CardContent>
    </Card>
  );
}

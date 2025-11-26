// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   useCancelRideMutation,
//   useCurrentRideQuery,
//   useRequestRideMutation,
// } from "@/redux/features/rider/riderApi";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { formatDistanceToNow } from "date-fns";
// import { AlertTriangle, Car, MapPin, Navigation } from "lucide-react";
// import { useEffect } from "react";
// import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// // Zod schema matching backend
// const rideRequestSchema = z.object({
//   pickup: z.object({
//     lat: z.preprocess(
//       (v) => (v === "" || v === undefined ? 0 : Number(v)),
//       z.number()
//     ),
//     lng: z.preprocess(
//       (v) => (v === "" || v === undefined ? 0 : Number(v)),
//       z.number()
//     ),
//     address: z.string().min(3, "Pickup address is required").max(100),
//   }),
//   destination: z.object({
//     lat: z.preprocess(
//       (v) => (v === "" || v === undefined ? 0 : Number(v)),
//       z.number()
//     ),
//     lng: z.preprocess(
//       (v) => (v === "" || v === undefined ? 0 : Number(v)),
//       z.number()
//     ),
//     address: z.string().min(3, "Destination address is required").max(100),
//   }),
// });

// type RideRequestForm = z.infer<typeof rideRequestSchema>;

// interface BookRideProps {
//   onSelectRide?: (rideId: string) => void;
//   onSOS?: () => void;
// }

// const BookRide = ({ onSelectRide, onSOS }: BookRideProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<RideRequestForm>({
//     resolver: zodResolver(
//       rideRequestSchema
//     ) as unknown as Resolver<RideRequestForm>,
//     defaultValues: {
//       pickup: { address: "", lat: 0, lng: 0 },
//       destination: { address: "", lat: 0, lng: 0 },
//     },
//   });

//   const {
//     data: currentRide,
//     refetch: refetchCurrentRide,
//     isFetching: loadingCurrent,
//   } = useCurrentRideQuery();

//   const [requestRide, { isLoading: requesting }] = useRequestRideMutation();
//   const [cancelRide, { isLoading: canceling }] = useCancelRideMutation();

//   useEffect(() => {
//     // Optional: Poll current ride if active
//     let interval: number | undefined;
//     if (
//       currentRide &&
//       !["completed", "canceled"].includes(currentRide.status)
//     ) {
//       interval = window.setInterval(() => {
//         refetchCurrentRide();
//       }, 7000);
//     }
//     return () => {
//       if (interval !== undefined) {
//         clearInterval(interval);
//       }
//     };
//   }, [currentRide, refetchCurrentRide]);

//   const submit: SubmitHandler<RideRequestForm> = async (data) => {
//     try {
//       const ride = await requestRide(data).unwrap();
//       toast.success("Ride requested successfully.");
//       onSelectRide?.(ride._id);
//       reset();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to request ride.");
//     }
//   };

//   const handleCancel = async () => {
//     if (!currentRide?._id) return;
//     try {
//       await cancelRide({ rideId: currentRide._id }).unwrap();
//       toast.success("Ride canceled.");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to cancel ride.");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold mb-2">Book Your Ride</h1>
//         <p className="text-muted-foreground">
//           Find a driver and get to your destination safely
//         </p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Where are you going?</CardTitle>
//           <CardDescription>
//             Enter at least the pickup and destination addresses. Coordinates are
//             optional.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form onSubmit={handleSubmit(submit)} className="space-y-4">
//             {/* Pickup */}
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="space-y-2 md:col-span-3">
//                 <Label htmlFor="pickup_address">Pickup Address</Label>
//                 <div className="relative">
//                   <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="pickup_address"
//                     placeholder="Pickup address"
//                     {...register("pickup.address")}
//                     className="pl-10"
//                   />
//                 </div>
//                 {errors.pickup?.address && (
//                   <p className="text-xs text-red-500">
//                     {errors.pickup.address.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="pickup_lat">Pickup Lat (optional)</Label>
//                 <Input
//                   id="pickup_lat"
//                   placeholder="e.g. 23.1641"
//                   type="number"
//                   step="any"
//                   {...register("pickup.lat")}
//                 />
//                 {errors.pickup?.lat && (
//                   <p className="text-xs text-red-500">
//                     {errors.pickup.lat.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="pickup_lng">Pickup Lng (optional)</Label>
//                 <Input
//                   id="pickup_lng"
//                   placeholder="e.g. 89.2065"
//                   type="number"
//                   step="any"
//                   {...register("pickup.lng")}
//                 />
//                 {errors.pickup?.lng && (
//                   <p className="text-xs text-red-500">
//                     {errors.pickup.lng.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Destination */}
//             <div className="grid md:grid-cols-3 gap-4 pt-2">
//               <div className="space-y-2 md:col-span-3">
//                 <Label htmlFor="destination_address">Destination Address</Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="destination_address"
//                     placeholder="Destination address"
//                     {...register("destination.address")}
//                     className="pl-10"
//                   />
//                 </div>
//                 {errors.destination?.address && (
//                   <p className="text-xs text-red-500">
//                     {errors.destination.address.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="destination_lat">
//                   Destination Lat (optional)
//                 </Label>
//                 <Input
//                   id="destination_lat"
//                   placeholder="e.g. 23.545"
//                   type="number"
//                   step="any"
//                   {...register("destination.lat")}
//                 />
//                 {errors.destination?.lat && (
//                   <p className="text-xs text-red-500">
//                     {errors.destination.lat.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label htmlFor="destination_lng">
//                   Destination Lng (optional)
//                 </Label>
//                 <Input
//                   id="destination_lng"
//                   placeholder="e.g. 89.1726"
//                   type="number"
//                   step="any"
//                   {...register("destination.lng")}
//                 />
//                 {errors.destination?.lng && (
//                   <p className="text-xs text-red-500">
//                     {errors.destination.lng.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={requesting}
//               className="w-full btn-hero"
//               size="lg"
//             >
//               <Car className="h-5 w-5 mr-2" />
//               {requesting ? "Requesting..." : "Request Ride"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Current Ride */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Current Ride</CardTitle>
//           <CardDescription>
//             {loadingCurrent
//               ? "Loading current ride..."
//               : currentRide
//               ? "Active ride details"
//               : "You have no active ride"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {!currentRide && !loadingCurrent && (
//             <p className="text-sm text-muted-foreground">
//               No current ride. Request one above.
//             </p>
//           )}
//           {currentRide && (
//             <div className="space-y-2">
//               <div className="flex flex-wrap text-sm gap-4">
//                 <div>
//                   <span className="font-medium">Pickup:</span>{" "}
//                   {currentRide.pickup.address}
//                 </div>
//                 <div>
//                   <span className="font-medium">Destination:</span>{" "}
//                   {currentRide.destination.address}
//                 </div>
//                 <div>
//                   <span className="font-medium">Status:</span>{" "}
//                   {currentRide.status}
//                 </div>
//                 {currentRide.timestamps?.requested && (
//                   <div className="text-xs text-muted-foreground">
//                     Requested{" "}
//                     {formatDistanceToNow(
//                       new Date(currentRide.timestamps.requested),
//                       { addSuffix: true }
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => onSelectRide?.(currentRide._id)}
//                 >
//                   View Details
//                 </Button>
//                 {["completed", "canceled"].includes(
//                   currentRide.status
//                 ) ? null : (
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={handleCancel}
//                     disabled={canceling}
//                   >
//                     {canceling ? "Canceling..." : "Cancel Ride"}
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="pt-4">
//             <Button
//               variant="secondary"
//               size="sm"
//               onClick={onSOS}
//               className="btn-sos"
//             >
//               <AlertTriangle className="h-4 w-4 mr-2" />
//               SOS
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BookRide;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequestRideMutation } from "@/redux/features/rider/riderApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { Car, MapPin, Navigation } from "lucide-react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema matching backend
const rideRequestSchema = z.object({
  pickup: z.object({
    lat: z.preprocess(
      (v) => (v === "" || v === undefined ? 0 : Number(v)),
      z.number().refine((val) => val !== 0, "Pickup coordinates required")
    ),
    lng: z.preprocess(
      (v) => (v === "" || v === undefined ? 0 : Number(v)),
      z.number().refine((val) => val !== 0, "Pickup coordinates required")
    ),
    address: z.string().min(3, "Pickup address is required").max(100),
  }),
  destination: z.object({
    lat: z.preprocess(
      (v) => (v === "" || v === undefined ? 0 : Number(v)),
      z.number().refine((val) => val !== 0, "Destination coordinates required")
    ),
    lng: z.preprocess(
      (v) => (v === "" || v === undefined ? 0 : Number(v)),
      z.number().refine((val) => val !== 0, "Destination coordinates required")
    ),
    address: z.string().min(3, "Destination address is required").max(100),
  }),
});

type RideRequestForm = z.infer<typeof rideRequestSchema>;

interface BookRideProps {
  onSelectRide?: (rideId: string) => void;
  onSOS?: () => void;
}

const BookRide = ({ onSelectRide }: BookRideProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RideRequestForm>({
    resolver: zodResolver(
      rideRequestSchema
    ) as unknown as Resolver<RideRequestForm>,
    defaultValues: {
      pickup: { address: "", lat: 0, lng: 0 },
      destination: { address: "", lat: 0, lng: 0 },
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const hasValidCoordinates =
    watchedValues.pickup.lat !== 0 &&
    watchedValues.pickup.lng !== 0 &&
    watchedValues.destination.lat !== 0 &&
    watchedValues.destination.lng !== 0;

  const [requestRide, { isLoading: requesting }] = useRequestRideMutation();
  // const [cancelRide, { isLoading: canceling }] = useCancelRideMutation();
  const navigate = useNavigate();

  // 🔑 OpenStreetMap Geocoding
  const fetchCoordinates = async (
    address: string,
    type: "pickup" | "destination"
  ) => {
    if (!address.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (!data) return <>Loading...</>;
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };

        if (type === "pickup") {
          setValue("pickup.lat", coords.lat, { shouldValidate: true });
          setValue("pickup.lng", coords.lng, { shouldValidate: true });
        } else {
          setValue("destination.lat", coords.lat, { shouldValidate: true });
          setValue("destination.lng", coords.lng, { shouldValidate: true });
        }
      } else {
        toast.error(`No coordinates found for ${address}`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const submit: SubmitHandler<RideRequestForm> = async (data) => {
    try {
      const ride = await requestRide(data).unwrap();
      toast.success("Ride requested successfully.");
      onSelectRide?.(ride._id);
      reset();
      navigate(`/dashboard/active-ride`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to request ride.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Book Your Ride</h1>
        <p className="text-muted-foreground">
          Find a driver and get to your destination safely
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Where are you going?</CardTitle>
          <CardDescription>
            Enter at least the pickup and destination addresses. Coordinates
            will be auto-filled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {/* Pickup Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup_address" className="text-sm font-medium">
                  Pickup Address *
                </Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pickup_address"
                    placeholder="Enter pickup address"
                    {...register("pickup.address")}
                    onBlur={(e) => fetchCoordinates(e.target.value, "pickup")}
                    className="pl-10"
                  />
                </div>
                {errors.pickup?.address && (
                  <p className="text-xs text-red-500">
                    {errors.pickup.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="pickup_lat"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Latitude (auto-filled)
                  </Label>
                  <Input
                    id="pickup_lat"
                    type="number"
                    step="any"
                    {...register("pickup.lat")}
                    readOnly
                    className="bg-muted/50"
                    placeholder="0.000000"
                  />
                  {errors.pickup?.lat && (
                    <p className="text-xs text-red-500">
                      {errors.pickup.lat.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="pickup_lng"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Longitude (auto-filled)
                  </Label>
                  <Input
                    id="pickup_lng"
                    type="number"
                    step="any"
                    {...register("pickup.lng")}
                    readOnly
                    className="bg-muted/50"
                    placeholder="0.000000"
                  />
                  {errors.pickup?.lng && (
                    <p className="text-xs text-red-500">
                      {errors.pickup.lng.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Destination Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="destination_address"
                  className="text-sm font-medium"
                >
                  Destination Address *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destination_address"
                    placeholder="Enter destination address"
                    {...register("destination.address")}
                    onBlur={(e) =>
                      fetchCoordinates(e.target.value, "destination")
                    }
                    className="pl-10"
                  />
                </div>
                {errors.destination?.address && (
                  <p className="text-xs text-red-500">
                    {errors.destination.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="destination_lat"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Latitude (auto-filled)
                  </Label>
                  <Input
                    id="destination_lat"
                    type="number"
                    step="any"
                    {...register("destination.lat")}
                    readOnly
                    className="bg-muted/50"
                    placeholder="0.000000"
                  />
                  {errors.destination?.lat && (
                    <p className="text-xs text-red-500">
                      {errors.destination.lat.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="destination_lng"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Longitude (auto-filled)
                  </Label>
                  <Input
                    id="destination_lng"
                    type="number"
                    step="any"
                    {...register("destination.lng")}
                    readOnly
                    className="bg-muted/50"
                    placeholder="0.000000"
                  />
                  {errors.destination?.lng && (
                    <p className="text-xs text-red-500">
                      {errors.destination.lng.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {!hasValidCoordinates && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-sm text-amber-800">
                  Please enter valid addresses to auto-fill coordinates before
                  requesting a ride.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={requesting || !hasValidCoordinates}
              className="w-full btn-hero"
              size="lg"
            >
              <Car className="h-5 w-5 mr-2" />
              {requesting ? "Requesting..." : "Request Ride"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookRide;

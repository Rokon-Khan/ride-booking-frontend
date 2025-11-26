// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useUserInfoQuery } from "@/redux/features/auth/authApi";
// import { useDriverRideHistoryQuery } from "@/redux/features/driver/driverApi";
// import { useRideHistoryQuery } from "@/redux/features/rider/riderApi";
// import {
//   AlertCircle,
//   ArrowLeft,
//   Calendar,
//   Car,
//   Clock,
//   CreditCard,
//   MapPin,
//   Navigation,
//   Phone,
//   User,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router";

// const statusColors: Record<string, string> = {
//   completed: "bg-green-500 hover:bg-green-600 text-white",
//   canceled: "bg-red-500 hover:bg-red-600 text-white",
//   pending: "bg-yellow-500 hover:bg-yellow-600 text-black",
//   ongoing: "bg-blue-500 hover:bg-blue-600 text-white",
// };

// export default function RideHistoryDetail() {
//   const { id: rideId } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { data: user } = useUserInfoQuery(undefined);

//   // Use appropriate API based on user role
//   const {
//     data: riderRides = [],
//     isLoading: riderLoading,
//     isError: riderError,
//   } = useRideHistoryQuery(undefined, {
//     skip: user?.role !== "rider",
//   });

//   const {
//     data: driverRides = [],
//     isLoading: driverLoading,
//     isError: driverError,
//   } = useDriverRideHistoryQuery(undefined, {
//     skip: user?.role !== "driver",
//   });

//   const rides = user?.role === "rider" ? riderRides : driverRides;
//   const isLoading = user?.role === "rider" ? riderLoading : driverLoading;
//   const isError = user?.role === "rider" ? riderError : driverError;

//   // Find the specific ride
//   const ride = rides.find((r: any) => r._id === rideId);

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold">Ride Details</h1>
//         </div>

//         <Card>
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <Skeleton className="h-6 w-3/4" />
//               <Skeleton className="h-6 w-20 rounded-full" />
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="space-y-2">
//                 <Skeleton className="h-5 w-1/4" />
//                 <Skeleton className="h-4 w-3/4" />
//                 <Skeleton className="h-4 w-2/3" />
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (isError || !ride) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold">Ride Details</h1>
//         </div>

//         <Alert variant="destructive">
//           <AlertCircle className="h-5 w-5" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             Failed to load ride details. The ride may not exist or there was a
//             network error.
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-4">
//         <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>
//         <h1 className="text-3xl font-bold">Ride Details</h1>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//             <div className="flex items-center">
//               <Navigation className="h-5 w-5 text-primary mr-2" />
//               <span className="text-xl font-semibold">
//                 {ride.pickup.address} → {ride.destination.address}
//               </span>
//             </div>
//             <Badge
//               className={`${
//                 statusColors[ride.status] || "bg-muted"
//               } flex items-center py-1 px-3`}
//             >
//               {ride.status?.charAt(0).toUpperCase() + ride.status?.slice(1)}
//             </Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Route Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-2 border-dashed border-muted">
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-lg">
//                   <MapPin className="h-5 w-5 text-green-600 mr-2" />
//                   Pickup Location
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="font-medium">{ride.pickup.address}</p>
//                 <p className="text-sm text-muted-foreground">
//                   Lat: {ride.pickup.lat}, Lng: {ride.pickup.lng}
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-2 border-dashed border-muted">
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-lg">
//                   <MapPin className="h-5 w-5 text-red-600 mr-2" />
//                   Destination
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="font-medium">{ride.destination.address}</p>
//                 <p className="text-sm text-muted-foreground">
//                   Lat: {ride.destination.lat}, Lng: {ride.destination.lng}
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Rider and Driver Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-lg">
//                   <User className="h-5 w-5 text-blue-600 mr-2" />
//                   Rider Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div>
//                   <p className="font-medium">{ride.rider.profile.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {ride.rider.email}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone className="h-4 w-4 text-muted-foreground mr-2" />
//                   <span className="text-sm">{ride.rider.profile.phone}</span>
//                 </div>
//                 {ride.rider.profile.address && (
//                   <div className="flex items-start">
//                     <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
//                     <span className="text-sm">
//                       {ride.rider.profile.address}
//                     </span>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-lg">
//                   <Car className="h-5 w-5 text-green-600 mr-2" />
//                   Driver Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div>
//                   <p className="font-medium">{ride.driver.user.profile.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {ride.driver.user.email}
//                   </p>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone className="h-4 w-4 text-muted-foreground mr-2" />
//                   <span className="text-sm">
//                     {ride.driver.user.profile.phone}
//                   </span>
//                 </div>
//                 {ride.driver.user.profile.address && (
//                   <div className="flex items-start">
//                     <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
//                     <span className="text-sm">
//                       {ride.driver.user.profile.address}
//                     </span>
//                   </div>
//                 )}
//                 {ride.driver.vehicle && (
//                   <div className="flex items-center">
//                     <Car className="h-4 w-4 text-muted-foreground mr-2" />
//                     <span className="text-sm">
//                       {ride.driver.vehicle.model} -{" "}
//                       {ride.driver.vehicle.licensePlate}
//                     </span>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Fare and Timeline */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-lg">
//                   <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
//                   {user?.role === "driver" ? "Earnings" : "Payment"} Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-baseline">
//                   <span className="text-3xl font-bold text-primary">
//                     ${ride.fare}
//                   </span>
//                   <span className="text-sm text-muted-foreground ml-2">
//                     {user?.role === "driver" ? "earned" : "total fare"}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-lg">
//                   <Clock className="h-5 w-5 text-purple-600 mr-2" />
//                   Ride Timeline
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {Object.entries(ride.timestamps || {}).map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex items-center justify-between"
//                     >
//                       <Badge variant="outline" className="capitalize">
//                         <Calendar className="h-3 w-3 mr-1" />
//                         {key.replace(/([A-Z])/g, " $1").toLowerCase()}
//                       </Badge>
//                       <span className="text-sm text-muted-foreground">
//                         {new Date(
//                           value as string | number | Date
//                         ).toLocaleString()}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { useRideDetailsQuery } from "@/redux/features/rider/riderApi"; // ✅ new import
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Car,
  Clock,
  CreditCard,
  MapPin,
  Navigation,
  Phone,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

const statusColors: Record<string, string> = {
  completed: "bg-green-500 hover:bg-green-600 text-white",
  canceled: "bg-red-500 hover:bg-red-600 text-white",
  pending: "bg-yellow-500 hover:bg-yellow-600 text-black",
  ongoing: "bg-blue-500 hover:bg-blue-600 text-white",
};

export default function RideHistoryDetail() {
  const { id: rideId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user } = useUserInfoQuery(undefined);

  // ✅ Fetch the specific ride details via RTK Query
  const {
    data: ride,
    isLoading,
    isError,
  } = useRideDetailsQuery({ rideId: rideId as string }, { skip: !rideId });

  // 🕑 Loading State
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Ride Details</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ⚠️ Error / Not Found
  if (isError || !ride) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Ride Details</h1>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load ride details. The ride may not exist or there was a
            network error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // ✅ Render Ride Details (same as before)
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Ride Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center">
              <Navigation className="h-5 w-5 text-primary mr-2" />
              <span className="text-xl font-semibold">
                {ride.pickup.address} → {ride.destination.address}
              </span>
            </div>
            <Badge
              className={`${
                statusColors[ride.status] || "bg-muted"
              } flex items-center py-1 px-3`}
            >
              {ride.status?.charAt(0).toUpperCase() + ride.status?.slice(1)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pickup & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-dashed border-muted">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  Pickup Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{ride.pickup.address}</p>
                <p className="text-sm text-muted-foreground">
                  Lat: {ride.pickup.lat}, Lng: {ride.pickup.lng}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-muted">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 text-red-600 mr-2" />
                  Destination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{ride.destination.address}</p>
                <p className="text-sm text-muted-foreground">
                  Lat: {ride.destination.lat}, Lng: {ride.destination.lng}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Rider & Driver Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  Rider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{ride?.rider?.profile?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {ride?.rider?.email}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">{ride?.rider?.profile?.phone}</span>
                </div>
                {ride?.rider?.profile?.address && (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <span className="text-sm">
                      {ride?.rider?.profile?.address}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Car className="h-5 w-5 text-green-600 mr-2" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">
                    {ride?.driver?.user?.profile?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {ride?.driver?.user?.email}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    {ride?.driver?.user?.profile?.phone}
                  </span>
                </div>
                {ride?.driver?.user?.profile?.address && (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <span className="text-sm">
                      {ride?.driver?.user?.profile?.address}
                    </span>
                  </div>
                )}
                {ride?.driver?.vehicle && (
                  <div className="flex items-center">
                    <Car className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">
                      {ride?.driver?.vehicle?.model} -{" "}
                      {ride?.driver?.vehicle?.licensePlate}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Fare & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  {user?.role === "driver" ? "Earnings" : "Payment"} Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    ${ride.fare}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {user?.role === "driver" ? "earned" : "total fare"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 text-purple-600 mr-2" />
                  Ride Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(ride.timestamps || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <Badge variant="outline" className="capitalize">
                        <Calendar className="h-3 w-3 mr-1" />
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(value as string).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import RideDetailCard from "@/components/dashboard/admin/RideDetailCard";
import { useParams } from "react-router";

const RideDetailPage = () => {
  const { rideId } = useParams<{ rideId: string }>();
  if (!rideId) {
    return <div className="p-6 text-red-600">Ride ID missing in URL.</div>;
  }
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ride Detail</h1>
      <RideDetailCard rideId={rideId} />
    </div>
  );
};

export default RideDetailPage;

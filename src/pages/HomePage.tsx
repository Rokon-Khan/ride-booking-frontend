import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Welcome to the Ride Booking App
      </h1>
      <p className="text-lg text-center">Book your ride easily and quickly.</p>
      <Button variant="outline">Get Started</Button>
    </div>
  );
}

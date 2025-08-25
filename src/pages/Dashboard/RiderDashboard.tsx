import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Bell,
  Car,
  Clock,
  CreditCard,
  LogOut,
  MapPin,
  Navigation,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const RiderDashboard = () => {
  const [activeTab, setActiveTab] = useState("book-ride");
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    rideType: "standard",
  });

  const recentRides = [
    {
      id: "1",
      driver: "John Smith",
      pickup: "Downtown Plaza",
      destination: "Airport Terminal",
      fare: "$25.50",
      date: "2024-01-15",
      status: "completed",
      rating: 5,
    },
    {
      id: "2",
      driver: "Sarah Johnson",
      pickup: "Mall Center",
      destination: "Home",
      fare: "$18.00",
      date: "2024-01-14",
      status: "completed",
      rating: 4,
    },
    {
      id: "3",
      driver: "Mike Wilson",
      pickup: "Office Building",
      destination: "Restaurant",
      fare: "$12.75",
      date: "2024-01-13",
      status: "cancelled",
      rating: null,
    },
  ];

  const handleBookRide = () => {
    if (!bookingData.pickup || !bookingData.destination) {
      toast.error("Missing Information");
      return;
    }

    toast.success("Finding Drivers Searching for available drivers nearby...");

    // Simulate finding driver
    setTimeout(() => {
      toast.success(
        "Driver Found! John Doe will arrive in 3 minutes. Honda Civic - ABC123"
      );
    }, 2000);
  };

  const handleSOSAlert = () => {
    toast.warning(
      "SOS Alert Sent. Emergency services have been notified. Stay safe!"
    );
  };

  const handleLogout = () => {
    toast.success("Logged Out. You have been successfully logged out.");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-medium">
        <div className="container-width py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8" />
                <span className="text-xl font-bold">RideShare Pro</span>
              </Link>
              <Badge variant="secondary" className="ml-4">
                Rider
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:text-primary-foreground hover:bg-white/10"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-primary-foreground hover:text-primary-foreground hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-width py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <Button
                variant={activeTab === "book-ride" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("book-ride")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Book a Ride
              </Button>
              <Button
                variant={activeTab === "ride-history" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("ride-history")}
              >
                <Clock className="h-4 w-4 mr-2" />
                Ride History
              </Button>
              <Button
                variant={activeTab === "payments" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("payments")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
            </nav>

            {/* SOS Button */}
            <div className="mt-8">
              <Button
                onClick={handleSOSAlert}
                className="w-full btn-sos"
                size="lg"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency SOS
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Book a Ride Tab */}
            {activeTab === "book-ride" && (
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
                      Enter your pickup and destination locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="relative">
                        <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="pickup"
                          placeholder="Enter pickup location"
                          value={bookingData.pickup}
                          onChange={(e) =>
                            setBookingData((prev) => ({
                              ...prev,
                              pickup: e.target.value,
                            }))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="destination"
                          placeholder="Enter destination"
                          value={bookingData.destination}
                          onChange={(e) =>
                            setBookingData((prev) => ({
                              ...prev,
                              destination: e.target.value,
                            }))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rideType">Ride Type</Label>
                      <Select
                        onValueChange={(value) =>
                          setBookingData((prev) => ({
                            ...prev,
                            rideType: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ride type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard - $12-18
                          </SelectItem>
                          <SelectItem value="premium">
                            Premium - $18-25
                          </SelectItem>
                          <SelectItem value="luxury">
                            Luxury - $25-35
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleBookRide}
                      className="w-full btn-hero"
                      size="lg"
                    >
                      <Car className="h-5 w-5 mr-2" />
                      Find Driver
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Ride History Tab */}
            {activeTab === "ride-history" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Ride History</h1>
                  <p className="text-muted-foreground">
                    View your past rides and ratings
                  </p>
                </div>

                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <Card key={ride.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">
                                Driver: {ride.driver}
                              </h3>
                              <Badge
                                variant={
                                  ride.status === "completed"
                                    ? "default"
                                    : ride.status === "cancelled"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {ride.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>
                                {ride.pickup} → {ride.destination}
                              </div>
                              <div>{ride.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              {ride.fare}
                            </div>
                            {ride.rating && (
                              <div className="flex items-center mt-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < ride.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs content */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Payment Methods</h1>
                  <p className="text-muted-foreground">
                    Manage your payment options
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Payment methods management coming soon...
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                  <p className="text-muted-foreground">
                    Update your personal information
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Profile settings coming soon...
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;

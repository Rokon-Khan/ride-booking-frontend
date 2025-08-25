import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  Car,
  Clock,
  DollarSign,
  LogOut,
  Navigation,
  Phone,
  Star,
  ToggleLeft,
  ToggleRight,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

// import { useToast } from '@/hooks/use-toast';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOnline, setIsOnline] = useState(false);
  type Ride = {
    rider: string;
    pickup: string;
    destination: string;
    fare: string;
  };

  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  //   const { toast } = useToast();

  const todayEarnings = {
    totalEarnings: 145.5,
    ridesCompleted: 8,
    hoursWorked: 6.5,
    averageRating: 4.8,
  };

  const recentRides = [
    {
      id: "1",
      rider: "Alice Johnson",
      pickup: "Downtown Plaza",
      destination: "Airport Terminal",
      fare: "$25.50",
      date: "2024-01-15 14:30",
      status: "completed",
      rating: 5,
    },
    {
      id: "2",
      rider: "Bob Smith",
      pickup: "Mall Center",
      destination: "University Campus",
      fare: "$18.00",
      date: "2024-01-15 13:15",
      status: "completed",
      rating: 4,
    },
    {
      id: "3",
      rider: "Carol Davis",
      pickup: "Office Building",
      destination: "Restaurant District",
      fare: "$12.75",
      date: "2024-01-15 12:00",
      status: "completed",
      rating: 5,
    },
  ];

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    toast.success(
      isOnline
        ? "You won't receive new ride requests."
        : "You're now available for rides!"
    );
  };

  const handleAcceptRide = () => {
    toast.success("Ride Accepted");
    setCurrentRide({
      rider: "Emma Wilson",
      pickup: "Central Station",
      destination: "Shopping Mall",
      fare: "$22.00",
    });
  };

  const handleCompleteRide = () => {
    toast.success("Ride Completed");
    setCurrentRide(null);
  };

  const handleLogout = () => {
    toast.success("Logged Out");
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
                Driver
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {/* Online/Offline Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  {isOnline ? "Online" : "Offline"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleOnline}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-white/10"
                >
                  {isOnline ? (
                    <ToggleRight className="h-6 w-6 text-green-400" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </Button>
              </div>
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
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <Car className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "rides" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("rides")}
              >
                <Clock className="h-4 w-4 mr-2" />
                Ride History
              </Button>
              <Button
                variant={activeTab === "earnings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("earnings")}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Earnings
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile & Vehicle
              </Button>
            </nav>

            {/* Status Card */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isOnline
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        isOnline ? "bg-green-400" : "bg-gray-400"
                      }`}
                    ></div>
                    {isOnline ? "Available for Rides" : "Offline"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Ride Alert */}
            {currentRide && (
              <Card className="mb-6 border-secondary bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-secondary">Active Ride</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <strong>Rider:</strong> {currentRide.rider}
                      </p>
                      <p>
                        <strong>Pickup:</strong> {currentRide.pickup}
                      </p>
                      <p>
                        <strong>Destination:</strong> {currentRide.destination}
                      </p>
                      <p>
                        <strong>Fare:</strong> {currentRide.fare}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" className="btn-cta">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Rider
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleCompleteRide}
                        className="bg-success text-success-foreground"
                      >
                        Complete Ride
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Incoming Ride Request (only show when online and no current ride) */}
            {isOnline && !currentRide && (
              <Card className="mb-6 border-accent bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-accent">
                    New Ride Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <strong>Pickup:</strong> Central Station
                      </p>
                      <p>
                        <strong>Destination:</strong> Shopping Mall
                      </p>
                      <p>
                        <strong>Distance:</strong> 5.2 km
                      </p>
                      <p>
                        <strong>Estimated Fare:</strong> $22.00
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleAcceptRide}
                        className="bg-success text-success-foreground"
                      >
                        Accept Ride
                      </Button>
                      <Button variant="outline">Decline</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
                  <p className="text-muted-foreground">
                    Track your performance and earnings
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            ${todayEarnings.totalEarnings}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Today's Earnings
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Car className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {todayEarnings.ridesCompleted}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Rides Completed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {todayEarnings.hoursWorked}h
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Hours Worked
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Star className="h-8 w-8 text-yellow-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {todayEarnings.averageRating}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Average Rating
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Ride History Tab */}
            {activeTab === "rides" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Ride History</h1>
                  <p className="text-muted-foreground">
                    View your completed rides
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
                                Rider: {ride.rider}
                              </h3>
                              <Badge variant="default">{ride.status}</Badge>
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs content */}
            {activeTab === "earnings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Earnings Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Track your income and performance
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Detailed earnings analytics coming soon...
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Profile & Vehicle</h1>
                  <p className="text-muted-foreground">
                    Manage your driver profile and vehicle information
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Profile and vehicle management coming soon...
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

export default DriverDashboard;

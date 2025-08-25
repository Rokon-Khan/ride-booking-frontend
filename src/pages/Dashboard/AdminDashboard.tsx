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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ban,
  Bell,
  Car,
  CheckCircle,
  DollarSign,
  Eye,
  LogOut,
  Search,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
// import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  //   const { toast } = useToast();

  const platformStats = {
    totalUsers: 55000,
    totalDrivers: 5000,
    totalRides: 1250000,
    totalRevenue: 2450000,
    monthlyGrowth: 15.5,
  };

  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "rider",
      status: "active",
      joinDate: "2024-01-10",
      totalRides: 45,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "driver",
      status: "active",
      joinDate: "2024-01-08",
      totalRides: 125,
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "rider",
      status: "blocked",
      joinDate: "2024-01-05",
      totalRides: 12,
    },
  ];

  const rides = [
    {
      id: "1",
      rider: "Alice Cooper",
      driver: "Bob Driver",
      pickup: "Downtown Plaza",
      destination: "Airport",
      fare: "$25.50",
      status: "completed",
      date: "2024-01-15 14:30",
    },
    {
      id: "2",
      rider: "Charlie Brown",
      driver: "Dana Wilson",
      pickup: "Mall Center",
      destination: "University",
      fare: "$18.00",
      status: "in-progress",
      date: "2024-01-15 15:45",
    },
    {
      id: "3",
      rider: "Eva Green",
      driver: "Frank Miller",
      pickup: "Office Building",
      destination: "Restaurant",
      fare: "$12.75",
      status: "cancelled",
      date: "2024-01-15 16:20",
    },
  ];

  const handleUserAction = (userId: string, action: string) => {
    const user = users.find((u) => u.id === userId);
    if (action === "block") {
      toast.success(`${user?.name} Blocked has been blocked from the platform`);
    } else if (action === "unblock") {
      toast.success(
        `${user?.name} Unblocked has been unblocked and can use the platform again.`
      );
    }
  };

  const handleLogout = () => {
    toast.success("You have been successfully logged out.");
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
                Admin
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
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "users" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
              <Button
                variant={activeTab === "rides" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("rides")}
              >
                <Car className="h-4 w-4 mr-2" />
                Ride Oversight
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <User className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
                  <p className="text-muted-foreground">
                    Monitor your platform's performance and key metrics
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {platformStats.totalUsers.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Users
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Car className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {platformStats.totalDrivers.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Active Drivers
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {platformStats.totalRides.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Rides
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            ${platformStats.totalRevenue.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Revenue
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {platformStats.monthlyGrowth}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Monthly Growth
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Platform Activity</CardTitle>
                    <CardDescription>
                      Latest updates and system events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <p className="text-sm">
                          New driver registration: John Doe approved
                        </p>
                        <span className="text-xs text-muted-foreground ml-auto">
                          2 minutes ago
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <p className="text-sm">
                          Ride completed: Downtown to Airport - $25.50
                        </p>
                        <span className="text-xs text-muted-foreground ml-auto">
                          5 minutes ago
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <p className="text-sm">
                          User reported: Safety concern - Under review
                        </p>
                        <span className="text-xs text-muted-foreground ml-auto">
                          10 minutes ago
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">User Management</h1>
                    <p className="text-muted-foreground">
                      Manage riders and drivers on your platform
                    </p>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="rider">Riders</SelectItem>
                      <SelectItem value="driver">Drivers</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{user.name}</h3>
                              <Badge
                                variant={
                                  user.role === "driver"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {user.role}
                              </Badge>
                              <Badge
                                variant={
                                  user.status === "active"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {user.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>{user.email}</div>
                              <div>
                                Joined: {user.joinDate} • Rides:{" "}
                                {user.totalRides}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            {user.status === "active" ? (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  handleUserAction(user.id, "block")
                                }
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Block
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() =>
                                  handleUserAction(user.id, "unblock")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Unblock
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Ride Oversight Tab */}
            {activeTab === "rides" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Ride Oversight</h1>
                  <p className="text-muted-foreground">
                    Monitor all rides on your platform
                  </p>
                </div>

                <div className="space-y-4">
                  {rides.map((ride) => (
                    <Card key={ride.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">Ride #{ride.id}</h3>
                              <Badge
                                variant={
                                  ride.status === "completed"
                                    ? "default"
                                    : ride.status === "in-progress"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {ride.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>
                                <strong>Rider:</strong> {ride.rider} •{" "}
                                <strong>Driver:</strong> {ride.driver}
                              </div>
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
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Platform Analytics
                  </h1>
                  <p className="text-muted-foreground">
                    Detailed insights and performance metrics
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Advanced analytics dashboard coming soon...
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
                  <p className="text-muted-foreground">
                    Configure platform settings and preferences
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Admin settings panel coming soon...
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

export default AdminDashboard;

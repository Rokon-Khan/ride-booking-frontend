import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, DollarSign, TrendingUp, Users } from "lucide-react";

// import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  //   const { toast } = useToast();

  const platformStats = {
    totalUsers: 55000,
    totalDrivers: 5000,
    totalRides: 1250000,
    totalRevenue: 2450000,
    monthlyGrowth: 15.5,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-width py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

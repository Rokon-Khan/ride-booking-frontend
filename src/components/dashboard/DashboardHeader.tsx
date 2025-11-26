/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  useLogoutMutation,
  useTroubleNotificationQuery,
} from "@/redux/features/auth/authApi";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Bell,
  Clock,
  LogOut,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { Link } from "react-router";

const DashboardHeader = () => {
  const [logoutMutation] = useLogoutMutation();
  // Get logged-in user info
  const { user } = useAuth();

  // Get notifications for admin users only
  const { data: notificationsData } = useTroubleNotificationQuery(undefined, {
    skip: user?.role !== "admin",
    pollingInterval: user?.role === "admin" ? 10000 : 0,
  });

  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  // Logout mutation
  // const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      // Optionally hard redirect or use navigation
      window.location.href = "/login";
    } catch {
      // swallow; could add toast
    }
  };

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-6 gap-4 sticky top-0 z-40">
      <SidebarTrigger />
      <div>
        {/* <h1 className="text-lg font-semibold">Ride Share Pro</h1> */}
        <h1 className="text-xl font-bold capitalize">
          <Badge variant="secondary">{user?.role}</Badge> Dashboard
        </h1>
      </div>
      <div className="flex-1 flex items-center gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-full md:w-[300px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user?.role === "admin" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">SOS Alerts</h4>
                  <Link to="/dashboard/notifications">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No SOS alerts
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification: any) => (
                      <div
                        key={notification._id}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="font-medium text-sm">
                              Emergency SOS
                            </span>
                          </div>
                          {!notification.isRead && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>

                        <div className="text-xs space-y-1">
                          <p>
                            <span className="font-medium">Rider:</span>{" "}
                            {notification.riderName}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              Lat: {notification.location.lat}, Lng:{" "}
                              {notification.location.lng}
                            </span>
                          </p>
                          <p className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(
                              new Date(notification.timestamp),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.profile?.avatarUrl}
                  alt={user?.profile?.name}
                />
                <AvatarFallback className="bg-gradient-hero text-white">
                  {user?.profile?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.profile?.avatarUrl}
                    alt={user?.profile?.name}
                  />
                  <AvatarFallback className="bg-gradient-hero text-white">
                    {user?.profile?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.profile?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Badge variant="outline" className="w-fit capitalize">
                  {user?.role}
                </Badge>
              </div>

              <div className="border-t pt-2 space-y-1">
                <Link to="/dashboard/profile">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export { DashboardHeader };

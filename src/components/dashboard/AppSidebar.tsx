// import ReactLogo from "@/assets/react.svg";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/authApi";
import {
  BarChart3,
  Car,
  CarTaxiFront,
  DollarSign,
  History,
  Home,
  LogOut,
  MapPin,
  Navigation,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Separator } from "../ui/separator";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { data: user, isLoading } = useUserInfoQuery(undefined);
  const [logoutMutation, { isLoading: loggingOut }] = useLogoutMutation();

  const menuItems: MenuItem[] = useMemo(() => {
    if (!user) return [];

    const base: MenuItem[] = [
      { title: "Dashboard", url: `/dashboard/${user.role}`, icon: Home },
      { title: "Profile", url: "/dashboard/profile", icon: User },
    ];

    switch (user.role) {
      case "rider":
        return [
          ...base,
          {
            title: "Book Ride",
            url: "/dashboard/book-ride",
            icon: MapPin,
          },
          {
            title: "Active Rides",
            url: "/dashboard/active-ride",
            icon: Navigation,
          },
          {
            title: "Ride History",
            url: "/dashboard/ride-history",
            icon: History,
          },
          {
            title: "Payments",
            url: "/dashboard/rider/payments",
            icon: DollarSign,
          },
        ];
      case "driver":
        return [
          ...base,
          {
            title: "Go Online/Offline",
            url: "/dashboard/goonline",
            icon: Shield,
          },
          {
            title: "Ride Requests",
            url: "/dashboard/ride-requests",
            icon: Car,
          },
          {
            title: "Active Rides",
            url: "/dashboard/current-ride",
            icon: Navigation,
          },
          // {
          //   title: "Earnings",
          //   url: "/dashboard/driver/earnings",
          //   icon: DollarSign,
          // },
          {
            title: "Ride History",
            url: "/dashboard/ride-history",
            icon: History,
          },
        ];
      case "admin":
        return [
          ...base,
          {
            title: "User Management",
            url: "/dashboard/user-management",
            icon: Users,
          },
          {
            title: "Driver Management",
            url: "/dashboard/driver-management",
            icon: CarTaxiFront,
          },
          {
            title: "Ride Management",
            url: "/dashboard/ride-management",
            icon: Car,
          },
          { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
          // { title: "Reports", url: "/dashboard/reports", icon: Clock },
        ];
      default:
        return base;
    }
  }, [user]);

  const isActive = (path: string) => location.pathname === path;
  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
      : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";

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
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        {/* <div className="flex items-center justify-center">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={ReactLogo}
              className="h-16 w-32 object-contain"
              alt="OptiluxBD Logo"
            />
          </Link>
        </div> */}

        <div className="flex items-center px-2 pt-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1 bg-gradient-hero rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">
              RideShare Pro
            </span>
          </Link>
          {/* {user && (
            <Badge variant="secondary" className="ml-2 capitalize">
              {user.role}
            </Badge>
          )} */}
        </div>
        <Separator />
        <SidebarGroup>
          {/* <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="p-1 bg-gradient-hero rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-heading font-bold text-foreground">
                  RideShare Pro
                </span>
              </Link>
              {user && (
                <Badge variant="secondary" className="ml-2 capitalize">
                  {user.role}
                </Badge>
              )}
            </div>
          </SidebarGroupLabel> */}
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Loading...
                </div>
              )}
              {!isLoading && !user && (
                <div className="px-3 py-2 text-sm text-destructive">
                  Not authenticated
                </div>
              )}
              {!isLoading &&
                user &&
                menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/settings"
                    className={getNavClass("/dashboard/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    {state !== "collapsed" && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      disabled={loggingOut}
                      onClick={handleLogout}
                      className="w-full justify-start h-8 px-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      {state !== "collapsed" && (
                        <span>{loggingOut ? "Logging out..." : "Logout"}</span>
                      )}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

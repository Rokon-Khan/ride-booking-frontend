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
// import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Car,
  CarTaxiFront,
  Clock,
  DollarSign,
  History,
  Home,
  MapPin,
  Navigation,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import { Badge } from "../ui/badge";

const AppSidebar = () => {
  // const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const user = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    role: "admin",
  };

  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      {
        title: "Dashboard",
        url: `dashboard/${user.role}/`,
        icon: Home,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
      },
    ];

    if (user.role === "rider") {
      return [
        ...baseItems,
        {
          title: "Book Ride",
          url: "/rider/book-ride",
          icon: MapPin,
        },
        {
          title: "Active Rides",
          url: "/rider/active-rides",
          icon: Navigation,
        },
        {
          title: "Ride History",
          url: "/rider/history",
          icon: History,
        },
        {
          title: "Payments",
          url: "/rider/payments",
          icon: DollarSign,
        },
      ];
    }

    if (user.role === "driver") {
      return [
        ...baseItems,
        {
          title: "Go Online/Offline",
          url: "/driver/availability",
          icon: Shield,
        },
        {
          title: "Ride Requests",
          url: "/driver/requests",
          icon: Car,
        },
        {
          title: "Active Rides",
          url: "/driver/active-rides",
          icon: Navigation,
        },
        {
          title: "Earnings",
          url: "/driver/earnings",
          icon: DollarSign,
        },
        {
          title: "Ride History",
          url: "/driver/history",
          icon: History,
        },
      ];
    }

    if (user.role === "admin") {
      return [
        ...baseItems,
        {
          title: "User Management",
          url: "dashboard/user-management",
          icon: Users,
        },
        {
          title: "Driver Management",
          url: "dashboard/driver-management",
          icon: CarTaxiFront,
        },
        {
          title: "Ride Management",
          url: "/admin/rides",
          icon: Car,
        },
        {
          title: "Analytics",
          url: "/admin/analytics",
          icon: BarChart3,
        },
        {
          title: "Reports",
          url: "/admin/reports",
          icon: Clock,
        },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavClass = (path: string) => {
    return isActive(path)
      ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
      : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="p-1 bg-gradient-hero rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-heading font-bold text-foreground">
                  RideShare Pro
                </span>
              </Link>
              <Badge variant="secondary" className="ml-4">
                Admin
              </Badge>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
                  <NavLink to="/settings" className={getNavClass("/settings")}>
                    <Settings className="h-4 w-4" />
                    {state !== "collapsed" && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };

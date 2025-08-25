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
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Car,
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
import { NavLink, useLocation } from "react-router";

const AppSidebar = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();

  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      {
        title: "Dashboard",
        url: `/${user.role}/dashboard`,
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
          url: "/admin/users",
          icon: Users,
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
      ? "bg-primary/10 text-primary font-medium"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Main Navigation
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

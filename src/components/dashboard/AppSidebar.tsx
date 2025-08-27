// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// // import { useAuth } from "@/context/AuthContext";
// import {
//   BarChart3,
//   Car,
//   CarTaxiFront,
//   Clock,
//   DollarSign,
//   History,
//   Home,
//   MapPin,
//   Navigation,
//   Settings,
//   Shield,
//   User,
//   Users,
// } from "lucide-react";
// import { Link, NavLink, useLocation } from "react-router";
// import { Badge } from "../ui/badge";

// const AppSidebar = () => {
//   // const { user } = useAuth();
//   const { state } = useSidebar();
//   const location = useLocation();
//   const user = {
//     id: "123",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     avatar: "https://via.placeholder.com/150",
//     role: "admin",
//   };

//   const getMenuItems = () => {
//     if (!user) return [];

//     const baseItems = [
//       {
//         title: "Dashboard",
//         url: `dashboard/${user.role}/`,
//         icon: Home,
//       },
//       {
//         title: "Profile",
//         url: "/dashboard/profile",
//         icon: User,
//       },
//     ];

//     if (user.role === "rider") {
//       return [
//         ...baseItems,
//         {
//           title: "Book Ride",
//           url: "/rider/book-ride",
//           icon: MapPin,
//         },
//         {
//           title: "Active Rides",
//           url: "/rider/active-rides",
//           icon: Navigation,
//         },
//         {
//           title: "Ride History",
//           url: "/rider/history",
//           icon: History,
//         },
//         {
//           title: "Payments",
//           url: "/rider/payments",
//           icon: DollarSign,
//         },
//       ];
//     }

//     if (user.role === "driver") {
//       return [
//         ...baseItems,
//         {
//           title: "Go Online/Offline",
//           url: "/driver/availability",
//           icon: Shield,
//         },
//         {
//           title: "Ride Requests",
//           url: "/driver/requests",
//           icon: Car,
//         },
//         {
//           title: "Active Rides",
//           url: "/driver/active-rides",
//           icon: Navigation,
//         },
//         {
//           title: "Earnings",
//           url: "/driver/earnings",
//           icon: DollarSign,
//         },
//         {
//           title: "Ride History",
//           url: "/driver/history",
//           icon: History,
//         },
//       ];
//     }

//     if (user.role === "admin") {
//       return [
//         ...baseItems,
//         {
//           title: "User Management",
//           url: "dashboard/user-management",
//           icon: Users,
//         },
//         {
//           title: "Driver Management",
//           url: "dashboard/driver-management",
//           icon: CarTaxiFront,
//         },
//         {
//           title: "Ride Management",
//           url: "dashboard/ride-management",
//           icon: Car,
//         },
//         {
//           title: "Analytics",
//           url: "dashboard/analytics",
//           icon: BarChart3,
//         },
//         {
//           title: "Reports",
//           url: "dashboard/reports",
//           icon: Clock,
//         },
//       ];
//     }

//     return baseItems;
//   };

//   const menuItems = getMenuItems();

//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   const getNavClass = (path: string) => {
//     return isActive(path)
//       ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
//       : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
//   };

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
//             <div className="flex items-center space-x-3">
//               <Link to="/" className="flex items-center space-x-2 group">
//                 <div className="p-1 bg-gradient-hero rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
//                   <Car className="h-6 w-6 text-white" />
//                 </div>
//                 <span className="text-sm font-heading font-bold text-foreground">
//                   RideShare Pro
//                 </span>
//               </Link>
//               <Badge variant="secondary" className="ml-4">
//                 Admin
//               </Badge>
//             </div>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <NavLink to={item.url} className={getNavClass(item.url)}>
//                       <item.icon className="h-4 w-4" />
//                       {state !== "collapsed" && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarGroup className="mt-auto">
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                   <NavLink to="/settings" className={getNavClass("/settings")}>
//                     <Settings className="h-4 w-4" />
//                     {state !== "collapsed" && <span>Settings</span>}
//                   </NavLink>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

// export { AppSidebar };

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"; // Import new hook
// import { useAuth } from "@/context/AuthContext";
// import {
//   BarChart3,
//   Car,
//   CarTaxiFront,
//   Clock,
//   DollarSign,
//   History,
//   Home,
//   LogOut,
//   MapPin,
//   Navigation,
//   Settings,
//   Shield,
//   User,
//   Users,
// } from "lucide-react";
// import { Link, NavLink, useLocation } from "react-router"; // Correct import
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";

// const AppSidebar = () => {
//   const { state } = useSidebar();
//   const location = useLocation();
//   const { user, loading, logout } = useAuth();

//   if (!user) {
//     return null;
//   }

//   const getMenuItems = () => {
//     if (!user || loading) return [];

//     const baseItems = [
//       {
//         title: "Dashboard",
//         url: `/dashboard/${user.role}`,
//         icon: Home,
//       },
//       {
//         title: "Profile",
//         url: "/dashboard/profile",
//         icon: User,
//       },
//     ];

//     if (user.role === "rider") {
//       return [
//         ...baseItems,
//         {
//           title: "Book Ride",
//           url: "/rider/book-ride",
//           icon: MapPin,
//         },
//         {
//           title: "Active Rides",
//           url: "/rider/active-rides",
//           icon: Navigation,
//         },
//         {
//           title: "Ride History",
//           url: "/rider/history",
//           icon: History,
//         },
//         {
//           title: "Payments",
//           url: "/rider/payments",
//           icon: DollarSign,
//         },
//       ];
//     }

//     if (user.role === "driver") {
//       return [
//         ...baseItems,
//         {
//           title: "Go Online/Offline",
//           url: "/driver/availability",
//           icon: Shield,
//         },
//         {
//           title: "Ride Requests",
//           url: "/driver/requests",
//           icon: Car,
//         },
//         {
//           title: "Active Rides",
//           url: "/driver/active-rides",
//           icon: Navigation,
//         },
//         {
//           title: "Earnings",
//           url: "/driver/earnings",
//           icon: DollarSign,
//         },
//         {
//           title: "Ride History",
//           url: "/driver/history",
//           icon: History,
//         },
//       ];
//     }

//     if (user.role === "admin") {
//       return [
//         ...baseItems,
//         {
//           title: "User Management",
//           url: "/dashboard/user-management",
//           icon: Users,
//         },
//         {
//           title: "Driver Management",
//           url: "/dashboard/driver-management",
//           icon: CarTaxiFront,
//         },
//         {
//           title: "Ride Management",
//           url: "/dashboard/ride-management",
//           icon: Car,
//         },
//         {
//           title: "Analytics",
//           url: "/dashboard/analytics",
//           icon: BarChart3,
//         },
//         {
//           title: "Reports",
//           url: "/dashboard/reports",
//           icon: Clock,
//         },
//       ];
//     }

//     return baseItems;
//   };

//   const menuItems = getMenuItems();

//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   const getNavClass = (path: string) => {
//     return isActive(path)
//       ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
//       : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
//   };

//   // Show loading state or return null if no user
//   if (loading) {
//     return (
//       <Sidebar collapsible="icon">
//         <SidebarContent>
//           <div className="flex items-center justify-center p-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//           </div>
//         </SidebarContent>
//       </Sidebar>
//     );
//   }

//   if (!user) {
//     return (
//       <Sidebar collapsible="icon">
//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupLabel>Not authenticated</SidebarGroupLabel>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//     );
//   }

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
//             <div className="flex items-center space-x-3">
//               <Link to="/" className="flex items-center space-x-2 group">
//                 <div className="p-1 bg-gradient-hero rounded-lg shadow-medium group-hover:shadow-strong transition-all duration-300">
//                   <Car className="h-6 w-6 text-white" />
//                 </div>
//                 <span className="text-sm font-heading font-bold text-foreground">
//                   RideShare Pro
//                 </span>
//               </Link>
//               <Badge variant="secondary" className="ml-4">
//                 {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//               </Badge>
//             </div>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <NavLink to={item.url} className={getNavClass(item.url)}>
//                       <item.icon className="h-4 w-4" />
//                       {state !== "collapsed" && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarGroup className="mt-auto">
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                   <NavLink to="/settings" className={getNavClass("/settings")}>
//                     <Settings className="h-4 w-4" />
//                     {state !== "collapsed" && <span>Settings</span>}
//                   </NavLink>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//             {/* LogOut */}

//             <SidebarMenuItem>
//               <SidebarMenuButton asChild>
//                 <Button
//                   variant="ghost"
//                   onClick={handleLogout}
//                   className="w-full justify-start h-8 px-2 hover:bg-accent hover:text-accent-foreground"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   {state !== "collapsed" && <span>Logout</span>}
//                 </Button>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

import { Badge } from "@/components/ui/badge";
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
  Clock,
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
            url: "/dashboard/rider/book-ride",
            icon: MapPin,
          },
          {
            title: "Active Rides",
            url: "/dashboard/rider/active-rides",
            icon: Navigation,
          },
          {
            title: "Ride History",
            url: "/dashboard/rider/history",
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
            url: "/dashboard/driver/availability",
            icon: Shield,
          },
          {
            title: "Ride Requests",
            url: "/dashboard/driver/requests",
            icon: Car,
          },
          {
            title: "Active Rides",
            url: "/dashboard/driver/active-rides",
            icon: Navigation,
          },
          {
            title: "Earnings",
            url: "/dashboard/driver/earnings",
            icon: DollarSign,
          },
          {
            title: "Ride History",
            url: "/dashboard/driver/history",
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
          { title: "Reports", url: "/dashboard/reports", icon: Clock },
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
              {user && (
                <Badge variant="secondary" className="ml-2 capitalize">
                  {user.role}
                </Badge>
              )}
            </div>
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
                  <NavLink to="/settings" className={getNavClass("/settings")}>
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

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
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/authApi";
import { Bell, LogOut, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router";

const DashboardHeader = () => {
  const navigate = useNavigate();

  // Get logged-in user info
  const { data: user, isLoading } = useUserInfoQuery(undefined);

  // Logout mutation
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/"); // Redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoading) {
    return (
      <header className="h-16 flex items-center px-6">Loading user...</header>
    );
  }

  if (!user) return null;

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-6 gap-4 sticky top-0 z-40">
      <SidebarTrigger />

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

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>

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

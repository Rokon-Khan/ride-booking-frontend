import { Car, FileText, Menu, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/rides", label: "All Rides", icon: null },
    { path: "/create-ride", label: "Add Ride", icon: Plus },
    { path: "/ride-summary", label: "Ride Summary", icon: FileText },
  ];

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-library-brown"
          >
            <Car className="h-8 w-8" />
            <span className="text-xl font-bold">RideBooking</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
              >
                <Link to={item.path}>
                  {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.path}
                      asChild
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to={item.path}>
                        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Footer } from "../common/Footer";
import { Navbar } from "../common/Navbar";

export const Layout = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Toaster richColors position="top-center" />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

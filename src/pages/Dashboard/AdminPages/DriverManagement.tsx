/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import DriverCard from "@/components/dashboard/admin/DriverCard";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useApproveDriverMutation,
  useListAllDriversQuery,
  useReactivateDriverMutation,
  useSuspendDriverMutation,
} from "@/redux/features/admin/adminApi";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const pageSize = 10;

const DriverManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useListAllDriversQuery();
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();
  const [reactivateDriver] = useReactivateDriverMutation();

  const drivers = data?.data || [];

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver: any) => {
      // If backend later supplies driver.userName / driver.userEmail you can use them here.
      const matchesSearch =
        !searchTerm ||
        (driver.userName &&
          driver.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (driver.userEmail &&
          driver.userEmail.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && driver.approved) ||
        (statusFilter === "suspended" && driver.suspended) ||
        (statusFilter === "available" && driver.available);

      return matchesSearch && matchesStatus;
    });
  }, [drivers, searchTerm, statusFilter]);

  const totalDrivers = filteredDrivers.length;
  const totalPages = Math.max(1, Math.ceil(totalDrivers / pageSize));

  const paginatedDrivers = useMemo(
    () =>
      filteredDrivers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ),
    [filteredDrivers, currentPage]
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDriverAction = async (
    driverId: string,
    action: "approve" | "suspend" | "reactivate"
  ) => {
    try {
      if (action === "approve") {
        await approveDriver({ driverId }).unwrap();
      } else if (action === "suspend") {
        await suspendDriver({ driverId }).unwrap();
      } else {
        await reactivateDriver({ driverId }).unwrap();
      }
    } catch (e) {
      console.error(`Failed to ${action} driver`, e);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading drivers...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load drivers: {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Driver Management</h1>
          <p className="text-muted-foreground">
            Manage drivers on your platform
          </p>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search (requires driver.userName/userEmail in API)..."
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            className="pl-10"
          />
        </div>
        <Select
          onValueChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
          defaultValue="all"
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="available">Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Driver Cards */}
      <div className="space-y-4">
        {paginatedDrivers.map((driver: any) => {
          const DC = DriverCard as any;
          return (
            <DC
              key={driver._id}
              driver={driver}
              handleDriverAction={(
                id: string,
                action: "approve" | "suspend" | "reactivate"
              ) => {
                return void handleDriverAction(id, action);
              }}
            />
          );
        })}
        {paginatedDrivers.length === 0 && (
          <p className="text-muted-foreground text-center">No drivers found.</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const show =
              totalPages <= 7 ||
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1;
            if (!show) return null;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {totalPages > 7 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DriverManagement;

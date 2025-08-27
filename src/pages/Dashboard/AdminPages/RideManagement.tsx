/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import RideCard from "@/components/dashboard/admin/RideCard";
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
import { useListAllRidesQuery } from "@/redux/features/admin/adminApi";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

const RideManagement = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error, refetch } = useListAllRidesQuery();

  // Support both shapes:
  // 1) { data: { rides: IRide[], page, limit } }
  // 2) { rides: IRide[], page, limit }
  // 3) { data: IRide[] } (if older assumption)
  const ridesArray: any[] =
    (data as any)?.data?.rides ||
    (data as any)?.rides ||
    (Array.isArray((data as any)?.data) ? (data as any)?.data : []) ||
    [];

  const fallbackPage = (data as any)?.data?.page || (data as any)?.page || 1;
  const fallbackLimit =
    (data as any)?.data?.limit || (data as any)?.limit || PAGE_SIZE;

  const filteredRides = useMemo(() => {
    return ridesArray.filter((ride) => {
      const matchesStatus =
        statusFilter === "all" || ride.status === statusFilter;

      // NOTE: We only search by pickup / destination address here.
      // If you want to search by rider/driver name, you’d need those names
      // included directly in the ride list response OR a pre-index of users.
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        ride.pickup?.address?.toLowerCase().includes(term) ||
        ride.destination?.address?.toLowerCase().includes(term) ||
        ride._id?.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [ridesArray, statusFilter, searchTerm]);

  const totalRides = filteredRides.length;
  const totalPages = Math.max(1, Math.ceil(totalRides / PAGE_SIZE));

  const paginatedRides = useMemo(
    () =>
      filteredRides.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [filteredRides, currentPage]
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading) {
    return <div className="p-6">Loading rides...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load rides: {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ride Management</h1>
          <p className="text-muted-foreground">
            View and manage rides on the platform
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="text-sm text-primary underline"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by pickup, destination or ride ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Select
          defaultValue="all"
          onValueChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ride Cards */}
      <div className="space-y-4">
        {paginatedRides.map((ride) => (
          <RideCard
            key={ride._id}
            ride={ride}
            onAfterChange={() => refetch()}
          />
        ))}
        {paginatedRides.length === 0 && (
          <p className="text-center text-muted-foreground">No rides found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
              // Simple condense for large counts
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
      )}
      {/* (Optional) Display backend pagination meta if you rely on server paging */}
      <div className="text-xs text-muted-foreground">
        Server page: {fallbackPage} (limit {fallbackLimit}) | Showing{" "}
        {paginatedRides.length} of {totalRides} filtered rides.
      </div>
    </div>
  );
};

export default RideManagement;

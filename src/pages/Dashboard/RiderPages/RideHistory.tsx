/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useRideHistoryQuery } from "@/redux/features/rider/riderApi";
import router from "@/routes/router";
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
} from "lucide-react";
import { useState, type JSX } from "react";

const statusColors: Record<string, string> = {
  completed: "bg-green-500 hover:bg-green-600 text-white",
  canceled: "bg-red-500 hover:bg-red-600 text-white",
  pending: "bg-yellow-500 hover:bg-yellow-600 text-black",
  ongoing: "bg-blue-500 hover:bg-blue-600 text-white",
};

const statusIcons: Record<string, JSX.Element> = {
  completed: <div className="w-2 h-2 rounded-full bg-white mr-1"></div>,
  canceled: <div className="w-2 h-2 rounded-full bg-white mr-1"></div>,
  pending: <div className="w-2 h-2 rounded-full bg-black mr-1"></div>,
  ongoing: <div className="w-2 h-2 rounded-full bg-white mr-1"></div>,
};

export default function RideHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: rides = [],
    isLoading,
    isError,
    refetch,
  } = useRideHistoryQuery();

  const total = rides.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginatedRides = rides.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSeeDetails = (rideId: string) => {
    router.navigate(`/dashboard/ride-history/${rideId}`);
  };

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
          className={
            currentPage === 1
              ? "opacity-50 pointer-events-none"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // First page
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
            className="cursor-pointer"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
          className={
            currentPage === totalPages
              ? "opacity-50 pointer-events-none"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ride History</h1>
          <Button variant="outline" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load ride history. Please try again.
        </AlertDescription>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => refetch()}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ride History</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="py-1 px-3">
            Total: {total} rides
          </Badge>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {paginatedRides.length === 0 ? (
        <Alert>
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>No rides found</AlertTitle>
          <AlertDescription>
            You don't have any ride history yet.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {paginatedRides.map((ride: any) => (
            <Card key={ride._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center">
                    <Navigation className="h-5 w-5 text-primary mr-2" />
                    <span className="text-lg font-semibold">
                      {ride.pickup.address} → {ride.destination.address}
                    </span>
                  </div>
                  <Badge
                    className={`${
                      statusColors[ride.status] || "bg-gray-400"
                    } flex items-center py-1 px-3`}
                  >
                    {statusIcons[ride.status] || (
                      <div className="w-2 h-2 rounded-full bg-white mr-1"></div>
                    )}
                    {ride.status?.charAt(0).toUpperCase() +
                      ride.status?.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Minimal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {ride.pickup.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Destination</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {ride.destination.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Ride Date</p>
                      <p className="text-sm text-muted-foreground">
                        {ride.timestamps?.requested
                          ? new Date(ride.timestamps.requested).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-lg font-bold text-primary">
                    ${ride.fare}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSeeDetails(ride._id)}
                  >
                    See Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>{generatePaginationItems()}</PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
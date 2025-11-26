/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import RideRequestCard from "@/components/dashboard/driver/RideRequestCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
  useAvailableRidesQuery,
  useDriverAvailabilityQuery,
  useDriverCurrentRideQuery,
  useDriverRideHistoryQuery,
} from "@/redux/features/driver/driverApi";
import type { IRide } from "@/types/common";
import { Loader2, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

/**
 * Combined Ride Request & Driver Ride Management view
 * - Shows "requested" rides (unassigned) when driver is online
 * - Shows driver's own rides (accepted, picked_up, in_transit, completed, canceled)
 * - Filter by status & search (pickup/destination substring)
 * - Update status (progress / cancel) or accept unassigned rides
 *
 * NOTE:
 * - availableRides endpoint provides rides with status "requested" and driver === null
 * - driverRideHistory provides rides for the current driver (assumed)
 * - driverCurrentRide used to highlight active ride distinctly
 */

const PAGE_SIZE = 6;

const statusOptions = [
  "all",
  "requested",
  "accepted",
  "picked_up",
  "in_transit",
  "completed",
  "canceled",
] as const;

export default function RideRequestsPage() {
  const { data: availability } = useDriverAvailabilityQuery();
  const online = availability?.available ?? false;

  const {
    data: currentRideResp,
    isLoading: currentRideLoading,
    refetch: refetchCurrentRide,
  } = useDriverCurrentRideQuery(undefined, { pollingInterval: 10000 });

  const {
    data: driverHistory = [],
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useDriverRideHistoryQuery(undefined, { pollingInterval: 20000 });

  const {
    data: requestedRides = [],
    isLoading: requestedLoading,
    refetch: refetchRequested,
  } = useAvailableRidesQuery(undefined, {
    skip: !online,
    pollingInterval: online ? 10000 : 0,
  });

  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Combine rides:
  // - requested (only if online & still unassigned)
  // - driver history (includes accepted→completed/canceled)
  // De-duplicate by _id (in case of overlap)
  const combined: IRide[] = useMemo(() => {
    const map = new Map<string, IRide>();
    if (online) {
      requestedRides.forEach((r: IRide) => map.set(r._id, r));
    }
    driverHistory.forEach((r: IRide) => map.set(r._id, r));
    if (currentRideResp?.data)
      map.set(currentRideResp.data._id, currentRideResp.data);
    return Array.from(map.values()).sort((a, b) => {
      const ta = new Date(a.timestamps?.requested || 0).getTime();
      const tb = new Date(b.timestamps?.requested || 0).getTime();
      return tb - ta; // newest first
    });
  }, [requestedRides, driverHistory, currentRideResp, online]);

  const filtered = useMemo(() => {
    return combined.filter((ride) => {
      if (statusFilter !== "all" && ride.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const pickupMatch = ride.pickup?.address?.toLowerCase().includes(q);
        const destMatch = ride.destination?.address?.toLowerCase().includes(q);
        const idMatch = ride._id.toLowerCase().includes(q);
        if (!pickupMatch && !destMatch && !idMatch) return false;
      }
      return true;
    });
  }, [combined, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const refetchAll = useCallback(() => {
    refetchCurrentRide();
    refetchHistory();
    if (online) refetchRequested();
  }, [refetchCurrentRide, refetchHistory, refetchRequested, online]);

  const loadingAny = requestedLoading || historyLoading || currentRideLoading;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Ride Requests & My Rides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              <Select
                defaultValue="all"
                onValueChange={(val) => {
                  setStatusFilter(val as any);
                  setPage(1);
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

              <div className="relative">
                <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search by pickup / destination / id"
                  className="pl-8 w-72"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {online ? (
                <span className="text-green-600 font-medium">
                  Online & receiving requests
                </span>
              ) : (
                <span className="font-medium">Offline</span>
              )}
              {" • "}
              {combined.length} rides loaded
            </div>
          </div>

          {/* List */}
          {loadingAny && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading rides...
            </div>
          )}

          {!loadingAny && slice.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No rides match your filters.
            </div>
          )}

          <div className="grid gap-4">
            {slice.map((ride) => {
              const isMine = ride.status !== "requested" || !!ride.driver;
              const isActive = currentRideResp?.data?._id === ride._id;
              return (
                <RideRequestCard
                  key={ride._id}
                  ride={ride}
                  isMine={isMine}
                  isActive={isActive}
                  onAfterAction={refetchAll}
                />
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  <div className="px-3 text-xs text-muted-foreground">
                    Page {currentPage} / {totalPages}
                  </div>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDriverReportsQuery,
  useEarningsReportsQuery,
  useRideReportsQuery,
} from "@/redux/features/admin/adminApi";
import { useMemo } from "react";

/**
 * Utility to unwrap either shape:
 * - { data: {...} }
 * - raw object {...}
 */
function unwrap<T = any>(raw: any): T | undefined {
  if (!raw) return undefined;
  if (raw.data && typeof raw.data === "object") return raw.data as T;
  return raw as T;
}

const currency = (v: number | undefined, fallback = "$0") =>
  typeof v === "number"
    ? `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : fallback;

const percent = (v: number | undefined, fallback = "0%") =>
  typeof v === "number" ? `${(v * (v <= 1 ? 100 : 1)).toFixed(2)}%` : fallback;

const ReportsOverview = () => {
  // Queries
  const {
    data: rideReportsRaw,
    isLoading: rideLoading,
    isError: rideError,
    error: rideErrObj,
    refetch: refetchRides,
  } = useRideReportsQuery();

  const {
    data: driverReportsRaw,
    isLoading: driverLoading,
    isError: driverError,
    error: driverErrObj,
    refetch: refetchDrivers,
  } = useDriverReportsQuery();

  const {
    data: earningsReportsRaw,
    isLoading: earningsLoading,
    isError: earningsError,
    error: earningsErrObj,
    refetch: refetchEarnings,
  } = useEarningsReportsQuery();

  // Normalize shapes
  const rideReports = unwrap<any>(rideReportsRaw); // { stats: [{ _id, rideCount, totalRevenue }, ...], period }
  const driverReports = unwrap<any>(driverReportsRaw); // { online, avgEarnings, completionRate }
  const earningsReports = unwrap<any>(earningsReportsRaw); // { totalRevenue, commission, driverPayout, commissionRate }

  // Derived ride summary
  const rideSummary = useMemo(() => {
    if (!rideReports?.stats || !Array.isArray(rideReports.stats)) {
      return { totalRides: 0, totalRevenue: 0 };
    }
    return rideReports.stats.reduce(
      (acc: any, d: any) => {
        acc.totalRides += d.rideCount || 0;
        acc.totalRevenue += d.totalRevenue || 0;
        return acc;
      },
      { totalRides: 0, totalRevenue: 0 }
    );
  }, [rideReports]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Platform Reports</h1>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => {
              refetchRides();
              refetchDrivers();
              refetchEarnings();
            }}
            className="underline text-primary"
          >
            Refresh All
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Rides Report Card */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between gap-2">
              <span>Ride Activity</span>
              {rideReports?.period && (
                <Badge variant="outline" className="text-xs">
                  Period: {rideReports.period}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {rideLoading && <RideReportSkeleton />}
            {rideError && (
              <ErrorBlock
                label="Failed to load ride reports."
                details={rideErrObj}
              />
            )}
            {!rideLoading && !rideError && (
              <>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <StatBlock
                    label="Total Rides"
                    value={rideSummary.totalRides.toLocaleString()}
                  />
                  <StatBlock
                    label="Total Revenue"
                    value={currency(rideSummary.totalRevenue)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Daily Breakdown
                  </div>
                  <div className="max-h-48 overflow-y-auto pr-1 space-y-1 text-sm">
                    {rideReports?.stats?.length ? (
                      rideReports.stats.map((d: any) => (
                        <div
                          key={d._id}
                          className="flex items-center justify-between rounded border px-3 py-1.5 bg-muted/20"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{d._id}</span>
                            <span className="text-xs text-muted-foreground">
                              {d.rideCount} rides
                            </span>
                          </div>
                          <div className="text-right font-medium">
                            {currency(d.totalRevenue)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-xs">
                        No ride stats available.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Driver Report Card */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle>Driver Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {driverLoading && <DriverReportSkeleton />}
            {driverError && (
              <ErrorBlock
                label="Failed to load driver reports."
                details={driverErrObj}
              />
            )}
            {!driverLoading && !driverError && (
              <div className="grid gap-4 text-sm">
                <StatBlock
                  label="Drivers Online"
                  value={driverReports?.online ?? 0}
                />
                <StatBlock
                  label="Avg Earnings"
                  value={currency(driverReports?.avgEarnings)}
                />
                <StatBlock
                  label="Completion Rate"
                  value={percent(driverReports?.completionRate)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Earnings Report Card */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle>Earnings & Commission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {earningsLoading && <EarningsReportSkeleton />}
            {earningsError && (
              <ErrorBlock
                label="Failed to load earnings reports."
                details={earningsErrObj}
              />
            )}
            {!earningsLoading && !earningsError && (
              <div className="grid gap-4 text-sm">
                <StatBlock
                  label="Total Revenue"
                  value={currency(earningsReports?.totalRevenue)}
                />
                <StatBlock
                  label="Commission"
                  value={currency(earningsReports?.commission)}
                  subValue={`Rate: ${percent(earningsReports?.commissionRate)}`}
                />
                <StatBlock
                  label="Driver Payout"
                  value={currency(earningsReports?.driverPayout)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* --- Reusable Pieces --- */

const StatBlock = ({
  label,
  value,
  subValue,
}: {
  label: string;
  value: string | number;
  subValue?: string;
}) => (
  <div className="flex flex-col rounded-md border p-3 bg-muted/10">
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    <span className="text-lg font-semibold">{value}</span>
    {subValue && (
      <span className="text-[11px] text-muted-foreground">{subValue}</span>
    )}
  </div>
);

const ErrorBlock = ({ label, details }: { label: string; details: any }) => (
  <div className="text-sm text-red-600 space-y-1">
    <div>{label}</div>
    <details className="text-xs opacity-80">
      <summary className="cursor-pointer">Details</summary>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(details, null, 2)}
      </pre>
    </details>
  </div>
);

const RideReportSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
    </div>
  </div>
);

const DriverReportSkeleton = () => (
  <div className="grid gap-4">
    <Skeleton className="h-16" />
    <Skeleton className="h-16" />
    <Skeleton className="h-16" />
  </div>
);

const EarningsReportSkeleton = () => (
  <div className="grid gap-4">
    <Skeleton className="h-16" />
    <Skeleton className="h-16" />
    <Skeleton className="h-16" />
  </div>
);

export default ReportsOverview;

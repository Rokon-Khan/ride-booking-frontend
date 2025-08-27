/* eslint-disable @typescript-eslint/no-explicit-any */

/* ===================== Core Primitive & Helper Types ===================== */

export interface ILocationPoint {
  lat: number;
  lng: number;
  address?: string;
}

/**
 * User roles with backend constants.
 */
export type UserRole = "rider" | "driver" | "admin";

/**
 * User account status values.
 */
export type UserStatus = "active" | "blocked";

/**
 * Ride status values inferred from ride.interface.ts + typical flow.
 * If server can emit more states, append them here.
 */
export type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "canceled";

/* ===================== User (IUser) ===================== */

export interface IUserProfile {
  name: string;
  phone?: string;
  avatarUrl?: string | null;
  address?: string;
  // Allow backend-driven additional dynamic keys
  [key: string]: any;
}

export interface IUser {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  otpVersion: number;
  tokenVersion: number;
  role: UserRole;
  status: UserStatus;
  profile: IUserProfile;
  password?: string;
  [key: string]: any;
}

/* ===================== Driver (IDriver) ===================== */

export interface IDriverVehicle {
  model: string;
  licensePlate: string;
  // Extend if backend later adds: color, year, etc.
  [key: string]: any;
}

export interface IDriver {
  _id: string;
  user: string; // User ID referencing IUser
  approved: boolean;
  suspended: boolean;
  available: boolean;
  earnings: number;
  vehicle?: {
    licensePlate?: string;
    model?: string;
  };
  __v: number;
}

// Other types (IReport, IRide, etc.) remain unchanged

/* ===================== Ride (IRide) ===================== */

export interface IRideTimestamps {
  requested: string;
  accepted?: string;
  picked_up?: string;
  in_transit?: string;
  completed?: string;
  canceled?: string;
  [key: string]: any;
}

export interface IRide {
  _id: string;
  rider: string; // IUser _id
  driver?: string; // IDriver _id
  pickup: ILocationPoint;
  destination: ILocationPoint;
  status: RideStatus;
  timestamps: IRideTimestamps;
  fare: number;
  [key: string]: any;
}

/* ===================== Reports & Generic Responses ===================== */

export interface IReport<T = any> {
  summary: any;
  data: T;
  [key: string]: any;
}

export interface IResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: any;
  [key: string]: any;
}

/* ===================== Payload / DTO Types (Client Requests) ===================== */

export interface IRequestRidePayload {
  pickup: ILocationPoint;
  destination: ILocationPoint;
}

export interface IUpdateRideStatusPayload {
  status: Exclude<RideStatus, "requested">;
}

export interface ISetAvailabilityPayload {
  available: boolean;
}

export interface IFareEstimatePayload {
  pickup: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}

export interface INearbyDriversQuery {
  lat: number;
  lng: number;
  maxDistance?: number; // meters
}

/* ===================== Optional: Earnings History (If Implemented) =====================
   Backend driver.interface.ts only exposes aggregate 'earnings: number'.
   If API later provides per-ride earnings, define them here.
*/
export interface IEarningsHistoryEntry {
  rideId: string;
  amount: number;
  date: string; // ISO
  [key: string]: any;
}

/* ===================== Utility ===================== */

/**
 * Narrow helper to assert a string is a RideStatus at runtime (e.g., when consuming websockets)
 */
export const asRideStatus = (value: string): RideStatus => {
  const allowed: RideStatus[] = [
    "requested",
    "accepted",
    "picked_up",
    "in_transit",
    "completed",
    "canceled",
  ];
  if (allowed.includes(value as RideStatus)) return value as RideStatus;
  // Fallback (you can throw instead)
  return "requested";
};

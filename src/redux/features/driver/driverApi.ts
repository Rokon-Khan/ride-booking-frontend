/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuthHeader } from "@/lib/auth";
import type {
  IDriverVehicle,
  IResponse,
  IRide,
  ISetAvailabilityPayload,
  IUpdateRideStatusPayload,
} from "@/types/common";
import { baseApi } from "../../baseApi";

// Driver earnings aggregate
interface IDriverEarningsAggregate {
  earnings: number;
}

/**
 * Vehicle update payload – backend vehicle object is:
 * { model: string; licensePlate: string }
 * PATCH can be partial.
 */
type UpdateVehiclePayload = Partial<IDriverVehicle>;

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Driver availability
    setAvailability: builder.mutation<
      IResponse<{ available: boolean }>,
      ISetAvailabilityPayload
    >({
      query: (body) => ({
        url: "/drivers/availability",
        method: "PATCH",
        data: body,
        headers: withAuthHeader({ "Content-Type": "application/json" }),
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // Rides discoverable for driver
    availableRides: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/drivers/available-rides",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["RIDE"],
    }),

    // Accept a ride
    acceptRide: builder.mutation<IResponse<IRide>, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "RIDE", id: arg.rideId },
        "RIDE",
      ],
    }),

    // Reject a ride
    rejectRide: builder.mutation<IResponse<IRide>, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}/reject`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "RIDE", id: arg.rideId },
        "RIDE",
      ],
    }),

    // Update ride status (driver flow: picked_up, in_transit, completed, etc.)
    updateRideStatus: builder.mutation<
      IResponse<IRide>,
      { rideId: string; body: IUpdateRideStatusPayload }
    >({
      query: ({ rideId, body }) => ({
        url: `/rides/${rideId}/status`,
        method: "PATCH",
        data: body,
        headers: withAuthHeader({ "Content-Type": "application/json" }),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "RIDE", id: arg.rideId },
        "RIDE",
      ],
    }),

    // Current active ride for driver
    driverCurrentRide: builder.query<IResponse<IRide | null>, void>({
      query: () => ({
        url: "/rides/current",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: (result) =>
        result?.data?._id
          ? [{ type: "RIDE", id: result.data._id }, "RIDE"]
          : ["RIDE"],
    }),

    // Driver ride history
    driverRideHistory: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides/history",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["RIDE"],
    }),

    // Earnings aggregate (adjust if backend returns different structure)
    earningsAggregate: builder.query<IResponse<IDriverEarningsAggregate>, void>(
      {
        query: () => ({
          url: "/drivers/earnings",
          method: "GET",
          headers: withAuthHeader(),
        }),
        providesTags: ["DRIVER"],
      }
    ),

    // ================= Vehicle Endpoints =================

    // Get driver vehicle details
    vehicleDetails: builder.query<IResponse<IDriverVehicle>, void>({
      query: () => ({
        url: "/drivers/vehicle",
        method: "GET",
        headers: withAuthHeader(),
      }),
      transformResponse: (response: { vehicle: any }) => response.vehicle,
      providesTags: ["DRIVER"],
    }),

    // Update driver vehicle details
    updateVehicleDetails: builder.mutation<
      IResponse<IDriverVehicle>,
      { body: UpdateVehiclePayload }
    >({
      query: ({ body }) => ({
        url: "/drivers/vehicle",
        method: "PATCH",
        data: body,
        headers: withAuthHeader({ "Content-Type": "application/json" }),
      }),
      invalidatesTags: ["DRIVER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSetAvailabilityMutation,
  useAvailableRidesQuery,
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
  useDriverCurrentRideQuery,
  useDriverRideHistoryQuery,
  useEarningsAggregateQuery,
  useVehicleDetailsQuery,
  useUpdateVehicleDetailsMutation,
} = driverApi;

export default driverApi;

import { withAuthHeader } from "@/lib/auth";
import type { IRequestRidePayload, IResponse, IRide } from "@/types/common";
import { baseApi } from "../../baseApi";

const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation<IResponse<IRide>, IRequestRidePayload>({
      query: (body) => ({
        url: "/rides/request",
        method: "POST",
        data: body,
        headers: withAuthHeader({ "Content-Type": "application/json" }),
      }),
      invalidatesTags: ["RIDE", "DRIVER"],
    }),

    cancelRide: builder.mutation<IResponse<IRide>, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "RIDE", id: arg.rideId },
        "RIDE",
      ],
    }),

    rideHistory: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides/history",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((r) => ({ type: "RIDE" as const, id: r._id })),
              "RIDE",
            ]
          : ["RIDE"],
    }),

    currentRide: builder.query<IResponse<IRide | null>, void>({
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

    rideDetails: builder.query<IResponse<IRide>, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}`,
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: (_r, _e, arg) => [{ type: "RIDE", id: arg.rideId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRequestRideMutation,
  useCancelRideMutation,
  useRideHistoryQuery,
  useCurrentRideQuery,
  useRideDetailsQuery,
} = riderApi;

export default riderApi;

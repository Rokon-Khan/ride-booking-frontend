// import { withAuthHeader } from "@/lib/auth";
// import type { IRequestRidePayload, IResponse, IRide } from "@/types/common";
// import { baseApi } from "../../baseApi";

// const riderApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     requestRide: builder.mutation<IResponse<IRide>, IRequestRidePayload>({
//       query: (body) => ({
//         url: "/rides/request",
//         method: "POST",
//         data: body,
//         headers: withAuthHeader({ "Content-Type": "application/json" }),
//       }),
//       invalidatesTags: ["RIDE", "DRIVER"],
//     }),

//     cancelRide: builder.mutation<IResponse<IRide>, { rideId: string }>({
//       query: ({ rideId }) => ({
//         url: `/rides/${rideId}/cancel`,
//         method: "PATCH",
//         headers: withAuthHeader(),
//       }),
//       invalidatesTags: (_r, _e, arg) => [
//         { type: "RIDE", id: arg.rideId },
//         "RIDE",
//       ],
//     }),

//     rideHistory: builder.query<IResponse<IRide[]>, void>({
//       query: () => ({
//         url: "/rides/history",
//         method: "GET",
//         headers: withAuthHeader(),
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.data.map((r) => ({ type: "RIDE" as const, id: r._id })),
//               "RIDE",
//             ]
//           : ["RIDE"],
//     }),

//     currentRide: builder.query<IResponse<IRide | null>, void>({
//       query: () => ({
//         url: "/rides/current",
//         method: "GET",
//         headers: withAuthHeader(),
//       }),
//       providesTags: (result) =>
//         result?.data?._id
//           ? [{ type: "RIDE", id: result.data._id }, "RIDE"]
//           : ["RIDE"],
//     }),

//     rideDetails: builder.query<IResponse<IRide>, { rideId: string }>({
//       query: ({ rideId }) => ({
//         url: `/rides/${rideId}`,
//         method: "GET",
//         headers: withAuthHeader(),
//       }),
//       providesTags: (_r, _e, arg) => [{ type: "RIDE", id: arg.rideId }],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useRequestRideMutation,
//   useCancelRideMutation,
//   useRideHistoryQuery,
//   useCurrentRideQuery,
//   useRideDetailsQuery,
// } = riderApi;

// export default riderApi;

import { withAuthHeader } from "@/lib/auth";
import type { IRequestRidePayload, IRide } from "@/types/common";
import { baseApi } from "../../baseApi";

// NOTE: Your backend returns { ride: {...} } or { rides: [...] }.
// We'll transform responses so hooks directly give IRide or IRide[].

const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation<IRide, IRequestRidePayload>({
      query: (body) => ({
        url: "/rides/request",
        method: "POST",
        data: body,
        headers: withAuthHeader({ "Content-Type": "application/json" }),
      }),
      // Backend response: { ride: {...} }
      transformResponse: (raw: { ride: IRide }) => raw.ride,
      invalidatesTags: ["RIDE", "DRIVER", { type: "RIDE", id: "CURRENT" }],
    }),

    cancelRide: builder.mutation<IRide, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      transformResponse: (raw: { ride: IRide }) => raw.ride,
      invalidatesTags: (_r, _e, arg) => [
        { type: "RIDE", id: arg.rideId },
        "RIDE",
        { type: "RIDE", id: "CURRENT" },
      ],
    }),

    rideHistory: builder.query<IRide[], void>({
      query: () => ({
        url: "/rides/history",
        method: "GET",
        headers: withAuthHeader(),
      }),
      // Backend response: { rides: [...] }
      transformResponse: (raw: { rides: IRide[] }) => raw.rides ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map((r) => ({ type: "RIDE" as const, id: r._id })),
              "RIDE",
            ]
          : ["RIDE"],
    }),

    currentRide: builder.query<IRide | null, void>({
      query: () => ({
        url: "/rides/current",
        method: "GET",
        headers: withAuthHeader(),
      }),
      // Backend response: { ride: {...} } or { ride: null }
      transformResponse: (raw: { ride?: IRide | null }) =>
        raw.ride ? raw.ride : null,
      providesTags: (result) =>
        result?._id
          ? [
              { type: "RIDE", id: result._id },
              { type: "RIDE", id: "CURRENT" },
              "RIDE",
            ]
          : [{ type: "RIDE", id: "CURRENT" }, "RIDE"],
    }),

    rideDetails: builder.query<IRide, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}`,
        method: "GET",
        headers: withAuthHeader(),
      }),
      transformResponse: (raw: { ride: IRide }) => raw.ride,
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

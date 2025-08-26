import { withAuthHeader } from "@/lib/auth";
import type {
  IFareEstimatePayload,
  INearbyDriversQuery,
  IResponse,
  IUser,
} from "@/types/common";
import { baseApi } from "../../baseApi";

/**
 * NOTE: Postman shows fare estimate as GET with body.
 * Most servers & intermediaries ignore GET bodies. Prefer changing backend to POST or using query params.
 * Provided here as-is; ensure your baseQuery (axios) supports sending data on GET.
 */
const utilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findNearbyDrivers: builder.query<IResponse<IUser[]>, INearbyDriversQuery>({
      query: ({ lat, lng, maxDistance }) => {
        const params = new URLSearchParams({
          lat: String(lat),
          lng: String(lng),
        });
        if (maxDistance) params.append("maxDistance", String(maxDistance));
        return {
          url: `/location/nearby-drivers?${params.toString()}`,
          method: "GET",
          headers: withAuthHeader(),
        };
      },
      providesTags: ["DRIVER"],
    }),

    fareEstimate: builder.query<
      IResponse<{ estimatedFare: number; distance?: number }>,
      IFareEstimatePayload
    >({
      query: (body) => ({
        url: "/fare/estimate",
        method: "GET",
        data: body,
        headers: withAuthHeader({ "Content-Type": "application/json" }),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFindNearbyDriversQuery, useFareEstimateQuery } = utilityApi;

export default utilityApi;

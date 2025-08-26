import { withAuthHeader } from "@/lib/auth";
import type {
  IReport,
  IResponse,
  IRide,
  IUpdateRideStatusPayload,
  IUser,
} from "@/types/common";
import { baseApi } from "../../baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => ({
        url: "/users",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["ADMIN", "USER"],
    }),

    viewUser: builder.query<IResponse<IUser>, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: (_r, _e, arg) => [{ type: "USER", id: arg.userId }],
    }),

    blockUser: builder.mutation<IResponse<IUser>, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}/block`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "USER", id: arg.userId },
        "USER",
      ],
    }),

    unblockUser: builder.mutation<IResponse<IUser>, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}/unblock`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "USER", id: arg.userId },
        "USER",
      ],
    }),

    listAllDrivers: builder.query<IResponse<IUser[]>, void>({
      query: () => ({
        url: "/drivers",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["DRIVER"],
    }),

    approveDriver: builder.mutation<IResponse<IUser>, { driverId: string }>({
      query: ({ driverId }) => ({
        url: `/drivers/${driverId}/approve`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "DRIVER", id: arg.driverId },
        "DRIVER",
      ],
    }),

    suspendDriver: builder.mutation<IResponse<IUser>, { driverId: string }>({
      query: ({ driverId }) => ({
        url: `/drivers/${driverId}/suspend`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "DRIVER", id: arg.driverId },
        "DRIVER",
      ],
    }),

    reactivateDriver: builder.mutation<IResponse<IUser>, { driverId: string }>({
      query: ({ driverId }) => ({
        url: `/drivers/${driverId}/reactivate`,
        method: "PATCH",
        headers: withAuthHeader(),
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "DRIVER", id: arg.driverId },
        "DRIVER",
      ],
    }),

    listAllRides: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["RIDE"],
    }),

    viewRideById: builder.query<IResponse<IRide>, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}`,
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: (_r, _e, arg) => [{ type: "RIDE", id: arg.rideId }],
    }),

    updateRideStatusAdmin: builder.mutation<
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

    deleteRideAdmin: builder.mutation<IResponse<null>, { rideId: string }>({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}`,
        method: "DELETE",
        headers: withAuthHeader(),
      }),
      invalidatesTags: ["RIDE"],
    }),

    rideReports: builder.query<IResponse<IReport>, void>({
      query: () => ({
        url: "/reports/rides",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["REPORT"],
    }),

    userReports: builder.query<IResponse<IReport>, void>({
      query: () => ({
        url: "/reports/users",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["REPORT"],
    }),

    driverReports: builder.query<IResponse<IReport>, void>({
      query: () => ({
        url: "/reports/drivers",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["REPORT"],
    }),

    earningsReports: builder.query<IResponse<IReport>, void>({
      query: () => ({
        url: "/reports/earnings",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["REPORT"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListAllUsersQuery,
  useViewUserQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useListAllDriversQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useReactivateDriverMutation,
  useListAllRidesQuery,
  useViewRideByIdQuery,
  useUpdateRideStatusAdminMutation,
  useDeleteRideAdminMutation,
  useRideReportsQuery,
  useUserReportsQuery,
  useDriverReportsQuery,
  useEarningsReportsQuery,
} = adminApi;

export default adminApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { baseApi } from "@/redux/baseApi";
// import type { ILogin, IResponse, ISendOtp, IVerifyOtp } from "@/types";

// const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // User Registration
//     register: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/register",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     // Email Verification
//     verifyEmail: builder.mutation<IResponse<null>, IVerifyOtp>({
//       query: (userInfo) => ({
//         url: "/auth/verify-email",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     // Resend OTP
//     resendOtp: builder.mutation<IResponse<null>, ISendOtp>({
//       query: (userInfo) => ({
//         url: "/auth/resend-otp",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     // Login
//     login: builder.mutation<IResponse<null>, ILogin>({
//       query: (userInfo) => ({
//         url: "/auth/login",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     // Refresh Token
//     refreshToken: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/refresh-token",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     // Logout (needs access token)
//     logout: builder.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//       invalidatesTags: ["USER"],
//     }),

//     // Forgot Password
//     forgotPassword: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     // Reset Password
//     resetPassword: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/reset-password",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),
//     userInfo: builder.query({
//       query: () => ({
//         url: "/auth/me",
//         method: "GET",
//       }),
//       providesTags: ["USER"],
//     }),
//   }),
// });

// export const {
//   useRegisterMutation,
//   useVerifyEmailMutation,
//   useResendOtpMutation,
//   useLoginMutation,
//   useRefreshTokenMutation,
//   useLogoutMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
//   useUserInfoQuery,
// } = authApi;

// (Your original authApi can stay mostly the same, just reuse the helper.)
import { authToken, withAuthHeader } from "@/lib/auth";
import type { IResponse } from "@/types/common";
import { baseApi } from "../../baseApi";

/* Example auth types (adjust to your real ones) */
export interface ILogin {
  email: string;
  password: string;
}
export interface ISendOtp {
  email: string;
}
export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface IUpdateUser {
  [key: string]: any; // Flexible type for user updates
}

// Backend returns tokens at top-level (NOT nested in data)
export interface ILoginResponse {
  [x: string]: any;
  message: string;
  accessToken: string;
  refreshToken: string;
  role: "rider" | "driver" | "admin";
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    verifyEmail: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        data: body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    resendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        data: body,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    login: builder.mutation<ILoginResponse, ILogin>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
        headers: { "Content-Type": "application/json" },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // case 1: backend sends tokens at top-level
          const accessToken =
            (data as any).accessToken || data?.data?.accessToken;
          const refreshToken =
            (data as any).refreshToken || data?.data?.refreshToken;
          const role = (data as any).role || data?.data?.role;

          if (accessToken) authToken.setAccess(accessToken);
          if (refreshToken) authToken.setRefresh(refreshToken);
          if (role) authToken.setRole(role);
        } catch {
          // ignore
        }
      },

      invalidatesTags: ["USER"],
    }),

    // refresh token
    refreshToken: builder.mutation<IResponse<{ accessToken: string }>, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            authToken.setAccess(data.data.accessToken);
          }
        } catch {
          /* ignore */
        }
      },
    }),
    logout: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        headers: withAuthHeader(),
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          authToken.removeRefresh();
        }
      },
      invalidatesTags: ["USER"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    // single user details get
    userInfo: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        headers: withAuthHeader(),
      }),
      providesTags: ["USER"],
    }),

    // user profile update with patch
    updateMe: builder.mutation({
      query: (body) => ({
        url: "/auth/me",
        method: "PATCH",
        data: body,
        headers: withAuthHeader(),
      }),
      // Optimistic update
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        // Update cache optimistically
        const patchResult = dispatch(
          authApi.util.updateQueryData("userInfo", undefined, (draft: any) => {
            if (draft?.profile) {
              draft.profile.name = patch.name ?? draft.profile.name;
              draft.profile.phone = patch.phone ?? draft.profile.phone;
              draft.profile.avatarUrl =
                patch.avatarUrl ?? draft.profile.avatarUrl;
              draft.profile.address = patch.address ?? draft.profile.address;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
      invalidatesTags: ["USER"],
    }),

    // // user profile update with patch
    // updateMe: builder.mutation<IResponse<any>, IUpdateUser>({
    //   query: (body) => ({
    //     url: "/auth/me",
    //     method: "PATCH",
    //     data: body,
    //     headers: withAuthHeader({ "Content-Type": "application/json" }),
    //   }),
    //   async onQueryStarted(body, { dispatch, queryFulfilled }) {
    //     // Optimistic update
    //     const patchResult = dispatch(
    //       authApi.util.updateQueryData("userInfo", undefined, (draft) => {
    //         Object.assign(draft?.data || {}, body);
    //       })
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo(); // Revert on failure
    //     }
    //   },
    //   invalidatesTags: ["USER"],
    // }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUserInfoQuery,
  useUpdateMeMutation,
} = authApi;

export default authApi;

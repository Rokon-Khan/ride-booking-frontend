import Cookies from "js-cookie";

/**
 * Central place to read Token
 */
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const ROLE_KEY = "role";

export const authToken = {
  getAccess: () => Cookies.get(ACCESS_TOKEN_KEY),
  setAccess: (token: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      sameSite: "strict",
      secure: true,
      ...options,
    }),
  removeAccess: () => Cookies.remove(ACCESS_TOKEN_KEY),

  getRefresh: () => Cookies.get(REFRESH_TOKEN_KEY),
  setRefresh: (token: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      sameSite: "strict",
      secure: true,
      ...options,
    }),
  removeRefresh: () => Cookies.remove(REFRESH_TOKEN_KEY),

  // getRole: () => Cookies.get(ROLE_KEY),
  // setRole: (role: string) =>
  //   Cookies.set(ROLE_KEY, role, { sameSite: "strict" }),
  // removeRole: () => Cookies.remove(ROLE_KEY),

  clearAll: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(ROLE_KEY);
  },
};

/**
 * Returns headers with Authorization if token exists
 */
export const withAuthHeader = (headers: Record<string, string> = {}) => {
  const token = authToken.getAccess();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

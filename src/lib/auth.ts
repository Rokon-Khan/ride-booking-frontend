import Cookies from "js-cookie";

/**
 * Central place to read Token
 */
const ACCESS_TOKEN_KEY = "accessToken";

export const authToken = {
  get: () => Cookies.get(ACCESS_TOKEN_KEY),
  set: (token: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(ACCESS_TOKEN_KEY, token, { sameSite: "strict", ...options }),
  remove: () => Cookies.remove(ACCESS_TOKEN_KEY),
};

/**
 * Returns headers with Authorization if token exists
 */
export const withAuthHeader = (headers: Record<string, string> = {}) => {
  const token = authToken.get();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

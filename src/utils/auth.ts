import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import type { UserInfo } from "../redux/slices/auth/authSlice";

export const saveToken = (token: string): void => {
  Cookies.set("token", token);
};

export const saveRefreshToken = (refreshToken: string): void => {
  Cookies.set("refresh_token", refreshToken);
};

export const deleteToken = (): void => {
  Cookies.remove("token");
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get("refresh_token");
};

export const getUserInfo = (): UserInfo | null => {
  const token = Cookies.get("token");
  if (token === undefined) {
    return null;
  }
  const userInfo = jwtDecode<UserInfo>(token);
  if (userInfo === undefined) {
    return null;
  }
  return userInfo;
};

export const isTokenExpired = (token: string): boolean => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  if (exp === undefined) {
    return true;
  }
  const tokenExpired = Date.now() >= exp * 1000;
  const timeTillExpireInSeconds = (exp * 1000 - Date.now()) / 1000;
  console.log("timeTillExpire", timeTillExpireInSeconds);
  return tokenExpired;
};

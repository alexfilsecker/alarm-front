import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import type { UserInfo } from '../redux/slices/auth/authSlice';

export const saveToken = (token: string): void => {
  Cookies.set('token', token);
};

export const deleteToken = (): void => {
  Cookies.remove('token');
};

export const getUserInfo = (): UserInfo | null => {
  const token = Cookies.get('token');
  if (token === undefined) {
    return null;
  }
  const userInfo = jwtDecode<UserInfo>(token);
  if (userInfo === undefined) {
    return null;
  }
  return userInfo;
};

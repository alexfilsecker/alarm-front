import axios from 'axios';
import Cookies from 'js-cookie';

import type { AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
if (baseURL === undefined) {
  throw new Error('NEXT_PUBLIC_API_URL is undefined');
}

export const get = async <A, RT>(
  path: string,
  params: A,
  withToken = true,
): Promise<AxiosResponse<RT, any>> => {
  let token: string | undefined;
  if (withToken) {
    token = Cookies.get('token');
  }
  const url = `${baseURL}/${path}`;
  return await axios<RT>({
    method: 'GET',
    url,
    params,
    headers:
      token !== undefined
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
  });
};

export const post = async <A, RT>(
  path: string,
  body: A,
  withToken = true,
): Promise<AxiosResponse<RT, any>> => {
  let token: string | undefined;
  if (withToken) {
    token = Cookies.get('token');
  }
  const url = `${baseURL}/${path}`;
  return await axios<RT>({
    method: 'POST',
    url,
    data: body,
    headers:
      token !== undefined
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
  });
};

type NewTokenPayload = {
  newToken: string;
  newRefreshToken: string;
};

export const requestNewToken = async (refreshToken: string): Promise<void> => {
  const body = {
    refreshToken,
  };
  const url = `${baseURL}/auth/refresh`;
  const response = await axios.post<NewTokenPayload>(url, body);
  const { data } = response;
  Cookies.set('token', data.newToken);
  Cookies.set('refreshToken', data.newRefreshToken);
};

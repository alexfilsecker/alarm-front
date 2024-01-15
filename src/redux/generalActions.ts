import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getRefreshToken, getToken, isTokenExpired } from '../utils/auth';

import { get, post, requestNewToken } from './api';

import type { KnownError } from './knownError';
import type { AsyncThunk } from '@reduxjs/toolkit';

type Options = {
  withToken: boolean;
};

const defaultOptions: Options = {
  withToken: true,
};

const generateRequest = <RT = unknown, A = void>(
  method: 'get' | 'post' | 'patch' | 'put',
  path: string,
  options: Options = defaultOptions,
): AsyncThunk<RT, A, { rejectValue: KnownError }> => {
  const typePrefix = `${method.toUpperCase()}:${path}`;
  return createAsyncThunk<RT, A, { rejectValue: KnownError }>(
    typePrefix,
    async (params: A, thunkApi) => {
      if (options.withToken) {
        const token = getToken();
        if (token === undefined) {
          throw new Error('Token is undefined');
        }
        if (isTokenExpired(token)) {
          const refreshToken = getRefreshToken();
          if (refreshToken === undefined) {
            throw new Error('Refresh token is undefined');
          }
          await requestNewToken(refreshToken);
        }
      }
      try {
        switch (method) {
          case 'post':
            return (await post<A, RT>(path, params, options.withToken)).data;
          case 'get':
            return (await get<A, RT>(path, params, options.withToken)).data;
          default:
            return null as RT;
        }
      } catch (error: unknown) {
        if (!(error instanceof Error)) {
          return thunkApi.rejectWithValue({
            type: 'Unknown',
            message: 'Unknown error',
            status: 500,
          });
        }

        if (
          !(error instanceof AxiosError) ||
          error.response === undefined ||
          error.response.data === undefined ||
          error.response.data.error === undefined ||
          error.response.data.error.type === undefined ||
          typeof error.response.data.error.type !== 'string'
        ) {
          return thunkApi.rejectWithValue({
            type: 'Error',
            message: error.message,
            status: 500,
            stack: error.stack,
          });
        }

        const erroType = error.response.data.error.type;
        if (erroType === 'AuthError') {
          return thunkApi.rejectWithValue({
            type: erroType,
            message: error.response.data.error.message,
            status: error.response.data.error.status,
            errorIn: error.response.data.error.errorIn,
          });
        }

        return thunkApi.rejectWithValue({
          type: erroType,
          message: error.response.data.error.message,
          status: error.response.data.error.status,
          stack: error.response.data.error.stack,
        });
      }
    },
  );
};

export default generateRequest;

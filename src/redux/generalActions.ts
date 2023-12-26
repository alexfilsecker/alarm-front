import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import post from './api';

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
      try {
        switch (method) {
          case 'post':
            return (await post<A, RT>(path, params, options.withToken)).data;
          default:
            return null as RT;
        }
      } catch (error: unknown) {
        const returnError: KnownError = {
          type: 'Unknown',
          message: 'Unknown error',
          stack: 'No Stack',
          status: 500,
        };

        if (error instanceof Error) {
          returnError.type = 'Error';
          returnError.message = error.message;
          returnError.stack = error.stack;
          if (error instanceof AxiosError) {
            if (
              error.response?.data.error !== undefined &&
              error.response.data.error !== null
            ) {
              const recievedError = error.response.data.error;
              returnError.message = recievedError.message;
              returnError.status = error.response.status;
              returnError.stack = recievedError.stack;
            }
          }
        }
        return thunkApi.rejectWithValue(returnError);
      }
    },
  );
};

export default generateRequest;

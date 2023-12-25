import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import post from './api';

const generateRequest = <RT = unknown, A = void>(
  method: 'get' | 'post' | 'patch' | 'put' | 'postRefresh',
  path: string,
): AsyncThunk<RT, A, { rejectValue: string }> => {
  const typePrefix = `${method.toUpperCase()}:${path}`;
  return createAsyncThunk<RT, A, { rejectValue: string }>(
    typePrefix,
    async (params: A, thunkApi) => {
      try {
        switch (method) {
          case 'post':
            return (await post<A, RT>(path, params)).data;
          default:
            return null as RT;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Unknown error');
      }
    },
  );
};

export default generateRequest;

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import post from './api';

const generateRequest = <RT = unknown, A = void>(
  method: 'get' | 'post' | 'patch' | 'put' | 'postRefresh',
  path: string,
): AsyncThunk<RT, A, { rejectValue: unknown }> => {
  const typePrefix = `${method.toUpperCase()}:${path}`;
  return createAsyncThunk<RT, A, { rejectValue: unknown }>(
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
        return thunkApi.rejectWithValue(error);
      }
    },
  );
};

export default generateRequest;

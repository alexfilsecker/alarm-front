import { createSlice } from '@reduxjs/toolkit';

import peneAction from './peneActions';

const initialState = {
  loadingPene: false,
  sucsessfulPene: false,
};

const peneSlice = createSlice({
  name: 'pene',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(peneAction.pending, (state) => {
      state.loadingPene = true;
    });
    builder.addCase(peneAction.fulfilled, (state) => {
      state.loadingPene = false;
    });
    builder.addCase(peneAction.rejected, (state) => {
      state.loadingPene = false;
    });
  },
});

const peneReducer = peneSlice.reducer;
export default peneReducer;

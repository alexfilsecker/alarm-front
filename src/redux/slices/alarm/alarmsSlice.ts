import { createSlice } from '@reduxjs/toolkit';

import { getAlarms } from './alarmsAction';

type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type DayAlarm = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export type Alarms = {
  [day in WeekDay]: DayAlarm;
};

type AlarmState = {
  alarms: Alarms | null;
  loadingAlarms: boolean;
  alarmsErrorMessage: string | null;
};

const initialState: AlarmState = {
  alarms: null,
  loadingAlarms: false,
  alarmsErrorMessage: null,
};

const alarmsSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAlarms.pending, (state) => {
      state.loadingAlarms = true;
      state.alarmsErrorMessage = null;
    });
    builder.addCase(getAlarms.fulfilled, (state, action) => {
      state.alarms = action.payload;
      state.loadingAlarms = false;
      state.alarmsErrorMessage = null;
    });
    builder.addCase(getAlarms.rejected, (state, action) => {
      state.loadingAlarms = false;
      if (action.payload !== undefined) {
        state.alarmsErrorMessage = action.payload.message;
      }
    });
  },
});

const alarmsReducer = alarmsSlice.reducer;
export default alarmsReducer;

import { createSlice } from '@reduxjs/toolkit';

import { getAlarms } from './alarmsAction';

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type DayAlarm = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export type Alarms = {
  [day in WeekDay]: DayAlarm;
};

type AlarmState = {
  clientAlarms: Alarms | null;
  serverAlarms: Alarms | null;
  loadingAlarms: boolean;
  alarmsErrorMessage: string | null;
};

const initialState: AlarmState = {
  clientAlarms: null,
  serverAlarms: null,
  loadingAlarms: false,
  alarmsErrorMessage: null,
};

const alarmsSlice = createSlice({
  name: 'alarm',
  initialState,

  reducers: {
    changeEnabledDayAlarm(
      state,
      { payload }: { payload: { day: WeekDay; enabled: boolean } },
    ) {
      if (state.clientAlarms !== null) {
        state.clientAlarms[payload.day].enabled = payload.enabled;
      }
    },

    changeStartTimeDayAlarm(
      state,
      { payload }: { payload: { day: WeekDay; startTime: string } },
    ) {
      if (state.clientAlarms !== null) {
        state.clientAlarms[payload.day].startTime = payload.startTime;
      }
    },

    changeEndTimeDayAlarm(
      state,
      { payload }: { payload: { day: WeekDay; endTime: string } },
    ) {
      if (state.clientAlarms !== null) {
        state.clientAlarms[payload.day].endTime = payload.endTime;
      }
    },
  },

  extraReducers(builder) {
    builder.addCase(getAlarms.pending, (state) => {
      state.loadingAlarms = true;
      state.alarmsErrorMessage = null;
    });
    builder.addCase(getAlarms.fulfilled, (state, action) => {
      state.clientAlarms = { ...action.payload };
      state.serverAlarms = { ...action.payload };
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

export const { changeEnabledDayAlarm } = alarmsSlice.actions;

const alarmsReducer = alarmsSlice.reducer;
export default alarmsReducer;

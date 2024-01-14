import { Button, Paper } from '@mui/material';
import { useEffect, type ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/state';
import { getAlarms } from '../redux/slices/alarm/alarmsAction';
import {
  resetAlarms,
  type Alarms,
  type WeekDay,
} from '../redux/slices/alarm/alarmsSlice';

import DayAlarmSetup from './DayAlarmSetup';

const deepEqual = (a: Alarms, b: Alarms): boolean => {
  for (const day of Object.keys(a)) {
    if (
      a[day as WeekDay].enabled !== b[day as WeekDay].enabled ||
      a[day as WeekDay].startTime !== b[day as WeekDay].startTime ||
      a[day as WeekDay].endTime !== b[day as WeekDay].endTime
    ) {
      return false;
    }
  }
  return true;
};

const AlarmSetup = (): ReactNode => {
  const { serverAlarms, clientAlarms, loadingAlarms, alarmsErrorMessage } =
    useAppSelector((state) => state.alarm);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAlarms());
  }, [dispatch]);

  if (loadingAlarms) {
    return <div className="flex justify-center my-10">Loading...</div>;
  }

  if (alarmsErrorMessage !== null) {
    return (
      <div className="flex justify-center my-10">{alarmsErrorMessage}</div>
    );
  }

  if (clientAlarms === null || serverAlarms === null) {
    return <div className="flex justify-center my-10">No alarms set</div>;
  }

  const handleReset = (): void => {
    dispatch(resetAlarms());
  };

  const equalAlarms = deepEqual(clientAlarms, serverAlarms);

  return (
    <Paper elevation={11} className="p-5 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        {Object.entries(clientAlarms).map(([day, dayAlarm]) => (
          <DayAlarmSetup key={day} day={day as WeekDay} dayAlarm={dayAlarm} />
        ))}
      </div>
      <div className="flex justify-end gap-5">
        <Button disabled={equalAlarms} onClick={handleReset}>
          Reset
        </Button>
        <Button disabled={equalAlarms} variant="contained">
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default AlarmSetup;

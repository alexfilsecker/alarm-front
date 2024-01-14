import { Checkbox, FormControlLabel, Grid, Paper } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { type ChangeEvent, type ReactNode } from 'react';

import { useAppDispatch } from '../hooks/state';
import {
  type WeekDay,
  type DayAlarm,
  changeEnabledDayAlarm,
} from '../redux/slices/alarm/alarmsSlice';
import { spanishDays } from '../utils/spanishDays';

type DayAlarmSetupProps = {
  day: WeekDay;
  dayAlarm: DayAlarm;
  // setAlarmEnabled: (day: WeekDay, enabled: boolean) => void;
};

const DayAlarmSetup = ({
  day,
  dayAlarm,
  // setAlarmEnabled,
}: DayAlarmSetupProps): ReactNode => {
  const dispatch = useAppDispatch();

  const handleChangeEnabled = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): void => {
    dispatch(changeEnabledDayAlarm({ day, enabled: checked }));
  };

  const [startHour, startMinutes] = dayAlarm.startTime.split(':').map(Number);
  const [endHour, endMinutes] = dayAlarm.endTime.split(':').map(Number);

  return (
    <Paper className="p-2" elevation={1}>
      <Grid container columns={24} columnSpacing={2}>
        <Grid item xs={6} className="flex items-center">
          <FormControlLabel
            label={spanishDays[day]}
            control={<Checkbox />}
            onChange={handleChangeEnabled}
            className="pl-5"
            checked={dayAlarm.enabled}
          />
        </Grid>
        <Grid item xs={9}>
          <TimePicker
            ampm={false}
            value={dayjs().set('hour', startHour).set('minute', startMinutes)}
          />
        </Grid>
        <Grid item xs={9}>
          <TimePicker
            ampm={false}
            value={dayjs().set('hour', endHour).set('minute', endMinutes)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DayAlarmSetup;

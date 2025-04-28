import API from '.';

export type Day =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

interface AlarmInfo {
	start: number;
	end: number;
}

export type ReturnAlarms = Record<Day, AlarmInfo>;

export const getAlarms = async (): Promise<ReturnAlarms | null> => {
	try {
		const alarms = await API.get<ReturnAlarms>('alarms', null);
		return alarms;
	} catch (e) {
		console.error(e);
		return null;
	}
};

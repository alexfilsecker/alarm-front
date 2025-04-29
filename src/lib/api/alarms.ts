import API from '.';

export type Day =
	| 'MONDAY'
	| 'TUESDAY'
	| 'WEDNESDAY'
	| 'THURSDAY'
	| 'FRIDAY'
	| 'SATURDAY'
	| 'SUNDAY';

export const orderedDays: Day[] = [
	'MONDAY',
	'TUESDAY',
	'WEDNESDAY',
	'THURSDAY',
	'FRIDAY',
	'SATURDAY',
	'SUNDAY'
];

export interface AlarmInfo {
	start: number;
	end: number;
	enabled: boolean;
}

export type Alarms = Record<Day, AlarmInfo>;

export const getAlarms = async (): Promise<Alarms | null> => {
	try {
		const alarms = await API.get<Alarms>('alarms', null);
		return alarms;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const updateAlarms = async (body: Alarms): Promise<void> => {
	try {
		await API.put('alarms', body);
	} catch (e) {
		console.error(e);
	}
};

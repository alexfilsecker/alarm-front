import API from '.';

interface ReturnAlarms {
	[day: string]: { start: number; end: number };
}

export const getAlarms = async (): Promise<ReturnAlarms | null> => {
	try {
		const alarms = await API.get<ReturnAlarms>('alarms', null);
		return alarms;
	} catch (e) {
		console.error(e);
		return null;
	}
};

import { timeCharToInt } from './timeCharToInt';

const getLocalTimestamp = () => {
	const now = new Date();
	const utcTimestamp = now.getTime();
	const timezoneOffsetMinutes = now.getTimezoneOffset();
	const localTimestamp = utcTimestamp - timezoneOffsetMinutes * 60 * 1000;
	return localTimestamp;
};

export const shiftSeries = (allPoints: number[][], timeRange: string) => {
	const numberTimeRange = timeCharToInt(timeRange);
	if (numberTimeRange === null) {
		console.error('timeRange is not valid');
		return;
	}

	const now = getLocalTimestamp();
	const latestTimestamp = now - numberTimeRange;

	for (let i = 0; i < allPoints.length; i += 1) {
		const time = allPoints[i][0];
		if (time < latestTimestamp) {
			allPoints.splice(i, 1);
		} else {
			break;
		}
	}
};

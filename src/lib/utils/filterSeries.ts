interface Options {
	min: number;
	max: number;
}

const MAX_POINTS_IN_CHART = 100;

const totime = (time: number) => {
	const date = new Date(time);

	const day = date.getUTCDay();
	const hour = date.getUTCHours();
	const minute = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();
	const miliseconds = date.getUTCMilliseconds();

	return `${day} ${hour}:${minute}:${seconds}.${miliseconds}`;
};

const getRanges = (allPoints: number[][], min: number, max: number) => {
	let begin: number | null = null;
	let end: number | null = null;
	for (let i = 0; i < allPoints.length; i += 1) {
		const time = allPoints[i][0];
		if (begin === null && time >= min) {
			begin = i;
		}
		if (end === null && time >= max) {
			end = i;
		}
		if (begin !== null && end !== null) {
			break;
		}
	}

	if (begin === null) {
		throw new Error('begin is null');
	}
	if (end === null) {
		end = allPoints.length - 1;
	}

	return {
		begin,
		end,
		count: end - begin + 1
	};
};

export const filterSeries = (allPoints: number[][], options?: Options): number[][] => {
	let min = allPoints[0][0];
	let max = allPoints[allPoints.length - 1][0];
	if (options !== undefined) {
		min = options.min;
		max = options.max;
	}

	const { begin, end, count } = getRanges(allPoints, min, max);

	const filtered: number[][] = [];
	const maskSize = Math.ceil(count / MAX_POINTS_IN_CHART);

	let readSum = 0;
	let timeSum = 0;
	let counter = 0;

	for (let i = begin; i < end; i += 1) {
		timeSum += allPoints[i][0];
		readSum += allPoints[i][1];
		counter += 1;
		if (counter === maskSize) {
			filtered.push([timeSum / counter, readSum / counter]);
			timeSum = 0;
			readSum = 0;
			counter = 0;
		}
	}

	if (counter !== 0) {
		filtered.push([timeSum / counter, readSum / counter]);
	}

	return filtered;
};

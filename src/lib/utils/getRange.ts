export const getRange = (allPoints: number[][]) => {
	return {
		min: allPoints.reduce((acc, point) => Math.min(acc, point[1]), Infinity),
		max: allPoints.reduce((acc, point) => Math.max(acc, point[1]), -Infinity)
	};
};

import API from '.';

export const getGraph = async (): Promise<number[][]> => {
	const response = await API.get<{ points: number[][] }>('graphs', null);
	const points = response.points.sort((a, b) => a[0] - b[0]);
	return points;
};

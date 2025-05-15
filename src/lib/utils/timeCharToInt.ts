const conversions = {
	s: 1000,
	m: 60 * 1000,
	h: 60 * 60 * 1000,
	d: 60 * 60 * 24 * 1000
};

export const timeCharToInt = (timeStr: string): number | null => {
	const index = timeStr.search(/[smhd]/);
	if (index === -1) return null;
	const numbers = Number(timeStr.slice(0, index));
	const unit = timeStr[index];
	if (unit in conversions) {
		const unitKey = unit as keyof typeof conversions;
		return numbers * conversions[unitKey];
	}
	return null;
};

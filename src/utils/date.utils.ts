export const getInputDateFormat = (date: string) =>
	date.split('.').reverse().join('-');

export const getDefaultDateRange = () => {
	const today = new Date();
	const [day, month, year] = today
		.toLocaleString('ru')
		.split(', ')[0]
		.split('.');

	const startDate = new Date(+year, +month - 1, 1);

	return {
		startDate: getInputDateFormat(
			startDate.toLocaleString('ru').split(', ')[0]
		),
		lastDate: getInputDateFormat(`${year}-${month}-${day}`),
	};
};

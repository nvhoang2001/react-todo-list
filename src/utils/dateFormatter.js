export default function dateFormatter(date) {
	const inpDate = new Date(date);
	const formatOptions = { year: "numeric", month: "long", day: "numeric" };

	return new Intl.DateTimeFormat("en-UK", formatOptions).format(inpDate);
}

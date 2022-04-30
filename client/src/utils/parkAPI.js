export const getParks = () => {
	return fetch(
		`https://developer.nps.gov/api/v1/parks?parkCode=*&api_key=Jr6zOui9Hu7ZmMbUrgJjjcmzZo1V3MtNgv9WL9Jt`
	).then((res) => res.json());
};

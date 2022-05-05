export const getParks = () => {
	return fetch(
		`https://developer.nps.gov/api/v1/parks?parkCode=*&api_key=`
	).then((res) => res.json());
};

export const getPark = (query) => {
	return fetch(
		`https://developer.nps.gov/api/v1/parks?parkCode=${query}&api_key=Jr6zOui9Hu7ZmMbUrgJjjcmzZo1V3MtNgv9WL9Jt`
	);
};

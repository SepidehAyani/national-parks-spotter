const baseUrl = "https://developer.nps.gov/api/v1/";
const API_KEY = "tFvbGk7MUVgMtAtfrFjmUMwlUk5MeulMuDhn4amF";
const headers = {
  headers: {
    "X-API-KEY": API_KEY,
  },
};

export const getFavoriteParks = async (favArray) => {
  let fullUrl = `${baseUrl}parks?parkCode=${favArray}`;
  try {
    let parksData = await fetch(fullUrl, headers).then((res) => res.json());
    return parksData;
  } catch (error) {
    console.log(error);
  }
};

export const getOnePark = async (parkCode) => {
  let fullUrl = `${baseUrl}parks?parkCode=${parkCode}`;
  try {
    let parkData = await fetch(fullUrl, headers).then((res) => res.json());
    return parkData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllParks = async () => {
  let fullUrl = `${baseUrl}parks?limit=466`;
  try {
    let parksData = await fetch(fullUrl, headers).then((res) => res.json());
    return parksData;
  } catch (error) {
    console.log(error);
  }
};

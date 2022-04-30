const baseUrl = 'https://developer.nps.gov/api/v1/';
const API_KEY = process.env.REACT_APP_API_KEY;
const headers = {
  headers: {
    'X-API-KEY': API_KEY,
  },
};

export const getFavoriteParks = async favArray => {
  
  let fullUrl = `${baseUrl}parks?parkCode=${favArray}`
  try {
    let parksData = await fetch(fullUrl, headers).then(res => res.json());
    return parksData;
  } catch (error) {
    console.log(error)
  }
}
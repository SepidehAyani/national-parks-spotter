import { useState, useEffect } from 'react';
import { getFavoriteParks } from '../utils/apiCalls';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const [parksList, setParksList] = useState([]);

  async function loadParks(favParksArray) {
    const parksData = await getFavoriteParks(favParksArray);
    setParksList(parksData.data);
    console.log('parksList loaded', parksData.data);
  }

  useEffect(() => {
    if (data) {
      if (data.me.favoriteParks.length) {
        loadParks(data.me.favoriteParks);      
      }
    }
  }, [data]);

  return (
    <div>
      {parksList.length ? (parksList.map(park => (
        <p key={park.parkCode}>{park.fullName}</p>
      ))) : (<h1>no parks to display</h1>)}
    </div>
  )
};

export default Dashboard;
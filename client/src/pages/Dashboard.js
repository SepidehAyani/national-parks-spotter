import { useState, useEffect } from 'react';
import { getFavoriteParks } from '../utils/apiCalls';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { data } = useQuery(QUERY_ME);

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
      {parksList.length ? (
        <>
          <h2 id='dashboard-header'>Your Favorite Parks</h2>
          <ImageList sx={{ aspectRatio: 1 / 1 }}>
            {parksList.map((park) => (
              <ImageListItem key={park.parkCode}>
                <img
                  src={`${park.images[0].url}?w=248&fit=crop&auto=format`}
                  srcSet={`${park.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={park.fullName}
                  loading="lazy"
                />
                <Link to={`/park/${park.parkCode}`}>
                  <ImageListItemBar
                    title={park.fullName}
                    subtitle={park.states}
                  />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : (
        <h1>no parks to display</h1>
      )}
    </div>
  );
};

export default Dashboard;
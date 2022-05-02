import { Typography, Grid, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';
// import { parksData } from "../utils/parkdata";
import { getOnePark } from '../utils/apiCalls';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../utils/mutations';
import Auth from '../utils/auth'

import { useEffect, useState } from 'react';

const SinglePark = () => {
  const { id } = useParams();

  const [park, setPark] = useState( {} );
  const [addFavorite, { data, loading, error }] = useMutation(ADD_FAVORITE);

  async function clickHandler() {
    console.log('fav button clicked');
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log('token is ', token);
    if (!token) {
      return false;
    }
    console.log('park to save is ', id);

    try {
      await addFavorite({
        variables: { parkCode: id}
      });
    } catch(err) {
      console.log(error);
    }

  }

  useEffect(() => {
    async function loadPark(id) {
      console.log('api call happening')
      let parkData = await getOnePark(id)
      setPark(parkData.data[0]);
    }
    loadPark(id);
  }, [])

  return (
    <>
      {park.fullName ? (
      <>
        {/*Park title*/}{' '}
        <Typography variant="h3" className="park_title">
          {park.fullName}{' '}
        </Typography>
        {/*Park description and addresses section*/}{' '}
        <Grid container spacing={7}>
          {' '}
          <Grid item xs>
            {' '}
            <Grid container>
              <Typography>{park.description}</Typography>{' '}
            </Grid>{' '}
            <Grid container>
              {' '}
              <Grid item>
                <Typography>Address</Typography>{' '}
              </Grid>{' '}
              <Grid item>
                <Typography>Contact Info</Typography>
                <ListItem>PhoneNumber: </ListItem>
                <ListItem>Email: </ListItem>{' '}
              </Grid>{' '}
            </Grid>{' '}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={6}></Grid>{' '}
        </Grid>
        <button onClick={clickHandler}>Add to Favorite Parks</button>
      </>
      ) : (
        <h2>park data not loaded</h2>
      )}
    </>
  );
};

export default SinglePark;
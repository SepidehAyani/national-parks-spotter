import { Typography, Grid, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';
// import { parksData } from "../utils/parkdata";
import { getOnePark } from '../utils/apiCalls';

import { useEffect, useState } from 'react';

const SinglePark = () => {
  const { id } = useParams();

  const [park, setPark] = useState( {} );

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
      </>
      ) : (
        <h2>park data not loaded</h2>
      )}
    </>
  );
};

export default SinglePark;
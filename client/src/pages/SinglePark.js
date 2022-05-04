import {
  Typography,
  Grid,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useParams } from "react-router-dom";
// import { parksData } from "../utils/parkdata";
import { getOnePark } from "../utils/apiCalls";
import ImageGallery from "../components/ImageGallery";
import CommentForm from '../components/CommentForm'

import { useEffect, useState } from "react";
import Auth from '../utils/auth';
import { ADD_FAVORITE, ADD_COMMENT } from '../utils/mutations';
import { QUERY_ME, QUERY_COMMENTS } from '../utils/queries'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';


const SinglePark = () => {
  const [commentDialog, setCommentDialog] = useState(false);
  const { id } = useParams();

  const { data: myData, loading: loadingMe } = useQuery(QUERY_ME);
  const [hasPark, setHasPark] = useState(false)

  const [park, setPark] = useState({});
  const [addFavorite, { data, loading, error }] = useMutation(ADD_FAVORITE);

  const { data: commentData, loading: commentLoading } = useQuery(QUERY_COMMENTS, {
    variables: { parkCode: id }
  });
  const [comments, setComments] = useState('');

  const [refetchComments, { loadingRefetch, dataRefetch }] = useLazyQuery(QUERY_COMMENTS, {
    variables: { parkCode: id }
  });

  useEffect(() => {
    async function loadPark(id) {
      let parkData = await getOnePark(id);
      setPark(parkData.data[0]);
    }
    loadPark(id);
  }, []);

  useEffect(() => {
    if (myData) {
      if (myData.me.favoriteParks.includes(id)) {

        setHasPark(true);
      }
    }
  }, [myData]);

  useEffect(() => {
    if (commentData) {
      setComments(commentData.comments);
    }
  }, [commentData]);


  async function favHandler() {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      document.location = '/login';
      return false;
    }

    try {
      await addFavorite({
        variables: { parkCode: id }
      })
    } catch (error) {
      console.log(error);
    }

  }

  function dateFormat(createdAt) {
    const date = new Date(parseInt(createdAt));
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    return `${month} / ${day} / ${year}`;
  }


  return (
    <>
      {park.fullName ? (
        <>
          {/*Park title*/}{' '}
          <Typography variant="h3" className="park_title">
            <span>{park.fullName} </span>
            <span>
              {!hasPark ? (
                <Button
                  variant="h3"
                  className="park_title"
                  onClick={favHandler}
                >
                  Add To Favorite{' '}
                </Button>
              ) : (
                <p>Favorited</p>
              )}
            </span>
          </Typography>
          {/*Park description and addresses section*/}{' '}
          <Grid container spacing={7}>
            {' '}
            <Grid item xs>
              {' '}
              <Grid container>
                <Typography>{park.description}</Typography>{' '}
              </Grid>{' '}
              <Grid container className="section">
                {' '}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={6}
                  className="section_title"
                >
                  <Typography className="section_title_text">
                    <span>Address</span>
                  </Typography>{' '}
                  <ListItem>{park.addresses[0].line1} </ListItem>
                  <ListItem>{park.addresses[0].city} </ListItem>
                  <ListItem>{park.addresses[0].stateCode} </ListItem>{' '}
                  <ListItem>{park.addresses[0].postalCode} </ListItem>{' '}
                </Grid>{' '}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={6}
                  className="section_title"
                >
                  <Typography className="section_title_text">
                    Contact Info
                  </Typography>
                  <ListItem>
                    Email: {park.contacts.emailAddresses[0].emailAddress}
                  </ListItem>{' '}
                  <ListItem>
                    PhoneNumber: {park.contacts.phoneNumbers[0].phoneNumber}{' '}
                  </ListItem>
                </Grid>{' '}
              </Grid>{' '}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6}>
              {' '}
              <ImageGallery images={park.images} />{' '}
              <Button onClick={() => setCommentDialog(park)}>
                Read all Comments
              </Button>{' '}
            </Grid>{' '}
          </Grid>
          {/* Comment Dialog */}
          {comments[0] ? (
            <Dialog
              open={commentDialog}
              onClose={() => setCommentDialog(false)}
              className="commentDialog"
              maxWidth={'xl'}
            >
              <DialogTitle
                onClose={() => setCommentDialog(false)}
                className="projectDialog_title"
              >
                Comments
              </DialogTitle>
              <Paper style={{ padding: '40px 20px' }}>
                {comments.map((comment) => (
                  <DialogContent>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar alt="Remy Sharp" />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: 'left' }}>
                          {comment.userId.username}
                        </h4>
                        <p style={{ textAlign: 'left' }}>
                          {comment.commentText}
                        </p>
                        <p style={{ textAlign: 'left', color: 'gray' }}>
                          {dateFormat(comment.createdAt)}
                        </p>
                      </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
                  </DialogContent>
                ))}
              </Paper>

              <DialogActions className="projectDialog_actions"></DialogActions>
            </Dialog>
          ) : (
            <Dialog
              open={commentDialog}
              onClose={() => setCommentDialog(false)}
              className="commentDialog"
              maxWidth={'xl'}
            >
              <DialogTitle
                onClose={() => setCommentDialog(false)}
                className="projectDialog_title"
              >
                No comments for this park
              </DialogTitle>
              <DialogActions className="projectDialog_actions"></DialogActions>
            </Dialog>
          )}
        </>
      ) : (
        <h2>park data not loaded</h2>
      )}

      {myData && (
        <CommentForm
          myData={myData}
          id={id}
          comments={comments}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default SinglePark;

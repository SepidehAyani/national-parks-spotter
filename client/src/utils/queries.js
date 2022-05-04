import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($id: ID) {
    user(_id: $id) {
      _id
      username
      email
      password
      comments {
        commentText
        createdAt
        parkCode
      }
      favoriteParks
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query Comments($parkCode: String) {
    comments(parkCode: $parkCode) {
      _id
      commentText
      createdAt
      parkCode
      userId {
        username
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  {
    _id
    username
    email
    password
    favoriteParks
    comments {
      _id
      commentText
      createdAt
      parkCode
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      comments {
        _id
        commentText
        createdAt
        reactions {
          _id
          reactionBody
          username
          createdAt
        }
        parkCode
      }
      favoriteParks
    }
  }
`;
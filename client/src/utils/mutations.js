import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!, $parkCode: String!) {
    addComment(commentText: $commentText, parkCode: $parkCode) {
      commentText
      createdAt
      userId {
        _id
        username
      }
      parkCode
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($parkCode: String!) {
    addFavorite(parkCode: $parkCode) {
      _id
      username
      email
      favoriteParks
    }
  }
`;

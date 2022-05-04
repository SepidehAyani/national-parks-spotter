const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    comments: [Comment]
    favoriteParks: [String]
  }

  type Park {
    _id: ID
    fullName: String!
    parkCode: String
    description: String!
    latitude: String
    longitude: String
    activities: [String]
    images: [String]
    addresses: [String]
  }

  type Comment {
    _id: ID
    commentText: String!
    createdAt: String
    userId: User!
    reactions: [Reaction]
    parkCode: String!
  }

  type Reaction {
    _id: ID
    reactionBody: String!
    username: String!
    createdAt: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    user(_id: ID): User
    users: [User]
    parks: [Park]
    park(_id: ID!): Park
    comments(parkCode: String): [Comment]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(commentText: String!, parkCode: String!): Comment
    addFavorite(parkCode: String!): User
  }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    comments: [Comment]
    favoriteParks: [Park]
  }

  type Park {
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
    commentText: String!
    createdAt: String
    username: String!
    reactions: [Reaction]
    parkCode: String!
  }

  type Reaction {
    reactionBody: String!
    username: String!
    createdAt: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    parks: [Park]
    park(_id: ID!): Park
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(_id: ID!, commentText: String!, parkCode: String!): Comment
    favoriteParks(_id: ID!, parkCode: String!): User
  }
`;

module.exports = typeDefs;
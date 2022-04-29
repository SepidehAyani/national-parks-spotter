const { AuthenticationError } = require('apollo-server-express');
const { User, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('this is the ME from context', context.user);

      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })

        console.log('this is the user data returned', userData);
        return userData.populate('comments');
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async() => {
      return await User.find().populate('comments');
    },
    user: async(parent, args, context) => {
      return await User.findById(context.user._id).populate('comments');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addComment: async(parent, args, context) => {
      console.log('user context from addComment', context.user);
      if (context.user) {
        const commentData = {
          ...args,
          userId: context.user._id
        }
        console.log('comment data from addComment', commentData);
        const comment = await Comment.create(commentData);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { comments: comment._id}
        });

        return comment;
      }

      throw new AuthenticationError('Not logged in');
    },
    addFavorite: async(parent, { parkCode }, context) => {
      const user = await User.findByIdAndUpdate(context.user._id, {
        $push: { favoriteParks: parkCode}
      });

      return user.populate('comments');
    }
  }
};

module.exports = resolvers;
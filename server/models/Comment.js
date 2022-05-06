const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: "You need to leave a comment!",
      minlength: 1,
      maxlength: 280,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: [reactionSchema],
    parkCode: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

commentSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(
	{
		commentText: {
			type: String,
			required: "You need to leave a comment!",
			minlength: 1,
			maxlength: 280
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: timestamp => dateFormat(timestamp)
		},
		username: {
			type: String,
			required: true
		},
		reactions: [reactionSchema]
	},
	{
		toJSON: {
			getters: true
		}
	}
);

commentSchema.virtual("reactionCount").get(function() {
	return this.reactions.length;
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

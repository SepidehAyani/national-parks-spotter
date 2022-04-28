const { Schema } = require("mongoose");

const parkSchema = new Schema({
	fullName: {
		type: String
	},
	parkCode: {
		type: String
	},
	description: {
		type: String,
		required: true
	},
	latitude: {
		type: String
	},
	longitude: {
		type: String
	},
	activities: [
		{
			type: String
		}
	],
	states: {
		type: String
	},
	images: [
		{
			type: String
		}
	],
	addresses: [
		{
			type: String
		}
	]
});

module.exports = parkSchema;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	creation: {
		dateCreated: String,
		timeCreated: String,
	},
	description: String,
	author: String,
	content: String,
	edited: Boolean,
	likeCount: Number,
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
/* eslint-disable */

const express = require('express');

const app = express();
const postRoutes = express.Router();

const Post = require('../models/posts');

// Get all posts
postRoutes.route('/').get((req, res) => {
	Post.find({}, (error, posts) => {
		if (error) {
			console.error(error);
		}
		res.send({
			success: true,
			message: "All posts successfully retreived",
			posts: posts,
		});
	}).sort({ _id: -1 });
});

// Get a single post
postRoutes.route('/:id').get((req, res) => {
	var db = req.db;
	Post.findById(req.params.id, function (error, post) {
		if (error) { console.error(error); }
		res.send({
			success: true,
			message: "Successfully retreived a single post",
			post: post,
		});
	});
});

// Add a post
postRoutes.route('/add').post((req, res) => {
	var db = req.db;
	var title = req.body.title;
	var currentDate = new Date();
	var dateCreated = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
	var timeCreated = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	var content = req.body.content;
	var likes = 0;
	var new_post = new Post({
		title: title,
		creation: {
			dateCreated: dateCreated,
			timeCreated: timeCreated,
		},
		description: req.body.description,
		author: req.body.author,
		content: content,
		edited: false,
		likeCount: likes,
	});
	new_post.save(function (error) {
		if (error) {
			console.log(error);
			res.status(500).send({
				success: false,
				message: 'Error: Post was not saved',
			});
			return
		}
		res.send({
			success: true,
			message: 'Post saved successfully!',
		});
	});
});

// Update a post
postRoutes.route('/update/:id').put((req, res) => {
	var db = req.db;
	Post.findById(req.params.id, function (error, post) {
		if (error) { console.error(error); }
		post.title = req.body.title;
		post.author = req.body.author;
		post.description = req.body.description;
		post.content = req.body.content;
		post.likeCount = req.body.likeCount;
		post.edited = true;
		post.save(function (error) {
			if (error) {
				console.log(error);
				res.status(500).send({
					success: false,
					message: 'Error: Post was not saved',
				});
				return
			}
			res.send({
				success: true,
				message: 'Post updated successfully!',
			});
		});
	});
});

// Delete a post
postRoutes.route('/delete/:id').delete((req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function (err, post) {
		if (err)
			res.send(err)
		res.send({
			success: true,
			message: 'Post deleted successfully!',
		});
	});
});

module.exports = postRoutes;
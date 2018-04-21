const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

/*-------------
 Set up MongoDB
--------------*/
var Post = require('../models/posts');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoose connection error"));
db.once("open", function (callback) {
	console.log("mongoose connection succeeded");
});

/*-----------------------
 Set up API using Express
------------------------*/
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


/*-----------------
 Set up API routes
------------------*/
// Get ALL posts from db
app.get('/posts', (req, res) => {
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

// Fetch single post
app.get('/post/:id', (req, res) => {
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

// Update a post
app.put('/posts/:id', (req, res) => {
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

// Save Post to db
app.post('/posts', (req, res) => {
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

// Delete a post
app.delete('/posts/:id', (req, res) => {
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


var port = process.env.PORT || 8081;
app.listen(port, () => console.log('Server listening on port ' + port));
/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

/*-------------
 Set up MongoDB
--------------*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/posts');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error'));
db.once('open', function (callback) {
	console.log('mongoose connection succeeded');
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const postRoutes = require('./expressRouter/postRoutes');
app.use('/posts', postRoutes);


var port = 8081;
app.listen(port, () => console.log('Server listening on port ' + port));
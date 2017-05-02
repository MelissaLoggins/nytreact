//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//Require Article Schema
var Article = require('./models/Article.js');

//Create Express Instance
var app = express();
var PORT = process.env.PORT || 3000; 

//App.use's
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application.vnd.api+json'}));

app.use(express.static('./public'));

//MongoDB Config
mongoose.connect("localhost:27017/nytreact");
var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongoose Error: ', err);
});

db.once('open', function(){
	console.log("Mongoose connection successful.");
});

//Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/nyt.html');
});

//Get route to show the users save articles. 
app.get('/api/', function(req, res){
	//Finds all the articles 
	Article.find({})
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.send(doc);
		}
	})
});

//Post route to save the users articles. 
app.post('/api/', function(req, res){
	var newSearch = new Article(req.body);
	console.log("BODY: "+req.body);

	Article.create({"title": req.body.title, "date": Date.now(), "url":req.body.url}, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send("Saved search with title "+req.body.title);
		}
	})
});

//listener
app.listen(PORT, function(){
	console.log("Listening on port: "+PORT);
});
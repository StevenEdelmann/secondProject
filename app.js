//dependencies
var sqlite3 = require('sqlite3').verbose(); //need this so that I can use its methods.
var db = new sqlite3.Database('data.db'); //pull in the data from data.db.
var fs = require('fs');
var express = require('express');
var app = express();
var ejs = require('ejs');
var port = 3000;

//middleware:
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedbodyparser = bodyparser.urlencoded({extended: false}); //Still don't fully understand what this is.
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(port, function(){
	console.log("Listening on port ", port);
});


//routes and shizzz
app.get('/', function(req, res){ //root, it's the forum homepage, list of all the subforums

	db.all("SELECT * FROM subforum", function(error, rows){
		if (error){
			console.log(error);
		}
		else{
			var home = fs.readFileSync('./views/forum.html', "utf8");
			var rendered = ejs.render(home, {rows: rows});
			res.send(rendered);
		}
	});

}); //end of app.get('/');

app.get('/subforum/:id', function(req, res){ //subforum, list of all the threads
	var id = req.params.id; //req.params is the route string.
    var html = fs.readFileSync('./views/subforum.html', 'utf8');

	db.all("Select * FROM thread WHERE thread.subforum_id=?", id, function(error, rows){ //get all the threads with subforum id's.
		if (error){
			console.log(error);
		}
		else{
            var render = ejs.render(html, {rows: rows});
            res.send(render);    
		}

	});

	app.post("/thread", function(req, res){
		var newThread = req.body; //grabs all the stuff from the form in "/views/posts.html".

		db.get("INSERT INTO thread (title, creator, subforum_id) Values (?, ?, ?)", newThread.title, newThread.creator, newThread.subforumID, function(error, rows){
			if(error){ console.log(error) };
		});


		res.redirect("/");
	}); //end of app.post(/posts).

}); //end of app.get("subforums/id")

//This is the route that gets the specific threads inside the subforums
app.get('/thread/:id', function(req, res){
	var id = req.params.id; 
	var html = fs.readFileSync('./views/thread.html', 'utf8');

	db.all("SELECT * FROM posts WHERE posts.thread_id=?", id, function(error, rows){
		if (error){
			console.log(error);
		}
		else{
			console.log(rows);
		    var rendered = ejs.render(html, {rows: rows});
	        res.send(rendered);    
		}
	
	});

	app.post("/posts", function(req, res){
		var newPost = req.body; //grabs all the stuff from the form in "/views/posts.html".

		db.get("INSERT INTO posts (poster, content, thread_id) Values (?, ?, ?)", newPost.poster, newPost.content, newPost.threadID, function(error, rows){
			if(error){ console.log(error) };
		});


		res.redirect("/");
	}); //end of app.post(/posts).

});

//grabs the page where user makes new posts.
app.get("/posts", function(req, res){
	var html = fs.readFileSync("./views/posts.html", "utf8");
	res.send(html);
});

app.get("/newThread", function(req, res){
	var html = fs.readFileSync("./views/newThread.html", "utf8");
	res.send(html);
});
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

});

//grabs the page where user makes new posts.
app.get("/posts", function(req, res){
	var html = fs.readFileSync("./views/posts.html", "utf8");
	res.send(html);
});

//updates the posts table with the new post.
app.post("/post", function(req, res){
	var newPost = req.body; //grabs all the stuff from the form in "/views/posts.html".

	db.get("INSERT INTO posts (poster, content) Values (?, ?)", newPost.poster, newPost.content, function(error, rows){
		if(error){ console.log(error) };
	});

	res.redirect("/");
}); //end of app.post(/posts).



// app.post("/thread/:id", function(req, res){
// 	var id = req.params.id;
// 	var html = fs.readFileSync('./views/thread.html', 'utf8');

// 	db.get("SELECT * FROM posts WHERE posts.thread_id=?", id, function(error, rows){
// 		var myPosts = rows;
// 		var temp = rows;
// 		var render = ejs.render(html, {temp: posts, myPosts: myPosts});
// 	    res.send(render);    

//     });	
// });
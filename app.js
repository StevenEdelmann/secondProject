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

	db.all("Select * FROM thread WHERE thread.subforum_id=?", id, function(error, rows){ //get all the subforum id's.
		if (error){
			console.log(error);
		}
		else{
            var html = fs.readFileSync('./views/subforum.html', 'utf8');
            var render = ejs.render(html, {rows: rows});
            res.send(render);    
		}

    });

}); //end of app.get("subforums/id")

//this is supposed to show all the posts in a thread.
app.post('/subforum/:id', function(req, res){}); 
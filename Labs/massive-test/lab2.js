var Massive=require("massive");
var express = require("express");
var app = express();
var http = require('http');
var db = Massive.connectSync({db : 'pgguide'});

var id;

app.set('db', "pgguide");
http.createServer(app).listen(8080);


// Part 1
// List all the users

app.get('/users', function(req, res) {
	db.run("Select * from users",function(err, r) {
		res.send(r);
	});
});



// Part 2
//GET /users/:id
app.get('/users/:id', function(req, res) {
	var id = req.params.id; 
	db.users.find({id: id}, function (err, result) {
		res.send(result)
	});
});



// Part 3
// GET /products

// app.get('/products', function(req, res) {
// 	db.run("Select * from products",function (err, result) {
// 		res.send(result);
// 	});
// });


// Part 4
// GET /products/:id

app.get('/products/:id', function(req, res) {
	var id = req.params.id; 
	db.products.find({id: id}, function (err, result) {
		res.send(result)
	});
});


// Part 5
// GET /purchases

app.get('/purchases', function(req, res) {
	db.run("Select * from purchases",function (err, result) {
		res.send(result);
	});
});


// Part 6
// GET /products/:id
app.get('/purchases/:id', function(req, res) {
	var id = req.params.id; 
	db.purchases.find({id: id}, function (err, result) {
		res.send(result)
	});
});


// prduct names query search
// for injection of sql, use the below 
// use 'drop table product 
app.get('/products', function(req, res) {
	var title = req.query.title; 
	console.log(title);
	db.products.find({title: title}, function (err, result) {
		res.send(result)
	});
	
});

// prduct names safe paramertised query 
app.get('/products/secure1/:title', function(req, res) {
	var title = req.params.title; 

	db.run("Select * from products where title = $1",[title],function (err, result) {
		res.send(result);
	});


});


// Using a stored procedure using SQL or PLPGSQL whichever you prefer
app.get('/products/secure2/:title', function(req, res) {
	var title = req.params.title; 

	db.find_products([title], (error, result) => {
	    res.send(result);
	 });
});







var express = require('express');   //require express to be runned
var app = express();  //app is express
var port = 3000;
app.set('view engine', 'ejs');  //tell to look into views
app.use(express.static(__dirname + '/')); //tell the system in which directory it will find the static files

const fastify = require('fastify')({  //import fastify
  logger: true
})

const MongoConnect = require("./connector/mongodb");

var async = require('async'); //import async
var Web3 = require('web3'); //import web3

var webController = require('./views/webController');
const { getLatestBlock } = require('./views/webController');


//set default route
app.get("/", async function (req, res) {
  res.render("home");
  setInterval(() => getLatestBlock(), 1000);    //call method to get latest block -> intern: store data into mongodb
  setInterval(() => MongoConnect.getData(), 1000);     //TEST
});

app.get("/info", function (req, res) {
  res.render("info");    //render close page
})

app.listen(port, function () {
  console.log("Server is running on port: " + port);
})



// import cookieParser
const cookieParser = require('cookie-parser');

// use the express library
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.set('view engine', 'ejs');

// visitorID
let nextVisitorId = 1;

//const {encode} = require('html-entitles');

//const date = new Date();

// The main page of our website
//app.get('/', (req, res) => {
  //res.cookie('visited', Date.now().toString());
  //res.render('welcome', {
    //name: req.query.name || "World",
  //});

app.get('/', (req, res) => {
  let clockText = "";
  if(Object.keys(req.cookies).length == 0){
    res.cookie('visitorId', nextVisitorId++);
    res.cookie('visited', Date.now().toString());
    clockText = "You have never visited!";

}else{
  // calculate seconds difference from when user revisits page
  let seconds = Math.round(((new Date().getTime() - new Date(req.cookies['visited']).getTime()) / 1000), 0);
  clockText = "You last visited "+ seconds + " seconds ago.";
  res.cookie('visited', new Date().toString());

}
res.render('welcome', {
  name: "World!",
  date: new Date().toLocaleString(),
  id: nextVisitorId,
  clock: clockText,
  });
});
  //});
  //const name = req.query.name || "World";

  //res.send(`
    //<!DOCTYPE html>
    //<html lang="en">
      //<head>
        //<meta charset="UTF-8" />
        //<title>An Example Title</title>
        //<link rel="stylesheet" href="app.css">
      //</head>
      //<body>
        //<h1>Hello, ${name}!</h1>
        //<p>HTML is so much better than a plain string!!!</p>
      //</body>
    //</html>
  //`);

// Start listening for network connections
app.listen(port);
//app.use(express.static('public'));
//app.set('view engine', 'ejs');
//app.use(cookieParser());

// Printout for readability
console.log("Server Started!");
//console.log(req.headers.cookie)
//console.log(req.cookies)
//console.log(date.toLocaleString('en-US'));
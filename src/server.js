// import cookieParser
const cookieParser = require('cookie-parser');

// use the express library
const express = require('express');

//add import
const fetch = require('node-fetch');

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

//app.get("/trivia", (req, res) => {
  //res.send('TODO');
//});  

//app.get("/trivia", async (req, res) => {
  // fetch the data
  //const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // interpret the body as json
  //const content = await response.json();

  // TODO: make proper html
  //const format = JSON.stringify(content, 2);

  // respond to the browser
  // TODO: make proper html
  //res.send(JSON.stringify(content, 2));
//});

app.get("/trivia", async (req, res) => {

  // fetch the data
  const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // fail if bad response
  if (!response.ok) {
    res.status(500);
    res.send(`Open Trivia Database failed with HTTP code ${response.status}`);
    return;
  }

  // interpret the body as json
  const content = await response.json();

  const format = JSON.stringify(content, 2);

  const correctAnswer = content.results[0].correct_answers;
  const answers = content.results[0].incorrect_answers;
  answers.push(correctAnswer);

  // fail if db failed
  //if (data.response_code !== 0) {
    //res.status(500);
    //res.send(`Open Trivia Database failed with internal response code ${data.response_code}`);
    //return;
  //}

  //Shuffle Answers Array using random function 
  answers.sort(() => Math.random() - 0.5)

  const answerLinks = answers.map(answer=> {
    return `<a href="javascript:alert('${
      answer === correctAnswer ? 'Correct!' : 'Incorrect, Please Try Again!'
    }')">${answer}</a>`
  });

  // respond to the browser
  // TODO: make proper html
  //res.send(JSON.stringify(content, 2));

  res.render('trivia', {
    category: content.results[0].category,
    difficulty: content.results[0].difficulty,
    question: content.results[0].question,
    answers: answers,
    answerLinks: answerLinks,
  });
});

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

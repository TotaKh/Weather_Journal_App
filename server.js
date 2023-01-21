// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

// Setup Server
const server = app.listen(port, listening);
function listening(){
  // console.log(server);
  console.log(`running on localhost:${port}`);
};


// GET route
app.get('/all', sendData);

function sendData (req,res) {
  console.log(projectData);//
  res.send(projectData);
};

// POST routen
app.post('/add', addData);

function addData(req,res){
  newData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content
  }
  projectData = newData;
  res.send(projectData);
  console.log(projectData);//

};
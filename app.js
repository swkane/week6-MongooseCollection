const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = 'mongodb://localhost:27017/albumdb';
mongoose.connect(url);
const MongoClient = require('mongodb').MongoClient;
const Album = require('./models/album');
const bodyParser = require('body-parser');
const qs = require('qs');
const addRecordController = require('./controllers/add-record');
const deleteRecordController = require('./controllers/delete-record');

// Mustache Boiler Plate
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Link static sheets - css/client-side js
app.use(express.static('public'));

// addRecordController
app.use('/add', addRecordController);
app.use('/delete', deleteRecordController);

// Get info from Mongo
app.get('/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Connected to Server!");
    let albums = db.collection('albums');
    albums.find().toArray()
    .then(function(docs) {
      console.log(docs);
      res.render('index', {records: docs});
    });
    db.close();
  });
});

// app.get('/', function(req, res) {
//   res.send('Hello');
// });

app.listen(3000, function() {
  console.log("Rockin' and a Rollin'");
})


//!! Everytime you run this code it will add the same doc to the collection. Use as template
// var album = new Album({name: "Torches", artist: "Foster The People", albumInfo: {yearReleased: 2012, numberOfTracks: 3}});
// album.trackNames.push('Pumped Up Kicks');
// album.trackNames.push('Helena Beat');
// album.trackNames.push('Life on a Nickel');
// album.save()
//   .then(function() {
//     // actions to take on success
//     db.albums.insertOne(album);
//   })
//   .catch(function() {
//     console.log("Nice Try Brah");
//     // action to take on error
//   });

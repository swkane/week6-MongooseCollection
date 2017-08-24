const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const qs = require('qs');
const Album = require('../models/album');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/albumdb';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//TODO: Get this function to render the selected album in the edit view

router.get("/:name", function(req, res) {
  MongoClient.connect(url, function(err ,db) {
    Album.findOne({name: req.params.name}).then(function(docs) {
      console.log(docs);
      res.render("edit", docs);
    });
    db.close();
  });
});

router.post("/:name/edit-record", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("You TRIED to UPDATE");
    Album.updateOne({name: req.params.name}, {$set: {
      name: req.body.album,
      artist: req.body.artist,
      albumInfo: {yearReleased: req.body.year, numberOfTracks: req.body.totalTracks}
    }}, {$push: {trackNames: req.body.trackNames}})
    .then(function() {
      console.log("You UPDATED");
      res.redirect("/");
      db.close();
    });
  });
});

// app.get('/:_id', function(req, res) {
//   MongoClient.connect(url, function(err, db) {
//     console.log("Connected to Edit!");
//     let albums = db.collection('albums');
//     albums.find().toArray()
//     .then(function(docs) {
//       console.log(docs);
//       res.render('index', {records: docs});
//     });
//     db.close();
//   });




// router.post("/:_id" ,function(req, res) {
//   // console.log("You tried to add a record!");
//   // var album = new Album({name: req.body.album, artist: req.body.artist, albumInfo: {yearReleased: req.body.year, numberOfTracks: req.body.totalTracks}});
//   // album.trackNames.push(req.body.tracks);
//   // // album.trackNames.push('Helena Beat');
//   // // album.trackNames.push('Life on a Nickel');
//   // album.save()
//   //   .then(function() {
//   //     // actions to take on success
//   //     console.log("User Added Success");
//   //     db.albums.insertOne(album);
//   //   })
//   //   .catch(function() {
//   //     console.log("User Added Record Error");
//   //     // action to take on error
//   //   });
//   // res.redirect('/');
// });

module.exports = router;

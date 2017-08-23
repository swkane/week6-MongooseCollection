const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const qs = require('qs');

const Album = require('../models/album');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = 'mongodb://localhost:27017/albumdb';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.post("/" ,function(req, res) {
  console.log("You tried to add a record!");
  var album = new Album({name: req.body.album, artist: req.body.artist, albumInfo: {yearReleased: req.body.year, numberOfTracks: req.body.totalTracks}});
  album.trackNames.push(req.body.tracks);
  // album.trackNames.push('Helena Beat');
  // album.trackNames.push('Life on a Nickel');
  album.save()
    .then(function() {
      // actions to take on success
      console.log("User Added Success");
      db.albums.insertOne(album);
    })
    .catch(function() {
      console.log("User Added Record Error");
      // action to take on error
    });
  res.redirect('/');
});


  module.exports = router;

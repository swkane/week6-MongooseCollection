const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const qs = require('qs');
const MongoClient = require('mongodb').MongoClient;

const Album = require('../models/album');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = 'mongodb://localhost:27017/albumdb';

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));


router.get("/:_id" ,function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("You tried to delete a record!");
    Album.deleteOne({_id: req.params._id})
    .then(function() {
      res.redirect('/');
    });
    db.close();
    console.log("You DELETED!");
  });
});


  module.exports = router;

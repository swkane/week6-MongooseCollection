const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {type: String, require: true, unique: true},
  artist: String,
  trackNames: [String],
  albumInfo: {yearReleased: Number, numberOfTracks: Number}
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;

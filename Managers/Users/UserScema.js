const mongoose = require('mongoose');
  const moment = require("moment")
  const { Schema } = mongoose;

  module.exports.UserSchema = new Schema({
    id:  String, // String is shorthand for {type: String}
    username: String,
    xp:   Number,
    level: Number,
    daily: Date,
    currency: Number
  });
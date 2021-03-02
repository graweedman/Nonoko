const mongoose = require('mongoose');
  const moment = require("moment")
  const { Schema } = mongoose;

  module.exports.ItemSchema = new Schema({
    id:  String, // String is shorthand for {type: String}
    name: String,
    value: Number,
    emoji: String,
    type: {name:String, item:String}
  });
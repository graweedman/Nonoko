const mongoose = require('mongoose');
  const moment = require("moment")
  const { Schema } = mongoose;

  module.exports.ShopSchema = new Schema({
    MessageID:  String, // String is shorthand for {type: String}
    name: String,
    items: [{name:String}]
  });
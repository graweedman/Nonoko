const mongoose = require('mongoose');
  const moment = require("moment")
  const { Schema } = mongoose;

  module.exports.ActionsSchema = new Schema({
    action:  String, 
    gifs: [ String ],
    responses: {default_res:String, mentioned_res:String}
  });
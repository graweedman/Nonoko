const mongoose = require('mongoose');
const { connect } = require("../../config.json")
const connection = mongoose.createConnection(connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const { ShopSchema } = require("./ShopSchema")

const ShopModel = connection.model('Shops', UserSchema, "Shops")





const channelID = "816014825292300318"
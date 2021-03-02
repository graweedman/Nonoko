const path = require("path")
const fs = require('fs')

module.exports = (type, args) => {

    let { callback } = require(`./Types/${type}`)

    return callback(args)
}
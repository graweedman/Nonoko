const fs = require('fs')
const Action = require('../ActionsManager')


module.exports = {
    subcommand: "add",
    description: "Adds a new Action to the database, Previous respinse will be overwritten if response is provided. only action and gif is required if array is needed to be enlargened",
    syntax: "`add <action> <Gif-link> <response(optional)> <mentioned response(optional)>`",
    callback: (arguments, message) => 
    {
        const {channel} = message
        let action = {}
        action.name = arguments[1].toLowerCase()
        action.gif = arguments[2]
        if(!action.name || !action.gif || !validURL(action.gif) )
        {
            channel.send(`correct sytax:\n${module.exports.syntax} `)
            return
        }
        action.default = arguments[3]
        action.mentioned = arguments[4]

        Action.add(action)
    }
}
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
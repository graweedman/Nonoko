const fs = require('fs')


module.exports = {
    subcommand: "add",
    description: "Adds a new Action to the database, Previous respinse will be overwritten if response is provided. only action and gif is required if array is needed to be enlargened",
    syntax: "`add <action> <Gif-link> <response(optional)> <mentioned response(optional)>`",
    callback: (arguments, message) => 
    {
        const {channel} = message
        const action = arguments[1].toLowerCase()
        const gif = arguments[2]
        if(!action || !gif || !validURL(gif) )
        {
            channel.send(`correct sytax:\n${module.exports.syntax} `)
            return
        }
        const Default = arguments[3]
        const mentioned = arguments[4]
        const addAction = (err, json) =>
        {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }
            const actions = JSON.parse(json)
            if(!actions[action])
            {
                actions[action] = { gif:[], response:{default:null} }
            }
            if(!actions[action]["gif"].includes(gif))
            {
                actions[action]["gif"].push(gif)
            }
            if(Default) actions[action]["response"]["default"] = Default

            if(mentioned) actions[action]["response"].mentioned = mentioned

            

            fs.writeFile("./Loaders/Actions/Actions.json",JSON.stringify(actions,null, 2), (err) =>
            {
                if (err) console.log('Error writing file:', err)
                channel.send(`Action ${action} added with gif. ${(Default ? ` With Main response "${Default}".`: "")} ${(mentioned ? ` With mentioned response "${mentioned}".`: "")}`)
            } )
        }
        fs.readFile("./Loaders/Actions/Actions.json", "utf8", addAction)


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
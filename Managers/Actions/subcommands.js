const path = require("path")
const fs = require('fs')



module.exports.Action = (subcommand ,arguments, message) =>
{
    const {channel} = message
    console.log(subcommand)
    //let suboption = (subcommand ? require(`./SubCommands/${subcommand}`) : subcommand)
    try {
        var suboption = require(`./SubCommands/${subcommand}`);
        suboption.callback(arguments, message)
    } catch (ex) {
        let reply = `Supported sub-commands\n\n`
        
        const readCommands = (dir) => {
            const files = fs.readdirSync(path.join(__dirname, dir))
            for(const file of files)
            {
                const option = require(path.join(__dirname, dir, file))
                reply += `> **${option.subcommand}** = ${option.description}\n`
            }
            channel.send(reply)
        }
        readCommands("./SubCommands")
    }    
}
const { MessageEmbed } = require('discord.js')
const fs = require('fs')

module.exports = {
    slash: "both",
    commands: ["Catalog"],
    expectedArgs: "<mode> <Role>",
    permissionError: "You do not have required permissions",
    description: "Gives every member ar role",
    requiredRoles: [],
    minArgs: 0,
    maxArgs: null,
    callBack: ({message, arguments, text}) => {  
        const {channel} = message
        //console.log(arguments[0])
        const listActions = (err, json) =>
        {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }
            let embed = {}
            let description = ""
            const actions = JSON.parse(json)
            embed = new MessageEmbed({
                title: "List of Actions"
            })
            for(const [key, value] of Object.entries(actions))
            {
                description += `**${key}** gifs: ${value["gif"].length}.\n`
            }
            embed.setDescription(description)
            channel.send(embed)
            return  
        }
        fs.readFile("./Loaders/Actions/Actions.json", "utf8", listActions)

    }

}

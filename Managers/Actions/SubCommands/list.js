const { MessageEmbed } = require('discord.js')
const fs = require('fs')


module.exports = {
    subcommand: "list",
    description: "Lists all defined actions. Parameters can be used to see gif list for certain action",
    syntax: "`list <action(optional)>`",
    callback: (arguments, {channel}) => 
    {
        const action = arguments[1]
        const mode = arguments[2]

        const listActions = (err, json) =>
        {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }
            let embed = {}
            const actions = JSON.parse(json)
            
            if(!action){
                embed = new MessageEmbed({
                    title: "List of Actions"
                })
            for(const [key, value] of Object.entries(actions))
                {
                    embed.addField(key , `gifs: ${value["gif"].length} | responses: default-"${value["response"].default}"${(value["response"].mentioned ? ` | mentioned-"${value["response"].mentioned}"` : ".")}`)
                }
                channel.send(embed)
                return
            }
            if(!actions[action])
            {
                channel.send("Action doesnt exist.")
                return
            }
            embed = new MessageEmbed({
                title: `List of Gifs for \`${action}\``
            })
            actions[action]["gif"].forEach(gif =>
                {
                    embed.addField("\u200b", gif)
                })
            channel.send(embed)
        }
        fs.readFile("./Loaders/Actions/Actions.json", "utf8", listActions)


    }
}
const { MessageEmbed } = require('discord.js')
const Action = require('../ActionsManager')


module.exports = {
    subcommand: "list",
    description: "Lists all defined actions. Parameters can be used to see gif list for certain action",
    syntax: "`list <action(optional)>`",
    callback: (arguments, {channel}) => 
    {
        const action = arguments[1]

        const listActions = (err, actions) =>
        {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }
            let embed = {}
            
            if(!action){
                embed = new MessageEmbed({
                    title: "List of Actions"
                })
                actions.forEach(action =>{
                    embed.addField(
                        action.action,
                        `gifs: ${action.gifs.length} | responses: default-"${action.responses.default_res}"${(action.responses.mentioned_res ? ` | mentioned-"${action.responses.mentioned_res}"` : ".")}`
                        )
                })
                
                channel.send(embed)
                return
            }

            embed = new MessageEmbed({
                title: `List of Gifs for \`${action}\``
            })
            let Action = actions.find(element => element.action === action)
            if(Action)
            {
                Action.gifs.forEach(gif =>
                    {
                        embed.addField("\u200b", gif)
                    })
                    channel.send(embed)
            }
            
        }

        Action.actions(listActions)


    }
}
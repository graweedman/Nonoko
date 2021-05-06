const fs = require('fs')
const Chance = require('chance')
const Cooldown = new Set();
const { prefix } = require("../../config.json");
const { MessageEmbed } = require('discord.js');
const Action = require('../../Managers/Actions/ActionsManager')

//this is the main Action loader where bot calls this function to fetch an action from the Actions.json file
module.exports = (client, dev) =>
{
    client.on("message", message => 
    {
        const {content, author} = message
        if(dev && author.id !== "272697254165348353")return

        if(content.toLowerCase().startsWith(`${prefix}!`)) //checks message which statts with prefix and "!" executing action
        {
            let actionLine = content.split(' ')
            let action = actionLine[0].substr(prefix.length+1)
            action = action.toLowerCase()
            if(Cooldown.has(message.author.id))
            {
                message.channel.send("Wait 5 seconds before using another Action.")
                return
            }
            const readAction = (error, action) => 
            {
                if(action)
                {
                    let chance = new Chance()
                    if(action.gifs.length)
                    {
                        let rng = chance.integer({min:0, max:action.gifs.length-1})
                        let actionGif = action.gifs[rng]
                        let response =  action.responses.default_res
                            if(message.mentions.members.first())
                            {
                                response = `${(action.responses.mentioned_res? action.responses.mentioned_res : response )} ${message.mentions.members.first().displayName}`
                            }
                            
                            message.channel.send(`${(response ? response : "Action!")}`) 
                            
                            message.channel.send(`${actionGif}`)
                    }
                }
            }
            console.log(Action)
            Action.action(action, readAction)
            Cooldown.add(author.id);
                    setTimeout(() => {
                        // Removes the user from the set after 5 seconds
                        Cooldown.delete(author.id);
                        }, 5000);

        }
    })
}
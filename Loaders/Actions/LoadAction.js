const fs = require('fs')
const Chance = require('chance')
const Cooldown = new Set();
const { prefix } = require("../../config.json");
const { MessageEmbed } = require('discord.js');


module.exports = (client, dev) =>
{
    client.on("message", message => {
        const {content, author} = message
        if(dev && author.id !== "272697254165348353")return

        if(content.toLowerCase().startsWith(`${prefix}!`))
            {
                let actionLine = content.split(' ')
                let action = actionLine[0].substr(prefix.length+1)
                action = action.toLowerCase()
                if(Cooldown.has(message.author.id))
                {
                    message.channel.send("Wait 5 seconds before using another Action.")
                    return
                }
                const readAction = (err, json) => {
                    if (err) {
                        console.log("Error reading file from disk:", err)
                        return
                    }
                    const actions = JSON.parse(json) //reads json and converts it into javascript object
                    if(actions[action]) //check if the requested action exists
                    {
                        let chance = new Chance()
                        if(actions[action]["gif"].length) // checks if action has enough links
                        {
                            let rng = chance.integer({min:0, max:actions[action]["gif"].length-1})

                            //randomizes and finds the gif in the array
                            let actionGif = actions[action]["gif"][rng] 

                            // Not mentioned response
                            let response =  actions[action]["response"]["default"]
                            if(message.mentions.members.first())
                            {
                                response = `${(actions[action]["response"]["mentioned"]? actions[action]["response"]["mentioned"] : response )} ${message.mentions.members.first().displayName}`
                            }
                            
                            message.channel.send(`${(response ? response : "Action!")}`) 
                            
                            message.channel.send(`${actionGif}`)
                        }  
                    }
                    if(author.id == "779996172793544735" || author.id == "272697254165348353")return
                    Cooldown.add(author.id);
                    setTimeout(() => {
                        // Removes the user from the set after 5 seconds
                        Cooldown.delete(author.id);
                        }, 5000);
                    return
                }
                fs.readFile("./Loaders/Actions/Actions.json", "utf8", readAction)
            }

    }
    )
}
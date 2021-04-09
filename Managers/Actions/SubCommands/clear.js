const fs = require('fs')


module.exports = {
    subcommand: "clear",
    description: "Clears defined directory or if left blank it clears whole action. If gif directory is selected index can be used to remove specific gif from the list",
    syntax: "`clear <action> <directory{gif,response}> <index{gif}>`",
    callback: (arguments, {channel, author}) => 
    {
        const action = arguments[1]
        const directory = arguments[2]
        if(!action)
        {
            channel.send(`correct sytax:\n${module.exports.syntax} `)
            return
        }

        const clearAction = async (err, json) =>
        {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }
            const actions = JSON.parse(json)
            if(!actions[action])
            {
                channel.send("Action doesnt exist.")
            }
            if(!directory)
            {
                await channel.send("Action will be cleared are you sure to clear it?").then(async message => {
                    await message.react(`✅`).then(() => message.react(`❎`))

                    const filter = (reaction, user) => {
                        return ['✅', '❎'].includes(reaction.emoji.name) && user.id === author.id;
                    };
                    
                    await message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();
                    
                            if (reaction.emoji.name === '✅') {
                                message.edit('Action removed from the list');
                                delete actions[action]
                            } else {
                                message.edit('Clear canceled');
                            }
                        })
                        .catch(collected => {
                            message.edit('Clear canceled');
                        });
                })
            }
            if(directory === "gif" || directory === "g")
            {
                if(arguments[3] !== 0 && !arguments[3])
                {
                    //actions[action]["gif"] = []
                    await channel.send("Action gif array will be cleared are you sure to clear them?").then(async message => {
                        await message.react(`✅`).then(() => message.react(`❎`))

                        const filter = (reaction, user) => {
                            return ['✅', '❎'].includes(reaction.emoji.name) && user.id === author.id;
                        };
                        
                        await message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();
                        
                                if (reaction.emoji.name === '✅') {
                                    message.edit('Gif array Cleared');
                                    actions[action]["gif"] = []
                                } else {
                                    message.edit('Clear canceled');
                                }
                            })
                            .catch(collected => {
                                message.edit('Clear canceled');
                            });
                    })
                }
                if(arguments[3]>actions[action]["gif"].length || arguments[3]< 0)
                {
                    channel.send(`correct sytax:\n${module.exports.syntax} `)
                    return
                }
                if(arguments[3] || arguments[3] === 0)
                {
                    actions[action]["gif"].splice(arguments[3],1)
                    channel.send("Action gif from the list cleared")
                }
               
            }
            if(directory === "response" || directory === "r")
            {
                actions[action]["response"] = {default: null}
                channel.send("Responses reset")
            }
            fs.writeFile("./Loaders/Actions/Actions.json",JSON.stringify(actions,null, 2), (err) =>
            {
                if (err) console.log('Error writing file:', err)
            } )
        }
        fs.readFile("./Loaders/Actions/Actions.json", "utf8", clearAction)


    }
}
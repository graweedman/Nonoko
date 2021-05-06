const Action = require('../ActionsManager')


module.exports = {
    subcommand: "clear",
    description: "Clears defined directory or if left blank it clears whole action. If gif directory is selected index can be used to remove specific gif from the list",
    syntax: "`clear <action> <directory{gif,response}> <index{gif}>`",
    callback: async (arguments, {channel, author}) => 
    {
        const action = arguments[1]
        const directory = arguments[2]
        if(!action)
        {
            channel.send(`correct sytax:\n${module.exports.syntax} `)
            return
        }
        const checkCode = (code) => 
        {
            if(code === 400)
            {
                channel.send(`correct sytax:\n${module.exports.syntax} `)
                return 1
            }
            if(code === 404)
            {
                channel.semd(`Action not found`)
                return 1
            }
            return 0
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
                            if(checkCode(Action.clear({directory: directory, name:action})))return
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
                                if(checkCode(Action.clear({directory: directory, name:action})))return
                            } else {
                                message.edit('Clear canceled');
                            }
                        })
                        .catch(collected => {
                            message.edit('Clear canceled');
                        });
                })
            }
            if(checkCode(Action.clear({directory: directory, name:action, index:arguments[3]})))return
        }
        if(directory === "response" || directory === "r")
        {
            if(checkCode(Action.clear({directory: directory, name:action})))return
            channel.send("Responses reset")
        }
        
    }
}
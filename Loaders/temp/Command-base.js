const { prefix } = require("../../config.json")

const usedCommand = new Set();
const guildID = "835822907165769768"
//this is command base module which controls how the commands are read and activated a lot of verification happens here
module.exports = async (client, commandOptions, dev) =>
{
    // const getApp = (guildID) => {
    //     const app = client.api.applications(client.user.id)
    //     if(guildID){
    //       app.guilds(guildID)
    //     }
    //     return app
    //   }
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permissions to use this command',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        allowedChannels = [],
        description,
        callBack
    } = commandOptions // Base template of reading the module files

    // Checks if the commands varieble is a String and converts it
    if(typeof commands === "string"){
        commands = [commands]
    } 



    console.log(`Registering command "${commands[0]}"`)

    // await getApp(guildID).commands.post({
    //     data: {
    //         name: commands[0],
    //         description
    //     }
    // })

    // client.ws.on('INTERACTION_CREATE', async (interaction) =>
    // {
    //     const command = interaction.data.name.toLowerCase()

    //     if(command === commands[0])
    //     {
    //         callBack()
    //     }
    // })

    client.on("message", message => {
        
        const { member, content, guild, author } = message
        
        let hasRoles = false
        let isAllowed = true

        //checks for commands array and iterates every command name until it meets the demand or gets denied
        for(const alias of commands)
        {
            if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`))
            {
                if((dev && author.id !== "272697254165348353") && (dev && author.id !== "693128983453368381"))return  // Dev check which disables these modules for non-devs

                //Command cooldown
                if(usedCommand.has(message.author.id))
                {
                    message.channel.send("Wait 5 seconds before using another command.")
                    return
                }

                //Role check for command execution
                if(requiredRoles.length)
                {
                    for(const requiredRole of requiredRoles)
                    {
                        const role = guild.roles.cache.find(role => role.id === requiredRole)
                        console.log(role.id)
                        if(role && member.roles.cache.has(role.id)){
                            hasRoles = true
                            break
                        }
                    }
                }
                else
                {
                    hasRoles = true
                }

                //Role deny
                if(!hasRoles)
                {
                    message.channel.send("You dont have required Role")
                    return
                }

                // console.log(allowedChannels.length)

                //Checks allowed channel array with message channel
                if(allowedChannels.length)
                {
                    //console.log(message.channel.id)
                    if(allowedChannels.includes(message.channel.id))
                    {
                        //console.log(message.channel.id)
                        isAllowed = true
                    }
                    else
                    {
                        isAllowed = false
                    }
                }

                //Channel deny
                if(!isAllowed)
                {
                    message.channel.send(`This command isnt permitted to be used here`)
                    return
                }
                const arguments = splitCommandLine(content) //Argument array that is passed to the command module

                console.log(`Command ${alias} has been run`)

                arguments.shift() //Deletes the first argument which is the command
                
                //Checks if the argument lenght is Valid
                if(arguments.length < minArgs ||
                (maxArgs !== null && arguments.length > maxArgs))
                {
                    message.reply(`Invalid syntax! Use ${prefix}${alias} ${expectedArgs}`)
                    return
                }

                //Command handle where the command gets executed
                callBack({message, arguments, text:arguments.join(' ')})

                //Sets cooldown if the message author isnt one of the admins
                if(message.author.id !== "779996172793544735" || message.author.id !== "272697254165348353")
                {
                    usedCommand.add(message.author.id);
                    setTimeout(() => {
                        // Removes the user from the set after a minute
                        usedCommand.delete(message.author.id);
                        }, 5000);
                }
                return
            }
            
            
        }

        
    })
    
}

//A function which turns quoted text as a whole argument
function splitCommandLine( commandLine ) {

    //  Find a unique marker for the space character.
    //  Start with '<SP>' and repeatedly append '@' if necessary to make it unique.
    var spaceMarker = '<SP>' ;
    while( commandLine.indexOf( spaceMarker ) > -1 ) spaceMarker += '@' ;

    //  Protect double-quoted strings.
    //   o  Find strings of non-double-quotes, wrapped in double-quotes.
    //   o  The final double-quote is optional to allow for an unterminated string.
    //   o  Replace each double-quoted-string with what's inside the qouble-quotes,
    //      after each space character has been replaced with the space-marker above.
    //   o  The outer double-quotes will not be present.
    var noSpacesInQuotes = commandLine.replace( /"([^"]*)"?/g, ( fullMatch, capture ) => {
        return capture.replace( / /g, spaceMarker ) ;
    }) ;

    //  Now that it is safe to do so, split the command-line at one-or-more spaces.
    var mangledParamArray = noSpacesInQuotes.split( / +/ ) ;


    //  Create a new array by restoring spaces from any space-markers.
    var paramArray = mangledParamArray.map( ( mangledParam ) => {
        return mangledParam.replace( RegExp( spaceMarker, 'g' ), ' ' ) ;
    });


    return paramArray ;
}
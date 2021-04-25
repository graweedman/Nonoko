const {MessageEmbed} = require("discord.js")
const ActionManager = require("../../../Managers/Actions/subcommands.js")

module.exports = {
    commands: ["action"],
    expectedArgs: "<mode> <Role>",
    permissionError: "You do not have required permissions",
    description: "Gives every member ar role",
    requiredRoles: ["835829584507174942", "835829586683363358", "835829591289102378"],
    minArgs: 0,
    maxArgs: null,
    callBack: (message, arguments, text) => {  
        console.log(arguments[0])  
        ActionManager.Action(arguments[0],arguments, message)

    }

}


const {MessageEmbed} = require("discord.js")
const ActionManager = require("../../../Managers/Actions/subcommands.js")

module.exports = {
    commands: ["action"],
    expectedArgs: "<mode> <Role>",
    permissionError: "You do not have required permissions",
    description: "Gives every member ar role",
    requiredRoles: ["810994649980076052", "810994374736478208", "810998543577514064", "811237382808403988","813919340227198997"],
    minArgs: 0,
    maxArgs: null,
    callBack: (message, arguments, text) => {  
        console.log(arguments[0])  
        ActionManager.Action(arguments[0],arguments, message)

    }

}


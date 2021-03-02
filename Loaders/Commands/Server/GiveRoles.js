const {MessageEmbed} = require("discord.js")
const { LevelUp, xpGauge, LevelXP , getRank } = require("../../../Managers/XP/XPManager")
const UserManager = require("../../../Managers/Users/UserManager")

module.exports = {
    commands: ["role"],
    expectedArgs: "<mode> <Role>",
    permissionError: "You do not have required permissions",
    description: "Gives every member ar role",
    requiredRoles: ["810994649980076052", "810994374736478208", "810998543577514064", "811237382808403988"],
    minArgs: 2,
    maxArgs: 2,
    callBack: (message, arguments, text) => {

        const { guild } = message

        let i = 0
        guild.members.cache.map(member =>
            {
                if(member.user.bot)return
                if(arguments[0] === "add")
                {
                    member.roles.add(arguments[1])
                    //message.channel.send("Role added")
                    console.log("role added",i)
                }
                else
                {
                    member.roles.remove(arguments[1])
                    message.channel.send("Role removed")
                }
                i++
            })
            let Role = guild.roles.cache.find(role => role.id === arguments[1])

            message.channel.send("Roles manipulated")
        


    }

}


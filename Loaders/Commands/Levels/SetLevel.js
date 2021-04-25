const {MessageEmbed} = require("discord.js")
const { LevelUp, xpGauge, LevelXP , getRank } = require("../../../Managers/XP/XPManager")
const UserManager = require("../../../Managers/Users/UserManager")

module.exports = {
    commands: ["setLevel"],
    expectedArgs: "<User> <Level>",
    permissionError: "You do not have required permissions",
    description: "Sets level for user",
    requiredRoles: ["835829584507174942", "835829586683363358", "835829591289102378"],
    minArgs: 2,
    maxArgs: 2,
    callBack: (message, arguments, text) => {

        let {member} = message
        if(message.mentions.members.first())
        {
            member = message.mentions.members.first()
        }
        else 
        {
            message.channel.send(`Arguments provided incorrectly`)
            return
        }
        if(isNaN(arguments[1]))
        {
            message.channel.send(`Arguments provided incorrectly`)
            return
        }
        //console.log(member)
        //message.reply(LevelUp(arguments[0]))
        //console.log(LevelXP(arguments[0]))
        const setLVL = (User) =>
        {
            //message.reply(`${xpGauge(User.xp, User.level, 20)} ${( arguments[0] ? `,${LevelXP(arguments[0])}` : "")}`)

            User.level = arguments[1]
            message.channel.send(`Level increased to LVL ${User.level} for ${member}`)
            User.save()
        }
        UserManager.User(member, setLVL)
        

    }

}


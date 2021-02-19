const {MessageEmbed} = require("discord.js")
const { LevelUp, xpGauge, LevelXP , getRank } = require("../../../Managers/XP/XPManager")
const UserManager = require("../../../Managers/Users/UserManager")

module.exports = {
    commands: ["givexp"],
    expectedArgs: "<User> <Level>",
    permissionError: "You do not have required permissions",
    description: "Sets level for user",
    requiredRoles: ["810994649980076052", "810994374736478208", "810998543577514064", "811237382808403988"],
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

            User.xp += arguments[1]
            message.channel.send(`Level increased ${arguments[1]} xp for ${member}`)
            User.save()
        }
        UserManager.User(member, setLVL)
        

    }

}


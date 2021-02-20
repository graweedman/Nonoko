const {MessageEmbed} = require("discord.js")
const { LevelUp, xpGauge, LevelXP , getRank } = require("../../../Managers/XP/XPManager")
const UserManager = require("../../../Managers/Users/UserManager")

module.exports = {
    commands: ["level"],
    expectedArgs: "none or <User>",
    permissionError: "You do not have required permissions",
    description: "Shows profile",
    minArgs: 0,
    maxArgs: 1,
    callBack: (message, arguments, text) => {

        let {member} = message
        if(message.mentions.members.first())
        {
            member = message.mentions.members.first()
        }
        //console.log(member)
        //message.reply(LevelUp(arguments[0]))
        //console.log(LevelXP(arguments[0]))
        const display = (User) =>
        {
            //message.reply(`${xpGauge(User.xp, User.level, 20)} ${( arguments[0] ? `,${LevelXP(arguments[0])}` : "")}`)
            message.channel.send(new MessageEmbed(
                {
                    title: `Level ${User.level}`,
                    description: `${User.xp}/${LevelXP(User.level)} XP \n ${xpGauge(User.xp, User.level, 18)}`,
                    thumbnail: { url: member.user.avatarURL() },
                    fields: [{name:`Rank`, value: getRank(member)}]
                }))
        }
        UserManager.User(member, display)
        

    }

}


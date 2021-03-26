const {MessageEmbed} = require("discord.js")
const { LevelUp, xpGauge, LevelXP , getRank } = require("../../../Managers/XP/XPManager")
const UserManager = require("../../../Managers/Users/UserManager")

module.exports = {
    commands: ["MessageCount", "msgcount"],
    expectedArgs: "<User>",
    permissionError: "You do not have required permissions",
    description: "Shows message scoreboard, or user message count",
    requiredRoles: ["810994649980076052", "810994374736478208", "810998543577514064", "811237382808403988"],
    minArgs: 1,
    maxArgs: 1,
    callBack: (message, arguments, text) => {
        let { channel,guild } = message
        const showCount = (User) =>
            {
                const msgCount = User.messageCount
                const username = guild.members.cache.get(User.id).displayName

                return {msgCount, username}
            }
        if(message.mentions.members.first())
        {
            
            UserManager.User(message.mentions.members.first(), (User) =>{ 
                const {msgCount = "No Messages Sent",
                username} = showCount(User) 
                
                channel.send(new MessageEmbed({
                    title: "Message Count",
                    description: `${username} : ${msgCount}`
                }))
            })
            return
        }

        const execute = (err,Users) =>
        {
            Users.map(User =>
                {
                    const { 
                        msgCount = "No Messages Sent",
                        username } = showCount(User)




                })
        }

        UserManager.SortedUsers({messageCount: -1 }, execute);

    }

}


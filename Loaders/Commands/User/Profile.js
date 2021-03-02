const UserManager = require("../../../Managers/Users/UserManager")
const moment = require("moment")
const {MessageEmbed, User} = require("discord.js")
const { LevelXP, GetLevel, xpGauge } = require("../../../Managers/XP/XPManager")

module.exports = {
    commands: ["profile","user"],
    expectedArgs: "none or <User1>",
    permissionError: "You do not have required permissions",
    description: "Shows profile",
    minArgs: 0,
    maxArgs: 1,
    callBack: (message, arguments, text) => {

        let member = message.member
        if(message.mentions.members.first())
        {
            //console.log(message.mentions.members.first())
            member = message.mentions.members.first()
        }
        //console.log(member)
        const showProfile = (User) =>
        {
            console.log("works")
            const embed = new MessageEmbed()
            embed.setColor("#ff6e9d")
            embed.setTitle(`${member.user.username} Profile`)
            embed.setThumbnail(member.user.avatarURL())
            embed.addField(`Level ${User.level}`,`${xpGauge(User.xp, User.level)} ${User.xp}/${LevelXP(User.level)} xp`)
            embed.addField(`Daily`, `${moment().to(moment(User.daily).add(1,'d'))}`)
            embed.addField(`Money`, `${User.currency}`)
            embed.setDescription(`UwU`)
            message.channel.send(embed)
        }

       UserManager.User(member.user,showProfile)
        

    }

}


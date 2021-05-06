const UserManager = require("../../../Managers/Users/UserManager")
const moment = require("moment")
const {MessageEmbed, User} = require("discord.js")
const { LevelXP, GetLevel, xpGauge } = require("../../../Managers/XP/XPManager")
const embed = new MessageEmbed()

module.exports = {
    slash:true,
    testOnly:true,
    //category: 'Fun & Games',
    commands: ["profile","user"],
    //expectedArgs: `<User>`,
    //permissionError: "You do not have required permissions",
    description: "Shows profile!",
    //minArgs: 0,
    //maxArgs: 1,
    
    callback: async ({member, channel}) => {

        console.log(channel)
            //console.log(args)
        
        // if(message.mentions.members.first())
        // {
        //     //console.log(message.mentions.members.first())
        //     member = message.mentions.members.first()
        // }
        
        //console.log(member)
        const showProfile = (User) =>
        {
            console.log("works")
            embed.setColor("#ff6e9d")
            embed.setTitle(`${member.user.username} Profile`)
            //embed.setThumbnail(member.user.avatarURL())
            embed.addField(`Level ${User.level}`,`${xpGauge(User.xp, User.level)} ${User.xp}/${LevelXP(User.level)} xp`)
            embed.addField(`Daily`, `${moment().to(moment(User.daily).add(1,'d'))}`)
            embed.addField(`Money`, `${User.currency}`)
            embed.setDescription(`UwU`)


            //if(message)message.channel.send(embed)
        }

       await UserManager.User(member.user,showProfile)
       console.log(embed)
       return embed
        

    }

}


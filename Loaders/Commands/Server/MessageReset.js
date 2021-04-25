const {MessageEmbed} = require("discord.js")
const { LevelUp, xpGauge, LevelXP , getRank } = require("../../../Managers/XP/XPManager")
const UserManager = require("../../../Managers/Users/UserManager")

module.exports = {
    commands: ["reset"],
    expectedArgs: "",
    permissionError: "You do not have required permissions",
    description: "Gives every member ar role",
    requiredRoles: ["835829584507174942", "835829586683363358", "835829591289102378"],
    minArgs: 0,
    maxArgs: 1,
    callBack: (message, arguments, text) => {
        
        const execute = (err,Users) =>
        {
            Users.map(User =>
                {
                    User.messageCount = undefined;
                    User.save()
                })

            message.channel.send("Message Count Reset")
        }

        UserManager.SortedUsers({messageCount: -1 }, execute);

    }

}


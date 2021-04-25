const UserManager = require("../../../Managers/Users/UserManager")
const { GainXP } = require("../../../Managers/XP/XPManager")

module.exports = {
    condition: (message) =>
    {
        const {member} = message
        if(message.author.bot)return false
        return true
    },
    callBack: async (message) =>
    {
        const reward = async (User) => {
            if(User.messageCount)
            {
                User.messageCount++
            }
            else
            {
                User.messageCount = 1
            }
            setTimeout(() => {
                User.save();
                }, 100);
            
        }
        await UserManager.User(message.author, reward, true)
    },
    ignoredChannels: ['835846230126624818',"835887935257444362","835846299340898304","835846076597534800","835847246687502366"]
}
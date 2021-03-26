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
    ignoredChannels: ['811003540398145588',"812625802234822676","812623795562479667","813518673247338526","812812358442942505","815719095072849921"]
}
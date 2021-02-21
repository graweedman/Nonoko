const GainedReward = new Set();
const UserManager = require("../../../Managers/Users/UserManager")
const { GainXP } = require("../../../Managers/XP/XPManager")

module.exports = {
    condition: (message) =>
    {
        const {member} = message
        if(message.author.bot)return false
        if(GainedReward.has(member.id))return false
        return true
    },
    callBack: async (message) =>
    {
        const reward = async (User) => {
            GainXP(User,message)
            GainedReward.add(message.author.id);
            setTimeout(() => {
                GainedReward.delete(message.author.id);
                }, 6000);
            setTimeout(() => {
                User.save();
                }, 100);
            
        }
        await UserManager.User(message.author, reward, true)
    },
    ignoredChannels: ['811003540398145588',"812625802234822676"]
}
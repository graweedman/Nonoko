const CheckedRoles = new Set();
const UserManager = require("../../../Managers/Users/UserManager")
const { setRank } = require("../../../Managers/XP/XPManager")

module.exports = {
    condition: (message) =>
    {
        const {member} = message
        if(message.author.bot)return false
        if(CheckedRoles.has(member.id))return false
        return true
    },
    callBack: async (message) =>
    {
        const {member} = message

        const checkRoles = (User) => {
            CheckedRoles.add(member.id)
            if(User) setRank(User.level, member)
            setTimeout(()=>
            {
                CheckedRoles.delete(member.id)
            }, 60000)
        }

        UserManager.User(member, checkRoles)
        
    },
    ignoredChannels: [ ]
}
const AIManager = require("../../../Managers/AI/AIManager")

module.exports = {
    listener: {name:"AI"},
    condition: (message) =>
    {
        //if(message.author.bot)return false
        if( (message.author.id === "426792941990707220" || message.author.id === "693128983453368381") )return true
        return false
    },
    callBack: async (message) =>
    {
        AIManager.save(message.content, message.author.username)
    },
    ignoredChannels: ["835846076597534800", "835967150837465159", "835847246687502366"]
}
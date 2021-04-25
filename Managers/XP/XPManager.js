const Chance = require("chance")
//const { MessageEmbed } = require("discord.js")
const rate = 0.4;
module.exports.LevelRoles = 
    [
        {$role:`835957881387745340`,Rlevel:1 },
        {$role:`835958001172217907`,Rlevel:10},
        {$role:`835958186938466315`,Rlevel:20},
        {$role:`835958360028217364`,Rlevel:30},
        {$role:`835958525581852674`,Rlevel:40},
        {$role:`835958660277469205`,Rlevel:50},
    ]

module.exports.LevelXP = (level) =>
{
    return Math.floor(50 + level * rate * 100) 
}
module.exports.GainXP = (User,message)=>
{
    chance = new Chance()
    let levelup = false
    User.xp += chance.integer({ min:2 , max:5 })
    while (User.xp >= this.LevelXP(User.level))
    {
        User.xp -= this.LevelXP(User.level)
        User.level++
        levelup = true
    }
    if(levelup)
    {
        message.reply(`You have leveled up to LVL ${User.level}`)
        message.channel.send(`https://tenor.com/view/lvl-up-chino-anime-coco-cute-gif-15114457`)
        //setRank(User.lvl, message.member)
    }
}
module.exports.setRank = (level,member) =>
{
    this.LevelRoles.forEach(({ Rlevel, $role },index) =>
    {
        //if(levelfound)return
        //console.log(Rlevel,this.LevelRoles[index+1])
        if(level >= Rlevel && level < (this.LevelRoles[index+1] ? this.LevelRoles[index+1].Rlevel : 999) && !member.roles.cache.has($role))
        {   
            RemovePrevious($role,member)
            //console.log(`add role`)
            let role = member.guild.roles.cache.get($role)
            member.roles.add(role).catch(console.error)
            //this.LevelRoles.find()
            //levelfound = true;
        }
    })
    
}
module.exports.getRank = (member) =>
{
    let LevelRole = `none`
    //console.log(member)
    this.LevelRoles.forEach(({$role}) =>
    {
        if(member.roles.cache.has($role))
        LevelRole = member.roles.cache.find(role => role.id === $role)
    })

    return LevelRole
}
RemovePrevious = (role,member) =>
{
    this.LevelRoles.forEach(({ $role }) =>
    {
        if(role === $role)return
        Arole = member.guild.roles.cache.get($role)
        //console.log(Arole.name, Arole.id)
        //console.log(role, $role)
        
        member.roles.remove( $role ).catch(console.error)
    })
}
module.exports.xpGauge = (xp, level, lenght) =>
{
    if(!lenght) lenght = 10;
    let unit = this.LevelXP(level)/lenght
    let xpsum = xp  
    let gauge = "["  
    //console.log(unit)
    for(let i = 0; i<lenght; i++)
    {
        if(xpsum > unit)
        {
            gauge += "█"
            xpsum -= unit
            //console.log(xpsum)
        }
        else
        {
            gauge += "░"
        }
    }
    return gauge + "]"
}

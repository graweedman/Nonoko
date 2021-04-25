const {MessageEmbed} = require("discord.js")
const moment = require("moment")

let sum = {
    value:0
}
let embed = new MessageEmbed(
    {
        color: 0x0099ff,
        //description: 'Some description here',
    })

const emojis = [
   `812739909029724231`,
   `812742289516396574`,
   `812740791947886622`,
   `812742519481565205`,
   `812739839166382100`
]
let active = false
let poll = ``
let cancel = false

module.exports = {
    commands: ["poll"],
    expectedArgs: `<title> <description> <["Poll name"]>`,
    permissionError: "You do not have required permissions",
    description: "Creates a Poll",
    requiredRoles: ["835829584507174942", "835829586683363358", "835829591289102378"],
    minArgs: 1,
    maxArgs: 8,
    callBack: (message, arguments, text) => {
        if(arguments[0] === "cancel")
        {
            if(active){
                message.channel.send(`Deleting poll`)
                cancel = active
                active = false
            }
            else{
                message.channel.send("Poll not found")
                return
            }
        }
        if(active)
        {
            message.channel.send(`Only one poll at the time can be active`)
            return
        }
        if(arguments.length <= 3 && !cancel)
        {
            message.channel.send(`Wrong syntax`)
            return
        }
        let channel = message.guild.channels.cache.get(`816046656138510437`)
        if(cancel)
        {
            channel.messages.cache.find(message => message.id === poll).delete()
            cancel = false
            return
        }
        sum.value = 0
        let Voted = new Set()
        let votes = initEmojis(arguments)
        //console.log(votes)
        
        

        if(!channel)
        {
            message.channel.send(`Channel not Found!`)
            return
        }
        embed.setTitle(`Poll ${arguments[0]}`)
        embed.setDescription(arguments[1])
        embed.fields = createFields(votes)
        // let embed = new MessageEmbed(
        //     {
        //         color: 0x0099ff,
        //         title: `Poll ${arguments[2]}`,
        //         description: 'Some description here',
        //         fields: createFields(arguments),
        //     })
        
        //let time = parsetime(arguments[0],`h`)
        channel.send(embed).then(message => {
            poll = message.id
            active = true
            //console.log(votes)
            initEmojis(arguments,message)


            const filter = (reaction, user) => {
                removeReact(message, user)
                //console.log(emojis.includes(reaction.emoji.id) && !user.bot)
                if((!Voted.has(user.id) || user.id === `272697254165348353`) && emojis.includes(reaction.emoji.id) && !user.bot){
                    Voted.add(user.id)
                    let vote = votes.find(vote => vote.emoji === reaction.emoji.id)
                    vote.count++
                    sum.value++
                    //console.log(sum)
                    vote.percentage = ((vote.count/sum.value)*100)

                    //votes.find(vote => vote.emoji === reaction.emoji.id) = vote
                    votes.find((value,index) => 
                    {
                        if(value.emoji === reaction.emoji.id)
                        {
                            votes[index] = vote
                        }
                    })
                    
                    update(message,votes)
                    return true
                }
                //console.log(reaction.count)
                
                return false ;
            };
            //console.log(`time:`,time)
            message.awaitReactions((reaction,user) => {
                return filter(reaction,user)
            }, {time: 86400000 })
            .then(collected => 
                {
                    
                    embed.setTitle(`Results of ${arguments[0]}`),
                    embed.setDescription(`**${findWin(votes)}** has most of the votes`),
                    //embed.fields = createFields(votes),
                    message.edit(embed)
                    message.reactions.removeAll()
                    active = false
                    // console.log(`votes:`,votes)
                    // console.log(`sum:`,sum)
                }
                )
            .catch(console.error);
        })

    }

}

createFields = (votes) =>
{
    let fields = []
    //console.log(`field:`,votes)
    for(let i = 0; i<votes.length; i++)
    {
        votes[i].percentage = updatePercentage(votes[i])
        fields[i] = {name:votes[i].name, value:createGauge(votes[i].percentage,10)}
    }
    //console.log(fields)
    return fields
}

const createGauge = (percentage, length, sum) =>
{
    let gauge = "["
    if(!percentage)
    {
        for (i = 0; i<length; i++)
        {
            gauge += "░"
        }
        return gauge + "] 0%"
    }

    let unit = 100/length
    let percentages = percentage
    //console.log(`percentage`,percentage)
    for (i = 0; i<length; i++)
    {
        if(percentage >= unit)
        {
            gauge += "█"
            percentage -= unit
        }
        else
        {
            gauge += "░"
        }
    }
    return gauge + `] ${percentages}%`
}

const initEmojis = (arguments,message) => 
{
    let array = []
    //console.log(`lenght:`, lenght)
    for(i = 0; i < arguments.length - 2; i++)
    {
        //console.log(emojis)
        array[i] = {name:arguments[i+2],emoji:emojis[i], count:0}
        if(message)
        {
            message.react(emojis[i])
        }
        
    }
    return array
}

const update = (message, votes) =>
{
    // let embed = new MessageEmbed(
    //     {
    //         color: 0x0099ff,
    //         title: `Poll ${arguments[2]}`,
    //         description: 'Some description here',
    //         //fields: createFields(arguments, votes, sum),
    //     })
    embed.fields = createFields(votes)
    message.edit(embed)
}

const removeReact = (message, user) =>
{
    if(!user.bot)
            {
                const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                try {
                    for (const reaction of userReactions.values()) {
                    reaction.users.remove(user.id);
                    }                    
                }
                catch (error) {
                        console.error('Failed to remove reactions.');
                    }
                }
}

const findWin = (votes) =>
{
    let percentage = 0
    let index = 0
    for(i = 0; i<votes.length; i++)
    {
        if(votes[i].percentage >= percentage)
        {
            percentage = votes[i].percentage
            index = i
        }
    }
    return votes[index].name
}

updatePercentage = (vote) =>
{
    return Math.round(((vote.count/sum.value)*100))
}

parsetime = (time, type) =>
{
    //if(isNaN(timeString))
    if(type === `h`)
    return 3600000 * parseInt(time)
    if(type === `m`)
    return 60000 * parseInt(time)
}
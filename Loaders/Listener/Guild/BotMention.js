const { connect, set } = require("mongoose");

let count = 0; //Message count until getting aggrivated
let annoyed = 0; //Annoyed level
let isAnnoyed = false;
let ignore = false;

module.exports = {
    condition: (message) =>
    {
        if(message.content.includes(`811238806061318155`))
        {
            return true
        }
        return false
    },
    callBack: async (message) =>
    {
        let {content, author} = message
        content = content.toLowerCase()
        console.log(message.content)


        //-----------------------------------------------Graw-------------------------------------------------------------


        if(author.id === "272697254165348353")
        {
            
            if(content.includes("love"))
            {
                message.channel.send("Love you too! <:MeruLuv:812573648883548210>").then(()=> {
                    message.react(`812573648883548210`)
                })
                return
            }
            if(content.includes("best"))
            {
                message.channel.send("Best Master <:MeruLuv:812573648883548210>").then(()=> {
                    message.react(`812573648883548210`)
                })
                annoyed--
                return
            }
            if(content.includes("master"))
            {
                message.channel.send("Yes you are. And nobody else will be. <:MeruShy:812739839166382100>")
                return
            }
            if(content.includes("trash"))
            {
                message.channel.send("What did i do wrong? Im sorry! <:MeruCry:812739980748390450>")
                annoyed++
                return
            }
            if(content.includes("hello") || content.includes("hi"))
            {
                message.channel.send("Hi, Master <:MeruShy:812739839166382100>")
                return
            }
            if(content.includes("pat") || content.includes("pet"))
            {
                message.channel.send("Pat me more! <:MeruPat:812744398387019806>")
                annoyed--
                return
            }

            message.channel.send("Hello master. Love you. <:MeruLuv:812573648883548210>")
            return
        }
        //-----------------------------------------------Kyo------------------------------------------------------------

        //if( message.author.id === 701055798725312533)
        //-----------------------------------------------Hana-----------------------------------------------------------

        if(message.author.id === "779996172793544735")
        {
            message.channel.send("Hello Hana. Love you too. <:MeruLuv:812573648883548210>")
            return
        }
        //-----------------------------------------------Others---------------------------------------------------------
        if(ignore)
        {
            return
        }
        if(isAnnoyed)
        {
            message.channel.send("You have exhausted my time, just don't talk to me.")
            ignore = true
            setTimeout(()=> {
                isAnnoyed = false
                ignore = false
            },60000)
            return
        }
        if(content.includes("master"))
        {
            message.channel.send("How can you be a master of anything if you cant even master your life? <:MeruStare:812742519481565205>")
            annoyed++
            return
        }
        if(content.includes("trash"))
        {
            message.channel.send("Shut up! Or ill tie your mouth shut(mute)!")
            count++
            annoyed++
            return
        }
        if(content.includes("pat") || content.includes("pet"))
        {
            message.channel.send("I love pats <:MeruPat:812744398387019806>")
            annoyed--
            return
        }
        if(content.includes("best"))
            {
                message.channel.send("Aww thank you! <:MeruLuv:812573648883548210>").then(()=> {
                    message.react(`812573648883548210`)
                })
                annoyed--
                return
            }
        if(content.includes("hello") || content.includes("hi"))
            {
                message.channel.send("Hi")
                return
            }
        if(content.includes("help"))
            {
                message.channel.send("Even i can't help you.")
                return
            }
        if(content.includes("love"))
            {
                message.channel.send("Who are you? <:MeruStare:812742519481565205>")
                count++
                return
            }
        
        if(count<3)
        {
            message.channel.send("What is it? <:MeruStare:812742519481565205>")
            count++
            return
        }  
        if(annoyed == 5) //Turns Nonoko annoyed
        {
            isAnnoyed = true
        }


        message.channel.send("Will you stop it already? Use /help. <:MeruReee:812739665286266911>")
        annoyed++
        setTimeout(() => {
            count = 0;
        },10000)
        

    }
}
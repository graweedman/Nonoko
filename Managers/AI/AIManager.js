const brain = require('brain.js')

const network = new brain.recurrent.LSTM()

let Working = false



const fs = require("fs")


module.exports.save = (text, author) =>
{
    const data = require('./data.json')
    data.push({text, author})
    //console.log(data)
    fs.writeFile("./data.json", JSON.stringify(data), (err) =>
    {
        if(err)
        {
            console.error(err)
        }
    })
}

module.exports.predict = (text, message) =>
{
    if(Working) 
    {
        message.reply("One calculation is already in progress")
        return
    }
    message.reply("Calculating...").then(message => 
        {
            const data = require("./data.json")
            const trainingData = data.map(item => ({
                input:item.text,
                output:item.author
            }))
            network.train(trainingData, {iterations:1000})
            Working = true
            const output = network.run(text)
            message.edit(`I think the message style belongs to: ${output}`).then(()=>
            {
                Working = false
            })
        })
    

    

    
}
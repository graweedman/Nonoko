const mongoose = require("mongoose")


const { Client, Message } = require("discord.js")
const { token , connect } = require("./config.json")

const loadCommands = require("./Loaders/Commands/load-commands") // Loads up Commands loader
const loadListeners = require("./Loaders/Listener/load-listeners") // Loads up Listener Loader
const loadActions = require("./Loaders/Actions/LoadAction") //Loads up action loader
const dev = process.argv[2]
//const loadListeners = require("")

const client = new Client({ 
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
  });

client.setMaxListeners(100) //sets the listener limit because every command is a new lsitening event
client.on("ready", () =>
{
    console.log("Bot started.")
    //loadMessages(client)
    loadCommands(client, dev) // Starts up Command module reader, read all the commands into events
    loadListeners(client, dev) // Starts up Listener module reader, read all the listeners into events
    loadActions(client, dev) //Starts up seperate Action module for custom action system
    console.log(dev)
})
client.login(token)  //Connects to the bot API

client.on("message", (message) =>
{
  if(message.content === "reine")  //why is this still here? xD
  {
    message.reply(`https://i.gifer.com/origin/76/76edc15042bf4866ed596a3a647487fe.gif`)
  }

  if(message.content.includes === "horny")
  {
    message.reply("Who is horny?! GO TO HORNY JAIL!!!").then(`https://media.tenor.com/images/fb0c4d3ea4d31e71974b24634db3985d/tenor.gif`)
  }

})

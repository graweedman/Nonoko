const mongoose = require("mongoose")


const { Client, Message } = require("discord.js")
const { token , connect } = require("./config.json")

const loadCommands = require("./Loaders/Commands/load-commands")
const loadListeners = require("./Loaders/Listener/load-listeners")
const loadActions = require("./Loaders/Actions/LoadAction")
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
})
client.login(token)  //Connects to the bot API

client.on("message", (message) =>
{
  if(message.content === "reine")  //why is this still here? xD
  {
    message.reply(`https://tenor.com/view/pretty-boy-model-male-model-handsome-hot-gif-12758592`)
  }
})
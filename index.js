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

client.setMaxListeners(100)
client.on("ready", () =>
{
    console.log("Bot started.")
    //loadMessages(client)
    loadCommands(client, dev)
    loadListeners(client, dev)
    loadActions(client, dev)
})
client.login(token)

client.on("message", (message) =>
{
  if(message.content === "reine")
  {
    message.reply(`https://tenor.com/view/pretty-boy-model-male-model-handsome-hot-gif-12758592`)
  }
})
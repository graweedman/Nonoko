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
    console.log(dev)
})
client.login(token)  //Connects to the bot API

client.on("message", (message) =>
{
  if(message.content === "reine")  //why is this still here? xD
  {
    message.reply(`https://lh3.googleusercontent.com/proxy/9WI6Tbpk0X8wt6427A2ChSgXdmVKxJNyrNh5vFvsKmU5tBOQJs_7gAEWv-52WTAk_C2RJcctrwcmhniIOPcxlu-vQAO9N02WA6UZzV9jXcM8Ir7qtVUoAv07LtIKqtbxrdHGzEtnkAJzCMkTEYMtqEH8wKhE18CzTqPEq4ZHfx0gmIP8hl1H3KcnYJOnhk4qwD7p2963dmkOUSeI0a0wfkMBDv4xlgj_yImTmLE6UmTSngQvzzvp4SojcbRbLl5qP7feIjbYzBNGF_8`)
  }
})

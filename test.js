const Discord = require('discord.js');
const client = new Discord.Client();

//const editJsonFile = require("edit-json-file");
//var fs = require('file-system');
//var eco = require('discord-economy')

const { token , connect, prefix } = require("./config.json")

//require('dotenv').config();

//const prefix = "*";
let bool = true;


client.on("message", async message => {
  if(message.content.substring(0,1) == "*") {
    console.log("OI");
    const args = message.content.substring(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(client, message, args);
    } catch(e) {
      console.log(e.stack);
    }
  } else {
    let random1 = Math.random() * (10000 - 5000) + 5000;
    console.log(bool);
    if (bool){  //true
      console.log(bool); //true
      setTimeout(function() {
        bool = false;
      }, 1000);
      setTimeout(function() {
        if (message.author.bot) return;
        bool = true; 
        try {
          setTimeout(function() {
            bool = true;
            //let commandFile = require(`./events/run.js`);
            //commandFile.run(client, message);
          }, 100);
        } catch(e) {
          console.log(e.stack);
        }
      }, random1);
    }
  } 

});


client.on("ready", async message => {
  membercount = 0;
  console.log("Vibing...");
  console.log(`Prefix: ${prefix}`);
  console.log("Server count: " + client.guilds.cache.size)
  console.log("Servers:");
  client.guilds.cache.forEach(guild => {
    console.log(
      "|	- " +
        guild.id +
        " | " +
        guild.name +
        " | Member Count: " +
        guild.memberCount
    );
    membercount = membercount + guild.memberCount;
  });

  client.user.setActivity(` *help`, { type: 'WATCHING'});
  console.log("Total User Count: " + membercount + "\n");


});


client.login(token);
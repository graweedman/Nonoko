# Listener
Listener is a script group that runs to check every message and completes defined *callback()* in listener condition it meets


### Listener module building:
```js
module.exports = { 
    callBack: (message) => {}, //this is what listener executes. parameters: Message object from event
    condition: (message) => {return true}, //condition on which callBack is executed. parameters: Message object from event
    requiredRoles: [], //list of Roles to check for condition to be valid
    listeningChannels: [], //list of channels that listener will be applied to
    ignoredChannels: [],  //list of channels that listenner will ignore
    listeningMembers: [] //list of memmbers listeners will be listening to
}
```

Note: empty Modules will crash the bot.
# Command
This is Command module setup. These modules make a new event on client listener which then is compiled by the base modules.

### Command module building:
```js
module.exports = { 
        commands:[], //array of command names the command will be called with either one
        expectedArgs: = '', //this is the message when command is used incorrectly
        description: "descripton", //command description displayed in help list
        permissionError: '', //permission control ///wip
        minArgs: 0, //min required arguments in arguments list. If failed throws expectedArgs.
        maxArgs: null, //max required argumens in arguments list. If failed throws expectedArgs.
        permissions: [], //checks if user has permissions to use command ///wip
        requiredRoles: [], //checks if user has roles to execute the command. If failed messages user that they dont have required role
        allowedChannels: [], //checks if command executed in allowed channel. If failed messages user to use allowed channels
        callBack: (message) => //main callback of the command where command is executed. Parameters: Message object from event
        {

        }
}
```
Note: empty Modules will crash the bot.



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
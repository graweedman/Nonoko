const path = require("path")
const fs = require('fs')
//this is the listener loader where listeners are read from Guild and DM folders Dm.
module.exports = (client, dev) => {
    const guildFile = 'guildListen.js'
    const DMFile = 'dmListen.js'
    const loadFile = 'load-listeners.js'
    //const commandBase = require(`./${baseFile}`)
    const dmBase = require(`./${DMFile}`)
    const guildBase = require(`./${guildFile}`)

    
    const readCommands = (dir, callBack, baseFile) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for(const file of files)
        {
            if(file !== baseFile && file !== loadFile)
            {
                const option = require(path.join(__dirname, dir, file))
                if(client){
                    //console.log(file,option)

                    callBack(client, option, dev)
                }
            }
        }
    }
    //readCommands('./DM',dmBase, DMFile)
    if(dev)return
    readCommands('./Guild', guildBase, guildFile)
    //return commands
}
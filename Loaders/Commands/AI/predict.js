const AIManager = require("../../../Managers/AI/AIManager")

module.exports = {
    commands: ["predict"],
    expectedArgs: "<Text>",
    permissionError: "You do not have required permissions",
    description: "checks with ai who is the author of the message",
    minArgs: 1,
    maxArgs: 1,
    callBack: (message, arguments, text) => {
        
        AIManager.predict(arguments[0], message)
    }

}


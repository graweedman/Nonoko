
module.exports = {
    slash:true,
    commands:["add"],
    testOnly:true,
    expectedArgs: "<nr1> <nr2>",
    minArgs: 2,
    description: `Test`,
    callback: ({args}) =>
    {
        console.log(args[0])
        //if(interaction)console.log(interaction)

            return parseInt(args[0]) + parseInt(args[1])
    }
}
const mongoose = require('mongoose');
const { connect } = require("../../config.json")
const connection = mongoose.createConnection(connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const { ActionsSchema } = require("./ActionsSchema")

const ActionsModule = connection.model('Actions', ActionsSchema, "Actions")

module.exports.create = async (action) =>
{
    ActionsModule.create({
        action:  action.name, 
        gifs: [action.gif],
        responses: {default_res:action.default, mentioned_res:action.mentioned}
    }, )
}

module.exports.add = async (action) =>
{
    let result = 1
    ActionsModule.findOne({action:action.name}, (err, Action)=>
    {
        if(err)throw err

        if(Action)
        {
            if(!Action.gifs.includes(action.gif))
            {
                Action.gifs.push(action.gif)
            }
            if(action.default)Action.responses.default_res = action.default
            if(action.mentioned)Action.responses.mentioned_res = action.mentioned
            Action.save()
            result = 0
        }
        else
        {
            this.create(action)
            result = 0
        }   
    })
    return result
}

module.exports.clear = (arguments)  =>
{
    console.log(arguments.directory)   
    if(!arguments.directory)
    {
        console.log(arguments.name)
        ActionsModule.findOneAndDelete({action:arguments.name})
        return 0; //return ok
    }
    let result = 404 //return not found
    ActionsModule.findOne({action:arguments.name}, (err, Action) =>
    {
        if(Action)
        {  
            //check for directory gif and deletes either gif array or removes required index
            if(arguments.directory === "gif" || arguments.directory === "g")
            {
                //if index is provided the 
                if(arguments.index || arguments.index === 0)
                {
                    //checks for index to be valid
                    if(arguments.index > Action.gifs.length || arguments.index < 0)
                    {
                        result = 400 //return bad request
                        return
                    }
                    Action.gifs.splice(arguments.index, 1)
                }
                else
                {
                    Action.gifs = []
                }
                Action.save()
                result = 0 //return ok
            }
            //check for directory response
            if(arguments.directory === "response" || arguments.directory === "r")
            {
                Action.responses = {default_res:null}
                Action.save()
                result = 0 //return ok
            }
        }
    })


    return result
}
module.exports.action = (Action, callback) =>
{
    ActionsModule.findOne({action:Action}, callback)
}

module.exports.actions = (callback) =>
{
    ActionsModule.find({},callback)
}

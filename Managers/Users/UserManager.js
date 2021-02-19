const mongoose = require('mongoose');
const moment = require('moment')
const { connect } = require("../../config.json")
const connection = mongoose.createConnection(connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const { UserSchema } = require("./UserScema")

const UserModule = connection.model('Users', UserSchema, "Users")

module.exports.create = async (user,NewUser) =>
{
    UserModule.create({
        id:  user.id, // String is shorthand for {type: String}
        username: user.username,
        xp: 0,
        level:0,
        currency: 10,
        daily: moment().format(),
    }, )
    return await UserModule.findOne({id:user.id})

}

module.exports.User = async (user, callBack, listener) =>
{
    UserModule.findOne({id:user.id}, async (err, User) => {
        if(err)throw err
        //console.log(User)
        
        if(User)
        {
            checkDefaults(User)
            await callBack(User)
        }
        else 
        {
            if(listener)return
            this.create(user).then(User => callBack(User))
        }
    })
}

module.exports.SortedUsers = (sort, callBack) =>
{
    UserModule.find().sort(sort).exec(callBack)
}

module.exports.changeUser = async (user, callback) =>
{

}

checkDefaults = (User) =>
{

    //User.save()
    
}
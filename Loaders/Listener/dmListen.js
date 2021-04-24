//works same as guildListen only iy listens for DM messages


module.exports = (client, ListenOptions) =>
{
    let {
        callBack = () => {},
        condition = () => {return true},
    } = ListenOptions
    client.on("message", message =>{
        
        const {
            channel,
            author,
            member
        } = message
        if(dev && member.id !== "272697254165348353")return
        if(author.bot)return
        //if(channel.type === "dm")return
        if(condition(message))
        {
            callBack(message)
        }

    })
}


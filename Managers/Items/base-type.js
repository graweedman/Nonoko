module.exports = (Stype, typeOptions) =>
{
    let {
        type,
        callBack
    } = typeOptions

    if(Stype === type)
    {
        return callBack()
    }
    

}


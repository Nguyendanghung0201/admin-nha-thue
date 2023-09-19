const rep = require('./repository')
exports.list = async function(){
    let result = await rep.get_list()
    return {
        status:true,
        code:0,
        msg:'success',
        data:result
    }
}
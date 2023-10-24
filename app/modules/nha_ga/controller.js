const model = require('./model')

exports.list = async function(){
    
    return await model.list()
}
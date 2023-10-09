const model = require('./model')

exports.list = async function (query) {
    return await model.list();
};
exports.add = async function (query){
    return await model.add(query)
}

exports.delete= async function(query){
    return await model.delete(query)
}

exports.update= async function(query){
    return await model.update(query)
}

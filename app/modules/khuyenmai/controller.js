const model = require('./model')
exports.list_khuyenmai= async()=>{
    return model.list()
}
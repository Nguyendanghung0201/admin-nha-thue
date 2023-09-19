const repLocation = require('./repository')
exports.add = async function (query) {
    let check = await repLocation.check(query.userInfo.Id, query.id);
    if (check) {
        return {
            status: true,
            msg: "success",
            code: 0,
            data: []
        }
    }
    let result = await repLocation.add({
        "user_id": query.userInfo.Id,
        "buiding_id": query.id
    })
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    }
}
exports.delete = async function (query) {
    let result = await repLocation.delete(query.userInfo.Id, query.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    }
}

exports.list = async function (query) {
    let result = await repLocation.getList(query.userInfo.Id,query.param.page)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    }
}

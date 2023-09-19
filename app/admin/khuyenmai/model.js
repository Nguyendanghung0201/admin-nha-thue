const rep = require('./repository')
exports.add = async function (query) {
    let result = await rep.add(query)
    return {
        status: true,
        code: 0,
        msg: 'success',
        data: result
    }
}
exports.delete = async function (query) {
    let result = await rep.delete(query.id)
    return {
        status: true,
        code: 0,
        msg: 'success',
        data: result
    }
}

exports.update = async function (query) {
    let result = await rep.update(query.id, query.content)
    return {
        status: true,
        code: 0,
        msg: 'success',
        data: result
    }
}
exports.list = async function () {
    let result = await rep.list()
    return {
        status: true,
        code: 0,
        msg: 'success',
        data: result
    }
}
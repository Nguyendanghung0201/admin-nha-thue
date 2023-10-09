const DbRe = require('./repository')
exports.list = async function (query) {
    let result = await DbRe.list()
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
};
exports.add = async function (query) {
    let result = await DbRe.insert_build(query)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
};
exports.delete = async function (query) {
    let result = await DbRe.delete(query.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
};
exports.update = async function (query) {
    let result = await DbRe.update(query.id,query.data)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
};



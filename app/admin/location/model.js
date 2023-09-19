const buildRes = require("./repository");

exports.delete = async function (query) {
    await buildRes.delete(query.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}


exports.add = async function (query) {
    await buildRes.add(query.data)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}

exports.update = async function (query) {
    await buildRes.update(query.id, query.data)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}

exports.delete_along = async function (query) {
    await buildRes.delete_along(query.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}


exports.add_along = async function (query) {
    await buildRes.add_along(query.data)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}

exports.update_along = async function (query) {
    await buildRes.update_along(query.id, query.data)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}
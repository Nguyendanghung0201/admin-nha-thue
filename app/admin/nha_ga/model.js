const Garepository = require('./repository')
exports.add = async function (query) {
    let result = await Garepository.insert_build(query)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}


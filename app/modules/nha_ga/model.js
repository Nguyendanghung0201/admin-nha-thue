
const repNha_Ga = require('./repository')
exports.list = async function(){
    let result =await repNha_Ga.list()
    console.log(result)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result

    }
}
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.blackListToken = async ({ token }) => {
    return await blackListTokenModel.create({ token })
}
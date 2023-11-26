const cookieManager = require("../shared/cookieManager")
const financasHandler = require("../handlers/financasHandler")()

module.exports = {
    financasPost: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')

        const userId = cookieManager.decodeCookie(req)

        cookieManager.validateId(userId);

        const result = await financasHandler.adicionar(req.body, userId)

        return res.status(result.status).json(result.message)
    },

}
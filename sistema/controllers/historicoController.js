const cookieManager = require("../shared/cookieManager");

module.exports = { 
    historicoGet: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')

        const userId = cookieManager.decodeCookie(req)
        cookieManager.validateId(userId);

        return res.render('historico')
    },
    
}
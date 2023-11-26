const cookieManager = require("../shared/cookieManager");

module.exports = { 
    dashboardGet: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')

        const userId = cookieManager.decodeCookie(req)

        cookieManager.validateId(userId);

        return res.render('dashboard')
    },
    
}
const cookieManager = require("../shared/cookieManager");
const historicoHandler = require("../handlers/historicoHandler")()

module.exports = { 
    historicoGet: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')

        const userId = cookieManager.decodeCookie(req)
        cookieManager.validateId(userId);

        let actualDate = new Date();
            let month = req.query.month || (actualDate.getMonth() + 1)
            let year = req.query.year || actualDate.getFullYear()

            const resultado = await historicoHandler.obterDadosMes(userId, month, year)

        return res.render('historico',{ contains: !!resultado.valid, dados: resultado.response})
    },
    
}
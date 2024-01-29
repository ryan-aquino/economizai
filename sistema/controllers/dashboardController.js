const financasHandler = require('../handlers/financasHandler')();
const categoriasHandler = require('../handlers/categoriaHandler')();
const cookieManager = require('../shared/cookieManager')


module.exports = { 
    dashboardGetByCategoria: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')
        const userId = cookieManager.decodeCookie(req)

        cookieManager.validateId(userId);

        let actualDate = new Date();
        let month = req.query.month || (actualDate.getMonth() + 1)
        let year = req.query.year || actualDate.getFullYear()

        let financaResult = await financasHandler.obterDadosMesDashboardByCategoria(userId, month, year);

        
        console.log(financaResult)

        return res.render('dashboard', {
            receitas: financaResult.response.receitas || [],
            despesas: financaResult.response.despesas || []
        })
    },


    rdashboardGetByCategoria: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')
        const userId = cookieManager.decodeCookie(req)

        cookieManager.validateId(userId);

        let actualDate = new Date();
        let month = req.query.month || (actualDate.getMonth() + 1)
        let year = req.query.year || actualDate.getFullYear()

        let financaResult = await financasHandler.obterDadosMesDashboardByCategoria(userId, month, year);

        console.log(financaResult)

        return res.render('dashboard', {
            receitas: financaResult.response.receitas || [],
            despesas: financaResult.response.despesas || []
        })
    },
    
}
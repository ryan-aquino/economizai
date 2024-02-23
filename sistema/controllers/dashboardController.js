const financasHandler = require('../handlers/financasHandler')();
const categoriasHandler = require('../handlers/categoriaHandler')();
const cookieManager = require('../shared/cookieManager')


module.exports = { 
    dashboardGet: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')
        const userId = cookieManager.decodeCookie(req)

        cookieManager.validateId(userId);

        let actualDate = new Date();
        let month = req.query.month || (actualDate.getMonth() + 1)
        let year = req.query.year || actualDate.getFullYear()

        let financaResultCategoria = await financasHandler.obterDadosMesDashboardByCategoria(userId, month, year);
        let financaResult = await financasHandler.obterDadosMesDashboard(userId, month, year);

        return res.render('dashboard', {
            receitasCategoria: financaResultCategoria.response.receitas || [],
            despesasCategoria: financaResultCategoria.response.despesas || [],
            receitas: financaResult.response.receitas || [],
            despesas: financaResult.response.despesas || []
        })
    },

}
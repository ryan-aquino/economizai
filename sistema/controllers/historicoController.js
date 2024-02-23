const categoriaHandler = require("../handlers/categoriaHandler")();
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
            const categoriasResultado = await categoriaHandler.obterCategorias(userId);

        return res.render('historico',{ contains: !!resultado.valid, 
            dados: {
                historico: resultado.response,
                categorias: categoriasResultado.valid ? categoriasResultado.response : []
            }
        })
    },

    historicoPut: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')

        const userId = cookieManager.decodeCookie(req)
        cookieManager.validateId(userId);

       const response = await historicoHandler.atualizarFinanca(userId, req.params.id, req.body)

       return res.status((await response).status).json({message: response.message || response.response})
    },
    
}
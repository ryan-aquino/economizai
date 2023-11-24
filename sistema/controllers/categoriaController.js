const categoriaHandler = require('../handlers/categoriaHandler')()
const cookieManager = require('../shared/cookieManager')

module.exports = {
    categoriaGet: async (req, res) => {
        cookieManager.containsCookie(req, res, `/`)

        const id = cookieManager.decodeCookie(req)
        cookieManager.validateId(res, id)

        const response = await categoriaHandler.obterCategorias(id)

        return res.render('categoria', {
            contains: response.valid,
            categorias: response.response || []
        })
    },

    categoriaPost: async (req, res) => {
        cookieManager.containsCookie(req, res, `/`)

        const id = cookieManager.decodeCookie(req)
        cookieManager.validateId(res, id)

        const response = await categoriaHandler.novaCategoria(req.body, id)
        return res.status(response.status).json({message: response.message || response.response})
    },

    categoriaPut: async (req, res) => {
        cookieManager.containsCookie(req, res, `/`)

        const id = cookieManager.decodeCookie(req)
        cookieManager.validateId(res, id)

        const response = await categoriaHandler.atualizarCategoria(req.body, req.params.id, id)
        return res.status(response.status).json({message: response.message || response.response})
    },

    categoriaDelete: async (req, res) => {
        cookieManager.containsCookie(req, res, `/`)

        const id = cookieManager.decodeCookie(req)
        cookieManager.validateId(res, id)

        const response = await categoriaHandler.excluirCategoria(req.params.id, id)

        return res.status(response.status).json({message: response.message || response.response})
    },
}
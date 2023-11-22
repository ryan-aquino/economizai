const categoriaHandler = require('../handlers/categoriaHandler')()
const {descriptografar} = require('../shared/cryptograph');
const {chave, cookieName} = require('../config')

const validateId = (id, res) => {
    if (typeof (id) != "number" && id <= 0)
        return res.redirect('/')
}

module.exports = {
    categoriaGet: async (req, res) => {
        if (!req.cookies[cookieName])
            return res.redirect('/')

        const id = descriptografar(req.cookies[cookieName], chave)

        validateId(id, res)

        const response = await categoriaHandler.obterCategorias(id)

        return res.render('categoria', {
            contains: response.valid,
            categorias: response.response || []
        })
    },

    categoriaPost: async (req, res) => {
        if (!req.cookies[cookieName])
            return res.redirect('/')

        const id = descriptografar(req.cookies[cookieName], chave)

        validateId(id, res)

        const response = await categoriaHandler.novaCategoria(req.body, id)
        return res.status(response.status).json({message: response.message || response.response})
    },

    categoriaDelete: async (req, res) => {
        if (!req.cookies[cookieName])
            return res.redirect('/')

        const id = descriptografar(req.cookies[cookieName], chave)

        validateId(id, res)

        const response = await categoriaHandler.excluirCategoria(req.params.id, id)

        return res.status(response.status).json({message: response.message || response.response})
    },
}
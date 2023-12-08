const usuarioHandler = require('../handlers/usuarioHandler')();
const financasHandler = require('../handlers/financasHandler')();
const categoriasHandler = require('../handlers/categoriaHandler')();
const cookieManager = require('../shared/cookieManager')
const {cookieName} = require('../config')

module.exports = {

    indexGet: async (req, res) => {
        try {
            if (req.cookies[cookieName])
                return res.redirect('/inicio')

            return res.render('login', {enabled: false});
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    indexPost: async (req, res) => {

        try {
            const usuario = await usuarioHandler.login(req.body);

            if (usuario.valid) {
                cookieManager.createCookie(res, usuario.response.id)
                return res.redirect('/inicio');
            }

            return res.render('login', {
                enabled: !usuario.valid,
                title: 'Erro ao tentar logar!',
                content: usuario.message?.split('. ')
            });

        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    logoffGet: async (req, res) => {
        try {
            cookieManager?.deleteCookie(res);
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    cadastroGet: async (req, res) => {

        try {
            res.render('cadastro', {enabled: false, title: "", content: ""});
        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    cadastroPost: async (req, res) => {

        try {
            const novoUsuario = await usuarioHandler.novoUsuario(req.body);

            if (novoUsuario.valid)
                return res.redirect('/')

            res.render('cadastro', {
                enabled: !novoUsuario.valid,
                title: "Dados inválidos!",
                content: novoUsuario.message.split('. ')
            })

        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    inicioGet: async (req, res) => {
        try {
            cookieManager.containsCookie(req, res, '/')
            const userId = cookieManager.decodeCookie(req)

            cookieManager.validateId(userId);

            let actualDate = new Date();
            let month = req.query.month || (actualDate.getMonth() + 1)
            let year = req.query.year || actualDate.getFullYear()

            let categoriaResult = await categoriasHandler.obterCategorias(userId);
            let financaResult = await financasHandler.obterDadosMes(userId, month, year);

            return res.render('inicio', {
                categorias: categoriaResult.response || [],
                receitas: financaResult.response.receitas || 0,
                despesas: financaResult.response.despesas || 0,
                saldo: financaResult.response.saldo || 0
            })
        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    perfilGet: async (req, res) => {
        try {
            cookieManager.containsCookie(req, res, '/')
            const userId = cookieManager.decodeCookie(req)

            cookieManager.validateId(userId);
            const resultado = await usuarioHandler.obterPorId(userId)

            if(!resultado.valid) {
                cookieManager.deleteCookie(res)
                return res.redirect('/')
            }

            return res.render('perfil', {usuario: resultado.response})
        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    perfilPut: async (req, res) => {
        try {
            cookieManager.containsCookie(req, res, '/')
            const userId = cookieManager.decodeCookie(req)

            cookieManager.validateId(userId);
            const resultado = await usuarioHandler.atualizarUsuario(req.body, userId)

            return res.status(resultado.status).json(resultado.message)
        } catch (error) {
            console.error('Erro ao processar:', error);
            res.status(500).send(error.messages);
        }
    }
}
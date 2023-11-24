const usuarioHandler = require('../handlers/usuarioHandler')();
const categoriasHandler = require('../handlers/categoriaHandler')();
const cookieManager = require('../shared/cookieManager')
const { cookieName } = require('../config')

module.exports = {

    indexGet: async (req, res) => {
        try {
            if(req.cookies[cookieName])
               return res.redirect('/inicio')

           return res.render('login', { enabled: false });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    indexPost: async (req, res) => {

        try {
            const usuario = await usuarioHandler.login(req.body);

            if(usuario.valid) {
                cookieManager.createCookie(res, usuario.response.id)
                return res.redirect('/inicio');
            }

            return res.render('login', { enabled: !usuario.valid,
                title: 'Erro ao tentar logar!',
                content: usuario.message?.split('. ') });

        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    logoffGet: async (req, res) => {
        try {
            return res.redirect('/');
            cookieManager.deleteCookie();
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor');
        }
    },


    cadastroGet: async (req, res) => {

        try {
            res.render('cadastro', { enabled: false, title: "", content: "" });
        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
        }
    },

    cadastroPost: async (req, res) => {

        try {
            const novoUsuario = await usuarioHandler.novoUsuario(req.body);

            if(novoUsuario.valid)
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
       cookieManager.containsCookie(req, res, '/')
       let userId = cookieManager.decodeCookie(req)

       let result = await categoriasHandler.obterCategorias(userId);

        return res.render('inicio', {  categorias: result.response || []  })
    },
    
    perfilGet: async (req, res) => {
        cookieManager.containsCookie(req, res, '/')
        return res.render('perfil')
    },
    
}
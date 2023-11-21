const usuarioHandler = require('../handlers/usuarioHandler')();
const { criptografar, descriptografar } = require('../shared/cryptograph');
const { chave, maxAge, cookieName } = require('../config')

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
                res.cookie(cookieName, criptografar(usuario.response.id.toString(), chave), { maxAge });
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
            res.clearCookie(cookieName);
            return res.redirect('/');
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
        if(!req.cookies[cookieName])
            return res.redirect('/')

        const id = descriptografar(req.cookies[cookieName], chave)
        return res.render('inicio')
    },
    
    perfilGet: async (req, res) => {
        if(!req.cookies[cookieName])
            return res.redirect('/')

        const id = descriptografar(req.cookies[cookieName], chave)
        return res.render('perfil')
    },
    
}
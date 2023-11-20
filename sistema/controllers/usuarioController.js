const usuarioHandler = require('../handlers/usuarioHandler')();
const { criptografar, descriptografar } = require('../shared/cryptograph');
const { chave, maxAge } = require('../config')

module.exports = {

    indexGet: async (req, res) => {
        try {
            if(req.cookies['_fgp'])
               return res.redirect('/dashboard')

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
                res.cookie('_fgp', criptografar(usuario.response.id.toString(), chave), { maxAge });
                return res.redirect('/dashboard');
            }

            return res.render('login', { enabled: !usuario.valid,
                title: 'Erro ao tentar logar!',
                content: usuario.message?.split('. ') });

        } catch (error) {
            console.error('Erro ao processar login:', error);
            res.status(500).send(error.messages);
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

    dashboardGet: async (req, res) => {
        if(!req.cookies['_fgp'])
            return res.redirect('/')

        const id = descriptografar(req.cookies['_fgp'], chave)

        return res.render('dashboard')
    }

}
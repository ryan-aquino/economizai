const usuarioRepository = require('../repository/usuarioRepository')();
const usuarioModel = require('../models/usuarioModel');
const { messages } = require('joi-translation-pt-br');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config');
const response = require('../shared/handlerResponse')


module.exports = () => ({

    novoUsuario: async (data) => {

        const { error, value } = usuarioModel.novoSchema.validate(data, { messages })

        if(error)
           return response(false, 400, error.message);

        const { nome, email, senha } = value;
        const usuario = await usuarioRepository.buscarUsuarioEmail(email);

        if (usuario)
            return response(false, 400,"Usuário já cadastrado");

        const senhaCriptografada = bcrypt.hashSync(senha, saltRounds)

        const usuarioAdicionado = await usuarioRepository.adicionarUsuario(nome, email.toLowerCase(), senhaCriptografada);

        if(usuarioAdicionado)
            return response(true, 200,"", { id: usuarioAdicionado });

        return response(false, 500,"Houve um erro ao tentar inserir");
    },

    login: async (data) => {

        const { error, value } = usuarioModel.loginSchema.validate(data, { messages })

        if(error)
            return response(false, 400, error.message)

        const { email, senha } = value;
        const usuario = await usuarioRepository.buscarUsuarioEmail(email.toLowerCase());

        if (!usuario)
            return response(false,400, "Email ou a senha é inválido!");

        if(!bcrypt.compareSync(senha, usuario.Senha))
            return response(false,400, "Email ou a senha é inválido!");

        return response(true, 200, "", { id: usuario.Id });

    },
})
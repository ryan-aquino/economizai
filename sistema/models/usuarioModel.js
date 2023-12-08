const Joi = require('joi');

const novoSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(120)
        .required(),

    senha: Joi.required(),

    confirmacaoSenha:  Joi.any()
                          .valid(Joi.ref('senha'))
                          .required()
                          .messages({
                            'any.only': 'A senha e a confirmação de senha precisam ser iguais',
                          }),

    email: Joi.string()
              .email()
              .required(),

    confirmacaoEmail: Joi.any()
        .valid(Joi.ref('email'))
        .required()
        .messages({
            'any.only': 'O email e a confirmação do email precisam ser iguais',
        }),

}).options({abortEarly : false})
  .with('senha', 'confirmacaoSenha')
    .with('email', 'confirmacaoEmail');

const atualizarSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(120)
        .required(),

    email: Joi.string()
              .email()
              .required(),

    senha: Joi.string()
             .allow('')
    
}).options({abortEarly : false})

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    senha: Joi.string()
        .required()

}).options({abortEarly : false});

module.exports = {
    novoSchema,
    atualizarSchema,
    loginSchema
};
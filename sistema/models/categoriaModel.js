const Joi = require('joi');

const novoSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(150)
        .required(),

    usuarioId: Joi.number()
                .integer()
                .required(),

    cor: Joi.string()
        .min(7)
        .max(7)
        .required(),

}).options({abortEarly : false});

const atualizarSchema = Joi.object({

    id:Joi.number()
        .integer()
        .required(),

    nome: Joi.string()
        .min(3)
        .max(150)
        .required(),

    cor: Joi.string()
        .min(7)
        .max(7)
        .required(),

}).options({abortEarly : false});

module.exports = {
    novoSchema,
    atualizarSchema
};
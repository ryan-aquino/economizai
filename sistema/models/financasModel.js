const Joi = require('joi');

const novoSchema = Joi.object({
    categoriaId: Joi.number()
        .integer()
        .required(),

    usuarioId: Joi.number()
        .integer()
        .required(),

    cor: Joi.string()
        .required(),

    nome: Joi.string()
        .required(),

    tipo: Joi.string(),

    valor: Joi.number()
        .precision(2)
        .required(),

    dataCadastro: Joi.date()
        .iso()
        .required()

}).options({ abortEarly: false });

const atualizarSchema = Joi.object({
    id: Joi.number()
        .integer()
        .required(),

    categoriaId: Joi.number()
        .integer()
        .required(),

    nome: Joi.string()
        .required(),

    cor: Joi.string()
        .required(),

    tipo: Joi.string()
        .required(),

    tipoOriginal: Joi.string()
        .required(),

    usuarioId: Joi.number()
        .integer()
        .required(),

    valor: Joi.number()
        .precision(2)
        .required(),

    dataCadastro: Joi.date()
        .required(),


}).options({ abortEarly: false });

module.exports = {
    novoSchema,
    atualizarSchema
};
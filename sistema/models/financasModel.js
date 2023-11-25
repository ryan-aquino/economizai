const Joi = require('joi');

const novoSchema = Joi.object({
    CategoriaId: Joi.number()
        .integer()
        .required(),

    UsuarioId: Joi.number()
        .integer()
        .required(),

    Valor: Joi.number()
        .precision(2)
        .required(),

    DataCadastro: Joi.date()
        .iso()
        .required()

}).options({ abortEarly: false });

const atualizarSchema = Joi.object({
    Id: Joi.number()
        .integer()
        .required(),

    CategoriaId: Joi.number()
        .integer()
        .required(),

    UsuarioId: Joi.number()
        .integer()
        .required(),

    Valor: Joi.number()
        .precision(2)
        .required(),

}).options({ abortEarly: false });

module.exports = {
    novoSchema,
    atualizarSchema
};
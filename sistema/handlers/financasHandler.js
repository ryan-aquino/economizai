const financasRepository = require('../repository/financaRepository')();
const financaModel = require('../models/financasModel');
const {messages} = require('joi-translation-pt-br');
const response = require('../shared/handlerResponse')
const dateManager = require('../shared/dateManager')


const validationReceita = (tipo) => {
    switch (tipo?.toLowerCase()) {
       case 'receita':
           return true;
        case 'despesa':
            return false;
        default:
            throw "Tipo inválido!"
    }
}

module.exports = () => ({
    obterDadosMes: async (userId, month, year) => {
        let receitas = await financasRepository.obterTodasReceitasPorMes(userId, month, year)
        let despesas = await financasRepository.obterTodasDespesasPorMes(userId, month, year)

        let receitasValor = receitas.reduce((soma, item) => soma + Number(item.Valor), 0);
        let despesasValor = despesas.reduce((soma, item) => soma + Number(item.Valor), 0);

        let saldo = receitasValor - despesasValor;

        return response(true, 200, "", {
            receitas: receitasValor,
            despesas: despesasValor,
            saldo: saldo
        })
    },

    adicionar: async (data, userId) => {

        const {error, value} = financaModel.novoSchema.validate({...data, usuarioId: userId }, {messages})

        if (error)
            return response(false, 400, error.message);

        const {tipo, categoriaId, valor, dataCadastro, usuarioId, nome} = value;
        let financaAdicionada = 0;
        console.log(dataCadastro)

        if(validationReceita(tipo))
           financaAdicionada = await financasRepository.adicionarReceita(categoriaId, usuarioId, nome, valor, dateManager.adHoras(dataCadastro, 3) );
        else
            financaAdicionada = await financasRepository.adicionarDespesa(categoriaId, usuarioId, nome, valor, dateManager.adHoras(dataCadastro, 3));

        if (financaAdicionada)
            return response(!!financaAdicionada, 201, "");

        return response(false, 500, "Houve um erro ao tentar inserir uma finança");
    },
})
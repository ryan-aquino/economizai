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
    obterDadosMesCompleto: async (userId, month, year) => {
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

    obterDadosMesDashboard: async (userId, month, year) => {
        let receitas = await financasRepository.obterTodasReceitasPorMes(userId, month, year);
        let despesas = await financasRepository.obterTodasDespesasPorMes(userId, month, year);

        let receitasValorTotal = receitas.reduce((soma, item) => soma + Number(item.Valor), 0);
        let despesasValorTotal = despesas.reduce((soma, item) => soma + Number(item.Valor), 0);

        for (const receita of receitas) {
            receita.Percentual = Math.round((receita.Valor / receitasValorTotal) * 100);
        }

        for (const despesa of despesas) {
            despesa.Percentual = Math.round((despesa.Valor / despesasValorTotal) * 100);
        }

        return response(true, 200, "", {
            receitas: receitas,
            despesas: despesas,
        })
    },

    adicionar: async (data, userId) => {

        const {error, value} = financaModel.novoSchema.validate({...data, usuarioId: userId }, {messages})

        if (error)
            return response(false, 400, error.message);

        const {tipo, categoriaId, valor, cor, dataCadastro, usuarioId, nome} = value;
        let financaAdicionada = 0;

        if(validationReceita(tipo))
           financaAdicionada = await financasRepository.adicionarReceita(categoriaId, usuarioId, nome, valor, cor, dateManager.adHoras(dataCadastro, 3) );
        else
            financaAdicionada = await financasRepository.adicionarDespesa(categoriaId, usuarioId, nome, valor, cor, dateManager.adHoras(dataCadastro, 3));

        if (financaAdicionada)
            return response(!!financaAdicionada, 201, "");

        return response(false, 500, "Houve um erro ao tentar inserir uma finança");
    },
})
const financasRepository = require('../repository/financaRepository')();
const financaModel = require('../models/financasModel');
const { messages } = require('joi-translation-pt-br');
const response = require('../shared/handlerResponse')


module.exports = () => ({
        obterDadosMes: async (userId, month, year) => {
            let receitas= await financasRepository.obterTodasReceitasPorMes(userId, month, year)
            let despesas= await financasRepository.obterTodasDespesasPorMes(userId, month, year)
            let limites= await financasRepository.obterTodosLimitesPorMes(userId, month, year)

            let receitasValor = receitas.reduce((soma, item) => soma + Number(item.Valor), 0);
            let despesasValor = despesas.reduce((soma, item) => soma + Number(item.Valor), 0);
            let limitesValor = limites.reduce((soma, item) => soma + Number(item.Valor), 0);

            let saldo = receitasValor - despesasValor;

            return response(true, 200, "", {
                receitas: receitasValor,
                despesas: despesasValor,
                limite: limitesValor,
                saldo: saldo
            })
        }
})
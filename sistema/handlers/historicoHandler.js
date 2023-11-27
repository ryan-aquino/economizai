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

        let receitasNovo = receitas.map((item) =>({...item,Valor:Number(item.Valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),DataCadastro:item.DataCadastro.toLocaleDateString("pt-BR"), tipo:'receita'}));
        let despesasNovo = despesas.map((item) => ({...item, Valor:Number(item.Valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),DataCadastro:item.DataCadastro.toLocaleDateString("pt-BR"), tipo:'despesa'}));

        let total = [...receitasNovo, ...despesasNovo];

        return response(true, 200, "",total)
    },

})
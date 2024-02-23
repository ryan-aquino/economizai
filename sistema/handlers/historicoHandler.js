const financasRepository = require('../repository/financaRepository')();
const financaModel = require('../models/financasModel');
const { messages } = require('joi-translation-pt-br');
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

        let receitasNovo = receitas.map((item) => ({
            ...item, Valor: Number(item.Valor),
            DataCadastro: item.DataCadastro.toISOString(), Tipo: 'receita'
        }));
        let despesasNovo = despesas.map((item) => ({
            ...item, Valor: Number(item.Valor),
            DataCadastro: item.DataCadastro.toISOString(), Tipo: 'despesa'
        }));

        let total = [...receitasNovo, ...despesasNovo];

        return response(true, 200, "", total)
    },
    atualizarFinanca: async (userId, financaId, data) => {
        const { error, value } = financaModel.atualizarSchema.validate({ ...data, id: financaId, usuarioId: userId }, { messages });

        if (error)
            return response(false, 400, error.message);

        const { id, nome, valor, cor, dataCadastro, categoriaId, usuarioId, tipo, tipoOriginal } = value;
        let financaExiste = null;
        if (validationReceita(tipoOriginal))
            financaExiste = await financasRepository.obterUmaReceitaPorId(usuarioId, id);
        else
            financaExiste = await financasRepository.obterUmaDespesaPorId(usuarioId, id);

        if (!financaExiste || financaExiste.UsuarioId != userId)
            return response(false, 404, "Finança não encontrada");


        if (tipo !== tipoOriginal) {
            if (validationReceita(tipoOriginal)) {
                const deletadoSucesso = await financasRepository.deletarReceita(id);
                if (deletadoSucesso) {
                    const inseridoSucesso = await financasRepository.adicionarDespesa(categoriaId, usuarioId, nome, valor, cor, dateManager.adHoras(dataCadastro, 3));

                    if (inseridoSucesso > 0)
                        return response(!!inseridoSucesso, 200, "");
                }

                return response(false, 500, "Houve um erro ao tentar atualizar uma receita ou despesa");
            } else {
                const deletadoSucesso = await financasRepository.deletarDespesa(id);
                if (deletadoSucesso) {
                    const inseridoSucesso = await financasRepository.adicionarReceita(categoriaId, usuarioId, nome, valor, cor, dateManager.adHoras(dataCadastro, 3));

                    if (inseridoSucesso > 0)
                        return response(!!inseridoSucesso, 200, "");
                }

                return response(false, 500, "Houve um erro ao tentar atualizar uma receita ou despesa");
            }
        }

        if(validationReceita(tipo)) {
            const financaAtualizada = await financasRepository.atualizarReceita(id, categoriaId, valor, cor, nome, dateManager.adHoras(dataCadastro, 3));
            if (financaAtualizada) {
                return response(!!financaAtualizada, 200, "");
            }
        } else {
            const financaAtualizada = await financasRepository.atualizarDespesa(id, categoriaId, valor, cor, nome, dateManager.adHoras(dataCadastro, 3));
            if (financaAtualizada) {
                return response(!!financaAtualizada, 200, "");
            }
        }

        return response(false, 500, "Houve um erro ao tentar atualizar a receita ou despesa");

    }
})
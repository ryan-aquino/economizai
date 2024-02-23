const categoriaRepository = require('../repository/categoriaRepository')();
const categoriaModel = require('../models/categoriaModel');
const { messages } = require('joi-translation-pt-br');
const response = require('../shared/handlerResponse')


module.exports = () => ({

    obterCategoriaId: async (categoriaId, userId) => {
        const categoria = await categoriaRepository.obterCategoriaPorId(categoriaId);

        if (!categorias.length || categoria.UsuarioId != userId)
            return response(false, 404, "Categoria não encontrada");

        return response(true, 200, "", categoria);
    },

    obterCategorias: async (userId) => {
        const categorias = await categoriaRepository.obterTodasCategorias(userId);

        if (!categorias.length)
            return response(false, 404, "Categoria não encontrada");

        return response(true, 200, "", categorias);
    },

    novaCategoria: async (data, userId) => {

        const { error, value } = categoriaModel.novoSchema.validate({...data, usuarioId: userId }, { messages })

        if(error)
            return response(false, 400, error.message);

        const { nome, cor, usuarioId } = value;
        const categoriaAdicionada = await categoriaRepository.adicionarCategoria(nome, cor, usuarioId);

        if(categoriaAdicionada)
            return response(!!categoriaAdicionada, 201,"");

        return response(false, 500,"Houve um erro ao tentar inserir uma categoria");
    },

    atualizarCategoria: async (data, categoriaId, userId) => {

        const { error, value } = categoriaModel.atualizarSchema.validate({ ...data, id: categoriaId }, { messages });

        if(error)
            return response(false, 400, error.message);

        const { id, nome, cor } = value;

        const categoriaExistente = await categoriaRepository.obterCategoriaPorId(id);

        if (!categoriaExistente || categoriaExistente.UsuarioId != userId)
            return response(false, 404, "Categoria não encontrada");

        const categoriaAtualizada = await categoriaRepository.atualizarCategoria(id, nome, cor);

        if (categoriaAtualizada) {
            return response(!!categoriaAtualizada, 200, "");
        }

        return response(false, 500, "Houve um erro ao tentar atualizar a categoria");
    },

    excluirCategoria: async (categoriaId, userId) => {
        const categoriaExistente = await categoriaRepository.obterCategoriaPorId(categoriaId);

        if (!categoriaExistente || categoriaExistente.UsuarioId != userId) {
            return response(false, 404, "Categoria não encontrada");
        }

        const categoriaExcluida = await categoriaRepository.excluirCategoria(categoriaId);

        if (categoriaExcluida) {
            return response(!!categoriaExcluida, 200, "", );
        }

        return response(false, 500, "Houve um erro ao tentar excluir a categoria");
    }
})
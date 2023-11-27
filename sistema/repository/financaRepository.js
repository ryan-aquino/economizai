const mysql = require('mysql2/promise')
const { database } = require('../config')

module.exports = () => {

    const pool = mysql.createPool(database);

    const adicionarReceita = async (categoriaId, usuarioId, valor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO Receitas (CategoriaId, UsuarioId, Valor, DataCadastro) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [categoriaId, usuarioId, valor, dataCadastro]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    const adicionarDespesa = async (categoriaId, usuarioId, valor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO Despesas (CategoriaId, UsuarioId, Valor, DataCadastro) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [categoriaId, usuarioId, valor, dataCadastro]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }


    const obterTodasReceitasPorMes = async (usuarioId, month, year) => {
        const connection = await pool.getConnection();

        try {
            const query = `SELECT Receitas.Id as Id,
            Receitas.CategoriaId as CategoriaId,
            Receitas.UsuarioId as UsuarioId,
            Receitas.Valor as Valor,
            Receitas.Nome as Nome,
            Receitas.DataCadastro as DataCadastro,
            Receitas.DataAtualizacao as DataAtualizacao,
            Categorias.Nome as CategoriaNome
            FROM Receitas
            JOIN Categorias ON Receitas.CategoriaId = Categorias.Id
            WHERE Receitas.UsuarioId = ? AND YEAR(Receitas.DataCadastro) = ? AND MONTH(Receitas.DataCadastro) = ?`;
            const [rows] = await connection.query(query, [usuarioId, year, month]);
            return rows;
        } catch (error) {
            console.error('Erro ao executar a consulta:', error);
        }
        finally {
            connection.release();
        }
    }

    const obterTodasDespesasPorMes = async (usuarioId, month, year) => {
        const connection = await pool.getConnection();

        try {
            const query = `SELECT Despesas.Id as Id,
            Despesas.CategoriaId as CategoriaId,
            Despesas.UsuarioId as UsuarioId,
            Despesas.Valor as Valor,
            Despesas.Nome as Nome,
            Despesas.DataCadastro as DataCadastro,
            Despesas.DataAtualizacao as DataAtualizacao,
            Categorias.Nome as CategoriaNome
            FROM Despesas
            JOIN Categorias ON Despesas.CategoriaId = Categorias.Id
            WHERE Despesas.UsuarioId = ? AND YEAR(Despesas.DataCadastro) = ? AND MONTH(Despesas.DataCadastro) = ?`;
            const [rows] = await connection.query(query, [usuarioId, year, month]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const atualizarReceita = async (receitaId, categoriaId, valor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = `
                                    UPDATE Receitas
                                    SET CategoriaId = ?,
                                        Valor = ?,
                                        DataCadastro = ?,
                                        DataAtualizacao = NOW()
                                    WHERE Id = ?
                                `;
            const [rows] = await connection.query(query, [categoriaId, valor, dataCadastro, receitaId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const atualizarDespesa = async (despesaId, categoriaId, valor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = `
                                    UPDATE Despesas
                                    SET CategoriaId = ?,
                                        Valor = ?,
                                        DataCadastro = ?,
                                        DataAtualizacao = NOW()
                                    WHERE Id = ?
                                `;
            const [rows] = await connection.query(query, [categoriaId, valor, dataCadastro, despesaId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    return {
        adicionarReceita,
        adicionarDespesa,
        obterTodasReceitasPorMes,
        obterTodasDespesasPorMes,
        atualizarReceita,
        atualizarDespesa
    }

}
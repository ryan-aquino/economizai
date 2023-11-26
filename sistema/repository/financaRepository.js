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

    const adicionarLimite = async (usuarioId, valor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO LimiteDespesas (UsuarioId, Valor, DataCadastro) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [usuarioId, valor, dataCadastro]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    const obterTodasReceitasPorMes = async (usuarioId, month, year) => {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM Receitas WHERE UsuarioId = ? AND YEAR(DataCadastro) = ? AND MONTH(DataCadastro) = ?';
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
            const query = 'SELECT * FROM Despesas WHERE UsuarioId = ?  AND YEAR(DataCadastro) = ? AND MONTH(DataCadastro) = ?';
            const [rows] = await connection.query(query, [usuarioId, year, month]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const obterTodosLimitesPorMes = async (usuarioId, month, year) => {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM LimiteDespesas WHERE UsuarioId = ?  AND YEAR(DataCadastro) = ? AND MONTH(DataCadastro) = ?';
            const [rows] = await connection.query(query, [usuarioId, year, month]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const obterTodosLimites = async (usuarioId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM LimiteDespesas WHERE UsuarioId = ?';
            const [rows] = await connection.query(query, [usuarioId]);
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
        adicionarLimite,
        obterTodasReceitasPorMes,
        obterTodasDespesasPorMes,
        obterTodosLimitesPorMes,
        obterTodosLimites,
        atualizarReceita,
        atualizarDespesa
    }

}
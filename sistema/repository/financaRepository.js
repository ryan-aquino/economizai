const mysql = require('mysql2/promise')
const { database } = require('../config')

module.exports = () => {

    const pool = mysql.createPool(database);

    const adicionarReceita = async (categoriaId, usuarioId, nome, valor, cor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO Receitas (CategoriaId, UsuarioId, Valor, Cor, Nome, DataCadastro) VALUES (?, ?, ?, ?, ?, ?)';
            const [result] = await connection.query(query, [categoriaId, usuarioId, valor, cor, nome, dataCadastro]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    const adicionarDespesa = async (categoriaId, usuarioId, nome, valor, cor, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO Despesas (CategoriaId, UsuarioId, Valor, Cor, Nome, DataCadastro) VALUES (?, ?, ?, ?, ?, ?)';
            const [result] = await connection.query(query, [categoriaId, usuarioId, valor, cor, nome, dataCadastro]);
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
            Receitas.Cor as Cor,
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

    const obterUmaReceitaPorId = async (usuarioId, id) => {
        const connection = await pool.getConnection();

        try {
            const query = `SELECT Receitas.Id as Id,
            Receitas.CategoriaId as CategoriaId,
            Receitas.UsuarioId as UsuarioId,
            Receitas.Valor as Valor,
            Receitas.Nome as Nome,
            Receitas.Cor as Cor,
            Receitas.DataCadastro as DataCadastro,
            Receitas.DataAtualizacao as DataAtualizacao,
            Categorias.Nome as CategoriaNome
            FROM Receitas
            JOIN Categorias ON Receitas.CategoriaId = Categorias.Id
            WHERE Receitas.UsuarioId = ? AND Receitas.Id = ?`;
            const [rows] = await connection.query(query, [usuarioId, id]);
            return rows[0];
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
            Despesas.Cor as Cor,
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

    const obterUmaDespesaPorId = async (usuarioId, id) => {
        const connection = await pool.getConnection();

        try {
            const query = `SELECT Despesas.Id as Id,
            Despesas.CategoriaId as CategoriaId,
            Despesas.UsuarioId as UsuarioId,
            Despesas.Valor as Valor,
            Despesas.Nome as Nome,
            Despesas.Cor as Cor,
            Despesas.DataCadastro as DataCadastro,
            Despesas.DataAtualizacao as DataAtualizacao,
            Categorias.Nome as CategoriaNome
            FROM Despesas
            JOIN Categorias ON Despesas.CategoriaId = Categorias.Id
            WHERE Despesas.UsuarioId = ? AND Despesas.Id = ?`;
            const [rows] = await connection.query(query, [usuarioId, id]);
            return rows[0];
        } finally {
            connection.release();
        }
    }

    const atualizarReceita = async (receitaId, categoriaId, valor, cor, nome, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = `
                                    UPDATE Receitas
                                    SET CategoriaId = ?,
                                        Valor = ?,
                                        Cor = ?,
                                        Nome = ?,
                                        DataCadastro = ?,
                                        DataAtualizacao = NOW()
                                    WHERE Id = ?
                                `;
            const [rows] = await connection.query(query, [categoriaId, valor, cor, nome, dataCadastro, receitaId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const atualizarDespesa = async (despesaId, categoriaId, valor, cor, nome, dataCadastro) => {
        const connection = await pool.getConnection();

        try {
            const query = `
                                    UPDATE Despesas
                                    SET CategoriaId = ?,
                                        Valor = ?,
                                        Cor = ?,
                                        Nome = ?,
                                        DataCadastro = ?,
                                        DataAtualizacao = NOW()
                                    WHERE Id = ?
                                `;
            const [rows] = await connection.query(query, [categoriaId, valor, cor, nome, dataCadastro, despesaId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const deletarReceita = async (receitaId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM Receitas WHERE Id = ?';
            const [result] = await connection.query(query, [receitaId]);
            return result.affectedRows > 0; // Verifica se a categoria foi excluída com sucesso
        } finally {
            connection.release();
        }
    }

    const deletarDespesa = async (despesaId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM Despesas WHERE Id = ?';
            const [result] = await connection.query(query, [despesaId]);
            return result.affectedRows > 0; // Verifica se a categoria foi excluída com sucesso
        } finally {
            connection.release();
        }
    }


    const somarReceita = async (userId, month, year) => {
        const connection = await pool.getConnection();

        try {
            const query = `SELECT Id
                                  ,Nome
                                  ,Cor
                                  ,sum(valor) AS total_categoria
                            FROM 
                                (SELECT c.id
                                    ,r.UsuarioId
                                    ,r.DataCadastro
                                    ,c.Nome
                                    ,c.Cor
                                    ,r.valor
                                FROM receitas r
                                JOIN categorias c
                                ON r.CategoriaId = c.Id
                                WHERE r.UsuarioId = ? AND YEAR(r.DataCadastro) = ? AND MONTH(r.DataCadastro) = ?) v
                            GROUP BY c.Id, Nome, Cor`;
            const [rows] = await connection.query(query, [userId, year, month]);
            return rows; // Retorna as linhas com os totais de receita do mês por categoria
        } finally {
            connection.release();
        }
    }

    const somarDespesa = async (userId, month, year) => {
        const connection = await pool.getConnection();

        try {
            const query = `SELECT Id
                                  ,Nome
                                  ,Cor
                                  ,sum(valor) AS total_categoria
                            FROM 
                                (SELECT c.id
                                    ,d.UsuarioId
                                    ,d.DataCadastro
                                    ,c.Nome
                                    ,c.Cor
                                    ,d.valor
                                FROM despesas d
                                JOIN categorias c
                                ON d.CategoriaId = c.Id
                                WHERE d.UsuarioId = ? AND YEAR(d.DataCadastro) = ? AND MONTH(d.DataCadastro) = ?) v
                            GROUP BY c.Id, Nome, Cor`;
            const [rows] = await connection.query(query, [userId, year, month]);
            return rows; // Retorna as linhas com os totais de despesa do mês por categoria
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
        atualizarDespesa,
        obterUmaReceitaPorId,
        obterUmaDespesaPorId,
        deletarReceita,
        deletarDespesa,
        somarReceita,
        somarDespesa,
    }

}

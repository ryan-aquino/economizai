const mysql = require('mysql2/promise')
const { database } = require('../config')

module.exports = () => {

    const pool = mysql.createPool(database);

    const adicionarCategoria = async (nome, cor, usuarioId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO Categorias (Nome, Cor, UsuarioId, DataCadastro) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [nome, cor, usuarioId, new Date()]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    const obterTodasCategorias = async (usuarioId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM Categorias WHERE UsuarioId = ?';
            const [rows] = await connection.query(query, [usuarioId]);
            return rows;
        } finally {
            connection.release();
        }
    }

    const obterCategoriaPorId = async (categoriaId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM Categorias WHERE Id = ?';
            const [rows] = await connection.query(query, [categoriaId]);
            return rows[0]; // Assume que há apenas uma categoria com o ID fornecido
        } finally {
            connection.release();
        }
    }

    const atualizarCategoria = async (categoriaId, nome, cor) => {
        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE Categorias SET Nome = ?, Cor = ? WHERE Id = ?';
            const [result] = await connection.query(query, [nome, cor, categoriaId]);
            return result.affectedRows > 0; // Verifica se a categoria foi atualizada com sucesso
        } finally {
            connection.release();
        }
    }

    const excluirCategoria = async (categoriaId) => {
        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM Categorias WHERE Id = ?';
            const [result] = await connection.query(query, [categoriaId]);
            return result.affectedRows > 0; // Verifica se a categoria foi excluída com sucesso
        } finally {
            connection.release();
        }
    }

    return {
        adicionarCategoria,
        obterTodasCategorias,
        obterCategoriaPorId,
        atualizarCategoria,
        excluirCategoria
    }

}
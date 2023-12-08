const mysql = require('mysql2/promise')
const { database } = require('../config')

module.exports = () => {

    const pool = mysql.createPool(database);

    const buscarUsuarioEmail = async (email) => {
        const connection = await pool.getConnection();
        try {
            const query = 'SELECT * FROM Usuarios WHERE Email = ?';
            const [rows] = await connection.query(query, [email]);
            return rows[0] || null;
        } finally {
            connection.release();
        }
    };

    const adicionarUsuario = async (nome, email, hash) => {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO Usuarios (Nome, Senha, Email, DataCadastro) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query( query, [nome, hash, email?.toLowerCase(), new Date()]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    const buscarUsuarioId = async (usuarioId) => {
        const connection = await pool.getConnection();
        try {
            const query = 'SELECT * FROM Usuarios WHERE Id = ?';
            const [rows] = await connection.query(query, [usuarioId]);
            return rows[0] || null;
        } finally {
            connection.release();
        }
    };

    const atualizarUsuario = async (id, nome, email) => {
        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE Usuarios SET Nome = ?, Email = ? WHERE Id = ?';
            const [result] = await connection.query(query, [nome, email, id]);
            return result.affectedRows > 0; // Verifica se a categoria foi atualizada com sucesso
        } finally {
            connection.release();
        }
    }

    const atualizarSenha = async (id, nome, email, senha) => {
        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE Usuarios SET Nome = ?, Email = ?, Senha = ? WHERE Id = ?';
            const [result] = await connection.query(query, [nome, email, senha, id]);
            return result.affectedRows > 0; // Verifica se a categoria foi atualizada com sucesso
        } finally {
            connection.release();
        }
    }

    return {
        buscarUsuarioEmail,
        buscarUsuarioId,
        adicionarUsuario,
        atualizarUsuario,
        atualizarSenha
    }
}
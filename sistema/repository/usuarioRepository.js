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


    return {
        buscarUsuarioEmail,
        adicionarUsuario
    }

}
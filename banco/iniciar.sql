-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS economizaiDB;

-- Selecionar o banco de dados
USE economizaiDB;

-- Excluir tabelas se existirem
DROP TABLE IF EXISTS Usuarios, Categorias, Receitas, Despesas, LimiteDespesas;

-- Tabela de Usuários
CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(120) NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    Email VARCHAR(120) NOT NULL,
    DataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela de Categorias
CREATE TABLE Categorias (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioId INT NOT NULL,
    Nome VARCHAR(150) NOT NULL,
    Cor VARCHAR(7),
    DataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_Categorias_UsusarioId (UsuarioId),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- Tabela de Receitas
CREATE TABLE Receitas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CategoriaId INT NOT NULL,
    UsuarioId INT NOT NULL,
    Nome VARCHAR(150) NOT NULL,
    Valor DECIMAL(18,2) NOT NULL,
    Cor VARCHAR(7),
    DataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    DataAtualizacao DATETIME,
    INDEX idx_Receitas_CategoriaId (CategoriaId),
    INDEX idx_Receitas_UsusarioId (UsuarioId),
    INDEX idx_Receitas_DataCadastro (DataCadastro),
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
    
);

-- Tabela de Despesas
CREATE TABLE Despesas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CategoriaId INT NOT NULL,
    UsuarioId INT NOT NULL,
    Nome VARCHAR(150) NOT NULL,
    Valor DECIMAL(18,2) NOT NULL,
    Cor VARCHAR(7),
    DataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    DataAtualizacao DATETIME,
    INDEX idx_Despesas_CategoriaId (CategoriaId),
    INDEX idx_Despesas_UsusarioId (UsuarioId),
    INDEX idx_Despesas_DataCadastro (DataCadastro),
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

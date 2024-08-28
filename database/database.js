const Sequelize = require("sequelize");

// Criação de uma instância do Sequelize para conectar ao banco de dados
const connection = new Sequelize("projetopratico", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    logging: false // opcional, desativa logs SQL no console
});

// Exporta a conexão para ser usada em outros arquivos
module.exports = connection;

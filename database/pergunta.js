const sequelize = require("sequelize")
const connection = require("./database")
const { type } = require("express/lib/response")

const pergunta = connection.define("pergunta",{
    titulo:{
        type: sequelize.STRING,
        allowNull: false
        // primaryKey: true,
        // autoIncrement: true
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

pergunta.sync({force: false}).then(()=>{
    console.log("Tabela de perguntas criada com sucesso!")
})

module.exports = pergunta
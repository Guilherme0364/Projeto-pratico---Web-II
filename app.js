const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database.js");
const perguntaModel = require("./database/pergunta.js");
const app = express();

// Renderizador de HTML
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Rota para salvar a pergunta
app.post("/savequestion", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        // Redireciona após a criação, evitando o envio de resposta anterior
        res.redirect("/");
    }).catch((error) => {
        console.error("Erro ao salvar a pergunta:", error);
        // Pode ser útil enviar uma resposta de erro
        res.status(500).send("Erro ao salvar a pergunta.");
    });
});

// Rota para exibir o formulário de pergunta
app.get("/question", (req, res) => {
    res.render('question');
});

// Rota para a página inicial
app.get("/", (req, res) => {
    perguntaModel.findAll({ raw: true }).then(perguntas => {
        // Renderiza a página com as perguntas
        res.render("app", {
            perguntas: perguntas
        });
    }).catch((error) => {
        console.error("Erro ao buscar perguntas:", error);
        res.status(500).send("Erro ao buscar perguntas.");
    });
});

// Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de dados!");
    })
    .catch((msgErro) => {
        console.log("Erro ao conectar ao banco de dados:", msgErro);
    });

// Inicializa o servidor
app.listen(8181, function (erro) {
    if (erro) {
        console.log("Erro ao iniciar o servidor:", erro);
    } else {
        console.log("Servidor iniciado...");
    }
});

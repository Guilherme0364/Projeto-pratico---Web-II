const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database.js");
const perguntaModel = require("./database/pergunta.js");
const respostaModel = require("./database/resposta.js");
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

app.get("/question/:id", (req, res) => {
    var id = req.params.id;

    perguntaModel.findAll({ 
        where: { id: id } })
        order: [["id", "DESC"]]
        .then((pergunta) => {
        if(pergunta != undefined){
            res.render('detalhepergunta',{
                pergunta: pergunta,
                respostas: respostas
            })
        } else {
            res.redirect("/");
        }
    }).catch((error) => {
        console.error("Erro ao buscar pergunta:", error);
        res.status(500).send("Erro ao buscar pergunta.");
    });
});

app.post("/responder", (req, res) => {
    var perguntaId = req.body.pergunta;
    var corpo = req.body.corpo;

    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/question/" + perguntaId);
    }).catch((error) => {
        console.error("Erro ao salvar a resposta:", error);
        res.status(500).send("Erro ao salvar a resposta.");
    });
});

app.get("/resposta/delete/:id", (req, res) => {
    var id = req.params.id;

    respostaModel.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("back");
    }).catch((error) => {
        console.error("Erro ao excluir a resposta:", error);
        res.status(500).send("Erro ao excluir a resposta.");
    });
});

// Rota para a página inicial
app.get("/", (req, res) => {
    perguntaModel.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
        // Renderiza a página com as perguntas
        res.render("index", {
            perguntas: perguntas
        });
    }).catch((error) => {
        console.error("Erro ao buscar perguntas:", error);
        res.status(500).send("Erro ao buscar perguntas.");
    });
});

app.get("/stats", async (req, res) => {
    try {
        const totalPerguntas = await perguntaModel.count();
        const totalRespostas = await respostaModel.count();
        res.render("stats", {
            totalPerguntas: totalPerguntas,
            totalRespostas: totalRespostas
        });
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        res.status(500).send("Erro ao carregar estatísticas.");
    }
});


app.get("/question/edit/:id", (req, res) => {
    var id = req.params.id;

    perguntaModel.findByPk(id)
    .then(pergunta => {
        if (pergunta != undefined) {
            res.render("editQuestion", { pergunta: pergunta });
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        console.error("Erro ao buscar pergunta para edição:", error);
        res.status(500).send("Erro ao buscar pergunta.");
    });
});


app.post("/question/update", (req, res) => {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    perguntaModel.update(
        { titulo: titulo, descricao: descricao },
        { where: { id: id } }
    ).then(() => {
        res.redirect("/question/" + id);
    }).catch(error => {
        console.error("Erro ao atualizar pergunta:", error);
        res.status(500).send("Erro ao atualizar pergunta.");
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

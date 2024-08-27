const express = require("express"); 
const bodyParser = require("body-parser")
const connection = require("./database/database.js")
const perguntaModel = require("./database/pergunta.js")
const app = express(); 


// Renderizador de HTML
app.set("view engine", "ejs")


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static("public"));


app.post("/savequestion", (req,res) =>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    res.send("Formulário recebido! Titulo: " + titulo + " com descrição: " + descricao + ".")
})
 

app.get("/question", (req,res) => {
    res.render(('../view/question'))
})


connection.
    authenticate().
    then(() => {
        console.log("Conectado ao banco de dados!")
    })
    .catch((msgErro)=>{
        console.log("msgErro")
    })

    
app.listen(8181, function (erro) { 
   if (erro) { 
       console.log("Erro"); 
   } else { 
       console.log("Servidor iniciado..."); 
   } 
}); 

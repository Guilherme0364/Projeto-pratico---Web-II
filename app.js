const express = require("express"); 
const app = express(); 

// Renderizador de HTML
app.set("view engine", "ejs")

app.use(express.static("public"));

app.post("/savequestion", (req,res) => {
    res.send("Formulário recebifo com sucesso!")
})
 
app.get("/question", (req,res) => {
    res.render(('../view/question'))
})

app.listen(8181, function (erro) { 
   if (erro) { 
       console.log("Erro"); 
   } else { 
       console.log("Servidor iniciado..."); 
   } 
}); 

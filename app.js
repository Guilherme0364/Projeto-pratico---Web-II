const express = require("express"); 
const app = express(); 

// Renderizador de HTML
app.set("view engine", "ejs")

app.get("/:nome/:dev", (req,res) => {
    var nome = req.params.nome
    var dev = req.params.dev
    var exibirMsg = true

    var produtos = [
        {
            "nome": "MacBook Pro",
            "preco": "R$ 2.000,00",
            "quantidade": 1
        },
        {
            "nome": "iPhone 11",
            "preco": "R$ 1.000,00",
            "quantidade": 1
        },
        {
            "nome": "iPhone 11 Pro",
            "preco": "R$ 1.500,00",
            "quantidade": 1
        }
    ]

    res.render(('../view/index'),{
        nome: nome,
        dev: dev,
        company: "Unifae",
        salary: "R$ 1.000.000,00",
        msg: exibirMsg,
        produtos: produtos
    })
})
 
app.listen(8181, function (erro) { 
   if (erro) { 
       console.log("Erro"); 
   } else { 
       console.log("Servidor iniciado..."); 
   } 
}); 

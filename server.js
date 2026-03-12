const express = require("express")
const app = express()

const bancos = require("./data")

app.use(express.json())

app.get("/banco", (req, res) => {
    res.json({
        bancos: bancos
    })
})

app.get("/banco/:id", (req, res) => {

    const banco = bancos.find(b => b.id == req.params.id)

    if(!banco){
        return res.status(404).json({
            mensaje:"Banco no encontrado"
        })
    }

    res.json(banco)
})

app.get("/banco/:id/personas", (req, res) => {

    const banco = bancos.find(b => b.id == req.params.id)

    if(!banco){
        return res.status(404).json({
            mensaje:"Banco no encontrado"
        })
    }

    res.json({
        personas:banco.personas
    })
})
app.get("/banco/:id/personas/:personaId", (req, res) => {

    const banco = bancos.find(b => b.id == req.params.id)

    if(!banco){
        return res.status(404).json({
            mensaje:"Banco no encontrado"
        })
    }

    const persona = banco.personas.find(p => p.id == req.params.personaId)

    if(!persona){
        return res.status(404).json({
            mensaje:"Persona no encontrada"
        })
    }

    res.json(persona)
})

app.post("/banco", (req,res)=>{

    const nuevoBanco = {
        id:bancos.length + 1,
        nombre:req.body.nombre,
        personas:[]
    }

    bancos.push(nuevoBanco)

    res.status(201).json(nuevoBanco)
})
app.post("/banco/:id/personas",(req,res)=>{

    const banco = bancos.find(b => b.id == req.params.id)

    if(!banco){
        return res.status(404).json({
            mensaje:"Banco no encontrado"
        })
    }

    const nuevaPersona = {
        id:banco.personas.length + 1,
        nombre:req.body.nombre,
        saldo:req.body.saldo
    }

    banco.personas.push(nuevaPersona)

    res.status(201).json(nuevaPersona)
})

app.put("/banco/:id/personas/:personaId",(req,res)=>{

    const banco = bancos.find(b => b.id == req.params.id)

    if(!banco){
        return res.status(404).json({
            mensaje:"Banco no encontrado"
        })
    }

    const persona = banco.personas.find(p => p.id == req.params.personaId)

    if(!persona){
        return res.status(404).json({
            mensaje:"Persona no encontrada"
        })
    }

    persona.nombre = req.body.nombre
    persona.saldo = req.body.saldo

    res.json(persona)
})



app.delete("/banco/:id/personas/:personaId",(req,res)=>{

    const banco = bancos.find(b => b.id == req.params.id)

    if(!banco){
        return res.status(404).json({
            mensaje:"Banco no encontrado"
        })
    }

    const index = banco.personas.findIndex(p => p.id == req.params.personaId)

    if(index === -1){
        return res.status(404).json({
            mensaje:"Persona no encontrada"
        })
    }

    banco.personas.splice(index,1)

    res.json({
        mensaje:"Persona eliminada"
    })
})

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000")
})
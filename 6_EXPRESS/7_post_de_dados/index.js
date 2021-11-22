const express = require('express')

const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// ************ Usuario ********************


app.get('/users/create', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body);

    const name = req.body.name
    const age = req.body.age

    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {

    const id = req.params.id
    console.log(`Buscando usuario ${id}`);

    res.sendFile(`${basePath}/users.html`)

})

// ***********************************************************
app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)

})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})


const { log } = require('console')
const express = require('express')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()
const port = 3000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/save-user', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    if (newsletter === 'on') {
        newsletter = true
    } else{
        newsletter = false
    }
    await User.create({ name, occupation, newsletter })

    res.redirect('/')

})

app.get('/users', (req, res) => {

})

app.get('/users/:id', (req, res) => {
    const idBook = req.params.id

})

app.get('/edit', (req, res) => {
    res.sendFile(`${basePath}/updateform.html`)
})

app.post('/edit', (req, res) => {
    const idBook = req.body.idBook
    const title = req.body.title
    const pageNumber = req.body.pageNumber


})

app.post('/delete', (req, res) => {
    const idBook = req.body.idBook

})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

conn.sync().then(() => {
    app.listen(port)
}).catch((error) => console.log(error))
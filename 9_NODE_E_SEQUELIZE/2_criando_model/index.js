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
    res.sendFile(`${basePath}/bookform.html`)
})

app.post('/save-book', (req, res) => {

    const title = req.body.title
    const pageNumber = req.body.pageNumber


})

app.get('/books', (req, res) => {

})

app.get('/books/:id', (req, res) => {
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

app.post('/delete-book', (req, res) => {
    const idBook = req.body.idBook

})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

conn.sync().then(() => {
    app.listen(port)
}).catch((error) => console.log(error))
const { log } = require('console')
const express = require('express')

const app = express()
const port = 3000

const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

conn.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Conectou ao MySQL');

    app.listen(port)
})

const path = require('path')
const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.get('/add-book', (req, res) => {
    res.sendFile(`${basePath}/bookform.html`)
})

app.post('/save-book', (req, res) => {
    console.log(req.body);
    const title = req.body.title
    const pageNumber = req.body.pageNumber

    const query = `INSERT INTO books
    (title, pageNumber) VALUES 
    ('${title}', '${pageNumber}');`

    conn.query(query, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.get('/books', (req, res) => {
    const query = `SELECT * FROM books;`
    conn.query(query, function (err, data) {
        if (err) {
            console.log(err);
            return
        }
        const books = data
        console.log(books);
    })
})

app.get('/books/:id', (req, res) => {
    console.log(req.body);
    const idBook = req.params.id
    const query = `SELECT * FROM books WHERE idBook = ${idBook};`
    conn.query(query, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        console.log(data);
    })
})

app.get('/edit-book', (req, res) => {
    res.sendFile(`${basePath}/updateform.html`)
})

app.post('/edit-book', (req, res) => {
    const idBook = req.body.idBook
    const title = req.body.title
    const pageNumber = req.body.pageNumber

    const queryGet = `SELECT * FROM books WHERE idBook = ${idBook};`
    let book;
    conn.query(queryGet, function (err, data) {
        if (err) {
            console.log(err);
            return
        }
        const t = title == undefined ? '' : title
        const p = pageNumber == undefined ? 0 : pageNumber
        const queryUpdate = `UPDATE books SET title = "${t}", pageNumber = ${p} WHERE idBook = ${idBook};`
        conn.query(queryUpdate, function (err, data) {
            if (err) {
                console.log(err);
                return
            }
            res.redirect('/')
        })
    })
})

app.post('/delete-book', (req, res) => {
    const idBook = req.body.idBook
    const queryDelete = `DELETE FROM books WHERE idBook = ${idBook};`
    conn.query(queryDelete, function(err){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

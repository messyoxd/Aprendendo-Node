const { log } = require('console')
const express = require('express')

const app = express()
const port = 3000

const pool = require('./db/conn')


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

    const title = req.body.title
    const pageNumber = req.body.pageNumber

    const query = `INSERT INTO books
    (??, ??) VALUES 
    (?, ?);`
    const data = ['title', 'pageNumber', title, pageNumber]

    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.get('/books', (req, res) => {
    const query = `SELECT * FROM books;`
    pool.query(query, function (err, data) {
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
    const query = `SELECT * FROM books WHERE ?? = ?;`
    const data = ['idBook', idBook]
    pool.query(query, data, function (err, data) {
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

    const queryGet = `SELECT * FROM books WHERE ?? = ?;`
    const data = ['idBook', idBook]
    pool.query(queryGet, data, function (err, data) {
        if (err) {
            console.log(err);
            return
        }
        const t = title == undefined ? '' : title
        const p = pageNumber == undefined ? 0 : pageNumber
        const queryUpdate = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?;`
        const data2 = ['title', t, 'pageNumber', p, 'idBook', idBook]
        pool.query(queryUpdate, data2, function (err, data) {
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
    const queryDelete = `DELETE FROM books WHERE ?? = ?;`
    const data = ['idBook', idBook]
    pool.query(queryDelete, data, function(err){
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

app.listen(port)
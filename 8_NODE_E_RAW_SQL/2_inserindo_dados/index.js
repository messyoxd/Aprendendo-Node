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

conn.connect(function(err){
    if(err){
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

app.get('/add-book', (req, res)=>{
    res.sendFile(`${basePath}/bookform.html`)
})

app.post('/save-book', (req, res)=>{
    console.log(req.body);
    const title = req.body.title
    const pageNumber = req.body.pageNumber

    const query = `INSERT INTO books
    (title, pageNumber) VALUES 
    ('${title}', '${pageNumber}');`

    conn.query(query, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/')
    })
})

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})
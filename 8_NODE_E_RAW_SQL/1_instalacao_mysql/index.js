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

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

// app.listen(port, () => {
//     console.log(`App rodando na porta ${port}`);
// })
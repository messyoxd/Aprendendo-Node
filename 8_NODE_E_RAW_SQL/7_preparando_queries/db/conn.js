const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '0.0.0.0',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

module.exports = pool
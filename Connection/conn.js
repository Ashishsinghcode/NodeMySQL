const mysql = require('mysql')

const sql=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
})

module.exports =sql 
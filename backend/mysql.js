const mysql = require('mysql2')
const config = require('./config')

const dbconfig = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
})

dbconfig.connect(err => {
    if (err) {
    console.error('Error al conectar con MySQL:', err);
    }else{
        console.log('Base de datos conectada!')
    }
})

module.exports = dbconfig
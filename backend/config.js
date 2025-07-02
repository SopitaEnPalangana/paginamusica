require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 5000,
    },

    jwt:{
        secret: process.env.JET_SECRET || 'notasecreta!'
    },

    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'escuchate_user',
        password: process.env.MYSQL_PASSWORD || '1234',
        database: process.env.MYSQL_DB || 'escuchate_db'
    }
}
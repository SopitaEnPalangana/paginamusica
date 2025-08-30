const express = require('express')
const config = require('./config')
const path = require('path')
const app = express()


const index = require('./index')
const login = require('./auth')
const register = require('./auth')
const event = require('./event')
const profile = require('./profile')

//archivos estaticos desde frontend ----- what does that mean?
app.use(express.static(path.join(__dirname, '../frontend')))
app.use(express.json())

//set de port
app.set('port', config.app.port)

//rutas
app.use('/', index)
app.use('/', login)
app.use('/', register)
app.use('/', event)
app.use('/', profile)

module.exports = app;
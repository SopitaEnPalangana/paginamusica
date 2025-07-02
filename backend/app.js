const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const path = require('path')
const app = express()

const inicial = require('./inicial.js')  //"cargo" el js del backend a una const
const login = require('./auth.js')
const registeruser = require('./auth.js')
const registerartist = require('./auth.js')
const nuevoevento = require('./evento.js')

// Servir archivos estáticos desde /frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json())

//configuracion
app.set('port', config.app.port)

//me falta lo del middleware que no entendi que era así que no lo puse todavía

//rutas
app.use('/', inicial) // método de express. "cuando vaya a esta ruta, ejecuta inicial, la constante que cargue con el js que quise"
app.use('/', login)
app.use('/', registeruser)
app.use('/', registerartist)
app.use('/', nuevoevento)

module.exports = app;
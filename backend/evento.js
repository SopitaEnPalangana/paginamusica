const express = require('express')
const router = express.Router()
const config = require('./config')
const db = require ('./mysql')
const jwt = require('jsonwebtoken');

//aca tendria que pasar el json a query para la bd y agregar un nuevo evento

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token123
    
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, config.jwt.secret, (err, usuario) => {
        if (err) return res.status(403).json({ mensaje: 'Token inválido' });
        req.usuario = usuario; // Lo guardamos para usarlo después
        next();
    });
}

router.post('/nuevoevento', verificarToken, (req, res) => {
    const { date, time, place, descripcion, precio, entradas } = req.body;
    const artista_id = req.usuario.id

    const query = 'INSERT INTO Eventos (artista_id, date, time, place, descripcion, precio, entradas) VALUES (?, ?, ?, ?, ?, ?)'
    
    db.query(query, [artista_id, date, time, place, descripcion, precio, entradas], (err, result) => {
        if(err) return res.status(500).json({ mensaje: 'Error al guardar el evento', error: err });

        res.status(201).json({ mensaje: 'Evento guardado con éxito'})
    })
})

module.exports = router;
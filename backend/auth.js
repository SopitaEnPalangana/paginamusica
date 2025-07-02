const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./config')
const db = require ('./mysql')

//router.post('/login', login) // lo mismo que en app.js? asi sabe que esta ruta es de aca? que es esto de router?
                            //aca carga la ruta /login al servidorcito de rutas que despues de usa en app.js
//aca iria una funcion req res donde controlo si el usuario y contraseña existen y coinciden
//retorna una res en json que la asigno a data en el js del front y muestra en pantalla lo que yo le diga. Creo.

function generarToken(usuario) {
    return jwt.sign(usuario, config.jwt.secret, { expiresIn: '2h' });
}

//registro de usuarios
router.post('/registeruser', async (req, res) => {
    const { nombreU, usuarioU, mailU, contraseñaU } = req.body

    if(!nombreU || !usuarioU || !mailU || !contraseñaU) {
        return res.status(400).json({ mensaje: 'Faltan datos '})
    }

    const hash = await bcrypt.hash(contraseñaU, 10)

    const query = 'INSERT INTO Usuarios (nombre, usuario, mail, contraseña) VALUES (?, ?, ?, ?)'

    db.query(query, [nombreU, usuarioU, mailU, hash], (err, result) => {
        if(err) {return res.status(500).json({ mensaje: 'Error en la base de datos', error: err })}

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' })
    })
})

//registro de artista
router.post('/registerartist', async (req, res) => {
    const { artista, usuarioA, mailA, contraseñaA, generosA } = req.body;

    if(!artista || !usuarioA || !mailA || !contraseñaA){
        return res.status(400).json({ mensaje: 'Faltan datos' })
    }
    const hash = await bcrypt.hash(contraseñaA,10)

    const query = 'INSERT INTO Artistas (artista, usuario, mail, contraseña, generos) VALUES (?, ?, ?, ?, ?)'

    db.query(query, [artista, usuarioA, mailA, hash, generosA], (err, result) => {
        if(err) return res.status(500).json({ mensaje: 'Error en la base de datos', error: err });
        res.status(201).json({ mensaje: 'Artista registrado con exito' })
    })
})

//login pa los dos
router.post('/login', (req, res) => {
    const { tipo, usuario, contraseña } = req.body

    if(!usuario || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan datos' })
    }

    let tabla = tipo === 'artista' ? 'Artistas' : 'Usuarios'

    const query = `SELECT * FROM ${tabla} WHERE usuario = ?`

    db.query(query, [usuario], async (err, results) => {
        if(err) return res.status(500).json({ mensaje: 'Error en la base de datos', error: err });

        if(results.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado'});

        const user = results[0]

        const validPassword = await bcrypt.compare(contraseña, user.contraseña)
        if(!validPassword) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        const token = generarToken({ id: user.id, tipo})

        res.status(200).json({ mensaje: 'Login exitoso. Usuario dentro del sitio', token, tipo, id: user.id})
    })
})

module.exports = router;   //que es esto de exportar modulos y por que estoy exportando el router
                          //es el servidorcito de express que maneja mis rutas 
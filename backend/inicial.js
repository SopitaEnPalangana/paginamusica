const express = require('express')
const router = express.Router()
const path= require('path')
const db = require('./mysql')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/inicial.html'))
})


router.get('/eventos', async(req, res) => {
  try {
  }catch(error){

  }

})

module.exports = router;


//esto deberia tener la conexion a mysql.js para traer los datos de las tarjetas de eventos
//also si va al perfil user o perfil artista, se discrimina acá? creo que si, cada uno a su ruta
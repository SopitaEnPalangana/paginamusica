const express = require('express')
const router = express.Router()
const path= require('path')
const db = require('./mysql')
const middle = require('./middleware')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

router.get('/index', async (req,res) => {
    try{
        const eventcards = await db.getAllEvents()
        res.json(eventcards)
        console.log("Loading all events")
    }catch(err){
        console.error("Coudn't reach database: ", err)
        res.status(500).json({ message: "Couldn't load the events"})
    }
})

router.get('/decode', middle.checkToken, (req, res) => {
    res.json({ id: req.user.id })
})

module.exports = router;
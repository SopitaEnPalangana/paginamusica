const express = require('express')
const router = express.Router()
const db = require('./mysql')
const middle = require('./middleware')

router.post('/newevent', middle.checkToken, async (req, res) => {
    const { name, location, date, time } = req.body

    try{
        await db.createEvent(req.user.id, name, location, date, time)
        console.log("New event added")
        res.status(201).json({ success: true, message: "New event created" })
    }catch(err){
        console.error("Coudn't add the event: ", err)
        res.status(500).json({ message: "Couldn't create your event"})
    }
})


module.exports = router;
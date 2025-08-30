const express = require('express')
const router = express.Router()
const db = require('./mysql')

router.get('/profile/:id', async (req,res) => {
    const { id } = req.params
    try{
        const artistdata = await db.getProfileData(id)
        res.json(artistdata)
        console.log("Loading Artist's data")
    }catch(err){
        console.error("Coudn't reach database: ", err)
        res.status(500).json({ message: "Couldn't load the sucker"})
    }
})

module.exports = router;
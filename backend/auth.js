const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const db = require ('./mysql')
const jwt = require('jsonwebtoken')
const config = require('./config')

router.post('/register', async (req, res) => {
    const { artistname, username, mail, picture, spotify, youtube, apple, password } = req.body;

    const hashed = await bcrypt.hash(password,10)

    try{
        await db.addArtist(artistname, username, mail, picture, spotify, youtube, apple, hashed)
        console.log("New Artists added succesfully")
        res.status(201).json({ success: true, message: "New Artist registered succesfully!"})
        } catch(err){
            console.error("Couldn't add the artist:", err)
            return res.status(500).json({message: "Couldn't welcome you" });   
        }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try{
        const users = await db.ArtistLogin(username)
        if(users.length === 0) return res.status(401).json({ message: 'User not found'})
        
        const user = users[0]
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return res.status(401).json({ message: 'Wrong password' })
        
        const token = createToken({ id: user.id})
        
        res.status(200).json({ success: true, message: 'Welcome back you free minded bastard!', token, id: user.id}) //no entendi porque hace eso así
        console.log(`user loged in: ${user.username}`)
    }catch(err){
        console.error("Failed login: ", err)
        res.status(500).json({ message: "Failed login" })
    }
})

function createToken(user) {
    return jwt.sign(user, config.jwt.secret, {expiresIn: '1h'});
}

module.exports = router;
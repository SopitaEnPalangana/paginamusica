const mysql = require('mysql2')
const config = require('./config')

const dbconfig = {                              //seteo la info de la db
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conn

function connmysql(){
    conn = mysql.createConnection(dbconfig)  //pasa la info de la db al metodo
    conn.connect((err) => {
        if(err){
            console.log("Couldn't reach database: ", err)
        }else{
            console.log("Reached database! Yuupii")
        }
    })
}

connmysql()


function addArtist(artistname, username, mail, picture, spotify, youtube, apple, hashed){
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO artists (artistname, username, mail, picture, spotify, youtube, apple, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [artistname, username, mail, picture, spotify, youtube, apple, hashed], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })

}

function ArtistLogin(username){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM artists WHERE username = ?', username, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function getAllEvents(){
    return new Promise((resolve, reject) => {
        conn.query(`SELECT e.id, e.artist_id, e.name, e.location, e.date, e.time, 
                    a.artistname, a.picture 
                    FROM events e 
                    JOIN artists a ON e.artist_id = a.id`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function getProfileData(artist_id){
    return new Promise((resolve, reject) => {
        conn.query(`SELECT 
                e.name AS event_name,
                e.location,
                e.date,
                e.time,
                a.id AS artist_id,
                a.artistname,
                a.picture,
                a.description,
                a.spotify,
                a.youtube,
                a.apple
                FROM artists a
                LEFT JOIN events e ON e.artist_id = a.id
                WHERE a.id = ?`, artist_id, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function createEvent(artistID, name, location, date, time){
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO events (artist_id, name, location, date, time) VALUES (?, ?, ?, ?, ?)', 
            [artistID, name, location, date, time], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}



module.exports = {
    addArtist,
    ArtistLogin,
    getAllEvents,
    getProfileData,
    createEvent,
}
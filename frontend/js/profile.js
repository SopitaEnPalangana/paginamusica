const params = new URLSearchParams(window.location.search)
const artistID = params.get("id")

console.log("Artist ID:", artistID)

const res = await fetch(`http://localhost:4000/profile/${artistID}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
})
const profileData = await res.json()
const artist = profileData[0]
console.log(profileData)
console.log(artist)

document.querySelector(".profiletitle").textContent = artist.artistname
document.querySelector(".description").textContent = artist.description
document.querySelector(".spotify").textContent = artist.spotify
document.querySelector(".youtube").textContent = artist.youtube
document.querySelector(".apple").textContent = artist.apple

const template = document.getElementById("eventcard")
const wrapper = document.createElement("div")

if(!artist.event_name){
    document.querySelector(".eventlist h2").textContent = "No event's for this one yet"

}else{
    profileData.forEach(event => {
        const clone = template.content.cloneNode(true)
        const img = clone.querySelector("img")
        img.src = `${event.picture}`
        img.alt = `Picture of ${event.artistname}`
        clone.querySelector(".artistsname").textContent = event.artistname
        clone.querySelector(".eventsname").textContent = event.event_name
        clone.querySelector(".location").textContent = event.location
        
        const fecha = new Date(event.date)
        const dia = String(fecha.getDate()).padStart(2, '0')
        const mes = String(fecha.getMonth() + 1).padStart(2, '0')
        const anio = fecha.getFullYear()
        clone.querySelector(".date").textContent = `${dia}-${mes}-${anio}`

        clone.querySelector(".time").textContent = event.time

        wrapper.appendChild(clone)
    })
}
document.querySelector(".eventlist").appendChild(wrapper)

document.addEventListener("DOMContentLoaded", async() => {
    const token = localStorage.getItem("token")
    
    const neweventbtn = document.getElementById("neweventbutton")
    
    if(token){
       neweventbtn.style.display = "block"

    }
})
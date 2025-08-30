document.addEventListener("DOMContentLoaded", async() => {
    const token = localStorage.getItem("token")
    
    const loginbtn = document.getElementById("loginbutton")
    const profilebtn = document.getElementById("profilebutton")
    const logoutbtn = document.getElementById("logoutbutton")
    
    if(token){
        loginbtn.style.display = "none"
        
        profilebtn.style.display = "block"
        const tokendata = await fetch('http://localhost:4000/decode', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        const user = await tokendata.json()
        profilebtn.href = `profile.html?id=${user.id}`
        
        logoutbtn.style.display = "block"
        logoutbtn.addEventListener("click", () => {
            localStorage.removeItem("token")
            window.location.href = "index.html"
        })
        

    }else{
        loginbtn.style.display = "block"
        profilebtn.style.display = "none"
        logoutbtn.style.display = "none"
    }
})

const res = await fetch('http://localhost:4000/index', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
})
const events = await res.json()
console.log(events)

const template = document.querySelector("#eventcard")
const wrapper = document.createElement("div")

events.forEach(event => {
    const clone = template.content.cloneNode(true)
    const img = clone.querySelector("img")
    img.src = `${event.picture}`
    img.alt = `Picture of ${event.artistname}`
    clone.querySelector(".artistsname").textContent = event.artistname
    clone.querySelector(".eventsname").textContent = event.name
    clone.querySelector(".location").textContent = event.location

    const fecha = new Date(event.date)
    const dia = String(fecha.getDate()).padStart(2, '0')
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const anio = fecha.getFullYear()
    clone.querySelector(".date").textContent = `${dia}-${mes}-${anio}`

    clone.querySelector(".time").textContent = event.time
    clone.querySelector(".seeartistbutton").href = `profile.html?id=${event.artist_id}`

    wrapper.appendChild(clone)
})

document.querySelector(".eventlist").appendChild(wrapper)
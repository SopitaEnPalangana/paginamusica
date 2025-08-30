document.getElementById("EventForm").addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById("eventsname").value
    const location = document.getElementById("location").value
    const date = document.getElementById("date").value
    const time = document.getElementById("time").value
    const token = localStorage.getItem('token')

    const res = await fetch('http://localhost:4000/newevent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ name, location, date, time })
    })

    const data = await res.json()

    if (data.success) {
        const tokendata = await fetch('http://localhost:4000/decode', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        const user = await tokendata.json()
        window.location = `profile.html?id=${user.id}`
    }
})
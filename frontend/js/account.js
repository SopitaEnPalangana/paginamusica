document.getElementById("registerForm")?.addEventListener('submit', async (e) => {
    e.preventDefault()

    const artistname = document.getElementById("artistname").value
    const username = document.getElementById("username").value
    const mail = document.getElementById("mail").value
    const picture = document.getElementById("picture").value    
    const spotify = document.getElementById("spotify").value
    const youtube = document.getElementById("youtube").value
    const apple = document.getElementById("apple").value
    const password = document.getElementById("password").value


    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ artistname, username, mail, picture, spotify, youtube, apple, password })
    })

    const data = await res.json();

    if (data.success) { 
      window.location.href = './login.html'}
})

document.getElementById("loginForm")?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = document.getElementById("user").value
  const password = document.getElementById("password").value

  const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
  })

  const data = await res.json();

  localStorage.setItem('token', data.token);
  
  if (data.success) { 
    window.location.href = `profile.html?id=${data.id}`}
})
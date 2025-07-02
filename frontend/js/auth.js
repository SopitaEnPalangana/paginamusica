document.getElementById("loginForm").addEventListener('submit', async (e) => {
    e.preventDefault()

    const tipo = document.getElementById("tipo").value
    const usuario = document.getElementById("usuario").value;   //asigna el valor que ingresa el user 
    const contraseña = document.getElementById("contraseña").value;

    const res = await fetch('http://localhost:5000/login', { //va a la ruta que tengo que cargar en el backend
                                                            // No, va /login y hace un POST. porque asi esta configurado en el backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, usuario, contraseña }) //pasa en el json del post los valores que ingresó el user
    })

    const data = await res.json(); //la respuesta que espera en forma de json, la carga a mi const data

    document.getElementById("mensaje").textContent = data.mensaje;
    localStorage.setItem('token', data.token);
})

document.getElementById("registrouser").addEventListener('submit', async (e) => {
    e.preventDefault()

    const nombreU = document.getElementById("nombreU").value
    const usuarioU = document.getElementById("usuarioU").value
    const mailU = document.getElementById("mailU").value
    const contraseñaU = document.getElementById("contraseñaU").value

    const res = await fetch('http://localhost:5000/registeruser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ nombreU, usuarioU, mailU, contraseñaU })
    })

    const data = await res.json();

    document.getElementById("mensaje").textContent = data.mensaje; 
})

document.getElementById("registerartist").addEventListener('submit', async (e) => {
    e.preventDefault()

    const artista = document.getElementById("artista").value
    const usuarioA = document.getElementById("usuarioA").value
    const contraseñaA = document.getElementById("contraseñaA").value
    const mailA = document.getElementById("mailA").value
    const generosA = document.getElementById("generosA").value

    const res = await fetch('http://localhost:500/registerartist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ artista, usuarioA, mailA, contraseñaA, generosA })
    })

    const data = await res.json()

    document.getElementById("mensaje").textContent = data.mensaje
})
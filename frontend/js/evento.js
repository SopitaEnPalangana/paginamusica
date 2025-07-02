const radios = document.querySelectorAll('input[name="tipoEntrada"]');
const linkContainer = document.getElementById('linkContainer');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'link') {
      linkContainer.style.display = 'block';
    } else {
      linkContainer.style.display = 'none';
      document.getElementById('linkEntrada').value = ''; // Borra el link si no se usa
    }
  });
});

document.getElementById("nuevoevento").addEventListener('submit', async (e) => {
  e.preventDefault()

  const date = getElementById("date").value
  const time = getElementById("time").value
  const place = getElementById("place").value
  const descripcion = getElementById("descripcion").value
  const precio = getElementById("precio").value
  const entradas = getElementById("entradas").value
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:5000/nuevoevento', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify({ date, time, place, descripcion, precio, entradas })
  })

  const data = await res.json()

  document.getElementById("mensaje").textContent = data.mensaje;
})
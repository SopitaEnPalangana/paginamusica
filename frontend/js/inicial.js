const linkPerfil = document.querySelector("linkPerfil")
const buscador = document.getElementById("buscador")


linkPerfil.addEventListener("click", async (e) => {
    e.preventDefault()
     /* 
     checkea login para ir a su perfil => query id?
     */
})


buscador.addEventListener("submit", (e) => {
    e.preventDefault()

    /*
    Filtrar contenidos por busqueda. algun dia lo hare
    */
})

//fetch datos de eventos desde el view.js en backend. 

/* 
chat gpt dijo: 

document.addEventListener('DOMContentLoaded', async () => {
  const eventosContainer = document.querySelector('.eventos');

  try {
    const res = await fetch('/api/eventos');
    const eventos = await res.json();

    eventos.forEach(evento => {
      const div = document.createElement('div');
      div.classList.add('tarjetaevento');
      div.innerHTML = `
        <div class="fototarjeta">
          <img src="${evento.imagen || 'https://via.placeholder.com/150'}" alt="${evento.artista}">
        </div>
        <div class="informacion">
          <h3><span class="nombre">${evento.artista}</span></h3>
          <small><span class="tipo">${evento.tipo}</span></small>
          <small><span class="genero">${evento.genero}</span></small>
          <h4><span class="fecha">${evento.fecha}</span></h4>
          <h4><span class="ubicacion">${evento.ubicacion}</span></h4>
          <div class="parrafo"><p>${evento.descripcion}</p></div>
          <a href="#" class="botonleermas">Leer más</a>
        </div>`;
      eventosContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar eventos:', error);
  }
});


*/





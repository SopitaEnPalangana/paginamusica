const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto", app.get("port"));
});
//------------------------------------------------------------------------

//------------------------------------------------------------------------


/*
dijo chatgpt para verificar que los campos esten completos:

 <script>
    const form = document.getElementById('registroForm');
    const btnAceptar = document.getElementById('btnAceptar');
    const campos = form.querySelectorAll('input');

    function revisarCampos() {
      // Comprobar si todos los campos tienen contenido
      let completos = true;
      campos.forEach(input => {
        if (input.value.trim() === '') {
          completos = false;
        }
      });

      // Habilita o deshabilita el botón
      btnAceptar.disabled = !completos;
    }

    // Escuchar cambios en todos los inputs
    campos.forEach(input => {
      input.addEventListener('input', revisarCampos);
    });
  </script>*/
document.getElementById('contact-form-gdss').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formulario = this;
    const boton = document.getElementById('btn-enviar-gdss');
    const datos = new FormData(formulario);

    // Efecto visual de carga en el botón
    boton.innerText = 'Enviando...';
    boton.disabled = true;

    // Petición directa con tu nuevo código de Formspree
    fetch('https://formspree.io/f/xwvjwobw', {
        method: 'POST',
        body: datos,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('¡Solicitud enviada con éxito! Nos comunicaremos contigo muy pronto.');
            formulario.reset(); // Limpia los campos del formulario de inmediato
        } else {
            alert('Error al procesar el formulario. Código del servidor: ' + response.status);
        }
    })
    .catch(error => {
        alert('Error de red. Por favor, verifica tu conexión a internet.');
    })
    .finally(() => {
        // Restauramos el botón pase lo que pase
        boton.innerText = 'Enviar Solicitud';
        boton.disabled = false;
    });
});
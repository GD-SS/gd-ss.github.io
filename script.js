/* ==========================================================================
   LÓGICA GLOBAL DE LA PÁGINA (GDSS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PROCESAMIENTO DEL FORMULARIO DE CONTACTO (FORMSPREE) ---
    const contactForm = document.getElementById('contact-form-gdss');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const formulario = this;
            const boton = document.getElementById('btn-enviar-gdss');
            const datos = new FormData(formulario);

            boton.innerText = 'Enviando...';
            boton.disabled = true;

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
                    formulario.reset(); 
                } else {
                    alert('Error al procesar el formulario. Código del servidor: ' + response.status);
                }
            })
            .catch(error => {
                alert('Error de red. Por favor, verifica tu conexión a internet.');
            })
            .finally(() => {
                boton.innerText = 'Enviar Solicitud';
                boton.disabled = false;
            });
        });
    }


    // --- 2. LÓGICA PARA EL MENÚ HAMBURGUESA (MÓVIL) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }


    // --- 3. LÓGICA PARA CONTROL DE PESTAÑAS (SOBRE NOSOTROS) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 1. Quitar el estado activo de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Apagar los paneles quitando la clase active para iniciar la animación de salida
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // 3. Activar el botón actual
            button.classList.add('active');

            // 4. Cambiar el panel correspondiente con un desfase mínimo para dar fluidez al fade-in
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                setTimeout(() => {
                    targetPanel.classList.add('active');
                }, 50); 
            }
        });
    });


    // --- 4. ANIMACIÓN SCROLL REVEAL (EFECTO DE APARICIÓN EN PANTALLA) ---
    // Agregamos estilos CSS directamente por JS para no ensuciar el CSS principal
    const styleNode = document.createElement('style');
    styleNode.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s ease-out;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleNode);

    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100; // Pixeles de margen antes de activarse

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }

    // Escuchar el evento scroll y correrlo una vez al cargar por si elementos ya están en pantalla
    window.addEventListener('scroll', revealElements);
    revealElements();
});
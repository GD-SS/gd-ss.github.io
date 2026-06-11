/* ==========================================================================
   INTERACTIVIDAD PARA GDSS - SOLUCIONES TECNOLÓGICAS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
// 1. EFECTO EN EL MENÚ AL HACER SCROLL (Manteniendo el fondo naranja)
    const header = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Cuando baja, solo le damos una sombra más marcada, pero mantiene su color naranja
            header.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });
    // 2. VALIDACIÓN Y SIMULACIÓN DEL FORMULARIO DE CONTACTO
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Evitamos que la página se recargue automáticamente al enviar
            e.preventDefault();

            // Obtenemos los valores de los campos
            const nombre = contactForm.querySelector('input[type="text"]').value.trim();
            const correo = contactForm.querySelector('input[type="email"]').value.trim();
            const mensaje = contactForm.querySelector('textarea').value.trim();

            // Validación básica (por si acaso)
            if (nombre === '' || correo === '' || mensaje === '') {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }

            // Aquí puedes integrar en el futuro un servicio de envío de correos (como EmailJS o Formspree)
            // Por ahora, simulamos un envío exitoso con un mensaje elegante
            alert(`¡Gracias por comunicarte con GDSS, ${nombre}! \nHemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo al correo: ${correo} lo antes posible.`);
            
            // Limpiamos el formulario para que quede listo de nuevo
            contactForm.reset();
        });
    }

    // 3. ANIMACIÓN SUAVE DE REVELACIÓN (SCROLL REVEAL OPTIONAL)
    // Hace que las tarjetas de servicios aparezcan suavemente al bajar la página
    const cards = document.querySelectorAll('.card');
    
    const comprobarCards = () => {
        const triggerBottom = window.innerHeight * 0.85; // Punto de activación en la pantalla

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.6s ease-out';
            }
        });
    };

    // Configuración inicial para las tarjetas antes de que aparezcan
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    // Escuchamos el evento de scroll para activar la animación
    window.addEventListener('scroll', comprobarCards);
    // Ejecutamos una vez al cargar por si las tarjetas ya están visibles
    comprobarCards();
});
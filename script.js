// =========================================================================
// LÓGICA DE NAVEGACIÓN (MENÚ MÓVIL)
// =========================================================================

// Actualizar año en el footer (Lógica simple)
document.getElementById('current-year').textContent = new Date().getFullYear();

// Referencias del DOM para el menú
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const closeMenu = document.querySelector('.close-menu');

// Función para abrir el menú
navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
    navToggle.setAttribute('aria-expanded', true);
    document.body.classList.add('menu-open'); // Bloquea scroll y activa overlay
});

// Función para cerrar el menú
const closeNav = () => {
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
    document.body.classList.remove('menu-open');
};

closeMenu.addEventListener('click', closeNav);

// Cerrar menú al hacer clic en un enlace (para móviles)
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', closeNav);
});

// =========================================================================
// ANIMACIONES GENÉRICAS DE REVELACIÓN (FADE-IN-UP)
// =========================================================================

const faders = document.querySelectorAll('.fade-in-up');
const appearOptions = {
    threshold: 0.3, // Cuando el 30% del elemento es visible
    rootMargin: "0px 0px -50px 0px" 
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appeared');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Nota: Necesitas añadir este CSS a style.css para que funcione el fade-in genérico:
/* .fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in-up.appeared {
    opacity: 1;
    transform: translateY(0);
}
*/


// =========================================================================
// ANIMACIÓN GSAP (HERO TRANSFORMACIÓN - EFECTO 1)
// Se ejecuta al cargar el DOM completo
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Es CRUCIAL registrar los plugins antes de usarlos
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- PARTE A: ANIMACIÓN DE ENTRADA (Timeline) ---
        
        const title = document.querySelector('.title-transformacion');
        const words = title.querySelectorAll('.word-split');
        const tl = gsap.timeline(); // Crea una secuencia de animaciones

        // 1. Entrada de la Imagen (de derecha a izquierda)
        tl.fromTo(".hero-image-wrapper", 
            { x: '100%', opacity: 0 }, // Estado inicial (oculto a la derecha)
            { x: '0%', opacity: 1, duration: 1.5, ease: "power3.out" }, 
            0 // Inicia esta animación al inicio de la timeline
        );

        // 2. Revelación del Contenedor de Texto (Opacidad)
        tl.to(".hero-text-content", 
            { opacity: 1, duration: 0.5 }, 
            0.5 // Comienza 0.5s después de que inicia la imagen
        );

        // 3. Efecto Máquina de Escribir/Stagger (Palabra por palabra)
        tl.from(words, 
            { opacity: 0, y: 20, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }, 
            0.8 // Comienza 0.8s después
        );
        
        // 4. Subtítulo y Botón
        tl.from(".subtitle-transformacion, .btn-hero-cta", 
            { opacity: 0, y: 10, duration: 0.6, stagger: 0.2 }, 
            "-=0.3" // Inicia 0.3s antes de que finalice la animación anterior
        );


        // --- PARTE B: TRANSICIÓN AL SCROLL (ScrollTrigger) ---

        // Efecto de la IMAGEN al hacer scroll (Se encoge y desaparece hacia la esquina superior izquierda)
  //      gsap.to(".hero-image-wrapper", {
    //        scale: 0.3, 
     //       x: '-25%', 
     //       y: '-25%', 
       //     opacity: 0, 
       //     scrollTrigger: {
         //       trigger: "#hero-transformacion", 
        //        start: "top top", // Inicia cuando el hero toca la parte superior
       //         end: "bottom top", // Termina cuando el hero sale de la vista
         //       scrub: true, // Vincula la animación al movimiento del scroll
            }
        });

        // Efecto de 'PUSH' o 'Pin' del Hero para dar paso al siguiente contenido
        gsap.to("#hero-transformacion", {
            y: '-100vh', // Mueve todo el hero fuera de la vista hacia arriba
            scrollTrigger: {
                trigger: "#siguiente-contenido", // El trigger es la siguiente sección
                start: "top bottom", // Inicia cuando el siguiente contenido entra por el fondo
                end: "top top", // Termina cuando el siguiente contenido llega al top
                scrub: true,
                pin: false, // Se comporta como un "sticky" que luego se desliza
            }
        });

    } else {
        console.error("GSAP no está cargado. Asegúrate de incluir las librerías en tu HTML.");
    }
});

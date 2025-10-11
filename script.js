// CÓDIGO JAVASCRIPT COMPLEMENTARIO

document.addEventListener('DOMContentLoaded', () => {
    // 1. REGISTRAR PLUGINS DE GSAP
    gsap.registerPlugin(ScrollTrigger);

    // ----------------------------------------------------
    // PARTE A: ANIMACIÓN DE ENTRADA (Al cargar la página)
    // ----------------------------------------------------

    // Divide el texto por palabras (o spans)
    const title = document.querySelector('.title-transformacion');
    const words = title.querySelectorAll('.word-split'); // Usa las clases que definimos en el HTML

    // Timeline para la animación de carga (secuencia)
    const tl = gsap.timeline();

    // 1. Entrada de la Imagen (Suave ease-out)
    tl.to(".hero-image-wrapper", {
        x: '0%', // Mueve de 100% (fuera) a 0% (posición final)
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
    }, 0) // Inicia en el segundo 0 de la timeline

    // 2. Revelación del Texto (Contenedor principal)
    .to(".hero-text-content", {
        opacity: 1,
        duration: 0.5,
    }, 0.5) // Comienza 0.5s después de que inicia la imagen

    // 3. Efecto Máquina de Escribir Estilizada (Stagger)
    .from(words, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15, // Desfase entre cada palabra
        ease: "back.out(1.7)" // Rebote sutil y estilizado
    }, 0.8); // Comienza 0.8s después de que inicia la imagen
    
    // Opcional: Animar la línea del subtítulo y el botón
    tl.from(".subtitle-transformacion, .btn-hero-cta", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.2
    }, "-=0.3"); // Inicia 0.3s antes de que termine el stagger de las palabras



    // ----------------------------------------------------
    // PARTE B: TRANSICIÓN AL SCROLL (Efecto de Ocultar/Empujar)
    // ----------------------------------------------------

    gsap.to(".hero-image-wrapper", {
        // Al hacer scroll, la imagen se reduce y se mueve a la esquina superior
        scale: 0.3, // Reduce la escala
        x: '-25%', // Mueve un poco más a la izquierda
        y: '-25%', // Mueve un poco más arriba
        opacity: 0, // Desvanece
        
        scrollTrigger: {
            trigger: "#hero-transformacion", // El hero es el trigger
            start: "top top", // Empieza cuando el top del trigger toca el top del viewport
            end: "bottom top", // Termina cuando el bottom del trigger toca el top del viewport
            scrub: true, // Vincula la animación al scroll
            // markers: true, // Descomenta para ver las marcas de ScrollTrigger (Debugging)
        }
    });

    gsap.to("#hero-transformacion", {
        // Efecto 'push' o 'sticky': el hero se queda fijo mientras el siguiente contenido lo 'empuja'
        y: '-100vh', // Mueve el hero completamente fuera de la vista hacia arriba
        
        scrollTrigger: {
            trigger: "#siguiente-contenido", // El siguiente contenido es el que gatilla el fin del hero
            start: "top bottom", // Empieza cuando el top del siguiente contenido entra por el bottom
            end: "top top", // Termina cuando el top del siguiente contenido toca el top
            scrub: true,
            pin: false, // No necesitamos fijar el hero, solo moverlo elegantemente
        }
    });
});

// =========================================================================
// LÓGICA PRINCIPAL (EJECUTADA DESPUÉS DE CARGAR EL DOM)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {

    // Actualizar año en el footer (Lógica simple)
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // =========================================================================
    // LÓGICA DE NAVEGACIÓN (MENÚ MÓVIL)
    // =========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const navMenu = document.getElementById('nav-menu-list');

    // Abrir menú
    menuOpen.addEventListener('click', () => {
        navMenu.classList.add('active');
    });

    // Cerrar menú
    menuClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    // Cerrar menú al hacer click en un enlace (importante en mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});
    // =========================================================================
    // ANIMACIONES GENÉRICAS DE REVELACIÓN (FADE-IN-UP)
    // Funciona con las nuevas clases añadidas a style.css
    // =========================================================================

    const faders = document.querySelectorAll('.fade-in-up');
    const appearOptions = {
        threshold: 0.3, 
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


    // =========================================================================
    // ANIMACIÓN GSAP (HERO TRANSFORMACIÓN - EFECTO 1) - Mantenida
    // =========================================================================
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- PARTE A: ANIMACIÓN DE ENTRADA (Timeline) ---
        const title = document.querySelector('.title-transformacion');
        const words = title ? title.querySelectorAll('.word-split') : [];
        const tl = gsap.timeline(); 

        // 1. Entrada de la Imagen (de derecha a izquierda)
        tl.fromTo(".hero-image-wrapper", 
            { x: '100%', opacity: 0 }, 
            { x: '0%', opacity: 1, duration: 1.5, ease: "power3.out" }, 
            0 
        );

        // 2. Revelación del Contenedor de Texto (Opacidad)
        tl.to(".hero-text-content", 
            { opacity: 1, duration: 0.5 }, 
            0.5 
        );
        
        // 3. Efecto Máquina de Escribir/Stagger (Palabra por palabra)
        if (words.length > 0) {
             tl.from(words, 
                { opacity: 0, y: 20, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }, 
                0.8 
            );
        }
       
        // 4. Subtítulo y Botón
        tl.from(".subtitle-transformacion, .btn-hero-cta", 
            { opacity: 0, y: 10, duration: 0.6, stagger: 0.2 }, 
            "-=0.3" 
        );


        // --- PARTE B: TRANSICIÓN AL SCROLL (ScrollTrigger) ---
        
        // Efecto de 'PUSH' o 'Pin' del Hero para dar paso al siguiente contenido
        gsap.to("#hero-transformacion", {
            y: '-100vh', 
            scrollTrigger: {
                trigger: "#siguiente-contenido", 
                start: "top bottom", 
                end: "top top", 
                scrub: true,
                pin: false, 
            }
        });

    } else {
        if (typeof gsap === 'undefined') console.error("GSAP no está cargado. (Verifique los enlaces en index.html)");
        if (typeof ScrollTrigger === 'undefined') console.error("ScrollTrigger no está cargado. (Verifique los enlaces en index.html)");
    }
});

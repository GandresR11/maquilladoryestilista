document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVEGACIÓN
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const navMenu = document.getElementById('nav-menu-list');

    menuOpen.addEventListener('click', () => navMenu.classList.add('active'));
    menuClose.addEventListener('click', () => navMenu.classList.remove('active'));

    // Cerrar menú al clickear enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // 2. INTERSECTION OBSERVER (REVELACIÓN SUAVE)
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -100px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appeared');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => appearOnScroll.observe(el));

    // 3. GSAP - HERO EFFECTS
    if (window.innerWidth > 992) {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from(".hero-content", {
            y: 50, opacity: 0, duration: 1.5, ease: "power4.out"
        });

        // Parallax suave en imágenes de galería
        document.querySelectorAll('.gallery-image').forEach(img => {
            gsap.to(img, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: { trigger: img, scrub: true }
            });
        });
    }
});

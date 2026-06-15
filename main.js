/* =============================================
   CRAZY CASE — Animaciones & Lógica (Anime.js)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
       1. NAVBAR: cambio de estilo al hacer scroll
    ------------------------------------------ */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    /* ------------------------------------------
       2. HERO: animación de entrada de la imagen
    ------------------------------------------ */
    anime({
        targets: '.hero-img',
        opacity: [0, 1],
        scale: [0.95, 1],
        easing: 'easeOutExpo',
        duration: 900,
        delay: 200,
    });

    /* ------------------------------------------
       3. INTERSECTION OBSERVER — fade-up general
    ------------------------------------------ */
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const animClass = el.dataset.anime || 'fade-up';
            const delay    = parseInt(el.dataset.delay || '0', 10);
            const duration = parseInt(el.dataset.duration || '700', 10);

            const anims = {
                'fade-up':    { opacity: [0, 1], translateY: [50, 0] },
                'fade-left':  { opacity: [0, 1], translateX: [-60, 0] },
                'fade-right': { opacity: [0, 1], translateX: [60, 0] },
                'scale-in':   { opacity: [0, 1], scale: [0.85, 1] },
                'flip-up':    { opacity: [0, 1], rotateX: ['30deg', '0deg'], translateY: [40, 0] },
            };

            const props = anims[animClass] || anims['fade-up'];

            anime({
                targets: el,
                ...props,
                easing: 'easeOutExpo',
                duration,
                delay,
            });

            fadeObserver.unobserve(el);
        });
    }, observerOptions);

    document.querySelectorAll('[data-anime]').forEach(el => fadeObserver.observe(el));

    /* ------------------------------------------
       4. STAGGER en tarjetas de productos
    ------------------------------------------ */
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const cards = entry.target.querySelectorAll('.product-card');
            anime({
                targets: cards,
                opacity: [0, 1],
                translateY: [60, 0],
                scale: [0.9, 1],
                easing: 'easeOutBack',
                duration: 700,
                delay: anime.stagger(120),
            });
            cardObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) cardObserver.observe(catalogGrid);

    /* ------------------------------------------
       5. STAGGER en tarjetas de beneficios
    ------------------------------------------ */
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const cards = entry.target.querySelectorAll('.benefit-card');
            anime({
                targets: cards,
                opacity: [0, 1],
                translateY: [40, 0],
                delay: anime.stagger(100),
                easing: 'easeOutExpo',
                duration: 600,
            });
            benefitObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    const benefitGrid = document.getElementById('benefit-grid');
    if (benefitGrid) benefitObserver.observe(benefitGrid);

    /* ------------------------------------------
       6. STAGGER en pasos "Cómo funciona"
    ------------------------------------------ */
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const steps = entry.target.querySelectorAll('.step-card');
            anime({
                targets: steps,
                opacity: [0, 1],
                translateY: [50, 0],
                rotateY: ['15deg', '0deg'],
                delay: anime.stagger(150),
                easing: 'easeOutExpo',
                duration: 750,
            });
            stepsObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    const stepsGrid = document.getElementById('steps-grid');
    if (stepsGrid) stepsObserver.observe(stepsGrid);

    /* ------------------------------------------
       7. PARALLAX suave en el hero
    ------------------------------------------ */
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrollY * 0.06}px)`;
        }
    });

    /* ------------------------------------------
       8. CONTADOR animado de estadísticas
    ------------------------------------------ */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.count-up').forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                anime({
                    targets: el,
                    innerHTML: [0, target],
                    easing: 'easeOutExpo',
                    duration: 1800,
                    round: 1,
                    update(anim) {
                        el.innerHTML = Math.round(anim.animations[0].currentValue).toLocaleString('es-MX');
                    }
                });
            });
            counterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) counterObserver.observe(statsSection);

    /* ------------------------------------------
       9. MOBILE MENU toggle
    ------------------------------------------ */
    const menuBtn  = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (!isOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('open');
                anime({
                    targets: mobileMenu,
                    opacity: [0, 1],
                    translateY: [-10, 0],
                    easing: 'easeOutExpo',
                    duration: 300,
                });
            } else {
                anime({
                    targets: mobileMenu,
                    opacity: [1, 0],
                    translateY: [0, -10],
                    easing: 'easeInExpo',
                    duration: 250,
                    complete() {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('open');
                    }
                });
            }
        });

        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
            });
        });
    }

    /* ------------------------------------------
       10. FORMULARIO DE CONTACTO — envío vía WA
    ------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre   = document.getElementById('f-nombre').value.trim();
            const telefono = document.getElementById('f-telefono').value.trim();
            const equipo   = document.getElementById('f-equipo').value.trim();
            const mensaje  = document.getElementById('f-mensaje').value.trim();

            const text = encodeURIComponent(
                `Hola Crazy Case, me interesa un equipo a crédito.\n` +
                `👤 Nombre: ${nombre}\n` +
                `📱 Teléfono: ${telefono}\n` +
                `📦 Equipo de interés: ${equipo || 'Por definir'}\n` +
                `💬 Mensaje: ${mensaje || 'Sin mensaje adicional'}`
            );

            window.open(`https://wa.me/525631602538?text=${text}`, '_blank');

            const btn = contactForm.querySelector('[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> ¡Mensaje enviado!';
            btn.classList.add('bg-green-500');
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.classList.remove('bg-green-500');
                contactForm.reset();
            }, 3000);
        });
    }

});

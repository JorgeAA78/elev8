// ====================================
// ELEV8 - JAVASCRIPT PRINCIPAL
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========== MENÚ HAMBURGUESA ==========
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ========== HEADER SCROLL ==========
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(15, 15, 15, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll);

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ========== EMAILJS — CONFIGURACIÓN ==========
    // ⚠️ REEMPLAZÁ estos valores con los de tu cuenta de EmailJS:
    const EMAILJS_PUBLIC_KEY = 'eRmiVDn5KJCapo4ua';
    const EMAILJS_SERVICE_ID = 'service_29c3bkb';
    const EMAILJS_TEMPLATE_ADMIN = 'template_apkg4ah';          // Template → notificación al admin
    const EMAILJS_TEMPLATE_AUTOREPLY = 'template_fdwvjfg'; // Template → auto-respuesta al usuario

    // Inicializar EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // ========== FORMULARIO DE CONTACTO ==========
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const brand = formData.get('brand') || 'No especificado';
            const message = formData.get('message');

            // 🛡️ Honeypot anti-bot: si el campo oculto tiene valor, es un bot
            const honeypot = formData.get('website');
            if (honeypot) {
                // Simular éxito sin enviar nada (el bot no se entera)
                const fakeBtn = contactForm.querySelector('button[type="submit"]');
                fakeBtn.innerHTML = '<i class="fas fa-check me-2"></i>¡Mensaje Enviado!';
                contactForm.reset();
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Estado de carga
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;

            try {
                // Parámetros que se envían a ambos templates
                const templateParams = {
                    from_name: name,        // {{from_name}} en el template
                    to_email: email,         // {{to_email}} en el template
                    phone: phone,            // {{phone}} en el template
                    brand: brand,            // {{brand}} en el template
                    message: message         // {{message}} en el template
                };

                // Enviar los 2 emails en paralelo:
                // 1) Notificación al admin (vos)
                // 2) Auto-respuesta al usuario
                await Promise.all([
                    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, templateParams),
                    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_AUTOREPLY, templateParams)
                ]);

                // Éxito
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>¡Mensaje Enviado!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    submitBtn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                submitBtn.innerHTML = '<i class="fas fa-times me-2"></i>Error al enviar';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-danger');

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('btn-danger');
                    submitBtn.classList.add('btn-primary');
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ========== ANIMACIONES ON SCROLL ==========
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .solution-card, .portfolio-card, .pricing-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar elementos para animación
    const animatedElements = document.querySelectorAll('.service-card, .solution-card, .portfolio-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar

    // ========== ANIMACIONES SLIDE PROCESO (MOBILE) ==========
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const processCards = document.querySelectorAll('.process-card[data-slide]');

        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Entra en viewport - aplicar animación
                    entry.target.classList.add('slide-in');
                } else {
                    // Sale del viewport - remover para reanimar
                    entry.target.classList.remove('slide-in');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        processCards.forEach(card => {
            slideObserver.observe(card);
        });
    }

    // ========== AÑO ACTUAL EN FOOTER ==========
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }

    console.log('🚀 Elev8 - Sitio web cargado correctamente');
});

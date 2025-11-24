// Configuración de Contentful
const SPACE_ID = 'tu_space_id';
const ACCESS_TOKEN = 'tu_access_token';
const ENVIRONMENT = 'master';

// URLs de la API de Contentful
const CONTENTFUL_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`;
const ASSET_URL = (assetId) => `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/assets/${assetId}?access_token=${ACCESS_TOKEN}`;

// Elementos del DOM
const aboutContent = document.getElementById('about-content');
const servicesContent = document.getElementById('services-content');
const contactForm = document.getElementById('contact-form');

// Cargar datos desde Contentful
async function fetchContentfulData(contentType) {
    try {
        const response = await fetch(`${CONTENTFUL_URL}?content_type=${contentType}&access_token=${ACCESS_TOKEN}`);
        if (!response.ok) {
            throw new Error(`Error al cargar datos de ${contentType}: ${response.statusText}`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error al cargar datos:', error);
        return [];
    }
}

// Mostrar contenido de "Sobre Mí"
async function loadAboutContent() {
    const aboutData = await fetchContentfulData('about');
    if (aboutData && aboutData.length > 0) {
        const about = aboutData[0].fields;
        aboutContent.innerHTML = `
            <div class="about-text">
                <h3>${about.title || 'Sobre Mí'}</h3>
                <p>${about.description || ''}</p>
                <div class="skills">
                    ${about.skills ? about.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('') : ''}
                </div>
            </div>
            <div class="about-image">
                <img src="${about.image ? `https:${about.image.fields.file.url}` : 'images/placeholder.jpg'}" alt="${about.title || 'Sobre Mí'}">
            </div>
        `;
    } else {
        // Contenido por defecto en caso de error
        aboutContent.innerHTML = `
            <div class="about-text">
                <h3>Sobre Mí</h3>
                <p>Hola me llamo Jorge, soy un apasionado desarrollador web con experiencia en crear sitios web modernos y responsivos, así como en el desarrollo de asistentes virtuales personalizados.</p>
                <div class="skills">
                    <span class="skill-tag">HTML5</span>
                    <span class="skill-tag">CSS3</span>
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">Asistentes Virtuales</span>
                </div>
            </div>
            <div class="about-image">
                            </div>
        `;
    }
}

// Mostrar servicios
async function loadServices() {
    const servicesData = await fetchContentfulData('service');
    if (servicesData && servicesData.length > 0) {
        servicesContent.innerHTML = servicesData.map(service => {
            const fields = service.fields;
            return `
                <div class="service-card">
                    <i class="${fields.icon || 'fas fa-code'}"></i>
                    <h3>${fields.title || 'Servicio'}</h3>
                    <p>${fields.description || 'Descripción del servicio.'}</p>
                </div>
            `;
        }).join('');
    } else {
        // Servicios por defecto
        servicesContent.innerHTML = `
            <div class="service-card">
                <i class="fas fa-laptop-code"></i>
                <h3>Diseño Web</h3>
                <p>Diseño de sitios web modernos y responsivos que se adaptan a todos los dispositivos.</p>
            </div>
            <div class="service-card">
                <i class="fas fa-mobile-alt"></i>
                <h3>Desarrollo Móvil</h3>
                <p>Aplicaciones móviles nativas e híbridas para iOS y Android.</p>
            </div>
            <div class="service-card">
                <i class="fas fa-search"></i>
                <h3>SEO</h3>
                <p>Optimización de motores de búsqueda para mejorar el posicionamiento web.</p>
            </div>
            <div class="service-card">
                <i class="fas fa-robot"></i>
                <h3>Asistentes Virtuales y Chatbots</h3>
                <p>Diseño e implementación de asistentes virtuales y chatbots personalizados para automatizar la atención y mejorar la experiencia de tus usuarios.</p>
            </div>
        `;
    }
}

// Manejar el envío del formulario de contacto
async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    try {
        const response = await fetch('https://formspree.io/f/xdklylwo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                message: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
            })
        });
        
        if (response.ok) {
            alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
            contactForm.reset();
        } else {
            throw new Error('Error al enviar el mensaje');
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Cargar contenido dinámico
    loadAboutContent();
    loadServices();
    
    // Configurar el manejador del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});

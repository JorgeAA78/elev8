// Configuración de Contentful
const SPACE_ID = 'tu_space_id';
const ACCESS_TOKEN = 'tu_access_token';
const ENVIRONMENT = 'master';

// URLs de la API de Contentful
const CONTENTFUL_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`;

// Elementos del DOM
const servicesContent = document.getElementById('services-content');

// Cargar servicios desde Contentful
async function loadServices() {
    try {
        const response = await fetch(`${CONTENTFUL_URL}?content_type=service&access_token=${ACCESS_TOKEN}&order=fields.order`);
        if (!response.ok) {
            throw new Error(`Error al cargar servicios: ${response.statusText}`);
        }
        const data = await response.json();
        displayServices(data.items);
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        displayDefaultServices();
    }
}

// Mostrar servicios en la página
function displayServices(services) {
    if (!services || services.length === 0) {
        displayDefaultServices();
        return;
    }

    const servicesHTML = services.map(service => {
        const fields = service.fields;
        return `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${fields.icon || 'fas fa-code'}"></i>
                </div>
                <h3>${fields.title || 'Servicio'}</h3>
                <p>${fields.description || 'Descripción del servicio.'}</p>
                <ul class="service-features">
                    ${fields.features ? fields.features.map(feature => 
                        `<li><i class="fas fa-check"></i> ${feature}</li>`
                    ).join('') : ''}
                </ul>
            </div>
        `;
    }).join('');

    servicesContent.innerHTML = servicesHTML;
}

// Mostrar servicios por defecto en caso de error
function displayDefaultServices() {
    servicesContent.innerHTML = `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas fa-laptop-code"></i>
            </div>
            <h3>Diseño Web</h3>
            <p>Diseño de sitios web modernos y responsivos que se adaptan a todos los dispositivos.</p>
            <ul class="service-features">
                <li><i class="fas fa-check"></i> Diseño personalizado</li>
                <li><i class="fas fa-check"></i> Compatible con móviles</li>
                <li><i class="fas fa-check"></i> Optimizado para velocidad</li>
            </ul>
        </div>
        
        <div class="service-card">
            <div class="service-icon">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Desarrollo Móvil</h3>
            <p>Aplicaciones móviles nativas e híbridas para iOS y Android.</p>
            <ul class="service-features">
                <li><i class="fas fa-check"></i> Aplicaciones nativas</li>
                <li><i class="fas fa-check"></i> Aplicaciones híbridas</li>
                <li><i class="fas fa-check"></i> Publicación en tiendas</li>
            </ul>
        </div>
        
        <div class="service-card">
            <div class="service-icon">
                <i class="fas fa-search"></i>
            </div>
            <h3>SEO</h3>
            <p>Optimización de motores de búsqueda para mejorar el posicionamiento web.</p>
            <ul class="service-features">
                <li><i class="fas fa-check"></i> Investigación de palabras clave</li>
                <li><i class="fas fa-check"></i> Optimización On-Page</li>
                <li><i class="fas fa-check"></i> Informes de rendimiento</li>
            </ul>
        </div>
        
        <div class="service-card">
            <div class="service-icon">
                <i class="fas fa-robot"></i>
            </div>
            <h3>Asistentes Virtuales y Chatbots</h3>
            <p>Diseño e implementación de asistentes virtuales y chatbots personalizados para automatizar la atención y mejorar la experiencia de tus usuarios.</p>
            <ul class="service-features">
                <li><i class="fas fa-check"></i> Integración en sitios web y aplicaciones</li>
                <li><i class="fas fa-check"></i> Flujos de conversación a medida</li>
                <li><i class="fas fa-check"></i> Conexión con APIs y herramientas externas</li>
            </ul>
        </div>
    `;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
});

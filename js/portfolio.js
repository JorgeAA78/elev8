// Elementos del DOM
const portfolioGrid = document.querySelector('.portfolio-grid');

// Datos de los proyectos
const projects = [
  {
    id: 1,
    title: 'Sitio Web Personal',
    description: 'Un sitio web personal desarrollado con HTML, CSS y JavaScript.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    title: 'Aplicación de Tareas',
    description: 'Una aplicación para gestionar tareas diarias con React.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 3,
    title: 'Tienda en Línea',
    description: 'Una tienda en línea desarrollada con Next.js y Stripe.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    tags: ['Vue.js', 'Firebase', 'Sass'],
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 4,
    title: 'Asistente Virtual / Chatbot',
    description: 'Un asistente virtual inteligente integrado en un sitio web para responder preguntas frecuentes y guiar a los usuarios.',
    image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    tags: ['Chatbot', 'Asistentes Virtuales', 'JavaScript', 'APIs'],
    demoUrl: '#',
    codeUrl: '#'
  }
];

// Mostrar proyectos en la cuadrícula
function displayProjects() {
  if (!portfolioGrid) return;
  
  portfolioGrid.innerHTML = projects.map(project => `
    <div class="portfolio-item">
      <div class="portfolio-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="portfolio-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="portfolio-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="portfolio-links">
          <a href="${project.demoUrl}" class="button is-primary is-outlined is-small">
            <i class="fas fa-external-link-alt"></i> Ver Demo
          </a>
          <a href="${project.codeUrl}" class="button is-primary is-small">
            <i class="fab fa-github"></i> Código
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// Llamar a la función al cargar el DOM
document.addEventListener('DOMContentLoaded', displayProjects);

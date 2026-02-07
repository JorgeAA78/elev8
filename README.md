# 🚀 Elev8 - Landing Page Digital Agency

Una landing page moderna y profesional para agencia digital, construida con HTML5, SCSS y JavaScript vanilla.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Descripción

Landing page responsive para **Elev8 Digital**, una agencia especializada en desarrollo web, automatizaciones y soluciones digitales. Incluye diseño dark mode con efectos de glassmorphism, animaciones interactivas y formulario de contacto funcional.

## ✨ Características

- 🎨 **Diseño moderno** - Dark mode con acentos verdes neón
- 📱 **100% Responsive** - Adaptado para todos los dispositivos
- ⚡ **Animaciones interactivas** - Scroll infinito de tecnologías
- 🔷 **Canvas con hexágonos animados** - Partículas interactivas que siguen el cursor en el hero section
- 📝 **Formulario funcional** - Integración con Formspree
- 🔍 **SEO optimizado** - Meta tags, Open Graph, Schema.org
- 💬 **Chat integrado** - Soporte para widget n8n
- 🟢 **WhatsApp flotante** - Botón de contacto rápido

## 🛠️ Tecnologías

| Frontend | Estilos | Tools |
|----------|---------|-------|
| HTML5 | SCSS/Sass | npm |
| JavaScript ES6+ | CSS3 | Git |
| Bootstrap 5 (grid) | Font Awesome | Formspree |

## 📁 Estructura del Proyecto

```
landing-page1/
├── css/
│   └── styles.css          # CSS compilado
├── images/
│   ├── Ecommerce.webp
│   ├── Web Design.webp
│   └── Asistentes virtuales.webp
├── js/
│   ├── main.js             # JavaScript principal
│   └── hero-canvas.js      # Animación del hero
├── scss/
│   ├── _variables.scss     # Variables y colores
│   ├── _mixins.scss        # Mixins reutilizables
│   ├── _base.scss          # Estilos base
│   ├── _header.scss        # Header y navegación
│   ├── _hero.scss          # Sección hero
│   ├── _process.scss       # Sección proceso
│   ├── _services.scss      # Sección servicios
│   ├── _solutions.scss     # Sección soluciones
│   ├── _portfolio.scss     # Sección portfolio
│   ├── _pricing.scss       # Sección precios/promo
│   ├── _contact.scss       # Sección contacto
│   ├── _footer.scss        # Footer
│   ├── _whatsapp.scss      # Botón WhatsApp
│   ├── _responsive.scss    # Media queries
│   └── main.scss           # Archivo principal
├── index.html              # Página principal
├── package.json
└── README.md
```

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/elev8-landing.git
cd elev8-landing
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Compilar SCSS** (desarrollo)
```bash
npm run sass:watch
```

4. **Compilar SCSS** (producción)
```bash
npm run sass
```

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run sass` | Compila SCSS a CSS |
| `npm run sass:watch` | Compila y observa cambios |

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#0f0f0f` | Fondo principal |
| Secondary | `#1a1a1a` | Fondo secundario |
| Accent | `#00ff88` | Acentos y CTA |
| Text Light | `#ffffff` | Texto principal |
| Text Muted | `#a0a0a0` | Texto secundario |

## 📱 Secciones

1. **Hero** - Encabezado con canvas animado
2. **Servicios** - Grid de servicios ofrecidos
3. **Proceso** - Flujo de trabajo en 4 pasos
4. **Soluciones** - Tipos de proyectos
5. **Portfolio** - Galería de proyectos + tech stack
6. **Oferta** - Promoción de lanzamiento
7. **Contacto** - Formulario + información
8. **Footer** - Links y redes sociales

## 📧 Configuración del Formulario

El formulario usa **Formspree**. Para configurarlo:

1. Crear cuenta en [formspree.io](https://formspree.io)
2. Crear un nuevo formulario
3. Reemplazar el ID en `js/main.js`:
```javascript
fetch('https://formspree.io/f/TU_ID_AQUI', {
```

## 🔧 Personalización

### Cambiar colores
Editar `scss/_variables.scss`:
```scss
$primary: #0f0f0f;
$accent: #00ff88;
```

### Cambiar fuentes
Editar `scss/_variables.scss`:
```scss
$font-primary: 'Inter', sans-serif;
$font-heading: 'Outfit', sans-serif;
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Elev8 Digital**
- Email: infosoporte25@gmail.com
- WhatsApp: +54 11 6196-6833

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub.

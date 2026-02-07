// ====================================
// HERO CANVAS ANIMATION
// Hexágonos animados que siguen al mouse
// ====================================

(function () {
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;

    var c = document.getElementById("canvas-club");
    if (!c) return;

    var heroSection = document.querySelector('.hero');
    var w = c.width = heroSection.offsetWidth;
    var h = c.height = heroSection.offsetHeight;
    var ctx = c.getContext("2d");

    // Detectar si es mobile para reducir partículas
    var isMobile = window.innerWidth <= 768;
    var maxParticles = isMobile ? 12 : 30; // 12 en mobile, 30 en desktop
    var particles = [];
    var hue = 150; // Verde similar al accent color #00ff88

    var mouse = {};
    mouse.size = 200;
    mouse.x = mouse.tx = w / 2;
    mouse.y = mouse.ty = h / 2;

    var clearColor = "rgba(15, 15, 15, 0.95)"; // Mismo que $primary: #0f0f0f

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    function P() { }

    P.prototype = {
        init: function () {
            this.size = this.origSize = random(10, 100);
            this.x = random(0, w);
            this.y = Math.random() > 0.5 ? -this.size : h + this.size;
            this.speed = this.origSpeed = random(0.005, 0.015); // Más lento
        },

        draw: function () {
            this.distanceFromMouse = distance(this.x, this.y, mouse.x, mouse.y);
            ctx.strokeStyle = "hsla(" + hue + ", 90%, 50%, 1)";
            ctx.shadowColor = "hsla(" + hue + ", 100%, 55%, 1)";
            ctx.shadowBlur = this.size * 2;
            ctx.beginPath();
            ctx.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));

            for (var i = 0; i < 6; i++) {
                ctx.lineTo(
                    this.x + this.size * Math.cos(i * 2 * Math.PI / 6),
                    this.y + this.size * Math.sin(i * 2 * Math.PI / 6)
                );
            }

            ctx.closePath();
            ctx.lineWidth = 3;
            ctx.stroke();
            this.update();
        },

        update: function () {
            if (this.distanceFromMouse > 20) {
                this.x += (mouse.x - this.x) * this.speed;
                this.y += (mouse.y - this.y) * this.speed;
                if (this.distanceFromMouse < mouse.size) {
                    this.size += (0 - this.size) * this.speed;
                    this.speed += 0.005; // Aceleración más suave
                } else {
                    this.size += (this.origSize - this.size) * this.speed;
                }
            } else {
                this.init();
            }
        }
    };

    mouse.move = function () {
        if (!distance(mouse.x, mouse.y, mouse.tx, mouse.ty) <= 0.1) {
            mouse.x += (mouse.tx - mouse.x) * 0.08; // Seguimiento más suave
            mouse.y += (mouse.ty - mouse.y) * 0.08;
        }
    };

    mouse.touches = function (e) {
        var rect = c.getBoundingClientRect();
        var touches = e.touches;
        if (touches) {
            mouse.tx = touches[0].clientX - rect.left;
            mouse.ty = touches[0].clientY - rect.top;
        } else {
            mouse.tx = e.clientX - rect.left;
            mouse.ty = e.clientY - rect.top;
        }
    };

    mouse.mouseleave = function (e) {
        mouse.tx = w / 2;
        mouse.ty = h / 2;
    };

    // Event listeners solo para el hero section
    heroSection.addEventListener("mousemove", mouse.touches);
    heroSection.addEventListener("touchstart", mouse.touches);
    heroSection.addEventListener("touchmove", mouse.touches);
    c.addEventListener("mouseleave", mouse.mouseleave);

    window.addEventListener("resize", function () {
        w = c.width = heroSection.offsetWidth;
        h = c.height = heroSection.offsetHeight;
    });

    // Crear partículas
    for (var i = 1; i <= maxParticles; i++) {
        setTimeout(function () {
            var p = new P();
            p.init();
            particles.push(p);
        }, i * 50);
    }

    // Loop de animación
    function loop() {
        ctx.fillStyle = clearColor;
        ctx.fillRect(0, 0, w, h);
        mouse.move();
        for (var i = 0; i < particles.length; i++) {
            particles[i].draw();
        }
        requestAnimationFrame(loop);
    }

    loop();
})();

// Mobile menu

document.getElementById('menu-toggle').addEventListener('click', function () {
    this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    document.getElementById('mobile-menu').classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;

        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Cerrar menú móvil
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle.getAttribute('aria-expanded') === 'true') {
                menuToggle.click();
            }

            // Scroll suave
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Actualizar URL
            history.pushState(null, null, targetId);
        }
    });
});

// Form validation
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?56|0)[2-9]\d{8}$/;
    let isValid = true;

    // Validación de campos
    const validateField = (field, validator) => {
        if (!validator(field.value.trim())) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    };

    validateField(this.email, v => emailRegex.test(v));
    validateField(this.telefono, v => phoneRegex.test(v));
    validateField(this.nombre, v => v.length > 2);
    validateField(this.empresa, v => v.length > 2);

    if (!isValid) {
        alert('Por favor complete todos los campos requeridos correctamente.');
        return;
    }

    // Simular envío
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';

    setTimeout(() => {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
        this.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card-hover, .transition-all');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.8) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
};

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Accesibilidad del teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.click();
            menuToggle.focus();
        }
    }
});
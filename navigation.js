document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Set initial ARIA attributes for accessibility
    menuToggle.setAttribute('aria-expanded', 'false');
    const navLinksId = navLinks.getAttribute('id') || 'main-navigation';
    menuToggle.setAttribute('aria-controls', navLinksId);

    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
});
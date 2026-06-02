/**
 * navbar.js — Hamburger menu, smooth scroll, and sticky navbar logic.
 * Called once via initNavbar() on DOMContentLoaded.
 */

/**
 * Scrolls smoothly to a target section.
 * Falls back to regular scrollIntoView if smooth scroll is not supported.
 * @param {string} targetId - The id attribute of the target section element
 */
function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth' });
    } else {
        target.scrollIntoView();
    }
}

/**
 * Toggles the mobile menu open/closed state.
 * Mutates DOM by adding/removing 'hidden' class on the menu element.
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
}

/**
 * Closes the mobile menu (forces hidden state).
 * Called when a nav link inside the mobile menu is clicked.
 */
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    menu.classList.add('hidden');
}

/**
 * Initializes all navbar behavior.
 * Called once on DOMContentLoaded.
 */
function initNavbar() {
    // Hamburger toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Desktop nav links — smooth scroll
    const desktopLinks = document.querySelectorAll('nav ul:not(#mobile-menu ul) a[href^="#"]');
    desktopLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            scrollToSection(targetId);
        });
    });

    // Mobile nav links — close menu + smooth scroll
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            closeMobileMenu();
            const targetId = link.getAttribute('href').slice(1);
            scrollToSection(targetId);
        });
    });
}

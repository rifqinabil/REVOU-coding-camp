/**
 * theme.js — Dark mode toggle with localStorage persistence.
 * applyStoredTheme() must be called before DOMContentLoaded to prevent FOUC.
 */

/**
 * Gets the currently active theme based on the <html> element's class list.
 * @returns {'dark' | 'light'}
 */
function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Updates the toggle button icon based on the active theme.
 * Shows ☀️ when dark mode is active, 🌙 when light mode is active.
 * @param {string} theme - The current active theme ('dark' | 'light')
 */
function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

/**
 * Applies the stored theme from localStorage on page load.
 * Falls back to 'light' if no preference is stored or localStorage is unavailable.
 */
function applyStoredTheme() {
    let storedTheme = 'light';
    try {
        storedTheme = localStorage.getItem('theme') || 'light';
    } catch (e) {
        // localStorage not available (e.g. private browsing with strict settings)
        storedTheme = 'light';
    }

    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateToggleIcon(storedTheme);
}

/**
 * Toggles the current theme between 'light' and 'dark'.
 * Persists the new theme to localStorage and updates the icon.
 */
function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';

    if (next === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    try {
        localStorage.setItem('theme', next);
    } catch (e) {
        // localStorage not available — theme will not persist
    }

    updateToggleIcon(next);
}

/**
 * Typing effect helper — displays text character by character.
 * @param {HTMLElement} element - The element to type into
 * @param {string} text - The text to type
 * @param {number} speed - Delay in ms between characters (default: 80)
 */
function typeText(element, text, speed = 80) {
    if (!element || typeof text !== 'string') return;
    let i = 0;
    element.textContent = '';
    const timer = setInterval(function () {
        if (i < text.length) {
            element.textContent += text[i++];
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Bind theme toggle button click
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }
});

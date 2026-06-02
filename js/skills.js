/**
 * skills.js — Skills section rendering and progress bar animation.
 * Reads SKILLS_DATA from data.js, groups by category, and animates
 * progress bars when the section enters the viewport.
 */

/**
 * Animates a progress bar element from 0% to its target percentage.
 * Uses CSS transition (set via inline style).
 * @param {HTMLElement} barElement  - The inner fill element of the progress bar
 * @param {number}      targetPercent - Target width percentage (0–100)
 */
function animateProgressBar(barElement, targetPercent) {
    if (!barElement) return;
    const clampedTarget = Math.min(100, Math.max(0, targetPercent));
    // Allow a tiny delay for the browser to paint the 0% state first
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            barElement.style.width = clampedTarget + '%';
        });
    });
}

/**
 * Initializes skills section rendering and scroll animation.
 * @param {string} containerId - ID of the skills container element
 */
function initSkills(containerId) {
    if (typeof SKILLS_DATA === 'undefined' || !Array.isArray(SKILLS_DATA)) {
        console.warn('initSkills: SKILLS_DATA is not defined or not an array');
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('initSkills: container #' + containerId + ' not found');
        return;
    }

    // Group skills by category
    const groups = {};
    SKILLS_DATA.forEach(function (skill) {
        const cat = skill.category || 'Other';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(skill);
    });

    // Build HTML for each category group
    let html = '';
    Object.keys(groups).forEach(function (category) {
        html += '<div class="mb-10">';
        html += '<h3 class="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">' + category + '</h3>';
        html += '<div class="flex flex-col gap-4">';

        groups[category].forEach(function (skill) {
            const safeLevel = Math.min(100, Math.max(0, skill.level || 0));
            html +=
                '<div class="skill-item">' +
                    '<div class="flex justify-between mb-1">' +
                        '<span class="text-sm font-medium">' + escapeHtml(skill.name) + '</span>' +
                        '<span class="text-sm text-gray-500 dark:text-gray-400">' + safeLevel + '%</span>' +
                    '</div>' +
                    '<div class="progress-bar-track">' +
                        '<div class="progress-bar-fill" data-level="' + safeLevel + '"></div>' +
                    '</div>' +
                '</div>';
        });

        html += '</div></div>';
    });

    container.innerHTML = html;

    // Animate progress bars when the section enters the viewport
    const bars = container.querySelectorAll('.progress-bar-fill');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    bars.forEach(function (bar) {
                        const target = parseInt(bar.getAttribute('data-level'), 10) || 0;
                        animateProgressBar(bar, target);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(container);
    } else {
        // Fallback: set widths immediately without animation
        bars.forEach(function (bar) {
            const target = parseInt(bar.getAttribute('data-level'), 10) || 0;
            bar.style.width = target + '%';
        });
    }
}

/**
 * Escapes HTML special characters.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

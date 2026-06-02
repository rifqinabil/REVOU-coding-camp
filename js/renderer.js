/**
 * renderer.js — Dynamic project card generator.
 * Reads PROJECT_DATA from data.js and inserts cards into the DOM.
 */

/**
 * Creates the HTML string for a single project card.
 * Hides liveUrl/repoUrl links when they are null or empty.
 * @param {import('./data.js').ProjectData} project
 * @returns {string} HTML string for the card
 */
function createProjectCard(project) {
    if (!project || !project.title) {
        console.warn('createProjectCard: invalid project object', project);
        return '';
    }

    const techBadges = Array.isArray(project.technologies)
        ? project.technologies.map(function (tech) {
            return '<span class="skill-badge">' + escapeHtml(tech) + '</span>';
          }).join(' ')
        : '';

    const liveLink = project.liveUrl
        ? '<a href="' + escapeHtml(project.liveUrl) + '" target="_blank" rel="noopener noreferrer" ' +
          'class="live-link text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">' +
          '🔗 Live Demo</a>'
        : '';

    const repoLink = project.repoUrl
        ? '<a href="' + escapeHtml(project.repoUrl) + '" target="_blank" rel="noopener noreferrer" ' +
          'class="repo-link text-gray-600 dark:text-gray-300 hover:underline text-sm font-medium">' +
          '💻 Repository</a>'
        : '';

    const links = (liveLink || repoLink)
        ? '<div class="flex gap-4 mt-4">' + liveLink + repoLink + '</div>'
        : '';

    return (
        '<div class="project-card bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg ' +
        'hover:scale-105 transform transition-all duration-300 p-6 flex flex-col">' +
            '<h3 class="text-lg font-semibold mb-2">' + escapeHtml(project.title) + '</h3>' +
            '<p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">' +
                escapeHtml(project.description) +
            '</p>' +
            '<div class="flex flex-wrap gap-2 mt-4">' + techBadges + '</div>' +
            links +
        '</div>'
    );
}

/**
 * Renders all project cards from PROJECT_DATA into the DOM.
 * @param {string} containerId - ID of the container element to render into
 */
function renderProjects(containerId) {
    if (typeof PROJECT_DATA === 'undefined' || !Array.isArray(PROJECT_DATA)) {
        console.warn('renderProjects: PROJECT_DATA is not defined or not an array');
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('renderProjects: container #' + containerId + ' not found');
        return;
    }

    container.innerHTML = PROJECT_DATA.map(createProjectCard).join('');
}

/**
 * Escapes HTML special characters to prevent XSS.
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

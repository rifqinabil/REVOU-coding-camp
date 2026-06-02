/**
 * data.js — Static data arrays for the portfolio website.
 * PROJECT_DATA and SKILLS_DATA are consumed by renderer.js and skills.js.
 */

/**
 * @typedef {Object} ProjectData
 * @property {string}      title        - Judul proyek
 * @property {string}      description  - Deskripsi singkat proyek
 * @property {string[]}    technologies - Daftar teknologi yang digunakan
 * @property {string|null} liveUrl      - URL live demo; null jika tidak tersedia
 * @property {string|null} repoUrl      - URL repositori; null jika tidak tersedia
 */

/** @type {ProjectData[]} */
const PROJECT_DATA = [
    {
        title: 'Mbrebes Mili Website',
        description: 'Website company profile untuk UMKM Mbrebes Mili Food yang menjual produk makanan khas daerah.',
        technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
        liveUrl: null,
        repoUrl: null
    },
    {
        title: 'Portfolio Website',
        description: 'Website portofolio personal yang menampilkan profil, proyek, keahlian, dan form kontak.',
        technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
        liveUrl: null,
        repoUrl: 'https://github.com/rifqinabil/portfolio'
    }
];

/**
 * @typedef {Object} SkillData
 * @property {string} name     - Nama keahlian
 * @property {number} level    - Tingkat kemahiran (0–100)
 * @property {string} category - Kategori keahlian
 */

/** @type {SkillData[]} */
const SKILLS_DATA = [
    // Frontend
    { name: 'HTML5',        level: 60, category: 'Frontend' },
    { name: 'CSS3',         level: 50, category: 'Frontend' },
    { name: 'JavaScript',   level: 30, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 20, category: 'Frontend' },

    // Backend
    { name: 'Node.js',      level: 20, category: 'Backend'  },

    // Tools
    { name: 'Git',          level: 50, category: 'Tools'    },
    { name: 'GitHub',       level: 50, category: 'Tools'    },
    { name: 'VS Code',      level: 70, category: 'Tools'    }
];

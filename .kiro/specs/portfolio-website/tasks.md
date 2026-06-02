# Implementation Plan: Portfolio Website

## Overview

Implementasi website portofolio personal dengan HTML5, Tailwind CSS, dan Vanilla JavaScript. Pendekatan incremental: mulai dari struktur file dan data layer, lalu bangun setiap modul JS secara terpisah, kemudian integrasikan semua bagian di `index.html`. Setiap modul dapat diuji secara independen sebelum diwiring bersama.

## Tasks

- [x] 1. Setup struktur proyek dan file dasar
  - Buat direktori `js/`, `css/`, dan `assets/images/`
  - Buat file `index.html` dengan boilerplate HTML5, link ke Tailwind CDN, dan placeholder section (`#hero`, `#projects`, `#skills`, `#contact`)
  - Buat file `css/styles.css` dengan Tailwind directives dan custom `@keyframes` (`fadeInUp`, typing effect, stagger delay classes)
  - Buat file-file modul JS kosong: `js/data.js`, `js/navbar.js`, `js/renderer.js`, `js/skills.js`, `js/contact.js`, `js/theme.js`
  - Setup test runner (Vitest atau Jest) dan install `fast-check` sebagai dev dependency
  - Buat konfigurasi Vitest/Jest dengan environment `jsdom`
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1_

- [x] 2. Implementasi Data Layer (`js/data.js`)
  - [x] 2.1 Tulis `PROJECT_DATA` array dengan minimal 2 contoh objek (termasuk satu dengan `liveUrl: null` dan satu dengan `repoUrl: null`)
    - Setiap objek memiliki properti: `title`, `description`, `technologies`, `liveUrl`, `repoUrl`
    - _Requirements: 3.1_
  - [x] 2.2 Tulis `SKILLS_DATA` array dengan minimal 6 objek skill yang dikelompokkan dalam kategori Frontend, Backend, dan Tools
    - Setiap objek memiliki properti: `name`, `level` (0–100), `category`
    - _Requirements: 4.1, 4.3, 4.5_

- [ ] 3. Implementasi Theme Module (`js/theme.js`)
  - [x] 3.1 Implementasi `applyStoredTheme()` — baca `localStorage['theme']`, terapkan class `dark` pada `<html>`, fallback ke `'light'` jika tidak ada nilai tersimpan; gunakan `try/catch` untuk antisipasi private browsing
    - _Requirements: 6.3, 6.5, 6.6_
  - [x] 3.2 Implementasi `getCurrentTheme()` — kembalikan nilai tema aktif berdasarkan ada/tidaknya class `dark` pada `<html>`
    - _Requirements: 6.2_
  - [ ] 3.3 Implementasi `updateToggleIcon(theme)` — tampilkan ikon `☀️` saat dark mode aktif, `🌙` saat light mode aktif
    - _Requirements: 6.7, 6.8_
  - [-] 3.4 Implementasi `toggleTheme()` — switch tema, simpan ke `localStorage`, panggil `updateToggleIcon()`
    - _Requirements: 6.2, 6.4_
  - [ ]* 3.5 Tulis unit tests untuk `theme.js`
    - Verifikasi `applyStoredTheme()` menerapkan class `dark` saat `localStorage.theme = 'dark'`
    - Verifikasi `applyStoredTheme()` tidak menerapkan class `dark` saat `localStorage.theme` tidak ada
    - Verifikasi ikon toggle berubah saat tema berubah
    - _Requirements: 6.2, 6.3, 6.5, 6.6, 6.7, 6.8_
  - [ ]* 3.6 Tulis property test untuk Theme Toggle (Property 9)
    - **Property 9: Theme Toggle Persists and Applies Correctly**
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8**
    - Gunakan `fc.constantFrom('light', 'dark')` sebagai arbitrary untuk initial state
    - Verifikasi toggle mengubah tema ke nilai berlawanan, menulis ke localStorage, menerapkan class CSS yang benar, dan menampilkan ikon yang benar

- [ ] 4. Implementasi Navbar Module (`js/navbar.js`)
  - [-] 4.1 Implementasi `scrollToSection(targetId)` — gunakan feature detection `scrollBehavior` untuk smooth scroll, fallback ke `scrollIntoView()` biasa
    - _Requirements: 1.6, 1.7_
  - [-] 4.2 Implementasi `toggleMobileMenu()` — tambah/hapus class `hidden` pada container menu mobile
    - _Requirements: 1.3, 1.4_
  - [-] 4.3 Implementasi `closeMobileMenu()` — selalu set menu ke state hidden
    - _Requirements: 1.5_
  - [-] 4.4 Implementasi `initNavbar()` — bind event listener pada hamburger button, semua nav links untuk smooth scroll, dan nav links mobile untuk close menu + scroll
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [ ]* 4.5 Tulis unit tests untuk `navbar.js`
    - Verifikasi `toggleMobileMenu()` menambah class `hidden` saat open dan menghapusnya saat closed
    - Verifikasi `closeMobileMenu()` selalu menghasilkan state hidden
    - Verifikasi event listener terpasang pada semua nav links
    - Verifikasi `scrollToSection()` memanggil `scrollIntoView` pada elemen target
    - _Requirements: 1.3, 1.4, 1.5, 1.7_
  - [ ]* 4.6 Tulis property test untuk Hamburger Menu Toggle (Property 1)
    - **Property 1: Hamburger Menu Toggle Round-Trip**
    - **Validates: Requirements 1.3, 1.4**
    - Gunakan `fc.boolean()` untuk initial state
    - Verifikasi toggle dua kali mengembalikan ke state semula

- [~] 5. Checkpoint — Pastikan semua tests modul theme dan navbar lulus
  - Jalankan test suite, pastikan semua tests lulus. Tanyakan ke user jika ada pertanyaan.

- [ ] 6. Implementasi Project Renderer (`js/renderer.js`)
  - [~] 6.1 Implementasi `createProjectCard(project)` — kembalikan HTML string lengkap untuk satu project card; sembunyikan tautan `liveUrl` jika null/kosong, sembunyikan tautan `repoUrl` jika null/kosong; tampilkan setiap teknologi sebagai Skill_Badge
    - Guard check: validasi properti wajib ada sebelum render
    - _Requirements: 3.3, 3.4, 3.5, 3.6_
  - [~] 6.2 Implementasi `renderProjects(containerId)` — baca `PROJECT_DATA`, iterasi array, panggil `createProjectCard()` untuk tiap item, sisipkan ke container DOM; guard check jika `PROJECT_DATA` tidak terdefinisi atau container tidak ditemukan
    - _Requirements: 3.1, 3.2_
  - [ ]* 6.3 Tulis unit tests untuk `renderer.js`
    - Verifikasi render dengan array kosong menghasilkan container kosong
    - Verifikasi render dengan 1 proyek menghasilkan 1 card
    - Verifikasi card dengan `liveUrl: null` tidak mengandung link live demo
    - Verifikasi card dengan `repoUrl: ""` tidak mengandung link repo
    - _Requirements: 3.2, 3.4, 3.5_
  - [ ]* 6.4 Tulis property test untuk Project Renderer — All Data Rendered (Property 2)
    - **Property 2: Project Renderer Faithfully Renders All Data**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.6**
    - Gunakan `fc.array(fc.record({ title: fc.string(), description: fc.string(), technologies: fc.array(fc.string()), liveUrl: fc.string(), repoUrl: fc.string() }))` sebagai arbitrary
    - Verifikasi N input menghasilkan tepat N cards; tiap card berisi title, description, semua teknologi
  - [ ]* 6.5 Tulis property test untuk Optional URL Conditional Rendering (Property 3)
    - **Property 3: Optional URL Conditional Rendering**
    - **Validates: Requirements 3.4, 3.5**
    - Gunakan `fc.option(fc.webUrl())` untuk `liveUrl` dan `repoUrl`
    - Verifikasi null/empty URL tidak menghasilkan elemen link di card

- [ ] 7. Implementasi Skills Section (`js/skills.js`)
  - [~] 7.1 Implementasi render skills berdasarkan `SKILLS_DATA` — kelompokkan berdasarkan `category`, render setiap skill sebagai Skill_Badge atau Progress_Bar dengan `data-level` attribute
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  - [~] 7.2 Implementasi `animateProgressBar(barElement, targetPercent)` — animasikan width dari 0 ke `targetPercent` menggunakan CSS transition atau `requestAnimationFrame`
    - _Requirements: 4.4_
  - [~] 7.3 Implementasi `initSkills(containerId)` — render skills ke container, setup `IntersectionObserver` untuk trigger `animateProgressBar()` saat section masuk viewport; fallback: langsung set width ke target jika `IntersectionObserver` tidak didukung
    - _Requirements: 4.4_
  - [ ]* 7.4 Tulis property test untuk Progress Bar Values In Range (Property 4)
    - **Property 4: Progress Bar Values Are In Range**
    - **Validates: Requirements 4.3**
    - Gunakan `fc.integer({ min: 0, max: 100 })` sebagai arbitrary untuk `level`
    - Verifikasi width yang dihasilkan progress bar selalu dalam rentang [0, 100]

- [ ] 8. Implementasi Contact Form (`js/contact.js`)
  - [~] 8.1 Implementasi `isValidEmail(email)` — return `true` jika string mengandung `@` dan domain part yang valid (minimal satu karakter setelah `@` diikuti `.` dan TLD)
    - _Requirements: 5.4_
  - [~] 8.2 Implementasi `showError(fieldId, message)` dan `clearError(fieldId)` — tampilkan/sembunyikan elemen error sibling dengan mengelola class `hidden` dan `textContent`
    - _Requirements: 5.3, 5.4, 5.5, 5.6_
  - [~] 8.3 Implementasi `validateForm(formData)` — periksa semua field (nama, email, subjek, pesan); kembalikan `{ isValid, errors }` dengan pesan error spesifik per field sesuai requirements
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6_
  - [~] 8.4 Implementasi `initContactForm()` — bind submit handler (disable tombol, validasi, tampilkan errors atau success + reset, enable tombol kembali); bind `input` event pada setiap field untuk `clearError()`
    - _Requirements: 5.2, 5.7, 5.8, 5.9_
  - [ ]* 8.5 Tulis unit tests untuk `contact.js`
    - Verifikasi tombol submit ter-disable saat validasi dimulai dan ter-enable setelah selesai
    - Verifikasi `showError()` membuat elemen error visible dengan pesan yang tepat
    - Verifikasi `clearError()` menyembunyikan elemen error
    - _Requirements: 5.9_
  - [ ]* 8.6 Tulis property test untuk Email Validation Correctness (Property 5)
    - **Property 5: Email Validation Correctness**
    - **Validates: Requirements 5.4**
    - Gunakan `fc.emailAddress()` untuk valid emails dan `fc.string()` untuk invalid strings
    - Verifikasi `isValidEmail()` return `true` hanya untuk string dengan format email yang valid
  - [ ]* 8.7 Tulis property test untuk Form Validation Rejects Incomplete Submission (Property 6)
    - **Property 6: Form Validation Rejects Any Incomplete Submission**
    - **Validates: Requirements 5.2, 5.3, 5.5, 5.6**
    - Gunakan `fc.record({ name: fc.option(fc.string()), email: fc.option(fc.string()), subject: fc.option(fc.string()), message: fc.option(fc.string()) })` sebagai arbitrary
    - Verifikasi form dengan minimal satu field kosong atau email invalid selalu mengembalikan `{ isValid: false }` dengan errors tidak kosong
  - [ ]* 8.8 Tulis property test untuk Error Cleared on Input (Property 7)
    - **Property 7: Error Cleared on Input**
    - **Validates: Requirements 5.7**
    - Gunakan `fc.constantFrom('nama', 'email', 'subjek', 'pesan')` sebagai arbitrary untuk field ID
    - Verifikasi field yang memiliki error aktif akan menghapus error saat event `input` dipicu
  - [ ]* 8.9 Tulis property test untuk Valid Form Submission Produces Success and Reset (Property 8)
    - **Property 8: Valid Form Submission Produces Success and Reset**
    - **Validates: Requirements 5.8**
    - Gunakan `fc.record` dengan semua field valid (non-empty string + valid email)
    - Verifikasi submit handler menampilkan pesan sukses dan mereset semua field ke string kosong

- [~] 9. Checkpoint — Pastikan semua tests modul renderer, skills, dan contact lulus
  - Jalankan test suite, pastikan semua tests lulus. Tanyakan ke user jika ada pertanyaan.

- [ ] 10. Wiring: Markup HTML dan Integrasi Semua Modul di `index.html`
  - [~] 10.1 Tulis markup lengkap `index.html` — Navbar dengan hamburger button dan theme toggle, Hero section dengan elemen yang memakai classes animasi (`animate-fade-in`, `delay-200`, dll.), Projects section dengan container `#projects`, Skills section dengan container `#skills`, Contact section dengan form `#contact-form` dan error elements
    - _Requirements: 1.1, 1.2, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 5.1_
  - [~] 10.2 Tambahkan script tags di akhir `<body>` — muat `data.js`, `navbar.js`, `renderer.js`, `skills.js`, `contact.js`, `theme.js`; tambahkan inline script untuk inisialisasi semua modul saat `DOMContentLoaded` dengan urutan: `applyStoredTheme()` pertama, lalu modul lainnya
    - _Requirements: 6.5_
  - [~] 10.3 Tambahkan dark mode classes pada semua komponen HTML — gunakan Tailwind `dark:` variant untuk navbar, hero, project cards, skills section, contact form, dan background utama
    - _Requirements: 6.3_
  - [~] 10.4 Implementasi typing effect di Hero section — tambahkan `typeText()` helper di file terpisah atau inline; panggil saat `DOMContentLoaded` pada elemen tagline
    - _Requirements: 2.4_

- [~] 11. Final Checkpoint — Pastikan semua tests lulus dan website fungsional
  - Jalankan seluruh test suite (`vitest --run` atau `jest`), pastikan semua tests lulus. Lakukan review manual pada navbar mobile toggle, dark mode persistence, project cards rendering, skills animation, dan form validation. Tanyakan ke user jika ada pertanyaan.

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirement spesifik untuk traceability
- Checkpoint memastikan validasi incremental sebelum integrasi penuh
- Property tests menggunakan `fast-check` dengan minimal 100 iterasi per property
- Unit tests menggunakan `jsdom` environment melalui Vitest/Jest
- Modul `theme.js` diinisialisasi pertama untuk mencegah FOUC (Flash of Unstyled Content)
- Guard checks pada setiap modul memastikan graceful degradation jika DOM element tidak ditemukan

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2"] },
    { "id": 1, "tasks": ["3.1", "3.2", "3.3", "3.4", "4.1", "4.2", "4.3", "4.4"] },
    { "id": 2, "tasks": ["3.5", "3.6", "4.5", "4.6", "6.1", "7.1", "8.1", "8.2"] },
    { "id": 3, "tasks": ["6.2", "7.2", "8.3"] },
    { "id": 4, "tasks": ["6.3", "6.4", "6.5", "7.3", "8.4"] },
    { "id": 5, "tasks": ["7.4", "8.5", "8.6", "8.7", "8.8", "8.9"] },
    { "id": 6, "tasks": ["10.1"] },
    { "id": 7, "tasks": ["10.2", "10.3", "10.4"] }
  ]
}
```

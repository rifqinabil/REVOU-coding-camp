# Requirements Document

## Introduction

Website portofolio personal yang dibangun dengan HTML5, Tailwind CSS, dan Vanilla JavaScript. Website ini menampilkan profil, proyek, dan keahlian pemilik, serta menyediakan form kontak. Fitur utama meliputi navbar responsive dengan hamburger menu, hero section dengan animasi, project cards yang dirender dari data JavaScript, skills section, form kontak dengan validasi, dan dark mode toggle.

## Glossary

- **Website**: Aplikasi web portofolio personal yang berjalan di browser.
- **Navbar**: Komponen navigasi di bagian atas halaman yang berisi tautan ke setiap section.
- **Hamburger_Menu**: Tombol ikon tiga garis yang muncul di layar mobile untuk membuka/menutup menu navigasi.
- **Hero_Section**: Bagian pertama halaman yang menampilkan nama, tagline, dan call-to-action utama.
- **Project_Card**: Komponen kartu yang menampilkan informasi satu proyek (judul, deskripsi, teknologi, tautan).
- **Project_Data**: Array JavaScript yang menjadi sumber data untuk semua Project_Card.
- **Skills_Section**: Bagian halaman yang menampilkan daftar keahlian teknis beserta indikator tingkat kemahiran.
- **Skill_Badge**: Elemen visual yang merepresentasikan satu keahlian.
- **Progress_Bar**: Elemen visual berupa batang yang menunjukkan persentase tingkat kemahiran suatu keahlian.
- **Contact_Form**: Formulir HTML yang memungkinkan pengunjung mengirim pesan kepada pemilik website.
- **Validator**: Modul JavaScript yang memvalidasi input pada Contact_Form sebelum pengiriman.
- **Dark_Mode**: Tema tampilan gelap yang dapat diaktifkan pengguna sebagai alternatif tema terang.
- **Theme_Toggle**: Tombol yang mengaktifkan atau menonaktifkan Dark_Mode.
- **Renderer**: Fungsi JavaScript yang membaca Project_Data dan menghasilkan elemen HTML Project_Card secara dinamis.
- **LocalStorage**: Mekanisme penyimpanan browser yang digunakan untuk menyimpan preferensi tema pengguna.

---

## Requirements

### Requirement 1: Navbar Responsive

**User Story:** Sebagai pengunjung website, saya ingin navbar yang mudah digunakan di semua ukuran layar, sehingga saya dapat berpindah antar section dengan nyaman baik di desktop maupun mobile.

#### Acceptance Criteria

1. THE Navbar SHALL menampilkan tautan navigasi ke section Hero, Projects, Skills, dan Contact secara horizontal pada layar dengan lebar minimal 768px.
2. WHEN lebar layar kurang dari 768px, THE Navbar SHALL menyembunyikan tautan navigasi dan menampilkan Hamburger_Menu.
3. WHEN pengguna mengklik Hamburger_Menu, THE Navbar SHALL menampilkan menu navigasi vertikal di bawah navbar.
4. WHEN pengguna mengklik Hamburger_Menu pada kondisi menu terbuka, THE Navbar SHALL menyembunyikan menu navigasi.
5. WHEN pengguna mengklik salah satu tautan di dalam menu mobile, THE Navbar SHALL menutup menu navigasi dan melakukan scroll ke section yang dituju.
6. WHEN pengguna melakukan scroll halaman, THE Navbar SHALL tetap terlihat di bagian atas layar (sticky/fixed).
7. WHEN pengguna mengklik tautan navigasi di desktop, THE Navbar SHALL melakukan smooth scroll ke section yang dituju, dengan fallback ke regular scroll apabila smooth scroll tidak tersedia di browser.

---

### Requirement 2: Hero Section dengan Animasi

**User Story:** Sebagai pengunjung website, saya ingin melihat hero section yang menarik dengan animasi, sehingga saya mendapatkan kesan pertama yang baik tentang pemilik website.

#### Acceptance Criteria

1. THE Hero_Section SHALL menampilkan nama pemilik, tagline profesi, dan deskripsi singkat.
2. THE Hero_Section SHALL menampilkan tombol call-to-action yang mengarahkan ke Contact_Form.
3. WHEN halaman pertama kali dimuat, THE Hero_Section SHALL menjalankan animasi fade-in pada elemen nama, tagline, dan deskripsi secara berurutan dengan jeda antar elemen minimal 200ms.
4. WHEN halaman pertama kali dimuat, THE Hero_Section SHALL menjalankan animasi typing effect atau slide-in pada elemen teks utama.
5. THE Hero_Section SHALL menampilkan konten secara penuh pada viewport pertama (above the fold) di layar dengan tinggi minimal 600px.

---

### Requirement 3: Project Cards dari Data JavaScript

**User Story:** Sebagai pengunjung website, saya ingin melihat daftar proyek yang ditampilkan secara dinamis, sehingga pemilik website dapat memperbarui data proyek tanpa mengubah struktur HTML.

#### Acceptance Criteria

1. THE Renderer SHALL membaca Project_Data dari sebuah array JavaScript yang berisi objek dengan properti: `title`, `description`, `technologies`, `liveUrl`, dan `repoUrl`.
2. WHEN halaman dimuat, THE Renderer SHALL menghasilkan satu Project_Card untuk setiap objek di dalam Project_Data dan menyisipkannya ke dalam DOM.
3. THE Project_Card SHALL menampilkan judul proyek, deskripsi, daftar teknologi yang digunakan, tautan ke live demo, dan tautan ke repositori kode.
4. IF properti `liveUrl` pada sebuah objek Project_Data bernilai kosong atau null, THEN THE Project_Card SHALL menyembunyikan tautan live demo untuk proyek tersebut.
5. IF properti `repoUrl` pada sebuah objek Project_Data bernilai kosong atau null, THEN THE Project_Card SHALL menyembunyikan tautan repositori untuk proyek tersebut.
6. THE Project_Card SHALL menampilkan daftar teknologi sebagai Skill_Badge individual.
7. WHEN pengguna mengarahkan kursor ke Project_Card, THE Project_Card SHALL menampilkan efek hover visual (misalnya shadow atau scale).

---

### Requirement 4: Skills Section

**User Story:** Sebagai pengunjung website, saya ingin melihat keahlian teknis pemilik beserta tingkat kemahirannya, sehingga saya dapat menilai kompetensi pemilik website dengan cepat.

#### Acceptance Criteria

1. THE Skills_Section SHALL menampilkan daftar keahlian teknis yang dikelompokkan berdasarkan kategori (misalnya: Frontend, Backend, Tools).
2. THE Skills_Section SHALL menampilkan setiap keahlian menggunakan Skill_Badge atau Progress_Bar.
3. WHERE Progress_Bar digunakan, THE Progress_Bar SHALL menampilkan persentase kemahiran dalam rentang 0 hingga 100.
4. WHEN Skills_Section masuk ke dalam viewport pengguna, THE Progress_Bar SHALL menjalankan animasi pengisian dari 0 hingga nilai target yang ditentukan dalam data.
5. THE Skills_Section SHALL menampilkan minimal 6 keahlian teknis.

---

### Requirement 5: Form Kontak dengan Validasi JavaScript

**User Story:** Sebagai pengunjung website, saya ingin mengisi form kontak dengan panduan validasi yang jelas, sehingga saya dapat mengirim pesan tanpa kebingungan tentang format input yang benar.

#### Acceptance Criteria

1. THE Contact_Form SHALL menyediakan field input untuk: nama (teks), email (email), subjek (teks), dan pesan (textarea).
2. WHEN pengguna mengklik tombol submit pada Contact_Form, THE Validator SHALL memeriksa bahwa semua field tidak kosong.
3. IF field nama kosong saat submit, THEN THE Validator SHALL menampilkan pesan error "Nama tidak boleh kosong" di bawah field nama.
4. IF field email kosong atau tidak mengandung format email yang valid (mengandung karakter `@` dan domain), THEN THE Validator SHALL menampilkan pesan error "Email tidak valid" di bawah field email.
5. IF field subjek kosong saat submit, THEN THE Validator SHALL menampilkan pesan error "Subjek tidak boleh kosong" di bawah field subjek.
6. IF field pesan kosong saat submit, THEN THE Validator SHALL menampilkan pesan error "Pesan tidak boleh kosong" di bawah field pesan.
7. WHEN pengguna mulai mengetik pada field yang sebelumnya menampilkan error, THE Validator SHALL menghapus pesan error pada field tersebut.
8. WHEN semua field terisi dengan valid, tidak ada pesan error yang ditampilkan, dan pengguna mengklik submit, THE Contact_Form SHALL menampilkan pesan konfirmasi sukses dan mereset semua field ke kondisi kosong.
9. THE Contact_Form SHALL menonaktifkan tombol submit selama proses validasi berlangsung dan SHALL mengaktifkan kembali tombol submit segera setelah proses validasi selesai.

---

### Requirement 6: Dark Mode Toggle

**User Story:** Sebagai pengunjung website, saya ingin dapat beralih antara tema terang dan gelap, sehingga saya dapat membaca konten dengan nyaman sesuai preferensi dan kondisi pencahayaan.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL ditampilkan sebagai tombol ikon yang selalu terlihat di Navbar.
2. WHEN pengguna mengklik Theme_Toggle, THE Website SHALL beralih dari tema terang ke tema gelap atau sebaliknya.
3. WHEN Dark_Mode aktif, THE Website SHALL menerapkan skema warna gelap pada seluruh komponen halaman (background, teks, kartu, navbar, dan form).
4. WHEN pengguna mengklik Theme_Toggle, THE LocalStorage SHALL menyimpan preferensi tema yang dipilih dengan key `theme`.
5. WHEN halaman dimuat, THE Website SHALL membaca nilai key `theme` dari LocalStorage dan menerapkan tema yang tersimpan secara otomatis.
6. IF tidak ada nilai `theme` yang tersimpan di LocalStorage, THEN THE Website SHALL menerapkan tema terang sebagai default.
7. WHEN Dark_Mode aktif, THE Theme_Toggle SHALL menampilkan ikon matahari (☀️) sebagai indikator bahwa tema terang dapat diaktifkan.
8. WHEN Dark_Mode tidak aktif, THE Theme_Toggle SHALL menampilkan ikon bulan (🌙) sebagai indikator bahwa tema gelap dapat diaktifkan.

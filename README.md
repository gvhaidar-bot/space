# SPACE Cadet

Website fakta luar angkasa. Buka `index.html` (atau `home/home.html`) di browser.

## Struktur

Setiap halaman punya folder sendiri berisi HTML, CSS, dan JS-nya masing-masing, supaya gampang di-maintenance. Folder `images/` dipakai bersama semua halaman.

```
space/
├── index.html            → pengalihan ke home/home.html
├── images/               → gambar bersama (NASA/ESA, domain publik)
├── home/
│   ├── home.html
│   ├── home.css
│   └── home.js           → tahun footer otomatis + animasi hero
├── about/
│   ├── about.html
│   ├── about.css
│   └── about.js          → animasi kartu muncul saat scroll
├── planets/
│   ├── planets.html      → 8 planet, filter jenis + klik kartu untuk detail
│   ├── planets.css
│   └── planets.js
├── galaxy/
│   ├── galaxy.html       → 6 galaksi, filter bentuk + fakta acak
│   ├── galaxy.css
│   └── galaxy.js
└── deep-space/
    ├── deep-space.html   → filter fakta + galeri + fakta acak
    ├── deep-space.css
    └── deep-space.js
```

## Halaman

| # | Halaman | Folder | Isi |
|---|---------|--------|-----|
| 1 | Home | `home/` | Hero + navigasi |
| 2 | Planets | `planets/` | 8 planet tata surya |
| 3 | Galaxy | `galaxy/` | 6 galaksi |
| 4 | Deep Space | `deep-space/` | Nebula, lubang hitam, fenomena |
| 5 | About | `about/` | Tentang website ini |

Warna: latar `#050a0f`, aksen cyan `#1be4b2`. Font: Space Grotesk + Playfair Display.

## Rencana berikutnya

- Halaman 6: Solar System
- Halaman 7: Space Facts

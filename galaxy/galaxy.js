// ambil semua tombol filter di halaman galaxy
var filterButtons = document.querySelectorAll(".gx-filter-btn");
// ambil semua kartu galaksinya
var galaxyCards = document.querySelectorAll(".gx-galaxy-card");
// ambil teks yang muncul kalau tidak ada galaksi di kategori itu
var galaxiesEmpty = document.getElementById("galaxiesEmpty");

// kasih fungsi klik ke tiap tombol filter
filterButtons.forEach(function (button) {
  // kalau tombolnya diklik
  button.addEventListener("click", function () {
    // hapus dulu class active dari semua tombol
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    // terus kasih class active ke tombol yang baru diklik
    button.classList.add("active");

    // baca bentuk galaksi dari tombolnya, misal spiral atau semua
    var filter = button.getAttribute("data-filter");
    // buat ngitung ada berapa kartu yang kelihatan
    var visibleCount = 0;

    // cek satu-satu kartu galaksinya
    galaxyCards.forEach(function (card) {
      // ambil bentuk kartu ini dari atributnya
      var category = card.getAttribute("data-category");
      // kartunya ditampilin kalau filternya semua, atau bentuknya sama
      var show = filter === "semua" || category === filter;
      // kalau show benar kartunya muncul, kalau salah disembunyiin
      card.style.display = show ? "" : "none";
      // kalau muncul, hitungannya nambah satu
      if (show) visibleCount++;
    });

    // kalau ada teks kosongnya, atur muncul atau tidak
    if (galaxiesEmpty) {
      // teks kosong cuma muncul kalau tidak ada kartu yang kelihatan
      galaxiesEmpty.hidden = visibleCount !== 0;
    }
  });
});

// daftar fakta galaksi buat tombol acak
var randomFacts = [
  "Bima Sakti dan Andromeda bergerak saling mendekat dan diperkirakan akan bertabrakan serta menyatu dalam waktu sekitar 4 sampai 5 miliar tahun lagi.",
  "Di pusat Bima Sakti ada lubang hitam supermasif Sagittarius A* dengan massa sekitar 4,3 juta kali massa Matahari.",
  "Cahaya Andromeda yang kita lihat malam ini berangkat dari sana 2,5 juta tahun lalu, saat manusia purba masih hidup di Bumi.",
  "Galaksi Sombrero terlihat seperti topi karena cincin debunya yang lebar, padahal bentuk aslinya tetap spiral.",
  "Ada galaksi yang hampir tidak punya materi gelap sama sekali, seperti NGC 1052-DF2, dan ilmuwan masih memperdebatkan kenapa.",
  "Grup Lokal, kumpulan galaksi tempat Bima Sakti berada, berisi lebih dari 80 galaksi, sebagian besar galaksi katai.",
  "Galaksi elips biasanya berisi bintang-bintang tua berwarna kemerahan dan hampir tidak lagi membentuk bintang baru.",
  "Teleskop James Webb menemukan galaksi-galaksi yang sudah terbentuk kurang dari 400 juta tahun setelah Big Bang, lebih awal dari yang diperkirakan."
];

// ambil tombol sama teks buat fakta acak
var randomFactBtn = document.getElementById("randomFactBtn");
var randomFactText = document.getElementById("randomFactText");
// buat nyimpan fakta terakhir, biar tidak muncul dua kali berturut-turut
var lastFactIndex = -1;

// cek dulu tombol sama teksnya ada, baru kasih fungsi klik
if (randomFactBtn && randomFactText) {
  // kalau tombolnya diklik
  randomFactBtn.addEventListener("click", function () {
    // buat nyimpan nomor fakta yang dipilih
    var index;
    // acak terus sampai dapat yang beda dari terakhir
    do {
      index = Math.floor(Math.random() * randomFacts.length);
    } while (index === lastFactIndex && randomFacts.length > 1);
    // simpan nomor ini jadi yang terakhir
    lastFactIndex = index;

    // sembunyiin dulu teksnya biar ada efek pudar
    randomFactText.style.opacity = "0";
    // tunggu 180 mili detik, baru ganti teksnya terus munculin lagi
    setTimeout(function () {
      randomFactText.textContent = randomFacts[index];
      randomFactText.style.opacity = "1";
    }, 180);
  });
}

// ambil semua elemen yang mau dikasih animasi muncul saat scroll
var revealTargets = document.querySelectorAll(
  ".gx-galaxy-card, .gx-random-box, .gx-hero .feature-card"
);

// cek dulu browser-nya dukung IntersectionObserver atau tidak
if ("IntersectionObserver" in window) {
  // tiap elemen dikasih class reveal dulu, jadi awalnya sembunyi
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  // bikin pengamat yang mantau kapan elemen masuk ke layar
  var observer = new IntersectionObserver(
    // ini jalan tiap ada elemen yang masuk atau keluar layar
    function (entries) {
      // cek satu-satu elemennya
      entries.forEach(function (entry) {
        // kalau elemennya sudah kelihatan di layar
        if (entry.isIntersecting) {
          // munculin elemennya dengan nambah class reveal-visible
          entry.target.classList.add("reveal-visible");
          // habis itu berhenti mantau elemen ini, biar tidak diulang
          observer.unobserve(entry.target);
        }
      });
    },
    // animasi jalan kalau elemennya sudah kelihatan 12 persen
    { threshold: 0.12 }
  );

  // daftarin semua elemen tadi biar dipantau sama observer
  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
}

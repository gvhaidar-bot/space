// ambil semua tombol filter di halaman deep space
var filterButtons = document.querySelectorAll(".ds-filter-btn");
// ambil semua kartu faktanya
var factCards = document.querySelectorAll(".ds-fact-card");
// ambil teks yang muncul kalau tidak ada fakta di kategori itu
var factsEmpty = document.getElementById("factsEmpty");

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

    // baca kategori dari tombolnya, misal nebula atau semua
    var filter = button.getAttribute("data-filter");
    // buat ngitung ada berapa kartu yang kelihatan
    var visibleCount = 0;

    // cek satu-satu kartu faktanya
    factCards.forEach(function (card) {
      // ambil kategori kartu ini dari atributnya
      var category = card.getAttribute("data-category");
      // kartunya ditampilin kalau filternya semua, atau kategorinya sama
      var show = filter === "semua" || category === filter;
      // kalau show benar kartunya muncul, kalau salah disembunyiin
      card.style.display = show ? "" : "none";
      // kalau muncul, hitungannya nambah satu
      if (show) visibleCount++;
    });

    // kalau ada teks kosongnya, atur muncul atau tidak
    if (factsEmpty) {
      // teks kosong cuma muncul kalau tidak ada kartu yang kelihatan
      factsEmpty.hidden = visibleCount !== 0;
    }
  });
});

// daftar fakta deep space buat tombol acak
var randomFacts = [
  "Cahaya dari galaksi terjauh yang pernah teramati sudah berjalan lebih dari 13 miliar tahun sebelum sampai ke teleskop kita, jadi kita melihat galaksi itu seperti saat alam semesta masih sangat muda.",
  "Di deep space, suara tidak bisa merambat karena hampir tidak ada udara atau medium. Ledakan sebesar apa pun di sana akan tetap sunyi.",
  "Voyager 1 diluncurkan pada 1977 dan sekarang sudah memasuki ruang antarbintang. Ia membawa Piringan Emas berisi suara dan gambar dari Bumi.",
  "Satu suar (flare) dari magnetar, bintang neutron bermedan magnet ekstrem, bisa melepaskan energi lebih besar dalam 0,1 detik daripada yang dilepaskan Matahari dalam 100.000 tahun.",
  "Radiasi latar gelombang mikro kosmik (CMB) adalah sisa panas Big Bang. Suhu alam semesta sekarang rata-rata hanya sekitar -270 derajat Celsius, sedikit di atas nol mutlak.",
  "Quasar adalah objek paling terang di alam semesta. Cahayanya berasal dari gas superpanas yang berputar masuk ke lubang hitam supermasif, dan bisa lebih terang dari seluruh galaksinya.",
  "Di antara bintang-bintang, ruang tidak benar-benar kosong. Ada awan gas dan debu antarbintang, tetapi kerapatannya sangat rendah, jauh lebih renggang dari vakum terbaik yang bisa dibuat di laboratorium Bumi.",
  "Galaksi Andromeda sedang bergerak mendekati Bima Sakti dan diperkirakan akan bertabrakan serta menyatu dengannya dalam waktu sekitar 4 sampai 5 miliar tahun lagi.",
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
  ".ds-fact-card, .ds-random-box, .ds-gallery-item, .ds-hero .feature-card"
);

// cek dulu browser-nya dukung IntersectionObserver atau tidak
if ("IntersectionObserver" in window) {
  // tiap elemen dikasih class ds-reveal dulu, jadi awalnya sembunyi
  revealTargets.forEach(function (el) {
    el.classList.add("ds-reveal");
  });

  // bikin pengamat yang mantau kapan elemen masuk ke layar
  var observer = new IntersectionObserver(
    // ini jalan tiap ada elemen yang masuk atau keluar layar
    function (entries) {
      // cek satu-satu elemennya
      entries.forEach(function (entry) {
        // kalau elemennya sudah kelihatan di layar
        if (entry.isIntersecting) {
          // munculin elemennya dengan nambah class ds-reveal-visible
          entry.target.classList.add("ds-reveal-visible");
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

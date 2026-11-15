// ambil kotak video yang awalnya cuma gambar sama tombol putar
var videoFacade = document.getElementById("videoFacade");

// fungsi buat ganti kotak video jadi pemutar video beneran
function playVideo() {
  // kalau kotak videonya tidak ada, langsung berhenti
  if (!videoFacade) return;
  // bikin elemen video baru
  var video = document.createElement("video");
  // ambil file videonya dari folder video di halaman ini
  video.src = "video/solar-system-explained.webm";
  // kasih tombol kontrol kayak play, pause, sama fullscreen
  video.controls = true;
  // langsung putar begitu videonya muncul
  video.autoplay = true;
  // kosongin isi kotak video, buang gambar sama tombol putarnya
  videoFacade.innerHTML = "";
  // masukin videonya ke kotak video
  videoFacade.appendChild(video);
  // matiin fungsi kliknya, soalnya videonya sudah jalan
  videoFacade.removeEventListener("click", playVideo);
}

// kalau kotak videonya ada, kasih fungsi klik sama keyboard
if (videoFacade) {
  // kalau diklik mouse, putar videonya
  videoFacade.addEventListener("click", playVideo);
  // biar bisa juga diputar pakai keyboard
  videoFacade.addEventListener("keydown", function (event) {
    // kalau tombol yang ditekan Enter atau spasi
    if (event.key === "Enter" || event.key === " ") {
      // cegah halaman ikut ke-scroll gara-gara spasi
      event.preventDefault();
      // putar videonya
      playVideo();
    }
  });
}

// ambil semua tombol filter di halaman solar system
var filterButtons = document.querySelectorAll(".ss-filter-btn");
// ambil semua kartu isi tata suryanya
var ssCards = document.querySelectorAll(".ss-card");
// ambil teks yang muncul kalau tidak ada isi di kelompok itu
var ssEmpty = document.getElementById("ssEmpty");

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

    // baca kelompok dari tombolnya, misal bintang atau semua
    var filter = button.getAttribute("data-filter");
    // buat ngitung ada berapa kartu yang kelihatan
    var visibleCount = 0;

    // cek satu-satu kartu isinya
    ssCards.forEach(function (card) {
      // ambil kelompok kartu ini dari atributnya
      var category = card.getAttribute("data-category");
      // kartunya ditampilin kalau filternya semua, atau kelompoknya sama
      var show = filter === "semua" || category === filter;
      // kalau show benar kartunya muncul, kalau salah disembunyiin
      card.style.display = show ? "" : "none";
      // kalau muncul, hitungannya nambah satu
      if (show) visibleCount++;
    });

    // kalau ada teks kosongnya, atur muncul atau tidak
    if (ssEmpty) {
      // teks kosong cuma muncul kalau tidak ada kartu yang kelihatan
      ssEmpty.hidden = visibleCount !== 0;
    }
  });
});

// daftar fakta tata surya buat tombol acak
var randomFacts = [
  "Cahaya Matahari butuh waktu sekitar 8 menit 20 detik untuk sampai ke Bumi, jadi cahaya yang kita lihat sekarang sebenarnya cahaya dari 8 menit yang lalu.",
  "Jejak kaki astronaut Apollo di Bulan bisa bertahan jutaan tahun karena di sana tidak ada angin dan air yang menghapusnya.",
  "Komet Halley terakhir terlihat pada 1986 dan akan kembali lagi pada 2061.",
  "Sabuk asteroid terdengar padat, tapi jarak antar asteroid rata-rata jutaan kilometer, jadi wahana antariksa bisa melewatinya dengan aman.",
  "Matahari kehilangan sekitar 4 juta ton massa setiap detik karena diubah menjadi energi dan angin matahari.",
  "Merkurius dan Venus adalah dua planet yang tidak punya bulan sama sekali.",
  "Voyager 1, benda buatan manusia yang paling jauh, sudah lebih dari 24 miliar km dari Bumi dan sinyalnya masih sampai ke kita.",
  "Neptunus ditemukan pada 1846 dan satu tahun di sana lamanya 165 tahun Bumi, jadi Neptunus baru menyelesaikan satu putaran penuh pertamanya pada 2011."
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
  ".ss-card, .ss-link-card, .ss-video-wrap, .ss-random-box, .ss-hero .feature-card"
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

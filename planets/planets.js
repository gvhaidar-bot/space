// ambil semua tombol filter di halaman planets
var filterButtons = document.querySelectorAll(".pl-filter-btn");
// ambil semua kartu planetnya
var planetCards = document.querySelectorAll(".pl-planet-card");
// ambil teks yang muncul kalau tidak ada planet di kategori itu
var planetsEmpty = document.getElementById("planetsEmpty");

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

    // baca kategori dari tombolnya, misal berbatu atau semua
    var filter = button.getAttribute("data-filter");
    // buat ngitung ada berapa kartu yang kelihatan
    var visibleCount = 0;

    // cek satu-satu kartu planetnya
    planetCards.forEach(function (card) {
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
    if (planetsEmpty) {
      // teks kosong cuma muncul kalau tidak ada kartu yang kelihatan
      planetsEmpty.hidden = visibleCount !== 0;
    }
  });
});

// data lengkap tiap planet, nanti dipakai buat kotak detail
var planetDetails = {
  // kunci merkurius, isinya nama, penjelasan, sama datanya
  merkurius: {
    name: "Merkurius",
    text: "Planet terkecil di tata surya dan yang paling dekat dengan Matahari. Satu tahun di sana hanya 88 hari, tetapi suhunya berubah ekstrem antara siang dan malam.",
    data: "Diameter 4.879 km | Jarak 57,9 jt km | 1 tahun = 88 hari | Bulan: 0"
  },
  venus: {
    name: "Venus",
    text: "Planet terpanas di tata surya dengan suhu permukaan sekitar 465 derajat Celsius. Awan asam sulfatnya memerangkap panas, dan planet ini berputar terbalik.",
    data: "Diameter 12.104 km | Jarak 108,2 jt km | 1 tahun = 225 hari | Bulan: 0"
  },
  bumi: {
    name: "Bumi",
    text: "Satu-satunya planet yang diketahui memiliki kehidupan. Sekitar 71 persen permukaannya tertutup air, dan atmosfernya kaya oksigen.",
    data: "Diameter 12.742 km | Jarak 149,6 jt km | 1 tahun = 365,25 hari | Bulan: 1"
  },
  mars: {
    name: "Mars",
    text: "Planet merah dengan gunung berapi terbesar di tata surya, Olympus Mons, setinggi sekitar 22 km. Wahana robot sudah menemukan bukti air pernah mengalir di sana.",
    data: "Diameter 6.779 km | Jarak 227,9 jt km | 1 tahun = 687 hari | Bulan: 2"
  },
  jupiter: {
    name: "Jupiter",
    text: "Planet terbesar di tata surya, massanya lebih besar dari semua planet lain digabung. Bintik Merah Besarnya adalah badai raksasa yang sudah berumur ratusan tahun.",
    data: "Diameter 139.820 km | Jarak 778,5 jt km | 1 tahun = 11,86 tahun | Bulan: 95"
  },
  saturnus: {
    name: "Saturnus",
    text: "Terkenal dengan cincinnya yang lebar dari es dan batu. Planet ini sangat ringan, kepadatannya lebih rendah dari air.",
    data: "Diameter 116.460 km | Jarak 1,43 miliar km | 1 tahun = 29,4 tahun | Bulan: 146"
  },
  uranus: {
    name: "Uranus",
    text: "Berputar miring hampir 98 derajat, seperti menggelinding di orbitnya. Gas metana di atmosfernya membuat planet ini berwarna biru kehijauan.",
    data: "Diameter 50.724 km | Jarak 2,87 miliar km | 1 tahun = 84 tahun | Bulan: 28"
  },
  neptunus: {
    name: "Neptunus",
    text: "Planet terjauh dari Matahari, ditemukan lewat perhitungan matematika sebelum terlihat teleskop. Anginnya adalah yang tercepat di tata surya.",
    data: "Diameter 49.244 km | Jarak 4,50 miliar km | 1 tahun = 164,8 tahun | Bulan: 16"
  }
};

// ambil tiga bagian di kotak detail: nama, penjelasan, sama baris datanya
var detailName = document.getElementById("planetDetailName");
var detailText = document.getElementById("planetDetailText");
var detailData = document.getElementById("planetDetailData");

// fungsi buat nampilin detail planet yang dipilih ke kotak detail
function showPlanet(key) {
  // cari datanya dari planetDetails pakai kunci, misal bumi
  var planet = planetDetails[key];
  // kalau datanya tidak ada atau elemennya tidak ada, langsung berhenti
  if (!planet || !detailName || !detailText || !detailData) return;
  // isi nama planetnya
  detailName.textContent = planet.name;
  // isi penjelasannya
  detailText.textContent = planet.text;
  // isi baris datanya
  detailData.textContent = planet.data;
}

// kasih fungsi klik ke tiap kartu planet
planetCards.forEach(function (card) {
  // fungsi yang jalan kalau kartunya dipilih
  function select() {
    // hapus dulu tanda aktif dari semua kartu
    planetCards.forEach(function (other) {
      other.classList.remove("active");
    });
    // kasih tanda aktif ke kartu yang diklik
    card.classList.add("active");
    // tampilin detail planet ini di kotak detail
    showPlanet(card.getAttribute("data-planet"));
  }
  // kalau kartunya diklik mouse, jalanin select
  card.addEventListener("click", select);
  // biar kartunya juga bisa dipilih pakai keyboard
  card.addEventListener("keydown", function (event) {
    // kalau tombol yang ditekan Enter atau spasi
    if (event.key === "Enter" || event.key === " ") {
      // cegah halaman ikut ke-scroll gara-gara spasi
      event.preventDefault();
      // jalanin select seperti kalau diklik
      select();
    }
  });
});

// daftar fakta planet buat tombol acak
var randomFacts = [
  "Satu hari di Venus (243 hari Bumi) lebih panjang daripada satu tahunnya (225 hari Bumi).",
  "Jupiter begitu besar sampai 1.300 planet seukuran Bumi bisa muat di dalamnya.",
  "Saturnus adalah satu-satunya planet yang kurang padat dari air, jadi secara teori ia bisa mengapung.",
  "Gunung Olympus Mons di Mars tingginya sekitar 22 km, hampir tiga kali tinggi Gunung Everest.",
  "Uranus berputar miring 98 derajat, jadi kutubnya kadang menghadap langsung ke Matahari selama puluhan tahun.",
  "Angin di Neptunus bisa mencapai 2.100 km per jam, yang tercepat di tata surya.",
  "Merkurius mengalami perubahan suhu paling ekstrem: dari minus 180 derajat di malam hari sampai 430 derajat di siang hari.",
  "Bumi adalah satu-satunya planet yang tidak dinamai dari dewa, dan satu-satunya yang diketahui memiliki kehidupan."
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
  ".pl-planet-card, .pl-detail-box, .pl-random-box, .pl-hero .feature-card"
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

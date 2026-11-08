var filterButtons = document.querySelectorAll(".pl-filter-btn");
var planetCards = document.querySelectorAll(".pl-planet-card");
var planetsEmpty = document.getElementById("planetsEmpty");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    var filter = button.getAttribute("data-filter");
    var visibleCount = 0;

    planetCards.forEach(function (card) {
      var category = card.getAttribute("data-category");
      var show = filter === "semua" || category === filter;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (planetsEmpty) {
      planetsEmpty.hidden = visibleCount !== 0;
    }
  });
});

var planetDetails = {
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

var detailName = document.getElementById("planetDetailName");
var detailText = document.getElementById("planetDetailText");
var detailData = document.getElementById("planetDetailData");

function showPlanet(key) {
  var planet = planetDetails[key];
  if (!planet || !detailName || !detailText || !detailData) return;
  detailName.textContent = planet.name;
  detailText.textContent = planet.text;
  detailData.textContent = planet.data;
}

planetCards.forEach(function (card) {
  function select() {
    planetCards.forEach(function (other) {
      other.classList.remove("active");
    });
    card.classList.add("active");
    showPlanet(card.getAttribute("data-planet"));
  }
  card.addEventListener("click", select);
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  });
});

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

var randomFactBtn = document.getElementById("randomFactBtn");
var randomFactText = document.getElementById("randomFactText");
var lastFactIndex = -1;

if (randomFactBtn && randomFactText) {
  randomFactBtn.addEventListener("click", function () {
    var index;
    do {
      index = Math.floor(Math.random() * randomFacts.length);
    } while (index === lastFactIndex && randomFacts.length > 1);
    lastFactIndex = index;

    randomFactText.style.opacity = "0";
    setTimeout(function () {
      randomFactText.textContent = randomFacts[index];
      randomFactText.style.opacity = "1";
    }, 180);
  });
}

var revealTargets = document.querySelectorAll(
  ".pl-planet-card, .pl-detail-box, .pl-random-box, .pl-hero .feature-card"
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
}

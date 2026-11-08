var filterButtons = document.querySelectorAll(".gx-filter-btn");
var galaxyCards = document.querySelectorAll(".gx-galaxy-card");
var galaxiesEmpty = document.getElementById("galaxiesEmpty");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    var filter = button.getAttribute("data-filter");
    var visibleCount = 0;

    galaxyCards.forEach(function (card) {
      var category = card.getAttribute("data-category");
      var show = filter === "semua" || category === filter;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (galaxiesEmpty) {
      galaxiesEmpty.hidden = visibleCount !== 0;
    }
  });
});

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
  ".gx-galaxy-card, .gx-random-box, .gx-hero .feature-card"
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

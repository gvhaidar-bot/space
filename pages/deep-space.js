var filterButtons = document.querySelectorAll(".ds-filter-btn");
var factCards = document.querySelectorAll(".ds-fact-card");
var factsEmpty = document.getElementById("factsEmpty");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    var filter = button.getAttribute("data-filter");
    var visibleCount = 0;

    factCards.forEach(function (card) {
      var category = card.getAttribute("data-category");
      var show = filter === "semua" || category === filter;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (factsEmpty) {
      factsEmpty.hidden = visibleCount !== 0;
    }
  });
});

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
  ".ds-fact-card, .ds-random-box, .ds-gallery-item, .ds-hero .feature-card"
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach(function (el) {
    el.classList.add("ds-reveal");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("ds-reveal-visible");
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

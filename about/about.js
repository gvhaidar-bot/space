// ambil semua kartu fitur sama kotak highlight di halaman about
var revealTargets = document.querySelectorAll(
  ".feature-card, .highlight-box"
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

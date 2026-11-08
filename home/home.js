// ambil span tahun yang ada di footer
var footerYear = document.getElementById("footerYear");

// cek dulu, kalau span-nya ada baru lanjut
if (footerYear) {
  // isi span-nya dengan tahun sekarang, misal 2026
  footerYear.textContent = new Date().getFullYear();
}

// tambah class js-ready ke body, biar animasi hero di CSS jalan
document.body.classList.add("js-ready");

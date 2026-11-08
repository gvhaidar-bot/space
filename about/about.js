var revealTargets = document.querySelectorAll(
  ".feature-card, .highlight-box"
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

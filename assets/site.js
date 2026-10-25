// Navigation enhancement only. Content and language links work without JavaScript.
(() => {
  const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if (!("IntersectionObserver" in window)) return;
  const sections = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => sections.set(entry.target.id, entry));
    const visible = [...sections.values()].filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    const anchored = visible.find((entry) => `#${entry.target.id}` === window.location.hash);
    const active = anchored || visible[0];
    const current = active ? `#${active.target.id}` : null;
    links.forEach((link) => {
      if (link.getAttribute("href") === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-15% 0px -40% 0px", threshold: [0, 0.2, 0.6] });
  links.forEach((link) => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) observer.observe(section);
  });
})();

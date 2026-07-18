// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  // Mobile accordion sub-menus
  document.querySelectorAll('.mobile-nav .acc-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      if (sub) sub.classList.toggle('open');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; }
      });
      item.classList.toggle('open');
      a.style.maxHeight = isOpen ? null : a.scrollHeight + 'px';
    });
  });

  // Scroll-reveal for cards
  const cards = document.querySelectorAll('.card');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('show'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => revealIO.observe(c));

  // Animated stat counters
  const counters = document.querySelectorAll('.stat-num');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.count;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          e.target.textContent = cur;
        }, 25);
        countIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => countIO.observe(c));
});

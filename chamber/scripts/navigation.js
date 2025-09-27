// scripts/navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav-menu');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');      // toggle visible class
    btn.classList.toggle('open', isOpen);             // toggle icon state
    btn.setAttribute('aria-expanded', String(isOpen)); // update aria
  });

  // close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
      nav.classList.remove('show');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
});
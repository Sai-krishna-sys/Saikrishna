const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('navLinks');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Scroll progress + active nav
const progress = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
function onScroll() {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  if (progress) progress.style.width = scrolled + '%';
  let current = '';
  sections.forEach(s => { if (h.scrollTop >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.section, .glass-card, .timeline-item, .project-card').forEach(el => {
  el.classList.add('reveal'); io.observe(el);
});

// Typing tagline
const tagline = document.getElementById('tagline');
const phrases = [
  'Full-Stack & Mobile Developer · AI Integration',
  'React · Node · Flutter · Gemini AI',
  'Team Lead · 20-member dev teams',
];
let pi = 0, ci = 0, deleting = false;
function type() {
  if (!tagline) return;
  const target = phrases[pi];
  if (!deleting) {
    tagline.textContent = target.slice(0, ++ci);
    if (ci === target.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    tagline.textContent = target.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

// 3D tilt + parallax on avatar
const stage = document.getElementById('avatarStage');
const tilt = document.getElementById('avatarTilt');
if (stage && tilt) {
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `rotateY(${x * 28}deg) rotateX(${-y * 28}deg)`;
  });
  stage.addEventListener('mouseleave', () => { tilt.style.transform = 'rotateY(0) rotateX(0)'; });
}

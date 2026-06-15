const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const backToTop = document.getElementById('backToTop');
const contactLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const contactForm = document.getElementById('contactForm');

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
  }
  localStorage.setItem('theme', mode);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
}

function toggleMenu() {
  navLinks.classList.toggle('active');
  const expanded = navLinks.classList.contains('active');
  menuBtn.setAttribute('aria-expanded', expanded);
}

function filterProjects(filter) {
  projectCards.forEach((card) => {
    const category = card.dataset.category;
    if (filter === 'all' || category === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function updateActiveFilter(button) {
  filterButtons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
}

function handleScroll() {
  if (window.scrollY > 350) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

menuBtn.addEventListener('click', toggleMenu);

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-mode');
  setTheme(isLight ? 'dark' : 'light');
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterProjects(filter);
    updateActiveFilter(button);
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  if (window.innerWidth > 950) {
    navLinks.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  if (name) {
    alert(`Thank you, ${name}! Your message has been prepared. I will reply soon.`);
  } else {
    alert('Please enter your name and message before sending.');
  }
  contactForm.reset();
});

initTheme();

// ---------- Tema (claro/escuro) com persistência ----------
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ---------- Menu mobile ----------
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Barra de progresso de rolagem ----------
const progressBar = document.getElementById('progressBar');
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${percent}%`;
}

// ---------- Botão voltar ao topo ----------
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  updateProgressBar();
  updateBackToTop();
}, { passive: true });
updateProgressBar();
updateBackToTop();

// ---------- Efeito de digitação (typewriter) ----------
const roles = ['Analista de Dados Júnior', 'Analista de BI Júnior', 'Especialista em Power BI & Looker Studio'];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = currentRole.slice(0, charIndex);
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = currentRole.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ---------- Revelar seções ao rolar + animar barras de habilidade ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar span').forEach((bar) => bar.classList.add('animate'));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Destaque do link de navegação ativo ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach((section) => navObserver.observe(section));

// ---------- Formulário de contato (envia direto para o e-mail via Web3Forms) ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const accessKey = contactForm.access_key.value.trim();
  if (!accessKey || accessKey === 'COLE_SUA_ACCESS_KEY_AQUI') {
    formNote.textContent = 'Formulário ainda não configurado: gere uma Access Key gratuita em web3forms.com e cole no HTML.';
    formNote.classList.add('error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  formNote.classList.remove('error');
  formNote.textContent = '';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
    });
    const result = await response.json();

    if (result.success) {
      formNote.textContent = 'Mensagem enviada com sucesso! Vou responder em breve.';
      contactForm.reset();
    } else {
      throw new Error(result.message || 'Falha ao enviar');
    }
  } catch (err) {
    formNote.textContent = 'Não foi possível enviar agora. Tente novamente ou use o e-mail direto.';
    formNote.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensagem';
  }
});

// ---------- Ano do rodapé ----------
document.getElementById('year').textContent = new Date().getFullYear();

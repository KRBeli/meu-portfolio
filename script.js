document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll suave nos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
          destino.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // 2. Animação das barras de habilidade ao entrar na tela
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nivel = entry.target.querySelector('.nivel');
          if (nivel && nivel.dataset.width) {
            nivel.style.width = nivel.dataset.width;
          }
        }
      });
    }, { threshold: 0.5 });
  
    document.querySelectorAll('.barra').forEach(barra => {
      observer.observe(barra);
    });
  
    // 3. Botão "Voltar ao topo"
    const topoBtn = document.getElementById("topoBtn");
  
    window.addEventListener('scroll', () => {
      topoBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
  
    topoBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // 4. Mensagem de boas-vindas no console
    console.log("👋 Olá! Seja bem-vindo(a) ao meu portfólio de Análise de Dados!");
  });
  
  // script.js
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  
  
  
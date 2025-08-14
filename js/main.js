/* util: ano no rodapé */
document.getElementById("year").textContent = new Date().getFullYear();

/* IntersectionObserver para revelar elementos com fade/slide */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => io.observe(el));

// Animação das barras de habilidade
document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll('.skill-bar');

  // Mapeamento dos níveis para porcentagem
  const nivelMap = {
    'Avançado': 90,
    'Intermediário': 75,
    'Básico': 50
  };

  const animateBar = (bar) => {
    // Busca o texto do nível na mesma linha
    const parent = bar.parentElement;
    const nivelSpan = parent.querySelector('.text-slate-400');
    let value = bar.getAttribute('data-skill');
    if (nivelSpan) {
      const nivel = nivelSpan.textContent.trim();
      if (nivelMap[nivel] !== undefined) {
        value = nivelMap[nivel];
      }
    }
    bar.style.setProperty('--value', value + '%');
  };

  // Usando IntersectionObserver para animar ao entrar na tela
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateBar(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  } else {
    // Fallback para navegadores antigos
    skillBars.forEach(animateBar);
  }
});

// Animação das barras de habilidade ao entrar na tela
const skillBars = document.querySelectorAll('.skill-bar');
const revealElements = document.querySelectorAll('.reveal');

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add('visible');
    }
  });

  skillBars.forEach(bar => {
    const top = bar.getBoundingClientRect().top;
    if (top < triggerBottom) {
      bar.style.setProperty('--value', bar.getAttribute('style').match(/--value:\s*([^;]+)/)[1]);
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


skillBars.forEach((bar) => sbObs.observe(bar));

/* Suaviza cliques do menu (fallback, além do scroll-smooth do html) */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// Remova o carrossel automático do Hero
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const imgs = carousel.querySelectorAll('img');
    let idx = 0;
    setInterval(() => {
      imgs.forEach((img, i) => {
        img.style.opacity = (i === idx) ? "1" : "0";
      });
      idx = (idx + 1) % imgs.length;
    }, 4000);
  }
});


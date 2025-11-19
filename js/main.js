/* util: ano no rodapé */
document.getElementById("year").textContent = new Date().getFullYear();

/* IntersectionObserver para revelar elementos com fade/slide */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// Animação das barras de habilidade (com IntersectionObserver)
document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll(".skill-bar");

  // Mapeamento dos níveis para porcentagem
  const nivelMap = {
    Avançado: 90,
    Intermediário: 75,
    Básico: 50,
  };

  const animateBar = (bar) => {
    // Busca o texto do nível na mesma linha
    const parent = bar.parentElement;
    const nivelSpan = parent.querySelector(".text-slate-400");
    let value = bar.getAttribute("data-skill");
    if (nivelSpan) {
      const nivel = nivelSpan.textContent.trim();
      if (nivelMap[nivel] !== undefined) {
        value = nivelMap[nivel];
      }
    }
    bar.style.setProperty("--value", value + "%");
  };

  // Usando IntersectionObserver para animar ao entrar na tela
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBar(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  } else {
    // Fallback para navegadores antigos
    skillBars.forEach(animateBar);
  }
});

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

// Remover / neutralizar carrossel automático do Hero (só roda se existir #hero-carousel)
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("hero-carousel");
  if (carousel) {
    const imgs = carousel.querySelectorAll("img");
    let idx = 0;
    setInterval(() => {
      imgs.forEach((img, i) => {
        img.style.opacity = i === idx ? "1" : "0";
      });
      idx = (idx + 1) % imgs.length;
    }, 4000);
  }
});

/* ================================
   CARROSSEL DE PROJETOS
   ================================ */
(function () {
  const slides = document.querySelectorAll(".project-slide");
  const prevBtn = document.querySelector(
    '.carousel-btn[data-direction="prev"]'
  );
  const nextBtn = document.querySelector(
    '.carousel-btn[data-direction="next"]'
  );
  const dots = document.querySelectorAll(".carousel-dots .dot");

  // Se não achar os elementos, não faz nada
  if (!slides.length || !prevBtn || !nextBtn) {
    console.log("Carrossel: elementos não encontrados.");
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    if (dots.length) {
      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }

  // Botões de navegação
  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  // Bolinhas de navegação
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = parseInt(dot.dataset.target, 10);
      if (!Number.isNaN(target)) {
        showSlide(target);
      }
    });
  });

  // Inicia no primeiro slide
  showSlide(0);
})();

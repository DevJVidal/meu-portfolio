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

// ===============================
// 🌍 TRADUÇÕES
// ===============================
const translations = {
  pt: {
    // NAV
    "nav-sobre": "Sobre",
    "nav-projetos": "Projetos",
    "nav-habilidades": "Habilidades",
    "nav-contato": "Contato",
    "btn-contato": "Fale comigo",

    // HERO
    "hero-badge-text": "Portfólio em constante evolução",
    "hero-title": "Ferramentas e soluções Full Stack para produtos modernos",
    "hero-desc": "Eu crio aplicações web funcionais, acessíveis e escaláveis — do design de interfaces ao back-end robusto.",
    "btn-projects": "Ver Projetos",
    "btn-sobre": "Sobre mim",
    "btn-cv": "Baixar CV",

    // SOBRE
    "sobre-title": "Sobre mim",
    "sobre-role": "Desenvolvedor Full Stack",
    "sobre-desc": "Olá, eu me chamo Janderson Vidal! Sou um desenvolvedor full stack especializado na criação de aplicações web completas. Atuo no desenvolvimento de interfaces modernas e na construção de APIs e sistemas escaláveis no back-end.",
    
    // ÁREAS DE ATUAÇÃO
    "area-title": "Áreas de atuação",
    "area-1": "Desenvolvimento de interfaces interativas e responsivas com <strong>React</strong> e <strong>Next.js</strong>.",
    "area-2": "Construção de APIs robustas e escaláveis com <strong>Node.js</strong>, <strong>Express</strong> e <strong>NestJS</strong>.",
    "area-3": "Gerenciamento de bancos de dados com <strong>PostgreSQL</strong>, <strong>MySQL</strong> e <strong>MongoDB</strong>.",
    "area-4": "Versionamento e boas práticas usando <strong>Git</strong> e <strong>Docker</strong>.",

    "motivacao-title": "Motivação",
    "motivacao-1": "Desenvolver soluções úteis e bem estruturadas, com impacto real para quem utiliza.",
    "motivacao-2": "Buscar evolução contínua por meio de novas tecnologias e boas práticas.",
    "motivacao-3": "Colaborar com outros desenvolvedores, aprendendo e contribuindo em equipe.",
    "conversa-title": "Vamos conversar?",
    "conversa-desc": "Estou aberto a oportunidades, colaborações e boas conversas sobre tecnologias.",
    "btn-github": "Ver Github",

    // ESTATÍSTICAS (Adicionadas)
    "stat-stacks-label": "Stacks",
    "stat-projects-label": "Projetos",
    "stat-exp-label": "Anos de experiências",

    // PROJETOS
    "projetos-title": "Projetos em Destaque",
    "projetos-desc": "Projetos reais, construídos para resolver problemas de formas práticas.",
    "proj1-title": "Painel de Operações Logísticas",
    "proj1-desc": "Aplicação web para centralizar e gerenciar dados logísticos em tempo real.",
    "proj1-link": "Ver projeto",

    "proj2-title": "Simulador de Trade",
    "proj2-desc": "Simulação de operações de trade com gráficos e histórico.",
    "proj2-link": "Ver projeto",

    "proj3-title": "Vidarix",
    "proj3-desc": "Plataforma de streaming interativa estilo Netflix.",
    "proj3-link": "Ver projeto",

    "proj4-title": "NeuroPulse",
    "proj4-desc": "Painel interativo com dados de saúde mental no Brasil.",
    "proj4-link": "Ver projeto",

    "proj5-title": "Projeto Extra 2",
    "proj5-desc": "Projeto adicional para demonstração de backend/API.",
    "proj5-link": "Ver projeto",

    "proj6-title": "Projeto Extra 3",
    "proj6-desc": "Mais um projeto para compor o portfólio.",
    "proj6-link": "Ver projeto",

    // HABILIDADES
    "habilidades-title": "Habilidades",
    "habilidades-desc": "Tecnologias que uso para transformar ideias em aplicações reais.",
    // NÍVEIS DE HABILIDADE (Adicionadas)
    "skill-html-level": "Avançado",
    "skill-css-level": "Avançado",
    "skill-js-level": "Avançado",
    "skill-react-level": "Avançado",
    "skill-git-level": "Avançado",
    "skill-node-level": "Avançado",
    "skill-python-level": "Intermediário",
    "skill-php-level": "Avançado",
    "skill-sql-level": "Avançado",

    // CONTATO
    "contato-title": "Vamos conversar",
    "contato-desc": "Aberto a projetos, oportunidades e boas ideias.",
    "contact-email": "Email",
    "contact-linkedin": "LinkedIn",
    "contact-github": "GitHub",
    "contact-whatsapp": "WhatsApp",

    // FOOTER
    "footer-text": "© 2026 Janderson. Todos os direitos reservados.",
    "footer-sobre": "Sobre",
    "footer-projetos": "Projetos",
    "footer-habilidades": "Habilidades",
    "footer-contato": "Contato"
  },

  en: {
    // NAV
    "nav-sobre": "About",
    "nav-projetos": "Projects",
    "nav-habilidades": "Skills",
    "nav-contato": "Contact",
    "btn-contato": "Contact me",

    // HERO
    "hero-badge-text": "Portfolio in constant evolution",
    "hero-title": "Full Stack tools and solutions for modern products",
    "hero-desc": "I build functional, accessible and scalable web applications.",
    "btn-projects": "View Projects",
    "btn-sobre": "About me",
    "btn-cv": "Download CV",

    // SOBRE
    "sobre-title": "About me",
    "sobre-role": "Full Stack Developer",
    "sobre-desc": "Hi, I'm Janderson Vidal! A full stack developer focused on building modern applications.",
    
    // ÁREAS DE ATUAÇÃO
    "area-title": "Areas of expertise",
    "area-1": "Development of interactive and responsive interfaces with <strong>React</strong> and <strong>Next.js</strong>.",
    "area-2": "Building robust and scalable APIs with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>NestJS</strong>.",
    "area-3": "Database management with <strong>PostgreSQL</strong>, <strong>MySQL</strong>, and <strong>MongoDB</strong>.",
    "area-4": "Version control and best practices using <strong>Git</strong> and <strong>Docker</strong>.",

    "motivacao-title": "Motivation",
    "motivacao-1": "Build useful and well-structured solutions.",
    "motivacao-2": "Continuously evolve with new technologies.",
    "motivacao-3": "Collaborate and grow with other developers.",
    "conversa-title": "Let's talk?",
    "conversa-desc": "Open to opportunities and collaborations.",
    "btn-github": "See Github",

    // ESTATÍSTICAS (Adicionadas)
    "stat-stacks-label": "Stacks",
    "stat-projects-label": "Projects",
    "stat-exp-label": "Years of experience",

    // PROJETOS
    "projetos-title": "Featured Projects",
    "projetos-desc": "Real projects built to solve practical problems.",
    "proj1-title": "Logistics Operations Dashboard",
    "proj1-desc": "Web app for real-time logistics management.",
    "proj1-link": "View project",

    "proj2-title": "Trade Simulator",
    "proj2-desc": "Trading simulator with charts and history.",
    "proj2-link": "View project",

    "proj3-title": "Vidarix",
    "proj3-desc": "Netflix-style interactive streaming platform.",
    "proj3-link": "View project",

    "proj4-title": "NeuroPulse",
    "proj4-desc": "Interactive mental health dashboard.",
    "proj4-link": "View project",

    "proj5-title": "Extra Project 2",
    "proj5-desc": "Backend/API showcase project.",
    "proj5-link": "View project",

    "proj6-title": "Extra Project 3",
    "proj6-desc": "Another portfolio project.",
    "proj6-link": "View project",

    // HABILIDADES
    "habilidades-title": "Skills",
    "habilidades-desc": "Technologies I use to build real applications.",
    // NÍVEIS DE HABILIDADE (Adicionadas)
    "skill-html-level": "Advanced",
    "skill-css-level": "Advanced",
    "skill-js-level": "Advanced",
    "skill-react-level": "Advanced",
    "skill-git-level": "Advanced",
    "skill-node-level": "Advanced",
    "skill-python-level": "Intermediate",
    "skill-php-level": "Advanced",
    "skill-sql-level": "Advanced",

    // CONTATO
    "contato-title": "Let's talk",
    "contato-desc": "Open to projects and ideas.",
    "contact-email": "Email",
    "contact-linkedin": "LinkedIn",
    "contact-github": "GitHub",
    "contact-whatsapp": "WhatsApp",

    // FOOTER
    "footer-text": "© 2026 Janderson. All rights reserved.",
    "footer-sobre": "About",
    "footer-projetos": "Projects",
    "footer-habilidades": "Skills",
    "footer-contato": "Contact"
  }
};

// ===============================
// 🔁 TROCAR IDIOMA
// ===============================
function setLanguage(lang) {
  const elements = document.querySelectorAll("[id]");

  elements.forEach(el => {
    const key = el.id;
    if (translations[lang][key]) {
      // Usando innerHTML para renderizar as tags <strong> corretamente
      el.innerHTML = translations[lang][key];
    }
  });

  localStorage.setItem("lang", lang);

  // Atualiza botão
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.textContent = lang === "pt" ? "EN" : "PT";
  }
}

// ===============================
// 🚀 INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang");

  let lang;

  if (savedLang) {
    lang = savedLang;
  } else {
    const systemLang = navigator.language.toLowerCase();
    lang = systemLang.includes("pt") ? "pt" : "en";
  }

  setLanguage(lang);

  // BOTÃO
  const toggleBtn = document.getElementById("lang-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = localStorage.getItem("lang") || "pt";
      const newLang = current === "pt" ? "en" : "pt";
      setLanguage(newLang);
    });
  }
});
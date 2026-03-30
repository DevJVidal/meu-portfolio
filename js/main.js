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

    // ESTATÍSTICAS
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
    "skill-html-level": "Avançado",
    "skill-css-level": "Avançado",
    "skill-js-level": "Avançado",
    "skill-react-level": "Avançado",
    "skill-git-level": "Avançado",
    "skill-node-level": "Avançado",
    "skill-python-level": "Intermediário",
    "skill-php-level": "Avançado",
    "skill-sql-level": "Avançado",

    // CONTATO (ATUALIZADO)
    "contato-title": "O que você faria se um <span class=\"text-violet-500\">desenvolvedor em software</span> estivesse a apenas um clique de distância?",
    "contato-desc": "Seja para iniciar um novo projeto ou apenas para dizer olá, adoraria ouvir de você.",
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

    // ESTATÍSTICAS
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
    "skill-html-level": "Advanced",
    "skill-css-level": "Advanced",
    "skill-js-level": "Advanced",
    "skill-react-level": "Advanced",
    "skill-git-level": "Advanced",
    "skill-node-level": "Advanced",
    "skill-python-level": "Intermediate",
    "skill-php-level": "Advanced",
    "skill-sql-level": "Advanced",

    // CONTATO (ATUALIZADO)
    "contato-title": "What would you do if a <span class=\"text-violet-500\">software developer</span> was just a click away?",
    "contato-desc": "Whether to start a new project or just to say hi, I'd love to hear from you.",
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
      // Usando innerHTML para renderizar as tags <strong> e <span> corretamente
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


// ===============================
// 🎬 ANIMAÇÕES DE SCROLL (REVEAL)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos que têm a classe .reveal
  const reveals = document.querySelectorAll(".reveal");

  // Configuração do observador
  const revealOptions = {
    threshold: 0.15, // Aciona quando 15% do elemento estiver visível na tela
    rootMargin: "0px 0px -50px 0px" 
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      // Se o elemento entrou na tela
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Opcional: descomente a linha abaixo se quiser que a animação aconteça SÓ UMA VEZ
        // observer.unobserve(entry.target); 
      } else {
        // Remove a classe se ele sair da tela (faz a animação repetir ao subir e descer)
        entry.target.classList.remove("active");
      }
    });
  }, revealOptions);

  // Coloca o observador para vigiar cada elemento .reveal
  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
});

// ===============================
// 🔥 FUNÇÕES EXTRAS (NÍVEL SÊNIOR)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. EFEITO DE DIGITAÇÃO (Typing Effect)
  const words = ["React", "Node.js", "Python", "PostgreSQL", "Next.js", "Tailwind CSS"];
  let i = 0, j = 0, isDeleting = false;
  const typeTarget = document.getElementById("typewriter");
  
  function type() {
    if (!typeTarget) return;
    const currentWord = words[i];
    
    if (isDeleting) {
      typeTarget.textContent = currentWord.substring(0, j - 1);
      j--;
    } else {
      typeTarget.textContent = currentWord.substring(0, j + 1);
      j++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && j === currentWord.length) {
      typeSpeed = 2000; // Pausa com a palavra completa
      isDeleting = true;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length; // Passa para a próxima palavra
      typeSpeed = 500; // Pausa antes de digitar a próxima
    }
    setTimeout(type, typeSpeed);
  }
  if(typeTarget) type(); // Inicia o efeito

  // 2. SCROLLSPY (Destacar o menu ativo)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const spyOptions = {
    rootMargin: "-20% 0px -70% 0px" // Gatilho quando a seção passa pelo meio da tela
  };

  const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove("nav-active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("nav-active");
          }
        });
      }
    });
  }, spyOptions);

  sections.forEach(sec => scrollSpy.observe(sec));

  // 3. BOTÃO VOLTAR AO TOPO
  const bttBtn = document.getElementById("back-to-top");
  if(bttBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        bttBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
        bttBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
      } else {
        bttBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
        bttBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
      }
    });

    bttBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. EFEITO GRADIENTE SEGUINDO O MOUSE NO FUNDO
  const glow = document.getElementById("mouse-glow");
  if (glow) {
    window.addEventListener("mousemove", (e) => {
      glow.style.setProperty("--x", `${e.clientX}px`);
      glow.style.setProperty("--y", `${e.clientY}px`);
    });
    // Só aparece quando o mouse se move (evita bugar em mobile)
    window.addEventListener("mouseover", () => glow.style.opacity = "1");
  }

  // 5. EASTER EGG NO CONSOLE (Organizado)
  console.log(
    "%c👋 Olá, dev! Vasculhando o código, hein? \n%cComo pode ver, o código é limpo e organizado. Vamos trocar uma ideia no LinkedIn: https://www.linkedin.com/in/janderson-vidal",
    "font-size: 18px; color: #8b5cf6; font-weight: bold; text-shadow: 0 0 10px rgba(139,92,246,0.5);",
    "font-size: 14px; color: #cbd5e1; font-family: monospace; line-height: 1.5;"
  );

  // 6. EFEITO TILT (3D) NOS PROJETOS - Versão Final (Para Carrossel)
  function applyTilt() {
    const cards = document.querySelectorAll(".project-card");
    if (typeof VanillaTilt !== "undefined") {
      cards.forEach(card => {
        if (card.vanillaTilt) card.vanillaTilt.destroy();
      });
      VanillaTilt.init(cards, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.02,
      });
    }
  }

  applyTilt(); // Inicializa na carga

  // Reaplica o Tilt ao interagir com o carrossel
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("carousel-btn") || 
      e.target.classList.contains("dot") ||
      e.target.closest(".carousel-btn")
    ) {
      setTimeout(applyTilt, 200);
    }
  });

});
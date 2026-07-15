// Rellenar año en footer
document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp rápido
const phoneNumber = "+593600000000"; // número provisional en formato internacional (+593)
const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappInline = document.getElementById("whatsappInline");
const contactForm = document.getElementById("contactForm");
function openWhatsApp(text) {
  const url = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    const open = mobileNav.style.display === "block";
    mobileNav.style.display = open ? "none" : "block";
    mobileNav.setAttribute("aria-hidden", open ? "true" : "false");
  });
  // Close when a link is clicked
  mobileNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileNav.style.display = "none";
      mobileNav.setAttribute("aria-hidden", "true");
    }),
  );
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Testimonial slider (auto-scroll)
const slider = document.getElementById("testimonialSlider");
if (slider) {
  let pos = 0;
  const step = slider.querySelector(".testimonial")?.offsetWidth || 320;
  setInterval(() => {
    pos += step + 18; // gap
    if (pos >= slider.scrollWidth - slider.clientWidth) pos = 0;
    slider.scrollTo({ left: pos, behavior: "smooth" });
  }, 4000);
}

// Projects navigation
const projectData = [
  {
    title: "Proyecto 1",
    description: "Tienda, ecommerce responsivo, JavaScript puro.",
    img: "/assets/img/1.png",
    link: "https://icomers.netlify.app/",
  },
  {
    title: "Proyecto 2",
    description: "Diseño responsivo, motor de búsqueda y peticiones REST.",
    img: "/assets/img/2.png",
    link: "https://pokemon-120.netlify.app/",
  },
  {
    title: "Proyecto 3",
    description: "Aplicación web con React y Node.js, API REST.",
    img: "/assets/img/3.png",
    link: "https://rick-and-morty-120.netlify.app/",
  },
  {
    title: "Proyecto 4",
    description: "Portafolio profesional con React.",
    img: "/assets/img/4.png",
    link: "https://my-portafolio-2.netlify.app/#contact",
  },
];
let currentProjectIndex = 0;
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectImage = document.getElementById("projectImage");
const projectLink = document.getElementById("projectLink");
const projectCounter = document.getElementById("projectCounter");
const projPrevBtn = document.getElementById("projPrev");
const projNextBtn = document.getElementById("projNext");

function renderProject(index) {
  const project = projectData[index];
  if (!project) return;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectImage.src = project.img;
  projectImage.alt = `${project.title} imagen`;
  projectLink.href = project.link;
  projectLink.setAttribute(
    "aria-label",
    `Abrir ${project.title} en una nueva pestaña`,
  );
  projectCounter.textContent = `${index + 1} / ${projectData.length}`;
}

if (projPrevBtn) {
  projPrevBtn.addEventListener("click", () => {
    currentProjectIndex =
      (currentProjectIndex - 1 + projectData.length) % projectData.length;
    renderProject(currentProjectIndex);
  });
}

if (projNextBtn) {
  projNextBtn.addEventListener("click", () => {
    currentProjectIndex = (currentProjectIndex + 1) % projectData.length;
    renderProject(currentProjectIndex);
  });
}

window.addEventListener("load", () => {
  renderProject(currentProjectIndex);
});

// Parallax mouse movement inside hero
const parallaxContainer = document.querySelector("[data-parallax-container]");
if (parallaxContainer) {
  parallaxContainer.addEventListener("mousemove", (e) => {
    const rect = parallaxContainer.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    parallaxContainer.querySelectorAll("[data-parallax]").forEach((el) => {
      const factor = parseFloat(el.getAttribute("data-parallax")) || 0.06;
      el.style.transform = `translate3d(${dx * factor * 40}px, ${dy * factor * 30}px, 0) scale(${1 + factor / 8})`;
    });
  });
  parallaxContainer.addEventListener("mouseleave", () => {
    parallaxContainer.querySelectorAll("[data-parallax]").forEach((el) => {
      el.style.transform = "none";
    });
  });
}

// Preloader hide on load
const preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    setTimeout(() => preloader.remove(), 600);
  }
});

// Scroll progress bar
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / h) * 100;
  if (progress)
    progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
});

// Tilt effect on interactive cards
document.querySelectorAll(".interactive-card[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const rx = dy * 6;
    const ry = dx * -6;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
  });
});

// Stagger reveal: add small delay based on data-index
document.querySelectorAll(".reveal[data-index]").forEach((el) => {
  const idx = parseInt(el.getAttribute("data-index"), 10) || 0;
  el.style.transitionDelay = `${idx * 120}ms`;
});

// Back to top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.style.display = "block";
  else backToTop.style.display = "none";
});
if (backToTop)
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
if (whatsappBtn)
  whatsappBtn.addEventListener("click", () =>
    openWhatsApp("Hola, quiero solicitar una cotización"),
  );
if (whatsappInline)
  whatsappInline.addEventListener("click", () => {
    const data = new FormData(
      contactForm || document.getElementById("contactForm"),
    );
    const message = `Solicitud desde web%0ANombre: ${data.get("name") || "-"}%0ATeléfono: ${data.get("phone") || "-"}%0AServicio: ${data.get("service") || "-"}%0AMensaje: ${data.get("message") || "-"}`;
    openWhatsApp(message);
  });

// Form submit: show sending state briefly then proceed to mailto
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type='submit']");
    if (btn) {
      btn.classList.add("sending");
      btn.disabled = true;
    }
    setTimeout(() => {
      const data = new FormData(contactForm);
      const subject = `Solicitud - ${data.get("service")}`;
      const body = `Nombre: ${data.get("name")}\nTeléfono: ${data.get("phone")}\nServicio: ${data.get("service")}\nMensaje: ${data.get("message")}`;
      const mailto = `mailto:contacto@dreamtech.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (btn) {
        btn.classList.remove("sending");
        btn.disabled = false;
      }
    }, 900);
  });
}

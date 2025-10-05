const header = document.querySelector(".header");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
const menuIcon = document.getElementById("menuIcon");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const responseMessage = document.getElementById("responseMessage");
const commandInput = document.getElementById("commandInput");
const commandHistory = document.getElementById("commandHistory");
const typedText = document.getElementById("typedText");
const cursor = document.getElementById("cursor");

let isMenuOpen = false;
let isSubmitting = false;

document.addEventListener("DOMContentLoaded", () => {
  initializeHero();
  initializeNavigation();
  initializeTerminal();
  initializeProjects();
  initializeContactForm();
  initializeScrollEffects();
  createBackgroundEffects();
  initializeResponsiveFeatures();
  initializeContactAnimations();
});

/* ------------------ HERO ------------------ */
function initializeHero() {
  const heroContent = document.querySelector(".hero-content");
  const terminal = document.querySelector(".terminal");

  if (heroContent) heroContent.style.animation = "fadeInUp 1s ease forwards";
  if (terminal) terminal.style.animation = "fadeInScale 1s ease 0.5s forwards";

  const heroSection = document.querySelector('.hero-section');
  if (heroSection && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.25;
      heroSection.style.transform = `translateY(${parallax}px)`;
    });
  }
}

/* ------------------ RESPONSIVE ------------------ */
function initializeResponsiveFeatures() {
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }, 100);
  });
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

  let touchStartY = 0, touchEndY = 0;
  document.addEventListener('touchstart', (e) => touchStartY = e.changedTouches[0].screenY);
  document.addEventListener('touchend', (e) => { touchEndY = e.changedTouches[0].screenY; handleSwipeGesture(); });

  function handleSwipeGesture() {
    const swipeThreshold = 50, diff = touchStartY - touchEndY;
    if (Math.abs(diff) > swipeThreshold && diff > 0 && isMenuOpen) {
      mobileNav.classList.remove("active");
      menuIcon.className = "fas fa-bars";
      isMenuOpen = false;
    }
  }

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => img.style.opacity = '1');
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
}

/* ------------------ CONTACT ANIMATIONS ------------------ */
function initializeContactAnimations() {
  const contactMethods = document.querySelectorAll('.contact-method');
  const collabItems = document.querySelectorAll('.collab-item');

  const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) setTimeout(() => entry.target.style.animation = 'fadeInLeft 0.6s ease forwards', i * 100);
    });
  }, observerOptions);

  contactMethods.forEach(el => observer.observe(el));
  collabItems.forEach(el => observer.observe(el));

  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px) scale(1.05)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0) scale(1)');
  });

  document.querySelectorAll('.method-value[href]').forEach(val => {
    val.addEventListener('click', () => {
      val.style.animation = 'pulse 0.3s ease';
      setTimeout(() => val.style.animation = '', 300);
    });
  });
}

/* ------------------ HEADER & SCROLL ------------------ */
let ticking = false;
function updateHeader() {
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");

  if (window.scrollY > 300) backToTop.classList.add("visible");
  else backToTop.classList.remove("visible");

  ticking = false;
}
window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; } });

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) { mobileNav.classList.add("active"); menuIcon.className = "fas fa-times"; document.body.style.overflow = 'hidden'; }
  else { mobileNav.classList.remove("active"); menuIcon.className = "fas fa-bars"; document.body.style.overflow = 'auto'; }
});
document.addEventListener('click', e => {
  if (isMenuOpen && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileNav.classList.remove("active"); menuIcon.className = "fas fa-bars"; isMenuOpen = false; document.body.style.overflow = 'auto';
  }
});

/* ------------------ NAVIGATION ------------------ */
function initializeNavigation() {
  document.querySelectorAll(".nav-link, .nav-mobile-link, .cta-button").forEach(link => {
    link.addEventListener("click", e => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          const targetPos = target.offsetTop - header.offsetHeight - 20;
          window.scrollTo({ top: targetPos, behavior: "smooth" });
        }
      }
      if (isMenuOpen) { mobileNav.classList.remove("active"); menuIcon.className = "fas fa-bars"; isMenuOpen = false; document.body.style.overflow = 'auto'; }
    });
  });
}

/* ------------------ TERMINAL ------------------ */
function initializeTerminal() {
  const welcomeText = "";
  let index = 0;
  const typeWriter = setInterval(() => { if (index < welcomeText.length) typedText.textContent = welcomeText.slice(0, ++index); else clearInterval(typeWriter); }, 100);
  setInterval(() => cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0", 500);

  commandInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const cmd = commandInput.value.toLowerCase().trim();
      let response = "";
      switch (cmd) {
        case "run projects": response = "> Loading projects... ✓"; setTimeout(() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" }), 800); break;
        case "show skills": response = "> Displaying skills matrix... ✓"; setTimeout(() => document.getElementById("skills").scrollIntoView({ behavior: "smooth" }), 800); break;
        case "contact": response = "> Opening communication channel... ✓"; setTimeout(() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" }), 800); break;
        case "about": response = "> Loading developer profile... ✓"; setTimeout(() => document.getElementById("about").scrollIntoView({ behavior: "smooth" }), 800); break;
        case "home": response = "> Navigating to home... ✓"; setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 800); break;
        case "help": response = "> Commands: run projects, show skills, about, contact, home, clear"; break;
        case "clear": commandHistory.innerHTML = ""; commandInput.value = ""; return;
        default: response = `> Command '${cmd}' not found. Type 'help' for commands.`; 
      }
      const cmdLine = document.createElement("div");
      cmdLine.className = "terminal-line";
      cmdLine.style.color = "#22d3ee"; cmdLine.style.opacity = "0"; cmdLine.textContent = `$ ${commandInput.value}`;
      const resLine = document.createElement("div");
      resLine.className = "terminal-line"; resLine.style.color = "#4ade80"; resLine.style.opacity = "0"; resLine.textContent = response;
      commandHistory.appendChild(cmdLine); commandHistory.appendChild(resLine);
      setTimeout(() => cmdLine.style.opacity = "1", 100);
      setTimeout(() => resLine.style.opacity = "1", 300);
      commandInput.value = ""; commandHistory.scrollTop = commandHistory.scrollHeight;
    }
  });
}

/* ------------------ PROJECTS ------------------ */
function initializeProjects() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card, i) => card.style.setProperty('--delay', `${i*0.08}s`));

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active")); btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      projectCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter==="all" || cat===filter) { card.classList.remove("hidden"); card.style.animation=`fadeInUp 0.6s var(--delay) ease forwards`; }
        else { card.style.animation="fadeOutDown 0.3s ease forwards"; setTimeout(()=>card.classList.add("hidden"),300); }
      });
    });
  });

  projectCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      if (window.innerWidth>768) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rotateX = (y-rect.height/2)/15, rotateY = (rect.width/2-x)/15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        card.style.boxShadow = `${-rotateY*2}px ${rotateX*2}px 25px rgba(34,197,94,0.25)`;
      }
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      card.style.boxShadow="0 10px 20px rgba(0,0,0,0.05)";
    });
  });
}

/* ------------------ CONTACT FORM ------------------ */
function initializeContactForm() {
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => { input.addEventListener('blur', validateField); input.addEventListener('input', clearErrors); });

  function validateField(e) {
    const f=e.target, v=f.value.trim(); f.classList.remove('error');
    if(f.hasAttribute('required') && !v){ f.classList.add('error'); return false; }
    if(f.type==='email' && v){ const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; if(!regex.test(v)){ f.classList.add('error'); return false; } }
    return true;
  }
  function clearErrors(e){ e.target.classList.remove('error'); }

  contactForm.addEventListener("submit", async e=>{
    e.preventDefault(); if(isSubmitting) return; let valid=true; formInputs.forEach(f=>{ if(!validateField({target:f})) valid=false; });
    if(!valid){ contactForm.style.animation='shake 0.5s ease'; setTimeout(()=>contactForm.style.animation='',500); return; }

    isSubmitting=true; submitBtn.disabled=true;
    submitBtn.innerHTML=`<div style="width:20px;height:20px;border:2px solid white;border-top:2px solid transparent;border-radius:50%;animation:spin 1s linear infinite;"></div><span>Sending...</span>`;
    await new Promise(r=>setTimeout(r,2000));
    submitBtn.innerHTML=`<i class="fas fa-check-circle"></i><span>200 OK</span>`;
    responseMessage.className="response-message success"; responseMessage.style.display="block";
    responseMessage.innerHTML=`<div style="font-family:'JetBrains Mono', monospace; font-size:0.875rem;"><div>HTTP/1.1 200 OK</div><div>Content-Type: application/json</div><div style="margin-top:0.5rem;">{ "status": "Message sent successfully!" }</div></div>`;
    setTimeout(()=>{
      contactForm.reset(); submitBtn.disabled=false;
      submitBtn.innerHTML=`<i class="fas fa-paper-plane"></i><span>POST Request</span>`;
      responseMessage.style.display="none"; isSubmitting=false;
    },3000);
  });
}

/* ------------------ SCROLL EFFECTS ------------------ */
function initializeScrollEffects() {
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.style.animation="fadeInUp 0.8s ease forwards"; entry.target.classList.add('animate-in'); }});
  }, { threshold:0.1, rootMargin:"0px 0px -50px 0px" });

  document.querySelectorAll(".skill-category, .project-card, .education-item, .achievement-item, .code-block, .contact-card")
    .forEach(el=>observer.observe(el));
}

/* ------------------ BACK TO TOP ------------------ */
backToTop.addEventListener("click", ()=>window.scrollTo({top:0,behavior:"smooth"}));

/* ------------------ BACKGROUND EFFECTS ------------------ */
function createBackgroundEffects() {
  const symbols=["{","}","<",">","(",")","[","]",";",":","=","+","=>","&&","||"];
  const container=document.querySelector(".floating-symbols");
  symbols.forEach((sym,i)=>{
    const el=document.createElement("div"); el.className="floating-symbol"; el.textContent=sym;
    el.style.left=`${10+((i*8)%80)}%`; el.style.top=`${20+((i*15)%60)}%`; el.style.animationDelay=`${i*0.5}s`; el.style.fontSize=`${1.5+Math.random()*1}rem`; container.appendChild(el);
  });
}

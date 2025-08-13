const header = document.querySelector(".header")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")
const menuIcon = document.getElementById("menuIcon")
const backToTop = document.getElementById("backToTop")
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submitBtn")
const submitText = document.getElementById("submitText")
const responseMessage = document.getElementById("responseMessage")
const commandInput = document.getElementById("commandInput")
const commandHistory = document.getElementById("commandHistory")
const typedText = document.getElementById("typedText")
const cursor = document.getElementById("cursor")


let isMenuOpen = false
let isSubmitting = false

document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  initializeNavigation()
  initializeTerminal()
  initializeProjects()
  initializeContactForm()
  initializeScrollEffects()
  createBackgroundEffects()
  initializeResponsiveFeatures()
  initializeContactAnimations()
})

function initializeResponsiveFeatures() {
  
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      // Recalculate viewport height for mobile browsers
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }, 100)
  })
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)

  // Handle touch events for better mobile interaction
  let touchStartY = 0
  let touchEndY = 0

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY
  })

  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY
    handleSwipeGesture()
  })

  function handleSwipeGesture() {
    const swipeThreshold = 50
    const diff = touchStartY - touchEndY

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {

        if (isMenuOpen) {
          mobileNav.classList.remove("active")
          menuIcon.className = "fas fa-bars"
          isMenuOpen = false
        }
      }
    }
  }

  const images = document.querySelectorAll('img')
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1'
    })
    img.style.opacity = '0'
    img.style.transition = 'opacity 0.3s ease'
  })
}

function initializeContactAnimations() {
  const contactMethods = document.querySelectorAll('.contact-method')
  const collaborationItems = document.querySelectorAll('.collab-item')
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  }

  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = 'fadeInLeft 0.6s ease forwards'
        }, index * 100)
      }
    })
  }, observerOptions)

  contactMethods.forEach(method => contactObserver.observe(method))
  collaborationItems.forEach(item => contactObserver.observe(item))

  // Add hover effects to social buttons
  const socialBtns = document.querySelectorAll('.social-btn')
  socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)'
    })
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)'
    })
  })
  const methodValues = document.querySelectorAll('.method-value')
  methodValues.forEach(value => {
    if (value.href) {
      value.addEventListener('click', function() {
        this.style.animation = 'pulse 0.3s ease'
        setTimeout(() => {
          this.style.animation = ''
        }, 300)
      })
    }
  })
}


let ticking = false
function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }


  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
  
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader)
    ticking = true
  }
})

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen

  if (isMenuOpen) {
    mobileNav.classList.add("active")
    menuIcon.className = "fas fa-times"

    document.body.style.overflow = 'hidden'
  } else {
    mobileNav.classList.remove("active")
    menuIcon.className = "fas fa-bars"
    document.body.style.overflow = 'auto'
  }
})

document.addEventListener('click', (e) => {
  if (isMenuOpen && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileNav.classList.remove("active")
    menuIcon.className = "fas fa-bars"
    isMenuOpen = false
    document.body.style.overflow = 'auto'
  }
})

function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link, .nav-mobile-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20 // Added extra offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        })
      }

      if (isMenuOpen) {
        mobileNav.classList.remove("active")
        menuIcon.className = "fas fa-bars"
        isMenuOpen = false
        document.body.style.overflow = 'auto'
      }
    })
  })

  const ctaButtons = document.querySelectorAll('.cta-button')
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault()
        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)
        
        if (targetElement) {
          const headerHeight = header.offsetHeight
          const targetPosition = targetElement.offsetTop - headerHeight - 20
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          })
        }
      }
    })
  })
}

function initializeTerminal() {
  const welcomeText = "$ welcome_to MyPortfolio"
  let index = 0

  const typeWriter = setInterval(() => {
    if (index < welcomeText.length) {
      typedText.textContent = welcomeText.slice(0, index + 1)
      index++
    } else {
      clearInterval(typeWriter)
    }
  }, 100)

  
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0"
  }, 500)

  
  commandInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = this.value.toLowerCase().trim()
      let response = ""

      switch (command) {
        case "run projects":
          response = "> Loading projects... ✓"
          setTimeout(() => {
            document.getElementById("projects").scrollIntoView({ behavior: "smooth" })
          }, 1000)
          break
        case "show skills":
          response = "> Displaying skills matrix... ✓"
          setTimeout(() => {
            document.getElementById("skills").scrollIntoView({ behavior: "smooth" })
          }, 1000)
          break
        case "contact":
          response = "> Opening communication channel... ✓"
          setTimeout(() => {
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
          }, 1000)
          break
        case "about":
          response = "> Loading developer profile... ✓"
          setTimeout(() => {
            document.getElementById("about").scrollIntoView({ behavior: "smooth" })
          }, 1000)
          break
        case "home":
          response = "> Navigating to home... ✓"
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }, 1000)
          break
        case "help":
          response = "> Available commands: run projects, show skills, about, contact, home, clear"
          break
        case "clear":
          commandHistory.innerHTML = ""
          this.value = ""
          return
        default:
          response = `> Command '${command}' not found. Type 'help' for available commands.`
      }

      const commandLine = document.createElement("div")
      commandLine.className = "terminal-line"
      commandLine.style.color = "#22d3ee"
      commandLine.style.opacity = "0"
      commandLine.textContent = `$ ${this.value}`
      commandHistory.appendChild(commandLine)

      const responseLine = document.createElement("div")
      responseLine.className = "terminal-line"
      responseLine.style.color = "#4ade80"
      responseLine.style.opacity = "0"
      responseLine.textContent = response
      commandHistory.appendChild(responseLine)


      setTimeout(() => {
        commandLine.style.opacity = "1"
        commandLine.style.transition = "opacity 0.3s ease"
      }, 100)
      
      setTimeout(() => {
        responseLine.style.opacity = "1"
        responseLine.style.transition = "opacity 0.3s ease"
      }, 300)

      this.value = ""
    
      commandHistory.scrollTop = commandHistory.scrollHeight
    }
  })
}

function initializeProjects() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {

      filterBtns.forEach((b) => b.classList.remove("active"))
   
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectCards.forEach((card, index) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden")
          card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`
        } else {
          card.style.animation = "fadeOut 0.3s ease"
          setTimeout(() => {
            card.classList.add("hidden")
          }, 300)
        }
      })
    })
  })
}


function initializeContactForm() {
  const formInputs = contactForm.querySelectorAll('input, textarea')
  
 
  formInputs.forEach(input => {
    input.addEventListener('blur', validateField)
    input.addEventListener('input', clearErrors)
  })

  function validateField(e) {
    const field = e.target
    const value = field.value.trim()
    
  
    field.classList.remove('error')
    
    if (field.hasAttribute('required') && !value) {
      field.classList.add('error')
      return false
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        field.classList.add('error')
        return false
      }
    }
    
    return true
  }
  
  function clearErrors(e) {
    e.target.classList.remove('error')
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    let isValid = true
    formInputs.forEach(input => {
      if (!validateField({ target: input })) {
        isValid = false
      }
    })

    if (!isValid) {
   
      contactForm.style.animation = 'shake 0.5s ease'
      setTimeout(() => {
        contactForm.style.animation = ''
      }, 500)
      return
    }

    isSubmitting = true
    submitBtn.disabled = true

  
    submitBtn.innerHTML = `
      <div style="width: 20px; height: 20px; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <span>Sending...</span>
    `

   
    await new Promise((resolve) => setTimeout(resolve, 2000))

  
    submitBtn.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>200 OK</span>
    `

    // Show response message
    responseMessage.className = "response-message success"
    responseMessage.innerHTML = `
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem;">
        <div>HTTP/1.1 200 OK</div>
        <div>Content-Type: application/json</div>
        <div style="margin-top: 0.5rem;">{ "status": "Message sent successfully!" }</div>
      </div>
    `

    // Reset form after 3 seconds
    setTimeout(() => {
      contactForm.reset()
      submitBtn.disabled = false
      submitBtn.innerHTML = `
        <i class="fas fa-paper-plane"></i>
        <span>POST Request</span>
      `
      responseMessage.style.display = "none"
      isSubmitting = false
    }, 3000)
  })
}
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards"
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  
  const animatedElements = document.querySelectorAll(
    ".skill-category, .project-card, .education-item, .achievement-item, .code-block, .contact-card"
  )
  animatedElements.forEach((el) => observer.observe(el))

  const heroSection = document.querySelector('.hero-section')
  if (heroSection && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.3
      heroSection.style.transform = `translateY(${parallax}px)`
    })
  }
}

// Enhanced back to top functionality
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Enhanced background effects
function createBackgroundEffects() {
  createFloatingSymbols()
  createCodeSnippets()
  createMouseParticles()
  createGridAnimation()
}

function createFloatingSymbols() {
  const symbols = ["{", "}", "<", ">", "(", ")", "[", "]", ";", ":", "=", "+", "=>", "&&", "||"]
  const container = document.querySelector(".floating-symbols")

  symbols.forEach((symbol, index) => {
    const element = document.createElement("div")
    element.className = "floating-symbol"
    element.textContent = symbol
    element.style.left = `${10 + ((index * 8) % 80)}%`
    element.style.top = `${20 + ((index * 15) % 60)}%`
    element.style.animationDelay = `${index * 0.5}s`
    element.style.fontSize = `${1.5 + Math.random() * 1}rem`
    container.appendChild(element)
  })
}

function createCodeSnippets() {
  const snippets = [
    "const", "function", "return", "import", "export", "class", "async", "await",
    "if", "else", "for", "while", "try", "catch", "let", "var", "=>", "null"
  ]
  const container = document.querySelector(".code-snippets")

  snippets.forEach((snippet, index) => {
    const element = document.createElement("div")
    element.className = "code-snippet"
    element.textContent = snippet
    element.style.left = `${(index * 12) % 90}%`
    element.style.top = `${(index * 8) % 80}%`
    element.style.animationDelay = `${index * 0.3}s`
    element.style.fontSize = `${0.7 + Math.random() * 0.3}rem`
    container.appendChild(element)
  })
}

function createMouseParticles() {
  const container = document.querySelector(".mouse-particles")
  const particles = []

  //  particle elements
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = `${4 + Math.random() * 8}px`
    particle.style.height = particle.style.width
    particle.style.background = `rgba(${34 + Math.random() * 100}, ${197 + Math.random() * 50}, ${94 + Math.random() * 100}, ${0.3 + Math.random() * 0.4})`
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.transition = "all 0.3s ease"
    particle.style.zIndex = "-1"
    container.appendChild(particle)
    particles.push(particle)
  }

  // Enhanced mouse move handler
  let mouseX = 0, mouseY = 0
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    
    particles.forEach((particle, index) => {
      const delay = index * 50
      setTimeout(() => {
        const x = mouseX - 4 + Math.sin(Date.now() * 0.001 + index) * 30
        const y = mouseY - 4 + Math.cos(Date.now() * 0.001 + index) * 30
        particle.style.left = `${x}px`
        particle.style.top = `${y}px`
        particle.style.opacity = '0.8'
      }, delay)
    })
  })

  // Hide particles when mouse leaves window
  document.addEventListener("mouseleave", () => {
    particles.forEach(particle => {
      particle.style.opacity = '0'
    })
  })
}

function createGridAnimation() {
  const gridPattern = document.querySelector('.grid-pattern')
  if (gridPattern) {
    let opacity = 0.05
    let increasing = true
    
    setInterval(() => {
      if (increasing) {
        opacity += 0.001
        if (opacity >= 0.1) increasing = false
      } else {
        opacity -= 0.001
        if (opacity <= 0.02) increasing = true
      }
      gridPattern.style.opacity = opacity
    }, 100)
  }
}


function initializeAnimations() {

  const heroContent = document.querySelector(".hero-content")
  const terminal = document.querySelector(".terminal")

  if (heroContent) {
    heroContent.style.animation = "fadeInUp 0.8s ease"
  }

  if (terminal) {
    terminal.style.animation = "fadeInScale 0.8s ease 0.5s both"
  }
  const skillItems = document.querySelectorAll('.skill-item')
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      })
    }
  })
})

window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)

  const images = document.querySelectorAll('img')
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1'
    }
  })
})

let resizeTimeout
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768 && isMenuOpen) {
      mobileNav.classList.remove("active")
      menuIcon.className = "fas fa-bars"
      isMenuOpen = false
      document.body.style.overflow = 'auto'
    }

    const animatedElements = document.querySelectorAll('.animate-in')
    animatedElements.forEach(el => {
      el.style.animation = 'none'
      el.offsetHeight 
      el.style.animation = null
    })
  }, 250)
})

document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.02)"
    this.style.boxShadow = "0 8px 25px rgba(34, 197, 94, 0.2)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
    this.style.boxShadow = "none"
  })
})

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    if (window.innerWidth > 768) { 
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
  })
})

console.log(
  `
%c🚀 Welcome to My Enhanced Portfolio! 
%c
Built with HTML, CSS, and JavaScript
Fully responsive across all devices
Enhanced contact section with professional info
Feel free to explore the code!

Available terminal commands:
- help
- run projects  
- show skills
- about
- contact
- home
- clear

%c💻 Happy coding!
`,
  "color: #22d3ee; font-size: 16px; font-weight: bold;",
  "color: #4ade80; font-size: 12px;",
  "color: #a855f7; font-size: 14px; font-weight: bold;",
)
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0]
      console.log(`%cPage loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`, 'color: #4ade80;')
    }, 0)
  })
}
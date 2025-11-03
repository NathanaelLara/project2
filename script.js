// TalentoLocal - Main JavaScript

// Configuration
const CONFIG = {
  // Update this with your actual endpoint
  FORM_ENDPOINT: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',
  SITE_NAME: 'TalentoLocal',
  WHATSAPP_NUMBER: '18492773472'
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setCurrentYear();
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  initFormHandling();
  initFAQ();
  initAnalytics();
  initLazyLoading();
  initServiceWorker();
}

// Register service worker for PWA functionality
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateNotification();
              }
            });
          });
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
}

function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #0f172a;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    display: flex;
    gap: 16px;
    align-items: center;
    max-width: 90%;
  `;
  
  notification.innerHTML = `
    <span>Nueva versión disponible</span>
    <button onclick="location.reload()" style="
      background: white;
      color: #0f172a;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    ">Actualizar</button>
  `;
  
  document.body.appendChild(notification);
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const menuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      menuButton.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      const isExpanded = menuButton.classList.contains('active');
      menuButton.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Form handling and validation
function initFormHandling() {
  const form = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMsg = document.getElementById('formMsg');
  
  if (!form || !submitBtn || !formMsg) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate form
    if (!validateForm(form)) {
      return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
    formMsg.classList.remove('hidden');
    formMsg.textContent = 'Procesando tu aplicación...';
    formMsg.className = 'text-sm text-slate-600';
    
    // Prepare form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Add metadata
    data._source = window.location.hostname;
    data._timestamp = new Date().toISOString();
    data._userAgent = navigator.userAgent;
    data._referrer = document.referrer || 'Direct';
    
    try {
      const response = await fetch(CONFIG.FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Since we're using no-cors, we can't read the response
      // Assume success if no error is thrown
      showSuccess();
      form.reset();
      
      // Track conversion
      trackEvent('form_submission', {
        form_name: 'lead_form',
        nivel_ingles: data.ingles,
        experiencia: data.experiencia
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      showError('Hubo un error al enviar tu aplicación. Por favor intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar aplicación';
    }
  });
}

// Form validation
function validateForm(form) {
  let isValid = true;
  
  // Validate nombre (at least 2 words)
  const nombre = form.querySelector('[name="nombre"]');
  if (nombre && nombre.value.trim().split(' ').length < 2) {
    showFieldError(nombre, 'Por favor ingresa tu nombre completo');
    isValid = false;
  }
  
  // Validate WhatsApp (Dominican phone format)
  const whatsapp = form.querySelector('[name="whatsapp"]');
  if (whatsapp) {
    const phoneRegex = /^(\+?1)?[\s\-]?\(?(809|829|849)\)?[\s\-]?\d{3}[\s\-]?\d{4}$/;
    if (!phoneRegex.test(whatsapp.value.replace(/\s/g, ''))) {
      showFieldError(whatsapp, 'Ingresa un número de WhatsApp válido (809/829/849-XXX-XXXX)');
      isValid = false;
    }
  }
  
  // Validate email if provided
  const email = form.querySelector('[name="email"]');
  if (email && email.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showFieldError(email, 'Ingresa un correo electrónico válido');
      isValid = false;
    }
  }
  
  // Validate consent checkbox
  const consent = form.querySelector('#consent');
  if (consent && !consent.checked) {
    showFieldError(consent, 'Debes aceptar los términos para continuar');
    isValid = false;
  }
  
  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('border-red-500');
  
  let errorDiv = field.parentElement.querySelector('.form-error');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    field.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

function clearFormErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.remove());
  document.querySelectorAll('.border-red-500').forEach(el => {
    el.classList.remove('border-red-500');
  });
}

function showSuccess() {
  const formMsg = document.getElementById('formMsg');
  formMsg.textContent = '¡Aplicación recibida con éxito! Te contactaremos por WhatsApp en 24-48 horas hábiles.';
  formMsg.className = 'text-sm text-emerald-700 font-semibold';
  
  // Scroll to message
  formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
  const formMsg = document.getElementById('formMsg');
  formMsg.textContent = message;
  formMsg.className = 'text-sm text-red-600 font-semibold';
}

// FAQ accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

// Google Analytics initialization and tracking
function initAnalytics() {
  if (!CONFIG.GOOGLE_ANALYTICS_ID || CONFIG.GOOGLE_ANALYTICS_ID === 'G-XXXXXXXXXX') {
    console.log('Google Analytics not configured');
    return;
  }
  
  // Load Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', CONFIG.GOOGLE_ANALYTICS_ID);
  
  // Track CTA clicks
  document.querySelectorAll('a[href="#formulario"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('cta_click', {
        cta_location: this.closest('section')?.id || 'unknown',
        cta_text: this.textContent.trim()
      });
    });
  });
}

function trackEvent(eventName, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params);
  }
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other scripts if needed
window.TalentoLocal = {
  trackEvent,
  CONFIG
};


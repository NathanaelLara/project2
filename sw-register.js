// Service Worker Registration Script
// Add this to your main script.js or include separately

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available, show update prompt
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    
    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
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
    animation: slideUp 0.3s ease-out;
  `;
  
  notification.innerHTML = `
    <span>Nueva versión disponible</span>
    <button onclick="updateServiceWorker()" style="
      background: white;
      color: #0f172a;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    ">Actualizar</button>
    <button onclick="this.parentElement.remove()" style="
      background: transparent;
      color: white;
      border: 1px solid white;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
    ">Después</button>
  `;
  
  document.body.appendChild(notification);
}

function updateServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
}

// CSS animation for notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);


(function() {
  // Widget Configuration - EDIT THESE VALUES
  const WIDGET_CONFIG = {
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23E5E7EB'/%3E%3Ccircle cx='20' cy='17' r='7' fill='%239CA3AF'/%3E%3Cpath d='M32 35.5c0-6.904-5.596-12.5-12.5-12.5S7 28.596 7 35.5V40h25v-4.5z' fill='%239CA3AF'/%3E%3C/svg%3E",
    name: "Support",
    greeting: "Вітаю Вас на своєму сайті!👋 \n Є питання або побажання?",
    contacts: {
      phone: "0637566136",      // Your phone number
      telegram: "+380637566136",  // Your Telegram username
      viber: "+380637566136",     // Your Viber number
      whatsapp: "+380637566136",   // Your WhatsApp number
      email: "contact@pro-ersag-ukraine.com" // Your email
    }
  };

  // Create styles
  const style = document.createElement('style');
  style.textContent = `
    .phone-widget-container * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    .phone-widget-btn {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 64px;
      height: 64px;
      background-color: #3b82f6;
      color: white;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }

    .phone-widget-btn:hover {
      background-color: #2563eb;
    }

    .phone-widget-notification {
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background-color: #ef4444;
      border-radius: 50%;
    }

    .phone-widget-ring {
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid #3b82f6;
      animation: phoneWidgetRing 2s infinite;
      opacity: 0;
    }

    @keyframes phoneWidgetRing {
      0% { transform: scale(0.8); opacity: 0.8; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .phone-widget-modal {
      position: fixed;
      bottom: 110px;
      right: 32px;
      width: 320px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 999999;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s, transform 0.3s;
      display: none;
    }

    .phone-widget-modal.active {
      opacity: 1;
      transform: translateY(0);
      display: block;
    }

    .phone-widget-header {
      padding: 16px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .phone-widget-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .phone-widget-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .phone-widget-name {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .phone-widget-status {
      color: #22c55e;
      font-size: 14px;
    }

    .phone-widget-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      font-size: 20px;
      padding: 4px;
    }

    .phone-widget-message {
      padding: 16px;
    }

    .phone-widget-bubble {
      background: #f1f5f9;
      padding: 12px;
      border-radius: 12px;
    }

    .phone-widget-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      padding: 16px;
    }

    .phone-widget-contact-btn {
      padding: 12px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      color: white;
      font-weight: 500;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .phone-widget-contact-btn:hover {
      opacity: 0.9;
    }

    .phone-widget-contact-btn.telegram { background: #0088cc; }
    .phone-widget-contact-btn.viber { background: #665CAC; }
    .phone-widget-contact-btn.whatsapp { background: #25D366; }
    .phone-widget-contact-btn.email { background: #3b82f6; }
    .phone-widget-contact-btn.phone { 
      background: #22c55e;
      grid-column: span 2;
    }

    @media (max-width: 768px) {
      .phone-widget-modal {
        width: calc(100% - 32px);
        right: 16px;
        left: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create widget HTML
  const widgetHtml = `
    <div class="phone-widget-container">
      <button class="phone-widget-btn">
        <div class="phone-widget-ring"></div>
        <div class="phone-widget-notification"></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </button>
      <div class="phone-widget-modal">
        <div class="phone-widget-header">
          <div class="phone-widget-profile">
            <img src="${WIDGET_CONFIG.avatar}" alt="Support" class="phone-widget-avatar">
            <div>
              <div class="phone-widget-name">${WIDGET_CONFIG.name}</div>
              <div class="phone-widget-status">Online</div>
            </div>
          </div>
          <button class="phone-widget-close">✕</button>
        </div>
        <div class="phone-widget-message">
          <div class="phone-widget-bubble">${WIDGET_CONFIG.greeting}</div>
        </div>
        <div class="phone-widget-buttons">
          <button class="phone-widget-contact-btn telegram" data-type="telegram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.665,3.717l-17.73,6.837c-1.21,0.486-1.203,1.161-0.222,1.462l4.552,1.42l10.532-6.645c0.498-0.303,0.953-0.14,0.579,0.192l-8.533,7.701l-0.332,4.99c0.322,0,0.464-0.147,0.646-0.322l1.549-1.502l4.571,3.373c0.832,0.459,1.431,0.222,1.639-0.773l3.179-15.01C21.273,3.847,20.665,3.717,20.665,3.717z"/>
            </svg>
            Telegram
          </button>
          <button class="phone-widget-contact-btn viber" data-type="viber">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,0C5.383,0,0,5.383,0,12c0,6.617,5.383,12,12,12s12-5.383,12-12C24,5.383,18.617,0,12,0z M12.908,16.615 c-0.422,0.422-0.908,0.795-1.442,1.102c-0.536,0.308-1.118,0.539-1.731,0.687c-0.612,0.148-1.253,0.222-1.918,0.222 c-0.666,0-1.308-0.074-1.92-0.222c-0.613-0.148-1.195-0.379-1.73-0.687c-0.535-0.307-1.02-0.68-1.442-1.102 c-0.422-0.422-0.795-0.908-1.102-1.442c-0.308-0.536-0.539-1.118-0.687-1.731c-0.148-0.612-0.222-1.253-0.222-1.918 c0-0.666,0.074-1.308,0.222-1.92c0.148-0.613,0.379-1.195,0.687-1.73c0.307-0.535,0.68-1.02,1.102-1.442 c0.422-0.422,0.908-0.795,1.442-1.102c0.536-0.308,1.118-0.539,1.731-0.687c0.612-0.148,1.253-0.222,1.918-0.222 c0.666,0,1.308,0.074,1.92,0.222c0.613,0.148,1.195,0.379,1.73,0.687c0.535,0.307,1.02,0.68,1.442,1.102 c0.422,0.422,0.795,0.908,1.102,1.442c0.308,0.536,0.539,1.118,0.687,1.731c0.148,0.612,0.222,1.253,0.222,1.918 c0,0.666-0.074,1.308-0.222,1.92c-0.148,0.613-0.379,1.195-0.687,1.73C13.703,15.707,13.33,16.193,12.908,16.615z"/>
            </svg>
            Viber
          </button>
          <button class="phone-widget-contact-btn whatsapp" data-type="whatsapp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.4,3.6C18.2,1.3,15.2,0,12,0C5.4,0,0,5.4,0,12c0,2.1,0.5,4.2,1.6,6l-1.7,6.2l6.3-1.7c1.8,1,3.8,1.5,5.8,1.5 c6.6,0,12-5.4,12-12C24,8.8,22.7,5.8,20.4,3.6z M12,22c-1.8,0-3.5-0.5-5.1-1.4l-0.4-0.2l-3.7,1l1-3.7l-0.2-0.4 C2.5,15.5,2,13.8,2,12c0-5.5,4.5-10,10-10s10,4.5,10,10S17.5,22,12,22z M16.8,14.5c-0.3-0.1-1.7-0.8-1.9-0.9 c-0.3-0.1-0.5-0.1-0.7,0.1c-0.2,0.3-0.8,0.9-0.9,1.1c-0.2,0.2-0.3,0.2-0.6,0.1c-0.3-0.1-1.2-0.4-2.3-1.4c-0.9-0.8-1.4-1.7-1.6-2 c-0.2-0.3,0-0.4,0.1-0.6c0.1-0.1,0.3-0.3,0.4-0.5c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0-0.4,0-0.5c0-0.1-0.7-1.7-1-2.3 c-0.3-0.6-0.5-0.5-0.7-0.5c-0.2,0-0.4,0-0.6,0c-0.2,0-0.5,0.1-0.8,0.3c-0.3,0.3-1,1-1,2.4c0,1.4,1,2.8,1.2,3 c0.1,0.2,2,3.1,4.9,4.3c0.7,0.3,1.2,0.5,1.6,0.6c0.7,0.2,1.3,0.2,1.8,0.1c0.6-0.1,1.7-0.7,1.9-1.3c0.2-0.7,0.2-1.2,0.2-1.3 C17.3,14.7,17.1,14.6,16.8,14.5z"/>
            </svg>
            WhatsApp
          </button>
          <button class="phone-widget-contact-btn email" data-type="email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
            </svg>
            Email
          </button>
          <button class="phone-widget-contact-btn phone" data-type="phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            Call
          </button>
        </div>
      </div>
    </div>
  `;

  // Add widget to page
  const widgetContainer = document.createElement('div');
  widgetContainer.innerHTML = widgetHtml;
  document.body.appendChild(widgetContainer);

  // Get elements
  const modal = document.querySelector('.phone-widget-modal');
  const toggleBtn = document.querySelector('.phone-widget-btn');
  const closeBtn = document.querySelector('.phone-widget-close');
  const contactBtns = document.querySelectorAll('.phone-widget-contact-btn');

  // Toggle modal
  function toggleModal() {
    modal.classList.toggle('active');
  }

  // Handle contact button clicks
  function handleContactClick(type) {
    const { contacts } = WIDGET_CONFIG;
    switch (type) {
      case 'phone':
        window.location.href = `tel:${contacts.phone}`;
        break;
      case 'telegram':
        window.location.href = `https://t.me/${contacts.telegram}`;
        break;
      case 'viber':
        window.location.href = `viber://chat?number=${contacts.viber}`;
        break;
      case 'whatsapp':
        window.location.href = `https://wa.me/${contacts.whatsapp}`;
        break;
      case 'email':
        window.location.href = `mailto:${contacts.email}`;
        break;
    }
  }

  // Add ring animation
  function addRing() {
    const ring = document.createElement('div');
    ring.className = 'phone-widget-ring';
    toggleBtn.appendChild(ring);
    
    ring.addEventListener('animationend', () => {
      ring.remove();
    });
  }

  // Event listeners
  toggleBtn.addEventListener('click', toggleModal);
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleModal();
  });

  contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      handleContactClick(btn.dataset.type);
    });
  });

  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.phone-widget-container')) {
      modal.classList.remove('active');
    }
  });

  // Start ring animation
  setInterval(addRing, 3000);
})();

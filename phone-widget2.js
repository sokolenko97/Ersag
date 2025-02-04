(function() {
  // Widget Configuration - EDIT THESE VALUES
  const WIDGET_CONFIG = {
    avatar: "https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/23484da5-3937-4bd5-8ead-aac15551110f/%D0%BB%D0%BE%D0%B3%D0%BE.png",
    name: "Поліна",
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
      width: 55px;
      height: 55px;
      border-radius: 50%;
      border: 1px solid #3b82f6;
      animation: phoneWidgetRing 2s infinite;
      opacity: 0;
    }

    @keyframes phoneWidgetRing {
      // 0% { transform: scale(0.8); opacity: 0.8; }
      // 100% { transform: scale(1.4); opacity: 0; }
      0% {
        transform: scale(1);
        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      100% {
        transform: scale(1.2);
        opacity: 0;
      }
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
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 16px;
    }

    .phone-widget-contact-btn {
      width: 75px;
      height: 48px;
      padding: 0;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      color: white;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .phone-widget-contact-btn svg {
      width: 24px;
      height: 24px;
    }

    .phone-widget-contact-btn:hover {
      opacity: 0.9;
    }

    .phone-widget-contact-btn.telegram { background: #0088cc; }
    .phone-widget-contact-btn.viber { background: #665CAC; }
    .phone-widget-contact-btn.email { background: #3b82f6; }
    .phone-widget-contact-btn.phone { background: #22c55e; }

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
          <button class="phone-widget-contact-btn phone" data-type="phone" title="Call">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </button>
          <button class="phone-widget-contact-btn telegram" data-type="telegram" title="Telegram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M27.157 3.015c.435-.036.905-.022 1.291.207.345.2.545.599.552.99-.014.333-.039.664-.069.995-.143 1.68-.432 3.343-.66 5.013-.058.45-.13.896-.198 1.345a471.01 471.01 0 0 1-1.06 6.559c-.396 2.345-.796 4.69-1.198 7.035-.117.67-.576 1.254-1.175 1.566-.658.354-1.503.382-2.15-.01-3.144-2.128-6.31-4.225-9.423-6.398a1.377 1.377 0 0 1-.477-1.014c-.01-.372.116-.734.289-1.06.246-.455.598-.845.993-1.177 1.486-1.457 3.057-2.823 4.586-4.234a51.178 51.178 0 0 0 2.907-2.865c.154-.141.2-.356.235-.553.021-.12-.016-.282-.156-.305-.25-.03-.483.1-.705.198-.59.304-1.141.679-1.685 1.06-1.089.753-2.17 1.519-3.254 2.278-2.234 1.559-4.484 3.102-6.855 4.448-.655.335-1.405.456-2.136.412-.937-.051-1.845-.312-2.736-.593-.444-.142-.895-.265-1.325-.448-.75-.307-1.529-.562-2.22-.99-.22-.15-.464-.33-.522-.605-.047-.301.204-.541.428-.7.543-.307 1.099-.59 1.655-.873 1.955-.974 3.956-1.852 5.958-2.725.782-.34 1.558-.691 2.345-1.017 2.527-1.058 5.054-2.118 7.594-3.146a380.85 380.85 0 0 1 7.156-2.828c.647-.261 1.312-.507 2.015-.565Z"></path>
          </button>
          <button class="phone-widget-contact-btn viber" data-type="viber" title="Viber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M30.541 16.4c1.303.27 2.301.751 3.154 1.527 1.097 1.007 1.699 2.225 1.963 3.977.18 1.142.106 1.59-.31 1.962-.39.346-1.11.36-1.547.031-.317-.23-.416-.474-.49-1.135-.085-.878-.243-1.495-.515-2.065-.581-1.21-1.607-1.84-3.338-2.046-.813-.096-1.057-.186-1.322-.487-.482-.559-.296-1.463.37-1.796.251-.123.357-.135.913-.103.343.02.851.078 1.122.136Zm-1.548-5.541c4.072.6 7.224 2.505 9.29 5.598 1.161 1.742 1.885 3.787 2.134 5.982.086.804.086 2.267-.007 2.512-.088.228-.369.539-.611.668-.261.136-.818.122-1.126-.04-.516-.264-.672-.682-.672-1.816 0-1.748-.45-3.592-1.227-5.024a10.234 10.234 0 0 0-3.742-3.924c-1.348-.811-3.34-1.411-5.158-1.56-.658-.053-1.02-.188-1.269-.48a1.237 1.237 0 0 1-.1-1.526c.35-.546.886-.633 2.488-.39ZM13.27 6.98c.238.08.603.264.813.396 1.286.832 4.87 5.298 6.044 7.527.67 1.274.894 2.217.685 2.917-.217.752-.575 1.15-2.181 2.409-.644.508-1.247 1.03-1.343 1.168-.243.342-.44 1.016-.44 1.491.007 1.101.74 3.1 1.7 4.638.745 1.194 2.08 2.725 3.402 3.9 1.552 1.385 2.92 2.328 4.465 3.074 1.985.963 3.198 1.207 4.084.805a3.17 3.17 0 0 0 .535-.29c.068-.06.59-.68 1.159-1.365 1.098-1.347 1.347-1.563 2.1-1.816.957-.317 1.932-.23 2.914.258.746.376 2.372 1.358 3.42 2.07 1.383.943 4.337 3.293 4.737 3.761.704.844.826 1.926.353 3.121-.502 1.26-2.452 3.623-3.814 4.632-1.232.91-2.108 1.26-3.26 1.313-.948.046-1.342-.033-2.553-.522-9.51-3.82-17.106-9.52-23.136-17.352-3.15-4.09-5.55-8.332-7.188-12.734-.956-2.565-1.004-3.682-.217-4.994.339-.554 1.78-1.926 2.831-2.692 1.748-1.266 2.554-1.735 3.198-1.866.44-.093 1.205-.02 1.692.151Zm15.415-.832c2.373.282 4.29.827 6.392 1.81 2.07.967 3.393 1.88 5.146 3.545 1.642 1.572 2.55 2.763 3.517 4.61 1.345 2.578 2.11 5.644 2.242 9.017.048 1.15.014 1.408-.262 1.737-.523.637-1.676.532-2.069-.183-.125-.237-.158-.44-.2-1.362-.069-1.413-.172-2.328-.378-3.42-.815-4.283-2.966-7.702-6.4-10.156-2.863-2.053-5.821-3.052-9.696-3.27-1.311-.073-1.538-.119-1.835-.335-.551-.414-.58-1.388-.048-1.842.324-.282.552-.323 1.676-.289.584.02 1.445.085 1.915.138Z"></path>
          </button>
          <button class="phone-widget-contact-btn email" data-type="email" title="Email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
            </svg>
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

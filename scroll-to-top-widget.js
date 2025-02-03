(function() {
  // Create style element
  const style = document.createElement('style');
  style.textContent = `
    .scroll-to-top-widget {
      position: fixed;
      bottom: 32px;
      left: 32px;
      padding: 16px;
      background-color: rgba(255, 255, 255, 0.9);
      color: #333;
      border-radius: 9999px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 9999;
      display: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .scroll-to-top-widget:hover {
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1.1);
    }

    .scroll-to-top-widget:active {
      transform: scale(0.9);
    }

    .scroll-to-top-widget svg {
      width: 20px;
      height: 20px;
      display: block;
      stroke: #333;
    }
  `;
  document.head.appendChild(style);

  // Create button element
  const button = document.createElement('button');
  button.className = 'scroll-to-top-widget';
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  `;
  document.body.appendChild(button);

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Show/hide button based on scroll position
  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }

  // Add event listeners
  button.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', toggleVisibility);
})();

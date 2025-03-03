(function() {
  // Create style element
  const style = document.createElement('style');
  style.textContent = `
    .scroll-to-top-widget {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      transition: transform 0.3s ease;
      z-index: 9999;
      display: none;
    }

    .scroll-to-top-widget:hover {
      transform: scale(1.1);
    }

    .scroll-to-top-widget:active {
      transform: scale(0.9);
    }

    .scroll-to-top-widget svg {
      width: 20px;
      height: 20px;
      display: block;
      stroke: white;
      fill: none;
      stroke-width: 2;
    }
  `;
  document.head.appendChild(style);

  // Create button element
  const button = document.createElement('button');
  button.className = 'scroll-to-top-widget';
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
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

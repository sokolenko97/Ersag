!function(){let t=document.createElement("style");t.textContent=`
    .scroll-to-top-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
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
  `,document.head.appendChild(t);let e=document.createElement("button");e.className="scroll-to-top-widget",e.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  `,document.body.appendChild(e),e.addEventListener("click",function t(){window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",function t(){window.pageYOffset>300?e.style.display="block":e.style.display="none"})}();

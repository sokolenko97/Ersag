document.addEventListener("DOMContentLoaded",function(){if(document.getElementById("preloader"))return;let e=document.createElement("div");e.id="preloader",Object.assign(e.style,{position:"fixed",width:"100%",height:"100vh",backgroundColor:"black",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"10000",top:"0",left:"0"});let t=document.createElement("img");t.src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=298,fit=crop,q=95/mk3qWGnZMVUJMN9E/logo-YrDqgnG2MPTB1aWa.png",t.id="logo",Object.assign(t.style,{width:"300px",animation:"fadeInOut 2s ease-in-out infinite"}),e.appendChild(t),document.body.appendChild(e);let n=document.createElement("style");n.innerHTML=`
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: scale(0.9); }
                50% { opacity: 1; transform: scale(1); }
            }
        `,document.head.appendChild(n),window.addEventListener("load",function(){setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.5s ease",setTimeout(()=>{e.remove()},500)},1e3)})});

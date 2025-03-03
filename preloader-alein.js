document.addEventListener("DOMContentLoaded", function () {
    // Create Preloader
    let preloader = document.createElement("div");
    preloader.id = "preloader";
    preloader.style.position = "fixed";
    preloader.style.width = "100%";
    preloader.style.height = "100vh";
    preloader.style.backgroundColor = "black";
    preloader.style.display = "flex";
    preloader.style.justifyContent = "center";
    preloader.style.alignItems = "center";
    preloader.style.zIndex = "1000";

    // Create Logo
    let logo = document.createElement("img");
    logo.src = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=298,fit=crop,q=95/mk3qWGnZMVUJMN9E/logo-YrDqgnG2MPTB1aWa.png"; // Change this to your logo path
    logo.id = "logo";
    logo.style.width = "100px"; // Adjust logo size
    logo.style.filter = "invert(1)"; // Make logo white
    logo.style.animation = "fadeInOut 2s ease-in-out infinite";

    // Append Logo to Preloader
    preloader.appendChild(logo);
    document.body.appendChild(preloader);

    // Create and Append Styles Dynamically
    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Hide Preloader After Page Load
    window.addEventListener("load", function () {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.transition = "opacity 0.5s ease";

            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 2000); // Preloader duration (2s)
    });
});

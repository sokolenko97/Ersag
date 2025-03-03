(function () {
    // Ensure the script runs after the page is loaded
    document.addEventListener("DOMContentLoaded", function () {
        // Check if preloader already exists to prevent duplicates
        if (document.getElementById("preloader")) return;

        // Create Preloader
        let preloader = document.createElement("div");
        preloader.id = "preloader";
        Object.assign(preloader.style, {
            position: "fixed",
            width: "100%",
            height: "100vh",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "10000", // Higher z-index to stay on top
            top: "0",
            left: "0",
        });

        // Create Logo
        let logo = document.createElement("img");
        logo.src = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=298,fit=crop,q=95/mk3qWGnZMVUJMN9E/logo-YrDqgnG2MPTB1aWa.png"; // Use full URL if required
        logo.id = "logo";
        Object.assign(logo.style, {
            width: "300px", // Adjust as needed
            animation: "fadeInOut 2s ease-in-out infinite",
        });

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
})();

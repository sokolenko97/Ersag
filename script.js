// Disable context menu (right-click)
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

// Disable copy action
document.addEventListener("copy", (event) => {
  event.preventDefault();
});

// Disable cut action
document.addEventListener("cut", (event) => {
  event.preventDefault();
});

window.addEventListener("load", function () {
  // Execute code only after the page and its resources are fully loaded
  // setTimeout(function() {

  const apiUrl =
    "https://api-ecommerce.zyro.com/store/store_01HW8RT3XXCQ1MM8AF42T8QGP5/products";

  // window.localStorage.getItem("shopping-cart-items");

  // Fetch products from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      // Assign the products to a constant
      const productsData = products.products;
      // You can call your function here that uses productsData

      function checkProductList() {
        const productImgLoadCheck = document.querySelector(
          ".product-list-item__image"
        );
        if (productImgLoadCheck) {
          let productSibling = document.querySelectorAll(
            ".product-list-item__title"
          );
          createElementForNextSibling(productSibling, productsData);
          
          clearInterval(checkProductListInterval);
        }
      }

      let checkProductListInterval = setInterval(checkProductList, 1);

      function createElementForNextSibling(elementsArray, productsArray) {
        elementsArray.forEach((element) => {
          const elementTitle = element.innerText;

          // Check if productsArray is an array
          if (Array.isArray(productsArray)) {
            const matchingProduct = productsArray.find(
              (product) => product.title === elementTitle
            );

            if (matchingProduct) {
              const subtitle = matchingProduct.subtitle;
              const newElement = document.createElement("p");
              newElement.innerText = subtitle;
              newElement.className = "product-subtitle";

              // Insert the new element as the next sibling
              element.after(newElement);
            }
          } else {
            console.error("productsArray is not an array.");
          }
        });
      }

      // Now you can use the productsData constant to work with the products
      // Check if the .product-list-item__price-wrapper element has been loaded

      let dropDownArrow = document.querySelector(
        ".block-header-item__mobile-dropdown-trigger"
      );
      dropDownArrow.setAttribute("checked", "");
      dropDownArrow.setAttribute("disabled", "");

      let productsMenuButton = document.querySelector('[href="/tovari"]');
      productsMenuButton.removeAttribute("href");


      // Moving Product HTML elements

      function moveProductPageHTMLBlocks() {
        const previewBlockClass = document.querySelector(
          ".block-product--in-preview"
        );
        if (previewBlockClass === null) {
          const productDetailsElement = document.querySelector(
            ".block-product__price-data-wrapper"
          );
          const productBuyButton = document.querySelector(
            ".block-product__button-wrapper"
          );
          
          productDetailsElement.append(productBuyButton);

          let productImageContainer = document.querySelector(
            ".product-carousel__image-wrapper--contain"
          );

          productImageContainer.parentElement.append(productDetailsElement);
        }
      }

      function addImagetoTitle(url, innerText, h2Number) {
        const producDescriptionParagraph = document.querySelectorAll(
          ".block-product__description > h2"
        );
        const productHistoryImgCont = document.createElement("div");
        const productHistoryImg = document.createElement("img");
        productHistoryImg.setAttribute("src", url);

        const h2El = producDescriptionParagraph[h2Number];

        if (h2El?.innerText.includes(innerText)) {
          h2El.prepend(productHistoryImgCont);
          productHistoryImgCont.append(productHistoryImg);
          h2El.className = "subtitle";
        }
      }

      function productCheck() {
        const productLoadCheck = document.querySelector(
          ".block-product__description > h2"
        );
        const shampooProductCheck = document.querySelector(
          ".block-product__description > h3"
        );

        const productBtn = document.querySelector(
          ".block-product__button--primary"
        );
        if (productLoadCheck?.innerText === "Історія") {
          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nnnd3-4nnn-cropped-m7VpwbLZWNCKgeJQ.svg",
            "Історія",
            0
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nnd1-4nnd1-2n-d2d-ddegnnd-d2d3-4nnn-mePLvJBXVjc9MMXJ.svg",
            "Хімічні властивості",
            1
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/d-ddegnnd3-4nnd2ddegd1-2d1-2n-dJoJ6bVOwOtKXJB4.svg",
            "застосовують",
            2
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/d-nd3-4nd-d-d3-4doddegd-ddegd1-2d1-2n-YanBzBM97WcZQolZ.svg",
            "Протипоказання",
            4
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nd-d3-4nnd--YKbJ6lpvXDcDa0Gy.svg",
            "Спосіб застосування",
            3
          );
          moveProductPageHTMLBlocks();
          clearInterval(check);
        } else if (shampooProductCheck?.innerText.includes("Властивості")) {
          moveProductPageHTMLBlocks();
          clearInterval(check);
        } else if (productBtn?.innerText) {
          moveProductPageHTMLBlocks();
          clearInterval(check);
        }
      }

      let check = setInterval(productCheck, 1);

      // Preview product - delete More details link

      function changeCloseButtonSize(size='26') {
        const closeButton = document.querySelector('.close-button > svg')
        if (closeButton){
          closeButton.setAttribute('width', size)
          closeButton.setAttribute('height', size)
        }
      }

      function checkProductPreview(mutationRecords) {
        changeCloseButtonSize()
        const previewBlockClass = document.querySelector(
          ".block-product--in-preview");
        const productBuyButton = document.querySelector(
          ".block-product__button-wrapper"
        );
        if (previewBlockClass) {
          const productQuantityWrapperDiv = document.querySelector('.block-product__quantity-wrapper')
          productQuantityWrapperDiv.append(productBuyButton)
        }
      }
        function watchCart(mutationRecords) {
            const checkoutButton = document.querySelector('.cart__checkout-button')
            if (checkoutButton) {
              changeCloseButtonSize()
              checkoutButton.replaceWith(checkoutButton.cloneNode(true))
          }
        }


      const config = {
        childList: true,
        // subtree: true
      }
      const mainTag = document.querySelector('main')
      const productPreviewObserver = new MutationObserver(checkProductPreview)
      productPreviewObserver.observe(mainTag,config)

      const cartElement = document.querySelector('[data-qa="user-section-zyroecommerceshoppingcart"]')
      const cartObserver = new MutationObserver(watchCart)
      cartObserver.observe(cartElement,config)
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // }, 0); // Adjust the delay as needed
});
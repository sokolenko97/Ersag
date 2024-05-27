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
      const productsData = products.products;

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

      function createProductSubtitle(element, matchingProduct) {
        const subtitle = matchingProduct.subtitle;
        const newElement = document.createElement("p");
        newElement.innerText = subtitle;
        newElement.className = "product-subtitle";

        // Insert the new element as the next sibling
        element.after(newElement);
      }

      function createElementForNextSibling(elementsArray, productsArray) {
        elementsArray.forEach((element) => {
          const elementTitle = element.innerText.trim();

          // Check if productsArray is an array
          if (Array.isArray(productsArray)) {
            let matchingProduct = productsArray.find(
              (product) => product.title.trim() === elementTitle
            );

            if (matchingProduct) {
              createProductSubtitle(element, matchingProduct);
            } else {
              const astraIslandEl = document.querySelector(
                '[props^="{\\"page-data"]'
              );
              const astraIslandElPropsString =
                astraIslandEl.getAttribute("props");
              const astraIslandElPropsObj = JSON.parse(
                astraIslandElPropsString
              );
              const astraIslandPagesObj =
                astraIslandElPropsObj["page-data"][1].pages[1];

              let productID;

              Object.keys(astraIslandPagesObj).forEach((key) => {
                if (astraIslandPagesObj[key][1].name) {
                  if (
                    astraIslandPagesObj[key][1].name[1].trim() === elementTitle
                  ) {
                    if (astraIslandPagesObj[key][1].productId) {
                      productID = astraIslandPagesObj[key][1].productId[1];
                    }
                  }
                }
              });
              if (productID) {
                matchingProduct = productsArray.find(
                  (product) => product.id === productID
                );
                if (matchingProduct) {
                  createProductSubtitle(element, matchingProduct);
                }
              }
            }
          } else {
            console.error("productsArray is not an array.");
          }
        });
      }

      function addProductSKUandPoints(points, SKU) {
        const additionalInfoDiv = document.querySelector(
          ".block-product__additional-info"
        );
        const pointsElement = document.createElement("p");
        pointsElement.className = "block-product__points";
        additionalInfoDiv.append(pointsElement);
        pointsElement.innerText = `Бали: ${points}`;

        const SKUElement = document.createElement("p");
        SKUElement.className = "block-product__SKU";
        additionalInfoDiv.append(SKUElement);
        SKUElement.innerText = `Артікул: ${SKU}`;
      }

      function matchTheProduct(productsArray) {
        const elementTitle = document.querySelector(".block-product__title");
        if (Array.isArray(productsArray)) {
          const matchingProduct = productsArray.find(
            (product) => product.title.trim() === elementTitle.innerText.trim()
          );

          if (matchingProduct) {
            const productPoints = Number(matchingProduct.ribbon_text);
            const productSKU = matchingProduct.variants[0].sku;
            addProductSKUandPoints(productPoints, productSKU);
          }
        }
      }

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
        matchTheProduct(productsData);
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
        const astraIslandEl = document.querySelector(
          '[props^="{\\"page-data"]'
        );
        if (productLoadCheck?.innerText === "Історія") {
          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/history-YX4Pe2vBN2cOqKr3.svg",
            "Історія",
            0
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/chemical-ALpJy83Ql2HX3alJ.svg",
            "Хімічні властивості",
            1
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/usage-AwvrgOxBGPtz46yv.svg",
            "застосовують",
            2
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/contraindications-YbNa7bQPKgT5nJ46.svg",
            "Протипоказання",
            4
          );

          addImagetoTitle(
            "https://assets.zyrosite.com/YbNaeGqzDzTQoObX/how-to-use-m6LvQ8nEeotyXoXe.svg",
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
        } else if (astraIslandEl) {
          const config = {
            childList: true,
            // subtree: true
          };
          const mainTag = document.querySelector("main");
          const productPreviewObserver = new MutationObserver(
            checkProductPreview
          );
          productPreviewObserver.observe(mainTag, config);

          const cartElement = document.querySelector(
            '[data-qa="user-section-zyroecommerceshoppingcart"]'
          );
          const cartObserver = new MutationObserver(watchCart);
          cartObserver.observe(cartElement, config);
        }
      }

      let check = setInterval(productCheck, 1);

      // Preview product - delete More details link

      function changeCloseButtonSize(size = "26") {
        const closeButton = document.querySelector(".close-button > svg");
        if (closeButton) {
          closeButton.setAttribute("width", size);
          closeButton.setAttribute("height", size);
        }
      }

      function checkProductPreview(mutationRecords) {
        changeCloseButtonSize();
        const previewBlockClass = document.querySelector(
          ".block-product--in-preview"
        );
        const productBuyButton = document.querySelector(
          ".block-product__button-wrapper"
        );
        if (previewBlockClass) {
          const productQuantityWrapperDiv = document.querySelector(
            ".block-product__quantity-wrapper"
          );
          productQuantityWrapperDiv.append(productBuyButton);
        }
      }
      function watchCart(mutationRecords) {
        const checkoutButton = document.querySelector(".cart__checkout-button");
        if (checkoutButton) {
          changeCloseButtonSize();
          checkoutButton.replaceWith(checkoutButton.cloneNode(true));
          checkoutButton.addEventListener('click', openCheckputFormPopup)
        }
      }
      function openCheckputFormPopup(e) {
        const modalWrapper = document.createElement('div')
        modalWrapper.setAttribute('data-v-35831679')
        modalWrapper.className = 'modal-wrapper'

        const modalBackgroundEl = document.createElement('div')
        modalBackgroundEl.setAttribute('data-v-35831679')
        modalBackgroundEl.className = 'modal-backdrop'
        modalWrapper.append(modalBackgroundEl)

        const modalEl = document.createElement('div')
        modalEl.setAttribute('data-v-35831679')
        modalEl.setAttribute('style="--modal-background-color: var(--color-light);--padding: 16px;--width: auto;--max-width: unset;--overflow: unset;--height: auto;--mobile-height: auto;"')
        modalEl.className = 'modal'
        modalWrapper.append(modalEl)

        const orderForm = document.querySelector('.layout-element__component--GridForm')
        modalEl.append(orderForm.cloneNode(true))
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // }, 0); // Adjust the delay as needed
});

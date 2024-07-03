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
        let productImgLoadCheck
        // setTimeout(() => {
        productImgLoadCheck = document.querySelector(
          ".product-list-item__image"
        );
        // }, 1000);
        if (productImgLoadCheck) {
          let productSibling = document.querySelectorAll(
            ".product-list-item__title"
          );
          createElementForNextSibling(productSibling, productsData);
          clearInterval(checkProductListInterval);
          setTimeout(() => {
            // addCartToButton(productsData);
          }, 1000);
        }
        // else{
        //   clearInterval(checkProductListInterval)
        // }
      }

      let checkProductListInterval
      setTimeout(() => {
        checkProductListInterval = setInterval(checkProductList, 1);
      }, 1000);


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
        // const pointsElement = document.createElement("p");
        // pointsElement.className = "block-product__points";
        // additionalInfoDiv.append(pointsElement);
        // pointsElement.innerText = `Бали: ${points}`;

        const SKUElement = document.createElement("p");
        SKUElement.className = "block-product__SKU";
        additionalInfoDiv.append(SKUElement);
        SKUElement.innerText = `Артикул: ${SKU}`;
      }

      function matchTheProduct(productsArray) {
        const elementTitle = document.querySelector(".block-product__title");
        if (Array.isArray(productsArray) && elementTitle) {
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

      let productsMenuButton = document.querySelector('[href="/products"]');
      productsMenuButton.removeAttribute("href");

      const stickyBar = document.querySelector('[data-block-id="stickyBar"]')
      const mainTag = document.querySelector('main')

      mainTag.prepend(stickyBar)

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

          if (productDetailsElement) {
            productDetailsElement.append(productBuyButton);
          }

          let productImageContainer = document.querySelector(
            ".product-carousel__image-wrapper--contain"
          );

          if (productImageContainer) {
            productImageContainer.parentElement.append(productDetailsElement);
          }
        }
        matchTheProduct(productsData);
        // addCartToButton(productsData);
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
          moveProductPageHTMLBlocks();
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
          const cartObserver = new MutationObserver((mutationRecords) => {
            changeButtonEvent("click",".cart__checkout-button", openCheckputFormPopup);
          });
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
      function changeButtonEvent(event, selector, clickFunc) {
        const checkoutButton = document.querySelector(selector);
        if (checkoutButton) {
          changeCloseButtonSize();
          const clonedButton = checkoutButton.cloneNode(true);
          // checkoutButton.replaceWith(clonedButton);
          clonedButton.addEventListener(event, clickFunc);
        }
      }
      function openCheckputFormPopup(e) {
        const closeCartButton = document.querySelector(".close-button");
        closeCartButton.click();

        const modalWrapper = document.createElement("div");
        modalWrapper.setAttribute("data-v-35831679", "");
        modalWrapper.className = "modal-wrapper";

        const modalBackgroundEl = document.createElement("div");
        modalBackgroundEl.setAttribute("data-v-35831679", "");
        modalBackgroundEl.className = "modal-backdrop";
        modalWrapper.append(modalBackgroundEl);

        const modalEl = document.createElement("div");
        modalEl.setAttribute("data-v-35831679", "");
        modalEl.setAttribute(
          "style",
          "--modal-background-color: var(--color-light);--padding: 16px;--width: auto;--max-width: unset;--overflow: unset;--height: auto;--mobile-height: auto;"
        );
        modalEl.className = "modal";
        modalWrapper.append(modalEl);

        const orderForm = document.querySelector(
          ".layout-element__component--GridForm"
        );
        const formCopy = orderForm.cloneNode(true);
        modalEl.append(formCopy);
        formCopy.removeAttribute("id");

        const mainTag = document.querySelector("main");
        mainTag.append(modalWrapper);

        const sendOrderBtn = formCopy.firstElementChild.lastElementChild;
        // sendOrderBtn.setAttribute('type','button')
        sendOrderBtn.classList.add("form-button");
        // changeButtonEvent('submit','.form-button', showThankYouPopup);
      }

      function showThankYouPopup(e) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get current URL
        const currentUrl = window.location.href;
        // Check if the URL already has query parameters
        const newUrl = currentUrl.includes("?")
          ? `${currentUrl}&open-modal=EcommerceCheckoutSuccess`
          : `${currentUrl}?open-modal=EcommerceCheckoutSuccess`;

        // Update the form action and submit the form
        this.action = newUrl;
        this.submit(); // Re-submit the form with the new action URL

        // const thanksTitle = document.querySelector('.payment-info__title')
        // thanksTitle.innerText = 'Дякуюмо за Ваше замовлення!'

        // const thanksText = document.querySelector('.payment-info__text')
        // thanksText.innerText = "Ми зв'яжемось з Вами найближчим часом."

        // const thanksButton = document.querySelector('.payment-info__button')
        // thanksButton.innerText = 'Зрозуміло'
      }

      function addCartToButton(productsArray) {
        const mainTag = document.querySelector("main");
        const cloneMain = mainTag.cloneNode(true);
        mainTag.replaceWith(cloneMain);

        let productCards;
        if (cloneMain) {
          productCards = document.querySelectorAll('[class$="button-wrapper"]');
        }
        if (productCards) {
          productCards.forEach((element) => {
            let clonedButtonWrapper = element.cloneNode(true);
            element.replaceWith(clonedButtonWrapper);

            let clonedButton = clonedButtonWrapper?.firstElementChild;

            clonedButton.classList.add("snipcart-add-item");
            // clonedButton.addEventListener('click', function(event) {
            //   event.preventDefault();})

            let productPriceWrapper =
              clonedButtonWrapper?.previousElementSibling?.lastElementChild;
            if (
              productPriceWrapper?.classList.contains(
                "product-list-item__price-wrapper"
              )
            ) {
              let stringToNum = +productPriceWrapper.innerText.replace("₴", "");
              clonedButton.setAttribute("data-item-price", stringToNum);
            }

            let productImageWrapper =
              clonedButtonWrapper?.previousElementSibling?.firstElementChild;
            if (
              productImageWrapper?.classList.contains(
                "product-list-item__image-wrapper"
              )
            ) {
              let productImageURL =
                productImageWrapper.firstElementChild.getAttribute("src");
              clonedButton.setAttribute("data-item-image", productImageURL);
            }

            let productTitle = productImageWrapper?.nextElementSibling;
            if (productTitle?.classList.contains("product-list-item__title")) {
              let productTitleText = productTitle?.innerText?.trim();
              clonedButton.setAttribute("data-item-name", productTitleText);
            }

            let productSubtitle = productTitle?.nextElementSibling;
            if (productSubtitle?.classList.contains("product-subtitle")) {
              let productSubtitleText = productSubtitle.innerText?.trim();
              clonedButton.setAttribute(
                "data-item-description",
                productSubtitleText
              );
            }

            if (Array.isArray(productsArray)) {
              let matchingProduct = productsArray?.find(
                (product) =>
                  product?.title?.trim() === productTitle?.innerText?.trim()
              );
              if (matchingProduct) {
                clonedButton.setAttribute("data-item-id", matchingProduct.id);
              }
            }
          });
        }
      }

      function removeFreeWidget(className) {
       const checkTelegraWidget = setInterval(() => {
          const s = document.querySelector(className);
          if (s?.lastElementChild?.hasAttribute('href')) {
            s.lastElementChild.remove()
            clearInterval(checkTelegraWidget);
          }
          if (s?.firstElementChild?.hasAttribute('href')) {
            s.firstElementChild.remove()
            clearInterval(checkTelegraWidget);
          }
        }, 10);
      }     

      removeFreeWidget('[class^="FloatingWindow__Container"]');
      removeFreeWidget('[class^="Button__Component"]');

    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // }, 0); // Adjust the delay as needed
});

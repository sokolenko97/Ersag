window.addEventListener('load', function() {
  // Execute code only after the page and its resources are fully loaded
// setTimeout(function() {

const apiUrl = 'https://api-ecommerce.zyro.com/store/store_01HW8RT3XXCQ1MM8AF42T8QGP5/products';

// window.localStorage.getItem("shopping-cart-items");

// Fetch products from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    // Assign the products to a constant
    const productsData = products.products;
    // You can call your function here that uses productsData


    function createElementForNextSibling(elementsArray, productsArray) {
      elementsArray.forEach(element => {
        const elementTitle = element.innerText.trim();
        
        // Check if productsArray is an array
        if (Array.isArray(productsArray)) {
          const matchingProduct = productsArray.find(product => 
            product.title === elementTitle);
          
          if (matchingProduct) {
            const subtitle = matchingProduct.subtitle;
            const newElement = document.createElement('div');
            newElement.innerText = subtitle;
            
            // Insert the new element as the next sibling
            element.parentNode.insertBefore(newElement, element.nextElementSibling);
          }
        } else {
          console.error('productsArray is not an array.');
        }
      });
    }
    
  // Now you can use the productsData constant to work with the products
      // Check if the .product-list-item__price-wrapper element has been loaded
  let  productSibling = document.querySelectorAll('.product-list-item__title');

  createElementForNextSibling(productSibling, productsData)

  let dropDownArrow = document.querySelector('.block-header-item__mobile-dropdown-trigger')
  dropDownArrow.setAttribute('checked','')
  dropDownArrow.setAttribute('disabled','')

  let productsMenuButton = document.querySelector('[href="/tovari"]')
  productsMenuButton.removeAttribute('href')

  function moveProductPageHTMLBlocks() {
    console.log("initializeYourCode is running");
    const productDetailsElement = document.querySelector('.block-product__price-data-wrapper');
    console.log("Product Details Element:", productDetailsElement);
    const productBuyButton = document.querySelector('.block-product__button-wrapper');
    console.log("Product Button Element:", productBuyButton);
  
    if (productDetailsElement && productBuyButton) {
        productDetailsElement.append(productBuyButton);
    }
  
    let productImageContainer = document.querySelector('.product-carousel__image-wrapper--contain');
    console.log("Product Image Container:", productImageContainer);
    if (productImageContainer && productImageContainer.parentElement && productDetailsElement) {
        productImageContainer.parentElement.append(productDetailsElement);
    } else {
        console.error("Required elements not found:", { productDetailsElement, productBuyButton, productImageContainer });
    }
  
    console.log('Elements:', { productDetailsElement, productBuyButton, productImageContainer });
  }
  

  function initializeYourCode() {
    console.log("initializeYourCode is running");
    // Check each operation inside
    const productDetailsElement = document.querySelector('.block-product__price-data-wrapper');
    console.log("Product Details Element:", productDetailsElement);
    // Continue with your function
}

  function waitForElementToDisplay(selector, time) {
    if(document.querySelector(selector) != null) {
        console.log(selector + " is now loaded in the DOM");
        observeElement(selector);
    } else {
        setTimeout(function() {
            waitForElementToDisplay(selector, time);
        }, time);
    }
}

function observeElement(selector) {
  const targetNode = document.querySelector(selector);

  if (!targetNode) {
      console.log("Target node not found for observer:", selector);
      return; // Exit if no target node
  }

  const config = { attributes: false, childList: true, subtree: true };
  const callback = function(mutationsList, observer) {
      console.log("Mutations detected:", mutationsList); // Log all mutations
      mutationsList.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              console.log('Child node mutation detected:', mutation);
              moveProductPageHTMLBlocks();
          }
      });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log('MutationObserver has been set up on', selector);
}

// function observeElement(selector) {
//     const targetNode = document.querySelector(selector);

//     const config = { attributes: false, childList: true, subtree: true };
//     // const callback = function(mutationsList, observer) {
//     //     for(let mutation of mutationsList) {
//     //         if (mutation.type === 'childList') {
//     //             console.log('A child node has been added or removed.');
//     //             moveProductPageHTMLBlocks(); // Replace this with your function
//     //             observer.disconnect(); // Optional: disconnect observer after initial load
//     //         }
//     //     }
//     // };
//     const callback = function(mutationsList, observer) {
//       console.log("Mutations observed:", mutationsList); // Log all mutations to see what's happening
//       mutationsList.forEach(mutation => {
//           if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//               console.log('Child nodes added:', mutation.addedNodes);
//               moveProductPageHTMLBlocks(); // Call your function here
//           }
//       });
//   };

//     const observer = new MutationObserver(callback);
//     observer.observe(targetNode, config);
//     console.log('MutationObserver has been set up on ' + selector);
// }

// Usage
    waitForElementToDisplay(".block-product__description", 100); // Adjust selector and check interval

// Moving Product HTML elements
  
// function moveProductPageHTMLBlocks() {
//     const productDetailsElement = document.querySelector('.block-product__price-data-wrapper')
//     const productBuyButton = document.querySelector('.block-product__button-wrapper')
  
//     productDetailsElement.append(productBuyButton)
  
//     let productImageContainer = document.querySelector('.product-carousel__image-wrapper--contain')
  
//     productImageContainer.parentElement.append(productDetailsElement)
//     console.log(productDetailsElement,productBuyButton,productImageContainer);
    
// }


})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});

// }, 400); // Adjust the delay as needed
});

//// First

// window.addEventListener('load', function() {
//   // Execute code only after the page and its resources are fully loaded
// setTimeout(function() {
  
//   const apiUrl = 'https://api-ecommerce.zyro.com/store/store_01HW8RT3XXCQ1MM8AF42T8QGP5/products';

// // Fetch products from the API
// fetch(apiUrl)
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(products => {
//   // Assign the products to a constant
//   const productsData = products;
  
//   // Now you can use the productsData constant to work with the products
//       // Check if the .product-list-item__price-wrapper element has been loaded
//   let  productParent = document.querySelector('.product-list-item__price-wrapper');
//   if (productParent) {
//       // The element exists, so execute the code
//       let subtitle = document.createElement('p');
//       subtitle.innerHTML = productsData.products[6].subtitle;
//       productParent.prepend (subtitle);
//       console.log(productParent[0]);
//   } else {
//       // The element does not exist
//       console.log('.product-list-item__price-wrapper element not found');
//   }
// })
// .catch(error => {
//   console.error('There was a problem with the fetch operation:', error);
// });

// }, 1000); // Adjust the delay as needed
// });









// window.addEventListener('load', function() {
//     // Execute code only after the page and its resources are fully loaded
// setTimeout(function() {
    
//   const apiUrl = 'https://api-ecommerce.zyro.com/store/store_01HW8RT3XXCQ1MM8AF42T8QGP5/products';

//   // Fetch products from the API
//   fetch(apiUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(products => {
//       // Assign the products to a constant
//       const productsData = products.products;
//       console.log(productsData); // This will log the productsData inside the callback
//       // You can call your function here that uses productsData


//       function createElementForNextSibling(elementsArray, productsArray) {
//         elementsArray.forEach(element => {
//           const elementTitle = element.innerText.trim();
          
//           // Check if productsArray is an array
//           if (Array.isArray(productsArray)) {
//             const matchingProduct = productsArray.find(product => {
//               const found = product.title === elementTitle;
//               console.log(`Product ${elementTitle} ${found ? 'found' : 'not found'}`);
//               return found;
//             });
            
//             if (matchingProduct) {
//               const subtitle = matchingProduct.subtitle;
//               const newElement = document.createElement('div');
//               newElement.innerText = subtitle;
              
//               // Insert the new element as the next sibling
//               element.parentNode.insertBefore(newElement, element.nextElementSibling);
//             }
//           } else {
//             console.error('productsArray is not an array.');
//           }
//         });
//       }
      
//     // Now you can use the productsData constant to work with the products
//         // Check if the .product-list-item__price-wrapper element has been loaded
//         console.log(productsData);
//     let  productSibling = document.querySelectorAll('.product-list-item__title');
//     console.log(productSibling);

//     createElementForNextSibling(productSibling, productsData)
//     // if (productParent) {
//     //     // The element exists, so execute the code
//     //     let subtitle = document.createElement('p');
//     //     subtitle.innerHTML = productsData.products[6].subtitle;
//     //     productParent.prepend (subtitle);
//     //     console.log(productParent[0]);
//     // } else {
//     //     // The element does not exist
//     //     console.log('.product-list-item__price-wrapper element not found');
//     // }
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });

// }, 1000); // Adjust the delay as needed
// });
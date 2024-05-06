window.addEventListener('load', function() {
  // Execute code only after the page and its resources are fully loaded
setTimeout(function() {

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

  const productLoadCheck = document.querySelector('.product-carousel > .block-product__price-data-wrapper')

 
  
// // Usage
//     waitForElementToDisplay(".block-product__description", 100); // Adjust selector and check interval

// Moving Product HTML elements
  
function moveProductPageHTMLBlocks() {
    const productDetailsElement = document.querySelector('.block-product__price-data-wrapper')
    const productBuyButton = document.querySelector('.block-product__button-wrapper')
  
    productDetailsElement.append(productBuyButton)
  
    let productImageContainer = document.querySelector('.product-carousel__image-wrapper--contain')
  
    productImageContainer.parentElement.append(productDetailsElement)

// Add history section image

    // const producDescriptionParagraph = document.querySelector('.block-product__description')
    // const productHistoryImg = document.createElement('img')
    // productHistoryImg.setAttribute('src', 'https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nnnd3-4nnn-YleM5M6ykpIZnZML.svg')

    // const historyH2El = producDescriptionParagraph.firstElementChild

    // if (historyH2El.innerText === 'Історія'){
    //   historyH2El.prepend(productHistoryImg)
    //   historyH2El.className = 'history-title'
    // }
}

function addImagetoTitle(url, innerText,h2Number) {
  const producDescriptionParagraph = document.querySelectorAll('.block-product__description > h2')
  const productHistoryImg = document.createElement('img')
  productHistoryImg.setAttribute('src', url)

  const h2El = producDescriptionParagraph[h2Number]

  if (h2El.innerText.includes(innerText)){
    h2El.prepend(productHistoryImg)
    h2El.className = 'subtitle'
  }
}

if (productLoadCheck === null){
  moveProductPageHTMLBlocks()

  addImagetoTitle(
    'https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nnnd3-4nnn-YleM5M6ykpIZnZML.svg',
    'Історія',
    0
  )

  addImagetoTitle(
    'https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nnd1-4nnd1-2n-d2d-ddegnnd-d2d3-4nnn-A1aKrKQJw6HELKn3.svg',
    'Хімічні властивості',
    1
  )

  addImagetoTitle(
    'https://assets.zyrosite.com/YbNaeGqzDzTQoObX/d-ddegnnd3-4nnd2ddegd1-2d1-2n-ALpJbJOoeaU3lQoa.svg',
    'застосовують',
    2
  )

  addImagetoTitle(
    'https://assets.zyrosite.com/YbNaeGqzDzTQoObX/d-nd3-4nd-d-d3-4doddegd-ddegd1-2d1-2n-YanBzBM97WcZQolZ.svg',
    'Протипоказання',
    3
  )

  addImagetoTitle(
    'https://assets.zyrosite.com/YbNaeGqzDzTQoObX/nd-d3-4nnd--A85prpZ4qzhM3yxX.svg',
    'Спосіб застосування',
    4
  )

}

})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});

}, 1000); // Adjust the delay as needed
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
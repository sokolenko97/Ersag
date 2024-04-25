
window.addEventListener('load', function() {
    // Execute code only after the page and its resources are fully loaded
setTimeout(function() {
    
    const apiUrl = 'https://api-ecommerce.zyro.com/store/store_01HW8RT3XXCQ1MM8AF42T8QGP5/products';

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
    const productsData = products;
    
    // Now you can use the productsData constant to work with the products
        // Check if the .product-list-item__price-wrapper element has been loaded
    let  productParent = document.querySelector('.product-list-item__price-wrapper');
    if (productParent) {
        // The element exists, so execute the code
        let subtitle = document.createElement('p');
        subtitle.innerHTML = productsData.products[6].subtitle;
        productParent.prepend (subtitle);
        console.log(productParent[0]);
    } else {
        // The element does not exist
        console.log('.product-list-item__price-wrapper element not found');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

}, 1000); // Adjust the delay as needed
});


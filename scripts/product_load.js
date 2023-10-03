import products from "./products.js";

let showProduct = ''

let myCart = JSON.parse(localStorage.getItem('myCart')) || [];


products.map((product)=>{


    return showProduct += 
        `
        <li>
        <div class="product-card">

          <figure class="card-banner">

            <a href="../pages/product_details.html?id=${product.id}">
              <img src="${product.img}" alt="${product.title}" loading="lazy" width="800"
                height="1034" class="w-100">
            </a>

            <div class="${ (product.badge == "") ? '' : 'card-badge'} ${product.badge}"> ${product.badgeText}</div>

            <a href="../pages/product_details.html?id=${product.id}">
            <div class="card-actions">

            <!-- <button class="card-action-btn" aria-label="Quick view">
                <ion-icon name="eye-outline"></ion-icon>
            </button> -->


              <button class="card-action-btn cart-btn">
                <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>

                <p>Add to Cart</p>
              </button>


              <!-- <button class="card-action-btn" aria-label="Add to Whishlist">
                <ion-icon name="heart-outline"></ion-icon>
              </button> -->

            </div>
            </a>

          </figure>

          <div class="card-content">
            <h3 class="h4 card-title">
              <a href="#">${product.title}</a>
            </h3>

            <div class="card-price">
              <data value="${product.price}">৳${product.price}</data>

              <data value="${product.previousPrice}">${product.previousPrice}</data>
            </div>
          </div>

        </div>
      </li>`
});

let productList = document.getElementById('productlist');
productList.innerHTML = showProduct;
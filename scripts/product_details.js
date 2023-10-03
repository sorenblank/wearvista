import products from '../scripts/products.js';

const mysearch = window.location.search;

const urlParams = new URLSearchParams(mysearch);

const id = urlParams.get('id');

const product = products.find(object => object.id == id);

let myCart = JSON.parse(localStorage.getItem('myCart')) || [];


// const checkItem = myCart.some(item => item.proId == product.id ) ? `<button class="btn-added" disabled>Added to Cart</button>` : `<button id="adding-to-cart" type="submit" class="btn-add-cart btn-primary">Add to Cart</button>`
const checkItem = `<button id="adding-to-cart" type="submit" class="btn-add-cart btn-primary">Add to Cart</button>`

let productDetails = `
<section class="details">

<div class="details-container">

    <div class="col-pro">
        <img src="${product.img}" width="100%" id="ProductImg">
        <!-- <div class="small-img-row">
            <div class="small-img-col">
                <img src="../assets/products/f1.jpg" width="100%" class="small-img">
            </div>
            <div class="small-img-col">
                <img src="../assets/products/f2.jpg" width="100%" class="small-img">
            </div>
            <div class="small-img-col">
                <img src="../assets/products/f3.jpg" width="100%" class="small-img">
            </div>
            <div class="small-img-col">
                <img src="../assets/products/f3.jpg" width="100%" class="small-img">
            </div>
        </div> -->
    </div>

    <div class="col-pro">
        <h1 class="product-title">${product.title}</h1>
        <h2>৳${product.price}</h2>
        <form>

            <div class="options">

                <select id="size-select" class="size-select" required>
                    <option disabled selected value>Select Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <input id="qty" class="qty" type="number" placeholder="Quantity" value="1" autocomplete="off" min="1" max="100">

            </div>
            ${checkItem}
        </form>

        <h3 class="product-subtitle">Product Details</h3>
        <p>${product.details}</p>
    </div>

</div>  
</section>
`

const getContext = document.getElementById('product-details');
getContext.innerHTML = productDetails;

const button = document.getElementById('adding-to-cart');
const snackbar = document.getElementById('snackbar');

if (button){
    button.addEventListener('click', (event) => {
        event.preventDefault();
    
        // console.log("added to cart");
        const size = document.getElementById('size-select');
        const quantity = document.getElementById('qty');
        
        if (size.value === "" ) {
            button.style.backgroundColor = 'var(--candy-pink)';
            button.innerHTML = 'Select a size!';
            setTimeout(() => {
                button.style.backgroundColor = 'var(--background, var(--eerie-black))';
                button.innerHTML = 'Add to Cart';
            }, 1500);
        } else {

                // Assume itemExists is initially set to false
                let itemExists = false;

                // Iterate through the myCart array
                for (const item of myCart) {
                    if (item.proId === parseInt(product.id) && item.size === size.value) {
                        // If an item with the same proId and size exists, set itemExists to true
                        itemExists = true;
                        break; // No need to continue checking, we found a match
                    }
                }

                if (itemExists) {
                    // Item already exists in the cart
                    button.style.backgroundColor = 'var(--candy-pink)';
                    button.innerHTML = 'Size exists!';
                    setTimeout(() => {
                        size.value = "Select a size";
                        button.style.backgroundColor = 'var(--background, var(--eerie-black))';
                        button.innerHTML = 'Add to Cart';
                    }, 1500);
                } else {

                    const cartProduct = {
                        proId: parseInt(product.id),
                        quantity: parseInt(quantity.value),
                        size: size.value
                    }
                    myCart.push(cartProduct);
                    localStorage.setItem('myCart', JSON.stringify(myCart));
                    localStorage.setItem("appliedVoucher", "false")
                    button.style.backgroundColor = `var(--ocean-green)`;
                    button.innerHTML = 'Added to Cart';
                    setTimeout(() => {
                        button.style.backgroundColor = 'var(--background, var(--eerie-black))';
                        button.innerHTML = 'Add More';
                    }, 3000);


                };
        }
    });
};
import products from '../scripts/products.js';
const cartItemsJSON = localStorage.getItem("myCart");

const cartItems = JSON.parse(cartItemsJSON) || [];

const matchedProducts = [];


for (const cartItem of cartItems) {
  let productId = cartItem.proId;
  let quantity = cartItem.quantity;
  let size = cartItem.size;

  const product = products.find((product) => product.id == productId);

  if (product) {
    let newProduct = {...product};
    newProduct.quantity = quantity;
    newProduct.size = size;
    matchedProducts.push(newProduct);
  }
};

let content = '';
let productData = '';
let total = 0;
// let subTotal = parseFloat(localStorage.getItem("subTotal")) || 0;
// let appliedVoucher = localStorage.getItem("appliedVoucher") || "false";



if (matchedProducts.length > 0) {

  matchedProducts.forEach((product, index) => {
    total += parseFloat(product.price * product.quantity);
    content += `
    <li class="cart-detail">
        <div class="left-detail">
            <div class="small-img-col">
                <img src="${product.img}" width="70px" class="small-img" alt="${product.title}">
            </div>
            <div>
                <h3>${product.title}</h3>
                <p>Size: ${product.size}</p>
                <button class="btn-remove" data-index="${index}">Remove</button> <!-- Add data-index attribute -->
            </div>
        </div>
        <div class="right-detail">
            <p>৳${product.price}x${product.quantity}</p>
        </div>
    </li>`;

    productData += `<input type="text" name="product ${index+1}" value="${product.title} | Size:${product.size}, Quantity: ${product.quantity} price: ${product.price}\n" checked>`;
  });

  let totalContent = `
  <hr>
  <div class="total">
      <p>Total: </p>
      <p>৳${total}</p>
  </div>
  `
  document.getElementById("order-summary").innerHTML += totalContent;

  
  document.getElementById("hidden-product-data").innerHTML += productData;
  document.getElementById("total-price").value = total;


  document.getElementById("place-order").disabled = false;
  document.getElementById("place-order").style.backgroundColor = "hsl(148, 45%, 58%)";
  document.getElementById("place-order").innerHTML = "Place Order";
  
} else{
  content = `<p class="empty-cart" style="font-size: 20px; text-align:center;">Your Cart is Empty</p>`;
}


document.getElementById("cart-list").innerHTML = content;
// document.getElementById("order-summary").innerHTML += totalContent;

// Add event listener for Remove buttons
const removeButtons = document.querySelectorAll('.btn-remove');

removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const indexToRemove = event.target.getAttribute('data-index');
        
        if (indexToRemove !== null) {
            // Remove the product from matchedProducts array
            matchedProducts.splice(indexToRemove, 1);
            console.log(matchedProducts);

            // Update localStorage with the modified matchedProducts array
            const myCart = matchedProducts.map((product) => ({
              proId: product.id,
              quantity: product.quantity,
              size: product.size
            }));

            localStorage.setItem('myCart', JSON.stringify(myCart));

            // Update the HTML content to reflect the removal

            const cartList = document.getElementById("cart-list");
            cartList.removeChild(cartList.children[indexToRemove]);

            const hiddenProductData = document.getElementById("hidden-product-data");
            hiddenProductData.removeChild(hiddenProductData.children[indexToRemove]);
            
            location.reload();


            // You may also want to update other relevant data in localStorage here
        }
    });
});


// function submitted(){
//   if (matchedProducts.length > 0) {
//     localStorage.clear("myCart");
//   }
// }


// Add Event listener for submit button

document.getElementById("place-order").addEventListener("click", (event)=>{
    // event.preventDefault();
    if (matchedProducts.length > 0) {

      localStorage.clear("myCart");

      
    }
});



// if (appliedVoucher == "false"){
//     subTotal = (total + shipping_charge).toFixed(2);
//     localStorage.setItem("subTotal", subTotal);
// }


// document.getElementById('apply-button').addEventListener("click", (event)=>{
//     event.preventDefault();
//     const voucherCode = document.querySelector('.voucher-input').value;
//     if (voucherCode == "abir"){
//         subTotal = (total + shipping_charge).toFixed(2);
//         subTotal -= total * 0.1;
//         localStorage.setItem("subTotal", parseFloat(subTotal));
//         localStorage.setItem("appliedVoucher", "true")
//         alert("Voucher Added! You got 10% discount");
//         location.reload()
//     }else {
//         alert("Voucher code dosen't exist")
//     }
    

// })

// document.getElementById("clearAll").addEventListener("click", (event)=>{
//   event.preventDefault();
//   localStorage.clear("myCart");
//   localStorage.clear("appliedVoucher");
//   localStorage.clear("subTotal");
//   location.reload();
// });


// document.getElementById("total").innerText = total.toFixed(2);

// document.getElementById("shipping-charge").innerText = shipping_charge.toFixed(2);
// document.getElementById("sub-total").innerText = subTotal;
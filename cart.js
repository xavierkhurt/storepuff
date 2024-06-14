let openCart = document.querySelector('.shopping');
let closeCart = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

    openCart.addEventListener('click', () => {
        body.classList.add('active');
    });
    closeCart.addEventListener('click', () => {
        body.classList.remove('active');
    });

    document.addEventListener('DOMContentLoaded', function () {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const cartItems = document.querySelector('.cart-items');
        const quantity = document.querySelector('.quantity');
        const totalElement = document.querySelector('.total');
        let total = 0;
        let cartData = {}; // Object to store cart data
    
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const item = this.parentNode;
                const image = item.querySelector('img').cloneNode(); // Clone the product image
                const name = item.querySelector('h3').textContent; // Get the product name
                let price = parseFloat(item.dataset.price); // Get the product price as a float
                let productId = item.dataset.target; // Get the product ID
    
                // Check if the product is already in the cart
                if (cartData[productId]) {
                    // Increment the quantity and update the total
                    cartData[productId].quantity++;
                    cartData[productId].total += price;
                } else {
                    // Add the product to the cart data
                    cartData[productId] = {
                        name: name,
                        price: price,
                        quantity: 1,
                        total: price,
                        image: image
                    };
                }
    
                // Update the cart display
                updateCartDisplay();
    
                let currentQuantity = parseInt(quantity.textContent);
                quantity.textContent = currentQuantity + 1;
            });
        });
    
        // Function to update the cart display
        function updateCartDisplay() {
            // Clear the cart items display
            cartItems.innerHTML = '';
    
            // Update the cart items and total
            total = 0;
            for (let productId in cartData) {
                const cartItem = document.createElement('li');
                cartItem.appendChild(cartData[productId].image); // Append the image to the cart item
                cartItem.appendChild(document.createTextNode(cartData[productId].name + ' x ' + cartData[productId].quantity)); // Append the product name and quantity to the cart item
    
                // Add remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.classList.add('remove');
                removeButton.dataset.productId = productId;
                removeButton.addEventListener('click', function () {
                    let productId = this.dataset.productId;
                    cartData[productId].quantity--;
                    cartData[productId].total -= cartData[productId].price;
                    if (cartData[productId].quantity === 0) {
                        delete cartData[productId];
                    }
                    updateCartDisplay();
    
                    let currentQuantity = parseInt(quantity.textContent);
                    quantity.textContent = currentQuantity - 1;
                });
                cartItem.appendChild(removeButton);
    
                total += cartData[productId].total;
                cartItems.appendChild(cartItem); // Append the cart item to the cart
            }
    
            // Update the total element
            totalElement.textContent = total.toFixed(2);
        }
    });

    //checkout
    document.addEventListener('DOMContentLoaded', function () {
        const paymentSelect = document.getElementById('payment');
        const cardDetails = document.getElementById('card-details');
        const mobileDetails = document.getElementById('mobile-details');
    
        paymentSelect.addEventListener('change', function () {
            if (paymentSelect.value === 'card') {
                cardDetails.classList.add('show');
                mobileDetails.classList.remove('show');
            } else if (paymentSelect.value === 'gcash') {
                cardDetails.classList.remove('show');
                mobileDetails.classList.add('show');
            } else {
                cardDetails.classList.remove('show');
                mobileDetails.classList.remove('show');
            }
        });
    });

    //checkout hover
    document.addEventListener('DOMContentLoaded', function () {
        const checkoutButton = document.querySelector('.checkout');
        const closeCheckoutButton = document.querySelector('.closeShopping');
        const checkoutForm = document.querySelector('.checkout-form');
        const confirmButton = document.getElementById('confirm');
        const orderCompleteMessage = document.querySelector('.order-complete');
    
        checkoutButton.addEventListener('click', function () {
            checkoutForm.classList.add('show');
        });
    
        closeCheckoutButton.addEventListener('click', function () {
            checkoutForm.classList.remove('show');
        });
    
        confirmButton.addEventListener('click', function () {
            orderCompleteMessage.classList.add('show');
        });
    });

    closeBtn.addEventListener('click', () => {
        checkoutForm.classList.add('hidden');
    });
    
    
    
    
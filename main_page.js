document.addEventListener('DOMContentLoaded', function () {
    const flavorButtons = document.querySelectorAll('.flavor-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const previewContainer = document.querySelector('.product-preview');
    const previewBox = document.querySelectorAll('.preview');
    const shoppingCartIcon = document.querySelector('.fa-cart-shopping');
    const cartCard = document.querySelector('.cart-card');
    const openCart = document.querySelector('.fa-cart-shopping');
    const closeCart = document.querySelector('.closeShopping');
    const body = document.body;
    const checkoutButton = document.querySelector('.checkout');
    const closeCheckoutButton = document.querySelector('.fa-times');
    const checkoutContainer = document.querySelector('.checkout-container');
    const confirmButton = document.getElementById('confirm');
    const orderCompleteMessage = document.querySelector('.order-complete');
    const closeIcons = document.querySelectorAll('.checkout-container .fa-times');
    const buyButtons = document.querySelectorAll('.buyBtn');
    let selectedFlavor = '';

    openCart.addEventListener('click', () => {
        body.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        body.classList.remove('active');
    });

    // Product Preview
    document.querySelectorAll('.filterable_cards .card').forEach(product => {
        product.addEventListener('click', () => {
            previewContainer.style.display = 'flex';
            let name = product.getAttribute('name');
            previewBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if (name === target) {
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        });
    });

    previewBox.forEach(preview => {
        preview.querySelector('.fa-times').addEventListener('click', () => {
            preview.classList.remove('active');
            previewContainer.style.display = 'none';
        });
    });

    // Add event listeners to flavor buttons
    flavorButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove 'selected' class from all flavor buttons
            flavorButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            this.classList.add('selected');

            // Set the selected flavor
            selectedFlavor = this.getAttribute('data-flavor');
        });
    });

    // Add event listeners to "ADD TO CART" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const preview = this.closest('.preview');
            const productName = preview.querySelector('h3').innerText;
            const productPrice = parseFloat(preview.querySelector('.card_price').innerText.replace('₱', ''));
            const productImgSrc = preview.querySelector('img').src;

            if (selectedFlavor === '') {
                alert('Please select a flavor');
                return;
            }

            // Append the flavor to the product name
            const productNameWithFlavor = `${productName} (${selectedFlavor})`;

            // Check if the item already exists in the cart
            const existingCartItem = Array.from(cartItems.querySelectorAll('.cart-item')).find(item => {
                const itemName = item.querySelector('span').innerText;
                return itemName === productNameWithFlavor;
            });

            if (existingCartItem) {
                // Update the quantity of the existing item
                const quantityInput = existingCartItem.querySelector('.item-quantity');
                quantityInput.value = parseInt(quantityInput.value) + 1;
            } else {
                // Create a new cart item
                const cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${productImgSrc}" alt="">
                    <span>${productNameWithFlavor}</span>
                    <input type="number" class="item-quantity" value="1" min="1">
                    <span class="item-price">₱${productPrice.toFixed(2)}</span>
                    <button class="remove-from-cart">Remove</button>
                `;

                // Add the cart item to the cart
                cartItems.appendChild(cartItem);

                // Add event listener to the remove button of the new cart item
                cartItem.querySelector('.remove-from-cart').addEventListener('click', function () {
                    cartItem.remove();
                    updateCartDisplay();
                    calculateTotal();
                });

                // Add event listener to the quantity input field of the new cart item
                cartItem.querySelector('.item-quantity').addEventListener('input', function () {
                    calculateTotal();
                });
            }

            // Update the cart counter and total price
            updateCartDisplay();
            calculateTotal();

            // Clear the selected flavor
            selectedFlavor = '';
            flavorButtons.forEach(btn => btn.classList.remove('selected'));
        });
    });

    const paymentSelect = document.getElementById('payment');
    const cardDetails = document.getElementById('card-details');
    const mobileDetails = document.getElementById('mobile-details');

    paymentSelect.addEventListener('change', function () {
        if (paymentSelect.value === 'card') {
            cardDetails.style.display = 'block';
            mobileDetails.style.display = 'none';
        } else if (paymentSelect.value === 'gcash') {
            cardDetails.style.display = 'none';
            mobileDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
            mobileDetails.style.display = 'none';
        }
    });

    // Shopping Cart
    shoppingCartIcon.addEventListener('mouseover', () => {
        cartCard.classList.add('active');
    });

    shoppingCartIcon.addEventListener('mouseleave', () => {
        cartCard.classList.remove('active');
    });

    closeCart.addEventListener('click', () => {
        cartCard.classList.remove('active');
    });

    // Function to update the cart display
    function updateCartDisplay() {
        const count = cartItems.querySelectorAll('li').length;
        document.querySelector('.shopping span').innerText = count;
    }

    checkoutButton.addEventListener('click', function () {
        checkoutContainer.classList.add('show');
    });

    closeCheckoutButton.addEventListener('click', function () {
        checkoutContainer.classList.remove('show');
    });

    closeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            checkoutContainer.classList.remove('show');
        });
    });

    confirmButton.addEventListener('click', function () {
        orderCompleteMessage.classList.add('show');
    });

    buyButtons.addEventListener('click', () => {
        checkoutContainer.classList.add('active')
    });

    // Add event listeners to "BUY" buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', function () {
            checkoutContainer.classList.add('show');
        });
    });

    // Function to calculate the total price of items in the cart
    function calculateTotal() {
        // Get all cart items
        const cartItems = document.querySelectorAll('.cart-item');

        // Initialize total price to 0
        let total = 0;

        // Loop through each cart item
        cartItems.forEach(item => {
            // Get the price of the item and parse it to a number
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('₱', ''));
            // Get the quantity of the item and parse it to a number
            const quantity = parseInt(item.querySelector('.item-quantity').value, 10);
            // Add the price to the total, multiplied by the quantity
            total += price * quantity;
        });

        // Update the total price in the cart
        document.querySelector('.total').textContent = total.toFixed(2);
    }

    // Call calculateTotal initially to set the total if there are already items in the cart
    calculateTotal();
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.button_filter button');
    const productCards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const brandName = this.getAttribute('data-name');

            // Remove 'active' class from all buttons and add to the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show or hide product cards based on the selected brand
            productCards.forEach(card => {
                if (brandName === 'all' || card.getAttribute('data-name') === brandName) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Default to showing all products
    document.querySelector('button[name="all"]').addEventListener('click', function () {
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    });

    // Initially trigger the click event on the "Show All" button to display all products
    document.querySelector('button[name="all"]').click();
});

document.addEventListener("DOMContentLoaded", function() {
    const logoutIcon = document.getElementById("logoutIcon");

    logoutIcon.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the confirm button and the order complete message element
    const confirmButton = document.getElementById('confirmOrder');
    const orderCompleteMessage = document.getElementById('orderCompleteMessage');

    // Add click event listener to the confirm button
    confirmButton.addEventListener('click', function() {
        // Display the order complete message
        alert('Order Complete!'); 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buyBtn');
    const checkoutContainer = document.querySelector('.checkout-container');
    const closeCheckoutButton = document.querySelector('.fa-times');
    

    // Add click event listeners to all BUY buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show the checkout container
            checkoutContainer.style.display = 'block';
        });
        closeCheckoutButton.addEventListener('click', function () {
            checkoutContainer.style.display = 'none';
        });
    });
});
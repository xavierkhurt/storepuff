// Product Preview
const previewContainer = document.querySelector('.product-preview');
const previewBox = document.querySelectorAll('.preview');

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

// Load products from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromLocalStorage();
    setupFilterButtons();
});

// Function to load products from localStorage
function loadProductsFromLocalStorage() {
    const products = Object.keys(localStorage).filter(key => key.startsWith('product_'));
    products.forEach(productId => {
        const productData = JSON.parse(localStorage.getItem(productId));
        if (productData) {
            addProductToPage(productData);
        }
    });
}

// Function to set up filter buttons
function setupFilterButtons() {
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
}

// Add Product Modal Toggle
const addProductBtn = document.getElementById('add');
const addProductModal = document.getElementById('addproduct');
const closeModalBtn = document.getElementById('close');

addProductBtn.addEventListener('click', () => {
    addProductModal.classList.toggle('active');
});

closeModalBtn.addEventListener('click', () => {
    addProductModal.classList.remove('active');
});

// Add, Edit, Delete Product
document.getElementById('product-add').addEventListener('click', function(event) {
    event.preventDefault();

    // Get the input values
    const productName = document.querySelector('.product-input[name="product-name"]').value;
    const productPrice = document.querySelector('.product-input[name="product-price"]').value;
    const productInfo = document.querySelector('.product-input[name="product-info"]').value;
    const productImage = document.querySelector('.box').files[0];

    if (!productName || !productPrice || !productInfo || !productImage) {
        alert('Please fill in all the fields and select an image.');
        return;
    }

    // Create a unique ID for the product
    const productId = 'product_' + Date.now();

    // Create the product data object
    const productData = {
        id: productId,
        name: productName,
        price: productPrice,
        info: productInfo,
        image: URL.createObjectURL(productImage)
    };

    // Add the product to the page and localStorage
    addProductToPage(productData);
    localStorage.setItem(productId, JSON.stringify(productData));

    // Close the add product modal
    addProductModal.classList.remove('active');
});

// Function to add a product to the page
function addProductToPage(productData) {
    // Create a new card element
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('name', productData.id);
    newCard.setAttribute('data-name', productData.name);

    const img = document.createElement('img');
    img.src = productData.image;
    img.alt = productData.name;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card_body');

    const cardTitle = document.createElement('h6');
    cardTitle.classList.add('card_title');
    cardTitle.textContent = productData.name;

    const cardPrice = document.createElement('h5');
    cardPrice.classList.add('card_price');
    cardPrice.textContent = `₱${productData.price}`;

    const cardText = document.createElement('p');
    cardText.classList.add('card_text');
    cardText.textContent = productData.info;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardText);

    newCard.appendChild(img);
    newCard.appendChild(cardBody);

    // Add the new card element to the page
    document.querySelector('.filterable_cards').appendChild(newCard);

    // Attach the click event to the new card
    newCard.addEventListener('click', () => {
        previewContainer.style.display = 'flex';
        let name = newCard.getAttribute('name');
        previewBox.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (name === target) {
                preview.classList.add('active');
            } else {
                preview.classList.remove('active');
            }
        });
    });
}

// Delete Product
document.getElementById('deleteButton').addEventListener('click', () => {
    const activePreview = document.querySelector('.product-preview .preview.active');
    if (activePreview) {
        const productId = activePreview.getAttribute('data-target');
        localStorage.removeItem(productId);

        // Remove the corresponding card
        const productCard = document.querySelector(`.filterable_cards .card[name="${productId}"]`);
        if (productCard) {
            productCard.remove();
        }

        activePreview.remove();
        previewContainer.style.display = 'none';
    }
});

// Flavor Hover
const flavorsButton = document.getElementById('flavors');
const flavorsList = document.getElementById('flavorsList');

flavorsButton.addEventListener('click', function() {
    flavorsList.style.display = (flavorsList.style.display === 'none' || flavorsList.style.display === '') ? 'block' : 'none';
});

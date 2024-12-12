let cart = [];

// Add to cart
function addToCart(name, price, quantity) {
    quantity = parseFloat(quantity);
    if (quantity <= 0) return;

    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += quantity; // Update quantity if item exists
    } else {
        cart.push({ name, price, quantity });
    }
    updateCartDisplay();
}

// Update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; ////// Clear current cart display
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>Rs ${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-name="${item.name}" />
                </td>
                <td>Rs ${itemTotalPrice.toFixed(2)}</td>
        
                <td><button class="delete-item" data-name="${item.name}">Delete</button></td> 
            </tr>
        `; ////// delete button
    });

    document.getElementById('total-price').innerText = `Total Price: Rs ${totalPrice.toFixed(2)}`;

    // Add event listeners for quantity change and delete buttons
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const name = this.getAttribute('data-name');
            const newQuantity = parseFloat(this.value);
            if (newQuantity <= 0) {
                removeItemFromCart(name); // If quantity is less than 1, remove the item
            } else {
                updateItemQuantity(name, newQuantity);
            }
        });
    });

    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            removeItemFromCart(name); // Remove item from the cart
        });
    });
}

// Update item quantity in the cart
function updateItemQuantity(name, newQuantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = newQuantity;
    }
    updateCartDisplay(); 
}

// Remove item from cart
function removeItemFromCart(name) {
    cart = cart.filter(item => item.name !== name); // Remove item by name
    updateCartDisplay(); 
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Save cart data
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

// Add to favorites
function addToFavorites() {
    localStorage.setItem('favorites', JSON.stringify(cart));
    alert('Order saved as favorite!');
}

// Apply favorites
function applyFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    cart = storedFavorites.slice();
    updateCartDisplay();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const qtyId = this.getAttribute('data-qty-id');
        const quantity = document.getElementById(qtyId).value;

        addToCart(name, price, quantity);
    });
});

document.getElementById('buy-button').addEventListener('click', checkout);
document.getElementById('add-to-favorites').addEventListener('click', addToFavorites);
document.getElementById('apply-favorites').addEventListener('click', applyFavorites);
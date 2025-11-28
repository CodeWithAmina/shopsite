function addToCart(id) {
    let cart = getCart();
    let item = cart.find(c => c.productId === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ productId: id, qty: 1 });
    }

    saveCart(cart);
    alert("✅ Added to cart!");
}

function loadCart() {
    checkLogin();

    let cart = getCart();
    let products = getProducts();
    let container = document.getElementById("cartItems");
    let summaryContainer = document.getElementById("cartSummary");
    let total = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <div class="empty-cart-text">Your cart is empty</div>
                <a href="shop.html" class="btn btn-light" style="padding: 0.8rem 2rem; font-weight: 700;">
                    🛍️ Continue Shopping
                </a>
            </div>
        `;
        summaryContainer.innerHTML = '';
        return;
    }

    cart.forEach(c => {
        let p = products.find(x => x.id === c.productId);
        if (!p) return;

        total += p.price * c.qty;

        container.innerHTML += `
            <div class="cart-card">
                <div class="cart-item-info">
                    <h5>${p.name}</h5>
                    <p class="cart-item-price">₹${p.price.toLocaleString()}</p>
                    <p style="color: #666; font-size: 0.9rem;">Subtotal: <strong>₹${(p.price * c.qty).toLocaleString()}</strong></p>
                </div>
                
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQty(${c.productId})">−</button>
                    <span class="qty-display">${c.qty}</span>
                    <button class="quantity-btn" onclick="increaseQty(${c.productId})">+</button>
                </div>

                <button class="remove-btn" onclick="removeFromCart(${c.productId})">🗑️ Remove</button>
            </div>
        `;
    });

    // Display summary
    let tax = Math.round(total * 0.18);
    let grandTotal = total + tax;

    summaryContainer.innerHTML = `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${total.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Tax (18%):</span>
                <span>₹${tax.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span style="color: #00a86b; font-weight: 700;">FREE 🚚</span>
            </div>
            
            <div class="summary-total">
                <span>Total Amount:</span>
                <span style="color: #e94560;">₹${grandTotal.toLocaleString()}</span>
            </div>

            <div class="button-group">
                <button class="btn-continue" onclick="window.location.href='shop.html'">← Continue Shopping</button>
                <button class="btn-checkout" onclick="goToCheckout()">💳 PROCEED TO CHECKOUT</button>
            </div>
        </div>
    `;
}

function increaseQty(id) {
    let cart = getCart();
    let item = cart.find(c => c.productId === id);
    if (item) {
        item.qty++;
        saveCart(cart);
        loadCart();
    }
}

function decreaseQty(id) {
    let cart = getCart();
    let item = cart.find(c => c.productId === id);
    if (item) {
        if (item.qty > 1) {
            item.qty--;
            saveCart(cart);
            loadCart();
        } else {
            removeFromCart(id);
        }
    }
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(c => c.productId !== id);
    saveCart(cart);
    loadCart();
}

function goToCheckout() {
    let cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

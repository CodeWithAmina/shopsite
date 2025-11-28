function addToCart(id) {
    let cart = getCart();
    let item = cart.find(c => c.productId === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ productId: id, qty: 1 });
    }

    saveCart(cart);
    
    // Show success toast
    showToast("✅ Added to cart!");
    
    // Optional: Redirect to cart after 1.5 seconds
    setTimeout(() => {
        // Uncomment to auto-redirect: window.location.href = "cart.html";
    }, 1500);
}

function loadCart() {
    checkLogin();

    let cart = getCart();
    let products = getProducts();
    let container = document.getElementById("cartItems");
    let summaryContainer = document.getElementById("cartSummary");
    let badgeContainer = document.getElementById("cartBadge");
    let total = 0;
    let itemCount = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <div class="empty-cart-text">Your cart is empty</div>
                <p style="opacity: 0.8; margin-bottom: 2rem;">Explore our amazing shoe collection!</p>
                <a href="shop.html" class="btn btn-light" style="padding: 0.8rem 2rem; font-weight: 700;">
                    🛍️ Continue Shopping
                </a>
            </div>
        `;
        summaryContainer.innerHTML = '';
        badgeContainer.innerHTML = '';
        return;
    }

    // Display cart badge
    cart.forEach(c => {
        itemCount += c.qty;
    });
    badgeContainer.innerHTML = `📦 ${itemCount} ${itemCount === 1 ? 'item' : 'items'} in cart`;

    cart.forEach((c, index) => {
        let p = products.find(x => x.id === c.productId);
        if (!p) return;

        let itemTotal = p.price * c.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-card">
                <div class="cart-item-details">
                    <h5>${p.name}</h5>
                    <p class="cart-item-price">₹${p.price.toLocaleString()}</p>
                    <p class="item-subtotal">Subtotal: <strong>₹${itemTotal.toLocaleString()}</strong></p>
                </div>
                
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQty(${c.productId})" title="Decrease quantity">−</button>
                        <span class="qty-display">${c.qty}</span>
                        <button class="quantity-btn" onclick="increaseQty(${c.productId})" title="Increase quantity">+</button>
                    </div>

                    <button class="remove-btn" onclick="removeFromCart(${c.productId})" title="Remove item">🗑️ Remove</button>
                </div>
            </div>
        `;
    });

    // Display summary with promo
    let subtotal = total;
    let discountAmount = 0;
    let promoApplied = sessionStorage.getItem("promoApplied");
    
    if (promoApplied) {
        let promoData = JSON.parse(promoApplied);
        discountAmount = promoData.discount;
    }

    let tax = Math.round(subtotal * 0.18);
    let grandTotal = subtotal + tax - discountAmount;

    summaryContainer.innerHTML = `
        <div>
            <h3 class="summary-title">💳 Order Summary</h3>

            <div class="summary-section">
                <div class="summary-row">
                    <strong>Subtotal:</strong>
                    <strong>₹${subtotal.toLocaleString()}</strong>
                </div>
                <div class="summary-row">
                    <strong>Tax (18%):</strong>
                    <strong>₹${tax.toLocaleString()}</strong>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span style="color: #00a86b; font-weight: 700;">FREE 🚚</span>
                </div>
                ${discountAmount > 0 ? `
                    <div class="summary-row">
                        <span style="color: #00a86b; font-weight: 700;">Discount:</span>
                        <span style="color: #00a86b; font-weight: 700;">−₹${discountAmount.toLocaleString()}</span>
                    </div>
                ` : ''}
            </div>

            <div class="promo-section">
                <div style="margin-bottom: 0.8rem; font-weight: 700; color: #e94560;">🎟️ Promo Code</div>
                <div class="promo-input-group">
                    <input type="text" id="promoInput" class="promo-input" placeholder="Enter code" maxlength="15">
                    <button class="promo-btn" onclick="applyPromo()">Apply</button>
                </div>
                <div id="promoMessage" class="promo-message"></div>
                <div style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">
                    💡 Try: SAVE10, SAVE20, NEWUSER, SHOE50
                </div>
            </div>

            <div class="summary-total">
                <span>Total:</span>
                <span style="color: #e94560;">₹${grandTotal.toLocaleString()}</span>
            </div>

            <div class="button-group">
                <button class="btn-checkout" onclick="goToCheckout()">
                    ✅ CHECKOUT NOW
                </button>
                <button class="btn-continue" onclick="window.location.href='shop.html'">
                    ← Continue Shopping
                </button>
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
    showToast("🗑️ Item removed from cart");
    loadCart();
}

function applyPromo() {
    let code = document.getElementById("promoInput").value.toUpperCase().trim();
    let message = document.getElementById("promoMessage");

    if (!code) {
        message.innerText = "Please enter a promo code";
        message.className = "promo-message error";
        return;
    }

    let cart = getCart();
    let products = getProducts();
    let subtotal = 0;

    cart.forEach(c => {
        let p = products.find(x => x.id === c.productId);
        if (p) subtotal += p.price * c.qty;
    });

    const promoCodes = {
        "SAVE10": { discount: Math.round(subtotal * 0.10), msg: "10% discount applied! 🎉" },
        "SAVE20": { discount: Math.round(subtotal * 0.20), msg: "20% discount applied! 🎉" },
        "NEWUSER": { discount: Math.round(subtotal * 0.15), msg: "15% new user discount! 🎁" },
        "SHOE50": { discount: Math.round(subtotal * 0.05), msg: "5% discount applied! ✨" }
    };

    if (promoCodes[code]) {
        let promoData = {
            code: code,
            discount: promoCodes[code].discount
        };
        sessionStorage.setItem("promoApplied", JSON.stringify(promoData));
        message.innerText = promoCodes[code].msg;
        message.className = "promo-message success";
        showToast(promoCodes[code].msg);
        setTimeout(() => loadCart(), 500);
    } else {
        message.innerText = "Invalid promo code ❌";
        message.className = "promo-message error";
        sessionStorage.removeItem("promoApplied");
    }
}

function goToCheckout() {
    let cart = getCart();
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    showToast("🚀 Proceeding to checkout...");
    setTimeout(() => {
        window.location.href = "checkout.html";
    }, 800);
}

function showToast(message) {
    // Create toast element
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 700;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(toast);
    
    // Add animation
    let style = document.createElement("style");
    style.innerText = `
        @keyframes slideIn {
            from { 
                transform: translateX(400px);
                opacity: 0;
            }
            to { 
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        toast.style.animation = "slideOut 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

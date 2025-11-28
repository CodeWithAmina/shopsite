function addToCart(id) {
    let cart = getCart();
    let item = cart.find(c => c.productId === id);
    let products = getProducts();
    let product = products.find(p => p.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ productId: id, qty: 1 });
    }

    saveCart(cart);
    
    // Show success alert
    AlertManager.success("✅ Added to cart!");
    
    // Show modal confirmation
    ModalAlert.success("Added to Cart! 🛒", 
        `${product.name} has been added to your cart.`,
        [
            { text: 'Continue Shopping', type: 'primary', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` },
            { text: 'Go to Cart', type: 'success', onClick: `window.location.href='cart.html'` }
        ]
    );
}

function loadCart() {
    checkLogin();

    let cart = getCart();
    let products = getProducts();
    let container = document.getElementById("cartItems");
    let summaryContainer = document.getElementById("cartSummary");
    let badgeContainer = document.getElementById("cartBadge");
    let shippingContainer = document.getElementById("shippingSection");
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
        shippingContainer.innerHTML = '';
        
        // Show empty cart modal
        setTimeout(() => {
            ModalAlert.warning("Cart is Empty! 🛒", 
                "Your shopping cart is currently empty. Browse our amazing collection of premium shoes.",
                [{ text: 'Start Shopping', type: 'primary', onClick: `window.location.href='shop.html'` }]
            );
        }, 500);
        
        return;
    }

    // Display shipping address form
    let savedAddress = JSON.parse(localStorage.getItem("shippingAddress")) || {};
    
    shippingContainer.innerHTML = `
        <div class="shipping-section">
            <h3 class="shipping-title">📦 Shipping Address</h3>
            
            <div class="shipping-info-box">
                ℹ️ Please enter your delivery address. You'll need this to complete your order.
            </div>

            <div class="shipping-form-row">
                <div class="shipping-form-group">
                    <label>First Name *</label>
                    <input type="text" id="firstName" placeholder="John" value="${savedAddress.firstName || ''}">
                </div>
                <div class="shipping-form-group">
                    <label>Last Name *</label>
                    <input type="text" id="lastName" placeholder="Doe" value="${savedAddress.lastName || ''}">
                </div>
            </div>

            <div class="shipping-form-row">
                <div class="shipping-form-group">
                    <label>Email *</label>
                    <input type="email" id="email" placeholder="john@example.com" value="${savedAddress.email || ''}">
                </div>
                <div class="shipping-form-group">
                    <label>Phone Number *</label>
                    <input type="tel" id="phone" placeholder="+91 9876543210" value="${savedAddress.phone || ''}">
                </div>
            </div>

            <div class="shipping-form-group">
                <label>Street Address *</label>
                <input type="text" id="address" placeholder="123 Main Street" value="${savedAddress.address || ''}">
            </div>

            <div class="shipping-form-row">
                <div class="shipping-form-group">
                    <label>City *</label>
                    <input type="text" id="city" placeholder="Mumbai" value="${savedAddress.city || ''}">
                </div>
                <div class="shipping-form-group">
                    <label>Postal Code *</label>
                    <input type="text" id="postalCode" placeholder="400001" value="${savedAddress.postalCode || ''}">
                </div>
            </div>

            <div class="shipping-form-row">
                <div class="shipping-form-group">
                    <label>State *</label>
                    <input type="text" id="state" placeholder="Maharashtra" value="${savedAddress.state || ''}">
                </div>
                <div class="shipping-form-group">
                    <label>Country</label>
                    <input type="text" id="country" placeholder="India" value="${savedAddress.country || 'India'}" disabled style="background: #f5f5f5;">
                </div>
            </div>

            <button onclick="saveShippingAddress()" style="width: 100%; padding: 0.9rem; background: linear-gradient(135deg, #4E7FFF 0%, #3E6FFF 100%); color: white; border: none; border-radius: 8px; font-weight: 700; margin-top: 1rem; cursor: pointer;">
                ✅ Save Address
            </button>
        </div>
    `;

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
    let products = getProducts();
    let product = products.find(p => p.id === id);
    
    cart = cart.filter(c => c.productId !== id);
    saveCart(cart);
    
    AlertManager.success("🗑️ Item removed from cart");
    
    ModalAlert.info("Item Removed ✓", 
        `${product.name} has been removed from your cart.`,
        [{ text: 'OK', type: 'primary', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }]
    );
    
    setTimeout(() => loadCart(), 1000);
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
        AlertManager.success(promoCodes[code].msg);
        setTimeout(() => loadCart(), 500);
    } else {
        message.innerText = "Invalid promo code ❌";
        message.className = "promo-message error";
        AlertManager.error("Invalid promo code ❌");
        sessionStorage.removeItem("promoApplied");
    }
}

function saveShippingAddress() {
    // Get all form values
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let state = document.getElementById("state").value.trim();
    let postalCode = document.getElementById("postalCode").value.trim();
    let country = "India";

    // Validation
    if (!firstName) {
        AlertManager.error("❌ First Name is required");
        return;
    }
    if (!lastName) {
        AlertManager.error("❌ Last Name is required");
        return;
    }
    if (!email || !email.includes("@")) {
        AlertManager.error("❌ Valid Email is required");
        return;
    }
    if (!phone || phone.length < 10) {
        AlertManager.error("❌ Valid Phone Number is required");
        return;
    }
    if (!address) {
        AlertManager.error("❌ Street Address is required");
        return;
    }
    if (!city) {
        AlertManager.error("❌ City is required");
        return;
    }
    if (!state) {
        AlertManager.error("❌ State is required");
        return;
    }
    if (!postalCode || postalCode.length < 5) {
        AlertManager.error("❌ Valid Postal Code is required");
        return;
    }

    // Save to localStorage
    let shippingData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        postalCode,
        country,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
    
    AlertManager.success("✅ Address saved successfully!");
    
    // Show confirmation modal
    ModalAlert.success("Shipping Address Saved ✓", 
        `${firstName} ${lastName}, ${city}, ${state} ${postalCode}`,
        [{ text: 'OK', type: 'primary', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }]
    );
}

function goToCheckout() {
    let cart = getCart();
    if (cart.length === 0) {
        AlertManager.error("Your cart is empty!");
        return;
    }

    // Check if shipping address is saved
    let shippingAddress = localStorage.getItem("shippingAddress");
    if (!shippingAddress) {
        AlertManager.error("❌ Please save your shipping address first");
        ModalAlert.warning("Complete Your Address 📦", 
            "You must fill in and save your shipping address before checkout.",
            [{ text: 'OK', type: 'primary', onClick: `ModalAlert.close('modal-alert-${Date.now()}')` }]
        );
        // Scroll to shipping section
        document.getElementById("shippingSection").scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    let products = getProducts();
    let subtotal = 0;
    cart.forEach(c => {
        let p = products.find(x => x.id === c.productId);
        if (p) subtotal += p.price * c.qty;
    });
    
    let tax = Math.round(subtotal * 0.18);
    let discountAmount = 0;
    let promoApplied = sessionStorage.getItem("promoApplied");
    if (promoApplied) {
        let promoData = JSON.parse(promoApplied);
        discountAmount = promoData.discount;
    }
    
    let grandTotal = subtotal + tax - discountAmount;
    let shippingData = JSON.parse(shippingAddress);
    
    // Generate a unique modal ID for consistent button references
    const checkoutModalId = 'checkout-modal-' + Date.now();
    
    ModalAlert.show("Proceed to Checkout? 💳", 
        `📍 Shipping: ${shippingData.city}, ${shippingData.state}<br>💰 Total: ₹${grandTotal.toLocaleString()}`,
        'info',
        [
            { text: 'Cancel', type: 'secondary', onClick: `ModalAlert.close('${checkoutModalId}')` },
            { text: '✅ Place Order', type: 'success', onClick: `placeOrder('${checkoutModalId}', ${grandTotal})` }
        ]
    );
}

function placeOrder(modalId, grandTotal) {
    // Close the confirmation modal
    ModalAlert.close(modalId);
    
    // Get cart and shipping data
    let cart = getCart();
    let shippingData = JSON.parse(localStorage.getItem("shippingAddress"));
    let promoApplied = sessionStorage.getItem("promoApplied") ? JSON.parse(sessionStorage.getItem("promoApplied")) : null;
    
    // Create order object
    let order = {
        id: Math.floor(Math.random() * 100000) + 10000, // Random 5-digit order ID
        items: cart,
        shipping: shippingData,
        total: grandTotal,
        promoCode: promoApplied ? promoApplied.code : null,
        discount: promoApplied ? promoApplied.discount : 0,
        orderDate: new Date().toISOString(),
        status: 'Confirmed'
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    // Clear cart and promo
    localStorage.removeItem("cart");
    sessionStorage.removeItem("promoApplied");
    
    // Show success toast
    AlertManager.success("✅ Order placed successfully!");
    
    // Show order confirmation modal
    setTimeout(() => {
        const itemsList = cart.map(c => {
            let products = getProducts();
            let product = products.find(p => p.id === c.productId);
            return `${product.name} x${c.qty}`;
        }).join('<br>');
        
        ModalAlert.show("🎉 Order Placed Successfully!", 
            `<div style="text-align: left; margin: 1rem 0;">
                <strong>Order ID:</strong> #${order.id}<br><br>
                <strong>Items:</strong><br>${itemsList}<br><br>
                <strong>Delivery Address:</strong><br>
                ${shippingData.firstName} ${shippingData.lastName}<br>
                ${shippingData.address}<br>
                ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br><br>
                <strong style="color: #e94560;">Total: ₹${grandTotal.toLocaleString()}</strong>
            </div>`,
            'success',
            [
                { text: '🏠 Back to Home', type: 'primary', onClick: `window.location.href='index.html'` },
                { text: '🛍️ Continue Shopping', type: 'secondary', onClick: `window.location.href='shop.html'` }
            ]
        );
    }, 500);
}

function showToast(message) {
    AlertManager.show(message, 'info', 2500);
}

function addToCart(id) {

    let cart = getCart();

    let item = cart.find(c => c.productId === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ productId: id, qty: 1 });
    }

    saveCart(cart);
    alert("Added to cart!");
}

function loadCart() {

    checkLogin();

    let cart = getCart();
    let products = getProducts();

    let container = document.getElementById("cartItems");
    let total = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center; font-size: 1.2rem;">Your cart is empty</p>';
        document.getElementById("total").innerText = "0";
        return;
    }

    cart.forEach(c => {

        let p = products.find(x => x.id === c.productId);

        if (!p) return;

        total += p.price * c.qty;

        container.innerHTML += `
            <div class="card-body cart-card">
                <div>
                    <h5>${p.name}</h5>
                    <p class="text-muted"><strong style="color: #e94560;">₹${p.price}</strong> × ${c.qty} = <strong style="color: #e94560; font-size: 1.1rem;">₹${p.price * c.qty}</strong></p>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${c.productId})">🗑️ Remove</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(c => c.productId !== id);
    saveCart(cart);
    loadCart();
}

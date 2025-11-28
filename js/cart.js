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

    cart.forEach(c => {

        let p = products.find(x => x.id === c.productId);

        total += p.price * c.qty;

        container.innerHTML += `
            <div class="card p-3 mb-3 shadow">
                <h5>${p.name}</h5>
                <p>₹${p.price} × ${c.qty} = ₹${p.price * c.qty}</p>

                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${c.productId})">Remove</button>
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

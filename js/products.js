// Display all products on the shop page
function displayProducts() {
    checkLogin(); // ensure user is logged in

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    // Show "Add Product" button only for admin
    if (user.email === "admin@gmail.com") {
        document.getElementById("adminBtn").classList.remove("d-none");
    }

    let products = getProducts();

    // If no products exist, preload some default products
    if (products.length === 0) {
        products = [
            {
                id: Date.now(),
                name: "Premium Wireless Headphones",
                price: 2999,
                description: "High-quality sound with noise cancellation and 30-hour battery life",
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
            },
            {
                id: Date.now() + 1,
                name: "Smart Watch Pro",
                price: 4999,
                description: "Advanced fitness tracking, heart rate monitor, and 7-day battery",
                img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
            },
            {
                id: Date.now() + 2,
                name: "USB-C Portable Charger",
                price: 1499,
                description: "Fast charging 20000mAh power bank with dual USB-C ports",
                img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
            },
            {
                id: Date.now() + 3,
                name: "4K Webcam",
                price: 3499,
                description: "Crystal clear 4K video for streaming and video calls",
                img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop"
            },
            {
                id: Date.now() + 4,
                name: "Mechanical Gaming Keyboard",
                price: 3999,
                description: "RGB backlit with cherry MX switches and aluminum frame",
                img: "https://images.unsplash.com/photo-1587829191301-15ba540a9108?w=500&h=500&fit=crop"
            },
            {
                id: Date.now() + 5,
                name: "Premium Mouse Pad",
                price: 899,
                description: "Large extended gaming mouse pad with non-slip base",
                img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"
            }
        ];
        saveProducts(products);
    }

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${p.img}" alt="${p.name}">
                    <span class="product-badge">Hot Deal</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-description">${p.description}</p>
                    <div class="product-footer">
                        <span class="product-price">₹${p.price.toLocaleString()}</span>
                        ${user.email === "admin@gmail.com"
                            ? `
                                <div class="admin-btn-group">
                                    <button class="btn btn-warning btn-sm" onclick="edit(${p.id})" style="color: white;">✏️ Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="removeProduct(${p.id})">🗑️ Delete</button>
                                </div>
                              `
                            : `<button class="add-to-cart-btn" onclick="addToCart(${p.id})">🛒 Add</button>`
                        }
                    </div>
                </div>
            </div>
        `;
    });
}

// Add a new product (admin only)
function addProduct() {
    let products = getProducts();

    products.push({
        id: Date.now(),
        name: document.getElementById("pname").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("desc").value,
        img: document.getElementById("img").value
    });

    saveProducts(products);
    window.location.href = "shop.html";
}

// Remove a product (admin only)
function removeProduct(id) {
    let products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    displayProducts();
}

// Redirect to edit page
function edit(id) {
    localStorage.setItem("editId", id);
    window.location.href = "editproduct.html";
}

// Load product info into edit page
function loadProductToEdit() {
    const id = localStorage.getItem("editId");
    const products = getProducts();
    const p = products.find(x => x.id == id);

    if (!p) return;

    document.getElementById("pname").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("desc").value = p.description;
    document.getElementById("img").value = p.img;
}

// Update the product after editing
function updateProduct() {
    const id = localStorage.getItem("editId");
    let products = getProducts();

    products = products.map(p => {
        if (p.id == id) {
            p.name = document.getElementById("pname").value;
            p.price = parseFloat(document.getElementById("price").value);
            p.description = document.getElementById("desc").value;
            p.img = document.getElementById("img").value;
        }
        return p;
    });

    saveProducts(products);
    window.location.href = "shop.html";
}

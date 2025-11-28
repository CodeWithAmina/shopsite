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
                id: 1001,
                name: "Nike Air Max 90",
                price: 8999,
                description: "Classic running shoes with excellent cushioning and breathable mesh",
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=700&fit=crop&q=90"
            },
            {
                id: 1002,
                name: "Adidas Ultraboost 22",
                price: 12999,
                description: "Premium running shoes with responsive boost technology for maximum comfort",
                img: "https://images.unsplash.com/photo-1584633733177-7c5d5c6635d6?w=700&h=700&fit=crop&q=90"
            },
            {
                id: 1003,
                name: "Puma RS-X Retro",
                price: 7499,
                description: "Retro style sneakers perfect for casual wear and daily comfort",
                img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700&h=700&fit=crop&q=90"
            },
            {
                id: 1004,
                name: "Converse Chuck Taylor",
                price: 4999,
                description: "Iconic canvas sneakers - a timeless classic for any occasion",
                img: "https://images.unsplash.com/photo-1597045814000-4f2490a967d6?w=700&h=700&fit=crop&q=90"
            },
            {
                id: 1005,
                name: "Vans Old Skool",
                price: 5499,
                description: "Durable skate shoes with timeless design and great ankle support",
                img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=700&h=700&fit=crop&q=90"
            },
            {
                id: 1006,
                name: "New Balance 990v5",
                price: 11999,
                description: "Premium cushioned running shoes with superior arch support and stability",
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=700&fit=crop&q=90"
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
                    <span class="product-badge">🔥 Limited Stock</span>
                </div>
                <div class="product-info">
                    <p class="product-category">Premium Footwear</p>
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-description">${p.description}</p>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span>(4.5)</span>
                    </div>
                    <div class="product-footer">
                        <div>
                            <span class="original-price">₹${(p.price * 1.3).toLocaleString()}</span>
                            <span class="price-symbol">₹</span><span class="product-price">${p.price.toLocaleString()}</span>
                            <span class="discount-badge">-25%</span>
                        </div>
                        ${user.email === "admin@gmail.com"
                            ? `
                                <div class="admin-btn-group">
                                    <button class="btn btn-warning btn-sm" onclick="edit(${p.id})" style="color: white;">✏️ Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="removeProduct(${p.id})">🗑️ Delete</button>
                                </div>
                              `
                            : `<button class="add-to-cart-btn" onclick="addToCart(${p.id})">🛒 ADD TO CART</button>`
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

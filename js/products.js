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
                img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23FF6B6B' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E👟 Nike Air Max 90%3C/text%3E%3C/svg%3E"
            },
            {
                id: 1002,
                name: "Adidas Ultraboost 22",
                price: 12999,
                description: "Premium running shoes with responsive boost technology for maximum comfort",
                img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%234E7FFF' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E👟 Adidas Ultraboost%3C/text%3E%3C/svg%3E"
            },
            {
                id: 1003,
                name: "Puma RS-X Retro",
                price: 7499,
                description: "Retro style sneakers perfect for casual wear and daily comfort",
                img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23FFB100' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E👟 Puma RS-X%3C/text%3E%3C/svg%3E"
            },
            {
                id: 1004,
                name: "Converse Chuck Taylor",
                price: 4999,
                description: "Iconic canvas sneakers - a timeless classic for any occasion",
                img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%231a1a2e' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E👟 Converse Chuck%3C/text%3E%3C/svg%3E"
            },
            {
                id: 1005,
                name: "Vans Old Skool",
                price: 5499,
                description: "Durable skate shoes with timeless design and great ankle support",
                img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%2300D084' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E👟 Vans Old Skool%3C/text%3E%3C/svg%3E"
            },
            {
                id: 1006,
                name: "New Balance 990v5",
                price: 11999,
                description: "Premium cushioned running shoes with superior arch support and stability",
                img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23E94560' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E👟 New Balance%3C/text%3E%3C/svg%3E"
            }
        ];
        saveProducts(products);
    }

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        const imgUrl = p.img || "https://via.placeholder.com/700x700?text=Shoe+Image";
        list.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${imgUrl}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/700x700?text=${p.name}'" loading="lazy">
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

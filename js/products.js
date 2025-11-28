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
                name: "Sample Product 1",
                price: 100,
                description: "This is a sample product",
                img: "https://via.placeholder.com/180"
            },
            {
                id: Date.now() + 1,
                name: "Sample Product 2",
                price: 200,
                description: "Another sample product",
                img: "https://via.placeholder.com/180"
            },
            {
                id: Date.now() + 2,
                name: "Sample Product 3",
                price: 150,
                description: "Yet another sample product",
                img: "https://via.placeholder.com/180"
            }
        ];
        saveProducts(products);
    }

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card shadow">
                    <img src="${p.img}" class="card-img-top" height="200" alt="${p.name}">
                    <div class="card-body">
                        <h5 class="card-title">${p.name}</h5>
                        <p class="card-text text-muted">${p.description}</p>
                        <p class="product-price">₹${p.price}</p>
                        ${user.email === "admin@gmail.com"
                            ? `
                                <div class="admin-btn-group">
                                    <button class="btn btn-warning btn-sm flex-grow-1" onclick="edit(${p.id})">✏️ Edit</button>
                                    <button class="btn btn-danger btn-sm flex-grow-1" onclick="removeProduct(${p.id})">🗑️ Delete</button>
                                </div>
                              `
                            : `<button class="btn btn-primary w-100" onclick="addToCart(${p.id})">🛒 Add to Cart</button>`
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

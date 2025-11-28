function displayProducts() {

    checkLogin();
    let user = localStorage.getItem("loggedInUser");

    if (user === "admin")
        document.getElementById("adminBtn").classList.remove("d-none");

    let products = getProducts();
    let list = document.getElementById("productList");

    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card shadow">
                    <img src="${p.img}" height="180" class="card-img-top">

                    <div class="card-body">
                        <h5>${p.name}</h5>
                        <p>${p.description}</p>
                        <p><b>₹${p.price}</b></p>

                        ${user === "admin"
                            ? `
                                <button class="btn btn-warning w-100 mb-2" onclick="edit(${p.id})">Edit</button>
                                <button class="btn btn-danger w-100" onclick="removeProduct(${p.id})">Delete</button>
                              `
                            : `<button class="btn btn-primary w-100" onclick="addToCart(${p.id})">Add to Cart</button>`
                        }
                    </div>
                </div>
            </div>`;
    });
}

function addProduct() {
    let nameVal = pname.value;
    let priceVal = price.value;
    let descVal = desc.value;
    let imgVal = img.value;

    if (!nameVal || !priceVal || !descVal || !imgVal) {
        alert("All fields required!");
        return;
    }

    let products = getProducts();

    products.push({
        id: Date.now(),
        name: nameVal,
        price: priceVal,
        description: descVal,
        img: imgVal
    });

    saveProducts(products);

    alert("Product added!");
    window.location.href = "shop.html";
}

function removeProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    displayProducts();
}

function edit(id) {
    localStorage.setItem("editId", id);
    window.location.href = "editproduct.html";
}

function loadProductToEdit() {

    let id = localStorage.getItem("editId");
    let products = getProducts();

    let p = products.find(x => x.id == id);

    pname.value = p.name;
    price.value = p.price;
    desc.value = p.description;
    img.value = p.img;
}

function updateProduct() {

    let id = localStorage.getItem("editId");

    let products = getProducts();

    products = products.map(p => {
        if (p.id == id) {
            p.name = pname.value;
            p.price = price.value;
            p.description = desc.value;
            p.img = img.value;
        }
        return p;
    });

    saveProducts(products);

    alert("Updated!");
    window.location.href = "shop.html";
}

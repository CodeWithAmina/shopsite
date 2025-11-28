function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getProducts() {
    return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function checkLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

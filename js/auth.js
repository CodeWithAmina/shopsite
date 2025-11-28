function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("cpassword").value;

    if (!name || !email || !pass || !cpass) {
        alert("All fields required!");
        return;
    }

    if (pass !== cpass) {
        alert("Passwords do not match!");
        return;
    }

    let users = getUsers();

    if (users.some(u => u.email === email)) {
        alert("Email already exists");
        return;
    }

    users.push({ id: Date.now(), name, email, password: pass });

    saveUsers(users);

    alert("Registration successful!");
    window.location.href = "login.html";
}

function login() {

    let emailVal = document.getElementById("email").value;
    let passVal = document.getElementById("password").value;

    if (!emailVal || !passVal) {
        alert("Enter email & password");
        return;
    }

    // Admin login
    if (emailVal === "admin@gmail.com" && passVal === "admin123") {
        localStorage.setItem("loggedInUser", JSON.stringify({email: "admin@gmail.com", name: "Admin"}));
        window.location.href = "./index.html";

        return;
    }

    let users = getUsers();

    let user = users.find(u => u.email === emailVal && u.password === passVal);

    if (!user) {
        alert("Invalid credentials!");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "index.html";
}

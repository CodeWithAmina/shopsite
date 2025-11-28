function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("cpassword").value;

    if (!name || !email || !pass || !cpass) {
        AlertManager.warning("All fields are required!");
        return;
    }

    if (pass !== cpass) {
        AlertManager.error("Passwords do not match!");
        return;
    }

    let users = getUsers();

    if (users.some(u => u.email === email)) {
        AlertManager.error("Email already registered!");
        return;
    }

    users.push({ id: Date.now(), name, email, password: pass });

    saveUsers(users);

    AlertManager.success("Registration successful! Redirecting to login...", 2000);
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

function loginUser() {

    let emailVal = document.getElementById("email").value;
    let passVal = document.getElementById("password").value;

    if (!emailVal || !passVal) {
        AlertManager.warning("Please enter email and password");
        return;
    }

    // Admin login
    if (emailVal === "admin@gmail.com" && passVal === "admin123") {
        AlertManager.success("Welcome Admin! 👑", 1500);
        localStorage.setItem("loggedInUser", JSON.stringify({email: "admin@gmail.com", name: "Admin"}));
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1500);
        return;
    }

    let users = getUsers();

    let user = users.find(u => u.email === emailVal && u.password === passVal);

    if (!user) {
        AlertManager.error("Invalid email or password!");
        return;
    }

    AlertManager.success("Login successful! Welcome back 🎉", 1500);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

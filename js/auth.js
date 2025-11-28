function registerUser() {

    let name = name.value;
    let email = email.value;
    let pass = password.value;
    let cpass = cpassword.value;

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

    let emailVal = email.value;
    let passVal = password.value;

    if (!emailVal || !passVal) {
        alert("Enter email & password");
        return;
    }

    // Admin login
    if (emailVal === "admin@gmail.com" && passVal === "admin123") {
        localStorage.setItem("loggedInUser", "admin");
        window.location.href = "index.html";
        return;
    }

    let users = getUsers();

    let user = users.find(u => u.email === emailVal && u.password === passVal);

    if (!user) {
        alert("Invalid credentials!");
        return;
    }

    localStorage.setItem("loggedInUser", emailVal);
    window.location.href = "index.html";
}

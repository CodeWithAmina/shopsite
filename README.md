# ShopSite - E-Commerce Application

A simple e-commerce web application built with HTML, CSS, JavaScript, and Bootstrap.

## Features

- **User Authentication** - Register and login functionality
- **Product Management** - Admin can add, edit, and delete products
- **Shopping Cart** - Add products to cart and view total
- **User Dashboard** - View logged-in user details
- **Responsive Design** - Bootstrap-based responsive UI

## Project Structure

```
shopsite/
├── index.html          # Home page
├── login.html          # Login page
├── registration.html   # Registration page
├── shop.html           # Shop page (products list)
├── cart.html           # Shopping cart
├── addproduct.html     # Add product (admin)
├── editproduct.html    # Edit product (admin)
├── js/
│   ├── app.js          # Utility functions (localStorage)
│   ├── auth.js         # Authentication functions
│   ├── products.js     # Product management
│   └── cart.js         # Cart management
└── assets/
    └── css/
        └── style.css   # Custom styles
```

## How to Run

### Option 1: Python (Recommended)
```bash
cd shopsite
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Node.js
```bash
cd shopsite
npx http-server
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## Test Credentials

**Admin Account:**
- Email: `admin@gmail.com`
- Password: `admin123`

Or create a new account on the registration page.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- LocalStorage API

## Features Breakdown

### Authentication
- Register new users with validation
- Login with email and password
- Admin special access

### Products
- View all products on shop page
- Admin can add new products
- Admin can edit existing products
- Admin can delete products
- Product details: Name, Price, Description, Image URL

### Shopping Cart
- Add products to cart
- View cart items
- Calculate total price
- Remove items from cart

## Author

Created as a learning project for e-commerce web development.

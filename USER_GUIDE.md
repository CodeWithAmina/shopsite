# 🛍️ ShoeBay - User Guide

## How to Run the Website

### **Step 1: Start the Server**
Open PowerShell and run:
```powershell
cd "c:\sem 2\shopsite"
python -m http.server 8000
```

The server will start on `http://localhost:8000`

---

## **Step 2: Access the Website**

### **Option A: First Time User (Create Account)**
1. Open your browser and go to: `http://localhost:8000`
2. You'll see the **Login Page**
3. Click **"Don't have an account? Register here"**
4. Fill in the registration form:
   - **Name**: Your full name (e.g., "John Doe")
   - **Email**: Your email (e.g., "john@gmail.com")
   - **Password**: Any password (e.g., "password123")
   - **Confirm Password**: Same password
5. Click **"Register"**
6. You'll be redirected to login page
7. Login with your new credentials

### **Option B: Test User Login**
Use these demo credentials:
- **Email**: `testuser@gmail.com`
- **Password**: `test123`

*(These credentials are pre-registered in the system)*

---

## **Step 3: Welcome Home Page**
After login, you'll see:
- 🎉 **Welcome message** with your name
- ✨ **About ShoeBay** section
- 📦 **Order Summary** card with:
  - Your username
  - Shopping features
  - Promo code info (SAVE10, SAVE20, etc.)
- 🛍️ **"Start Shopping Now"** button

---

## **Step 4: Browse & Shop**

### **Visit Shop Page**
Click **"🛍️ Shop"** in the navbar or "Start Shopping Now" button

You'll see:
- 6 premium shoe products with images
- Product names and prices in ₹ (Indian Rupees)
- Product descriptions
- Star ratings
- **"🛒 ADD TO CART"** button for each product

### **Add Items to Cart**
1. Click **"🛒 ADD TO CART"** on any shoe
2. A confirmation modal will appear
3. Choose:
   - **"Continue Shopping"** - Browse more shoes
   - **"Go to Cart"** - View your cart

---

## **Step 5: Cart Management**

### **View Your Cart**
Click **"🛒 Cart"** in the navbar

You can:
- ✅ **Increase/Decrease quantity** using +/− buttons
- 🗑️ **Remove items** with Remove button
- 📦 **See cart badge** showing item count
- 💳 **View order summary** (sticky on right side):
  - Subtotal
  - Tax (18%)
  - Free Shipping
  - **Total Amount**

### **Apply Promo Code**
1. In the cart summary, find **"🎟️ Promo Code"** section
2. Enter one of these codes:
   - **SAVE10** → 10% discount ✨
   - **SAVE20** → 20% discount 🎉
   - **NEWUSER** → 15% discount 🎁
   - **SHOE50** → 5% discount
3. Click **"Apply"**
4. Discount will be calculated instantly

---

## **Step 6: Checkout**

### **Proceed to Checkout**
1. In cart, click **"✅ CHECKOUT NOW"** button
2. A confirmation modal shows order total
3. Click **"Checkout"** to continue

### **Fill Shipping Details**
**Step 1️⃣ - Shipping Address:**
- First Name *
- Last Name *
- Email *
- Phone Number *
- Street Address *
- City *
- Postal Code *
- State *

### **Select Payment Method**
**Step 2️⃣ - Payment:**
Choose one of these:
- 💳 **Credit/Debit Card** (fills card form)
- 📱 **UPI**
- 👛 **Digital Wallet**
- 🚚 **Cash on Delivery** (No card needed)

### **Complete Purchase**
1. Fill all required fields
2. Click **"🎉 PLACE ORDER"**
3. See success message with **Order ID**
4. You'll be redirected to home page

---

## **Step 7: Alerts & Notifications**

You'll see **two types of alerts**:

### **🔔 Top-Right Toast Alerts** (Auto-dismiss)
- ✅ Item added to cart
- 🗑️ Item removed
- 💳 Promo applied
- 🚀 Processing checkout

### **🎯 Centered Modal Alerts** (Requires action)
- 🏠 Welcome message on home page
- 🛍️ Shop welcome message
- ✅ Product added confirmation
- ⚠️ Cart empty warning
- 💳 Checkout confirmation

---

## **Step 8: Logout**

Click **"Logout"** button in the navbar to exit your account

---

## **Features Available to Users**

✅ **Shopping**
- Browse 6 premium shoe products
- View product details and ratings
- Add items to cart with quantity control

✅ **Cart Management**
- Increase/decrease quantities
- Remove items
- Apply promo codes for discounts
- See real-time total with tax & shipping

✅ **Checkout**
- Enter shipping address
- Select payment method
- Place orders
- Get order confirmation

✅ **User Account**
- Register new account
- Login/Logout
- Profile information
- Order history tracking

---

## **Quick Tips** 💡

1. **Promo Codes** - Always apply SAVE10 for first-time 10% off!
2. **Free Shipping** - All orders have free shipping nationwide
3. **Mobile Friendly** - Works great on phones and tablets
4. **Dark Theme** - Easy on the eyes with modern gradient design
5. **Real-time Updates** - Prices update instantly with quantity changes

---

## **Troubleshooting**

**Q: Website won't load?**
A: Make sure server is running: `python -m http.server 8000`

**Q: Can't login?**
A: Check your email and password. Register if you don't have account.

**Q: Images not showing?**
A: Hard refresh browser (Ctrl+F5) or clear cache

**Q: Cart empty after refresh?**
A: Carts are saved in browser storage. Make sure cookies/storage enabled.

---

**Happy Shopping! 🛍️👟**

For admin features, see ADMIN_GUIDE.md

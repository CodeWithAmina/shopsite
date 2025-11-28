# 👑 ShoeBay - Admin Guide

## How to Run as Admin

### **Step 1: Start the Server**
```powershell
cd "c:\sem 2\shopsite"
python -m http.server 8000
```

Open browser: `http://localhost:8000`

---

## **Step 2: Admin Login**

Use these **admin credentials**:
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

---

## **Step 3: Admin Dashboard**

After login as admin, you'll see:
- ✨ **Welcome message** "Welcome Back, Admin! 👑"
- 📊 **Full admin access** to manage products
- ➕ **"Add Product"** button in shop page
- ✏️ **Edit & Delete** buttons on each product

---

## **Step 4: Manage Products**

### **View All Products**
Click **"🛍️ Shop"** in navbar
- See all 6 default shoe products
- Each product has:
  - Product image
  - Name & price (₹)
  - Description
  - Star rating
  - ✏️ **"Edit"** button
  - 🗑️ **"Delete"** button
  - Add to cart option

### **Add New Product**
1. Go to Shop page
2. Click **"➕ Add Product"** button (top right)
3. Fill in product details:
   - **Product Name** * (e.g., "Running Shoes")
   - **Price** * (e.g., 9999)
   - **Description** * (e.g., "Comfortable running shoes...")
   - **Image URL** (optional - can add local or external URL)
4. Click **"Save Product"**
5. You'll see success message
6. Redirected back to shop page

### **Edit Existing Product**
1. On shop page, click **"✏️ Edit"** button on any product
2. You'll be taken to edit page
3. Modify any field:
   - Product Name
   - Price
   - Description
   - Image URL
4. Click **"Update Product"**
5. Changes saved instantly

### **Delete Product**
1. On shop page, click **"🗑️ Delete"** button on any product
2. Confirm deletion in modal popup
3. Product removed from inventory
4. Page refreshes automatically

---

## **Step 5: Product Details**

### **Default Products in System**
The system comes with 6 default shoe products:

| Product | Price (₹) | Brand |
|---------|-----------|-------|
| Nike Air Max 90 | 8,999 | Nike |
| Adidas Ultraboost 22 | 12,999 | Adidas |
| Puma RS-X Retro | 7,499 | Puma |
| Converse Chuck Taylor | 4,999 | Converse |
| Vans Old Skool | 5,499 | Vans |
| New Balance 990v5 | 11,999 | New Balance |

---

## **Step 6: View Orders**

📌 **Feature Coming Soon** - Order management dashboard for viewing customer orders

*Currently, orders are stored in browser local storage*

---

## **Step 7: Admin Features**

✅ **Product Management**
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📸 Add product images
- 💰 Set custom prices

✅ **Store Management**
- 👥 View all products
- 📊 Product inventory
- 🏷️ Product descriptions
- ⭐ Product ratings (pre-set)

✅ **User Features** (Same as regular users)
- 🛒 Add items to cart
- 💳 Checkout
- 🎟️ Apply promo codes

---

## **Step 8: Logout**

Click **"Logout"** button in navbar

---

## **Admin Tips** 💡

1. **Product Images** - You can use:
   - Local image URLs: `images/shoe-name.jpg`
   - External URLs: `https://example.com/image.jpg`
   - Leave blank to use default placeholder

2. **Pricing** - Set prices in Indian Rupees (₹)
   - Example: 9999 for ₹9,999

3. **Descriptions** - Keep clear and concise
   - Mention key features
   - Include material/comfort info

4. **Inventory** - No stock management yet
   - Can add unlimited products
   - Prices automatically apply to all sales

5. **Backup** - Data stored in browser
   - Use browser export if needed
   - Clear cache carefully

---

## **Advanced Features**

### **Promo Code System**
Admin-set promo codes in system:
- **SAVE10** → 10% discount
- **SAVE20** → 20% discount
- **NEWUSER** → 15% discount
- **SHOE50** → 5% discount

*To add more codes, edit `checkout.html`*

### **Checkout Process**
View checkout flow at:
- Shipping address form
- Payment method selection (4 options)
- Order confirmation with ID

### **Data Storage**
All data stored locally:
- Products → localStorage["products"]
- Orders → localStorage["orders"]
- Users → localStorage["users"]

---

## **Quick Commands** 🖥️

**Start Server:**
```powershell
cd "c:\sem 2\shopsite"
python -m http.server 8000
```

**Access Website:**
```
http://localhost:8000
```

**Admin Login:**
```
Email: admin@gmail.com
Password: admin123
```

---

## **Troubleshooting**

**Q: "Add Product" button not showing?**
A: Make sure you're logged in as admin@gmail.com

**Q: Can't edit product?**
A: Only admin can edit. Login with admin credentials.

**Q: Changes not saving?**
A: Check browser console for errors (F12 → Console)

**Q: Lost all products?**
A: Browser cache cleared? Products stored in localStorage.

---

## **Feature Roadmap** 🚀

- [ ] Order management dashboard
- [ ] Stock/Inventory tracking
- [ ] Sales analytics
- [ ] Customer reports
- [ ] Custom promo code creation
- [ ] Product categories
- [ ] Bulk product upload

---

**Admin Hub Secure! 👑**

For user guide, see USER_GUIDE.md

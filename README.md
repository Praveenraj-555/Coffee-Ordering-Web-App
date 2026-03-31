# ☕ Brew & Co — Coffee Ordering Web App

<p align:center><img width="1000" height="520" alt="Image" src="https://github.com/user-attachments/assets/fb7b4d64-19dc-4e24-a7e6-99c9725e5f1a" /></p>

A fully functional, single-page coffee ordering web application built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies — just a warm, cozy café experience right in your browser.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Menu Items](#menu-items)
- [Cart & Ordering System](#cart--ordering-system)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

**Brew & Co** is a personal coffee ordering web app where users can browse a menu of hot and cold drinks, add items to their cart, adjust quantities, and place an order — all within a beautifully designed single-page interface. Built entirely as one self-contained HTML file, it requires no server, no installation, and no internet connection after the initial load.

This project is ideal for:
- Learning how a cart/ordering UI works under the hood
- Customizing as a menu display for a small café or home project
- Practicing vanilla JavaScript DOM manipulation

---

## Features

### Core Functionality
- **Browse Menu** — View a curated list of 10 coffee and drink items with names, descriptions, and prices
- **Add to Cart** — One-click add to cart with instant feedback
- **Quantity Control** — Increase or decrease item quantity directly from the cart
- **Remove Items** — Remove individual items from the cart
- **Live Cart Total** — Running subtotal updates in real time as you add or remove items
- **Place Order** — Checkout button triggers an order confirmation screen with a full order summary
- **Cart Badge** — A live item count badge on the cart icon updates as items are added

### Content Sections
- **Hero Banner** — Full-width welcome section with tagline and call-to-action
- **Menu Section** — Responsive grid of drink cards with emoji illustrations, descriptions, and pricing
- **Why Choose Us** — Highlights 4 key values: freshly roasted, ethically sourced, expert baristas, and cozy atmosphere
- **Our Story** — A short brand narrative section about the café's origins
- **Footer** — Café name, opening hours, address, and a closing tagline

### UI/UX Details
- Smooth scroll navigation
- Hover effects on all interactive elements
- Cart slides in as a sidebar panel
- Confirmation screen replaces cart on successful order
- Mobile-responsive layout throughout

---

## Project Structure

Since this is a single-file app, everything lives in one place:

```
index.html
│
├── <head>          — Metadata, Google Fonts import, all CSS styles
│
├── <body>
│   ├── Header / Navbar        — Logo, nav links, cart icon with badge
│   ├── Hero Section           — Banner with tagline and CTA button
│   ├── Menu Section           — Grid of drink cards
│   ├── Why Choose Us Section  — 4 feature highlight cards
│   ├── Our Story Section      — Brand narrative
│   ├── Footer                 — Hours, location, tagline
│   └── Cart Sidebar           — Slide-in panel with cart items and checkout
│
└── <script>        — All JavaScript: cart logic, DOM events, order flow
```

---

## Getting Started

### No installation required.

1. Download or copy the `index.html` file to your computer
2. Open it in any modern web browser (double-click the file, or drag it into your browser)
3. Start ordering!

That's it. No npm, no build step, no server needed.

---

## How to Use

### Browsing the Menu
- Scroll down past the hero banner to see the full drink menu
- Each card shows the drink name, a short description, and the price

### Adding Items to Cart
- Click the **"Add to Cart"** button on any drink card
- The cart icon in the top-right will show a badge with the total number of items

### Managing Your Cart
- Click the **cart icon** (top right) to open the cart sidebar
- Use the **+** and **−** buttons to change quantities
- Click the **✕** button next to any item to remove it entirely
- The subtotal updates automatically

### Placing an Order
- Review your items and total in the cart panel
- Click **"Place Order"**
- A confirmation screen will appear with your full order summary and a thank-you message
- Click **"New Order"** to reset and start again

---

## Menu Items

| # | Item | Description | Price |
|---|------|-------------|-------|
| 1 | Espresso | Rich and bold double shot | ₹120 |
| 2 | Cappuccino | Espresso with steamed milk foam | ₹160 |
| 3 | Latte | Smooth espresso and creamy milk | ₹170 |
| 4 | Cold Brew | Slow-steeped, served over ice | ₹180 |
| 5 | Flat White | Velvety microfoam espresso | ₹165 |
| 6 | Matcha Latte | Ceremonial grade matcha with oat milk | ₹190 |
| 7 | Mocha | Espresso with chocolate and steamed milk | ₹175 |
| 8 | Americano | Espresso diluted with hot water | ₹130 |
| 9 | Caramel Macchiato | Vanilla, milk, espresso, caramel drizzle | ₹195 |
| 10 | Hot Chocolate | Rich cocoa with whipped cream | ₹150 |

---

## Cart & Ordering System

The cart is powered entirely by JavaScript with no external libraries. Here's how it works internally:

- **Cart state** is stored in a JavaScript object (`cartItems`) in memory
- When you add an item, it either creates a new entry or increments the quantity of an existing one
- The cart UI re-renders every time the state changes
- When an order is placed, the cart state is cleared and a confirmation view is shown
- There is no backend — orders are not saved or sent anywhere (see Future Improvements)

---

## Future Improvements

Here are ideas to extend the project further:

- **Search & Filter** — Filter drinks by category (Hot, Cold, Non-Coffee)
- **Backend Integration** — Connect to a simple Node.js or Firebase backend to actually save orders
- **User Accounts** — Let users sign in and view their order history
- **Admin Panel** — A hidden page to add/edit/remove menu items without touching the code
- **Loyalty Points** — Award points per order that users can redeem for discounts
- **Dark Mode** — A toggle to switch between light (cream) and dark (espresso) themes
- **Animations** — Add item-to-cart animation with a flying card effect
- **Payment Integration** — Connect Razorpay or Stripe for real payment processing
- **PWA Support** — Make it installable as a mobile app with offline caching

---

## License

This project is free to use for personal and educational purposes. Feel free to modify, extend, and make it your own.

---

> *"Life is too short for bad coffee."* — Brew & Co

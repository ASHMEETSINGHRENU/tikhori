# Tikhori Foods — Bilingual Masala Brand Website + Admin Panel

A modern, responsive full-stack MERN web application for **Tikhori Foods** (*Spice Crafted Right*), featuring an editorial brand storefront, dynamic bilingual (English / Hindi) CMS, and an authenticated Admin Management Suite.

---

## 🌶️ Brand Overview

* **Brand Name:** Tikhori Foods
* **Tagline:** *Spice Crafted Right* (स्वाद और शुद्धता का सही संगम)
* **Pillars:** 100% Organic, Zero Added Flavours & Colours, Chemical Free, Stemless Chilli, Women Empowerment & Grassroots Micro-Enterprises.

---

## 🚀 Tech Stack

### Frontend
* **React 18** with functional components and modern hooks
* **Tailwind CSS** with custom warm ivory, deep forest green, and turmeric amber palette
* **React Router v6** with protected admin route guards and scroll restoration
* **Lucide React** for clean, modern iconography
* **React Hook Form** for form validation
* **Axios** with automatic JWT bearer token interceptors

### Backend
* **Node.js & Express.js**
* **MongoDB & Mongoose**
* **JWT (JSON Web Tokens)** for role-based authentication
* **bcryptjs** for salted password hashing
* **Multer** for local file/image upload management
* **Slugify** for URL-friendly product slugs

---

## 📁 Project Architecture

```text
Tikhori/
├── Assets/                 # Provided brand & product packaging imagery
│   ├── logo/logo.png
│   └── products/
│       ├── product-1.png   (Red Chilli Powder / लाल मिर्च पाउडर)
│       ├── product-2.png   (Turmeric Powder / हल्दी पाउडर)
│       ├── product-3.png   (Coriander Powder / धनिया पाउडर)
│       └── product-4.png   (Kaala Masala / काला मसाला)
├── client/                 # Vite + React + Tailwind Frontend
│   ├── public/assets/      # Copied static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # Navbar, Footer, LanguageSwitcher, Badge
│   │   │   ├── public/     # Hero, BrandTrust, ProductCard, WhyTikhori, Empowerment, etc.
│   │   │   └── admin/      # AdminLayout, AdminRoute
│   │   ├── context/        # AuthContext, LanguageContext (Bilingual engine)
│   │   ├── pages/
│   │   │   ├── public/     # HomePage, ProductsPage, ProductDetailPage, Empowerment, About, Contact
│   │   │   └── admin/      # AdminLogin, Dashboard, Products, Users, Banners, CMS, Enquiries, Settings
│   │   └── services/       # Axios API client
├── server/                 # Express + Mongoose REST API
│   ├── src/
│   │   ├── config/         # db.js, multer.js
│   │   ├── controllers/    # auth, product, user, entrepreneur, banner, content, contact, setting
│   │   ├── middleware/     # authMiddleware, errorHandler
│   │   ├── models/         # Admin, User, Product, Entrepreneur, Banner, Content, Enquiry, Setting
│   │   ├── routes/         # Express routers
│   │   ├── utils/seed.js   # Automated seed script
│   │   └── server.js       # Main server entrypoint
│   └── uploads/            # Multer upload directory
├── .env.example
├── package.json            # Monorepo root orchestrator
└── README.md
```

---

## ⚡ Quick Start & Development

### 1. Prerequisites
* **Node.js**: v18+ (tested on Node v22.13.0)
* **MongoDB**: Running locally on `mongodb://127.0.0.1:27017/tikhori_foods` or MongoDB Atlas URI

### 2. Environment Setup
The server reads configuration from `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/tikhori_foods
JWT_SECRET=tikhori_secret_key_super_secure_jwt_2026_masala
ADMIN_NAME=Tikhori Administrator
ADMIN_EMAIL=admin@tikhorifoods.com
ADMIN_PASSWORD=Tikhori@Admin2026
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database with Initial Flagship Data
Populates the database with the 4 flagship products, bilingual CMS content sections, sample women entrepreneur stories, promotional banners, and default admin credentials:
```bash
npm run seed
```

### 4. Run Concurrently (Client + Server)
From the root directory:
```bash
npm run dev
```
* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 🔐 Admin Panel Credentials

* **URL:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
* **Email:** `admin@tikhorifoods.com`
* **Password:** `Tikhori@Admin2026`

---

## 🌐 Bilingual Architecture

Content is structured in MongoDB as bilingual objects:
```json
{
  "name": {
    "en": "Red Chilli Powder",
    "hi": "लाल मिर्च पाउडर"
  }
}
```
The client's `LanguageContext` provides a reactive `t()` accessor:
```jsx
const { t } = useLanguage();
<h1>{t(product.name)}</h1>
```
Switching between `EN` and `हिंदी` in the header or footer updates all text, navigation links, and product specifications instantly.

---

## 📡 REST API Summary

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | GET | Public | Health check |
| `/api/products` | GET | Public | Active products list |
| `/api/products/slug/:slug` | GET | Public | Single product details |
| `/api/products/admin/all` | GET | Admin | All products including inactive |
| `/api/products/admin` | POST | Admin | Create product (with Multer file upload) |
| `/api/products/admin/:id` | PUT | Admin | Update product |
| `/api/products/admin/:id` | DELETE | Admin | Delete product |
| `/api/auth/register` | POST | Public | Customer registration (username, email, password) |
| `/api/auth/user-login` | POST | Public | Customer login (email, password) |
| `/api/auth/user-me` | GET | User | Current authenticated user profile |
| `/api/auth/login` | POST | Public | Admin login & returns JWT |
| `/api/users` | GET / POST | Admin | Manage client/registered user accounts |
| `/api/entrepreneurs` | GET | Public | Active women entrepreneur profiles |
| `/api/entrepreneurs/admin` | POST / PUT | Admin | Manage entrepreneur profiles with photo |
| `/api/banners` | GET | Public | Active promotional banners |
| `/api/banners/admin` | POST / PUT | Admin | Manage campaign banners |
| `/api/content` | GET | Public | CMS marketing content for all sections |
| `/api/content/:section` | PUT | Admin | Update section CMS content |
| `/api/contact` | POST | Public | Submit customer / wholesale inquiry |
| `/api/contact/admin/all` | GET | Admin | View & filter enquiries |
| `/api/settings` | GET / PUT | Mixed | View / Update brand settings |

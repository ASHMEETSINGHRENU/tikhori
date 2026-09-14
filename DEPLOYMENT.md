# Tikhori Foods — Production Deployment Guide

This repository is structured as a clean, production-ready monorepo:

```
Tikhori/
├── client/           # React + Vite + Tailwind CSS frontend
├── server/           # Express.js + Mongoose + JWT REST API
├── Assets/           # Packaging graphics & brand logos
├── package.json      # Monorepo orchestration scripts
└── .env.example      # Environment variables template
```

---

## 1. Recommended Deployment Architecture

### **Option A: Decoupled Cloud Hosting (Best Performance & Industry Standard)**
* **Frontend (`client/`):** Deploy to **Vercel** or **Netlify** (Free tier, Global Edge CDN, automatic SSL, instant preview deployments).
* **Backend (`server/`):** Deploy to **Render**, **Railway**, or **Fly.io** (Node.js runtime with zero-downtime deploys).
* **Database:** **MongoDB Atlas** (Free tier M0 sandbox or serverless cluster).

#### Why this is best:
1. **Global CDN Edge**: High-resolution packaging graphics, CSS, and JS bundles are cached and served from edge nodes closest to the user.
2. **Independent Scaling**: Public storefront traffic will never strain the Node.js API process.
3. **Cost Effective**: 100% free to get started on Vercel + Render + MongoDB Atlas.

---

### **Option B: All-in-One Monolith (Single Web Service)**
* Deploy the entire repository as a single service on **Render**, **Railway**, or **DigitalOcean App Platform**.
* The Express server serves both the **REST API** (`/api/*`) and the **compiled React frontend** (`client/dist`) on a single port.
* **Benefits:** Single URL, no cross-origin (CORS) setup required.

---

## 2. Step-by-Step Deployment Instructions

### Step 1: Set Up MongoDB Atlas (Cloud Database)
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free **M0 cluster** in your nearest region (e.g. `ap-south-1` Mumbai).
3. Under **Database Access**, create a user (e.g. `tikhori_admin`) with read/write privileges.
4. Under **Network Access**, add IP address `0.0.0.0/0` (Allow access from cloud services).
5. Click **Connect** -> **Drivers** -> Copy your Connection String:
   ```text
   mongodb+srv://tikhori_admin:<password>@cluster0.abcde.mongodb.net/tikhori_foods?retryWrites=true&w=majority
   ```

---

### Step 2: Deploy Backend (`server/`) on Render / Railway

#### On Render.com:
1. Create a **New Web Service** and connect your GitHub repository.
2. Configure settings:
   * **Root Directory:** Leave empty (or `server`)
   * **Build Command:** `npm install --prefix server`
   * **Start Command:** `npm start --prefix server`
3. Add Environment Variables:
   * `NODE_ENV` = `production`
   * `PORT` = `5000`
   * `MONGODB_URI` = *Your MongoDB Atlas connection string*
   * `JWT_SECRET` = *A secure 32+ character random string*
   * `CLIENT_URL` = *Your frontend Vercel/Netlify URL (e.g. https://tikhorifoods.vercel.app)*
   * `ADMIN_EMAIL` = `admin@tikhorifoods.com`
   * `ADMIN_PASSWORD` = *Your master admin password*
4. Click **Deploy Web Service**.
5. Once deployed, note down your backend URL (e.g. `https://tikhori-api.onrender.com`).

---

### Step 3: Seed Production Database
Once your backend is connected to MongoDB Atlas, run the seed script once to populate products, brand settings, and initial CMS content:

```bash
# In server/.env, set MONGODB_URI to your Atlas connection string, then run:
npm run seed
```
*Result: Automatically seeds the 4 flagship masalas, CMS sections, settings, and master administrator account.*

---

### Step 4: Deploy Frontend (`client/`) on Vercel / Netlify

#### On Vercel:
1. Click **Add New Project** and select your Tikhori repository.
2. Configure build settings:
   * **Framework Preset:** Vite
   * **Root Directory:** `client`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
3. Add Environment Variable:
   * `VITE_API_URL` = `https://tikhori-api.onrender.com/api` (Your backend URL)
4. Click **Deploy**.
5. Client-side routing is handled automatically by the included `client/vercel.json`!

---

## 3. Environment Variables Reference

### Backend (`server/.env` or Cloud Environment Variables)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for Express API | `5000` |
| `MONGODB_URI` | MongoDB Connection String | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWTs | `tikhori_prod_jwt_secret_2026...` |
| `CLIENT_URL` | Allowed CORS frontend origin | `https://tikhorifoods.vercel.app` |
| `ADMIN_EMAIL` | Default seed admin email | `admin@tikhorifoods.com` |
| `ADMIN_PASSWORD`| Default seed admin password | `Tikhori@Admin2026` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend (`client/.env` or Cloud Environment Variables)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Backend REST API endpoint | `https://tikhori-api.onrender.com/api` |

# YAMI NATURALS — B2B Standardized Botanical Extracts Platform

An enterprise-grade, high-performance web platform and administration portal for **YAMI NATURALS**, a premier B2B manufacturer and global exporter of pharmacopoeial standardized botanical extracts, custom phytochemical granules, and private-label nutraceutical formulations.

---

## 🌿 Overview

* **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router v6.
* **Backend:** Node.js, Express, TypeScript, REST API, Multer (secure uploads), Rate Limiting, Helmet, Anti-Spam protection.
* **Database & Auth:** Google Firebase Authentication (Admin role-based access control) + Cloud Firestore (with automated seed data and JSON fallback).
* **Architecture:** Enterprise B2B catalog, interactive 6-stage manufacturing lifecycle, dynamic RFQ generator, technical dossier download engine (COA/TDS/MSDS), and a full-featured admin management console.

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.x or 20.x+
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yaminaturals/Website1.git
   cd Website1
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   cd ..
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` in the root (or configure client/server `.env` files with your Firebase credentials).

4. **Run in Development Mode:**
   ```bash
   # Start backend API (Port 5000)
   cd server
   npm run dev

   # In a separate terminal, start frontend (Port 3000)
   cd client
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   # Build frontend
   cd client
   npm run build

   # Build backend
   cd ../server
   npm run build
   ```

---

## 🔒 Security & Admin Features

* **Admin Authentication:** Protected route `/admin` secured with Firebase Auth JWT verification.
* **Security Hardening:** Honeypot anti-spam validation on public forms, rate-limiting on sensitive endpoints, MIME-type and file-size restrictions on uploads.
* **Firestore Security Rules:** Comprehensive `firestore.rules` and `storage.rules` included.

---

## 📄 License

Proprietary © YAMI NATURALS. All rights reserved.

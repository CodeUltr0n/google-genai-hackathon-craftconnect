# Bharatiya Bazaar 🇮🇳
[![Hackathon](https://img.shields.io/badge/Google%20GenAI-Hackathon-blue)](#)
[![License](https://img.shields.io/badge/License-MIT-green)](#)
[![Frontend](https://img.shields.io/badge/React-Vite-informational)](#)

**An AI-Powered Marketplace for Artisans (Frontend Prototype)**  
A **React.js frontend prototype** built to showcase the UI/UX and core features of Bharatiya Bazaar.  
This is a submission for the **Google Gen AI Exchange Hackathon**.  

> ⚠️ **Note:** This is the **frontend prototype**. AI assistant features and payment flows are functional **using mock data**. Full production will connect these features to the backend, database, and live APIs.
---

![Team Page 3](https://github.com/user-attachments/assets/ffb6a943-2e12-4681-9f0c-7f8435ecc9ef)

## Live Demo
Check out the live demo here: [Bharatiya Bazaar Live](https://bharatiya-bazaar-ketan-chokkaras-team.onrender.com/)

## 🎥 Demo Video
[![Watch the demo](<img width="1274" height="798" alt="Screenshot 2025-09-21 at 5 37 00 PM" src="https://github.com/user-attachments/assets/66f137de-6ee8-4e0e-8515-64e11323fddd" />
)](https://drive.google.com/file/d/1l2YB4fGg2HDMdsr_5tKENkF--qdKYze8/view)

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── App.css                # Global styles
│   ├── App.jsx                # Root component
│   ├── index.css              # Base styles
│   ├── main.jsx               # Application entry point
│   ├── assets/                # Static resources
│   │   ├── animations/        # Lottie animation JSON files
│   │   ├── images/            # All images (art, jewelry, pottery, etc.)
│   │   └── videos/            # Video assets
│   ├── bottom/                # Tradition-related components
│   ├── components/            # Reusable UI components
│   │   ├── checkout/          # Checkout & Payment components
│   │   ├── chatbot/           # Chatbot component
│   │   ├── header/            # Header component
│   │   ├── hero/              # Hero section
│   │   ├── orders/            # Order confirmation page
│   │   └── ...                # Other shared UI (AboutPage, Auth, Sidebar, etc.)
│   ├── features/              # Feature-specific modules
│   │   ├── components/        # Category & product listing components
│   │   ├── customer-dashboard # Customer-side dashboard (cart, favorites, messages, etc.)
│   │   └── seller-dashboard   # Seller-side dashboard (analytics, growth assistant, products, etc.)
└── vite.config.js             # Vite configuration
```

## Home Page 

![Home Page](https://github.com/user-attachments/assets/3445d4a5-7f3a-4f84-8083-5ce6f83ecf16)

## Shop Page 
![Shop Page](https://github.com/user-attachments/assets/280b8b80-2682-42a4-b33d-8fbd66445fdb)

## Product Page
![Product Page](https://github.com/user-attachments/assets/28ccebd5-a083-4404-b852-edac9079fcd0)

## Seller Dashboard 
![Seller Page](https://github.com/user-attachments/assets/a836b0ba-73d1-4259-9569-7fea6e03b91e)

## Ai Growth assistant for Sellers
![Seller Page](https://github.com/user-attachments/assets/3a8310ee-b307-450e-a6a8-73353eac26ab)

## Payment Gateway's and Order Confirmation 

![Add to Cart Page](https://github.com/user-attachments/assets/b16f5392-fb35-4a9c-9cc4-60e6b1cd1e17)

![Order Page](https://github.com/user-attachments/assets/9ed69400-5f73-4bec-b59e-229cd449915a)

![Receipt Page](https://github.com/user-attachments/assets/30c0aff3-aae7-4601-a5e5-5b720b30ccbe)



## Team Details 

![Team Page 1](https://github.com/user-attachments/assets/e43d3c27-b0bf-45cd-903e-2513101d1f29)

![Team Page 2](https://github.com/user-attachments/assets/ec3c473c-ffb9-4c29-a6c6-e9bee75f6526)

![Team Page 4](https://github.com/user-attachments/assets/68b60f2d-e585-487f-b944-8e2ca3657a02)

---

## ✨ Vision
Bharatiya Bazaar aims to **digitally empower India's local artisans** by providing a beautiful, AI-driven marketplace.  

Even in this prototype, the focus is on:  
- Displaying a rich catalog of Indian crafts  
- Creating an immersive, interactive shopping experience  
- Demonstrating the AI Growth Assistant UI  

---

## 🚀 Key Features (Frontend Prototype)

### 1️⃣ Interactive & Immersive Marketplace
- **Dynamic Product Grid:** Browse a visually-rich catalog of products.  
- **Shop by Region Filter:** Filter crafts based on their geographical origin.  
- **Detailed Product Pages:** Placeholder UI for descriptions, pricing, and artisan info.  

![Shop Page](https://github.com/user-attachments/assets/280b8b80-2682-42a4-b33d-8fbd66445fdb)


---

### 2️⃣ Seller Hub (Frontend UI)
- **Product Management UI:** Table layout to view inventory.  
- **Add New Crafts Modal:** Form design for adding products.  
- **Responsive UI:** Dynamic updates simulated for frontend demo.  

![Seller Hub Screenshot](https://github.com/user-attachments/assets/d4598894-f970-4697-9444-9cb84943f626)

---

### 3️⃣ AI Growth Assistant 🧠
- **Customer AI Chat UI:** Context-aware chat interface for product pages.  
- **Seller AI Chat UI:** Business assistant UI in seller dashboard.  
- **Future Scope:** Ready-to-integrate full AI functionality for marketing, pricing, and optimization suggestions.  

![AI Assistant Screenshot](https://github.com/user-attachments/assets/a4ee5195-cfea-418a-81c6-afd23769aaaf)

---

## 🛠️ Tech Stack (Frontend Prototype)
- **Framework:** React.js (Vite)  
- **Styling:** Tailwind CSS  
- **Routing:** React Router DOM  
- **State Management:** React Context / Hooks  
- **UI Enhancements:** Custom CSS animations, responsive design  
- **Deployment:**Render 

> ⚠️ Backend, database, payments, and AI integrations are **not included in this prototype**.

---

## 🏆 Hackathon Submission
This frontend prototype is submitted for the Google Gen AI Exchange Hackathon, demonstrating UI/UX and core features of Bharatiya Bazaar.

## 💡 Future Improvements (Frontend + Full Stack)
- Connect frontend to **Node.js backend**  
- Integrate **MongoDB** for real data  
- Implement **Google Gemini AI** for AI assistant features  
- Integrate **own LLM model with Gemini/Vertex AI** for **precise AI outputs across the platform**  
- Add **Razorpay** for payment functionality  
- Enhance **analytics & reporting** for sellers  

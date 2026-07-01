# HireLens AI - AI-Powered Resume Intelligence Platform

HireLens AI is an advanced, production-ready AI-powered resume intelligence platform designed for Software Engineers and professionals to clear the recruitment ATS (Applicant Tracking System) gate with surgical precision. 

Rather than basic keyword matching, HireLens AI uses a state-of-the-art **Retrieval-Augmented Generation (RAG)** pipeline to contextually chunk and embed resumes, selectively retrieving high-dimensional matches against target job descriptions to feed into the Google Gemini intelligence model.

---

## 🌟 Key Features

* **Circular ATS Score Visualizer**: Dynamic animated scoreboards mapping Overall, Skills, Experience, Projects, Keyword density, and Document formatting.
* **Semantic RAG Engine**: Indexes PDF resume segments, generates embeddings with `gemini-embedding-2-preview`, indexes them locally via a Cosine Similarity matrix, and sends matching vectors to `gemini-3.5-flash`.
* **Bullet Point Upgrade Center**: Quantifies achievements, upgrades passive verbs, and compares original resume bullets with AI-suggested rewrites.
* **Interactive Interview Coach**: Custom behavioral and technology questions tailored to candidate profiles, featuring animated expand/collapse ideal response guides.
* **Secure Auth Gateway**: Full JWT-based registration, login, and secure session management.
* **Robust Theme Control**: Seamless animated toggles between a stunning deep galactic dark theme and a clean corporate light theme.

---

## 🛠️ Tech Stack

* **Frontend**: React, Vite, Tailwind CSS, React Router DOM, Recharts, Framer Motion (`motion/react`)
* **Backend**: Node.js, Express.js, JWT Authentication, Multer, `pdf-parse` (pure Node PDF extractor), Helmet, Cors
* **AI Model**: Google Gemini (`gemini-3.5-flash` for scoring, `gemini-embedding-2-preview` for high-dimensional vector embeddings)

---

## 🏗️ Architecture & RAG Pipeline

```
Resume PDF Upload ➔ Text Parsing (pdf-parse) ➔ Text Chunking (600w / 150w overlap) 
  ➔ Vector Embeddings (gemini-embedding-2-preview) ➔ Local Memory Vector Store
  ➔ Job Description Embedding ➔ Cosine Similarity Matrix (Top 4 Chunks)
  ➔ Context Prompt Assembly ➔ Gemini LLM Generation ➔ ATS Reports JSON payload
```

---

## 📁 Project Directory Structure

```
client/
  src/
    components/      # Reusable UI (Toast alerts, Theme toggles)
    context/         # State hooks (Auth sessions)
    pages/           # Page hubs (Landing page, Auth page, Dashboard, Report detail)
    services/        # Axios API fetch rules
    index.css        # Tailwind imports & typography
    App.jsx          # Router wrapping & Protected routes
    main.jsx         # App mounting
server/
  src/
    config/          # Database persistent engines & model definitions
    controllers/     # Request handles (auth, analyze, history)
    middleware/      # Token decoders
    routes/          # Endpoint router groups
    services/        # AI & RAG retrieval managers
    app.js           # Security middleware (Helmet, Cors, Vite development integration)
    server.js        # Port binding & server start
```

---

## 🚀 Quick Local Run Instructions

### 1. Configure Environment Credentials

Create a `.env` file at the root of the project:

```env
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="your-custom-jwt-signing-secret"
```

### 2. Launch Dev server

Install dependencies and run the server:

```bash
npm install
npm run dev
```

* The server automatically mounts **Vite dev middleware** on port `3000`. Open `http://localhost:3000` to start scanning!

---

## 🔮 Future Expansion Scope

* **Multilingual Parsing**: Supporting multi-character PDF language structures natively.
* **Relational Database Migration**: Mapping JSON-file repositories into hosted MongoDB Atlas or Cloud SQL tables.
* **Google Docs Integration**: Fetching resume templates directly from candidate Drive folders via Workspace OAuth APIs.

# HireNest Placements

HireNest Placements is a production-ready, executive recruitment consultancy web application built using a modern single-page application (SPA) React frontend and an Express.js / MongoDB database backend.

---

## 1. Project Directory Structure
- **`/frontend`**: React client powered by Vite and Tailwind CSS.
- **`/backend`**: Express.js REST API server with Mongoose schemas and Nodemailer integrations.

---

## 2. Core Functional Mandates
- **Executive Home page & About us**: Preserves custom Stitch layout aesthetics, HSL color tokens, micro-interactions, statistics counters, and testimonial blocks.
- **Dynamic Careers Openings**: Queries active roles from the backend database with instant local search filtering.
- **Detailed Position Profiles**: Page routes `/jobs/:id` display full job descriptions, responsibilities, requirements, and benefits lists.
- **Application Validations & Duplication Checks**: The resume submission form checks size and formats (PDF/Word) and blocks duplicate submissions by checking email + target position.
- **Automated Emailing**: Nodemailer utility dispatches confirmation receipts to candidates and alerts the company inbox with details.
- **Administrative Portal**: Path `/admin` exposes Candidate management (search, filter, status change patching), Inquiry records lists, and Job management (creation, details editing, disable toggling).

---

## 3. Quick Local Setup

### Prerequisite
Ensure a local instance of MongoDB is active at `mongodb://127.0.0.1:27017/`.

### Run Backend
1. Go into the backend directory:
   ```bash
   cd backend
   ```
2. Setup variables in a `.env` file (reference `.env.example`).
3. Seed default job postings:
   ```bash
   npm run seed
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

### Run Frontend
1. Go into the frontend directory:
   ```bash
   cd frontend
   ```
2. Start development Vite compiler:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173/` in your browser.

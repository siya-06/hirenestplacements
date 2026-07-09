# HIRENEST PLACEMENTS PRIVATE LIMITED

HIRENEST PLACEMENTS PRIVATE LIMITED is a premium, corporate-grade executive recruitment consultancy web application built using a modern React frontend and an Express.js / MongoDB database backend.

---

## 1. Project Directory Structure
- **`/frontend`**: React client powered by Vite, Tailwind CSS, and custom theme tokens.
- **`/backend`**: Express.js REST API server with Mongoose schemas and Brevo HTTP API integrations.

---

## 2. Core Functional Mandates
- **Branding & Theme**: Standardized branding using `HIRENEST` and themed with a premium corporate navy color scheme inspired by corporate directories (Deloitte, KPMG, IBM).
- **Hero & Copy Refinement**: Restructured the home hero with a 45% image / 55% text split layout utilizing a local roundtable team meeting photo, faint grid patterns, and professional positioning statements.
- **Dynamic Careers Openings**: Queries active roles from the backend database with instant local search filtering.
- **Detailed Position Mandates**: Page routes `/jobs/:id` display full job descriptions, responsibilities, requirements, and benefits lists.
- **Recruitment Process Section**: Interactive roadmap tracing Understand Requirements ➔ Source Talent ➔ Screen Candidates ➔ Assess Skills ➔ Shortlist ➔ Interview Coordination ➔ Selection ➔ Joining Support.
- **FAQ Collapsible Accordion**: Collapsible list of frequently asked questions using a clean React accordion component (single expanded state).
- **Application Validations & Duplication Checks**: The resume submission form checks size and formats (PDF/Word/Excel) and blocks duplicate submissions by checking email + target position.
- **Brevo HTTP API Emailing**: Integrates Brevo's HTTPS API over port 443 (avoiding Render's outbound SMTP port blocking) to dispatch confirmation receipts to candidates and alerts to the company inbox with Reply-To support mapping back to candidates/inquirers.
- **Administrative Portal**: Path `/admin` exposes Candidate management (search, filter, status patching, and permanent profile deletion), Inquiry records lists (reviewed toggle), and Job management (creation, details editing, deletion). Includes an inline **Google Docs Viewer Resume Preview** modal for recruiters to preview DOC, DOCX, and PDF resumes.

---

## 3. Quick Local Setup

### Prerequisite
Ensure a local instance of MongoDB is active at `mongodb://127.0.0.1:27017/`.

### Run Backend
1. Go into the backend directory:
   ```bash
   cd backend
   ```
2. Setup variables in a `.env` file (reference `.env.example` to configure `BREVO_API_KEY` and `SENDER_EMAIL`).
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

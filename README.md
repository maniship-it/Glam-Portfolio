# 💄 Puja Glam – Makeup Artist Portfolio

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?color=F78DA7&size=28&center=true&vCenter=true&width=600&lines=Elegant+Makeup+Portfolio+Website;Modern+UI+%2B+Responsive+Design;Built+with+HTML+CSS+JS" />
</p>

---

## 🚀 Live Demo

🔗 https://www.pujaglam.com/

---

## 🧰 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,bootstrap,git,github,vscode" />
</p>

---

## 🏷️ Badges

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/github/stars/maniship-it/Glam-Portfolio?style=for-the-badge" />
  <img src="https://img.shields.io/github/forks/maniship-it/Glam-Portfolio?style=for-the-badge" />
</p>

---

## ✨ Features

* Elegant beauty-focused UI
* Fully responsive design
* Makeup portfolio gallery
* Smooth scrolling experience
* Clean and minimal layout
* Fast loading static website

---

## 📁 Project Structure

```bash
Glam-Portfolio/
│
├── index.html
├── css/
├── js/
├── images/
└── README.md
```

---

## ⚙️ Deployment Workflow

```bash
Edit Code
   ↓
Git Commit
   ↓
Push to GitHub
   ↓
Vercel Auto Deploy
   ↓
Live Website Updated
```

---

## 🤖 AI Chat Assistant

The floating "Aditi" chat widget posts to `POST /api/chat` on the same origin.
That endpoint is implemented once in `server/chat.js` and exposed by two entry points:

| Deployment | Entry point |
| --- | --- |
| Vercel (serverless) | `api/chat.js` |
| Express (`npm run dev` / `npm start`) | `server/routes.ts` |

Both need a Groq API key in the environment — without it the widget falls back to
a "contact us on WhatsApp" message:

```bash
# .env (local) or project environment variables (Vercel)
GROQ_API_KEY=your_groq_api_key
```

The assistant's persona, services and canonical contact details live in
`server/trainingData.js` (`BUSINESS_CONTEXT`).

> **Note:** a static-only host cannot serve `/api/chat`. Deploy to Vercel (or run the
> Express server) so the API route exists.

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=maniship-it&show_icons=true&theme=radical" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=maniship-it&theme=radical" />
</p>

---

## 📈 Activity Graph

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=maniship-it&theme=react-dark" />
</p>

---

## 👨‍💻 Author

**Tinku Kumar**
BSc Computer Science
Frontend Developer

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

## 🔮 Future Improvements

* Online booking system
* Instagram integration
* Testimonials slider
* SEO optimization
* Admin dashboard

---

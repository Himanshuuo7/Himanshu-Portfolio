# Himanshu — Portfolio Website

A modern, premium personal portfolio built with **React + Vite**, featuring Three.js particle animations, Framer Motion transitions, and a custom cursor — all in a minimal dark theme.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.x  
- **npm** >= 9.x (or pnpm / yarn)

### 1. Install dependencies

```bash
cd himanshu-portfolio
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

The output is in the `dist/` folder — ready to deploy to Vercel, Render, Netlify, or GitHub Pages.

### 4. Preview production build locally

```bash
npm run preview
```

---

## 📁 Project Structure

```
himanshu-portfolio/
├── index.html                  # HTML entry point (Google Fonts loaded here)
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS with custom tokens
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Root component (loader + layout)
    ├── index.css               # Global styles, custom cursor, scrollbar
    ├── components/
    │   ├── Loader.jsx          # Awwwards-style animated intro loader
    │   ├── Cursor.jsx          # Custom glowing mouse follower
    │   ├── Navbar.jsx          # Sticky nav with active section highlight
    │   ├── ThreeBackground.jsx # Three.js particle field (hero background)
    │   ├── SectionHeading.jsx  # Reusable animated section title
    │   └── Footer.jsx          # Footer with social links
    └── sections/
        ├── Home.jsx            # Hero section
        ├── About.jsx           # About me + stats
        ├── Skills.jsx          # Skill cards with category filter
        ├── Projects.jsx        # Project cards with tilt + links
        └── Contact.jsx         # Contact form + social links
```

---

## ✏️ Customization

### Personal Info
- **Name / Role**: Edit `src/sections/Home.jsx` and `src/components/Navbar.jsx`
- **About text**: Edit `src/sections/About.jsx`
- **Stats** (years, projects): Edit the `stats` array in `About.jsx`

### Photo
Replace the image placeholder in `About.jsx`:
```jsx
// Replace the placeholder <div> with:
<img src="/your-photo.jpg" alt="Himanshu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
```
Put your photo in the `public/` folder.

### Projects
Edit the `projects` array in `src/sections/Projects.jsx` — update title, description, tech stack, GitHub URL, and live URL.

### Skills
Edit the `skills` array in `src/sections/Skills.jsx` — add or remove skills. Each skill needs: `name`, `icon` (from react-icons), `color` (hex), and `category`.

### Social Links
Update GitHub, LinkedIn, and email links in:
- `src/sections/Contact.jsx` → `socials` array
- `src/components/Footer.jsx`

### Colors
The two main colors are defined as Tailwind tokens in `tailwind.config.js`:
```js
navy: '#0F172A'   // dark background
sky:  '#38BDF8'   // blue accent
```
Change them here to retheme the entire site.

---

## 📦 Dependencies

| Package          | Purpose                          |
|------------------|----------------------------------|
| `react`          | UI framework                     |
| `react-dom`      | DOM rendering                    |
| `framer-motion`  | Animations & transitions         |
| `three`          | 3D particle background (hero)    |
| `react-icons`    | Skill & UI icons                 |
| `tailwindcss`    | Utility-first CSS                |
| `vite`           | Build tool & dev server          |

---

## 🌐 Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

---

## 📝 Notes

- The **contact form** currently simulates a submission (1.5s delay then success). To wire it to a real backend, replace the `await new Promise(...)` in `Contact.jsx` `handleSubmit` with your actual API call (e.g. EmailJS, Resend, or your own Node.js endpoint).
- **Three.js** is performance-optimized: uses `AdditiveBlending`, disables depth writing, and caps pixel ratio at 2.
- **Custom cursor** is automatically hidden on touch devices via `@media (pointer: coarse)`.

---

Built with ❤️ by Himanshu

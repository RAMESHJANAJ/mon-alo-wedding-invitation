# অনিন্দিতা ও মনোজিৎ — শুভ বিবাহ ও বৌভাত (Wedding Invitation Website)

A modern, responsive, glassmorphism-themed Bengali wedding invitation website for **Manojit & Anindita (মনোজিৎ ও অনিন্দিতা)**.

## ✨ Features
- **Glassmorphism UI:** Ultra-modern frosted glass panels (`backdrop-filter: blur`), subtle golden specular borders, and soft diffuse ambient glows.
- **Authentic Bengali Palette:**
  - Background Cream / Off White (`#F7F2EB`)
  - Deep Maroon Text (`#5A1217`)
  - Primary Maroon (`#751820`)
  - Antique Brass Gold (`#C69A41`) & Rich Gold (`#D3AB47`)
  - Royal Crimson Buttons (`#B61414` to `#751820`)
- **Interactive Bengali Components:**
  - Dynamic live countdown timer in Bengali numerals (দিন, ঘণ্টা, মিনিট, সেকেন্ড)
  - Interactive Google Maps for both **বিবাহস্থল** (Wedding Venue) and **বৌভাতস্থল** (Reception Venue) with direct direction links
  - Calendar integration (`.ics` downloads for Google Calendar, Apple Calendar, and Outlook)
  - Interactive photo gallery with full-screen frosted glass lightbox
  - Background music player with "খুকুমণির বে (Khukumonir Be)" audio
  - Smooth floating navigation with section spy highlight

## 🚀 How to Run Locally
Open `index.html` directly in any web browser, or start a local server:
```bash
node server.js
```
Then visit: `http://localhost:8080/`

## 📁 Project Structure
```
├── index.html       # Main webpage entry point
├── style.css        # Glassmorphic responsive stylesheet
├── app.js           # Interactive scripts (countdown, audio player, lightbox, calendar)
├── server.js        # Lightweight Node.js local web server
├── assets/          # Artwork, borders, motifs, seal, and couple illustrations
├── fonts/           # Custom Bengali unicode fonts (Noto Serif, Lipi Mollika, Li Alinur)
├── images/          # Photo gallery moments
└── music/           # Traditional background audio (Khukumonir Be)
```

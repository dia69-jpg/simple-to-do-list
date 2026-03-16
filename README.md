# simple-to-do-list
to do list  
<div align="center">
 
# ✦ My To-Do List
 
**A minimal, elegant to-do app — no frameworks, no fluff. Just HTML, CSS & JavaScript.**
 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-4f46e5?style=for-the-badge&logo=github)](https://dia69-jpg.github.io/simple-to-do-list/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Persistent-10b981?style=for-the-badge)
 <img width="1899" height="883" alt="image" src="https://github.com/user-attachments/assets/8464c99c-b41d-43c5-8066-b16f5107cd35" />

</div>
 
---
 
## 📋 About
 
A clean, distraction-free to-do list app built entirely with vanilla web technologies.  
Tasks are saved automatically to `localStorage` — they persist between sessions without any backend or database.
 
---
 
## ✨ Features
 
- ➕ **Add tasks** — type and hit `Enter` or click the button
- ✅ **Mark as complete** — click the checkbox or the task label
- 🗑️ **Delete tasks** — smooth slide-out animation on removal
- 📊 **Live stats bar** — tracks how many tasks are completed out of total
- 🧹 **Clear completed** — remove all done tasks in one click
- 💾 **Persistent storage** — tasks survive page refresh via `localStorage`
- 🌿 **Empty state** — friendly message when the list is clear
- ⚠️ **Input validation** — shake animation when trying to add an empty task
- 📱 **Responsive** — works on all screen sizes
 
---
 
## 🛠️ Tech Stack
 
| Technology | Role |
|---|---|
| **HTML5** | Semantic structure & accessibility |
| **CSS3** | Layout, animations, responsive design |
| **JavaScript (Vanilla)** | DOM manipulation, task logic, localStorage |
| **Google Fonts** | Typography — DM Serif Display + DM Sans |
 
> Zero dependencies. Zero build steps. Open and run.
 
---
 
## 🚀 Getting Started
 
```bash
# 1. Clone the repo
git clone https://github.com/dia69-jpg/simple-to-do-list.git
 
# 2. Open in your browser
cd simple-to-do-list
open index.html
```
 
No `npm install`. No config. Just open `index.html` directly in any browser.
 
---
 
## 📁 Project Structure
 
```
simple-to-do-list/
├── index.html     # App structure & markup
├── style.css      # All styles, animations & responsive layout
└── script.js      # Task logic, localStorage, DOM rendering
```
 
---
 
## 🧠 How It Works
 
```
User types a task → handleAddTask()
  └── Validates input (shake if empty)
  └── Creates task object { id, text, completed }
  └── Pushes to tasks[] array
  └── Saves to localStorage
  └── Calls renderAll() to update the UI
 
Click checkbox / label → toggleTask(id)
  └── Flips task.completed
  └── Saves + re-renders
 
Click delete (×) → deleteTask(id, element)
  └── Triggers CSS slide-out animation
  └── On animationend → removes from array
  └── Saves + re-renders
```
 
---
 
## 📄 License
 
This project is open source and available under the [MIT License](LICENSE).
 
---
 
<div align="center">
  Made with ❤️ — Stay focused, one task at a time.
</div>

# FeedPulse - Modern Feedback Management System (FMS)

A modern, professional, and fully functional **Feedback Management System Website** designed with a beautiful blue, white, and light purple aesthetic, responsive layout, real-time analytics, and data persistence via `localStorage`.

---

## 🌟 Key Features & Requirements Matrix

| # | Module / Feature | Capabilities |
|---|---|---|
| **1** | **Modern Login Page** | Email ID & Password validation, Show/Hide Password eye toggle, Remember Me checkbox, Forgot Password modal, 1-Click Demo credential buttons, link to Signup. |
| **2** | **Signup Page** | Full Name, Email, Phone number (10 digits), Password & Confirm Password match checker, Show/Hide Password, field validations, link to Login. |
| **3** | **Interactive Dashboard** | Real-time KPI counter cards (Total, Positive 4-5★, Negative 1-2★, Average Rating), 4 interactive Chart.js graphs, Category performance breakdown table, Recent Feedbacks feed. |
| **4** | **Feedback Submission** | Full Name, Email, Category selection, Feedback Title, Interactive 1 to 5 Star Rating with dynamic hover labels, 500-char description with counter, Submit & Reset buttons, and celebratory Confetti Thank-You modal. |
| **5** | **8 Service Categories** | Product, Service, Website, Customer Support, Delivery, Application, Overall Experience, and Other. Dedicated Category Explorer with review counts and ratings. |
| **6** | **Feedback Management** | Live keyword search, Filter by Category, Filter by Star Rating (All, 1-5, Positive, Negative), Sort options (Date, Rating, Name), Edit feedback modal, Delete with confirmation, and Export to CSV download. |
| **7** | **Menu / Navigation Bar** | Responsive sidebar layout with icons for Home, Dashboard, Submit Feedback, View Feedback, Categories, About Us, Contact Us, and dynamic Login/Signup/Logout state. Mobile drawer hamburger navigation. |
| **8** | **About Us Page** | Purpose of FMS, benefits for organizations (churn reduction, NPS tracking), system architecture, and academic viva notes. |
| **9** | **Contact Us Page** | Interactive contact form with client-side validation, headquarters contact info, operating hours, social links, and an FAQ accordion. |
| **10** | **Design & Responsiveness** | Blue, white, and light purple theme (`#2563eb`, `#7c3aed`), glassmorphism touches, card shadows, smooth transitions, fully responsive for desktop, tablet, and mobile. |

---

## 🚀 Quick Start / How to Run

1. Open the project folder:
   ```
   C:\Users\sathw\.gemini\antigravity\scratch\feedback-management-system
   ```
2. Simply double-click **`index.html`** to launch it in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
3. Alternatively, launch with any local HTTP server (such as Python `python -m http.server 3000` or VS Code Live Server).

---

## 🔑 Demo Accounts for Evaluation & Review

You can easily sign in by clicking the **"Demo Login"** pill in the top header, or by clicking the quick buttons on the Login page:

| Account Role | Email Address | Password | Privileges |
|---|---|---|---|
| **System Administrator** | `admin@fms.com` | `admin123` | Full dashboard access, edit, delete, export records |
| **Standard User / Customer** | `john.doe@gmail.com` | `user123` | Submit reviews, view metrics and categories |

*Note: You can also register any new account using the Sign Up page. Newly registered users are stored in `localStorage`.*

---

## 📊 Analytics & Visualizations

The dashboard is powered by **Chart.js** and automatically updates whenever a feedback is submitted, edited, or deleted:

1. **Monthly Feedback Trend**: Smooth curve line chart with gradient fill tracking review volume across the past 6 months.
2. **Category Distribution**: Donut chart displaying the proportion of feedback across all 8 categories.
3. **Star Rating Breakdown**: Horizontal bar chart detailing counts from 5-star down to 1-star.
4. **Sentiment Classification**: Pie chart grouping feedback into Positive (4-5★), Neutral (3★), and Negative (1-2★).

---

## 📁 File Structure

```
feedback-management-system/
│
├── index.html          # Semantic HTML5 single-page application structure with all views & modals
├── style.css           # Custom modern styling, CSS variables, grid, flexbox, animations & responsive breakpoints
├── script.js          # Modular Vanilla JavaScript (ES6+), Client Router, Auth, Charts, CRUD & LocalStorage
├── presentation.html   # Interactive 15-Slide Presentation Deck for College Project Review & Viva
└── README.md           # Comprehensive documentation & review guide
```

---

## 📽️ Project Review Presentation (PPT)

An interactive, 15-slide PowerPoint-style presentation has been included in the project:

- **File:** [presentation.html](file:///C:/Users/sathw/.gemini/antigravity/scratch/feedback-management-system/presentation.html)
- **Features:**
  - 16:9 widescreen layout with professional blue and purple theme.
  - Keyboard arrow navigation (`Left`/`Right` arrows or `Spacebar`).
  - Fullscreen mode (press `F` key or click Fullscreen button).
  - Built-in **Presenter Notes** with talking points and viva hints (press `N` key).
  - Slide Overview Grid for quick jumping.
  - **Export to PDF:** Press `Ctrl+P` or click "Export PDF" to print or save the entire slide deck as a presentation PDF.
  - Quick action button to launch the live app directly from the slides.


---

## 🎓 College Viva & Project Review Notes

### 1. What problem does this system solve?
Traditional feedback collection often leads to disconnected silos. The Feedback Management System (FMS) unifies feedback across multiple business touchpoints (Product, Delivery, Support, Web, App), quantifies customer satisfaction through 5-star ratings, and visualizes sentiment trends in real time.

### 2. How is data persisted?
Data is stored using HTML5 Web Storage (`localStorage`). On first launch, the application seeds 12 diverse, realistic customer reviews across the past 6 months so charts and tables are immediately populated. All additions, updates, and deletions reflect instantly and persist across page refreshes.

### 3. What technical stack is utilized?
- **HTML5**: Semantic tags, accessible landmarks, modal dialogs, and ARIA attributes.
- **CSS3**: Custom design system using CSS Variables (`--blue-600`, `--purple-600`), Flexbox, CSS Grid, and media queries for responsive layouts.
- **JavaScript (ES6+)**: Custom client router (`hashchange`), Chart.js lifecycle management, DOM manipulation, and input validation engines.
- **Chart.js**: Dynamic canvas-based charting for trends, category splits, and ratings.

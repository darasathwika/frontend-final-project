/**
 * Generate FeedPulse_Final_Project_Review.pptx using pptxgenjs
 */
const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();

// Presentation Properties
pptx.author = 'Student Project Team';
pptx.company = 'Department of Computer Science & Engineering';
pptx.revision = '1';
pptx.subject = 'Feedback Management System Final Review';
pptx.title = 'FeedPulse - Final Project Review Presentation';
pptx.layout = 'LAYOUT_16x9';

// Define Color Constants (Blue, White, Light Purple palette)
const C_NAVY = '0B132B';
const C_DARK_PURPLE = '1E1B4B';
const C_BLUE = '2563EB';
const C_LIGHT_BLUE = 'DBEAFE';
const C_PURPLE = '7C3AED';
const C_LIGHT_PURPLE = 'F3E8FF';
const C_WHITE = 'FFFFFF';
const C_SLATE_DARK = '0F172A';
const C_SLATE_TEXT = '334155';
const C_SLATE_MUTED = '64748B';
const C_BG_CARD = 'F8FAFC';
const C_BORDER = 'E2E8F0';
const C_GREEN = '10B981';
const C_AMBER = 'F59E0B';
const C_RED = 'EF4444';

// Helper for standard slide header
function addSlideHeader(slide, category, title, subtitle) {
  // Category Pill
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 0.5, w: 2.2, h: 0.35,
    rectRadius: 0.15,
    fill: { color: C_LIGHT_PURPLE },
    line: { color: C_PURPLE, width: 1 }
  });
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.5, w: 2.2, h: 0.35,
    fontFace: 'Arial', fontSize: 10, bold: true, color: C_PURPLE,
    align: 'center', valign: 'middle'
  });

  // Title
  slide.addText(title, {
    x: 0.8, y: 0.95, w: 11.5, h: 0.6,
    fontFace: 'Arial', fontSize: 24, bold: true, color: C_SLATE_DARK
  });

  // Subtitle
  slide.addText(subtitle, {
    x: 0.8, y: 1.5, w: 11.5, h: 0.4,
    fontFace: 'Arial', fontSize: 13, color: C_SLATE_MUTED
  });

  // Footer bar
  slide.addShape(pptx.ShapeType.line, {
    x: 0.8, y: 6.8, w: 11.7, h: 0,
    line: { color: C_BORDER, width: 1 }
  });
  slide.addText('FeedPulse — Modern Feedback Management System', {
    x: 0.8, y: 6.9, w: 6.0, h: 0.3,
    fontFace: 'Arial', fontSize: 9, color: C_SLATE_MUTED
  });
  slide.addText('Final Academic Project Review', {
    x: 7.5, y: 6.9, w: 5.0, h: 0.3,
    fontFace: 'Arial', fontSize: 9, color: C_SLATE_MUTED, align: 'right'
  });
}

// ============================================================================
// SLIDE 1: Title Slide (Dark Navy / Purple Theme)
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_NAVY };

  // Decorative Glow Shape
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0, y: 1.0, w: 11.3, h: 5.5,
    rectRadius: 0.25,
    fill: { color: C_DARK_PURPLE },
    line: { color: '3B82F6', width: 1.5 }
  });

  // Pill
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.65, y: 1.4, w: 4.0, h: 0.4,
    rectRadius: 0.2,
    fill: { color: '2E1065' },
    line: { color: C_PURPLE, width: 1 }
  });
  slide.addText('FINAL YEAR CAPSTONE PROJECT DEFENSE', {
    x: 4.65, y: 1.4, w: 4.0, h: 0.4,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'C084FC',
    align: 'center', valign: 'middle'
  });

  // Main Title
  slide.addText('FeedPulse', {
    x: 1.5, y: 2.0, w: 10.3, h: 1.0,
    fontFace: 'Arial', fontSize: 44, bold: true, color: C_WHITE,
    align: 'center'
  });

  // Subtitle
  slide.addText('A Modern, Responsive Feedback Management System & Real-Time Sentiment Analytics Platform', {
    x: 2.0, y: 3.0, w: 9.3, h: 0.7,
    fontFace: 'Arial', fontSize: 16, color: '93C5FD',
    align: 'center'
  });

  // Meta Grid (3 Boxes)
  const metaBoxes = [
    { title: 'PROJECT TYPE', desc: 'Full-Stack Web System', x: 2.2 },
    { title: 'DEPARTMENT', desc: 'Computer Science & Engineering', x: 5.2 },
    { title: 'EVALUATION YEAR', desc: 'Academic Session 2026-2027', x: 8.2 }
  ];

  metaBoxes.forEach(b => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: b.x, y: 4.2, w: 2.8, h: 1.1,
      rectRadius: 0.15,
      fill: { color: '111C44' },
      line: { color: '334155', width: 1 }
    });
    slide.addText(b.title, {
      x: b.x, y: 4.3, w: 2.8, h: 0.3,
      fontFace: 'Arial', fontSize: 9, bold: true, color: '94A3B8', align: 'center'
    });
    slide.addText(b.desc, {
      x: b.x, y: 4.65, w: 2.8, h: 0.5,
      fontFace: 'Arial', fontSize: 11, bold: true, color: C_WHITE, align: 'center'
    });
  });
}

// ============================================================================
// SLIDE 2: Introduction & Context
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '1. Introduction', 'Introduction & Background', 'Why structured customer feedback is critical for modern organizational growth');

  const cards = [
    {
      title: 'Voice of Customer (VoC)',
      desc: 'Direct customer reviews provide genuine insights on usability, product stability, and customer satisfaction.',
      bg: C_LIGHT_BLUE, border: C_BLUE, x: 0.8
    },
    {
      title: 'Real-Time Sentiment',
      desc: 'Delayed feedback analysis leads to high churn. Instant aggregation allows immediate operational correction.',
      bg: C_LIGHT_PURPLE, border: C_PURPLE, x: 4.8
    },
    {
      title: 'Targeted Accountability',
      desc: 'Categorizing feedback across 8 departments pinpoints exact bottlenecks (Product, Support, Delivery, Website).',
      bg: 'D1FAE5', border: C_GREEN, x: 8.8
    }
  ];

  cards.forEach(c => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: c.x, y: 2.2, w: 3.7, h: 4.0,
      rectRadius: 0.15,
      fill: { color: C_BG_CARD },
      line: { color: c.border, width: 1.5 }
    });
    slide.addText(c.title, {
      x: c.x + 0.3, y: 2.6, w: 3.1, h: 0.6,
      fontFace: 'Arial', fontSize: 16, bold: true, color: C_SLATE_DARK
    });
    slide.addText(c.desc, {
      x: c.x + 0.3, y: 3.3, w: 3.1, h: 2.5,
      fontFace: 'Arial', fontSize: 13, color: C_SLATE_TEXT, lineSpacing: 20
    });
  });
}

// ============================================================================
// SLIDE 3: Problem Statement
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '2. Challenges', 'Problem Statement', 'Key limitations and challenges found in conventional feedback systems');

  const problems = [
    { title: 'Scattered & Fragmented Channels', desc: 'Feedback is lost across disparate emails, social channels, and physical forms without central aggregation.', x: 0.8, y: 2.2 },
    { title: 'Lack of Real-Time Analytics', desc: 'Standard survey forms dump raw rows. Management lacks dynamic monthly trendlines and star breakdowns.', x: 6.8, y: 2.2 },
    { title: 'High Submission Friction', desc: 'Overly long, static forms discourage users from responding. Absence of interactive star ratings leads to high drop-offs.', x: 0.8, y: 4.4 },
    { title: 'Zero Administrative Governance', desc: 'Inability to search keywords, filter by ratings, edit entries, delete outdated logs, or export to CSV.', x: 6.8, y: 4.4 }
  ];

  problems.forEach(p => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: p.x, y: p.y, w: 5.7, h: 1.9,
      rectRadius: 0.12,
      fill: { color: 'FEF2F2' },
      line: { color: 'FCA5A5', width: 1 }
    });
    slide.addText(p.title, {
      x: p.x + 0.3, y: p.y + 0.2, w: 5.1, h: 0.4,
      fontFace: 'Arial', fontSize: 14, bold: true, color: C_RED
    });
    slide.addText(p.desc, {
      x: p.x + 0.3, y: p.y + 0.65, w: 5.1, h: 1.1,
      fontFace: 'Arial', fontSize: 12, color: C_SLATE_TEXT
    });
  });
}

// ============================================================================
// SLIDE 4: Project Objectives
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '3. Scope', 'Project Objectives & Goals', 'Core functional deliverables engineered in FeedPulse');

  const objs = [
    { num: '01', title: 'Frictionless Star Rating Submission', desc: 'Interactive 1-to-5 star rating selector with dynamic hover labels and 8 specialized service categories.', x: 0.8, y: 2.2 },
    { num: '02', title: 'Dynamic Real-Time Analytics', desc: 'Instant calculation of positive, negative, and average ratings with 4 Chart.js charts updating on the fly.', x: 6.8, y: 2.2 },
    { num: '03', title: 'Full CRUD & Management Table', desc: 'Comprehensive data table with live keyword search, dual filtering (Category + Rating), sorting, and CSV export.', x: 0.8, y: 4.4 },
    { num: '04', title: 'Role-Based Auth & Persistence', desc: 'Secure authentication workflows (Admin & User), session persistence, and zero-dependency LocalStorage storage.', x: 6.8, y: 4.4 }
  ];

  objs.forEach(o => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: o.x, y: o.y, w: 5.7, h: 1.9,
      rectRadius: 0.12,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(o.num, {
      x: o.x + 0.3, y: o.y + 0.2, w: 0.8, h: 0.4,
      fontFace: 'Arial', fontSize: 18, bold: true, color: C_PURPLE
    });
    slide.addText(o.title, {
      x: o.x + 1.1, y: o.y + 0.2, w: 4.3, h: 0.4,
      fontFace: 'Arial', fontSize: 14, bold: true, color: C_SLATE_DARK
    });
    slide.addText(o.desc, {
      x: o.x + 1.1, y: o.y + 0.65, w: 4.3, h: 1.1,
      fontFace: 'Arial', fontSize: 12, color: C_SLATE_TEXT
    });
  });
}

// ============================================================================
// SLIDE 5: System Architecture
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '4. Architecture', '3-Tier System Architecture', 'Clean separation of Presentation, Business Logic, and Persistence');

  const tiers = [
    { title: 'Presentation Layer', tech: 'HTML5 / CSS3 Modern', items: ['Responsive Dashboard Layout', 'Custom Modal Dialogs', 'Interactive Star Animations', 'Toast Notification System'], x: 0.8, color: C_BLUE },
    { title: 'Application Logic Layer', tech: 'Vanilla JavaScript (ES6+)', items: ['Hash-Based Client Router', 'Regex Form Validation', 'Chart.js Analytics Engine', 'Full CRUD Operations State'], x: 4.8, color: C_PURPLE },
    { title: 'Persistence Layer', tech: 'HTML5 Web Storage', items: ['LocalStorage Data Engine', '12 Pre-Seeded Sample Records', 'Session Persistence State', 'UTF-8 BOM CSV Exporter'], x: 8.8, color: C_GREEN }
  ];

  tiers.forEach(t => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: t.x, y: 2.2, w: 3.7, h: 4.2,
      rectRadius: 0.15,
      fill: { color: C_BG_CARD },
      line: { color: t.color, width: 2 }
    });
    slide.addText(t.title, {
      x: t.x + 0.2, y: 2.5, w: 3.3, h: 0.4,
      fontFace: 'Arial', fontSize: 16, bold: true, color: t.color, align: 'center'
    });
    slide.addText(t.tech, {
      x: t.x + 0.2, y: 2.9, w: 3.3, h: 0.3,
      fontFace: 'Arial', fontSize: 10, bold: true, color: C_SLATE_MUTED, align: 'center'
    });

    let bulletText = t.items.map(i => `• ${i}`).join('\n\n');
    slide.addText(bulletText, {
      x: t.x + 0.3, y: 3.4, w: 3.1, h: 2.8,
      fontFace: 'Arial', fontSize: 11, color: C_SLATE_TEXT, lineSpacing: 18
    });
  });
}

// ============================================================================
// SLIDE 6: Functional Modules
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '5. Modules', 'System Functional Modules', '6 core functional components engineered for complete feedback lifecycle');

  const modules = [
    { title: 'Authentication Module', desc: 'Login & Signup with password eye toggle, Remember Me, and 1-Click Demo accounts.', x: 0.8, y: 2.2 },
    { title: 'Feedback Submission', desc: '1 to 5 star rating, category select, title, 500-char counter, and confetti Thank-You modal.', x: 4.8, y: 2.2 },
    { title: 'Analytics Dashboard', desc: 'Real-time KPI metric cards, monthly trend line chart, rating distribution, and sentiment pie.', x: 8.8, y: 2.2 },
    { title: 'Feedback Management', desc: 'Data table with live keyword search, dual category/rating filter, sort, edit modal, delete.', x: 0.8, y: 4.4 },
    { title: 'Category Explorer', desc: 'Dedicated 8-category explorer with review counts, satisfaction rates, and filter shortcuts.', x: 4.8, y: 4.4 },
    { title: 'Support & About Us', desc: 'Contact desk with interactive form, operational info cards, FAQ accordion, and project specs.', x: 8.8, y: 4.4 }
  ];

  modules.forEach(m => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: m.x, y: m.y, w: 3.7, h: 1.9,
      rectRadius: 0.12,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(m.title, {
      x: m.x + 0.25, y: m.y + 0.2, w: 3.2, h: 0.4,
      fontFace: 'Arial', fontSize: 13, bold: true, color: C_SLATE_DARK
    });
    slide.addText(m.desc, {
      x: m.x + 0.25, y: m.y + 0.65, w: 3.2, h: 1.1,
      fontFace: 'Arial', fontSize: 11, color: C_SLATE_TEXT
    });
  });
}

// ============================================================================
// SLIDE 7: UI & UX Design Philosophy
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '6. Design', 'UI & UX Design Philosophy', 'Clean, modern SaaS aesthetic crafted for professional evaluation');

  const designPoints = [
    { title: 'Blue, White & Light Purple Theme', desc: 'Combines Primary Blue (#2563EB) for corporate trust with Light Purple (#7C3AED, #F3E8FF) for modern SaaS feel.', x: 0.8 },
    { title: 'Responsive Sidebar Navigation', desc: 'Desktop fixed sidebar that collapses into an animated mobile drawer with backdrop blur on smaller viewports.', x: 4.8 },
    { title: 'Micro-Interactions & Delight', desc: 'Interactive star bounce, celebratory canvas confetti on submit, animated modal entries, and toast notifications.', x: 8.8 }
  ];

  designPoints.forEach(d => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: d.x, y: 2.2, w: 3.7, h: 4.2,
      rectRadius: 0.15,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(d.title, {
      x: d.x + 0.3, y: 2.6, w: 3.1, h: 0.7,
      fontFace: 'Arial', fontSize: 16, bold: true, color: C_SLATE_DARK
    });
    slide.addText(d.desc, {
      x: d.x + 0.3, y: 3.5, w: 3.1, h: 2.5,
      fontFace: 'Arial', fontSize: 13, color: C_SLATE_TEXT, lineSpacing: 20
    });
  });
}

// ============================================================================
// SLIDE 8: 8 Feedback Categories
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '7. Categorization', '8 Specialized Service Categories', 'Enforcing departmental accountability across all operational touchpoints');

  const cats = [
    { name: 'Product', desc: 'Hardware/software quality, features, speed & durability' },
    { name: 'Service', desc: 'Speed of fulfillment, professionalism & SLA agreements' },
    { name: 'Website', desc: 'Site navigation, usability, page speed & responsive design' },
    { name: 'Customer Support', desc: 'Help desk responsiveness, empathy & resolution speed' },
    { name: 'Delivery', desc: 'Shipping punctuality, parcel packaging safety & tracking' },
    { name: 'Application', desc: 'Mobile app crash stability, biometric login & offline UX' },
    { name: 'Overall Experience', desc: 'General brand sentiment, Net Promoter Score (NPS) index' },
    { name: 'Other', desc: 'General recommendations, ideas & miscellaneous feedback' }
  ];

  cats.forEach((c, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const x = 0.8 + (col * 3.0);
    const y = 2.2 + (row * 2.1);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.8, h: 1.9,
      rectRadius: 0.12,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(c.name, {
      x: x + 0.2, y: y + 0.2, w: 2.4, h: 0.4,
      fontFace: 'Arial', fontSize: 14, bold: true, color: C_PURPLE
    });
    slide.addText(c.desc, {
      x: x + 0.2, y: y + 0.65, w: 2.4, h: 1.1,
      fontFace: 'Arial', fontSize: 11, color: C_SLATE_TEXT
    });
  });
}

// ============================================================================
// SLIDE 9: Data Storage & Seeding
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '8. Data Layer', 'Data Storage & Seeding Strategy', 'Reliable client-side persistence using HTML5 Web Storage');

  // Left: Code Schema Box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 2.2, w: 5.7, h: 4.2,
    rectRadius: 0.12,
    fill: { color: '0F172A' },
    line: { color: '334155', width: 1 }
  });
  slide.addText('Feedback Record Schema (JSON)', {
    x: 1.1, y: 2.4, w: 5.1, h: 0.4,
    fontFace: 'Arial', fontSize: 13, bold: true, color: '93C5FD'
  });
  slide.addText(`{
  "id": "fb-101",
  "name": "Eleanor Vance",
  "email": "eleanor.v@gmail.com",
  "category": "Product",
  "title": "Incredible build quality",
  "description": "Exceeded our expectations...",
  "rating": 5,
  "createdAt": "2026-11-08T10:30:00.000Z"
}`, {
    x: 1.1, y: 2.9, w: 5.1, h: 3.2,
    fontFace: 'Courier New', fontSize: 11, color: 'CBD5E1'
  });

  // Right: Seeding explanation
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 2.2, w: 5.7, h: 4.2,
    rectRadius: 0.12,
    fill: { color: C_BG_CARD },
    line: { color: C_BORDER, width: 1 }
  });
  slide.addText('Pre-Seeded Dataset & Resilience', {
    x: 7.1, y: 2.4, w: 5.1, h: 0.4,
    fontFace: 'Arial', fontSize: 15, bold: true, color: C_SLATE_DARK
  });
  const seedPoints = [
    '• 12 Diverse Seed Reviews: Spans all 8 categories and the past 6 months to showcase charts immediately.',
    '• Default Admin Account: admin@fms.com / admin123 (full management privileges).',
    '• Default User Account: john.doe@gmail.com / user123 (standard review submission).',
    '• Automatic Fallback: In case LocalStorage is empty or cleared, system auto-seeds without crashes.',
    '• No Database Server Setup Required: Instant demonstration on any laptop or lab computer.'
  ].join('\n\n');
  slide.addText(seedPoints, {
    x: 7.1, y: 3.0, w: 5.1, h: 3.2,
    fontFace: 'Arial', fontSize: 12, color: C_SLATE_TEXT, lineSpacing: 18
  });
}

// ============================================================================
// SLIDE 10: Tech Stack Matrix
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '9. Technology', 'Technology Stack Matrix', 'Standard, modern web technologies ensuring zero build dependencies');

  const rows = [
    [
      { text: 'Layer', options: { bold: true, fill: { color: 'F1F5F9' } } },
      { text: 'Technology', options: { bold: true, fill: { color: 'F1F5F9' } } },
      { text: 'Purpose & Architectural Benefit', options: { bold: true, fill: { color: 'F1F5F9' } } }
    ],
    ['Frontend Markup', 'HTML5 Semantic', 'Accessible landmarks, ARIA tags, modal dialogs, and responsive layouts.'],
    ['Styling', 'CSS3 Modern', 'CSS custom variables, Flexbox, CSS Grid, smooth transitions & media queries.'],
    ['Application Logic', 'Vanilla JS (ES6+)', 'Custom SPA hash router, validation engine, Chart.js lifecycle management.'],
    ['Data Visualization', 'Chart.js 4.4.1', 'Interactive canvas charting for Monthly Trend, Category Donut & Sentiment.'],
    ['Persistence', 'HTML5 LocalStorage', 'Fast client-side CRUD persistence with zero server setup required.'],
    ['Icons & Effects', 'FontAwesome 6 / Confetti', 'Enterprise vector icons and celebratory confetti feedback.']
  ];

  slide.addTable(rows, {
    x: 0.8, y: 2.2, w: 11.7, h: 4.2,
    colW: [2.2, 2.5, 7.0],
    fontFace: 'Arial', fontSize: 11,
    color: C_SLATE_TEXT,
    border: { color: C_BORDER, width: 1 }
  });
}

// ============================================================================
// SLIDE 11: Validation & Quality Assurance
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '10. Security', 'Validation & Quality Assurance', 'Strict client-side safeguards ensuring data integrity and sanitization');

  const securityCards = [
    { title: 'Regex Input Validation', desc: 'Enforces RFC-compliant email formats and strict 7-to-15 digit phone number verification before submission.', x: 0.8 },
    { title: 'Password Match Check', desc: 'Real-time visual matching indicator comparing Password and Confirm Password fields before signup execution.', x: 4.8 },
    { title: 'XSS Injection Prevention', desc: 'Custom escapeHTML() routine encodes <, >, &, and quotes before rendering any user string into table rows.', x: 8.8 }
  ];

  securityCards.forEach(s => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: s.x, y: 2.2, w: 3.7, h: 4.2,
      rectRadius: 0.15,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(s.title, {
      x: s.x + 0.3, y: 2.6, w: 3.1, h: 0.6,
      fontFace: 'Arial', fontSize: 16, bold: true, color: C_SLATE_DARK
    });
    slide.addText(s.desc, {
      x: s.x + 0.3, y: 3.4, w: 3.1, h: 2.5,
      fontFace: 'Arial', fontSize: 13, color: C_SLATE_TEXT, lineSpacing: 20
    });
  });
}

// ============================================================================
// SLIDE 12: Feedback Management & CSV Export
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '11. Operations', 'Feedback Management & CSV Export', 'Complete administrative controls over the customer feedback lifecycle');

  const opsCards = [
    {
      title: 'Real-Time Search & Multi-Filters',
      items: [
        'Live search across user name, email, feedback title, and message snippet.',
        'Multi-level category dropdown filter (All + 8 individual categories).',
        'Star rating filter (5★, 4★, 3★, 2★, 1★, Positive 4-5★, Negative 1-2★).',
        'Sorting by Date (Newest/Oldest), Rating (High/Low), and Name (A-Z).'
      ],
      x: 0.8
    },
    {
      title: 'One-Click CSV Export Feature',
      items: [
        'Generates downloadable .csv spreadsheet formatted with UTF-8 BOM.',
        'Seamless compatibility with Microsoft Excel, Google Sheets, and BI tools.',
        'Includes ID, Customer Name, Email, Category, Rating, Title & Timestamp.',
        'Facilitates offline executive auditing and compliance reporting.'
      ],
      x: 6.8
    }
  ];

  opsCards.forEach(o => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: o.x, y: 2.2, w: 5.7, h: 4.2,
      rectRadius: 0.15,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(o.title, {
      x: o.x + 0.3, y: 2.5, w: 5.1, h: 0.4,
      fontFace: 'Arial', fontSize: 16, bold: true, color: C_SLATE_DARK
    });
    slide.addText(o.items.map(i => `• ${i}`).join('\n\n'), {
      x: o.x + 0.3, y: 3.1, w: 5.1, h: 3.0,
      fontFace: 'Arial', fontSize: 12, color: C_SLATE_TEXT, lineSpacing: 18
    });
  });
}

// ============================================================================
// SLIDE 13: Business Impact & Advantages
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '12. Impact', 'Business Impact & Organizational Value', 'Transforming customer opinions into continuous operational improvement');

  const impacts = [
    { title: 'Customer Churn Prevention', desc: 'Detecting 1-star and 2-star reviews in real time empowers support teams to resolve issues before users abandon the platform.', x: 0.8 },
    { title: 'Zero Latency Analytics', desc: 'Immediate KPI recalculation and chart updates eliminate the delay of batch processing and external report generation.', x: 4.8 },
    { title: 'Empirical Product Roadmaps', desc: 'Engineering and product managers allocate resources based on empirical customer satisfaction data rather than guesswork.', x: 8.8 }
  ];

  impacts.forEach(im => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: im.x, y: 2.2, w: 3.7, h: 4.2,
      rectRadius: 0.15,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(im.title, {
      x: im.x + 0.3, y: 2.6, w: 3.1, h: 0.6,
      fontFace: 'Arial', fontSize: 16, bold: true, color: C_SLATE_DARK
    });
    slide.addText(im.desc, {
      x: im.x + 0.3, y: 3.4, w: 3.1, h: 2.5,
      fontFace: 'Arial', fontSize: 13, color: C_SLATE_TEXT, lineSpacing: 20
    });
  });
}

// ============================================================================
// SLIDE 14: Future Scope & Roadmap
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_WHITE };
  addSlideHeader(slide, '13. Roadmap', 'Future Scope & Enhancements', 'Planned architectural roadmap for enterprise-grade scalability');

  const roadmap = [
    { title: 'AI Sentiment Analysis (NLP)', desc: 'Integrate the Gemini API to automatically detect emotional tone, urgency levels, and extract root complaint keywords.', x: 0.8, y: 2.2 },
    { title: 'Cloud Backend Migration', desc: 'Connect to a Node.js / Express backend with PostgreSQL / MongoDB for synchronized multi-device enterprise deployment.', x: 6.8, y: 2.2 },
    { title: 'Automated Escalation Triggers', desc: 'Dispatch automated Slack or email alerts to designated department heads when reviews lower than 2 stars are submitted.', x: 0.8, y: 4.4 },
    { title: 'Multi-Tenant SaaS Support', desc: 'Enable multiple organizations or college branches to run isolated feedback portals on a single unified instance.', x: 6.8, y: 4.4 }
  ];

  roadmap.forEach(r => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: r.x, y: r.y, w: 5.7, h: 1.9,
      rectRadius: 0.12,
      fill: { color: C_BG_CARD },
      line: { color: C_BORDER, width: 1 }
    });
    slide.addText(r.title, {
      x: r.x + 0.3, y: r.y + 0.2, w: 5.1, h: 0.4,
      fontFace: 'Arial', fontSize: 14, bold: true, color: C_PURPLE
    });
    slide.addText(r.desc, {
      x: r.x + 0.3, y: r.y + 0.65, w: 5.1, h: 1.1,
      fontFace: 'Arial', fontSize: 12, color: C_SLATE_TEXT
    });
  });
}

// ============================================================================
// SLIDE 15: Conclusion & Q&A
// ============================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_NAVY };

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0, y: 1.0, w: 11.3, h: 5.5,
    rectRadius: 0.25,
    fill: { color: C_DARK_PURPLE },
    line: { color: '3B82F6', width: 1.5 }
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.65, y: 1.5, w: 4.0, h: 0.4,
    rectRadius: 0.2,
    fill: { color: '2E1065' },
    line: { color: C_PURPLE, width: 1 }
  });
  slide.addText('PROJECT REVIEW COMPLETE', {
    x: 4.65, y: 1.5, w: 4.0, h: 0.4,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'C084FC',
    align: 'center', valign: 'middle'
  });

  slide.addText('Thank You!', {
    x: 1.5, y: 2.2, w: 10.3, h: 1.0,
    fontFace: 'Arial', fontSize: 46, bold: true, color: C_WHITE,
    align: 'center'
  });

  slide.addText('FeedPulse is ready for evaluation and live interactive demonstration.', {
    x: 2.0, y: 3.3, w: 9.3, h: 0.6,
    fontFace: 'Arial', fontSize: 16, color: '93C5FD',
    align: 'center'
  });

  slide.addText('Questions & Viva Discussion Open for Faculty Review Panel', {
    x: 2.0, y: 4.3, w: 9.3, h: 0.5,
    fontFace: 'Arial', fontSize: 13, bold: true, color: 'CBD5E1',
    align: 'center'
  });
}

// Save Presentation
const outputPath = path.join(__dirname, 'FeedPulse_Final_Project_Review.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`SUCCESS: Created PPTX file at ${fileName}`);
  })
  .catch(err => {
    console.error(`ERROR: Failed to create PPTX file:`, err);
    process.exit(1);
  });

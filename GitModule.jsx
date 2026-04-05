import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  {
    title: 'HTML — Zero to Industry Level',
    content: (<>
      <h3>What is HTML?</h3>
      <p>HTML (HyperText Markup Language) is the standard markup language used to create and structure content on the web. <strong>HyperText</strong> = text that links to other pages. <strong>Markup</strong> = annotating content with tags. <strong>Language</strong> = formal system for encoding information.</p>

      <h3>How the Web Works</h3>
      <ul>
        <li>User types a URL → browser sends HTTP/HTTPS request to server</li>
        <li>Server responds with HTML, CSS, JS files</li>
        <li>Browser parses HTML and builds the <strong>DOM</strong> (Document Object Model)</li>
        <li>Browser renders the visual page from DOM + CSS</li>
      </ul>

      <h3>HTML Version History</h3>
      <pre>{`HTML 1.0   — 1991: Tim Berners-Lee, basic text & hyperlinks
HTML 2.0   — 1995: Forms, tables support added
HTML 4.01  — 1999: CSS support, frames (deprecated)
XHTML 1.0  — 2000: Stricter XML-based syntax
HTML5      — 2014: Semantic elements, audio/video, Canvas, APIs`}</pre>

      <h3>Basic Document Structure</h3>
      <pre>{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>`}</pre>

      <h3>Anatomy of an HTML Element</h3>
      <pre>{`<tagname attribute="value">Content goes here</tagname>

Opening Tag  →  <p>   Marks the start
Closing Tag  →  </p>  Marks the end
Self-closing →  <img /> <br /> <input />  No content inside`}</pre>

      <h3>Global Attributes</h3>
      <pre>{`id              — Unique identifier
class           — Assigns CSS classes
style           — Inline CSS styles
title           — Tooltip text on hover
lang            — Language of element content
data-*          — Custom data attributes for JavaScript
hidden          — Hides the element
tabindex        — Controls keyboard tab order
contenteditable — Makes element editable by user
draggable       — Makes element draggable`}</pre>

      <h3>Text Formatting Tags</h3>
      <pre>{`<p>        Paragraph
<strong>   Important / Bold (semantic)
<em>       Emphasized / Italic (semantic)
<b>        Bold (visual only, no meaning)
<i>        Italic (visual only)
<u>        Underline
<s>        Strikethrough
<mark>     Highlighted text
<small>    Smaller text (fine print)
<sub>      Subscript — H₂O
<sup>      Superscript — x²
<code>     Inline code snippet
<pre>      Preformatted text (preserves whitespace)
<blockquote> Long quotation from another source
<abbr>     Abbreviation with title tooltip
<kbd>      Keyboard input
<del>      Deleted text   <ins> Inserted text`}</pre>

      <h3>Semantic HTML5 — Use These!</h3>
      <p>Semantic tags tell browsers and screen readers what each section <em>means</em>:</p>
      <pre>{`<header>      — Page/section header (logo, nav, title)
<nav>         — Navigation links / menus
<main>        — Primary content (ONE per page)
<section>     — Thematic grouping of content
<article>     — Self-contained content (blog post, news)
<aside>       — Sidebar / tangentially related content
<footer>      — Footer (author, copyright, links)
<figure>      — Self-contained media (image, chart)
<figcaption>  — Caption for a <figure>
<details>     — Expandable/collapsible content
<summary>     — Visible heading for <details>
<dialog>      — Modal dialog box
<time>        — Date/time with machine-readable datetime attr
<address>     — Contact information
<progress>    — Progress bar
<meter>       — Scalar measurement in a known range`}</pre>

      <h3>Complete Page Layout Example</h3>
      <pre>{`<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <section>
      <article>
        <h2>Blog Post Title</h2>
        <time datetime="2025-01-01">January 1, 2025</time>
        <p>Content here...</p>
      </article>
    </section>
    <aside><p>Related Links</p></aside>
  </main>

  <footer><p>© 2025 DevLearn</p></footer>
</body>`}</pre>

      <h3>Links — Full Reference</h3>
      <pre>{`<a href="https://example.com">External link</a>
<a href="/about">Internal link</a>
<a href="mailto:you@email.com">Email link</a>
<a href="tel:+1234567890">Phone link</a>
<a href="#section-id">Jump to section</a>
<a href="file.pdf" download>Download PDF</a>

<!-- IMPORTANT: Always add rel for external links -->
<a href="https://example.com" target="_blank"
   rel="noopener noreferrer">Safe external link</a>

Attributes:
  href      — URL or anchor target
  target    — _blank (new tab), _self (same tab)
  rel       — noopener noreferrer (security)
  download  — triggers file download`}</pre>

      <h3>Images — Full Reference</h3>
      <pre>{`<img src="photo.jpg" alt="Description" width="800" height="600"
     loading="lazy" decoding="async" />

<!-- Responsive images -->
<img src="image-800.jpg"
     srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
     alt="Responsive image" />

<!-- Art direction with <picture> -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg" />
  <source media="(max-width: 1000px)" srcset="tablet.jpg" />
  <img src="desktop.jpg" alt="Description" />
</picture>`}</pre>

      <h3>All Form Input Types</h3>
      <pre>{`text          — Single-line text
password      — Masked text
email         — Email (with validation)
number        — Numeric with min/max/step
range         — Slider control
date          — Date picker
time          — Time picker
datetime-local — Date + time picker
color         — Color picker
checkbox      — Toggle true/false
radio         — Select one from group
file          — File upload (accept, multiple attrs)
hidden        — Hidden data sent with form
search        — Search field
tel           — Telephone number
url           — URL with validation`}</pre>

      <h3>Forms — Complete Example</h3>
      <pre>{`<form action="/submit" method="POST" enctype="multipart/form-data">
  <fieldset>
    <legend>Personal Info</legend>

    <label for="name">Full Name</label>
    <input type="text" id="name" name="name"
           placeholder="John Doe" required
           minlength="3" maxlength="50"
           autocomplete="name" />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />

    <label for="country">Country</label>
    <select id="country" name="country">
      <optgroup label="Asia">
        <option value="in">India</option>
        <option value="jp">Japan</option>
      </optgroup>
    </select>

    <label for="msg">Message</label>
    <textarea id="msg" name="msg" rows="4"
              maxlength="500"></textarea>

    <!-- Datalist (autocomplete suggestions) -->
    <input list="browsers" name="browser" />
    <datalist id="browsers">
      <option value="Chrome" />
      <option value="Firefox" />
      <option value="Safari" />
    </datalist>
  </fieldset>

  <button type="submit">Send</button>
  <button type="reset">Reset</button>
</form>`}</pre>

      <h3>Tables — Full Reference</h3>
      <pre>{`<table>
  <caption>Monthly Sales</caption>
  <colgroup>
    <col style="background:#eef" />
    <col span="2" style="background:#ffe" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>₹10,000</td>
    </tr>
    <!-- Spanning cells -->
    <tr>
      <td colspan="2">Spans 2 columns</td>
    </tr>
    <tr>
      <td rowspan="2">Spans 2 rows</td>
    </tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>₹10,000</td></tr>
  </tfoot>
</table>`}</pre>

      <h3>Head — Meta & SEO</h3>
      <pre>{`<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Under 160 chars for SEO" />
  <meta name="author" content="Your Name" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#2563EB" />

  <!-- Open Graph (Facebook, WhatsApp) -->
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Description" />
  <meta property="og:image" content="https://site.com/img.jpg" />
  <meta property="og:url" content="https://site.com/page" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title" />

  <!-- Link tags -->
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="favicon.ico" />
  <link rel="canonical" href="https://site.com/page" />
  <link rel="preload" href="font.woff2" as="font" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="manifest" href="/manifest.json" />

  <!-- Script loading -->
  <script src="app.js" defer></script>   <!-- runs after HTML parsed (use this) -->
  <script src="analytics.js" async></script> <!-- runs immediately when loaded -->
</head>`}</pre>

      <h3>Accessibility (a11y) — ARIA</h3>
      <pre>{`<!-- ARIA Attributes -->
role="button"        — defines semantic role
aria-label="Close"   — text label for screen readers
aria-labelledby="h1" — associate with heading
aria-hidden="true"   — hide from screen readers
aria-expanded="false"— collapsible element state
aria-current="page"  — current nav item
aria-live="polite"   — announce dynamic changes
aria-required="true" — mark required field
aria-invalid="true"  — mark validation error
aria-disabled="true" — mark as disabled

<!-- Skip links (keyboard navigation) -->
<a href="#main" class="skip-link">Skip to content</a>
/* CSS: .skip-link { position: absolute; left: -9999px; }
        .skip-link:focus { left: 0; } */

<!-- Keyboard focus control -->
<div tabindex="0" role="button">Keyboard focusable</div>
<div tabindex="-1" id="modal">Programmatic focus only</div>`}</pre>
      <p>Accessibility rules: Always provide <code>alt</code> text. Use <code>&lt;label&gt;</code> for all inputs. Ensure keyboard navigation works. Maintain 4.5:1 color contrast ratio. Test with NVDA, JAWS, or VoiceOver.</p>

      <h3>HTML5 APIs</h3>
      <pre>{`Geolocation API   — Get user's geographic location
Web Storage API   — localStorage and sessionStorage
History API       — pushState, replaceState
Notification API  — OS-level notifications
Canvas API        — 2D drawing/graphics via JS
Web Workers       — Background threads (no UI blocking)
Service Workers   — Offline caching, push notifications (PWA)
WebSockets        — Real-time two-way communication
IntersectionObserver — Detect elements entering viewport
Clipboard API     — Read/write clipboard data
File API          — Read files from user's system
IndexedDB         — Client-side structured database`}</pre>

      <h3>SEO Best Practices</h3>
      <pre>{`✓ Use ONE <h1> per page with your primary keyword
✓ Write meta descriptions under 160 characters
✓ Use descriptive, hyphenated lowercase URLs
✓ Add canonical tags to avoid duplicate content
✓ Add structured data with JSON-LD schema markup
✓ Optimize images: compress, add alt, use WebP
✓ Ensure fast load (Core Web Vitals: LCP, FID, CLS)
✓ Mobile-first (Google mobile-first indexing)

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": { "@type": "Person", "name": "Your Name" },
  "datePublished": "2025-01-01"
}
</script>`}</pre>

      <h3>Performance Optimization</h3>
      <pre>{`loading="lazy"    — defer images/iframes until near viewport
<link rel="preload">   — preload critical resources
<link rel="preconnect"> — preconnect to external origins
defer / async         — non-blocking script loading
WebP / AVIF format    — better compression than JPEG/PNG
Content Security Policy — prevent XSS attacks

<!-- Validation & Testing Tools -->
W3C Markup Validator  → validator.w3.org
Google Lighthouse     → audit performance, SEO, a11y
axe DevTools          → accessibility testing
WebAIM Contrast Check → color contrast ratio checker`}</pre>
    </>),
  },

  {
    title: 'CSS — Zero to Industry Level',
    content: (<>
      <h3>What is CSS?</h3>
      <p>CSS (Cascading Style Sheets) controls how HTML looks — colors, fonts, spacing, layout, animations, and responsiveness. Best practice: always use <strong>external stylesheets</strong> for separation of concerns, caching, and maintainability.</p>

      <h3>CSS Rule Anatomy</h3>
      <pre>{`selector {
  property: value;  /* Declaration */
}

/* Parts: */
Selector    → p, .class, #id, h1 > span
Property    → color, font-size, margin, display
Value       → red, 16px, 1rem, flex, auto
Declaration → color: red;`}</pre>

      <h3>All Selectors — Complete Reference</h3>
      <pre>{`/* Basic */
*          Universal — all elements
div        Type — all <div> elements
.className Class selector
#idName    ID selector
[href]     Has attribute
[type="email"] Attribute equals value
[class^="btn"] Attribute starts with
[class$="-lg"] Attribute ends with
[class*="icon"] Attribute contains

/* Combinators */
div p      Descendant (any depth)
div > p    Direct children only
h2 + p     Adjacent sibling (first p after h2)
h2 ~ p     All p siblings after h2

/* Pseudo-classes */
:hover       :focus        :focus-within
:active      :visited      :checked
:disabled    :required     :valid / :invalid
:placeholder-shown        :empty
:first-child  :last-child  :nth-child(2n)
:nth-child(odd)  :nth-child(even)
:first-of-type   :last-of-type
:only-child  :only-of-type
:not(.special)   :is(h1, h2, h3)
:where()     :has(img)     :root
:target      :lang(en)

/* Pseudo-elements */
::before     ::after
::first-line ::first-letter
::selection  ::placeholder
::marker     ::backdrop`}</pre>

      <h3>Specificity — How CSS Wins</h3>
      <pre>{`Inline styles        1,0,0,0  (always wins)
ID selectors #id     0,1,0,0
Classes, attrs, :pseudo-class  0,0,1,0
Elements, ::pseudo-elements    0,0,0,1
Universal *, combinators       0,0,0,0

/* Specificity example */
#nav .item a { color: blue; }  /* 0,1,1,1 */

/* The Cascade order: */
Browser defaults < Author styles < User styles < !important
Same specificity? → Later rule wins

/* WARNING: Avoid !important — breaks cascade and debugging */`}</pre>

      <h3>Box Model</h3>
      <pre>{`/* Content → Padding → Border → Margin */

/* ALWAYS add this globally */
*, *::before, *::after { box-sizing: border-box; }

.box {
  width: 300px; height: 200px;

  /* Padding — space inside border */
  padding: 20px;
  padding: 10px 20px;        /* top/bottom  left/right */
  padding: 5px 10px 15px 20px; /* top right bottom left */

  /* Border */
  border: 2px solid #ccc;
  border-radius: 8px;
  border-radius: 50%;        /* perfect circle */

  /* Margin — space outside border */
  margin: 16px;
  margin: 0 auto;            /* center block element */
  margin-top: -20px;         /* negative margins valid */
}

/* Visibility vs Display */
.gone       { display: none; }      /* removed from layout */
.invisible  { visibility: hidden; } /* takes space, invisible */
.see-thru   { opacity: 0; }         /* transparent but interactive */`}</pre>

      <h3>Display Values</h3>
      <pre>{`block        — full width, stacks (div, p, h1)
inline       — flows with text, no width/height (span, a)
inline-block — flows with text, accepts width/height
flex         — flexbox container (1D)
inline-flex  — inline flexbox
grid         — grid container (2D)
none         — removed from layout
contents     — element disappears, children remain
flow-root    — new block formatting context
list-item    — renders like <li>`}</pre>

      <h3>Flexbox — Complete Reference</h3>
      <pre>{`/* Container (parent) */
.container {
  display: flex;
  flex-direction: row;       /* row|column|row-reverse|column-reverse */
  flex-wrap: wrap;           /* nowrap|wrap|wrap-reverse */
  flex-flow: row wrap;       /* shorthand: direction + wrap */

  /* Main axis */
  justify-content: flex-start; /* flex-end|center|space-between|space-around|space-evenly */

  /* Cross axis */
  align-items: stretch;      /* flex-start|flex-end|center|baseline */

  /* Multi-line cross axis */
  align-content: flex-start;

  gap: 16px;                 /* between items */
  gap: 16px 24px;            /* row-gap  column-gap */
}

/* Items (children) */
.item {
  flex: 1;            /* grow to fill space equally */
  flex: 0 0 200px;    /* fixed 200px, don't grow/shrink */
  flex-grow: 2;       /* grow twice as much */
  flex-shrink: 0;     /* never shrink */
  order: -1;          /* move to front */
  align-self: center; /* override align-items */
}

/* Common patterns */
.centered { display:flex; justify-content:center; align-items:center; min-height:100vh; }
.navbar   { display:flex; align-items:center; justify-content:space-between; }
.cards    { display:flex; flex-wrap:wrap; gap:1rem; }
.card     { flex: 1 1 250px; }`}</pre>

      <h3>CSS Grid — Complete Reference</h3>
      <pre>{`/* Container */
.grid {
  display: grid;

  /* Columns */
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: 250px 1fr;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  /* Rows */
  grid-template-rows: 80px 1fr 60px;
  grid-auto-rows: minmax(100px, auto);

  gap: 1.5rem;
  justify-items: center;   /* align cells horizontally */
  align-items: center;     /* align cells vertically */
  place-items: center;     /* shorthand */
}

/* Named areas */
.layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr 60px;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Spanning */
.hero    { grid-column: 1 / -1; }   /* full width */
.feature { grid-column: span 2; }
.tall    { grid-row: span 2; }`}</pre>

      <h3>Typography</h3>
      <pre>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  -webkit-font-smoothing: antialiased;
}

h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.5px; }

/* Fluid typography with clamp() */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }   /* scales smoothly */

/* Text utilities */
.truncate { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }`}</pre>

      <h3>CSS Custom Properties (Variables)</h3>
      <pre>{`/* Define on :root for global access */
:root {
  --color-primary:  #7C3AED;
  --color-bg:       #FFFFFF;
  --spacing-sm:     8px;
  --spacing-md:     16px;
  --border-radius:  8px;
  --shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card {
  background: var(--color-bg);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  color: var(--color-text, #111);  /* fallback value */
}

/* Dark mode with variables */
@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a2e; --text: #eee; }
}
body { background: var(--bg); color: var(--text); }`}</pre>

      <h3>Responsive Design & Media Queries</h3>
      <pre>{`/* Mobile-first approach */
.grid { grid-template-columns: 1fr; }       /* Mobile */

@media (min-width: 640px)  { /* Large phones */ }
@media (min-width: 768px)  { /* Tablets */
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) { /* Laptops */
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1280px) { /* Desktops */ }
@media (min-width: 1536px) { /* Ultra-wide */ }

/* Other media features */
@media (orientation: landscape)         { }
@media (prefers-color-scheme: dark)     { }
@media (prefers-reduced-motion: reduce) { }
@media (hover: hover)                   { }  /* supports hover */
@media (pointer: coarse)               { }   /* touch device */
@media print                           { }

/* Container Queries (modern CSS) */
.card-container { container-type: inline-size; container-name: card; }
@container card (min-width: 400px) {
  .card { flex-direction: row; }
}`}</pre>

      <h3>Transitions & Animations</h3>
      <pre>{`/* Transitions */
.btn {
  background: #1D9E75;
  transition: all 0.2s ease;
  /* transition: background 0.2s, transform 0.1s; */
}
.btn:hover { background: #158a63; transform: translateY(-2px); }
.btn:active { transform: translateY(0); }

/* Keyframe animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}

.card   { animation: fadeIn 0.4s ease forwards; }
.loader { animation: spin 1s linear infinite; }

/* Performance: animate ONLY these two */
/* transform and opacity — GPU-accelerated, no layout */
/* AVOID: width, height, top, left, margin */

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</pre>

      <h3>Modern CSS Features</h3>
      <pre>{`/* :has() — CSS Parent Selector */
.card:has(img) { display: grid; grid-template-columns: 1fr 2fr; }
.form-group:has(:invalid) label { color: red; }

/* Cascade Layers — @layer */
@layer base, components, utilities;
@layer base      { h1 { font-size: 2rem; } }
@layer components { .btn { padding: 8px 16px; } }
@layer utilities  { .mt-4 { margin-top: 1rem; } }
/* Later layers win regardless of specificity */

/* Logical Properties (RTL/LTR adaptable) */
margin-inline-start  /* = margin-left in LTR */
margin-inline-end    /* = margin-right in LTR */
margin-block-start   /* = margin-top */
inline-size          /* = width */
block-size           /* = height */`}</pre>

      <h3>BEM Naming Convention</h3>
      <pre>{`/* BEM = Block__Element--Modifier */

/* Block */
.card { }

/* Element (child of block) */
.card__title { }
.card__image { }
.card__body  { }

/* Modifier (variant) */
.card--featured { }
.card--dark { }
.card__title--large { }`}</pre>

      <h3>CSS Architecture & Tools</h3>
      <pre>{`/* Modern CSS Reset */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

/* Design Tokens */
:root {
  --purple-500: #7C3AED;    /* Primitive token */
  --color-primary: var(--purple-500);  /* Semantic token */
}

Tools:
  Sass/SCSS    — variables, nesting, mixins, functions
  PostCSS      — transform CSS with plugins
  Tailwind CSS — utility-first framework
  CSS Modules  — locally scoped class names
  Stylelint    — CSS linter
  Autoprefixer — auto vendor prefixes`}</pre>
    </>),
  },

  {
    title: 'JavaScript — Zero to Industry Level',
    content: (<>
      <h3>What is JavaScript?</h3>
      <p>JavaScript is the only language that runs natively in web browsers and also runs on servers via Node.js. It is high-level, interpreted, dynamically typed, prototype-based, multi-paradigm, single-threaded, and garbage collected.</p>

      <h3>JavaScript Engines</h3>
      <pre>{`V8           — Chrome, Edge, Node.js, Deno
SpiderMonkey — Firefox
JavaScriptCore — Safari, Bun
Hermes       — React Native (mobile)`}</pre>

      <h3>Variables</h3>
      <pre>{`const name = "Alice";   // Can't be reassigned — USE BY DEFAULT
let   age  = 25;        // Can be reassigned
var   old  = true;      // AVOID — function-scoped, causes bugs

// Rule: const by default. let when you need to reassign. Never var.`}</pre>

      <h3>All Data Types</h3>
      <pre>{`// Primitives
String:    "hello", 'world', \`template\`
Number:    42, 3.14, -7, Infinity, NaN
BigInt:    9007199254740991n  (huge integers)
Boolean:   true, false
undefined: declared but not assigned
null:      intentional absence of value
Symbol:    Symbol('id') — unique immutable identifier

// Reference Types
Object:    { name: 'Alice', age: 25 }
Array:     [1, 2, 3]
Function:  function() {} / () => {}
Date:      new Date()
RegExp:    /pattern/flags
Map:       new Map()      // any key type, ordered
Set:       new Set()      // unique values only
WeakMap / WeakSet         // GC-friendly collections

// Type checking
typeof 42           // 'number'
typeof 'hello'      // 'string'
typeof null         // 'object' ← HISTORIC BUG!
typeof []           // 'object'
Array.isArray([])   // true ← use this

// Type Coercion
'5' + 3   // '53' (number → string)
'5' - 3   // 2    (string → number)
true + 1  // 2

// Always use === not ==
0 == false  // true (AVOID)
0 === false // false (correct)`}</pre>

      <h3>Operators</h3>
      <pre>{`Arithmetic:   + - * / % ** ++ --
Assignment:   = += -= *= /= %= **= &&= ||= ??=
Comparison:   == != === !== < > <= >=
Logical:      && || ! ?? (nullish coalescing)
Ternary:      condition ? valueIfTrue : valueIfFalse
Optional chain: obj?.prop?.method?.()
Spread:       ...array / ...obj
Rest:         function(...args)
typeof / instanceof / in / delete / void`}</pre>

      <h3>Strings — Every Method</h3>
      <pre>{`const str = "  Hello, World!  ";
str.length                  // 18
str.toUpperCase()           // "  HELLO, WORLD!  "
str.toLowerCase()           // "  hello, world!  "
str.trim()                  // "Hello, World!"
str.includes("World")       // true
str.startsWith("  Hello")   // true
str.endsWith("!  ")         // true
str.indexOf("o")            // 5
str.slice(2, 7)             // "Hello"
str.at(0)                   // "H"  (supports -1 for last)
str.replace("World", "JS")  // replaces first
str.replaceAll("l", "L")    // replaces all
"a,b,c".split(",")          // ["a","b","c"]
["a","b"].join(" - ")       // "a - b"
"5".padStart(3, "0")        // "005"
"hi".padEnd(5, ".")         // "hi..."
"ha".repeat(3)              // "hahaha"

// Template literals (use always!)
\`My name is \${name} and I'm \${age}\`
\`2 + 2 = \${2 + 2}\``}</pre>

      <h3>Arrays — Every Method</h3>
      <pre>{`const arr = [1, 2, 3, 4, 5];
arr[0]               // 1  (first)
arr.at(-1)           // 5  (last — modern)
arr.length           // 5

// Add / Remove
push(item)     — add to end; returns length
pop()          — remove from end; returns item
unshift(item)  — add to start
shift()        — remove from start
splice(i, n)   — remove n items at index i
splice(i, 0, x)— insert x at index i

// Iterate
forEach((item, index) => ...)

// Transform — return NEW array
map(x => x * 2)          // [2,4,6,8,10]
filter(x => x > 2)       // [3,4,5]
reduce((acc, n) => acc + n, 0)  // 15
flat()                    // flatten one level
flatMap(x => [x, x * 2]) // map + flat

// Search
find(x => x > 3)         // 4  (first match)
findIndex(x => x > 3)    // 3  (index)
includes(3)              // true
indexOf(3)               // 2
some(x => x > 4)         // true  (at least one)
every(x => x > 0)        // true  (all)

// Sort (mutates!)
[3,1,2].sort((a,b) => a - b)  // ascending
[3,1,2].sort((a,b) => b - a)  // descending

// Copy & Combine
const copy   = [...arr]
const merged = [...arr1, ...arr2]
const sliced = arr.slice(1, 3)

// Modern
Array.from({length:5}, (_,i) => i+1)  // [1,2,3,4,5]
Array.from("hello")  // ['h','e','l','l','o']

// Destructuring
const [first, second, ...rest] = arr`}</pre>

      <h3>Objects — Full Reference</h3>
      <pre>{`const user = {
  name: "Alice", age: 25, email: "alice@example.com",
  address: { city: "Mumbai" },
  greet() { return \`Hi, I'm \${this.name}\` }
}

user.name                  // "Alice"
user["email"]              // dynamic key access
user?.address?.city        // optional chaining — safe
user.phone ?? "N/A"        // nullish coalescing fallback

// Modify
user.role = "admin"        // add
user.age  = 26             // modify
delete user.email          // delete
"name" in user             // true

// Destructuring
const { name, age } = user
const { name: userName, age: userAge = 18 } = user  // rename + default

// Spread
const updated = { ...user, age: 27, role: "admin" }

// Object methods
Object.keys(user)      // ["name","age",...]
Object.values(user)    // ["Alice",25,...]
Object.entries(user)   // [["name","Alice"],...]
Object.assign({}, user, { age: 30 })
Object.freeze(user)    // prevent modifications

// Loop
for (const [key, value] of Object.entries(user)) {
  console.log(\`\${key}: \${value}\`)
}`}</pre>

      <h3>Functions — Every Pattern</h3>
      <pre>{`// Declaration (hoisted)
function add(a, b) { return a + b; }

// Expression
const multiply = function(a, b) { return a * b; }

// Arrow (concise, no own 'this')
const divide = (a, b) => a / b;
const square = n => n * n;      // single param
const hello  = () => "Hello!";  // no params

// Default params
function greet(name = "Guest", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`
}

// Rest & Spread
function sum(...nums) { return nums.reduce((a,b) => a+b, 0); }
Math.max(...[1,2,3])   // spread in call

// Closures — function remembers outer scope
function counter() {
  let count = 0;
  return {
    increment() { count++; },
    value()     { return count; }
  };
}
const c = counter();
c.increment(); c.value(); // 1

// Higher-Order Functions
const double  = multiply(2);     // returns function
[1,2,3].map(n => n * 2);         // takes function
[1,2,3].filter(n => n > 1);
[1,2,3].reduce((acc,n) => acc+n, 0);

// Pure function (same input = same output, no side effects)
const add = (a, b) => a + b;  // pure ✓

// IIFE
(function() { const secret = 42; })();`}</pre>

      <h3>Async JavaScript</h3>
      <pre>{`// Promises
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});
p.then(r => console.log(r)).catch(e => console.error(e));

// Async/Await (cleanest way)
async function getUser(id) {
  try {
    const res  = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

// Parallel requests
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
]);

Promise.race([slow(), fast()])      // first to resolve wins
Promise.allSettled([p1, p2, p3])    // wait for all, even if some fail
Promise.any([p1, p2, p3])           // first to SUCCEED`}</pre>

      <h3>Map, Set, Generators</h3>
      <pre>{`// Map — key-value pairs, any key type, ordered
const map = new Map();
map.set('name', 'Alice');
map.set(42, 'number key');
map.get('name');    // 'Alice'
map.has(42);        // true
map.size;           // 2
map.delete('name');
for (const [key, val] of map) { ... }

// Set — unique values only
const set = new Set([1, 2, 2, 3, 3]);
set.size;    // 3
set.add(4);
set.has(2);  // true
[...set];    // convert to array — [1,2,3,4]

// Generator functions
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
const g = gen();
g.next(); // { value: 1, done: false }`}</pre>

      <h3>Error Handling</h3>
      <pre>{`try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  console.error(error.name, error.message);
  // SyntaxError, TypeError, ReferenceError,
  // RangeError, URIError, EvalError, AggregateError
} finally {
  cleanup(); // always runs
}

// Custom error
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
throw new ValidationError('Required', 'email');`}</pre>

      <h3>ES Modules</h3>
      <pre>{`// math.js — named + default exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { ... }

// app.js — importing
import Calculator, { PI, add } from './math.js';
import * as Math from './math.js';       // namespace
import { add as sum } from './math.js';  // rename

// Dynamic import (lazy loading)
const { default: Chart } = await import('./chart.js');

// CommonJS (Node.js)
module.exports = { add, PI };
const { add } = require('./math');`}</pre>

      <h3>Design Patterns</h3>
      <pre>{`// Module Pattern
const UserModule = (() => {
  let users = []; // Private
  return {
    add(user) { users.push(user); },
    getAll()  { return [...users]; }
  };
})();

// Observer / Pub-Sub
class EventEmitter {
  #events = {};
  on(event, fn)   { (this.#events[event] ??= []).push(fn); }
  off(event, fn)  { this.#events[event] = this.#events[event]?.filter(f => f !== fn); }
  emit(event, data) { this.#events[event]?.forEach(fn => fn(data)); }
}

// Singleton
class Config {
  static #instance;
  static getInstance() { return (Config.#instance ??= new Config()); }
}`}</pre>

      <h3>Functional Programming</h3>
      <pre>{`// Compose (right to left)
const compose = (...fns) => x => fns.reduceRight((v,f) => f(v), x);
// Pipe (left to right)
const pipe = (...fns) => x => fns.reduce((v,f) => f(v), x);

// Currying
const curry = fn => function curried(...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (...more) => curried(...args, ...more);
};

// Memoization (cache results)
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Debounce (delay until user stops)
const debounce = (fn, delay) => {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
};

// Throttle (limit to once per interval)
const throttle = (fn, limit) => {
  let active = false;
  return (...args) => { if (!active) { fn(...args); active = true; setTimeout(() => active = false, limit); } };
};`}</pre>

      <h3>TypeScript Essentials</h3>
      <pre>{`let name: string = 'Alice';
let age:  number = 25;
let list: string[] = ['a', 'b'];
let tuple: [string, number] = ['Alice', 25];

// Interface
interface User {
  id:        number;
  name:      string;
  email?:    string;       // optional
  readonly role: string;   // read-only
}

// Generics
function identity<T>(arg: T): T { return arg; }

// Union & Intersection
type ID = string | number;
type AdminUser = User & { permissions: string[] };`}</pre>

      <h3>Security Best Practices</h3>
      <pre>{`✓ Never use innerHTML with untrusted input — use textContent or DOMPurify
✓ Validate and sanitize ALL user input (client AND server)
✓ Use Content Security Policy (CSP) headers
✓ Store tokens in httpOnly cookies, NOT localStorage
✓ Avoid eval() and new Function() with user data
✓ Use HTTPS everywhere — enforce with HSTS
✓ Implement rate limiting on API calls`}</pre>

      <h3>Build Tools & Testing</h3>
      <pre>{`Build Tools:
  Vite       — Dev server + build tool (fast, ESM native) ← use this
  Webpack    — Highly configurable bundler
  Rollup     — ES module bundler for libraries
  esbuild    — Extremely fast (written in Go)
  TypeScript — Typed superset of JavaScript
  ESLint     — Linting / code quality
  Prettier   — Code formatter

Testing:
  Vitest     — Fast unit testing (Vite ecosystem) ← use this
  Jest       — Full-featured testing framework
  Testing Library — DOM testing for React/Vue
  Playwright — E2E browser testing
  Cypress    — E2E with great DX
  MSW        — Mock Service Worker for API mocking

// Test example (Vitest/Jest)
import { describe, it, expect } from 'vitest';
describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});`}</pre>
    </>),
  },
]

export default function FrontendModule() {
  const { progress, updateProgress } = useAuth()
  const [open, setOpen] = useState(null)

  return (
    <>
      <Navbar />
      <div className="module-page">
        <p className="breadcrumb"><Link to="/dashboard">Dashboard</Link> › Frontend Development</p>
        <h1 className="module-title">🌐 Frontend Development</h1>
        <p className="module-desc">Complete HTML, CSS, and JavaScript — from zero to industry level. Your uploaded notes, fully integrated.</p>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <ProgressBar value={progress.frontend || 0} color="var(--orange)" />
        </div>
        <div className="section-list">
          {SECTIONS.map((s, i) => {
            const done = (progress.frontendSections || [])[i]
            const isOpen = open === i
            return (
              <div className="section-item" key={i}>
                <div className="section-header" onClick={() => setOpen(isOpen ? null : i)}>
                  <div className="section-title-row">
                    <div className="section-num" style={{ background: done ? 'var(--accent)' : 'var(--bg3)', color: done ? '#fff' : 'var(--muted)' }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className="section-title">{s.title}</span>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div className="section-body">
                    {s.content}
                    {!done ? (
                      <button className="btn btn-primary complete-btn" onClick={() => updateProgress('frontend', i)}>✓ Mark as Complete</button>
                    ) : (
                      <p className="success-msg" style={{ marginTop: '1rem' }}>✓ Section completed!</p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>
      </div>
    </>
  )
}

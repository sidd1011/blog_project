# DevLearn – Modern Full-Stack SEO Tech Blog & CMS Platform

> **"Learn. Build. Grow. / Code • Test • Grow"**

DevLearn is a high-performance, production-ready tech blogging platform built specifically to meet Google & Bing international SEO standards and Core Web Vitals best practices. It comes with a built-in interactive **Admin CMS Dashboard**, **Author Management**, and an **International SEO Suite**.

---

## 🚀 Key Features

### 1. Public Blog Platform (Screens 1 to 7)
- **Home Page (`/`)**:
  - Hero with animated floating tech badges (React, Cypress, Docker, Terminal).
  - Instant live search bar with popular topic pills (`React`, `Cypress`, `API Testing`, `Docker`, `Linux`, `SEO`).
  - Latest Articles grid showcasing the latest tutorials with category badges, reading time, and author metadata.
  - Featured learning tracks and newsletter call to action.
- **Blog & Tutorials Listing (`/blog`)**:
  - Dark indigo header banner with tech illustration.
  - Interactive **Categories Filter Sidebar** with live counts (`All (58)`, `React (12)`, `QA & Testing (10)`, etc.).
  - Instant sorting by "Latest" and "Most Popular".
- **Single Article Reading Experience (`/blog/[slug]`)**:
  - **Single `<h1>` Tag**: Perfectly placed with the focus keyword.
  - **Structured Headings (`<h2>` & `<h3>`)**: Clear hierarchy.
  - **Sticky Table of Contents**: Real-time scroll-spy indicating current heading and smooth jump links.
  - **Syntax-Highlighted Code Blocks**: 1-click "Copy Code" button.
  - **Checklists**: "What You Need" section with visual checkmarks.
  - **Social Share Suite**: 1-click sharing to X (Twitter), Facebook, LinkedIn, WhatsApp, and copy link with toast.
  - **Breadcrumbs Navigation**: Visual breadcrumbs + Schema.org `BreadcrumbList`.
  - **Prev / Next Article Navigation Cards**: For enhanced internal link juice and user retention.
- **Categories Grid (`/categories`)**:
  - Cards for all major topics (React, JavaScript, QA & Testing, API, DevOps, Linux, SEO, Tools).
- **Search Page (`/search`)**:
  - Fast search with category facets and live result counts.
- **About Page (`/about`)**:
  - Our Mission (Learn, Build, Grow), our story, and motto *"Better Code. Better Future."*.
- **Contact Page (`/contact`)**:
  - Direct contact cards (Email, Phone, Location) + interactive validated message form.
- **Privacy Policy Page (`/privacy-policy`)**:
  - Full GDPR & CCPA compliant data protection policy with breadcrumb schema.
- **Terms and Conditions Page (`/terms`)**:
  - Clear terms of service, open-source code snippet reuse permissions, and disclaimers.

---

### 2. Private Admin CMS Dashboard & SEO Engine (Separate Direct Link)
> **Note**: As configured, the Admin Dashboard is completely hidden from the public website UI (no dashboard buttons or links on Navbar, Mobile menu, or Footer). It is accessible only via its direct dedicated URL for administrators.

- **Direct Portal Route**: `/admin` (e.g. `http://localhost:3000/admin`)
- **Overview Dashboard (`/admin`)**:
  - Live metrics: Total Articles, Published vs. Drafts, Total Readers/Views, Authors Count, Average SEO Score.
  - Quick action buttons & Recent Articles table.
- **Article Manager (`/admin/articles`)**:
  - Complete list with search, category filtering, delete and edit actions.
- **Article Editor (`/admin/articles/new` & `/admin/articles/edit/[id]`)**:
  - Rich content editor with Markdown support.
  - Automatic URL slug generator (`/blog/react-deploy-guide`).
  - **Deep International SEO Settings**:
    - Focus Keyword targeting.
    - Unique Meta Title with character length indicator (30–65 chars).
    - Unique Meta Description with snippet length indicator (120–165 chars).
    - Canonical URL override.
    - Schema.org Type selection (`Article`, `TechArticle`, `BlogPosting`).
    - **Google SERP Snippet Preview**: Real-time desktop & mobile search result simulation.
    - **Automated SEO Health Meter**: Real-time score (0–100) and actionable checklist.
- **Category Manager (`/admin/categories`)**:
  - Add, edit, and delete categories with icons and color accents.
- **Users & Authors Manager (`/admin/users`)**:
  - Add authors and manage permissions (`Admin`, `Editor`, `Author`).
- **Technical SEO Suite (`/admin/seo`)**:
  - Live XML Sitemap inspector with direct access to `/sitemap.xml`.
  - Dynamic Robots.txt inspector with direct access to `/robots.txt`.
  - Site-wide SEO audit report across all posts.

---

### 3. International SEO Compliance
| SEO Requirement | Implementation | Status |
|-----------------|----------------|--------|
| **1 Clear H1** | Exactly one `<h1>` per page | ✅ Active |
| **Heading Hierarchy** | Logical `<h2>` and `<h3>` tags throughout | ✅ Active |
| **Short Paragraphs** | Scannable, bite-sized sections | ✅ Active |
| **Table of Contents** | Interactive sticky TOC with scroll-spy | ✅ Active |
| **Descriptive URLs** | `site.com/blog/react-website-deploy-kaise-karein` | ✅ Active |
| **Unique `<title>`** | Next.js dynamic `generateMetadata` | ✅ Active |
| **Unique Meta Description** | Custom per-article description | ✅ Active |
| **Open Graph & Twitter** | High-res 1200x630 cards with alt tags | ✅ Active |
| **Canonical URL** | Self-referencing canonical links | ✅ Active |
| **Article Schema** | JSON-LD `TechArticle` / `Article` | ✅ Active |
| **Breadcrumb Schema** | JSON-LD `BreadcrumbList` | ✅ Active |
| **Internal Linking** | Contextual links + Related posts | ✅ Active |
| **XML Sitemap** | Dynamic `/sitemap.xml` | ✅ Active |
| **Robots.txt** | Dynamic `/robots.txt` | ✅ Active |
| **Mobile Responsive** | Fully responsive Tailwind layout | ✅ Active |

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system:
  - Primary Blue: `#3062F6`
  - Secondary Indigo: `#6206F1`
  - Accent Emerald: `#1CD191`
  - Text: `#1F2937`
  - Background: `#F8FAFC`
- **Icons**: Lucide React
- **Data Persistence**: Portably persisted via JSON storage in `src/data/` with atomic API access.

---

## 💻 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser:
# Public site:  http://localhost:3000
# Admin CMS:    http://localhost:3000/admin
# XML Sitemap:  http://localhost:3000/sitemap.xml
# Robots.txt:   http://localhost:3000/robots.txt
```

To build for production:
```bash
npm run build
npm run start
```

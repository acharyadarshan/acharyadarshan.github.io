# Personal Academic Website

A minimal, static personal website built with [Eleventy (11ty)](https://www.11ty.dev/). Designed for researchers and engineers who want a clean site with a blog, paper reading notes, and topic summaries — without touching a framework.

The output is plain HTML, CSS, and zero client-side JavaScript (beyond Bootstrap and MathJax where needed). It deploys anywhere that serves static files — GitHub Pages, Netlify, Vercel, or a simple server.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local dev server (live reload)
npm run dev

# Build for production (output goes to _site/)
npm run build
```

The dev server runs at `http://localhost:8080` by default.

---

## Project Structure

```
.
├── .eleventy.js            # Build config (filters, collections, passthrough files)
├── .gitignore
├── package.json
└── src/                    # ← Everything you edit lives here
    ├── _data/
    │   └── site.json       # Global site metadata (name, email, links)
    ├── _includes/
    │   ├── base.njk        # Base layout (every page inherits this)
    │   └── post.njk        # Blog post layout (inherits base.njk)
    ├── assets/
    │   └── stylesheet.css  # Global styles
    ├── blog/
    │   ├── blog.json       # Default frontmatter for all blog posts
    │   ├── slow-mornings.md
    │   └── what-mountains-taught-me.md
    ├── data/
    │   └── seemron_resume.pdf
    ├── images/
    │   ├── profile.jpg
    │   └── robots/
    ├── index.njk               # Homepage
    ├── misc.njk                # Misc / About page
    ├── blog-index.njk          # Blog listing (auto-generated from blog/ folder)
    ├── paper_summaries.njk     # Paper reading notes
    ├── topic_summaries.njk     # Topic notes
    ├── favicon.ico
    ├── favicon.png
    ├── apple-touch-icon.png
    └── google9b6db348e255be16.html  # Google Search Console verification
```

**Folders you never edit manually:**

- `_site/` — Generated output. Rebuilt every time you run `npm run build`.
- `node_modules/` — npm dependencies.

---

## Making It Your Own

### Step 1: Update your identity

Edit `src/_data/site.json`:

```json
{
  "name": "Your Name",
  "title": "Your Title / Role",
  "location": "Your City, Country",
  "email": "you@example.com",
  "linkedin": "https://linkedin.com/in/your-handle/",
  "github": "https://github.com/your-handle",
  "cv": "/data/your_resume.pdf"
}
```

Every template references this file. Change it once, it updates everywhere — the navbar brand, homepage profile card, footer copyright, etc.

### Step 2: Update the homepage

Edit `src/index.njk`. The profile card automatically pulls from `site.json`. Edit the bio paragraphs, research interests, and experience entries directly in the HTML below the frontmatter.

### Step 3: Replace static files

- `src/images/profile.jpg` — your photo
- `src/data/seemron_resume.pdf` — your CV
- `src/favicon.ico`, `src/favicon.png`, `src/apple-touch-icon.png` — your favicons
- `src/google9b6db348e255be16.html` — replace with your own Google Search Console verification file, or delete it

### Step 4: Update the navbar

Edit `src/_includes/base.njk`. The navbar links are around line 27–31:

```html
<ul class="navbar-nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="/paper_summaries/">Papers</a></li>
    <li class="nav-item"><a class="nav-link" href="/topic_summaries/">Topics</a></li>
    <li class="nav-item"><a class="nav-link" href="/blog/">Blog</a></li>
    <li class="nav-item"><a class="nav-link" href="/misc/">Misc.</a></li>
</ul>
```

Add, remove, or reorder links here. If you add a new page (see "Adding a new standalone page" below), add a nav link pointing to its `permalink`.

---

## How Layouts Work

This site uses Eleventy's layout chaining with [Nunjucks](https://mozilla.github.io/nunjucks/) templates.

### The base layout (`src/_includes/base.njk`)

Every page on the site inherits this layout. It provides:

- The full `<head>` (meta tags, stylesheets, favicons)
- The navbar
- A slot for page content: `{{ content | safe }}`
- The footer
- Bootstrap + jQuery scripts

When you create any page and set `layout: base.njk` in its frontmatter, 11ty takes everything in that page's body and injects it where `{{ content | safe }}` appears in the base layout.

### The post layout (`src/_includes/post.njk`)

Blog posts use a two-level chain: **post.njk → base.njk**. The post layout adds the post title, date, read time, and navigation links around the blog content, then the whole thing gets injected into base.njk.

### Frontmatter

The `---` block at the top of every file is called **frontmatter**. It's YAML that tells 11ty how to process the page.

```yaml
---
layout: base.njk                # Which layout to wrap this page in
pageTitle: "Page Name | Site"   # Browser tab title (<title> tag)
permalink: /my-page/            # The URL this page is served at
extraHead: |                    # Optional: inject extra <style> or <link> into <head>
    <style>
        .my-class { color: red; }
    </style>
extraScripts: '<script src="..."></script>'   # Optional: inject <script> before </body>
---
```

Available frontmatter fields:

| Field | Required | What it does |
|---|---|---|
| `layout` | Yes | Which layout template wraps this page |
| `pageTitle` | No | Sets the `<title>` tag. Falls back to `site.name` from site.json |
| `permalink` | No | The output URL. Without it, 11ty derives it from the filename |
| `extraHead` | No | Raw HTML injected into `<head>` (use for page-specific CSS) |
| `extraScripts` | No | Raw HTML injected before `</body>` (use for page-specific JS) |

---

## Content Editing Guide

### Blog Posts (`src/blog/`)

Blog posts are Markdown files. Each file in `src/blog/` that ends in `.md` automatically becomes a blog post.

**To add a new post**, create a file like `src/blog/my-new-post.md`:

```markdown
---
title: "My new post title"
date: 2026-03-01
readTime: "5 min read"
---

Your content in plain markdown.

Use **bold**, *italics*, `code`, [links](https://example.com).

## Section headings work

So do lists:

- Item one
- Item two
```

That's it. The blog listing page at `/blog/` auto-updates to show this post. No other file to edit.

**How it works under the hood:** The file `src/blog/blog.json` applies default frontmatter to every `.md` file in the folder:

```json
{
  "layout": "post.njk",
  "tags": "blog"
}
```

This means every blog post automatically uses the post layout and gets added to the `blog` collection. The blog listing page (`src/blog-index.njk`) loops over `collections.blog` to render the list.

**Blog post frontmatter fields:**

| Field | Required | What it does |
|---|---|---|
| `title` | Yes | Post title shown on the page and in the blog listing |
| `date` | Yes | Used for sorting (newest first) and displayed on the post |
| `readTime` | No | Shown next to the date, e.g. "4 min read" |

**URL pattern:** A file named `src/blog/my-post.md` becomes `/blog/my-post/`.

---

### Paper Summaries (`src/paper_summaries.njk`)

This is a single file containing all paper reading notes. It uses native HTML `<details>` / `<summary>` elements for collapsible sections.

**Structure:**

```
Date range header
  └── Paper 1 (collapsible)
  └── Paper 2 (collapsible)
  └── Paper 3 (collapsible)
Date range header
  └── Paper 4 (collapsible)
  ...
```

**To add a new paper**, find the right date section (or create a new one) and paste this block:

```html
<!-- New date section (if starting a new week) -->
<div class="paper-titles">2/10/2026~2/16/2026</div>

<!-- One paper entry -->
<details>
    <summary>
        Paper Title Here (Author et al., Year)
    </summary>
    <div class="content">
        <p>
            What the paper studies. The main problem and motivation.
        </p>

        <b>Method</b>
        <p>
            How they approach it. Key technical ideas.
        </p>

        <b>Results</b>
        <p>
            What they found. Numbers, comparisons, ablations.
        </p>

        <b>Questions</b>
        <ul>
            <li>Your open questions or critiques about this work.</li>
            <li>Things you'd want to investigate further.</li>
        </ul>
    </div>
</details>
```

**Notes:**

- The `<b>Method</b>`, `<b>Results</b>`, `<b>Questions</b>` structure is a convention, not a requirement. Use whatever sections make sense for each paper.
- For a paper you haven't finished reading yet, just put `WIP` inside the content div.
- Math works: use `\( x^2 \)` for inline math and `\[ \sum_{i=1}^{n} x_i \]` for display math. MathJax is loaded via the `extraScripts` field in the frontmatter.
- Use `<code>ModelName</code>` for model/method names in running text.

---

### Topic Summaries (`src/topic_summaries.njk`)

Same collapsible pattern as paper summaries, but grouped by **category** instead of date.

**Structure:**

```
Category header (e.g. "Mathy Notes")
  └── Topic 1 (collapsible)
  └── Topic 2 (collapsible)
Category header (e.g. "More Empirics-Centered Notes")
  └── Topic 3 (collapsible)
Plain list section (e.g. "Other Notes (PDFs)")
```

**To add a new topic:**

```html
<!-- Under an existing category, or create a new one: -->
<div class="subheaders">New Category Name</div>

<details>
    <summary>Topic Name</summary>
    <div class="content">
        <p><strong>Key Concept</strong></p>
        <p>Your notes here...</p>
        <p><strong>Reference:</strong> <a href="https://...">Paper or resource link</a></p>
    </div>
</details>
```

**To add a PDF link at the bottom:**

```html
<li><a href="/data/my-notes.pdf" class="link">LaTeXed notes</a> for Subject Name</li>
```

(Put the PDF file in `src/data/` so it gets copied to the output.)

---

### Misc Page (`src/misc.njk`)

A simple page with static HTML content. Edit it directly — no special syntax beyond the frontmatter at the top.

---

### Homepage (`src/index.njk`)

The profile card reads from `site.json` using Nunjucks template variables:

```html
<h1>{{ site.name }}</h1>
<div class="profile-title">{{ site.title }}</div>
```

The bio, research interests, and experience sections are plain HTML below.

---

## Adding a New Standalone Page

1. Create `src/my-page.njk`:

```html
---
layout: base.njk
pageTitle: "My Page | Seemron Neupane"
permalink: /my-page/
---

<div class="container pt-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <h1>My Page</h1>
            <p>Content here...</p>
        </div>
    </div>
</div>
```

2. Add a nav link in `src/_includes/base.njk`:

```html
<li class="nav-item"><a class="nav-link" href="/my-page/">My Page</a></li>
```

3. Build. Done.

---

## Nunjucks Syntax Reference

This site uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating. Here's the syntax you'll encounter:

```
{{ variable }}              → Print a variable's value
{{ variable | safe }}       → Print without escaping HTML
{{ site.name }}             → Access data from site.json
{{ content | safe }}        → Where child page content gets injected (in layouts)

{% if condition %}          → Conditional
{% endif %}

{% for item in list %}      → Loop
{% endfor %}

{%- for post in collections.blog %}   → Loop (the - trims whitespace)
```

**You only need Nunjucks for dynamic pages** (like the blog listing). For pages where you're just writing content (misc, paper summaries, topic summaries), it's plain HTML inside the frontmatter wrapper.

---

## CSS Classes Reference

These are defined in `src/assets/stylesheet.css` and used across pages:

| Class | What it does |
|---|---|
| `.subheaders` | Bold 12pt section heading with top margin |
| `.paper-titles` | Bold 12pt date range header (paper summaries) |
| `.aligned-text` | Justified text alignment |
| `.about` | Justified text for the homepage bio |
| `.content` | Left margin + top margin inside collapsible sections |
| `.thisauthor` | Bold underlined text (for highlighting your own name in author lists) |

The collapsible `<details>` / `<summary>` styling (border, arrow rotation, padding) is also in `stylesheet.css`.

---

## Deployment

### GitHub Pages (with GitHub Actions)

Since the site needs a build step, you'll need a GitHub Action. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

Then in your repo settings, set GitHub Pages source to the `gh-pages` branch.

### Netlify / Vercel

Set the build command to `npm run build` and the publish directory to `_site`.

---

## Config Reference (`.eleventy.js`)

The config file does three things:

1. **Date filter** — `dateFormat` converts dates to readable strings like "February 2026" in templates.
2. **Passthrough copies** — tells 11ty to copy static files (images, CSS, PDFs, favicons) to the output as-is without processing them.
3. **Blog collection** — gathers all `.md` files in `src/blog/`, sorts them by date (newest first), and makes them available as `collections.blog` in templates.

If you add a new static folder (e.g. `src/pdfs/`), add a passthrough line:

```js
eleventyConfig.addPassthroughCopy("src/pdfs");
```

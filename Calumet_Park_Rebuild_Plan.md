# Rebuilding **MyCalumetPark.com** with Astro, Tailwind CSS & a Headless CMS

## 1 Current website overview

The existing MyCalumetPark.com is a full‑width, modern site with a calm, respectful aesthetic appropriate for a memorial park.  It uses muted greens and dark gray backgrounds with white or off‑white sections.  The home page has a **top bar** with office hours, a phone number and address followed by a **navigation bar** (logo, menu items and social icons).  Below the navigation bar is a hero section (currently a video/image placeholder) and four call‑to‑action cards guiding visitors to _Pre‑Plan_, _Immediate Need_, _Grave Finder_ and _Obituaries_【69871372664411†screenshot】.

Key design features and content types include:

- **Consistent color palette and typography.**  The site uses a dark green/teal accent color for buttons and links, dark gray headers and white/light gray backgrounds.  Fonts are sans‑serif with large headings and generous line height.
- **Prominent hero sections.**  Pages such as the Services page open with full‑width imagery overlaid with large headlines and descriptions.  For example, the Services page headline reads “Traditional + Modern Approaches to Memorials”【837628024013937†screenshot】.
- **Section cards with icons and buttons.**  On the home page, four cards describe major actions (pre‑planning, immediate needs, grave finder and obituaries) with icons and concise descriptions【69871372664411†screenshot】.
- **Dynamic content:** events, “verse of the day,” interactive map and image sliders.  Some pages embed forms to collect visitors’ names, email and phone and contain category‑based FAQs【453522732733678†screenshot】【445332086915083†screenshot】.
- **Forms and calls to action.**  Many sections include simple forms for requesting information (name, phone and service type) with a teal submit button【453522732733678†screenshot】.  The footer includes an email sign‑up form and columns of quick links【121579628632905†screenshot】.

The navigation structure includes pages for **Recent Loss**, **Our Services**, **Resources + Education** (with sub‑pages such as FAQs and The Path to Salvation), **About Us**, **Shop Urns**, **Obituaries** and **Contact**.  Each page follows the same aesthetic, often with a hero image, content blocks with images/text and forms or CTAs.

## 2 Technology stack recommendation

### Static site generator

**Astro** is well‑suited for rebuilding MyCalumetPark.com because it produces fast, static HTML by default while still allowing island‑based interactivity when needed.  It integrates well with Tailwind CSS and can source data at build time from headless CMSs.  The site’s existing structure (relatively static content, occasional dynamic forms and blog‑like pages) fits the static‑first model.

### Styling

Use **Tailwind CSS** for styling.  Tailwind’s utility classes simplify replicating the site’s spacing, typography and color palette.  You can extend the default color palette to match Calumet Park’s teal and dark gray hues and define custom fonts via `@import` of Google Fonts or self‑hosted fonts.  Components such as cards, navigation bars and forms can be built using Tailwind and extracted into reusable Astro components.

### Headless CMS

A headless CMS will manage content and allow non‑technical staff to update pages and publish blog posts, events and obituaries without touching code.  Suitable options include:

| Option | Pros | Cons |
| --- | --- | --- |
| **Sanity** | Real‑time collaborative editing, flexible schemas, rich‑text support and a generous free tier.  Astro’s Sanity integration can fetch data via GROQ queries at build time. | More configuration up front; learning GROQ. |
| **Contentful** | Intuitive UI, good media management and robust GraphQL API.  Community tier is free up to certain limits. | More restrictive free plan; GraphQL API rate limiting. |
| **Netlify CMS** | Git‑based CMS that stores content as Markdown/YAML in the repository.  Simple to set up and no external service necessary.  Works well with Astro. | No rich relations; editorial workflow depends on Git; may be harder for non‑technical users. |

**Recommendation:** use **Sanity** or **Contentful** for their flexible content models.  Define schemas for _Services_, _Events_, _FAQ items_, _Obituaries_, _Blog posts_, _Team members_ and _Site settings_.  Content editors can update images, headings, copy, and CTA targets through the CMS.  Astro will fetch and render the data at build time.  For simple forms (contact, burial information request), use **Netlify Forms** or **Formspree** for a no‑code submission backend.  These integrate easily with Astro pages.

### Hosting platforms

Astro builds a static site that can be deployed on any CDN.  Two popular hosting platforms are Vercel and Netlify:

| Platform | Free‑tier features | Pricing beyond free tier | Notes |
| --- | --- | --- | --- |
| **Vercel** | 100 GB/month bandwidth, 1 GB of build cache, 90 deployments per month, serverless functions (100 GB‑hours/month). | Pro plan ~US $20/month with increased bandwidth and concurrency. | Excellent developer experience and Git integration.  Allows edge functions if you later add dynamic features like search. |
| **Netlify** | 100 GB/month bandwidth, 300 build minutes/month, serverless functions (125k monthly).  Built‑in form handling. | Pro plan starts at ~US $19/month with 400 GB bandwidth. | Built‑in form submission and identity management are handy for contact forms. |
| **Cloudflare Pages** | Unlimited free bandwidth, 20 deployments per month. | Paid for higher concurrency. | Cheaper for high‑traffic static sites.  Serverless functions (Workers) available. |

Both Vercel and Netlify can build Astro projects directly from a Git repository and support preview deployments.  Netlify’s form handling could simplify the many forms on the site, whereas Vercel’s edge functions and image optimization might be valuable if future features become more dynamic.  **Recommendation:** Start with **Netlify** because of its free built‑in form processing and simple deploy pipeline; consider Vercel if you need more advanced serverless features later.

## 3 High‑level rebuild plan

### Phase 1 – Project setup

1. **Repository & workflow.**  Create a new Git repository (e.g., on GitHub).  Set up a main branch (e.g., `main`) for production and a development branch (`dev`).  Configure continuous deployment with Netlify or Vercel so pushes to `main` trigger a rebuild.
2. **Initialize Astro project.**  Use `npm create astro@latest` to scaffold a new project with the Tailwind CSS integration.  Set up **ESLint**, **Prettier** and optional **Husky** hooks to maintain code quality.
3. **Configure Tailwind.**  Extend Tailwind’s `tailwind.config.mjs` to include a custom color palette matching Calumet Park’s greens and grays.  Import any required Google Fonts (e.g., `Montserrat` or `Lato`) via `@import` in a global stylesheet and add them to the `fontFamily` config.

### Phase 2 – Core layout and design system

1. **Build the global layout component.**  Create an Astro layout that includes the top bar (office hours, contact info), the main navigation with dropdown menus, and the footer with sign‑up form and link columns.  The navigation can be extracted into an Astro component with a JSON array describing menu items and sub‑menus.
2. **Define reusable UI components.**  Components like **CallToActionCard**, **SectionHeading**, **FeatureList**, **Accordion**, **Form**, and **ImageSlider** will be used across pages.  Using Tailwind’s utility classes ensures consistent spacing and responsiveness.
3. **Integrate icons.**  Use the open‑source [Heroicons](https://heroicons.com) or Font Awesome for icons (e.g., those used in the four call‑to‑action cards【69871372664411†screenshot】) via an Astro component.
4. **Implement forms.**  Create a `ContactForm.astro` component that posts to Netlify Forms or Formspree.  Each instance can accept props to customize placeholder text and submit‑button labels.

### Phase 3 – Content structure and CMS integration

1. **Model the content.**  In the headless CMS, define schemas:
   * **Page** (slug, title, hero image/video, lead text, sections[]).
   * **ServiceCategory** (title, description, image, list of options and associated form configuration).
   * **Event** (title, date, description, images, call‑to‑action link).
   * **FAQCategory** and **FAQItem** (question, answer, category reference).
   * **BlogPost/Article** for resources & education articles.
   * **Obituary** (name, dates, tribute text, images, video link).  If the existing site’s obituaries are hosted on a subdomain, link rather than duplicate.
2. **Fetch data in Astro.**  Create front‑end functions (`lib/cms.ts`) to query the CMS at build time.  Use environment variables for API keys.  For example, `const services = await fetchServices()` returns structured service data for the Services page.
3. **Convert content.**  Use a combination of manual migration (copy text from the existing site) and programmatic import (if the CMS supports CSV/JSON import) to populate the headless CMS with current pages, FAQs and events.

### Phase 4 – Page implementation

1. **Home page** (`src/pages/index.astro`): build hero section with optional background video or static image.  Add four call‑to‑action cards modeled after the current site【69871372664411†screenshot】.  Use a CMS collection for **events** to show upcoming events and include a verse of the day (could be stored in the CMS or retrieved via an API).  Add a section to describe the Grave Finder tool and include a link to the existing interactive tool.  Conclude with a section promoting the most popular options (burial, cremation, green) using tabbed cards.
2. **Services page** (`src/pages/services/index.astro`): create sections for Traditional Burial Options, Cremation Options, Resting Places and Custom Memorials.  Each section uses the `ServiceCategory` content from the CMS and includes bullet lists and small forms【453522732733678†screenshot】.  Use an Astro island (e.g., a Svelte or React component) for tab navigation if interactive tabs are desired.
3. **About page** (`src/pages/about/index.astro`): highlight the heritage of Calumet Park with copy and photo sliders.  Include the veterans section and the simplified map of the park (could be a static SVG with clickable areas or a simple Leaflet component if interactive mapping is needed).  Provide a link out to the existing GraveFinder tool.  Include a timeline or “Generations of Excellence” section to tell the story of the park.【188973342134703†screenshot】
4. **Resources & Education** (`src/pages/resources/*.astro`): build sub‑pages for GraveFinder, The Path to Salvation and FAQs.  The FAQ page should replicate the left‑hand category navigation and collapsible Q&A items【445332086915083†screenshot】.  Use Astro’s SSR if you want search or filtering in the future.
5. **Obituaries page**: if the obituaries are hosted externally (e.g., `obits.mycalumetpark.com`), provide an iframe or link.  Otherwise, fetch obituary entries from the CMS and render a searchable list with detail pages.
6. **Contact page**: include the contact form, office hours, location map and social links.
7. **Shop Urns page**: if there is an external e‑commerce platform, link out.  If products are to be listed, use a CMS schema for products and implement a product listing grid with images and descriptions.

### Phase 5 – Testing and deployment

1. **Accessibility and responsiveness.**  Test pages across different viewport sizes.  Ensure color contrast meets WCAG guidelines; Tailwind’s `ring` and `focus` classes help with focus states.
2. **Performance.**  Use Astro’s image component to optimize images.  Evaluate build size and configure [Astro’s `image`](https://docs.astro.build/en/guides/images/) integration to serve responsive images.
3. **Deploy to Netlify/Vercel.**  Connect the Git repository to the chosen platform.  Set environment variables for the CMS API keys.  Configure preview deployments on pull requests.
4. **Set up domain.**  Point `mycalumetpark.com` to the hosting platform’s DNS.  Enable HTTPS.
5. **Ongoing updates.**  Editors update content through the CMS.  When changes are published, a webhook triggers a new build and deployment on Netlify or Vercel.  For immediate updates (e.g., obituaries), consider incremental static regeneration or on‑demand revalidation.

## 4 Leveraging Codex

“Codex” refers to GitHub’s AI pair‑programming assistant.  After the initial design system is in place, Codex can assist with scaffolding out page components, generating TypeScript types for CMS data, writing GROQ/GraphQL queries and converting HTML into Astro component markup.  For example, you can:

- Paste the HTML of a section (copied from the existing site) and ask Codex to rewrite it using Tailwind classes in an Astro component.
- Request help writing a `fetchServices()` function that queries Sanity’s API and returns typed data.
- Use Codex to draft tests for the FAQ accordion component or to automate form submissions with Netlify Forms.

Codex works best when given clear component boundaries and examples from your design system.  It should remain a helper; human review is essential to ensure accessibility and consistency.

## 5 Next steps

1. **Decide on the CMS** (Sanity vs Contentful vs Netlify CMS) and set up an account.
2. **Initiate the Astro project** with Tailwind and build the global layout components.
3. **Start migrating content** into the CMS while replicating the design using Astro components.  Begin with the home page and Services page, as they cover most design patterns.
4. **Test deployments** on your chosen hosting platform and iterate based on feedback.

Recreating MyCalumetPark.com with Astro and Tailwind offers a modern, performant architecture that still honors the current site’s look and feel.  Using a headless CMS empowers non‑technical staff to manage content while keeping hosting costs low through static deployment.

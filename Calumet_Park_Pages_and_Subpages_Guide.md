# MyCalumetPark.com — Page & Route Guide (Prompt-Ready)

Use this as the **source-of-truth sitemap + relationships spec** for rebuilding the site in Astro + Tailwind + headless CMS.

---

## 0) Global (site-wide) structure

### Header navigation (top-level → dropdown items)
- **Recent Loss**
  - Immediate Need
  - Obituaries *(external)*
  - Grief Counseling
- **Our Services**
  - Only at Calumet Park
  - Burials, Cremation and More
  - Veterans
  - Pre-planning
- **Resources + Education**
  - Calumet Park’s GraveFinder *(interactive; OK to defer)*
  - The Path To Salvation *(interactive; consider placeholder)*
  - FAQs
- **About Us**
  - About Calumet Park
  - Virtually Tour CPC *(currently points to About; recommended dedicated route)*
  - Locations + Hours *(currently the Contact page)*
- **Shop Urns** *(external)*
- Obituaries *(external quick link)*
- Contact

### Footer navigation blocks (3 columns)
- **Products + Services**
  - Traditional Burial Options
  - Popular Cremation Options
  - Resting Places
  - Custom Memorials
- **New at CPC**
  - Angel’s Flight
  - Aerial Ash Scattering
  - Green Burial
  - Hike-In Ash Scattering
  - Scattering Gardens
- **Helpful Resources**
  - Schedule Your Visit
  - Locations + Hours
  - Veterans Benefits
  - Work With Us
  - Privacy policy

### Site-wide components
- **“Keep in Contact”** email signup section (appears on most pages)
- **Cookie notice** banner
- Consistent **phone + office hours** bar at the top

---

## 1) Canonical routes to implement (keep these URLs)

> These are the routes you should create in the Astro project so existing links and SEO keep working.

### Home
- `/` — Home / landing page

### Recent Loss
- `/immediate-need/` — “We are here for you” + **Immediate Need multi-step form** + links to Survivor’s Checklist downloads
- `https://obits.mycalumetpark.com` — Obituaries (external)
- `/grief-counseling/` — RSVP + grief counseling info + child resources

### Our Services
- `/services/` — **Services hub** (Burials, Cremation and More)
  - Contains these major sections (recommended to implement as **page sections with anchors**):
    - `#traditional-burial-options`
    - `#cremation-options`
    - `#resting-places`
    - `#custom-memorials`
  - (Optional but recommended for clarity) Create **alias routes** that redirect to the sections:
    - `/traditional-burial-options/` → `/services/#traditional-burial-options`
    - `/popular-cremation-options/` → `/services/#cremation-options`
    - `/resting-places/` → `/services/#resting-places`
    - `/custom-memorials/` → `/services/#custom-memorials`
- `/only-at-cpc/` — “Only at Calumet Park” feature offerings (Horse & Buggy, Air Scattering, Harley Hearse, etc.)
  - (Optional) Add detail subpages if you want each offering to have its own URL:
    - `/only-at-cpc/aerial-ash-scattering/`
    - `/only-at-cpc/angels-flight/`
    - `/only-at-cpc/green-burial/`
    - `/only-at-cpc/hike-in-ash-scattering/`
    - `/only-at-cpc/scattering-gardens/`
    - `/only-at-cpc/harley-hearse/`
    - `/only-at-cpc/horse-and-buggy/`
- `/veterans/` — Veteran services overview + benefits info
- `/pre-planning/` — Pre-planning content + CTAs

### Resources + Education
- `/gravefinder/` — GraveFinder tool page *(interactive; OK to defer)*  
  - **Phase 1 option**: keep a static page that explains the steps + a button linking to the legacy tool or Google Maps deep link logic.
- `/path-to-salvation-interactive/` — Path to Salvation *(interactive)*
  - **Phase 1 option**: placeholder page that preserves the URL + links to the legacy experience.
- `/faqs/` — FAQs (single long page with grouped sections)

### About Us
- `/about/` — About Calumet Park (history/mission/grounds)
- `/virtual-tour/` — **Recommended new route**: “Virtually Tour CPC”
  - In Phase 1 you can **reuse the About page content** or link out to the same media.
- `/contact/` — Contact + Locations + Hours (this is currently used as “Locations + Hours”)

### Events
- `/events/` — CPC Events listing page (event cards for the current year)
- Individual event detail pages (these are currently **top-level slugs**, not nested under `/events/`):
  - `/mothers-day/`
  - `/memorial-weekend/`
  - `/fishing-for-memories/`
  - `/butterfly-release/`
  - `/5k/` *(Light the Darkness 5K)*
  - `/veterans-day/`
  - `/angel-tree/`
- (Optional redirects to preserve legacy WordPress archive routes)
  - `/category/events/` → `/events/`
  - `/author/<id>/` → `/events/` *(or remove/noindex)*  
  - `/tag/<tag>/` → `/events/` *(or create tag pages if you want)*

### Hiring + Legal
- `/apply/` — Join Our Team (application form)
- `/privacy/` — Privacy policy

### Required “plumbing”
- `/404/` (or framework equivalent)
- `/sitemap.xml`
- `/robots.txt`

---

## 2) Recommended “clean IA” (optional improvement)

If you want a cleaner structure long-term (while still preserving old URLs via redirects):

- `/locations/` (new index)
  - `/locations/merrillville-cemetery/`
  - `/locations/rendina-funeral-home-gary/`
  - `/locations/hobart-funeral-chapel-crematory/`
  - `/locations/merrillville-funeral-chapel/`
- `/events/<slug>/` (new canonical for future posts)
  - Keep existing top-level event slugs as redirects to the new canonical URLs.

---

## 3) Content models for your headless CMS (and how pages relate)

### A) `Page` (static pages)
Use for: home, services, veterans, pre-planning, about, faq, contact, privacy, apply.
- Fields:
  - `title`
  - `slug`
  - `seo`: `{ title, description, ogImage }`
  - `hero`: `{ headline, subhead, image, ctaLabel, ctaHref }`
  - `sections[]`: flexible blocks (rich text, image gallery, testimonials, FAQ accordion, etc.)
  - `showNewsletterSignup` (boolean)

**Relationships**
- `Page (contact)` references `Location[]`
- `Page (services)` references `ServiceOption[]` and `SpecialOffering[]`
- `Page (only-at-cpc)` references `SpecialOffering[]`

### B) `Event` (CMS collection)
Use for: Mother’s Day, Memorial Weekend, etc.
- Fields:
  - `title`
  - `slug` (keep current top-level slugs)
  - `year` (e.g., 2026)
  - `dateDisplay` (e.g., “May 10”)
  - `startDateTime` / `endDateTime` (optional, for sorting)
  - `summary`
  - `heroImage`
  - `contentBlocks[]` (rich content)
  - `ctaLinks[]` (RunSignup registration, course map, etc.)
  - `locationRef` (optional → `Location`)
  - `tags[]` (optional)

**Relationships**
- `Event` can reference `Location` (where it happens)
- `Event` can link to `SpecialOffering` (if relevant)

### C) `Location`
Use for the four primary addresses (also used on Immediate Need + Contact pages).
- Fields:
  - `name`
  - `type` (Cemetery, Funeral Home, Funeral Chapel, Crematory)
  - `address`
  - `phone`
  - `fax` (optional)
  - `hours` (text or structured)
  - `mapUrl` (Google Maps)
  - `primaryCTA` (e.g., call, directions)
  - `images[]`

### D) `ServiceOption`
Use for the selectable options inside Services.
- Examples:
  - Ground Burial or Cremation
  - Community Mausoleum Entombment
  - Private Family Mausoleums
  - Niche Inurnment
  - Green Burial
  - Aerial Ash Scattering
  - Hike-In Ash Scattering
  - Angel’s Flight
  - Inurnment of Cremains
  - Ground Burial of Cremains
- Fields:
  - `name`
  - `category` (Burial, Cremation, Resting Places, Memorials)
  - `shortDescription`
  - `images[]`
  - `cta` (label + href)

### E) `SpecialOffering`
Use for “Only at CPC” + “New at CPC” items (Harley Hearse, Horse & Buggy, Scattering Gardens, etc.)
- Fields:
  - `name`
  - `slug` (optional subpage)
  - `tagline`
  - `description`
  - `gallery[]`
  - `cta` (label + href)

### F) `FormConfig` (optional)
If you don’t want to hardcode form fields in the repo, store form schemas in CMS:
- `immediateNeedForm`
- `contactForm`
- `applyForm`
- `newsletterForm`

### G) `DownloadAsset`
Use for checklists and printable resources.
- Fields:
  - `title`
  - `file` (PDF/DOC/XLSX)
  - `slug` (or direct file path)
  - `description`

---

## 4) Page-by-page “what it must contain” checklist (for Codex)

### `/`
- Hero with primary CTA (Contact / Schedule)
- Prominent blocks for:
  - Services
  - Events (2026 lineup preview)
  - GraveFinder (optional)
- Testimonials / trust signals
- Newsletter signup

### `/immediate-need/`
- “We are here for you” intro
- All locations (same as Contact) + phone numbers
- Immediate Need multi-step form (with upload + consent)
- Survivor’s checklist downloads (Excel/Word/PDF)
- Newsletter signup

### `/grief-counseling/`
- What it is + “free” message
- RSVP mechanism (form or outbound link)
- “Thoughts for grieving children” resources section
- Newsletter signup

### `/services/`
- Services overview
- Four main sections (traditional burial, cremation, resting places, custom memorials)
- ServiceOption selectors / CTAs to Contact
- Link to FAQs (grounds questions)
- Newsletter signup

### `/only-at-cpc/`
- “Popular Options” highlight cards
- “New at CPC” section (special offerings)
- Contact CTA

### `/veterans/`
- Veteran program overview
- What to bring / how to claim benefits
- Contact CTA

### `/pre-planning/`
- Philosophy + “have the talk”
- CTAs to schedule a meeting / contact
- Links to forms/resources

### `/gravefinder/` (Phase 1 placeholder OK)
- Explain “4 steps”
- Inputs (Section/Block/Lot) only if you rebuild now; otherwise keep a simple explainer + tutorial video/embed

### `/path-to-salvation-interactive/` (placeholder OK)
- Preserve URL
- Static content or link to legacy tool

### `/faqs/`
- Single long page
- In-page table of contents linking to each category section

### `/about/`
- Heritage/history
- Grounds beauty + gallery
- Veterans quote block
- “Explore the park” explanation (Sections/Blocks/Lots)
- CTAs to GraveFinder, map download, etc. (fix broken links)

### `/virtual-tour/` (recommended new)
- Embedded video(s) and/or photo tour
- Links to location pages (if you create them)

### `/contact/`
- All locations with address, phone, fax, hours
- “Schedule a call” CTA (Calendly or equivalent)
- Contact form with topic selector

### `/events/`
- Events index page (sortable by date)
- Event cards showing date + blurb + hero image
- Each card links to its event page

### Event pages (e.g., `/mothers-day/`)
- Event hero image + title + year
- Date/time + instructions
- Any registration links (RunSignup, course map, etc.)
- Contact CTA

### `/apply/`
- “Join our team” intro
- Photo gallery
- Application form with:
  - interest prompt
  - position dropdown
  - experience yes/no
  - weekend availability yes/no
  - licenses text field
  - CV upload

### `/privacy/`
- Privacy policy content (static)

---

## 5) Redirects you should plan for (SEO-safe)

- `/events` → `/events/` (slash normalization)
- `/locations-hours/` → `/contact/` *(if you create this alias)*
- `/schedule-your-visit/` → `/contact/` *(or to `/contact/#schedule` if you add a section anchor)*
- `/category/events/` → `/events/`
- Any “www.www.mycalumetpark.com” broken links should be corrected to real internal routes.

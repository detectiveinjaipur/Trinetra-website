# Trinetra Detective Agency — Website

Premium static website for a private detective agency in Jaipur. Pure HTML/CSS/JS — no build step, no framework. Hosts perfectly on Vercel.

## Structure
```
/
├── index.html                       Home
├── about.html                       About Us
├── services.html                    Services
├── matrimonial-investigation.html   Matrimonial Investigation
├── surveillance-services.html       Surveillance Services
├── blog.html                        Blog
├── contact.html                     Contact (enquiry form)
├── css/styles.css                   All styling
├── js/main.js                       Nav, reveal, carousel, form
├── vercel.json                      Clean URLs + caching + security headers
├── robots.txt
└── sitemap.xml
```
Clean URLs are enabled, so pages are served at `/about`, `/services`, etc. (no `.html`).

---

## BEFORE GOING LIVE — edit these placeholders

Run these find-and-replace commands inside the project folder (Mac/Linux),
or do the equivalent find-and-replace in your code editor.

**1. Your domain** (currently `www.trinetradetectives.in`):
```
grep -rl "trinetradetectives.in" . | xargs sed -i '' "s/www\.trinetradetectives\.in/YOURDOMAIN.com/g"
```
(On Linux, use `sed -i` without the `''`.)

**2. WhatsApp number** — open `js/main.js` and edit the `WHATSAPP` and
`PHONE_DISPLAY` constants at the top. Then replace the number everywhere else:
```
grep -rl "919829000000" . | xargs sed -i '' "s/919829000000/91XXXXXXXXXX/g"
grep -rl "98290 00000" . | xargs sed -i '' "s/98290 00000/XXXXX XXXXX/g"
```

**3. Email & address** — replace `info@trinetradetectives.in` and the
`C-Scheme, Jaipur, Rajasthan 302001` address (in the footer of every page
and on the contact page).

**4. Google Map** — on `contact.html`, replace the placeholder map box with
your real Google Maps embed iframe.

**5. Stats & testimonials** — the numbers (15+ years, 5,000+ cases) and the
reviews are placeholders. Replace with genuine figures and real client quotes.

> Note: a couple of service descriptions touch on methods and "court-admissible"
> claims. Have a local advocate review the service copy so everything matches
> what you lawfully offer.

---

## Deploy to Vercel (via GitHub)

1. **Push to GitHub.** Create a new repo and upload the *contents* of this
   folder so that `index.html` sits at the repo root (not inside a subfolder).
2. **Import to Vercel.** Dashboard → Add New → Project → pick the repo.
   Framework Preset = **Other**. Leave Build & Output settings empty
   (there is no build step). Click **Deploy**.
3. **Add your domain.** Project → Settings → Domains → add your `.com`,
   then set the DNS records Vercel shows you at your registrar. SSL is automatic.
4. **Every `git push` now auto-redeploys** the live site.

## After it's live
- Submit the site to **Google Search Console** and add the sitemap:
  `https://YOURDOMAIN.com/sitemap.xml`
- Create a free **Google Business Profile** for the agency (this drives most
  local "private detective in Jaipur" traffic).

## Local preview
Because clean URLs need a server, double-clicking the files won't navigate
correctly. Preview with any static server, e.g.:
```
npx serve .
```
or just use the Vercel preview URL after deploying.

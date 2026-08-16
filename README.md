# Raman Mankar — Portfolio

Static site. No build step, no dependencies to install.

```
index.html    all content lives here (sections are labelled with comments)
style.css     design system + layout
script.js     nav, scroll-reveal, terminal typing effect, contact form
assets/       profile photo (+ a spare copy of the resume PDF, unused for now)
```

The "Resume ↗" button in the header currently links straight to your Google
Drive file (view-only, opens in a new tab). If you'd rather host the PDF
yourself, swap that `<a>` in `index.html`'s nav back to
`assets/Raman_Mankar_Resume.pdf` and add the `download` attribute — the file
is already sitting in `assets/` for that.

## Adding the 3 missing projects

Open `index.html`, search for `PLACEHOLDER PROJECTS`. Each placeholder card is
a copy-paste template — swap the `<h3>`, `<p>`, and `<li>` tag list for the
real project, and delete the `placeholder` class + `tag-soon` class so it
switches from the dashed "coming soon" style to a normal solid card.

## Wiring up the contact form

Right now "Send message" opens the visitor's email client with a pre-filled
draft (see `script.js`, bottom). That works with zero setup but feels a bit
clunky. Two easy upgrades, no server required:

- **Formspree** (formspree.io) — free tier, just point the form's `action` at
  the endpoint they give you and remove the JS `preventDefault()` handler.
- **EmailJS** (emailjs.com) — sends straight from the browser via their JS
  SDK, a bit more setup but no page reload.

## Deploying it

Any static host works since there's no backend. Simplest options:

1. **GitHub Pages** (free, easiest if you already use GitHub)
   - Push this folder to a repo (e.g. `raman-mankar-portfolio`)
   - Repo Settings → Pages → Deploy from branch → `main` / root
   - Live at `https://<username>.github.io/<repo>` in a minute or two
   - Custom domain: add a `CNAME` file with your domain, point your DNS to
     GitHub's IPs (their docs walk through this)

2. **Netlify** (free, fastest to set up)
   - Drag the `portfolio` folder onto app.netlify.com/drop, done
   - Or connect the GitHub repo for auto-deploy on every push

3. **Vercel** — same idea as Netlify, `vercel.com/new`, import the repo

For a personal portfolio, GitHub Pages is the standard choice since
recruiters often check your GitHub anyway.

## Ideas for adding AI to the site

Given the AI/agentic focus of the resume itself, the portfolio is a natural
place to *demonstrate* that rather than just describe it:

1. **An "ask my resume" chat widget.** A small floating chat button that
   answers recruiter questions ("does he know FastAPI?", "what did he build
   at Micron?") using only your resume + project write-ups as context —
   a tiny RAG setup. Cheapest version: a serverless function (Vercel/Netlify
   function) that calls the Claude or OpenAI API with your resume text
   stuffed into the system prompt. This alone is a good talking point in
   interviews since it's a live example of the RAG pattern.

2. **A SkillOpt-style live demo.** Since your flagship project is literally
   about a model that grades and improves its own output, a simplified,
   safe-to-expose version of that loop as an interactive widget (upload a
   sample log, watch a toy classifier score it, show the "before/after"
   accuracy) would be a very on-brand signature piece for this exact site.

3. **AI-written project summaries from your GitHub.** A build-time script
   that pulls your public repos via the GitHub API and asks an LLM to draft
   a one-line summary for any repo missing a description — keeps the
   portfolio's project list fresh without manual upkeep.

4. **Smart contact-form triage.** Before the mailto/Formspree submission,
   run the message through a lightweight classifier (rules or a cheap LLM
   call) to flag likely spam vs. genuine recruiter/collaborator messages —
   useful once the form is public and indexed.

Start with #1 — it's the highest-leverage for a job search (recruiters
actually engage with it) and it's a self-contained weekend project that
becomes its own portfolio entry.

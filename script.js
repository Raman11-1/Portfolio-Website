// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(sec => navObserver.observe(sec));

// ===== Terminal log-stream animation (hero signature) =====
const logLines = [
  { text: '[BOOT] initializing raman_mankar.dev ...', cls: 'info' },
  { text: '[INFO] role: AI-Focused Python Developer', cls: 'info' },
  { text: '[INFO] loaded module: SkillOpt — self-optimizing log classifier', cls: 'info' },
  { text: '[METRIC] validation_accuracy: +18% on unseen firmware logs', cls: 'metric' },
  { text: '[METRIC] pipeline_throughput: +20% via document-in-document trigger', cls: 'metric' },
  { text: '[INFO] status: MTech CSE @ IIT Hyderabad, in progress', cls: 'info' },
  { text: '[READY] scroll to explore \u2192', cls: 'info' },
];

const logStream = document.getElementById('logStream');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLog() {
  logStream.textContent = '';
  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= logLines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'log-cursor';
      cursor.textContent = '\u00A0';
      logStream.appendChild(cursor);
      return;
    }
    const line = logLines[lineIndex];
    const span = document.createElement('span');
    span.className = line.cls;
    logStream.appendChild(span);

    let charIndex = 0;
    const speed = 16;
    (function typeChar() {
      if (charIndex < line.text.length) {
        span.textContent += line.text[charIndex];
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        logStream.appendChild(document.createTextNode('\n'));
        lineIndex++;
        setTimeout(typeNextLine, 220);
      }
    })();
  }
  typeNextLine();
}

if (prefersReducedMotion) {
  logStream.textContent = logLines.map(l => l.text).join('\n');
} else if (logStream) {
  typeLog();
}

// ===== Contact form =====
// No backend is wired up yet. Swap the fetch() call below for your own
// endpoint (Formspree, EmailJS, a serverless function, etc.) when ready.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  // Fallback: open the user's email client pre-filled with the message.
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:ramanrsm123@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Opening your email client...';
  contactForm.reset();
});

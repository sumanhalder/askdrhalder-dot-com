// Shared site behaviour: header/footer injection, nav state, reveal, form, etc.

(function () {
  const root = document.body;

  // ---------- Header ----------
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container">
      <nav class="nav" aria-label="Primary">
        <a href="${base()}index.html" class="brand">
          <span class="brand-mark">S</span>
          <span class="brand-text">Dr. Suman Halder<small>Classical Homeopathy</small></span>
        </a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
        </button>
        <ul class="nav-links" role="list">
          <li><a href="${base()}index.html" data-nav="home">Home</a></li>
          <li><a href="${base()}about.html" data-nav="about">About</a></li>
          <li><a href="${base()}services/index.html" data-nav="services">Services</a></li>
          <li><a href="${base()}blog/index.html" data-nav="blog">Blog</a></li>
          <li><a href="${base()}contact.html" data-nav="contact">Contact</a></li>
        </ul>
        <div class="nav-cta">
          <a href="${base()}contact.html" class="btn btn--primary">Book Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </nav>
    </div>
  `;
  root.prepend(header);

  // ---------- Footer ----------
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${base()}index.html" class="brand">
            <span class="brand-mark">S</span>
            <span class="brand-text">Dr. Suman Halder<small>Classical Homeopathy</small></span>
          </a>
          <p>Kolkata's trusted homeopathic clinic for chronic and lifestyle conditions — personalised care, classical remedies, lasting results.</p>
        </div>
        <div>
          <h4>Clinic</h4>
          <ul class="footer-links" role="list">
            <li><a href="${base()}about.html">About Dr. Halder</a></li>
            <li><a href="${base()}services/index.html">Services</a></li>
            <li><a href="${base()}blog/index.html">Blog & Insights</a></li>
            <li><a href="${base()}contact.html">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h4>Specialties</h4>
          <ul class="footer-links" role="list">
            <li><a href="${base()}services/piles-treatment.html">Piles Treatment</a></li>
            <li><a href="${base()}services/hairfall-solutions.html">Hairfall Solutions</a></li>
            <li><a href="${base()}services/kidney-stones.html">Kidney Stones</a></li>
            <li><a href="${base()}services/diabetes-management.html">Diabetes Care</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Visit</h4>
          <strong>AskDrHalder Clinic</strong><br>
          AI-125, Ground Floor, Street No 19,<br>
          Ai Block, AA-1, New Town,<br>
          Kolkata 700156<br><br>
          <a href="tel:+918617740072"><strong>📞</strong> +91 86177 40072</a><br>
          <a href="mailto:drsumanhaldermd@gmail.com"><strong>✉</strong> drsumanhaldermd@gmail.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Dr. Suman Halder · AskDrHalder.com · All rights reserved.</span>
        <span>Crafted with care · Classical homeopathy, evidence-informed practice</span>
      </div>
    </div>
  `;
  root.appendChild(footer);

  // ---------- Active nav ----------
  const current = document.documentElement.dataset.page;
  if (current) {
    document.querySelectorAll("[data-nav]").forEach((el) => {
      if (el.dataset.nav === current) el.classList.add("is-active");
    });
  }

  // ---------- Mobile nav ----------
  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // ---------- Sticky shadow ----------
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---------- Form (demo) ----------
  const form = document.querySelector("form.appointment-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = `Thank you, ${data.firstName || "patient"}. We'll reach out within a few hours to confirm your appointment.`;
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add("is-visible"));
      form.reset();
      setTimeout(() => {
        toast.classList.remove("is-visible");
        setTimeout(() => toast.remove(), 400);
      }, 4200);
    });
  }

  // ---------- Base path helper (subfolder safe) ----------
  function base() {
    // If we're inside /services/ or /blog/ go up one level
    const inSub = /\/(services|blog)\//.test(location.pathname);
    return inSub ? "../" : "";
  }
})();

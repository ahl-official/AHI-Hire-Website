import { useState, useEffect } from "react";
import "./index.css";

/* ─────────────────────────────────────────────
   GOOGLE SHEETS CONFIG
───────────────────────────────────────────── */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuotRzpA5l08XwJBqQMaVAIHgqKEG92zkhJUAa5_zx768EEIQ4SLY6oC7Ji8Br0Al-iQ/exec";

const SERVICES = [
  {
    id: "ai",
    title: "AI Automation",
    icon: "⚡",
    desc: "Streamline workflows with intelligent automation solutions tailored to your business.",
    sheet: "AI Automation",
    portfolioTag: "Automation & AI",
    projects: [
      { title: "Lead Qualification Bot", tag: "Fintech", desc: "Built an AI-driven pipeline that auto-qualified 1,200+ monthly leads, reducing manual review time by 70%.", metrics: ["70% time saved", "1,200 leads/mo", "Fintech"] },
      { title: "Invoice Processing Automation", tag: "Logistics", desc: "End-to-end OCR + ML system processing 5,000 invoices daily with 99.2% accuracy.", metrics: ["99.2% accuracy", "5k invoices/day", "Logistics"] },
      { title: "Customer Churn Prediction", tag: "SaaS", desc: "Predictive model with 87% accuracy helping a SaaS firm retain at-risk customers proactively.", metrics: ["87% accuracy", "Churn reduction", "SaaS"] },
    ],
  },
  {
    id: "digital",
    title: "Digital Marketing",
    icon: "📡",
    desc: "Drive growth through data-driven campaigns, SEO, and brand strategy.",
    sheet: "Digital Marketing",
    portfolioTag: "Marketing & Growth",
    projects: [
      { title: "E-Commerce SEO Overhaul", tag: "Retail", desc: "Full SEO audit and rebuild for an online retailer, achieving a 3× increase in organic traffic in 6 months.", metrics: ["3× organic traffic", "6 months", "Retail"] },
      { title: "Performance Ad Campaign", tag: "Healthcare", desc: "Multi-channel paid media campaign delivering 4.8× ROAS for a healthcare brand's digital launch.", metrics: ["4.8× ROAS", "Multi-channel", "Healthcare"] },
      { title: "Brand Positioning Strategy", tag: "Startup", desc: "Complete brand identity and go-to-market strategy for a Series A startup entering a competitive market.", metrics: ["GTM strategy", "Brand identity", "Startup"] },
    ],
  },
  {
    id: "production",
    title: "Productions",
    icon: "🎬",
    desc: "Creative production teams for video, photography, and content creation.",
    sheet: "Productions",
    portfolioTag: "Creative & Content",
    projects: [
      { title: "Corporate Brand Film", tag: "Manufacturing", desc: "Full production of a 4-minute brand documentary used across digital and broadcast channels.", metrics: ["Broadcast quality", "4-min film", "Manufacturing"] },
      { title: "Product Launch Photography", tag: "Fashion", desc: "Studio and on-location product shoot for a premium fashion label's summer collection.", metrics: ["300+ assets", "Studio & location", "Fashion"] },
      { title: "Social Content Series", tag: "F&B", desc: "12-week content series across Instagram and TikTok driving 220% engagement growth.", metrics: ["220% engagement", "12-week series", "F&B"] },
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Finance",
    icon: "📊",
    desc: "Skilled accountants and finance professionals for your business needs.",
    sheet: "Accounts",
    portfolioTag: "Finance & Compliance",
    projects: [
      { title: "Annual Audit & Compliance", tag: "Mining", desc: "Full statutory audit and compliance review for a mid-size mining company, delivered on time and within budget.", metrics: ["Zero findings", "On-time", "Mining"] },
      { title: "Financial Model Build", tag: "PropTech", desc: "3-statement financial model and investor-ready deck for a PropTech startup's funding round.", metrics: ["Series A funded", "3-statement model", "PropTech"] },
      { title: "CFO-as-a-Service", tag: "NGO", desc: "6-month fractional CFO engagement covering budgeting, reporting and donor compliance.", metrics: ["6 months", "Budget overhaul", "NGO"] },
    ],
  },
  {
    id: "tech",
    title: "Technology & Dev",
    icon: "💻",
    desc: "Expert developers and engineers for software, web, and mobile projects.",
    sheet: "Technology",
    portfolioTag: "Software & Engineering",
    projects: [
      { title: "Mobile App — Marketplace", tag: "Retail", desc: "Cross-platform marketplace app (iOS & Android) for a retail client, shipped in 14 weeks.", metrics: ["14 weeks", "iOS & Android", "Retail"] },
      { title: "ERP Integration", tag: "Manufacturing", desc: "Custom SAP integration with legacy systems, unifying data across 4 departments.", metrics: ["4 departments", "SAP integration", "Manufacturing"] },
      { title: "Web Platform Rebuild", tag: "EdTech", desc: "Full-stack rebuild of an EdTech platform improving load speed by 60% and user retention by 35%.", metrics: ["60% faster", "+35% retention", "EdTech"] },
    ],
  },
  {
    id: "hr",
    title: "HR & Recruitment",
    icon: "🤝",
    desc: "HR specialists to manage your people operations and culture.",
    sheet: "HR",
    portfolioTag: "People & Culture",
    projects: [
      { title: "Executive Search — COO", tag: "Finance", desc: "End-to-end executive search resulting in the placement of a seasoned COO within 3 weeks.", metrics: ["3-week placement", "C-Suite", "Finance"] },
      { title: "HR Policy Overhaul", tag: "Hospitality", desc: "Complete HR policy and employee handbook redesign for a 200-person hospitality group.", metrics: ["200 employees", "Full compliance", "Hospitality"] },
      { title: "Graduate Talent Programme", tag: "Consulting", desc: "Designed and ran a 3-month graduate recruitment campaign, placing 18 candidates across 5 departments.", metrics: ["18 placements", "5 departments", "Consulting"] },
    ],
  },
];

const FAQS = [
  { q: "How does AHL Hire work for employers?", a: "Employers submit a service request through our platform. Our team reviews your requirements and matches you with pre-vetted professionals—whether for a full-time role or a specific project." },
  { q: "How does AHL Hire work for job seekers?", a: "Professionals fill out a single talent profile form on our Join Us page. We actively match your skills and preferences against open opportunities from our client companies." },
  { q: "What industries do you cover?", a: "We cover AI & Automation, Digital Marketing, Productions, Accounts & Finance, Technology & Development, HR & Recruitment, and more. Our network is always expanding." },
  { q: "How long does the hiring process take?", a: "For project-based roles, we can place professionals within 3–5 business days. Full-time placements typically take 1–3 weeks depending on the role complexity." },
  { q: "Is there a cost to join as a professional?", a: "No. Joining AHL Hire as a professional is completely free. We are compensated by the companies we place talent with." },
  { q: "How are professionals vetted?", a: "Every professional goes through a profile review, skill assessment, and interview with our talent team before being added to our active talent pool." },
  { q: "Can I hire for both full-time and contract roles?", a: "Absolutely. AHL Hire supports full-time permanent placements as well as task-based or contract engagements." },
  { q: "How do I track my application?", a: "After submitting your form, you will receive a confirmation email. Our team will reach out within 48 hours to discuss next steps." },
];

/* ── Submit to Google Sheets ── */
async function submitToSheets(data) {
  try {
    const params = new URLSearchParams({ data: JSON.stringify(data) });
    await fetch(SCRIPT_URL + "?" + params.toString(), { method: "GET", mode: "no-cors" });
    return true;
  } catch (err) {
    console.error("Sheets error:", err);
    return false;
  }
}

/* ── Logo component — uses uploaded image, falls back to text ── */
function Logo() {
  return (
    <div className="nav-logo">
      <img
        src="/american_hairline_logo.png"
        alt="American Hairline"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "block";
        }}
      />
      <span className="nav-logo-text" style={{ display: "none" }}>American Hairline</span>
    </div>
  );
}

/* ── Social Icons (SVG inline) ── */
const SocialIcons = {
  X: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Services", "Join Us", "FAQs"];
  const pageMap = { Home: "home", Services: "services", "Join Us": "join", FAQs: "faqs" };

  return (
    <>
      <nav className="navbar">
        <div onClick={() => { setPage("home"); setMenuOpen(false); }}>
          <Logo />
        </div>
        <ul className="nav-links">
          {links.map((l) => (
            <li
              key={l}
              className={`${page === pageMap[l] ? "active" : ""} ${l === "Join Us" ? "cta" : ""}`}
              onClick={() => { setPage(pageMap[l]); setMenuOpen(false); }}
            >
              {l}
            </li>
          ))}
        </ul>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
        </div>
      </nav>
      <ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l} onClick={() => { setPage(pageMap[l]); setMenuOpen(false); }}>
            {l}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer({ setPage }) {
  const socialLinks = [
    { Icon: SocialIcons.X, href: "#", label: "X / Twitter" },
    { Icon: SocialIcons.LinkedIn, href: "#", label: "LinkedIn" },
    { Icon: SocialIcons.Instagram, href: "#", label: "Instagram" },
    { Icon: SocialIcons.Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <img
              src="/american_hairline_logo.png"
              alt="American Hairline"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <span className="footer-logo-text" style={{ display: "none" }}>American Hairline</span>
          </div>
          <p className="footer-desc">
            A flexible HR and talent marketplace connecting companies with the right professionals—for full-time roles or project-based work.
          </p>
        </div>
        <div className="footer-col">
          <h5>Our Services</h5>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.id} onClick={() => setPage("services")}>{s.title}</li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li onClick={() => setPage("home")}>About Us</li>
            <li onClick={() => setPage("join")}>Join Us</li>
            <li onClick={() => setPage("faqs")}>FAQs</li>
            <li onClick={() => setPage("services")}>Services</li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Connect</h5>
          <div className="footer-social">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                className="social-btn"
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <a href="mailto:hello@ahlhire.com">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 7L2 7" /></svg>
              hello@ahlhire.com
            </a>
            <a href="tel:+27000000000">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              +27 (0) 00 000 0000
            </a>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Johannesburg, South Africa
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 AHL Hire. All rights reserved.</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   UNIFIED REQUEST FORM
══════════════════════════════════════════ */
function RequestForm({ defaultDept = "" }) {
  const [form, setForm] = useState({
    name: "", age: "", email: "", phone: "",
    department: defaultDept, details: "",
  });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const service = SERVICES.find((s) => s.id === form.department);
    await submitToSheets({
      ...form,
      sheet: service ? service.sheet : "General",
      timestamp: new Date().toISOString(),
    });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="check">✅</div>
        <h4>Request Submitted!</h4>
        <p>Our team will reach out within 48 hours to discuss your requirements.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input required value={form.name} onChange={set("name")} placeholder="Jane Smith" />
        </div>
        <div className="form-group">
          <label>Age *</label>
          <input required type="number" min="18" max="99" value={form.age} onChange={set("age")} placeholder="30" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Email Address *</label>
          <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+27 000 000 000" />
        </div>
      </div>
      <div className="form-group">
        <label>Department / Service Required *</label>
        <select required value={form.department} onChange={set("department")}>
          <option value="">Select a department</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Tell us about your needs</label>
        <textarea
          value={form.details}
          onChange={set("details")}
          placeholder="Describe your project, timeline, team size, and any specific requirements..."
        />
      </div>
      <button
        type="submit"
        className="btn-primary"
        style={{ width: "100%" }}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit Request →"}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════
   PAGE: HOME
══════════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <span className="hero-tag">Flexible HR & Talent Marketplace</span>
        <h1>
          Hire Smarter.<br />
          <span className="blue">Work Better.</span>
        </h1>
        <p>
          AHL Hire connects companies with elite professionals for full-time roles
          and project-based work—across every industry that drives modern business.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage("services")}>
            I Need Talent →
          </button>
          <button className="btn-outline" onClick={() => setPage("join")}>
            I'm Looking for Work
          </button>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section style={{ background: "var(--bg2)" }}>
        <span className="section-tag">About AHL Hire</span>
        <h2 className="section-title">Built for the Future of Work</h2>
        <div className="about-grid">
          <div>
            <p className="body-text">
              AHL Hire is a modern HR and talent marketplace that bridges the gap between
              ambitious companies and skilled professionals. Whether you need a full-time
              hire or a specialist for a short-term project, we have the network and the
              expertise to deliver.
            </p>
            <p className="body-text" style={{ marginTop: "1rem" }}>
              Our platform is sector-agnostic—from AI automation to creative productions—
              ensuring that every business, regardless of industry, can access world-class
              talent quickly and efficiently.
            </p>
            <button className="btn-outline" style={{ marginTop: "2rem" }} onClick={() => setPage("services")}>
              Explore Services →
            </button>
          </div>
          <div className="about-stat-grid">
            {[
              ["500+", "Professionals Placed"],
              ["12+", "Industries Served"],
              ["48hrs", "Average Match Time"],
              ["98%", "Client Satisfaction"],
            ].map(([n, l]) => (
              <div className="stat-card" key={l}>
                <div className="num">{n}</div>
                <div className="label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SERVICES PREVIEW */}
      <section>
        <span className="section-tag">What We Offer</span>
        <h2 className="section-title">Services Built for Every Business Need</h2>
        <p className="section-sub">
          From AI automation to creative productions—our talent network spans every
          critical business function.
        </p>
        <div className="cards-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.id} onClick={() => setPage("services")}>
              <div className="card-icon">{s.icon}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-desc">{s.desc}</div>
              <span className="card-arrow">View Work →</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* WHY AHL HIRE */}
      <section style={{ background: "var(--bg2)" }}>
        <span className="section-tag">Why AHL Hire</span>
        <h2 className="section-title">The Smarter Way to Hire</h2>
        <div className="features-grid">
          {[
            ["⚡", "Fast Turnaround", "Get matched with pre-vetted talent within 48 hours of submitting your request."],
            ["🎯", "Precision Matching", "We don't just fill seats. We match skills, culture, and project requirements."],
            ["🔒", "Vetted Professionals", "Every professional in our network is screened, assessed, and interview-ready."],
            ["🔄", "Flexible Engagements", "Full-time, part-time, contract, or project-based—you choose the model."],
            ["🌍", "Diverse Talent Pool", "Access professionals across Africa and beyond with global-standard expertise."],
            ["📞", "Dedicated Support", "A dedicated account manager guides you through every step of the process."],
          ].map(([icon, title, desc]) => (
            <div className="feature-item" key={title}>
              <div className="feature-icon">{icon}</div>
              <div className="feature-title">{title}</div>
              <div className="feature-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section style={{ textAlign: "center" }}>
        <span className="section-tag">Get Started</span>
        <h2 className="section-title" style={{ margin: "0 auto 1rem" }}>
          Ready to Build Your Dream Team?
        </h2>
        <p className="section-sub" style={{ margin: "0 auto 2.5rem" }}>
          Whether you're hiring or looking for your next opportunity, AHL Hire has you covered.
        </p>
        <div className="hero-btns" style={{ justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => setPage("services")}>Post a Request</button>
          <button className="btn-outline" onClick={() => setPage("join")}>Join as a Professional</button>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE: SERVICES
══════════════════════════════════════════ */
function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [formDept, setFormDept] = useState("");

  const handleRequest = (deptId) => {
    setFormDept(deptId);
    setTimeout(() => {
      document.getElementById("request-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const visibleServices = activeFilter === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.id === activeFilter);

  return (
    <div className="page">
      <div className="page-header">
        <span className="section-tag">Our Services</span>
        <h1 className="section-title">Work We've Done.<br />Results You Can Expect.</h1>
        <p className="section-sub">
          Browse our departments below to see the kind of work we deliver.
          When you're ready, submit a request and we'll match you with the right professional.
        </p>
      </div>

      {/* Filter Tab Bar */}
      <div className="filter-bar-wrap">
        <div className="filter-bar">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          {SERVICES.map((s) => (
            <button
              key={s.id}
              className={`filter-btn ${activeFilter === s.id ? "active" : ""}`}
              onClick={() => setActiveFilter(s.id)}
            >
              <span className="filter-btn-icon">{s.icon}</span>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Department sections */}
      {visibleServices.map((s) => (
        <div className="dept-section" key={s.id}>
          <div className="dept-header">
            <div className="dept-info">
              <span className="dept-icon">{s.icon}</span>
              <h2 className="dept-title">{s.title}</h2>
              <p className="dept-desc">{s.desc}</p>
            </div>
            <div className="dept-request-btn">
              <button className="btn-primary" onClick={() => handleRequest(s.id)}>
                Request Talent →
              </button>
            </div>
          </div>

          {/* Portfolio cards */}
          <div className="portfolio-grid">
            {s.projects.map((proj) => (
              <div className="portfolio-card" key={proj.title}>
                <div className="portfolio-img-placeholder">{s.icon}</div>
                <div className="portfolio-body">
                  <span className="portfolio-tag">{s.portfolioTag}</span>
                  <div className="portfolio-title">{proj.title}</div>
                  <div className="portfolio-desc">{proj.desc}</div>
                  <div className="portfolio-meta">
                    {proj.metrics.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Unified Request Form */}
      <div id="request-form-anchor" className="request-form-section">
        <div className="request-form-inner">
          <span className="section-tag">Submit a Request</span>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Tell Us What You Need
          </h2>
          <p className="section-sub" style={{ marginBottom: "2.5rem" }}>
            Fill in the form below and select your department. Our team will reach out within 48 hours.
          </p>
          <div className="form-card">
            <RequestForm defaultDept={formDept} key={formDept} />
          </div>
        </div>
      </div>

      {/* How it works */}
      <section style={{ background: "var(--bg)", textAlign: "center" }}>
        <span className="section-tag">How It Works</span>
        <h2 className="section-title" style={{ margin: "0 auto 3rem" }}>Three Simple Steps</h2>
        <div className="steps-grid">
          {[
            ["01", "Choose a Service", "Select the department that matches your hiring need."],
            ["02", "Fill the Form", "Tell us about your requirements, timeline, and team size."],
            ["03", "Get Matched", "We'll reach out within 48 hours with curated candidate profiles."],
          ].map(([n, t, d]) => (
            <div key={n} className="step-card">
              <div className="step-num">{n}</div>
              <div className="step-title">{t}</div>
              <div className="step-desc">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE: JOIN US
══════════════════════════════════════════ */
function JoinPage() {
  const [form, setForm] = useState({
    name: "", age: "", email: "", phone: "",
    domain: "", experience: "", availability: "",
    location: "", bio: "", linkedin: "",
  });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    await submitToSheets({ ...form, sheet: "Talent Pool", timestamp: new Date().toISOString() });
    setStatus("success");
  };

  return (
    <div className="page">
      <div className="page-header">
        <span className="section-tag">Join AHL Hire</span>
        <h1 className="section-title">Find Your Next Opportunity</h1>
        <p className="section-sub">
          Join our growing pool of skilled professionals. We'll match your expertise
          with opportunities that align with your career goals.
        </p>
      </div>

      <section>
        <div className="join-grid">
          <div className="join-info">
            <h3>Why Join Our Talent Network?</h3>
            <p className="body-text">
              AHL Hire actively places professionals in roles that match their skills—not
              just their job title. We work across sectors and with companies that value
              real expertise.
            </p>
            {[
              "Access to exclusive full-time and project-based opportunities",
              "Matched to roles based on your domain and expertise—not keyword filters",
              "Dedicated talent manager to guide your placement journey",
              "Free to join—we're paid by the companies we place you with",
              "Opportunities across Africa and international remote roles",
            ].map((p) => (
              <div className="perk" key={p}>
                <div className="perk-dot" />
                <p>{p}</p>
              </div>
            ))}
          </div>

          <div className="form-card">
            {status === "success" ? (
              <div className="form-success">
                <div className="check">🎉</div>
                <h4>You're on the List!</h4>
                <p>
                  Thank you for joining the AHL Hire talent network. Our team will review
                  your profile and reach out within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6rem" }}>
                  Your Professional Profile
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input required value={form.name} onChange={set("name")} placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Age *</label>
                    <input required type="number" min="18" max="70" value={form.age} onChange={set("age")} placeholder="28" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="john@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+27 000 000 000" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Primary Domain / Field *</label>
                    <select required value={form.domain} onChange={set("domain")}>
                      <option value="">Select your field</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Years of Experience *</label>
                    <select required value={form.experience} onChange={set("experience")}>
                      <option value="">Select</option>
                      <option>0–1 years</option>
                      <option>2–4 years</option>
                      <option>5–9 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Availability *</label>
                    <select required value={form.availability} onChange={set("availability")}>
                      <option value="">Select</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract / Freelance</option>
                      <option>Open to all</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <input required value={form.location} onChange={set("location")} placeholder="City, Country" />
                  </div>
                </div>
                <div className="form-group">
                  <label>LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={set("linkedin")}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="form-group">
                  <label>Brief Bio / What You're Looking For *</label>
                  <textarea
                    required
                    value={form.bio}
                    onChange={set("bio")}
                    placeholder="Tell us about your skills, experience, and what kind of opportunities you're looking for..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%" }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Join the Talent Network →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE: FAQs
══════════════════════════════════════════ */
function FAQsPage() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="page">
      <div className="page-header">
        <span className="section-tag">Help Centre</span>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-sub">
          Answers for both employers and job seekers navigating the AHL Hire platform.
        </p>
      </div>

      <section>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-q" onClick={() => toggle(i)}>
                {faq.q}
                <span className={`faq-icon ${open === i ? "open" : ""}`}>+</span>
              </div>
              <div className={`faq-a ${open === i ? "open" : ""}`}>{faq.a}</div>
            </div>
          ))}
        </div>

        <div className="faq-contact-card">
          <h3 style={{ marginBottom: "0.5rem" }}>Still have questions?</h3>
          <p style={{ color: "var(--muted)", marginBottom: "1.75rem", fontSize: "0.9rem", fontWeight: 300 }}>
            Can't find what you're looking for? Send us a message and we'll get back
            to you within 24 hours.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll be in touch soon."); }}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input required placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input required type="email" placeholder="jane@email.com" />
              </div>
            </div>
            <div className="form-group">
              <label>I am a...</label>
              <select>
                <option>Company / Employer</option>
                <option>Job Seeker / Professional</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Question *</label>
              <textarea required placeholder="What would you like to know?" />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%" }}>
              Send Question →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main style={{ paddingTop: 68 }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "services" && <ServicesPage />}
        {page === "join" && <JoinPage />}
        {page === "faqs" && <FAQsPage />}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
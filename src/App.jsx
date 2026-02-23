import { useState, useEffect } from "react";
import "./index.css";

/* ─────────────────────────────────────────────
   GOOGLE SHEETS CONFIG
   Replace SCRIPT_URL with your deployed
   Google Apps Script Web App URL.
   See README.md for setup instructions.
───────────────────────────────────────────── */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuotRzpA5l08XwJBqQMaVAIHgqKEG92zkhJUAa5_zx768EEIQ4SLY6oC7Ji8Br0Al-iQ/exec";
const SERVICES = [
  {
    id: "ai",
    title: "AI Automation",
    icon: "⚡",
    desc: "Streamline workflows with intelligent automation solutions tailored to your business.",
    sheet: "AI Automation",
  },
  {
    id: "digital",
    title: "Digital Marketing",
    icon: "📡",
    desc: "Drive growth through data-driven campaigns, SEO, and brand strategy.",
    sheet: "Digital Marketing",
  },
  {
    id: "production",
    title: "Productions",
    icon: "🎬",
    desc: "Creative production teams for video, photography, and content creation.",
    sheet: "Productions",
  },
  {
    id: "accounts",
    title: "Accounts & Finance",
    icon: "📊",
    desc: "Skilled accountants and finance professionals for your business needs.",
    sheet: "Accounts",
  },
  {
    id: "tech",
    title: "Technology & Dev",
    icon: "💻",
    desc: "Expert developers and engineers for software, web, and mobile projects.",
    sheet: "Technology",
  },
  {
    id: "hr",
    title: "HR & Recruitment",
    icon: "🤝",
    desc: "HR specialists to manage your people operations and culture.",
    sheet: "HR",
  },
];

const FAQS = [
  {
    q: "How does AHL Hire work for employers?",
    a: "Employers submit a service request through our platform. Our team reviews your requirements and matches you with pre-vetted professionals—whether for a full-time role or a specific project.",
  },
  {
    q: "How does AHL Hire work for job seekers?",
    a: "Professionals fill out a single talent profile form on our Join Us page. We actively match your skills and preferences against open opportunities from our client companies.",
  },
  {
    q: "What industries do you cover?",
    a: "We cover AI & Automation, Digital Marketing, Productions, Accounts & Finance, Technology & Development, HR & Recruitment, and more. Our network is always expanding.",
  },
  {
    q: "How long does the hiring process take?",
    a: "For project-based roles, we can place professionals within 3–5 business days. Full-time placements typically take 1–3 weeks depending on the role complexity.",
  },
  {
    q: "Is there a cost to join as a professional?",
    a: "No. Joining AHL Hire as a professional is completely free. We are compensated by the companies we place talent with.",
  },
  {
    q: "How are professionals vetted?",
    a: "Every professional goes through a profile review, skill assessment, and interview with our talent team before being added to our active talent pool.",
  },
  {
    q: "Can I hire for both full-time and contract roles?",
    a: "Absolutely. AHL Hire supports full-time permanent placements as well as task-based or contract engagements.",
  },
  {
    q: "How do I track my application?",
    a: "After submitting your form, you will receive a confirmation email. Our team will reach out within 48 hours to discuss next steps.",
  },
];

/* ── Utility: submit to Google Sheets via Apps Script ── */
async function submitToSheets(data) {
  try {
    const params = new URLSearchParams({ data: JSON.stringify(data) });
    await fetch(SCRIPT_URL + "?" + params.toString(), {
      method: "GET",
      mode: "no-cors",
    });
    return true;
  } catch (err) {
    console.error("Sheets error:", err);
    return false;
  }
}
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
        <div className="nav-logo" onClick={() => { setPage("home"); setMenuOpen(false); }}>
          AHL<span>Hire</span>
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
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">AHL<span>Hire</span></div>
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
            {["𝕏", "in", "IG", "FB"].map((s) => (
              <div key={s} className="social-btn">{s}</div>
            ))}
          </div>
          <div className="footer-contact">
            <a href="mailto:hello@ahlhire.com">📧 hello@ahlhire.com</a>
            <a href="tel:+27000000000">📞 +27 (0) 00 000 0000</a>
            <span>📍 Johannesburg, South Africa</span>
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
   SERVICE FORM MODAL
══════════════════════════════════════════ */
function ServiceModal({ service, onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    serviceType: service.id,
    details: "",
  });
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    await submitToSheets({
      ...form,
      sheet: service.sheet,
      timestamp: new Date().toISOString(),
    });
    setStatus("success");
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        {status === "success" ? (
          <div className="form-success">
            <div className="check">✅</div>
            <h4>Request Submitted!</h4>
            <p>
              Thank you! Our team will reach out within 48 hours to discuss
              your {service.title} requirements.
            </p>
            <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>Tell us about your requirements and we'll match you with the right talent.</p>
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
                <label>Service Type *</label>
                <select required value={form.serviceType} onChange={set("serviceType")}>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tell us more about your needs</label>
                <textarea
                  value={form.details}
                  onChange={set("details")}
                  placeholder="Describe your project, timeline, and team size requirements..."
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
          </>
        )}
      </div>
    </div>
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
            <button
              className="btn-outline"
              style={{ marginTop: "2rem" }}
              onClick={() => setPage("services")}
            >
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
              <span className="card-arrow">Request Talent →</span>
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
          <button className="btn-primary" onClick={() => setPage("services")}>
            Post a Request
          </button>
          <button className="btn-outline" onClick={() => setPage("join")}>
            Join as a Professional
          </button>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE: SERVICES
══════════════════════════════════════════ */
function ServicesPage() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="page">
      <div className="page-header">
        <span className="section-tag">Our Services</span>
        <h1 className="section-title">What Kind of Help Do You Need?</h1>
        <p className="section-sub">
          Select a service below to submit your talent request. Each submission goes
          directly to a specialist who will reach out to match you with the right professional.
        </p>
      </div>

      <section>
        <div className="cards-grid">
          {SERVICES.map((s) => (
            <div
              className="service-card"
              key={s.id}
              onClick={() => setActiveModal(s)}
            >
              <div className="card-icon">{s.icon}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-desc">{s.desc}</div>
              <span className="card-arrow">Request This Service →</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section style={{ background: "var(--bg2)", textAlign: "center" }}>
        <span className="section-tag">How It Works</span>
        <h2 className="section-title" style={{ margin: "0 auto 3rem" }}>
          Three Simple Steps
        </h2>
        <div className="steps-grid">
          {[
            ["01", "Choose a Service", "Select the service category that matches your hiring need."],
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

      {activeModal && (
        <ServiceModal service={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE: JOIN US
══════════════════════════════════════════ */
function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    domain: "",
    experience: "",
    availability: "",
    location: "",
    bio: "",
    linkedin: "",
  });
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    await submitToSheets({
      ...form,
      sheet: "Talent Pool",
      timestamp: new Date().toISOString(),
    });
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
                <h3 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
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
          <p style={{ color: "var(--muted)", marginBottom: "1.75rem", fontSize: "0.9rem" }}>
            Can't find what you're looking for? Send us a message and we'll get back
            to you within 24 hours.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! We'll be in touch soon.");
            }}
          >
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

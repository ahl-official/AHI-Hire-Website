import { useState, useEffect, useRef } from "react";
import "./index.css";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzuotRzpA5l08XwJBqQMaVAIHgqKEG92zkhJUAa5_zx768EEIQ4SLY6oC7Ji8Br0Al-iQ/exec";
const BRAND = { name: "PrimeHire" };

/* ─────────────────────────────────────────────
   DATA  — Beauty & Hair Industry
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "hair",
    title: "Hair & Extension Specialists",
    sheet: "Hair Specialists",
    portfolioTag: "Hair & Extensions",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop",
    desc: "Certified hair extension and patch technicians placed with premium salons and hair clinics across India.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </svg>
    ),
    projects: [
      {
        title: "Hair Extension Technicians",
        tag: "Extensions",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&auto=format&fit=crop",
        desc: "Certified micro-ring, tape-in, and fusion extension specialists placed with premium salons across Mumbai and Delhi.",
        metrics: ["Micro-ring certified", "Tape-in specialists"],
      },
      {
        title: "Hair Patch Technicians",
        tag: "Hair Patch",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80&auto=format&fit=crop",
        desc: "Trained hair patch and toupee fitting professionals for clinics and men's grooming studios.",
        metrics: ["Clinic placements", "Men's grooming"],
      },
      {
        title: "Hairstylists & Colourists",
        tag: "Styling",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80&auto=format&fit=crop",
        desc: "Experienced hairstylists and colour technicians for high-footfall salons and luxury brands.",
        metrics: ["Colour certified", "Luxury salons"],
      },
    ],
  },
  {
    id: "salon",
    title: "Salon & Clinic Operations",
    sheet: "Salon Operations",
    portfolioTag: "Operations",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80&auto=format&fit=crop",
    desc: "Skilled operations professionals who understand the pace and expectations of premium beauty spaces.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    projects: [
      {
        title: "Salon Managers",
        tag: "Management",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80&auto=format&fit=crop",
        desc: "Experienced salon managers who handle team coordination, client retention, and daily operations at scale.",
        metrics: ["Team leadership", "Revenue management"],
      },
      {
        title: "Clinic Coordinators",
        tag: "Clinic",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
        desc: "Front-desk and coordination professionals trained for hair clinics and trichology centres.",
        metrics: ["Client coordination", "Appointment systems"],
      },
      {
        title: "Beauty Therapists",
        tag: "Therapy",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop",
        desc: "Certified beauty therapists for skin, body, and wellness services across premium salon brands.",
        metrics: ["Skin certified", "Wellness trained"],
      },
    ],
  },
  {
    id: "content",
    title: "Beauty Content & Digital",
    sheet: "Digital Content",
    portfolioTag: "Content & Digital",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop",
    desc: "Digital and content professionals who speak the language of beauty — not generic marketers repackaged.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.82v6.361a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    projects: [
      {
        title: "Beauty Content Creators",
        tag: "Creator",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80&auto=format&fit=crop",
        desc: "UGC and branded content creators specialising in hair transformation, salon lifestyle, and beauty education.",
        metrics: ["UGC specialists", "Beauty niche"],
      },
      {
        title: "Reel Editors",
        tag: "Video Editing",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format&fit=crop",
        desc: "Fast-turnaround reel editors who understand salon aesthetics, trending audio, and platform-native formats.",
        metrics: ["Reels & Shorts", "24hr turnaround"],
      },
      {
        title: "Videographers — Salon Shoots",
        tag: "Videography",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop",
        desc: "On-location videographers experienced in shooting hair transformations, before-after reveals, and salon brand films.",
        metrics: ["On-location", "Brand films"],
      },
    ],
  },
  {
    id: "marketing",
    title: "Performance Marketing",
    sheet: "Performance Marketing",
    portfolioTag: "Marketing & Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    desc: "Performance marketers and social media managers who have actually worked inside the beauty and hair industry.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    projects: [
      {
        title: "Performance Marketers",
        tag: "Paid Ads",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop",
        desc: "Meta and Google Ads specialists with proven ROAS track records for salon and beauty brand campaigns.",
        metrics: ["Meta & Google", "Beauty ROAS"],
      },
      {
        title: "Social Media Managers",
        tag: "Social",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80&auto=format&fit=crop",
        desc: "Instagram and YouTube-native social managers who build engaged communities for beauty brands — not just post schedules.",
        metrics: ["Instagram-native", "Community growth"],
      },
      {
        title: "Brand Strategists — Beauty",
        tag: "Strategy",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80&auto=format&fit=crop",
        desc: "Brand positioning and GTM strategy specialists with deep experience in the Indian beauty and D2C space.",
        metrics: ["D2C experience", "India market"],
      },
    ],
  },
];

const FAQS = [
  {
    q: `How does ${BRAND.name} work for salons and beauty brands?`,
    a: "Submit a talent request through our platform. Our team reviews your requirements and matches you with pre-screened beauty industry professionals — whether for a full-time role, part-time position, or project-based work.",
  },
  {
    q: "How does it work for beauty professionals looking for opportunities?",
    a: "Fill out a single talent profile on our Join Us page. We actively match your skills and experience against open roles from our partner salons and beauty brands across Mumbai and beyond.",
  },
  {
    q: "What kind of roles do you specialise in?",
    a: "We focus entirely on the beauty, hair, and content industry. This includes hair extension technicians, hair patch technicians, hairstylists, colourists, salon managers, clinic coordinators, beauty content creators, reel editors, videographers, performance marketers, and social media managers.",
  },
  {
    q: "How long does the hiring process take?",
    a: "For most roles, we share a curated shortlist within 48–72 hours of receiving your request. Full-time placements for senior roles may take up to 1–2 weeks depending on requirements.",
  },
  {
    q: "Is there any cost to join as a professional?",
    a: `No. Joining ${BRAND.name}'s talent network is completely free for professionals. We are compensated by the brands and salons we place talent with.`,
  },
  {
    q: "How do you screen candidates before sending them to brands?",
    a: "Every professional goes through a profile review, a skill evaluation aligned to their specific domain, and a structured interview with our team before being added to our active talent pool. We do not forward unscreened profiles.",
  },
  {
    q: "Do you place candidates outside Mumbai?",
    a: "Our primary operations are Mumbai-based, but we work with partner salons and beauty brands across India. Remote-eligible roles like content creation, editing, and performance marketing are placed nationally.",
  },
  {
    q: "Can I hire for both full-time and short-term roles?",
    a: `Absolutely. ${BRAND.name} supports permanent placements as well as contract, freelance, and project-based engagements — whatever structure works best for your salon or brand.`,
  },
];

const TRUST_AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/women/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
  "https://randomuser.me/api/portraits/women/55.jpg",
];

const PARTNER_LOGOS = [
  { name: "Looks Salon" },
  { name: "Enrich Salons" },
  { name: "Naturals" },
  { name: "Toni & Guy" },
  { name: "Lakme Salon" },
  { name: "Jean-Claude Biguine" },
];

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
async function submitToSheets(data) {
  try {
    await fetch(SCRIPT_URL + "?" + new URLSearchParams({ data: JSON.stringify(data) }), {
      method: "GET",
      mode: "no-cors",
    });
    return true;
  } catch {
    return false;
  }
}

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */
function StarRating({ count = 5 }) {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={i < count ? "star on" : "star"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Logo({ dark = false }) {
  return (
    <div className={`logo ${dark ? "logo--dark" : ""}`}>
      <div className="logo-mark">
        <svg viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#1B4FD8" />
          <path d="M8 22L14 10L20 18L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="14" r="2" fill="white" />
        </svg>
      </div>
      <span className="logo-text">{BRAND.name}</span>
    </div>
  );
}

const Icons = {
  X: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p) => {
    setPage(p);
    setOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="nav-logo-btn" onClick={() => go("home")}>
            <Logo />
          </button>

          <nav className="nav-links" role="navigation">
            {[
              ["home", "Home"],
              ["services", "Services"],
              ["faqs", "FAQs"],
            ].map(([p, label]) => (
              <button
                key={p}
                className={`nav-link ${page === p ? "active" : ""}`}
                onClick={() => go(p)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="nav-join-cta" onClick={() => go("join")}>
              Submit Your Profile <Icons.ArrowRight />
            </button>
          </div>

          <button
            className="nav-burger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
      </header>

      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="mobile-drawer-inner">
          {[
            ["home", "Home"],
            ["services", "Services"],
            ["faqs", "FAQs"],
          ].map(([p, label]) => (
            <button
              key={p}
              className={`mobile-link ${page === p ? "active" : ""}`}
              onClick={() => go(p)}
            >
              {label}
            </button>
          ))}
          <button
            className="btn-primary w-full mt-auto"
            onClick={() => go("join")}
          >
            Submit Your Profile <Icons.ArrowRight />
          </button>
        </div>
      </div>
      {open && (
        <div className="drawer-overlay" onClick={() => setOpen(false)} />
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer({ setPage }) {
  const go = (p) => setPage(p);
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <button className="nav-logo-btn" onClick={() => go("home")}>
            <Logo />
          </button>
          <p className="footer-tagline">
            A Specialized Talent Network for the Beauty, Hair &amp; Content
            Industry. Headquartered in Mumbai.
          </p>
        </div>

        <nav className="footer-nav">
          <p className="footer-col-title">Services</p>
          <div className="footer-nav-links">
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => go("services")}>
                {s.title}
              </button>
            ))}
          </div>
        </nav>

        <nav className="footer-nav">
          <p className="footer-col-title">Company</p>
          <div className="footer-nav-links">
            <button onClick={() => go("home")}>About Us</button>
            <button onClick={() => go("join")}>Join Our Network</button>
            <button onClick={() => go("faqs")}>FAQs</button>
            <button onClick={() => go("services")}>Our Work</button>
          </div>
        </nav>

        <div className="footer-contact-col">
          <p className="footer-col-title">Contact</p>
          <a href="mailto:hello@primehire.co" className="footer-contact-link">
            hello@primehire.co
          </a>
          <a href="tel:+919000000000" className="footer-contact-link">
            +91 90000 00000
          </a>
          <span className="footer-contact-link">Mumbai, Maharashtra</span>
          <div className="footer-socials">
            {[
              [Icons.X, "X"],
              [Icons.LinkedIn, "LinkedIn"],
              [Icons.Instagram, "Instagram"],
              [Icons.Facebook, "Facebook"],
            ].map(([Icon, label]) => (
              <a
                key={label}
                href="#"
                className="social-icon"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 {BRAND.name}. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   FORM COMPONENTS
══════════════════════════════════════════ */
function RequestForm({ defaultDept = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: defaultDept,
    details: "",
  });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const svc = SERVICES.find((s) => s.id === form.department);
    await submitToSheets({
      ...form,
      sheet: svc?.sheet || "General",
      timestamp: new Date().toISOString(),
    });
    setStatus("success");
  };

  if (status === "success")
    return (
      <div className="form-success">
        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3>Request Received!</h3>
        <p>
          Our team will reach out within 48 hours with matched candidates for
          your role.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label>Your Name *</label>
        <input
          required
          value={form.name}
          onChange={set("name")}
          placeholder="Priya Sharma"
        />
      </div>
      <div className="form-group">
        <label>Phone Number *</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          placeholder="+91 90000 00000"
        />
      </div>
      <div className="form-group span-2">
        <label>Email Address *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="priya@yoursalon.com"
        />
      </div>
      <div className="form-group span-2">
        <label>Role / Department Required *</label>
        <select
          required
          value={form.department}
          onChange={set("department")}
        >
          <option value="">Select a service area…</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group span-2">
        <label>Tell us about your requirement</label>
        <textarea
          value={form.details}
          onChange={set("details")}
          placeholder="Describe the role, your salon or brand, timeline, and any specific skills required…"
          rows={4}
        />
      </div>
      <div className="span-2">
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            "Submitting…"
          ) : (
            <>
              Submit Request <Icons.ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════
   HERO PANEL (right side)
══════════════════════════════════════════ */
function HeroVisual() {
  const cards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <path d="M9 9h.01M15 9h.01" />
        </svg>
      ),
      role: "Hair Extension Technician",
      dept: "Hair & Extensions",
      match: 98,
      color: "#6366F1",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.82v6.361a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      role: "Beauty Content Creator",
      dept: "Content & Digital",
      match: 95,
      color: "#0EA5E9",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      role: "Performance Marketer",
      dept: "Marketing & Growth",
      match: 91,
      color: "#10B981",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      role: "Salon Manager",
      dept: "Salon Operations",
      match: 88,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="hero-visual">
      <div className="hv-card hv-card--main">
        <div className="hv-header">
          <div className="live-badge">
            <span className="live-dot" />
            Live Matches
          </div>
          <span className="hv-count">{cards.length} active</span>
        </div>
        <div className="hv-list">
          {cards.map((c, i) => (
            <div
              className="hv-row"
              key={c.role}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="hv-emoji"
                style={{ background: c.color + "18", color: c.color }}
              >
                {c.icon}
              </div>
              <div className="hv-info">
                <p className="hv-role">{c.role}</p>
                <p className="hv-dept">{c.dept}</p>
              </div>
              <div className="hv-bar-wrap">
                <div
                  className="hv-bar"
                  style={{ "--pct": `${c.match}%`, "--color": c.color }}
                />
                <span className="hv-pct">{c.match}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hv-footer">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Updated in real-time
        </div>
      </div>

      <div className="hv-card hv-card--mini hv-card--mini-1">
        <p className="mini-num">15+</p>
        <p className="mini-label">Partner Salons</p>
      </div>
      <div className="hv-card hv-card--mini hv-card--mini-2">
        <p className="mini-num">48h</p>
        <p className="mini-label">Avg. Match Time</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   WHY PRIMEHIRE  — BEAUTY INDUSTRY TRUST
══════════════════════════════════════════ */
const WHY_ITEMS = [
  {
    id: "niche",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Beauty & Hair Only",
    desc: "We work exclusively within the beauty and hair industry. No generic staffing.",
    detail:
      "Unlike multi-industry recruiters, we understand the difference between a micro-ring technician and a tape-in specialist. Our focus means faster, more accurate placements.",
    stat: "100%", statLabel: "Industry focused",
  },
  {
    id: "verified",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
    title: "Verified Brand Partners",
    desc: "We connect candidates with verified salons and beauty brands only.",
    detail:
      "Every employer we work with is vetted before we place professionals with them. We protect your reputation and career as much as we protect theirs.",
    stat: "15+", statLabel: "Verified partners",
  },
  {
    id: "screened",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Pre-Screened Profiles",
    desc: "We evaluate every candidate before a single profile reaches you.",
    detail:
      "Multi-step vetting includes skill assessments, reference checks, and a structured interview aligned to your specific domain — not a blanket HR screen.",
    stat: "3-stage", statLabel: "Vetting process",
  },
  {
    id: "skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Skill-Based Matching",
    desc: "We understand salon skill requirements, not just job titles.",
    detail:
      "We know a Salon Manager in a 10-chair salon needs different skills than one managing a 50-seat flagship. We match on actual competency, not keywords.",
    stat: "48h", statLabel: "Avg. response time",
  },
  {
    id: "mumbai",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Mumbai-Based Operations",
    desc: "Headquartered in Mumbai, serving beauty brands across India.",
    detail:
      "Our team operates from Mumbai with deep knowledge of the local salon market. We also place talent for remote-eligible roles nationally.",
    stat: "Mumbai", statLabel: "HQ & operations",
  },
  {
    id: "support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    ),
    title: "Flexible Engagements",
    desc: "Full-time, part-time, or freelance — your terms.",
    detail:
      "Whether you need a full-time stylist or a weekend reel editor, we structure the engagement to match your salon's workflow and budget.",
    stat: "4 types", statLabel: "Engagement models",
  },
];

function WhyGrid() {
  return (
    <div className="why-grid">
      {WHY_ITEMS.map((item) => (
        <div className="why-card" key={item.id}>
          <div className="why-card-header">
            <div className="why-icon-wrap">{item.icon}</div>
            <h4 className="why-title">{item.title}</h4>
          </div>
          <p className="why-desc">{item.desc}</p>
          <p className="why-detail-text">{item.detail}</p>
          <div className="why-stat-row">
            <span className="why-stat-num">{item.stat}</span>
            <span className="why-stat-label">{item.statLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   INDUSTRY FOCUS SECTION (new)
══════════════════════════════════════════ */
function IndustryFocusSection() {
  const beautyRoles = [
    "Hair Extension Technicians",
    "Hair Patch Technicians",
    "Hairstylists & Colourists",
    "Salon Managers",
    "Clinic Coordinators",
    "Beauty Therapists",
  ];
  const digitalRoles = [
    "Beauty Content Creators",
    "Reel Editors",
    "Videographers (Salon Shoots)",
    "Performance Marketers",
    "Social Media Managers",
    "Brand Strategists",
  ];

  return (
    <section className="section section--gray">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">We Specialise In</p>
          <h2 className="section-title">
            Roles we understand,<br />
            <em>deeply.</em>
          </h2>
          <p className="section-sub">
            We place talent across two core verticals — on-floor beauty &amp;
            hair professionals, and the digital talent that grows modern salon
            brands.
          </p>
        </div>

        <div className="services-preview-grid">
          {/* Beauty & Hair Roles */}
          <div className="svc-card">
            <div className="svc-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <path d="M9 9h.01M15 9h.01" />
              </svg>
            </div>
            <h3 className="svc-card-title">Beauty &amp; Hair Industry Roles</h3>
            <p className="svc-card-desc">
              Certified, experienced, and screened professionals for every
              chair, clinic, and counter.
            </p>
            <ul style={{ marginBottom: "20px" }}>
              {beautyRoles.map((role) => (
                <li
                  key={role}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                    color: "var(--slate)",
                    padding: "5px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: 16, height: 16, flexShrink: 0, stroke: "var(--blue)" }}
                  >
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* Digital & Content Roles */}
          <div className="svc-card">
            <div className="svc-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.82v6.361a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <h3 className="svc-card-title">
              Digital &amp; Content Roles{" "}
              <span
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  color: "var(--blue)",
                  background: "var(--blue-pale)",
                  border: "1px solid var(--border-blue)",
                  padding: "2px 8px",
                  borderRadius: "99px",
                  letterSpacing: "0.05em",
                  verticalAlign: "middle",
                }}
              >
                Beauty-Focused Only
              </span>
            </h3>
            <p className="svc-card-desc">
              Digital professionals who understand salon aesthetics, beauty
              audiences, and content that actually converts.
            </p>
            <ul style={{ marginBottom: "20px" }}>
              {digitalRoles.map((role) => (
                <li
                  key={role}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                    color: "var(--slate)",
                    padding: "5px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: 16, height: 16, flexShrink: 0, stroke: "var(--blue)" }}
                  >
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <div className="page">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-dots" />
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Beauty, Hair &amp; Content Industry
            </div>
            <h1 className="hero-heading">
              A Specialized Talent Network for <em>Beauty &amp; Hair.</em>
            </h1>
            <p className="hero-sub">
              {BRAND.name} connects premium salons and beauty brands with
              pre-screened professionals — from hair extension technicians to
              content creators. Headquartered in Mumbai.
            </p>

            {/* Trust */}
            <div className="hero-trust">
              <div className="trust-avatars">
                {TRUST_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="professional"
                    className="trust-av"
                    style={{ zIndex: TRUST_AVATARS.length - i }}
                  />
                ))}
              </div>
              <div className="trust-text">
                <StarRating count={5} />
                <p>
                  Trusted by <strong>15+ salon brands</strong>
                </p>
              </div>
            </div>

            <div className="hero-ctas">
              <button
                className="btn-primary"
                onClick={() => setPage("services")}
              >
                Explore Services <Icons.ArrowRight />
              </button>
              <button className="btn-ghost" onClick={() => setPage("join")}>
                Submit Your Profile
              </button>
            </div>
          </div>

          <div className="hero-right">
            <HeroVisual />
          </div>
        </div>

        {/* Partner logos */}
        <div className="logo-strip">
          <p className="logo-strip-label">Partner salons &amp; beauty brands</p>
          <div className="logo-strip-row">
            {PARTNER_LOGOS.map((l) => (
              <div key={l.name} className="logo-pill">
                {l.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              {
                n: "50+",
                l: "Professionals in Network",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                n: "15+",
                l: "Partner Salons & Brands",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
              },
              {
                n: "48hrs",
                l: "Average Match Time",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
              },
              {
                n: "Mumbai",
                l: "Based Operations",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
              },
            ].map(({ n, l, icon }) => (
              <div className="stat-card" key={l}>
                <div className="stat-icon">{icon}</div>
                <p className="stat-num">{n}</p>
                <p className="stat-label">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY FOCUS (new section) ── */}
      <IndustryFocusSection />

      {/* ── WHAT WE OFFER ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Our Services</p>
            <h2 className="section-title">
              Every role the beauty<br />
              industry demands
            </h2>
            <p className="section-sub">
              From skilled technicians to reel editors, we place the people that
              keep premium salon and beauty brands running.
            </p>
          </div>

          <div className="services-preview-grid">
            {SERVICES.map((s) => (
              <div className="svc-card" key={s.id}>
                <div className="svc-card-icon">{s.icon}</div>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.desc}</p>
                <button
                  className="svc-card-cta"
                  onClick={() => setPage("services")}
                >
                  View work <Icons.ArrowRight />
                </button>
              </div>
            ))}
          </div>

          <div className="section-cta-row">
            <button
              className="btn-primary"
              onClick={() => setPage("services")}
            >
              View all services <Icons.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY PRIMEHIRE ── */}
      <section className="section section--blue">
        <div className="container">
          <div className="section-header section-header--light">
            <div className="why-heading-row">
              <div className="why-logo-mark">
                <svg viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.15)" />
                  <path d="M8 22L14 10L20 18L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="24" cy="14" r="2" fill="white" />
                </svg>
              </div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Why professionals trust us
              </h2>
            </div>
            <p className="eyebrow eyebrow--white" style={{ marginTop: "12px" }}>
              Why {BRAND.name}
            </p>
            <p className="section-sub">
              Short. Direct. No generic HR language. We know this industry
              because we work only inside it.
            </p>
          </div>
          <WhyGrid />
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="section section--gray hiw-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Our Process</p>
            <h2 className="section-title">
              Structure you can rely on
            </h2>
            <p className="section-sub">
              A clear, organised system from first contact to placed candidate.
              Structure is how we build trust.
            </p>
          </div>
          <div className="steps-row">
            {[
              {
                n: "01",
                title: "Submit Your Profile",
                desc: "Professionals fill out a single talent profile. Employers submit a role request.",
              },
              {
                n: "02",
                title: "Skill Evaluation",
                desc: "Our team evaluates each profile against industry-specific skill requirements.",
              },
              {
                n: "03",
                title: "Brand Matching",
                desc: "We match candidates to verified partner salons and brands by fit and location.",
              },
              {
                n: "04",
                title: "Interview Coordination",
                desc: "We coordinate and prepare both sides for a smooth interview process.",
              },
              {
                n: "05",
                title: "Placement Support",
                desc: "Post-placement follow-up to ensure the match is working for both parties.",
              },
            ].map((step, i, arr) => (
              <div className="steps-item" key={step.n}>
                <div className="step-card">
                  <span className="step-num">{step.n}</span>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="step-arrow">
                    <Icons.ArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-card">
          <div className="cta-banner-left">
            <p className="eyebrow">Get Started</p>
            <h2 className="cta-banner-title">
              Ready to find the right<br />
              fit for your salon?
            </h2>
            <p className="cta-banner-sub">
              Whether you're a salon hiring or a professional looking for your
              next role, {BRAND.name} has you covered — Mumbai and beyond.
            </p>
          </div>
          <div className="cta-banner-right">
            <div className="cta-inner-card">
              <p className="cta-inner-label">Start today — free to enquire</p>
              <div className="cta-banner-btns">
                <button
                  className="btn-primary cta-btn-blue"
                  onClick={() => setPage("join")}
                >
                  Submit Your Profile <Icons.ArrowRight />
                </button>
                <button
                  className="btn-ghost cta-btn-ghost"
                  onClick={() => setPage("services")}
                >
                  Browse Services
                </button>
              </div>
              <div className="cta-trust-row cta-trust-row--horizontal">
                <div className="cta-trust-item">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  No upfront cost
                </div>
                <div className="cta-trust-item">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  48hr response
                </div>
                <div className="cta-trust-item">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Pre-vetted talent
                </div>
              </div>
              <div className="cta-social-proof">
                <div className="cta-proof-item">
                  <div className="cta-proof-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          fill="#F59E0B"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="cta-proof-label">5.0 rated by partners</span>
                </div>
                <div className="cta-proof-divider" />
                <div className="cta-proof-item">
                  <span className="cta-proof-num">50+</span>
                  <span className="cta-proof-label">Professionals placed</span>
                </div>
                <div className="cta-proof-divider" />
                <div className="cta-proof-item">
                  <span className="cta-proof-num">15+</span>
                  <span className="cta-proof-label">Partner brands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   SERVICES PAGE
══════════════════════════════════════════ */
function ServicesPage({ setPage }) {
  const [formDept, setFormDept] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const scrollToForm = (id) => {
    setFormDept(id);
    setTimeout(() => {
      document
        .getElementById("request-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const handleFilterClick = (id) => {
    setActiveFilter(id);
    setTimeout(() => {
      const target =
        id === "all"
          ? document.getElementById("dept-top")
          : document.getElementById(`dept-${id}`);
      if (target) {
        const offset = 138;
        const y =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const visibleServices =
    activeFilter === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.id === activeFilter);

  return (
    <div className="page">
      <div className="page-hero page-hero--center">
        <div className="container">
          <p className="eyebrow">Our Services</p>
          <h1 className="page-hero-title">
            Talent placed.<br />
            <em>Results delivered.</em>
          </h1>
          <p className="page-hero-sub">
            Browse our service areas, see the kind of roles we fill, and
            request the right professional for your salon or brand.
          </p>
        </div>
      </div>

      {/* Filter Toggle Bar */}
      <div className="filter-bar-wrap">
        <div className="container">
          <div className="filter-bar">
            <button
              className={`filter-pill ${activeFilter === "all" ? "filter-pill--active" : ""
                }`}
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                className={`filter-pill ${activeFilter === s.id ? "filter-pill--active" : ""
                  }`}
                onClick={() => handleFilterClick(s.id)}
              >
                <span className="filter-pill-icon">{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="dept-top" />
      {visibleServices.map((s) => (
        <div className="dept-block" id={`dept-${s.id}`} key={s.id}>
          <div className="container">
            <div className="dept-header">
              <div className="dept-icon">{s.icon}</div>
              <div className="dept-meta">
                <h2 className="dept-title">{s.title}</h2>
                <p className="dept-desc">{s.desc}</p>
              </div>
              <button
                className="btn-primary dept-cta"
                onClick={() => scrollToForm(s.id)}
              >
                Request Talent <Icons.ArrowRight />
              </button>
            </div>

            <div className="portfolio-grid">
              {s.projects.map((p) => (
                <div className="portfolio-card" key={p.title}>
                  <div className="portfolio-img-wrap">
                    <img
                      src={p.image || s.image}
                      alt={p.title}
                      className="portfolio-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <span className="portfolio-dept-badge">
                      {s.portfolioTag}
                    </span>
                  </div>
                  <div className="portfolio-body">
                    <span className="portfolio-tag">{p.tag}</span>
                    <h4 className="portfolio-title">{p.title}</h4>
                    <p className="portfolio-desc">{p.desc}</p>
                    <div className="portfolio-metrics">
                      {p.metrics.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                    <button
                      className="btn-outline-sm"
                      onClick={() => scrollToForm(s.id)}
                    >
                      Request Talent <Icons.ArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* How it works */}
      <section className="section section--gray hiw-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">How It Works</p>
            <h2 className="section-title">Three simple steps</h2>
          </div>
          <div className="steps-row">
            {[
              {
                n: "01",
                title: "Tell Us What You Need",
                desc: "Select your service area and describe the role, timeline, and any skill requirements.",
              },
              {
                n: "02",
                title: "We Match & Screen",
                desc: "Our team sources and evaluates candidates against your specific needs — beauty industry expertise included.",
              },
              {
                n: "03",
                title: "You Meet the Right People",
                desc: "We respond within 48 hours with curated, pre-screened candidate profiles ready for interview.",
              },
            ].map((step, i, arr) => (
              <div className="steps-item" key={step.n}>
                <div className="step-card">
                  <span className="step-num">{step.n}</span>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="step-arrow">
                    <Icons.ArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request-anchor" className="section section--blue-soft">
        <div className="container">
          <div className="form-section-inner">
            <div className="form-section-left">
              <p className="eyebrow">Submit a Request</p>
              <h2 className="section-title">
                Tell us what<br />
                you need
              </h2>
              <p className="section-sub">
                We'll match you with the right professional and get back to you
                within 48 hours.
              </p>
              <ul className="form-perks">
                {[
                  "Beauty & hair industry specialists only",
                  "Pre-screened before we forward any profile",
                  "Response within 48 hours",
                  "Full-time, part-time & freelance options",
                  "No upfront cost to enquire",
                ].map((p) => (
                  <li key={p}>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 10l4 4 8-8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-card">
              <RequestForm defaultDept={formDept} key={formDept} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   JOIN PAGE
══════════════════════════════════════════ */
function JoinPage() {
  const [form, setForm] = useState({
    name: "",
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
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow">Join {BRAND.name}</p>
          <h1 className="page-hero-title">
            Join Our<br />
            <em>Talent Network</em>
          </h1>
          <p className="page-hero-sub">
            Submit your profile and we'll match you to verified salons and
            beauty brands across Mumbai and India. Free to join — always.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="join-grid">
            <div className="join-info">
              <h3>Why join our network?</h3>
              <p>
                {BRAND.name} works exclusively in the beauty and hair industry.
                That means the opportunities we send you are actually relevant
                to your skills.
              </p>
              <ul className="perk-list">
                {[
                  "Access to verified salons and premium beauty brands",
                  "Matched by skill and domain — not just job title",
                  "We screen your profile before sharing with any employer",
                  "Free to join — we're paid by hiring brands",
                  "Opportunities in Mumbai and across India",
                  "Full-time, part-time, and freelance roles available",
                ].map((p) => (
                  <li key={p}>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 10l4 4 8-8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-card">
              {status === "success" ? (
                <div className="form-success">
                  <div className="success-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3>Profile Received!</h3>
                  <p>
                    Our team will review your profile and reach out within 48
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Priya Sharma"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 90000 00000"
                    />
                  </div>
                  <div className="form-group span-2">
                    <label>Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="priya@email.com"
                    />
                  </div>
                  <div className="form-group span-2">
                    <label>Your Primary Field *</label>
                    <select
                      required
                      value={form.domain}
                      onChange={set("domain")}
                    >
                      <option value="">Select your specialisation…</option>
                      <option>Hair Extension Technician</option>
                      <option>Hair Patch Technician</option>
                      <option>Hairstylist & Colourist</option>
                      <option>Salon Manager</option>
                      <option>Clinic Coordinator</option>
                      <option>Beauty Therapist</option>
                      <option>Beauty Content Creator</option>
                      <option>Reel Editor</option>
                      <option>Videographer</option>
                      <option>Performance Marketer</option>
                      <option>Social Media Manager</option>
                      <option>Brand Strategist</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Years of Experience *</label>
                    <select
                      required
                      value={form.experience}
                      onChange={set("experience")}
                    >
                      <option value="">Select…</option>
                      <option>0–1 years</option>
                      <option>2–4 years</option>
                      <option>5–9 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Availability *</label>
                    <select
                      required
                      value={form.availability}
                      onChange={set("availability")}
                    >
                      <option value="">Select…</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Freelance / Contract</option>
                      <option>Open to all</option>
                    </select>
                  </div>
                  <div className="form-group span-2">
                    <label>Your Location *</label>
                    <input
                      required
                      value={form.location}
                      onChange={set("location")}
                      placeholder="e.g. Mumbai, Maharashtra"
                    />
                  </div>
                  <div className="form-group span-2">
                    <label>Instagram / LinkedIn / Portfolio URL</label>
                    <input
                      type="url"
                      value={form.linkedin}
                      onChange={set("linkedin")}
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                  <div className="form-group span-2">
                    <label>About You *</label>
                    <textarea
                      required
                      value={form.bio}
                      onChange={set("bio")}
                      placeholder="Tell us about your skills, experience level, and what kind of roles you're looking for…"
                      rows={4}
                    />
                  </div>
                  <div className="span-2">
                    <button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        "Submitting…"
                      ) : (
                        <>
                          Submit Your Profile <Icons.ArrowRight />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   FAQs PAGE
══════════════════════════════════════════ */
function FAQsPage() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="page">
      <div className="page-hero page-hero--faq page-hero--center">
        <div className="faq-bg-shape faq-shape-1" />
        <div className="faq-bg-shape faq-shape-2" />
        <div className="faq-bg-shape faq-shape-3" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p className="eyebrow">Help Centre</p>
          <h1 className="page-hero-title">
            Frequently asked<br />
            <em>questions</em>
          </h1>
          <p className="page-hero-sub">
            Answers for salons, beauty brands, and professionals navigating the{" "}
            {BRAND.name} network.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container faq-container">
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div
                className={`faq-item ${open === i ? "open" : ""}`}
                key={i}
              >
                <button className="faq-q" onClick={() => toggle(i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">
                    <Icons.ChevronDown />
                  </span>
                </button>
                <div className="faq-body">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <div className="faq-contact-card">
              <h3>Still have questions?</h3>
              <p>
                Can't find what you're looking for? Send us a message and we'll
                get back to you within 24 hours.
              </p>
              <form
                className="form-grid"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Sent! We'll be in touch.");
                }}
              >
                <div className="form-group">
                  <label>Your Name *</label>
                  <input required placeholder="Priya Sharma" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="priya@email.com"
                  />
                </div>
                <div className="form-group span-2">
                  <label>I am a…</label>
                  <select>
                    <option>Salon / Beauty Brand</option>
                    <option>Professional / Job Seeker</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group span-2">
                  <label>Your Question *</label>
                  <textarea
                    required
                    placeholder="What would you like to know?"
                    rows={3}
                  />
                </div>
                <div className="span-2">
                  <button type="submit" className="btn-primary w-full">
                    Send Question <Icons.ArrowRight />
                  </button>
                </div>
              </form>
            </div>
          </div>
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
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "join" && <JoinPage />}
        {page === "faqs" && <FAQsPage />}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
import { useState, useEffect, useRef } from "react";
import "./index.css";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzuotRzpA5l08XwJBqQMaVAIHgqKEG92zkhJUAa5_zx768EEIQ4SLY6oC7Ji8Br0Al-iQ/exec";
const BRAND = { name: "PrimeHire" };

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "ai",
    title: "AI Automation",
    sheet: "AI Automation",
    portfolioTag: "Automation & AI",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop",
    desc: "Streamline workflows with intelligent automation solutions tailored to your business.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
    projects: [
      { title: "Lead Qualification Bot", tag: "Fintech", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&auto=format&fit=crop", desc: "AI-driven pipeline auto-qualifying 1,200+ monthly leads, reducing manual review time by 70%.", metrics: ["70% time saved", "1,200 leads/mo"] },
      { title: "Invoice Processing", tag: "Logistics", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop", desc: "OCR + ML system processing 5,000 invoices daily with 99.2% accuracy.", metrics: ["99.2% accuracy", "5k/day"] },
      { title: "Churn Prediction Model", tag: "SaaS", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop", desc: "Predictive model with 87% accuracy helping a SaaS firm retain at-risk customers.", metrics: ["87% accuracy", "Churn -34%"] },
    ],
  },
  {
    id: "digital",
    title: "Digital Marketing",
    sheet: "Digital Marketing",
    portfolioTag: "Marketing & Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    desc: "Drive growth through data-driven campaigns, SEO, and brand strategy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    projects: [
      { title: "E-Commerce SEO Overhaul", tag: "Retail", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80&auto=format&fit=crop", desc: "Full SEO rebuild achieving a 3x increase in organic traffic in 6 months.", metrics: ["3x traffic", "6 months"] },
      { title: "Performance Ad Campaign", tag: "Healthcare", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop", desc: "Multi-channel paid media delivering 4.8x ROAS for a healthcare brand's launch.", metrics: ["4.8x ROAS", "Multi-channel"] },
      { title: "Brand Positioning Strategy", tag: "Startup", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80&auto=format&fit=crop", desc: "Complete brand identity and GTM strategy for a Series A startup.", metrics: ["GTM strategy", "Series A"] },
    ],
  },
  {
    id: "production",
    title: "Productions",
    sheet: "Productions",
    portfolioTag: "Creative & Content",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format&fit=crop",
    desc: "Creative production teams for video, photography, and content creation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.82v6.361a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    projects: [
      { title: "Corporate Brand Film", tag: "Manufacturing", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop", desc: "4-minute brand documentary deployed across digital and broadcast channels.", metrics: ["Broadcast quality", "4-min film"] },
      { title: "Product Launch Photography", tag: "Fashion", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80&auto=format&fit=crop", desc: "Studio and on-location shoot for a premium fashion label's summer collection.", metrics: ["300+ assets", "Studio and location"] },
      { title: "Social Content Series", tag: "F&B", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop", desc: "12-week content series driving 220% engagement growth on Instagram and TikTok.", metrics: ["220% engagement", "12-week series"] },
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Finance",
    sheet: "Accounts",
    portfolioTag: "Finance & Compliance",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&auto=format&fit=crop",
    desc: "Skilled accountants and finance professionals for your business needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M6 8h.01M10 8h4M6 12h12" />
      </svg>
    ),
    projects: [
      { title: "Annual Audit & Compliance", tag: "Mining", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop", desc: "Full statutory audit and compliance review for a mid-size mining company.", metrics: ["Zero findings", "On-time delivery"] },
      { title: "Financial Model Build", tag: "PropTech", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop", desc: "3-statement model and investor deck for a PropTech startup's funding round.", metrics: ["Series A funded", "3-statement model"] },
      { title: "CFO-as-a-Service", tag: "NGO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop", desc: "6-month fractional CFO engagement covering budgeting, reporting and donor compliance.", metrics: ["6 months", "Budget overhaul"] },
    ],
  },
  {
    id: "tech",
    title: "Technology & Dev",
    sheet: "Technology",
    portfolioTag: "Software & Engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
    desc: "Expert developers and engineers for software, web, and mobile projects.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    projects: [
      { title: "Mobile Marketplace App", tag: "Retail", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop", desc: "Cross-platform marketplace (iOS and Android) shipped in 14 weeks.", metrics: ["14 weeks", "iOS and Android"] },
      { title: "ERP Integration", tag: "Manufacturing", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop", desc: "Custom SAP integration unifying data across 4 departments.", metrics: ["4 departments", "SAP integration"] },
      { title: "Web Platform Rebuild", tag: "EdTech", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop", desc: "Full-stack rebuild improving load speed by 60% and retention by 35%.", metrics: ["60% faster", "+35% retention"] },
    ],
  },
  {
    id: "hr",
    title: "HR & Recruitment",
    sheet: "HR",
    portfolioTag: "People & Culture",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop",
    desc: "HR specialists to manage your people operations and culture.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    projects: [
      { title: "Executive Search: COO", tag: "Finance", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop", desc: "End-to-end executive search placing a seasoned COO within 3 weeks.", metrics: ["3-week placement", "C-Suite"] },
      { title: "HR Policy Overhaul", tag: "Hospitality", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80&auto=format&fit=crop", desc: "Complete HR policy and handbook redesign for a 200-person hospitality group.", metrics: ["200 employees", "Full compliance"] },
      { title: "Graduate Talent Programme", tag: "Consulting", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop", desc: "3-month graduate campaign placing 18 candidates across 5 departments.", metrics: ["18 placements", "5 departments"] },
    ],
  },
];

const FAQS = [
  { q: `How does ${BRAND.name} work for employers?`, a: "Employers submit a service request through our platform. Our team reviews your requirements and matches you with pre-vetted professionals, whether for a full-time role or a specific project." },
  { q: `How does ${BRAND.name} work for job seekers?`, a: "Professionals fill out a single talent profile form on our Join Us page. We actively match your skills and preferences against open opportunities from our client companies." },
  { q: "What industries do you cover?", a: "We cover AI and Automation, Digital Marketing, Productions, Accounts and Finance, Technology and Development, HR and Recruitment, and more. Our network is always expanding." },
  { q: "How long does the hiring process take?", a: "For project-based roles, we can place professionals within 3 to 5 business days. Full-time placements typically take 1 to 3 weeks depending on the role complexity." },
  { q: "Is there a cost to join as a professional?", a: `No. Joining ${BRAND.name} as a professional is completely free. We are compensated by the companies we place talent with.` },
  { q: "How are professionals vetted?", a: "Every professional goes through a profile review, skill assessment, and interview with our talent team before being added to our active talent pool." },
  { q: "Can I hire for both full-time and contract roles?", a: `Absolutely. ${BRAND.name} supports full-time permanent placements as well as task-based or contract engagements.` },
  { q: "How do I track my application?", a: "After submitting your form, you will receive a confirmation email. Our team will reach out within 48 hours to discuss next steps." },
];

const TRUST_AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
  "https://randomuser.me/api/portraits/women/55.jpg",
];

const LOGOS = [
  { name: "Google", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg> },
  { name: "Microsoft", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022" /><path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00" /><path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF" /><path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900" /></svg> },
  { name: "Deloitte", svg: <svg viewBox="0 0 80 24" fill="none"><text x="0" y="18" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#86BC25">Deloitte.</text></svg> },
  { name: "PwC", svg: <svg viewBox="0 0 60 24" fill="none"><text x="0" y="18" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#D04A02">PwC</text></svg> },
  { name: "KPMG", svg: <svg viewBox="0 0 70 24" fill="none"><text x="0" y="18" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#00338D">KPMG</text></svg> },
  { name: "McKinsey", svg: <svg viewBox="0 0 100 24" fill="none"><text x="0" y="18" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#003087">McKinsey</text></svg> },
];

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
async function submitToSheets(data) {
  try {
    await fetch(SCRIPT_URL + "?" + new URLSearchParams({ data: JSON.stringify(data) }), {
      method: "GET", mode: "no-cors",
    });
    return true;
  } catch { return false; }
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

  const go = (p) => { setPage(p); setOpen(false); };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="nav-logo-btn" onClick={() => go("home")}>
            <Logo />
          </button>

          <nav className="nav-links" role="navigation">
            {[["home", "Home"], ["services", "Services"], ["faqs", "FAQs"]].map(([p, label]) => (
              <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => go(p)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="nav-join-cta" onClick={() => go("join")}>
              Join Us <Icons.ArrowRight />
            </button>
          </div>

          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="mobile-drawer-inner">
          {[["home", "Home"], ["services", "Services"], ["faqs", "FAQs"]].map(([p, label]) => (
            <button key={p} className={`mobile-link ${page === p ? "active" : ""}`} onClick={() => go(p)}>
              {label}
            </button>
          ))}
          <button className="btn-primary w-full mt-auto" onClick={() => go("join")}>
            Join Us <Icons.ArrowRight />
          </button>
        </div>
      </div>
      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} />}
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
        {/* Brand + tagline */}
        <div className="footer-brand">
          <button className="nav-logo-btn" onClick={() => go("home")}>
            <Logo />
          </button>
          <p className="footer-tagline">Connecting companies with elite professionals across every discipline.</p>
        </div>

        {/* Nav links in one row */}
        <nav className="footer-nav">
          <p className="footer-col-title">Services</p>
          <div className="footer-nav-links">
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => go("services")}>{s.title}</button>
            ))}
          </div>
        </nav>

        <nav className="footer-nav">
          <p className="footer-col-title">Company</p>
          <div className="footer-nav-links">
            <button onClick={() => go("home")}>About Us</button>
            <button onClick={() => go("join")}>Join Us</button>
            <button onClick={() => go("faqs")}>FAQs</button>
            <button onClick={() => go("services")}>Our Work</button>
          </div>
        </nav>

        {/* Contact */}
        <div className="footer-contact-col">
          <p className="footer-col-title">Contact</p>
          <a href="mailto:hello@primehire.co" className="footer-contact-link">hello@primehire.co</a>
          <a href="tel:+27000000000" className="footer-contact-link">+27 (0) 00 000 0000</a>
          <span className="footer-contact-link">Johannesburg, South Africa</span>
          <div className="footer-socials">
            {[[Icons.X, "X"], [Icons.LinkedIn, "LinkedIn"], [Icons.Instagram, "Instagram"], [Icons.Facebook, "Facebook"]].map(([Icon, label]) => (
              <a key={label} href="#" className="social-icon" aria-label={label}><Icon /></a>
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
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "", department: defaultDept, details: "" });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const svc = SERVICES.find((s) => s.id === form.department);
    await submitToSheets({ ...form, sheet: svc?.sheet || "General", timestamp: new Date().toISOString() });
    setStatus("success");
  };

  if (status === "success") return (
    <div className="form-success">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3>Request Received!</h3>
      <p>Our team will reach out within 48 hours to discuss your requirements.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label>Full Name *</label>
        <input required value={form.name} onChange={set("name")} placeholder="Jane Smith" />
      </div>
      <div className="form-group">
        <label>Age *</label>
        <input required type="number" min="18" max="99" value={form.age} onChange={set("age")} placeholder="30" />
      </div>
      <div className="form-group">
        <label>Email Address *</label>
        <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" />
      </div>
      <div className="form-group">
        <label>Phone Number *</label>
        <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+27 000 000 000" />
      </div>
      <div className="form-group span-2">
        <label>Department / Service Required *</label>
        <select required value={form.department} onChange={set("department")}>
          <option value="">Select a department…</option>
          {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>
      <div className="form-group span-2">
        <label>Tell us about your needs</label>
        <textarea value={form.details} onChange={set("details")} placeholder="Describe your project, timeline, team size, and any specific requirements…" rows={4} />
      </div>
      <div className="span-2">
        <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
          {status === "loading" ? "Submitting…" : <>Submit Request <Icons.ArrowRight /></>}
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
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" /></svg>,
      role: "AI Engineer", dept: "AI Automation", match: 98, color: "#6366F1",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
      role: "Brand Strategist", dept: "Digital Marketing", match: 95, color: "#0EA5E9",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
      role: "Senior Developer", dept: "Technology & Dev", match: 91, color: "#10B981",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4M6 8h.01M10 8h4M6 12h12" /></svg>,
      role: "Finance Lead", dept: "Accounts & Finance", match: 88, color: "#F59E0B",
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
            <div className="hv-row" key={c.role} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="hv-emoji" style={{ background: c.color + "18", color: c.color }}>{c.icon}</div>
              <div className="hv-info">
                <p className="hv-role">{c.role}</p>
                <p className="hv-dept">{c.dept}</p>
              </div>
              <div className="hv-bar-wrap">
                <div className="hv-bar" style={{ "--pct": `${c.match}%`, "--color": c.color }} />
                <span className="hv-pct">{c.match}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hv-footer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          Updated in real-time
        </div>
      </div>

      {/* Floating mini-card */}
      <div className="hv-card hv-card--mini hv-card--mini-1">
        <p className="mini-num">500+</p>
        <p className="mini-label">Professionals Placed</p>
      </div>
      <div className="hv-card hv-card--mini hv-card--mini-2">
        <p className="mini-num">48h</p>
        <p className="mini-label">Avg. Match Time</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   WHY PRIMEHIRE   INTERACTIVE GRID
══════════════════════════════════════════ */
const WHY_ITEMS = [
  {
    id: "speed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Fast Turnaround",
    desc: "Get matched with pre-vetted talent within 48 hours.",
    detail: "From the moment you submit your request, our team starts sourcing. Most clients receive their first shortlist within one business day, not one business week.",
    stat: "48h", statLabel: "Avg. response time",
  },
  {
    id: "match",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
    title: "Precision Matching",
    desc: "Skills, culture, and project fit beyond keywords.",
    detail: "Our matching process goes beyond resume scanning. We assess communication style, culture fit, and working patterns to ensure every placement actually sticks.",
    stat: "94%", statLabel: "Placement success rate",
  },
  {
    id: "vetted",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Vetted Professionals",
    desc: "Every candidate is screened and interview-ready.",
    detail: "Multi-stage vetting includes skill assessments, reference checks, and a structured interview with our talent team before anyone reaches your shortlist.",
    stat: "3-stage", statLabel: "Vetting process",
  },
  {
    id: "flexible",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    ),
    title: "Flexible Engagements",
    desc: "Full-time, part-time, or contract, your terms.",
    detail: "Whether you need a 2-week specialist or a permanent C-suite executive, we structure the engagement to fit your budget, timeline, and business model.",
    stat: "4 models", statLabel: "Engagement types",
  },
  {
    id: "global",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Diverse Talent Pool",
    desc: "Access professionals across Africa and globally.",
    detail: "Our network spans 12+ countries. From Johannesburg to Nairobi to London, we source candidates with the local knowledge and global standards your business demands.",
    stat: "12+", statLabel: "Countries covered",
  },
  {
    id: "support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedicated Support",
    desc: "A dedicated manager guides every step.",
    detail: "You're never passed around. One account manager owns your relationship from briefing to placement to post-hire check-ins at 30, 60, and 90 days.",
    stat: "1 contact", statLabel: "End-to-end ownership",
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
              Flexible HR &amp; Talent Marketplace
            </div>
            <h1 className="hero-heading">
              Hire the <em>right talent</em>,<br />right now.
            </h1>
            <p className="hero-sub">
              {BRAND.name} connects forward-thinking companies with elite professionals
              for full-time roles and project-based work across every industry that drives modern business.
            </p>

            {/* Trust */}
            <div className="hero-trust">
              <div className="trust-avatars">
                {TRUST_AVATARS.map((src, i) => (
                  <img key={i} src={src} alt="client" className="trust-av" style={{ zIndex: TRUST_AVATARS.length - i }} />
                ))}
              </div>
              <div className="trust-text">
                <StarRating count={5} />
                <p>Trusted by <strong>500+ companies</strong></p>
              </div>
            </div>

            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => setPage("services")}>
                Explore Services <Icons.ArrowRight />
              </button>
              <button className="btn-ghost" onClick={() => setPage("join")}>
                Join Our Team
              </button>
            </div>
          </div>

          <div className="hero-right">
            <HeroVisual />
          </div>
        </div>

        {/* Client logos */}
        <div className="logo-strip">
          <p className="logo-strip-label">Trusted by leading organisations</p>
          <div className="logo-strip-row">
            {LOGOS.map((l) => (
              <div key={l.name} className="logo-pill logo-pill--svg">
                <span className="logo-pill-svg">{l.svg}</span>
                <span>{l.name}</span>
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
              { n: "500+", l: "Professionals Placed", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
              { n: "12+", l: "Industries Served", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
              { n: "48hrs", l: "Average Match Time", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
              { n: "98%", l: "Client Satisfaction", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
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

      {/* ── WHAT WE OFFER ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">What We Offer</p>
            <h2 className="section-title">Services built for<br />every business need</h2>
            <p className="section-sub">From AI automation to creative productions, our talent network spans every critical business function.</p>
          </div>

          <div className="services-preview-grid">
            {SERVICES.map((s) => (
              <div className="svc-card" key={s.id}>
                <div className="svc-card-icon">{s.icon}</div>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.desc}</p>
                <button className="svc-card-cta" onClick={() => setPage("services")}>
                  View work <Icons.ArrowRight />
                </button>
              </div>
            ))}
          </div>

          <div className="section-cta-row">
            <button className="btn-primary" onClick={() => setPage("services")}>
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
              <h2 className="section-title" style={{ marginBottom: 0 }}>The smarter way to hire</h2>
            </div>
            <p className="eyebrow eyebrow--white" style={{ marginTop: '12px' }}>Why {BRAND.name}</p>
            <p className="section-sub">We don't just fill seats. We match expertise, culture and timeline precisely.</p>
          </div>
          <WhyGrid />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-card">
          <div className="cta-banner-left">
            <p className="eyebrow">Get Started</p>
            <h2 className="cta-banner-title">Ready to build your<br />dream team?</h2>
            <p className="cta-banner-sub">Whether you're hiring or job-seeking, {BRAND.name} has you covered.</p>
          </div>
          <div className="cta-banner-right">
            <div className="cta-inner-card">
              <p className="cta-inner-label">Start today, it's free to enquire</p>
              <div className="cta-banner-btns">
                <button className="btn-primary cta-btn-blue" onClick={() => setPage("services")}>
                  Explore Services <Icons.ArrowRight />
                </button>
                <button className="btn-ghost cta-btn-ghost" onClick={() => setPage("join")}>
                  Join Our Team
                </button>
              </div>
              <div className="cta-trust-row cta-trust-row--horizontal">
                <div className="cta-trust-item">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  No upfront cost
                </div>
                <div className="cta-trust-item">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  48hr response
                </div>
                <div className="cta-trust-item">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Pre-vetted talent
                </div>
              </div>
              {/* Social proof */}
              <div className="cta-social-proof">
                <div className="cta-proof-item">
                  <div className="cta-proof-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#F59E0B" /></svg>
                    ))}
                  </div>
                  <span className="cta-proof-label">4.9 / 5 on Google</span>
                </div>
                <div className="cta-proof-divider" />
                <div className="cta-proof-item">
                  <span className="cta-proof-num">500+</span>
                  <span className="cta-proof-label">Happy clients</span>
                </div>
                <div className="cta-proof-divider" />
                <div className="cta-proof-item">
                  <span className="cta-proof-num">98%</span>
                  <span className="cta-proof-label">Satisfaction rate</span>
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
      document.getElementById("request-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const handleFilterClick = (id) => {
    setActiveFilter(id);
    // Small delay so React re-renders the filtered section first
    setTimeout(() => {
      const target = id === "all"
        ? document.getElementById("dept-top")
        : document.getElementById(`dept-${id}`);
      if (target) {
        // Offset for sticky navbar + filter bar (70px nav + 52px filter bar + 16px gap)
        const offset = 138;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const visibleServices = activeFilter === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.id === activeFilter);

  return (
    <div className="page">
      {/* Centered hero */}
      <div className="page-hero page-hero--center">
        <div className="container">
          <p className="eyebrow">Our Services</p>
          <h1 className="page-hero-title">Work we've done.<br /><em>Results you can expect.</em></h1>
          <p className="page-hero-sub">Browse our departments, explore our portfolio, and request the right talent for your needs.</p>
        </div>
      </div>

      {/* Filter Toggle Bar */}
      <div className="filter-bar-wrap">
        <div className="container">
          <div className="filter-bar">
            <button
              className={`filter-pill ${activeFilter === "all" ? "filter-pill--active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                className={`filter-pill ${activeFilter === s.id ? "filter-pill--active" : ""}`}
                onClick={() => handleFilterClick(s.id)}
              >
                <span className="filter-pill-icon">{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Department sections */}
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
              <button className="btn-primary dept-cta" onClick={() => scrollToForm(s.id)}>
                Request Talent <Icons.ArrowRight />
              </button>
            </div>

            <div className="portfolio-grid">
              {s.projects.map((p) => (
                <div className="portfolio-card" key={p.title}>
                  <div className="portfolio-img-wrap">
                    <img src={p.image || s.image} alt={p.title} className="portfolio-img"
                      onError={(e) => { e.target.style.display = "none"; }} />
                    <span className="portfolio-dept-badge">{s.portfolioTag}</span>
                  </div>
                  <div className="portfolio-body">
                    <span className="portfolio-tag">{p.tag}</span>
                    <h4 className="portfolio-title">{p.title}</h4>
                    <p className="portfolio-desc">{p.desc}</p>
                    <div className="portfolio-metrics">
                      {p.metrics.map((m) => <span key={m}>{m}</span>)}
                    </div>
                    <button className="btn-outline-sm" onClick={() => scrollToForm(s.id)}>
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
              { n: "01", title: "Choose a Service", desc: "Select the department that matches your hiring need." },
              { n: "02", title: "Fill the Form", desc: "Tell us about your requirements, timeline, and team size." },
              { n: "03", title: "Get Matched", desc: "We respond within 48 hours with curated candidate profiles." },
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
              <h2 className="section-title">Tell us what<br />you need</h2>
              <p className="section-sub">Our team will match you with the right professional and reach out within 48 hours.</p>
              <ul className="form-perks">
                {["Pre-vetted professionals only", "Response within 48 hours", "Flexible engagements available", "No upfront cost to enquire"].map((p) => (
                  <li key={p}>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "", domain: "", experience: "", availability: "", location: "", bio: "", linkedin: "" });
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
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow">Join {BRAND.name}</p>
          <h1 className="page-hero-title">Find your next<br /><em>opportunity</em></h1>
          <p className="page-hero-sub">Join our growing network of skilled professionals. We'll match your expertise to opportunities that fit your career goals.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="join-grid">
            <div className="join-info">
              <h3>Why join our talent network?</h3>
              <p>{BRAND.name} actively places professionals in roles that match their skills not just their job title.</p>
              <ul className="perk-list">
                {[
                  "Access to exclusive full-time and project-based opportunities",
                  "Matched by domain and expertise, not keyword filters",
                  "Dedicated talent manager for your placement journey",
                  "Free to join   we're compensated by hiring companies",
                  "Opportunities across Africa and international remote roles",
                ].map((p) => (
                  <li key={p}>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-card">
              {status === "success" ? (
                <div className="form-success">
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3>You're on the list!</h3>
                  <p>Our team will review your profile and reach out within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input required value={form.name} onChange={set("name")} placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Age *</label>
                    <input required type="number" min="18" max="70" value={form.age} onChange={set("age")} placeholder="28" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="john@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+27 000 000 000" />
                  </div>
                  <div className="form-group span-2">
                    <label>Primary Field *</label>
                    <select required value={form.domain} onChange={set("domain")}>
                      <option value="">Select your field…</option>
                      {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Years of Experience *</label>
                    <select required value={form.experience} onChange={set("experience")}>
                      <option value="">Select…</option>
                      <option>0–1 years</option>
                      <option>2–4 years</option>
                      <option>5–9 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Availability *</label>
                    <select required value={form.availability} onChange={set("availability")}>
                      <option value="">Select…</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract / Freelance</option>
                      <option>Open to all</option>
                    </select>
                  </div>
                  <div className="form-group span-2">
                    <label>Location *</label>
                    <input required value={form.location} onChange={set("location")} placeholder="City, Country" />
                  </div>
                  <div className="form-group span-2">
                    <label>LinkedIn / Portfolio URL</label>
                    <input type="url" value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                  <div className="form-group span-2">
                    <label>Brief Bio *</label>
                    <textarea required value={form.bio} onChange={set("bio")} placeholder="Tell us about your skills, experience, and what opportunities you're looking for…" rows={4} />
                  </div>
                  <div className="span-2">
                    <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
                      {status === "loading" ? "Submitting…" : <>Join the Talent Network <Icons.ArrowRight /></>}
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
        {/* Decorative background shapes */}
        <div className="faq-bg-shape faq-shape-1" />
        <div className="faq-bg-shape faq-shape-2" />
        <div className="faq-bg-shape faq-shape-3" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p className="eyebrow">Help Centre</p>
          <h1 className="page-hero-title">Frequently asked<br /><em>questions</em></h1>
          <p className="page-hero-sub">Answers for employers and job seekers navigating the {BRAND.name} platform.</p>
        </div>
      </div>

      <section className="section">
        <div className="container faq-container">
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
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
              <p>Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.</p>
              <form className="form-grid" onSubmit={(e) => { e.preventDefault(); alert("Sent! We'll be in touch."); }}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input required placeholder="Jane Smith" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input required type="email" placeholder="jane@email.com" />
                </div>
                <div className="form-group span-2">
                  <label>I am a…</label>
                  <select>
                    <option>Company / Employer</option>
                    <option>Job Seeker / Professional</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group span-2">
                  <label>Your Question *</label>
                  <textarea required placeholder="What would you like to know?" rows={3} />
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
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

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
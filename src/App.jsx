import { useState, useEffect, useRef } from "react";

// ── Font & Global Styles ──────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
    * { font-family: 'Barlow', sans-serif; box-sizing: border-box; }
    h1,h2,h3 { font-family: 'Barlow Condensed', sans-serif; }
    :root {
      --gold: #C8922A; --gold-light: #E5B04A;
      --charcoal: #1A1A1A; --slate: #2C2C2C; --mid: #3D3D3D;
      --border: #404040; --text-muted: #9A9A9A; --cream: #F5F0E8;
    }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--charcoal); }
    .gold-btn {
      background: linear-gradient(135deg, #C8922A, #E5B04A);
      color: #1A1A1A; font-weight: 700; letter-spacing: 0.05em; transition: all 0.2s;
      cursor: pointer; border: none;
    }
    .gold-btn:hover { opacity: 0.88; transform: translateY(-2px); }
    .outline-btn {
      border: 1.5px solid #C8922A; color: #C8922A;
      transition: all 0.2s; background: transparent; cursor: pointer;
    }
    .outline-btn:hover { background: #C8922A; color: #1A1A1A; }
    .card-hover { transition: all 0.25s; }
    .card-hover:hover { transform: translateY(-5px); border-color: #C8922A !important; box-shadow: 0 12px 40px rgba(200,146,42,0.15); }
    .section-line::before {
      content: ''; display: inline-block; width: 40px; height: 3px;
      background: #C8922A; margin-right: 12px; vertical-align: middle;
    }
    input, textarea {
      background: #2C2C2C !important; border: 1px solid #404040 !important;
      color: #F5F0E8 !important; border-radius: 4px; padding: 12px 16px;
      width: 100%; outline: none; transition: border-color 0.2s; font-family: 'Barlow', sans-serif;
    }
    input:focus, textarea:focus { border-color: #C8922A !important; }
    input::placeholder, textarea::placeholder { color: #9A9A9A; }
    .nav-link {
      position: relative; color: #9A9A9A; transition: color 0.2s;
      font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
      background: none; border: none; cursor: pointer;
    }
    .nav-link:hover, .nav-link.active { color: #C8922A; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 1.5px; background: #C8922A; transition: width 0.25s;
    }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .faq-item summary { list-style: none; cursor: pointer; }
    .faq-item summary::-webkit-details-marker { display: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .slide-in { animation: slideIn 0.7s ease forwards; }
    .star { color: #C8922A; }
    .hero-slide { position: absolute; inset: 0; transition: opacity 1.2s ease; }
    .whatsapp-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 1000;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #25D366, #128C7E);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 6px 24px rgba(37,211,102,0.45);
      cursor: pointer; transition: all 0.25s; border: none; text-decoration: none;
    }
    .whatsapp-float:hover { transform: scale(1.12) translateY(-3px); box-shadow: 0 10px 32px rgba(37,211,102,0.55); }
    .whatsapp-tooltip {
      position: absolute; right: 70px; top: 50%; transform: translateY(-50%);
      background: #111; color: #F5F0E8; font-size: 12px; font-weight: 600;
      padding: 6px 12px; border-radius: 6px; white-space: nowrap;
      opacity: 0; transition: opacity 0.2s; pointer-events: none;
      border: 1px solid var(--border);
    }
    .whatsapp-float:hover .whatsapp-tooltip { opacity: 1; }
    .img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 100%); }
    .process-line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: var(--border); z-index: 0; }
    @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    .social-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 42px; height: 42px; border-radius: 10px; transition: all 0.2s;
      border: 1px solid var(--border); cursor: pointer; text-decoration: none;
    }
    .social-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(200,146,42,0.25); }
    @keyframes shimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
    .testimonial-card { transition: all 0.3s; }
    .testimonial-card:hover { transform: translateY(-6px); }
    .why-us-card { transition: all 0.3s; position: relative; overflow: hidden; }
    .why-us-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: linear-gradient(90deg,#C8922A,#E5B04A); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
    .why-us-card:hover::before { transform: scaleX(1); }
    .team-card { transition: all 0.3s; overflow: hidden; }
    .team-card:hover .team-overlay { opacity: 1; }
    .team-overlay { position: absolute; inset: 0; background: rgba(200,146,42,0.88); opacity: 0; transition: opacity 0.3s; display: flex; align-items: center; justify-content: center; flex-direction: column; }
  `}</style>
);

// ── Unsplash Images ───────────────────────────────────────────────────────
const IMGS = {
  heroSlides: [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
  ],
  heroCaptions: [
    { tag: "Residential Excellence", heading: "Building Strong Foundations for the Future" },
    { tag: "Commercial Projects", heading: "Spaces That Drive Business Forward" },
    { tag: "Premium Interiors", heading: "Designed for Life. Built to Last." },
    { tag: "Modern Architecture", heading: "Where Vision Meets Craftsmanship" },
  ],
  about: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  aboutOffice: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80",
  team: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  ],
  services: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
  ],
  projects: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",
    "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=700&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80",
    "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=700&q=80",
  ],
  blog: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&q=80",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=700&q=80",
  ],
  testimonialsBg: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
  whyUsBg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
  teamBg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80",
  ctaBg: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1400&q=80",
  contactBg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  pricingBg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
  locationBg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
};

// ── Data ──────────────────────────────────────────────────────────────────
const data = {
  navbar: { logo: "BuildCore", links: ["Home","About","Services","Pricing","Projects","Why Us","Testimonials","Team","Blog","FAQ","Contact"] },
  home: {
    stats: [
      { value: "500+", label: "Projects Completed" },
      { value: "15+", label: "Years Experience" },
      { value: "200+", label: "Expert Engineers" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    features: [
      { icon: "⚙️", title: "Expert Engineers", description: "Highly skilled professionals delivering precision and quality in every single project." },
      { icon: "⏱️", title: "On-Time Delivery", description: "We ensure your projects are completed within deadlines, every time, without compromise." },
      { icon: "🧱", title: "Premium Materials", description: "Only top-grade ISI-certified materials for long-lasting durability and structural integrity." },
      { icon: "📐", title: "Modern Design", description: "Contemporary architectural designs tailored to your lifestyle, taste, and vision." },
      { icon: "🛡️", title: "Quality Assured", description: "Rigorous quality checks at every stage to exceed industry standards." },
      { icon: "💬", title: "Dedicated Support", description: "Project managers available at every step to keep you informed and at ease." },
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Free 30-min discovery call to understand your vision and requirements." },
      { step: "02", title: "Design & Quote", desc: "Detailed architectural design and transparent itemized quotation." },
      { step: "03", title: "Construction", desc: "Professional execution with weekly progress updates and site visits." },
      { step: "04", title: "Handover", desc: "Quality-verified final handover with warranty documentation." },
    ],
    testimonialsPreview: [
      { name: "Ravi Kumar", role: "Homeowner, Bangalore", feedback: "BuildCore delivered our dream home on time with outstanding quality. Absolutely professional team!", rating: 5 },
      { name: "Anita Reddy", role: "Property Developer", feedback: "Exceptional workmanship and attention to detail. They truly understand commercial construction.", rating: 5 },
      { name: "Suresh Nair", role: "Business Owner", feedback: "Our office was completed ahead of schedule. Complete transparency throughout the project.", rating: 5 },
    ],
  },
  about: {
    intro: "BuildCore Constructions is a leading construction company delivering reliable, innovative, and high-quality building solutions across India since 2009.",
    mission: "To deliver exceptional construction services with integrity, transparency, and uncompromising professionalism — transforming visions into enduring structures.",
    vision: "To become India's most trusted construction brand, setting new benchmarks in quality, sustainability, and design.",
    values: [
      "Integrity in every brick we lay",
      "Precision in every plan we execute",
      "Safety as our non-negotiable priority",
      "Innovation driving every project forward",
    ],
    team: [
      { name: "Arjun Mehta", role: "Founder & CEO", exp: "20+ years" },
      { name: "Priya Sharma", role: "Head of Projects", exp: "14 years" },
      { name: "Vikram Rao", role: "Chief Architect", exp: "18 years" },
      { name: "Deepa Iyer", role: "Interior Lead", exp: "12 years" },
    ],
    awards: ["Best Construction Company — Karnataka 2023", "ISO 9001:2015 Certified", "CREDAI Member", "Green Building Council Partner"],
  },
  services: [
    { icon: "🏠", title: "Residential Construction", description: "Custom homes built with precision engineering and modern design philosophy.", items: ["Villa Construction", "Luxury Apartments", "Row Houses", "Renovation & Remodeling"] },
    { icon: "🏢", title: "Commercial Construction", description: "Scalable, efficient commercial buildings that drive business performance.", items: ["Office Complexes", "Retail Spaces", "Warehouses", "IT Parks"] },
    { icon: "🎨", title: "Interior Design", description: "Functional, stunning interiors crafted to reflect your identity and lifestyle.", items: ["Modular Kitchens", "Office Interiors", "Space Planning", "False Ceilings"] },
    { icon: "🏗️", title: "Structural Engineering", description: "Expert structural analysis and engineering for safe, enduring foundations.", items: ["Soil Testing", "Foundation Design", "Structural Audits", "Retrofit Solutions"] },
    { icon: "🌿", title: "Green Construction", description: "Eco-conscious building practices that reduce your environmental footprint.", items: ["LEED Consulting", "Solar Integration", "Rainwater Harvesting", "Sustainable Materials"] },
    { icon: "📋", title: "Project Management", description: "End-to-end project management ensuring timelines, budget, and quality.", items: ["Site Supervision", "Contractor Coordination", "Progress Reporting", "Budget Tracking"] },
  ],
  pricing: [
    { plan: "Essential", price: "₹1,500", unit: "per sq ft", badge: null, features: ["Standard Grade Materials", "Basic Architectural Design", "Structural Engineering", "1 Year Warranty", "Monthly Progress Reports", "Site Manager Assigned"], cta: "Get Started" },
    { plan: "Premium", price: "₹2,500", unit: "per sq ft", badge: "Most Popular", features: ["High-Quality Materials", "Custom Architectural Design", "Interior Design Package", "5 Year Warranty", "Weekly Progress Reports", "Dedicated Project Manager", "3D Visualization"], cta: "Get Started" },
    { plan: "Luxury", price: "₹4,000", unit: "per sq ft", badge: null, features: ["Premium Imported Materials", "Bespoke Design & Architecture", "Full Interior Package", "10 Year Warranty", "Real-time Progress Dashboard", "Senior PM + Architect", "Smart Home Integration", "Landscape Design"], cta: "Get Started" },
  ],
  projects: [
    { title: "Whitefield Luxury Villas", type: "Residential", area: "4,200 sq ft", year: "2024", location: "Bangalore" },
    { title: "TechHub Office Complex", type: "Commercial", area: "28,000 sq ft", year: "2024", location: "Hyderabad" },
    { title: "Coastal Retreat", type: "Residential", area: "6,800 sq ft", year: "2023", location: "Goa" },
    { title: "Grand Retail Mall", type: "Commercial", area: "85,000 sq ft", year: "2023", location: "Chennai" },
    { title: "Skyline Apartments", type: "Residential", area: "12,500 sq ft", year: "2023", location: "Pune" },
    { title: "Corporate HQ — Infra Co.", type: "Commercial", area: "42,000 sq ft", year: "2022", location: "Mumbai" },
  ],
  testimonials: [
    { name: "Ravi Kumar", company: "Homeowner", location: "Bangalore", feedback: "BuildCore delivered our dream villa on time and within budget. The quality of construction and finishing exceeded every expectation. Professional, transparent, and genuinely caring team.", rating: 5, img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80" },
    { name: "Anita Reddy", company: "Real Estate Developer", location: "Hyderabad", feedback: "I've worked with many contractors, but BuildCore is on a different level. Exceptional quality control, proactive communication, and flawless execution on our 28,000 sq ft office project.", rating: 5, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80" },
    { name: "Suresh Nair", company: "Business Owner", location: "Chennai", feedback: "Our retail outlet was handed over ahead of schedule. The project manager kept us updated daily. Zero surprises — pure professionalism.", rating: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
    { name: "Meera Krishnan", company: "Homeowner", location: "Pune", feedback: "From design consultation to final handover, BuildCore was outstanding. Our home is more beautiful than we ever imagined. Worth every rupee.", rating: 5, img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80" },
    { name: "Rajesh Patel", company: "Hotel Developer", location: "Mumbai", feedback: "Built our boutique hotel on the Konkan coast. Impeccable attention to detail, premium finishes, and delivered 3 weeks early. Highly recommend BuildCore.", rating: 5, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" },
    { name: "Kavitha Iyer", company: "Software Executive", location: "Bangalore", feedback: "Their interior design team transformed our apartment into a masterpiece. Clean lines, smart storage, and a finish that rivals five-star hotels.", rating: 5, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" },
  ],
  whyUs: [
    { icon: "🏆", title: "Award-Winning Quality", desc: "Recognised as Karnataka's Best Construction Company 2023. ISO 9001:2015 certified processes ensure world-class quality at every stage.", stat: "10+ Awards" },
    { icon: "🔐", title: "No Hidden Costs", desc: "Our itemised quotes are 100% transparent. Every rupee is accounted for. Scope changes require written approval — no surprises, ever.", stat: "Zero Surprises" },
    { icon: "⏰", title: "On-Time Guarantee", desc: "98% of our projects are delivered on schedule. We use agile project management tools and weekly milestone tracking to stay on target.", stat: "98% On-Time" },
    { icon: "🌱", title: "Eco-Friendly Builds", desc: "We integrate sustainable materials, rainwater harvesting, and solar solutions into our projects — reducing carbon footprint without extra cost.", stat: "LEED Certified" },
    { icon: "📱", title: "Real-Time Updates", desc: "Get live project dashboards, weekly photo updates, and a dedicated project manager on call — you're never in the dark.", stat: "24/7 Access" },
    { icon: "🛡️", title: "Up to 10-Year Warranty", desc: "Our Luxury plan includes a 10-year comprehensive structural warranty — the longest in the industry. Because we build to outlast.", stat: "10-Year Cover" },
    { icon: "🤝", title: "Trusted by 500+ Families", desc: "From first-time homeowners to seasoned developers — our client list spans all budgets and building types across India.", stat: "500+ Projects" },
    { icon: "🧠", title: "In-House Design Team", desc: "Architecture, interiors, landscaping, and 3D visualisation — all under one roof. No third-party design agencies, no miscommunication.", stat: "Full-Stack Team" },
  ],
  team: [
    { name: "Arjun Mehta", role: "Founder & CEO", exp: "20+ years", bio: "Civil engineering graduate from IIT Bombay. Founded BuildCore in 2009 with a vision to redefine construction quality in India.", linkedin: "#" },
    { name: "Priya Sharma", role: "Head of Projects", exp: "14 years", bio: "Expert in large-scale commercial project delivery. Manages a portfolio of ₹500Cr+ in construction projects across South India.", linkedin: "#" },
    { name: "Vikram Rao", role: "Chief Architect", exp: "18 years", bio: "Award-winning architect with projects across 12 Indian cities. Specialises in biophilic design and sustainable architecture.", linkedin: "#" },
    { name: "Deepa Iyer", role: "Interior Design Lead", exp: "12 years", bio: "Former lead designer at one of Mumbai's top interior firms. Brings luxury aesthetics to every living space she touches.", linkedin: "#" },
    { name: "Rahul Menon", role: "Structural Engineer", exp: "15 years", bio: "Certified structural expert with expertise in earthquake-resistant design, having led projects in seismic zones III and IV.", linkedin: "#" },
    { name: "Sunita Kapoor", role: "Client Relations Head", exp: "10 years", bio: "Ensures every client has a stress-free journey from consultation to final handover. Personally oversees all client communications.", linkedin: "#" },
  ],
  blog: [
    { title: "Top 10 Modern House Design Trends in India 2026", summary: "From biophilic design to smart home integration — explore the trends reshaping Indian homes this year.", category: "Design", date: "Apr 10, 2026", read: "5 min read" },
    { title: "How to Choose the Right Construction Contractor", summary: "Key questions to ask, red flags to watch, and expert tips to ensure you hire the right team.", category: "Guide", date: "Mar 28, 2026", read: "7 min read" },
    { title: "Understanding Construction Costs in India", summary: "A complete breakdown of what drives construction costs and how to budget smartly for residential projects.", category: "Finance", date: "Mar 15, 2026", read: "6 min read" },
    { title: "Green Building: The Future of Indian Construction", summary: "Why sustainable construction is no longer optional — and how eco-friendly choices benefit both planet and wallet.", category: "Sustainability", date: "Mar 2, 2026", read: "4 min read" },
  ],
  faq: [
    { question: "How long does residential construction typically take?", answer: "Project timelines vary based on size and complexity. A standard villa typically takes 10–14 months, while apartments or larger projects may take 18–24 months. We provide a detailed project timeline before work begins." },
    { question: "Do you provide architectural and interior design services?", answer: "Yes, we offer complete design-build solutions — from concept architecture and 3D visualization to interior design, furnishing guidance, and landscaping." },
    { question: "What materials do you use? Can I choose my own?", answer: "We use premium, ISI-certified materials across all plans. Clients on Premium and Luxury plans can co-select materials and finishes. We're happy to accommodate specific brand preferences." },
    { question: "Is there a warranty on construction?", answer: "Yes. Essential plan includes a 1-year structural warranty, Premium offers 5 years, and Luxury comes with a 10-year comprehensive warranty covering structure, waterproofing, and electrical." },
    { question: "How do you handle cost overruns?", answer: "We provide a detailed, itemized quote before starting. Any scope changes are discussed transparently with written approval before execution. No surprise costs — ever." },
    { question: "Do you handle government approvals and permits?", answer: "Absolutely. Our team manages all BBMP / BDA approvals, building plan sanctions, occupancy certificates, and other regulatory requirements on your behalf." },
  ],
  contact: {
    email: "info@buildcore.in",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    address: "12, Brigade Road, Bangalore — 560001, Karnataka",
    mapAddress: "Brigade Road, Bangalore, Karnataka 560001",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    instagram: "https://www.instagram.com/buildcore.in",
    facebook: "https://www.facebook.com/buildcore.in",
    linkedin: "https://www.linkedin.com/company/buildcore",
    youtube: "https://www.youtube.com/@buildcore",
    lat: 12.9716,
    lng: 77.5946,
  },
  footer: {
    text: "© 2026 BuildCore Constructions Pvt. Ltd. All rights reserved.",
    links: ["Privacy Policy", "Terms of Service", "Support"],
    tagline: "Built on Trust. Delivered with Pride.",
  },
};

// ── Shared UI ──────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <p className="section-line text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
    {children}
  </p>
);
const SectionHeading = ({ children, center = false }) => (
  <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${center ? "text-center" : ""}`}
    style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>
    {children}
  </h2>
);
const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">{[...Array(count)].map((_, i) => <span key={i} className="star">★</span>)}</div>
);

// ── Social Icons ───────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);
const WhatsAppIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.863L2 30l7.343-1.76A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.35 18.912c-.347-.174-2.057-1.015-2.376-1.13-.32-.117-.553-.174-.786.174-.233.348-.903 1.13-1.107 1.363-.204.232-.407.26-.754.087-.347-.174-1.465-.54-2.79-1.72-1.03-.918-1.726-2.052-1.93-2.4-.203-.347-.022-.534.153-.707.157-.155.347-.405.52-.607.175-.203.233-.348.349-.58.116-.233.058-.437-.03-.61-.087-.174-.786-1.893-1.077-2.594-.284-.681-.572-.588-.786-.599l-.668-.012c-.233 0-.61.087-.93.435-.32.347-1.223 1.194-1.223 2.913s1.252 3.38 1.427 3.613c.174.232 2.464 3.763 5.97 5.277.834.36 1.485.575 1.993.736.837.267 1.6.23 2.202.14.672-.101 2.057-.842 2.348-1.655.29-.813.29-1.51.203-1.656-.086-.145-.32-.232-.668-.406z"/>
  </svg>
);

// ── Social Buttons Component ───────────────────────────────────────────────
const SocialButtons = ({ size = "md" }) => {
  const s = size === "lg" ? 52 : 42;
  return (
    <div className="flex gap-3 flex-wrap">
      <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer"
        className="social-btn" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "#fff", width: s, height: s }}>
        <InstagramIcon />
      </a>
      <a href={data.contact.facebook} target="_blank" rel="noopener noreferrer"
        className="social-btn" style={{ background: "#1877F2", color: "#fff", width: s, height: s }}>
        <FacebookIcon />
      </a>
      <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer"
        className="social-btn" style={{ background: "#0A66C2", color: "#fff", width: s, height: s }}>
        <LinkedInIcon />
      </a>
      <a href={data.contact.youtube} target="_blank" rel="noopener noreferrer"
        className="social-btn" style={{ background: "#FF0000", color: "#fff", width: s, height: s }}>
        <YouTubeIcon />
      </a>
    </div>
  );
};

// ── WhatsApp Float ─────────────────────────────────────────────────────────
const WhatsAppFloat = () => (
  <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'm%20interested%20in%20a%20construction%20quote.`}
    target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
    <div className="whatsapp-tooltip">Chat with us!</div>
    <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.863L2 30l7.343-1.76A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.57 11.57 0 01-5.9-1.615l-.42-.25-4.358 1.045 1.07-4.245-.275-.437A11.573 11.573 0 014.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.35-8.688c-.347-.174-2.057-1.015-2.376-1.13-.32-.117-.553-.174-.786.174-.233.348-.903 1.13-1.107 1.363-.204.232-.407.26-.754.087-.347-.174-1.465-.54-2.79-1.72-1.03-.918-1.726-2.052-1.93-2.4-.203-.347-.022-.534.153-.707.157-.155.347-.405.52-.607.175-.203.233-.348.349-.58.116-.233.058-.437-.03-.61-.087-.174-.786-1.893-1.077-2.594-.284-.681-.572-.588-.786-.599l-.668-.012c-.233 0-.61.087-.93.435-.32.347-1.223 1.194-1.223 2.913s1.252 3.38 1.427 3.613c.174.232 2.464 3.763 5.97 5.277.834.36 1.485.575 1.993.736.837.267 1.6.23 2.202.14.672-.101 2.057-.842 2.348-1.655.29-.813.29-1.51.203-1.656-.086-.145-.32-.232-.668-.406z"/>
    </svg>
  </a>
);

// ── Navbar ─────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage, scrolled }) => {
  const [open, setOpen] = useState(false);
  const mainLinks = ["Home","About","Services","Pricing","Projects","Blog","FAQ","Contact"];
  const extraLinks = ["Why Us","Testimonials","Team"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(20,20,20,0.98)" : "rgba(0,0,0,0.3)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <span className="text-2xl font-bold tracking-wider" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>
            BUILD<span style={{ color: "var(--cream)" }}>CORE</span>
          </span>
        </button>
        <div className="hidden lg:flex items-center gap-5">
          {mainLinks.map(l => (
            <button key={l} onClick={() => setPage(l)} className={`nav-link ${page === l ? "active" : ""}`}>{l}</button>
          ))}
          {/* Dropdown for extra pages */}
          <div style={{ position: "relative" }} className="group">
            <button className={`nav-link ${extraLinks.includes(page) ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: 4 }}>
              More ▾
            </button>
            <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "#1a1a1a", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 0", minWidth: 150, boxShadow: "0 12px 40px rgba(0,0,0,0.5)", opacity: 0, pointerEvents: "none", transition: "opacity 0.2s", zIndex: 200 }}
              onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.pointerEvents = "all"; }}
              onMouseOut={e => { e.currentTarget.style.opacity = 0; e.currentTarget.style.pointerEvents = "none"; }}
              className="dropdown-menu">
              {extraLinks.map(l => (
                <button key={l} onClick={() => setPage(l)}
                  className="w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: page === l ? "var(--gold)" : "var(--text-muted)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "var(--gold)"}
                  onMouseOut={e => e.currentTarget.style.color = page === l ? "var(--gold)" : "var(--text-muted)"}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20a%20free%20quote.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none", transition: "all 0.2s" }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}>
            <WhatsAppIcon size={14} />
            WhatsApp
          </a>
          <button onClick={() => setPage("Contact")} className="gold-btn px-5 py-2 text-xs rounded font-bold tracking-wider uppercase">
            Get Quote
          </button>
        </div>
        <button className="lg:hidden text-2xl" style={{ color: "var(--cream)", background: "none", border: "none", cursor: "pointer" }} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t px-6 py-5 flex flex-col gap-4"
          style={{ background: "var(--charcoal)", borderColor: "var(--border)" }}>
          {data.navbar.links.map(l => (
            <button key={l} onClick={() => { setPage(l); setOpen(false); }}
              className={`nav-link text-left ${page === l ? "active" : ""}`}>{l}</button>
          ))}
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="text-left text-sm font-bold" style={{ color: "#25D366", textDecoration: "none" }}>
            💬 WhatsApp Us
          </a>
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Follow Us</p>
            <SocialButtons />
          </div>
        </div>
      )}
    </nav>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer className="border-t" style={{ background: "#0D0D0D", borderColor: "var(--border)" }}>
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <p className="text-3xl font-bold mb-2" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>
          BUILD<span style={{ color: "var(--cream)" }}>CORE</span>
        </p>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>{data.footer.tagline}</p>
        <div className="space-y-2 mb-6">
          <a href={`https://maps.google.com/?q=${encodeURIComponent(data.contact.mapAddress)}`} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseOver={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseOut={e => e.currentTarget.style.color = "var(--text-muted)"}>
            📍 {data.contact.address}
          </a>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>📞 {data.contact.phone}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>✉ {data.contact.email}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>🕐 {data.contact.hours}</p>
        </div>
        <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
          style={{ background: "#25D36622", color: "#25D366", border: "1px solid #25D36644", textDecoration: "none" }}>
          <WhatsAppIcon size={14} />
          Chat on WhatsApp
        </a>
        <div>
          <p className="font-bold text-xs mb-3 uppercase tracking-widest" style={{ color: "var(--cream)" }}>Follow Us</p>
          <SocialButtons />
        </div>
      </div>
      <div>
        <p className="font-bold text-xs mb-5 uppercase tracking-widest" style={{ color: "var(--cream)" }}>Pages</p>
        <div className="flex flex-col gap-3">
          {data.navbar.links.map(l => (
            <button key={l} onClick={() => setPage(l)} className="text-sm text-left" style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseOut={e => e.currentTarget.style.color = "var(--text-muted)"}>{l}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-xs mb-5 uppercase tracking-widest" style={{ color: "var(--cream)" }}>Legal</p>
        <div className="flex flex-col gap-3 mb-8">
          {data.footer.links.map(l => (
            <span key={l} className="text-sm cursor-pointer" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseOut={e => e.currentTarget.style.color = "var(--text-muted)"}>{l}</span>
          ))}
        </div>
        <div className="p-4 rounded-xl border text-center" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>Our Location</p>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(data.contact.mapAddress)}`} target="_blank" rel="noopener noreferrer"
            className="text-xs block mb-3" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Brigade Road, Bangalore 560001
          </a>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(data.contact.mapAddress)}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-bold"
            style={{ background: "var(--gold)", color: "#1A1A1A", textDecoration: "none" }}>
            📍 Open in Maps
          </a>
        </div>
      </div>
    </div>
    <div className="border-t py-4 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
      {data.footer.text}
    </div>
  </footer>
);

// ── Home Page ──────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const [slide, setSlide] = useState(0);
  const total = IMGS.heroSlides.length;

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <div>
      {/* Hero Slideshow */}
      <section className="relative" style={{ height: "100vh", minHeight: 600, overflow: "hidden" }}>
        {IMGS.heroSlides.map((img, i) => (
          <div key={i} className="hero-slide" style={{ opacity: i === slide ? 1 : 0 }}>
            <img src={img} alt={`slide-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div className="img-overlay" />
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 flex gap-2" style={{ transform: "translateX(-50%)", zIndex: 10 }}>
          {IMGS.heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              style={{ width: i === slide ? 32 : 10, height: 10, borderRadius: 5, background: i === slide ? "var(--gold)" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.4s" }} />
          ))}
        </div>
        <button onClick={() => setSlide(s => (s - 1 + total) % total)}
          style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(200,146,42,0.2)", border: "1px solid var(--gold)", color: "var(--gold)", width: 44, height: 44, borderRadius: "50%", fontSize: 18, cursor: "pointer", backdropFilter: "blur(6px)" }}>‹</button>
        <button onClick={() => setSlide(s => (s + 1) % total)}
          style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(200,146,42,0.2)", border: "1px solid var(--gold)", color: "var(--gold)", width: 44, height: 44, borderRadius: "50%", fontSize: 18, cursor: "pointer", backdropFilter: "blur(6px)" }}>›</button>
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 5 }}>
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div style={{ maxWidth: 680 }}>
              <div key={slide} className="slide-in">
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: 48, height: 2, background: "var(--gold)" }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                    {IMGS.heroCaptions[slide].tag} · Est. 2009
                  </span>
                </div>
                <h1 className="font-bold leading-tight mb-6"
                  style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}>
                  {IMGS.heroCaptions[slide].heading}
                </h1>
              </div>
              <p className="fade-up text-lg leading-relaxed mb-10" style={{ color: "rgba(245,240,232,0.8)", maxWidth: 520, animationDelay: "0.2s", opacity: 0 }}>
                Trusted construction services for residential and commercial projects across India. We build with precision, pride, and purpose.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setPage("Contact")} className="gold-btn px-8 py-4 rounded text-sm font-bold tracking-wider uppercase">
                  Get Free Quote
                </button>
                <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20a%20free%20quote.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded text-sm font-bold tracking-wider uppercase"
                  style={{ background: "#25D36622", border: "1.5px solid #25D366", color: "#25D366", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "#25D36622"; e.currentTarget.style.color = "#25D366"; }}>
                  <WhatsAppIcon size={16} />
                  WhatsApp Us
                </a>
                <button onClick={() => setPage("Projects")} className="outline-btn px-8 py-4 rounded text-sm font-semibold tracking-wider uppercase">
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ background: "linear-gradient(90deg, #C8922A, #A0701C)" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.home.stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-bold text-3xl" style={{ color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</p>
              <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "rgba(26,26,26,0.7)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-24" style={{ background: "var(--charcoal)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Why BuildCore</SectionLabel>
            <SectionHeading center>Built Different. Built Better.</SectionHeading>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Every project we undertake is a commitment — to quality, to deadlines, and to the people who trust us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.home.features.map((f, i) => (
              <div key={i} className="card-hover p-8 rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage("Why Us")} className="outline-btn px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase">
              Explore Why Choose Us →
            </button>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24" style={{ background: "#111" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Our Process</SectionLabel>
            <SectionHeading center>How We Work</SectionHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.home.process.map((p, i) => (
              <div key={i} className="card-hover text-center p-8 rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
                <p className="text-5xl font-bold mb-4" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", opacity: 0.3 }}>{p.step}</p>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24" style={{ background: "var(--charcoal)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Client Stories</SectionLabel>
            <SectionHeading center>Trusted by Hundreds Across India</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.home.testimonialsPreview.map((t, i) => (
              <div key={i} className="card-hover p-8 rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
                <Stars />
                <p className="text-sm leading-relaxed my-4" style={{ color: "var(--text-muted)" }}>"{t.feedback}"</p>
                <p className="font-semibold text-sm" style={{ color: "var(--cream)" }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>{t.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage("Testimonials")} className="outline-btn px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase">
              Read All Reviews →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-28 overflow-hidden">
        <img src={IMGS.ctaBg} alt="cta" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(200,146,42,0.88)" }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
          <h2 className="font-bold mb-4" style={{ color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Ready to Build Your Dream?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(26,26,26,0.8)" }}>
            Get a free consultation and detailed quote within 48 hours. No obligations, just honest advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("Contact")} className="px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
              style={{ background: "#1A1A1A", color: "#C8922A" }}>
              Get Free Quote
            </button>
            <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi!%20I'd%20like%20a%20free%20quote.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
              style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
              <WhatsAppIcon size={16} />
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-16" style={{ background: "#111" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <SectionLabel>Stay Connected</SectionLabel>
            <h2 className="text-3xl font-bold" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Follow Our Journey
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Get inspiration, project updates & behind-the-scenes content.</p>
          </div>
          <SocialButtons size="lg" />
        </div>
      </section>
    </div>
  );
};

// ── About Page ─────────────────────────────────────────────────────────────
const AboutPage = ({ setPage }) => (
  <div className="pt-16">
    <section className="relative py-32" style={{ overflow: "hidden" }}>
      <img src={IMGS.about} alt="about" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.72)" }} />
      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 2 }}>
        <SectionLabel>About BuildCore</SectionLabel>
        <h1 className="font-bold mb-4" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", maxWidth: 700 }}>
          15 Years of Building India's Best
        </h1>
        <p className="text-lg" style={{ color: "rgba(245,240,232,0.75)", maxWidth: 560 }}>{data.about.intro}</p>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="border-l-4 pl-6 mb-8" style={{ borderColor: "var(--gold)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>Our Mission</p>
            <p className="text-xl" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{data.about.mission}</p>
          </div>
          <div className="border-l-4 pl-6 mb-8" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>Our Vision</p>
            <p className="text-xl" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{data.about.vision}</p>
          </div>
          <div className="space-y-3">
            {data.about.values.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
                <span style={{ color: "var(--gold)", fontSize: 18 }}>▸</span>
                <span className="text-sm" style={{ color: "var(--cream)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={IMGS.aboutOffice} alt="office" className="rounded-xl w-full" style={{ objectFit: "cover", height: 420 }} />
          <div className="absolute bottom-6 left-6 p-5 rounded-lg" style={{ background: "rgba(26,26,26,0.92)", backdropFilter: "blur(12px)", border: "1px solid var(--border)" }}>
            <div className="flex gap-6">
              <div className="text-center"><p className="text-3xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>500+</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Projects</p></div>
              <div className="text-center"><p className="text-3xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>15+</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Years</p></div>
              <div className="text-center"><p className="text-3xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>98%</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Satisfaction</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-16" style={{ background: "#111" }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-6 text-center" style={{ color: "var(--gold)" }}>Recognition & Certifications</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.about.awards.map((a, i) => (
            <div key={i} className="p-4 rounded-lg border text-center text-sm" style={{ background: "var(--slate)", borderColor: "var(--border)", color: "var(--cream)" }}>
              🏆 {a}
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel>Meet the Team</SectionLabel>
        <SectionHeading center>The People Behind BuildCore</SectionHeading>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button onClick={() => setPage("Team")} className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
            View Full Team →
          </button>
        </div>
      </div>
    </section>
  </div>
);

// ── Services Page ──────────────────────────────────────────────────────────
const ServicesPage = ({ setPage }) => (
  <div className="pt-16">
    <section className="relative py-28" style={{ overflow: "hidden" }}>
      <img src={IMGS.services[0]} alt="services" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>What We Do</SectionLabel>
        <SectionHeading center>End-to-End Construction Services</SectionHeading>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>
          From groundbreaking to final handover, BuildCore covers every aspect of your construction journey.
        </p>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.services.map((s, i) => (
          <div key={i} className="card-hover rounded-xl border overflow-hidden" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
            <div style={{ position: "relative", height: 180 }}>
              <img src={IMGS.services[i]} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
              <span style={{ position: "absolute", bottom: 12, left: 16, fontSize: 28 }}>{s.icon}</span>
            </div>
            <div className="p-7">
              <h3 className="font-bold text-xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{s.description}</p>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="text-sm flex items-center gap-2" style={{ color: "var(--cream)" }}>
                    <span style={{ color: "var(--gold)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="relative py-20 overflow-hidden">
      <img src={IMGS.ctaBg} alt="cta" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(200,146,42,0.9)" }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <h2 className="font-bold text-3xl mb-4" style={{ color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif" }}>Not Sure Which Service You Need?</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(26,26,26,0.8)" }}>Book a free 30-minute consultation. Our experts guide you.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setPage("Contact")} className="px-8 py-3 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "#1A1A1A", color: "#C8922A" }}>Book Consultation</button>
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppIcon size={14} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  </div>
);

// ── Pricing Page ───────────────────────────────────────────────────────────
const PricingPage = ({ setPage }) => (
  <div className="pt-16">
    <section className="relative py-28 overflow-hidden">
      <img src={IMGS.pricingBg} alt="pricing" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Pricing Plans</SectionLabel>
        <SectionHeading center>Transparent. Flexible. Fair.</SectionHeading>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>
          All plans include a dedicated project manager, structural engineering, and milestone-based payment structure.
        </p>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {data.pricing.map((p, i) => (
          <div key={i} className={`card-hover rounded-xl border relative ${p.badge ? "" : ""}`}
            style={{ background: p.badge ? "var(--mid)" : "var(--slate)", borderColor: p.badge ? "var(--gold)" : "var(--border)", padding: "2rem" }}>
            {p.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "var(--gold)", color: "#1A1A1A" }}>{p.badge}</span>
            )}
            <p className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>{p.plan}</p>
            <p className="font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "3rem", lineHeight: 1 }}>{p.price}</p>
            <p className="text-xs mb-8 mt-1" style={{ color: "var(--text-muted)" }}>{p.unit}</p>
            <ul className="space-y-3 mb-8">
              {p.features.map((f, j) => (
                <li key={j} className="text-sm flex items-start gap-3" style={{ color: "var(--cream)" }}>
                  <span style={{ color: "var(--gold)", marginTop: 2 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={() => setPage("Contact")} className={p.badge ? "gold-btn w-full py-3 rounded text-sm font-bold tracking-wider uppercase" : "outline-btn w-full py-3 rounded text-sm font-bold tracking-wider uppercase"}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
      <p className="text-center text-xs mt-8" style={{ color: "var(--text-muted)" }}>
        * All prices are indicative. Final quotes depend on site conditions, design complexity, and material choices.
      </p>
    </section>
  </div>
);

// ── Projects Page ──────────────────────────────────────────────────────────
const ProjectsPage = () => (
  <div className="pt-16">
    <section className="relative py-28 overflow-hidden">
      <img src={IMGS.projects[0]} alt="projects" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Our Work</SectionLabel>
        <SectionHeading center>Projects That Define Excellence</SectionHeading>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((p, i) => (
          <div key={i} className="card-hover rounded-xl border overflow-hidden" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
            <div style={{ position: "relative", height: 220 }}>
              <img src={IMGS.projects[i]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span className="text-xs px-3 py-1 rounded-full font-bold"
                  style={{ background: p.type === "Residential" ? "rgba(200,146,42,0.9)" : "rgba(44,44,44,0.95)", color: p.type === "Residential" ? "#1A1A1A" : "var(--gold)", border: p.type !== "Residential" ? "1px solid var(--gold)" : "none" }}>
                  {p.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.title}</h3>
              <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>📍 {p.location}</span>
                <span>📐 {p.area}</span>
                <span>📅 {p.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ── WHY US Page ────────────────────────────────────────────────────────────
const WhyUsPage = ({ setPage }) => (
  <div className="pt-16">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <img src={IMGS.whyUsBg} alt="why us" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 2 }}>
        <SectionLabel>Why Choose BuildCore</SectionLabel>
        <h1 className="font-bold mb-6" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", maxWidth: 700 }}>
          The Reasons 500+ Clients Trust Us With Their Dream Projects
        </h1>
        <p className="text-lg mb-8" style={{ color: "rgba(245,240,232,0.8)", maxWidth: 580 }}>
          From award-winning quality to zero hidden costs — here's what makes BuildCore the most trusted construction brand in South India.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setPage("Contact")} className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
            Get Free Consultation
          </button>
          <button onClick={() => setPage("Projects")} className="outline-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
            See Our Work
          </button>
        </div>
      </div>
    </section>

    {/* Big Stats */}
    <div style={{ background: "linear-gradient(135deg, #C8922A, #A0701C)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { n: "500+", l: "Projects Delivered" },
          { n: "98%", l: "Client Satisfaction" },
          { n: "10+", l: "Industry Awards" },
          { n: "₹0", l: "Hidden Charges" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="font-bold text-4xl" style={{ color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif" }}>{s.n}</p>
            <p className="text-xs uppercase tracking-wider font-semibold mt-1" style={{ color: "rgba(26,26,26,0.75)" }}>{s.l}</p>
          </div>
        ))}
      </div>
    </div>

    {/* 8 Reasons Cards */}
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>8 Reasons to Choose Us</SectionLabel>
          <SectionHeading center>Built on More Than Just Concrete</SectionHeading>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            These aren't marketing claims — they're commitments we've kept on 500+ projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.whyUs.map((w, i) => (
            <div key={i} className="why-us-card rounded-xl border p-7" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{w.icon}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(200,146,42,0.15)", color: "var(--gold)", border: "1px solid rgba(200,146,42,0.3)" }}>{w.stat}</span>
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{w.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Comparison Table */}
    <section className="py-24" style={{ background: "#111" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>How We Compare</SectionLabel>
          <SectionHeading center>BuildCore vs. Typical Contractors</SectionHeading>
        </div>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-3 p-4 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--mid)", color: "var(--text-muted)" }}>
            <span>Feature</span>
            <span className="text-center" style={{ color: "var(--gold)" }}>BuildCore</span>
            <span className="text-center">Typical Contractor</span>
          </div>
          {[
            ["Transparent Pricing", "✓ Full itemised quote", "✗ Vague estimates"],
            ["Dedicated PM", "✓ Senior PM assigned", "✗ Often outsourced"],
            ["Warranty", "✓ Up to 10 years", "✗ 1 year or none"],
            ["Progress Updates", "✓ Weekly + dashboard", "✗ Monthly or none"],
            ["Design In-House", "✓ Architecture + interiors", "✗ Third-party agency"],
            ["Permits Handled", "✓ Full compliance team", "✗ You manage it"],
          ].map(([feat, us, them], i) => (
            <div key={i} className="grid grid-cols-3 p-5 border-t items-center" style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "var(--slate)" : "var(--charcoal)" }}>
              <span className="text-sm font-semibold" style={{ color: "var(--cream)" }}>{feat}</span>
              <span className="text-sm text-center" style={{ color: "#4ade80" }}>{us}</span>
              <span className="text-sm text-center" style={{ color: "var(--text-muted)" }}>{them}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-24 overflow-hidden">
      <img src={IMGS.ctaBg} alt="cta" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(200,146,42,0.9)" }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <h2 className="font-bold text-4xl mb-4" style={{ color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif" }}>Convinced? Let's Talk.</h2>
        <p className="text-sm mb-8" style={{ color: "rgba(26,26,26,0.8)" }}>Free consultation. No commitments. Just good advice from experts who care.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setPage("Contact")} className="px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "#1A1A1A", color: "#C8922A" }}>Book Free Consultation</button>
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppIcon size={16} /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  </div>
);

// ── TESTIMONIALS Page ──────────────────────────────────────────────────────
const TestimonialsPage = ({ setPage }) => (
  <div className="pt-16">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <img src={IMGS.testimonialsBg} alt="testimonials" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Client Testimonials</SectionLabel>
        <h1 className="font-bold mb-6" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)" }}>
          Stories From Those Who Trusted Us
        </h1>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="text-center"><p className="text-4xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>500+</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Happy Clients</p></div>
          <div className="text-center"><p className="text-4xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>4.9/5</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Average Rating</p></div>
          <div className="text-center"><p className="text-4xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>98%</p><p className="text-sm" style={{ color: "var(--text-muted)" }}>Would Recommend</p></div>
        </div>
      </div>
    </section>

    {/* Featured Testimonials */}
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>What Clients Say</SectionLabel>
          <SectionHeading center>Real Words from Real People</SectionHeading>
        </div>

        {/* Large Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {data.testimonials.slice(0, 2).map((t, i) => (
            <div key={i} className="testimonial-card rounded-2xl border p-8" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
              <Stars />
              <p className="text-lg leading-relaxed my-6" style={{ color: "var(--cream)" }}>"{t.feedback}"</p>
              <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <img src={t.img} alt={t.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }} />
                <div>
                  <p className="font-bold" style={{ color: "var(--cream)" }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>{t.company} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.testimonials.slice(2).map((t, i) => (
            <div key={i} className="testimonial-card rounded-xl border p-6" style={{ background: "var(--mid)", borderColor: "var(--border)" }}>
              <Stars />
              <p className="text-sm leading-relaxed my-4" style={{ color: "var(--text-muted)" }}>"{t.feedback}"</p>
              <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                <img src={t.img} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--cream)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--gold)" }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Rating Bar */}
    <section className="py-16" style={{ background: "#111" }}>
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-center font-bold text-xs uppercase tracking-widest mb-10" style={{ color: "var(--gold)" }}>Rating Breakdown</p>
        {[["5 Stars", 92], ["4 Stars", 6], ["3 Stars", 2]].map(([label, pct], i) => (
          <div key={i} className="flex items-center gap-4 mb-4">
            <span className="text-sm w-16 text-right" style={{ color: "var(--cream)" }}>{label}</span>
            <div className="flex-1 rounded-full h-3" style={{ background: "var(--border)" }}>
              <div className="h-3 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#C8922A,#E5B04A)", transition: "width 1s" }} />
            </div>
            <span className="text-sm w-10" style={{ color: "var(--text-muted)" }}>{pct}%</span>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 text-center" style={{ background: "var(--charcoal)" }}>
      <SectionLabel>Join Our Clients</SectionLabel>
      <h2 className="font-bold text-4xl mb-4" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Start Your BuildCore Story</h2>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>Free consultation · No obligations · Expert advice</p>
      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={() => setPage("Contact")} className="gold-btn px-10 py-4 rounded text-sm font-bold tracking-wider uppercase">Get Free Quote</button>
        <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
          style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
          <WhatsAppIcon size={16} /> WhatsApp Us
        </a>
      </div>
    </section>
  </div>
);

// ── TEAM Page ──────────────────────────────────────────────────────────────
const TeamPage = ({ setPage }) => (
  <div className="pt-16">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <img src={IMGS.teamBg} alt="team" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 2 }}>
        <SectionLabel>The BuildCore Team</SectionLabel>
        <h1 className="font-bold mb-4" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", maxWidth: 700 }}>
          The Experts Behind Every Brick
        </h1>
        <p className="text-lg" style={{ color: "rgba(245,240,232,0.8)", maxWidth: 560 }}>
          Our team of 200+ engineers, architects, designers, and project managers bring decades of combined expertise to every project we take on.
        </p>
      </div>
    </section>

    {/* Team Stats */}
    <div style={{ background: "linear-gradient(90deg, var(--charcoal), #111)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { v: "200+", l: "Team Members" },
          { v: "15+", l: "Avg. Experience" },
          { v: "12", l: "Departments" },
          { v: "100%", l: "In-House Talent" },
        ].map((s, i) => (
          <div key={i} className="text-center p-4 rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
            <p className="text-3xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>{s.v}</p>
            <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>{s.l}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Leadership Team Cards */}
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Leadership</SectionLabel>
          <SectionHeading center>Meet the Minds Behind BuildCore</SectionHeading>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Seasoned professionals who've collectively led over ₹2,000 crore in construction projects.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.team.map((m, i) => (
            <div key={i} className="team-card rounded-2xl border overflow-hidden" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
              <div style={{ position: "relative", height: 280 }}>
                <img src={IMGS.team[i]} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                <div className="team-overlay">
                  <p className="font-bold text-xl mb-2" style={{ color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif" }}>{m.name}</p>
                  <p className="text-sm font-bold mb-4" style={{ color: "#1A1A1A" }}>{m.role}</p>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold"
                    style={{ background: "#1A1A1A", color: "#C8922A", textDecoration: "none" }}>
                    <LinkedInIcon /> View LinkedIn
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{m.name}</p>
                    <p className="text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--gold)" }}>{m.role}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: "rgba(200,146,42,0.15)", color: "var(--gold)", border: "1px solid rgba(200,146,42,0.3)", whiteSpace: "nowrap" }}>{m.exp}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Join Our Team */}
    <section className="py-20" style={{ background: "#111" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionLabel>Careers</SectionLabel>
        <h2 className="font-bold text-4xl mb-4" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>
          Want to Build with Us?
        </h2>
        <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
          We're always looking for talented engineers, architects, and designers who share our passion for building excellence. Join a team that values craftsmanship, integrity, and growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "💼", title: "Competitive Pay", desc: "Above-market salaries and annual increments" },
            { icon: "📈", title: "Growth Path", desc: "Clear career ladder with mentorship programs" },
            { icon: "🏥", title: "Full Benefits", desc: "Health insurance, travel allowance & more" },
          ].map((b, i) => (
            <div key={i} className="p-5 rounded-xl border text-left" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
              <span className="text-2xl mb-3 block">{b.icon}</span>
              <p className="font-bold mb-1" style={{ color: "var(--cream)" }}>{b.title}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <a href={`mailto:careers@buildcore.in`}
          className="gold-btn inline-flex items-center gap-2 px-10 py-4 rounded text-sm font-bold tracking-wider uppercase">
          ✉ Send Your Resume
        </a>
      </div>
    </section>
  </div>
);

// ── Blog Page ───────────────────────────────────────────────────────────────
const BlogPage = () => (
  <div className="pt-16">
    <section className="relative py-28 overflow-hidden">
      <img src={IMGS.blog[0]} alt="blog" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Insights & Guides</SectionLabel>
        <SectionHeading center>The BuildCore Knowledge Hub</SectionHeading>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>
          Expert articles on construction trends, budgeting tips, and design inspiration.
        </p>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.blog.map((b, i) => (
          <div key={i} className="card-hover rounded-xl border overflow-hidden" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
            <div style={{ position: "relative", height: 220 }}>
              <img src={IMGS.blog[i]} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                  style={{ background: "rgba(200,146,42,0.9)", color: "#1A1A1A" }}>{b.category}</span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{b.date} · {b.read}</p>
              <h3 className="font-bold text-2xl mb-3 leading-tight" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{b.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{b.summary}</p>
              <button className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ── FAQ Page ───────────────────────────────────────────────────────────────
const FAQPage = ({ setPage }) => (
  <div className="pt-16">
    <section className="relative py-28 overflow-hidden">
      <img src={IMGS.services[3]} alt="faq" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>FAQ</SectionLabel>
        <SectionHeading center>Questions We Hear All the Time</SectionHeading>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        {data.faq.map((f, i) => (
          <details key={i} className="faq-item rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
            <summary className="flex items-center justify-between p-6 gap-4">
              <span className="font-semibold text-base" style={{ color: "var(--cream)" }}>{f.question}</span>
              <span className="text-xl flex-shrink-0" style={{ color: "var(--gold)" }}>+</span>
            </summary>
            <div className="px-6 pb-6 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm leading-relaxed pt-4" style={{ color: "var(--text-muted)" }}>{f.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <div className="max-w-3xl mx-auto px-6 mt-12 p-8 rounded-xl border text-center"
        style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
        <p className="font-bold text-2xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Still have questions?</p>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Our team is happy to answer anything.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setPage("Contact")} className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">Contact Us</button>
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded text-sm font-bold tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
);

// ── Contact Page ───────────────────────────────────────────────────────────
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="pt-16">
      <section className="relative py-28 overflow-hidden">
        <img src={IMGS.contactBg} alt="contact" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <SectionHeading center>Let's Build Something Great Together</SectionHeading>
          <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20to%20discuss%20a%20project.`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full text-sm font-bold"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppIcon size={16} /> Quick Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--charcoal)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-bold text-2xl mb-8" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Contact Information</h3>
            {[
              { icon: "📍", label: "Address", val: data.contact.address, link: `https://maps.google.com/?q=${encodeURIComponent(data.contact.mapAddress)}` },
              { icon: "📞", label: "Phone", val: data.contact.phone, link: `tel:${data.contact.phone}` },
              { icon: "✉️", label: "Email", val: data.contact.email, link: `mailto:${data.contact.email}` },
              { icon: "🕐", label: "Hours", val: data.contact.hours },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 mb-4 p-5 rounded-xl border"
                style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
                <span className="text-xl">{c.icon}</span>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider mb-1 font-bold" style={{ color: "var(--gold)" }}>{c.label}</p>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: "var(--cream)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={e => e.currentTarget.style.color = "var(--gold)"}
                      onMouseOut={e => e.currentTarget.style.color = "var(--cream)"}>{c.val}</a>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--cream)" }}>{c.val}</p>
                  )}
                </div>
                {c.label === "Address" && (
                  <a href={c.link} target="_blank" rel="noopener noreferrer"
                    className="text-xs px-3 py-1 rounded font-bold flex-shrink-0"
                    style={{ background: "var(--gold)", color: "#1A1A1A", textDecoration: "none" }}>
                    Open Map
                  </a>
                )}
              </div>
            ))}

            {/* Google Maps Embed */}
            <div className="mt-6 rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              <iframe
                title="BuildCore Location"
                src="https://maps.google.com/maps?q=Brigade+Road+Bangalore&output=embed&z=15"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
              />
              <a href={`https://maps.google.com/?q=${encodeURIComponent(data.contact.mapAddress)}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm font-bold"
                style={{ background: "var(--slate)", color: "var(--gold)", textDecoration: "none" }}>
                📍 Open Full Map in Google Maps →
              </a>
            </div>

            {/* WhatsApp Card */}
            <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20a%20consultation.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border mt-4"
              style={{ background: "#25D36614", borderColor: "#25D36644", textDecoration: "none", transition: "all 0.2s" }}
              onMouseOver={e => e.currentTarget.style.background = "#25D36624"}
              onMouseOut={e => e.currentTarget.style.background = "#25D36614"}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#25D366" }}>
                <WhatsAppIcon size={22} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#25D366" }}>WhatsApp Us Directly</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>+91 98765 43210 · Instant reply</p>
              </div>
              <span className="ml-auto" style={{ color: "#25D366" }}>→</span>
            </a>

            {/* Social Follow */}
            <div className="mt-6 p-5 rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--cream)" }}>Follow Us on Social Media</p>
              <div className="flex gap-3 flex-wrap">
                <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "#fff", textDecoration: "none" }}>
                  <InstagramIcon /> Instagram
                </a>
                <a href={data.contact.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background: "#1877F2", color: "#fff", textDecoration: "none" }}>
                  <FacebookIcon /> Facebook
                </a>
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background: "#0A66C2", color: "#fff", textDecoration: "none" }}>
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href={data.contact.youtube} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background: "#FF0000", color: "#fff", textDecoration: "none" }}>
                  <YouTubeIcon /> YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl border" style={{ background: "var(--slate)", borderColor: "var(--border)" }}>
            {sent ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">✅</p>
                <h3 className="font-bold text-2xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Message Sent!</h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Our team will reach out within 24 hours.</p>
                <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi!%20I%20just%20submitted%20a%20form.%20Following%20up!`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold"
                  style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
                  <WhatsAppIcon size={14} /> Or Follow Up on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <h4 className="font-bold text-xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Send Us a Message</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: "var(--text-muted)" }}>Full Name *</label>
                    <input required placeholder="Ravi Kumar" value={form.name} onChange={e => update("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: "var(--text-muted)" }}>Email *</label>
                    <input type="email" required placeholder="you@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: "var(--text-muted)" }}>Phone</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update("phone", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: "var(--text-muted)" }}>Service Interested In</label>
                  <select value={form.service} onChange={e => update("service", e.target.value)}
                    style={{ background: "var(--mid)", border: "1px solid var(--border)", color: form.service ? "var(--cream)" : "#9A9A9A", padding: "12px 16px", width: "100%", borderRadius: 4, outline: "none", fontFamily: "'Barlow', sans-serif" }}>
                    <option value="">Select a service</option>
                    {data.services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: "var(--text-muted)" }}>Message *</label>
                  <textarea required rows={4} placeholder="Tell us about your project..." value={form.message} onChange={e => update("message", e.target.value)} />
                </div>
                <button type="submit" className="gold-btn w-full py-4 rounded text-sm font-bold tracking-wider uppercase">
                  Send Message →
                </button>
                <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20a%20quote%20for%20${encodeURIComponent(form.service || "construction")}.`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded text-sm font-bold tracking-wider uppercase"
                  style={{ background: "#25D366", color: "#fff", textDecoration: "none", display: "flex" }}>
                  <WhatsAppIcon size={16} /> Or Message on WhatsApp Instead
                </a>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ── App Root ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    const p = { setPage };
    switch (page) {
      case "Home":         return <HomePage {...p} />;
      case "About":        return <AboutPage {...p} />;
      case "Services":     return <ServicesPage {...p} />;
      case "Pricing":      return <PricingPage {...p} />;
      case "Projects":     return <ProjectsPage />;
      case "Why Us":       return <WhyUsPage {...p} />;
      case "Testimonials": return <TestimonialsPage {...p} />;
      case "Team":         return <TeamPage {...p} />;
      case "Blog":         return <BlogPage />;
      case "FAQ":          return <FAQPage {...p} />;
      case "Contact":      return <ContactPage />;
      default:             return <HomePage {...p} />;
    }
  };

  return (
    <div style={{ background: "var(--charcoal)", minHeight: "100vh", color: "var(--cream)" }}>
      <FontLoader />
      <Navbar page={page} setPage={setPage} scrolled={scrolled} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
      <WhatsAppFloat />
    </div>
  );
}

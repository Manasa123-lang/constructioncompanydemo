import { useState, useEffect, useRef } from "react";

// ── Font & Global Styles ──────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
    * { font-family: 'Barlow', sans-serif; box-sizing: border-box; }
    h1,h2,h3,h4 { font-family: 'Barlow Condensed', sans-serif; }
    :root {
      --gold: #c8892a;
      --gold-light: #e5c14a;
      --gold-dim: rgba(75, 61, 34, 0.12);
      --gold-border: rgba(42, 176, 200, 0.28);
      /* Updated Navy palette — deeper, richer */
      --navy-900: #020810;
      --navy-800: #071120;
      --navy-700: #0C1A30;
      --navy-600: #111F3A;
      --navy-500: #172C52;
      --navy-400: #1E376A;
      --border: #172A45;
      --border-light: #223860;
      --text-muted: #6A84A8;
      --text-soft: #96AECE;
      --cream: #EDF2FF;
      /* legacy aliases kept for compatibility */
      --charcoal: #020810;
      --slate: #0C1A30;
      --mid: #172C52;
    }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--navy-900); }

    .gold-btn {
      background: linear-gradient(135deg, #c87e2a 0%, #e5a74a 50%, #C8922A 100%);
      background-size: 200% auto;
      color: #020810; font-weight: 700; letter-spacing: 0.06em;
      transition: all 0.3s; cursor: pointer; border: none;
    }
    .gold-btn:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,146,42,0.4); }

    .outline-btn {
      border: 1.5px solid var(--gold); color: var(--gold);
      transition: all 0.25s; background: transparent; cursor: pointer;
    }
    .outline-btn:hover { background: var(--gold); color: var(--navy-900); box-shadow: 0 6px 20px rgba(200,146,42,0.3); }

    .card-hover { transition: all 0.28s; }
    .card-hover:hover {
      transform: translateY(-5px);
      border-color: var(--gold) !important;
      box-shadow: 0 0 0 1px var(--gold), 0 16px 48px rgba(200, 137, 42, 0.15);
    }

    .section-line::before {
      content: ''; display: inline-block; width: 40px; height: 2px;
      background: var(--gold); margin-right: 12px; vertical-align: middle;
    }

    input, textarea, select {
      background: var(--navy-700) !important;
      border: 1px solid var(--border-light) !important;
      color: var(--cream) !important;
      border-radius: 6px; padding: 12px 16px;
      width: 100%; outline: none; transition: border-color 0.2s;
      font-family: 'Barlow', sans-serif; font-size: 14px;
    }
    input:focus, textarea:focus, select:focus { border-color: var(--gold) !important; box-shadow: 0 0 0 3px rgba(200,146,42,0.1); }
    input::placeholder, textarea::placeholder { color: var(--text-muted); }

    .nav-link {
      position: relative; color: var(--text-muted); transition: color 0.2s;
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600;
      background: none; border: none; cursor: pointer;
    }
    .nav-link:hover, .nav-link.active { color: var(--gold); }
    .nav-link::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 1.5px; background: var(--gold); transition: width 0.25s;
    }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    .faq-item summary { list-style: none; cursor: pointer; }
    .faq-item summary::-webkit-details-marker { display: none; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .slide-in { animation: slideIn 0.7s ease forwards; }
    .star { color: var(--gold); }

    .hero-slide { position: absolute; inset: 0; transition: opacity 1.2s ease; }

    .whatsapp-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 1000;
      width: 60px; height: 60px; border-radius: 50%;
      background: #25D366;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 6px 24px rgba(37,211,102,0.45);
      cursor: pointer; transition: all 0.25s; border: none; text-decoration: none;
    }
    .whatsapp-float:hover { transform: scale(1.12) translateY(-3px); box-shadow: 0 10px 32px rgba(37,211,102,0.55); }
    .whatsapp-tooltip {
      position: absolute; right: 70px; top: 50%; transform: translateY(-50%);
      background: var(--navy-800); color: var(--cream); font-size: 12px; font-weight: 600;
      padding: 6px 12px; border-radius: 6px; white-space: nowrap;
      opacity: 0; transition: opacity 0.2s; pointer-events: none;
      border: 1px solid var(--border-light);
    }
    .whatsapp-float:hover .whatsapp-tooltip { opacity: 1; }

    .img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(2,8,16,0.35) 0%, rgba(2,8,16,0.75) 100%); }

    @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }
    .pulse { animation: pulse 2s ease-in-out infinite; }

    .social-icon {
      width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center;
      justify-content: center; cursor: pointer; transition: all 0.22s; text-decoration: none;
      border: 1px solid var(--border-light); background: var(--navy-700);
    }
    .social-icon:hover { transform: translateY(-3px); border-color: var(--gold); background: var(--gold-dim); }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(2,8,16,0.92); z-index: 2000;
      display: flex; align-items: center; justify-content: center; padding: 20px;
      backdrop-filter: blur(8px);
    }
    .modal-box {
      background: var(--navy-800); border: 1px solid var(--border-light);
      border-radius: 16px; max-width: 860px; width: 100%; max-height: 92vh; overflow-y: auto;
    }

    .tab-btn {
      padding: 8px 20px; border-radius: 6px; font-size: 11px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
    }
    .tab-btn.active { background: var(--gold); color: var(--navy-900); border: none; }
    .tab-btn:not(.active) { background: transparent; color: var(--text-muted); border: 1px solid var(--border-light); }
    .tab-btn:not(.active):hover { border-color: var(--gold); color: var(--gold); }

    /* Team horizontal card */
    .team-hcard {
      display: flex; border-radius: 14px; overflow: hidden;
      border: 1px solid var(--border-light);
      background: var(--navy-800);
      transition: all 0.3s; cursor: pointer;
    }
    .team-hcard:hover {
      border-color: var(--gold);
      box-shadow: 0 0 0 1px var(--gold), 0 20px 56px rgba(200,146,42,0.14);
      transform: translateY(-4px);
    }
    .team-hcard:hover .team-hcard-photo img { transform: scale(1.06); }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--navy-900); }
    ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold); }
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
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=85",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=85",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=85",
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
  projectDetails: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  ],
  blog: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&q=80",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=700&q=80",
  ],
  ctaBg: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1400&q=80",
  contactBg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  pricingBg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
  whyUsBg: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
  teamHero: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80",
  // ── FIXED: All 4 culture images now have valid working Unsplash URLs ──
  cultureOffice: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  cultureConstruction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  cultureTeam: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  cultureAwards: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
};

// ── Data ──────────────────────────────────────────────────────────────────
const data = {
  navbar: { logo: "BuildCore", links: ["Home","About","Services","Why Us","Team","Pricing","Projects","Blog","FAQ","Contact"] },
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
    awards: ["Best Construction Company — Karnataka 2023", "ISO 9001:2015 Certified", "CREDAI Member", "Green Building Council Partner"],
  },
  team: [
    { name: "Arjun Mehta", role: "Founder & CEO", exp: "20+ years", dept: "Leadership", projects: 300, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Arjun founded BuildCore in 2009 with a vision to redefine construction standards in India. A civil engineering graduate from IIT Bombay, he has personally led over 300 landmark projects across residential, commercial, and infrastructure sectors.", skills: ["Strategic Leadership", "Civil Engineering", "Business Development", "Project Finance"] },
    { name: "Priya Sharma", role: "Head of Projects", exp: "14 years", dept: "Operations", projects: 180, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Priya oversees all project delivery operations, ensuring timelines, budgets, and quality benchmarks are met across every active site. Known for her meticulous planning and zero-surprise execution across 180+ projects.", skills: ["Project Management", "Site Operations", "Risk Management", "Team Leadership"] },
    { name: "Vikram Rao", role: "Chief Architect", exp: "18 years", dept: "Design", projects: 220, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "An award-winning architect who has designed iconic residential and commercial landmarks across India. Vikram brings an international perspective — having worked on projects in Singapore and Dubai — to every design challenge.", skills: ["Architecture", "3D Visualization", "Sustainable Design", "AutoCAD / Revit"] },
    { name: "Deepa Iyer", role: "Interior Design Lead", exp: "12 years", dept: "Design", projects: 140, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Deepa creates stunning interiors that balance aesthetics with functionality. Her work has been featured in Architectural Digest India and Elle Décor. She leads a team of 18 interior designers across all projects.", skills: ["Interior Design", "Space Planning", "Material Sourcing", "Client Styling"] },
    { name: "Rohan Desai", role: "Structural Engineer", exp: "16 years", dept: "Engineering", projects: 260, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Rohan ensures every structure BuildCore builds is engineered to outlast generations. He oversees all soil testing, foundation design, seismic analysis, and structural audits from concept to completion.", skills: ["Structural Analysis", "Foundation Engineering", "Seismic Design", "AutoCAD Structural"] },
    { name: "Nisha Patel", role: "Client Relations Manager", exp: "9 years", dept: "Client Success", projects: 400, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Nisha is the face clients interact with throughout their entire project journey. She ensures transparent communication and complete satisfaction at every milestone — managing relationships across 400+ completed projects.", skills: ["Client Management", "Communication", "CRM Systems", "Conflict Resolution"] },
    { name: "Sameer Joshi", role: "Site Director", exp: "15 years", dept: "Operations", projects: 190, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Sameer manages on-ground operations across all active construction sites, coordinating subcontractors, materials logistics, and daily progress tracking to keep every project on time and on budget.", skills: ["Site Management", "Safety Compliance", "Contractor Relations", "Scheduling"] },
    { name: "Kavya Menon", role: "Sustainability Lead", exp: "10 years", dept: "Green Initiatives", projects: 80, linkedin: "https://linkedin.com", instagram: "https://instagram.com", bio: "Kavya drives BuildCore's green building program — from LEED certifications and solar integrations to eco-material sourcing. She has overseen sustainability strategy on over 80 projects, saving clients an estimated ₹12 Cr in lifecycle energy costs.", skills: ["LEED Consulting", "Eco Materials", "Energy Auditing", "Solar Systems"] },
  ],
  whyUs: {
    headline: "Why 500+ Families & Businesses Chose BuildCore",
    subtitle: "We don't just build structures — we build trust, one project at a time.",
    stats: [
      { value: "500+", label: "Projects Delivered", icon: "🏗️" },
      { value: "₹0", label: "Hidden Charges. Ever.", icon: "💰" },
      { value: "48hr", label: "Quote Turnaround", icon: "⚡" },
      { value: "10yr", label: "Max Warranty", icon: "🛡️" },
    ],
    pillars: [
      { icon: "🔍", title: "Full Transparency", description: "Itemized quotes, weekly reports, real-time dashboards. You always know where your money goes and what's happening on site.", highlight: "No surprise costs" },
      { icon: "🏆", title: "Award-Winning Quality", description: "ISO 9001:2015 certified processes, ISI-certified materials, and 6-stage quality inspections at every phase of construction.", highlight: "ISO Certified" },
      { icon: "👷", title: "In-House Expertise", description: "Unlike most contractors, we employ our own engineers, architects, and site managers — no subcontracting your dreams.", highlight: "200+ In-house experts" },
      { icon: "⏰", title: "Strict Timelines", description: "92% of our projects have been delivered on or before the committed date. We treat deadlines as promises, not estimates.", highlight: "92% on-time record" },
      { icon: "🌿", title: "Sustainable Practices", description: "Green building materials, energy-efficient designs, and LEED consultation are standard offerings — not premium add-ons.", highlight: "LEED Certified designs" },
      { icon: "📱", title: "Tech-Enabled Projects", description: "Live project tracking, digital approvals, progress photo updates, and a dedicated project app for every Premium/Luxury client.", highlight: "Real-time updates" },
    ],
    comparison: [
      { feature: "Transparent Itemized Quotes", us: true, others: false },
      { feature: "In-House Engineers (No Subcontracting)", us: true, others: false },
      { feature: "Dedicated Project Manager", us: true, others: false },
      { feature: "Weekly Progress Reports", us: true, others: false },
      { feature: "Structural Warranty (up to 10 years)", us: true, others: false },
      { feature: "Government Approval Handling", us: true, others: false },
      { feature: "3D Design Visualization", us: true, others: false },
      { feature: "Post-Handover Support", us: true, others: false },
    ],
    testimonialHighlight: {
      quote: "I've worked with three other builders before BuildCore. The difference is night and day — in transparency, in quality, and in how much they genuinely care. Our villa was delivered 12 days ahead of schedule.",
      name: "Meera Krishnan",
      role: "Homeowner, Pune",
      avatar: "MK"
    }
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
    {
      title: "Whitefield Luxury Villas", type: "Residential", area: "4,200 sq ft", year: "2024", location: "Bangalore",
      client: "Private Homeowner", duration: "14 months", value: "₹2.8 Cr",
      description: "A stunning cluster of 6 premium villas featuring smart home automation, landscaped gardens, and a community pool. Designed with a modern tropical aesthetic.",
      highlights: ["Smart Home Integration", "Rainwater Harvesting", "Community Pool", "Landscaped Gardens"],
      gallery: [0, 1, 2, 3],
    },
    {
      title: "TechHub Office Complex", type: "Commercial", area: "28,000 sq ft", year: "2024", location: "Hyderabad",
      client: "TechHub Ventures Pvt. Ltd.", duration: "18 months", value: "₹14.5 Cr",
      description: "A cutting-edge 7-floor commercial complex with open-plan offices, conference suites, a rooftop café, and LEED Gold certification.",
      highlights: ["LEED Gold Certified", "Rooftop Café", "EV Charging Bays", "Seismic-Safe Structure"],
      gallery: [0, 1, 2, 3],
    },
    {
      title: "Coastal Retreat", type: "Residential", area: "6,800 sq ft", year: "2023", location: "Goa",
      client: "Mr. Sameer D'Souza", duration: "16 months", value: "₹4.2 Cr",
      description: "An oceanfront private villa blending contemporary architecture with natural stone and wood. Includes a private pool deck and outdoor entertainment zone.",
      highlights: ["Oceanfront Location", "Private Pool Deck", "Natural Stone Finish", "Outdoor Cinema"],
      gallery: [0, 1, 2, 3],
    },
    {
      title: "Grand Retail Mall", type: "Commercial", area: "85,000 sq ft", year: "2023", location: "Chennai",
      client: "Grand Retail Corp.", duration: "28 months", value: "₹48 Cr",
      description: "A landmark multi-level retail destination with 120 stores, 2 food courts, an IMAX theatre, and 600 parking slots in the heart of Chennai.",
      highlights: ["120 Retail Stores", "IMAX Theatre", "600 Parking Slots", "Central HVAC System"],
      gallery: [0, 1, 2, 3],
    },
    {
      title: "Skyline Apartments", type: "Residential", area: "12,500 sq ft", year: "2023", location: "Pune",
      client: "Skyline Realty Group", duration: "20 months", value: "₹7.8 Cr",
      description: "A boutique residential tower with 18 premium 3BHK apartments, a rooftop terrace, and a fully-equipped fitness centre.",
      highlights: ["18 Premium 3BHK Units", "Rooftop Terrace", "Fitness Centre", "EV Parking"],
      gallery: [0, 1, 2, 3],
    },
    {
      title: "Corporate HQ — Infra Co.", type: "Commercial", area: "42,000 sq ft", year: "2022", location: "Mumbai",
      client: "Infra Co. Ltd.", duration: "22 months", value: "₹22 Cr",
      description: "Infra Co.'s flagship headquarters featuring a grand atrium lobby, 8 floors of executive offices, a training auditorium, and a sky garden.",
      highlights: ["Grand Atrium Lobby", "Training Auditorium", "Sky Garden", "24/7 Backup Power"],
      gallery: [0, 1, 2, 3],
    },
  ],
  testimonials: [
    { name: "Ravi Kumar", company: "Homeowner", location: "Bangalore", feedback: "BuildCore delivered our dream villa on time and within budget. The quality of construction and finishing exceeded every expectation. Professional, transparent, and genuinely caring team.", rating: 5 },
    { name: "Anita Reddy", company: "Real Estate Developer", location: "Hyderabad", feedback: "I've worked with many contractors, but BuildCore is on a different level. Exceptional quality control, proactive communication, and flawless execution on our 28,000 sq ft office project.", rating: 5 },
    { name: "Suresh Nair", company: "Business Owner", location: "Chennai", feedback: "Our retail outlet was handed over ahead of schedule. The project manager kept us updated daily. Zero surprises — pure professionalism.", rating: 5 },
    { name: "Meera Krishnan", company: "Homeowner", location: "Pune", feedback: "From design consultation to final handover, BuildCore was outstanding. Our home is more beautiful than we ever imagined. Worth every rupee.", rating: 5 },
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
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9921!2d77.5945!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBrigade%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  },
  footer: {
    text: "© 2026 BuildCore Constructions Pvt. Ltd. All rights reserved.",
    links: ["Privacy Policy", "Terms of Service", "Support"],
    tagline: "Built on Trust. Delivered with Pride.",
  },
};

// ── Social Icons SVGs ──────────────────────────────────────────────────────
const InstagramIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
  </svg>
);
const FacebookIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const LinkedInIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const YouTubeIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1A1A1A"/>
  </svg>
);
const WhatsAppSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.863L2 30l7.343-1.76A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.35 18.912c-.347-.174-2.057-1.015-2.376-1.13-.32-.117-.553-.174-.786.174-.233.348-.903 1.13-1.107 1.363-.204.232-.407.26-.754.087-.347-.174-1.465-.54-2.79-1.72-1.03-.918-1.726-2.052-1.93-2.4-.203-.347-.022-.534.153-.707.157-.155.347-.405.52-.607.175-.203.233-.348.349-.58.116-.233.058-.437-.03-.61-.087-.174-.786-1.893-1.077-2.594-.284-.681-.572-.588-.786-.599l-.668-.012c-.233 0-.61.087-.93.435-.32.347-1.223 1.194-1.223 2.913s1.252 3.38 1.427 3.613c.174.232 2.464 3.763 5.97 5.277.834.36 1.485.575 1.993.736.837.267 1.6.23 2.202.14.672-.101 2.057-.842 2.348-1.655.29-.813.29-1.51.203-1.656-.086-.145-.32-.232-.668-.406z"/>
  </svg>
);

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
const Stars = () => (
  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}</div>
);

// ── Social Links Component ─────────────────────────────────────────────────
const SocialLinks = ({ size = "normal" }) => {
  const s = size === "large" ? 22 : 18;
  const w = size === "large" ? 48 : 40;
  return (
    <div className="flex gap-3">
      <a href={data.social.instagram} target="_blank" rel="noopener noreferrer"
        className="social-icon" style={{ width: w, height: w, background: "var(--navy-600)" }}
        title="Follow on Instagram">
        <InstagramIcon size={s} color="#E1306C" />
      </a>
      <a href={data.social.facebook} target="_blank" rel="noopener noreferrer"
        className="social-icon" style={{ width: w, height: w, background: "var(--navy-600)" }}
        title="Follow on Facebook">
        <FacebookIcon size={s} color="#1877F2" />
      </a>
      <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
        className="social-icon" style={{ width: w, height: w, background: "var(--navy-600)" }}
        title="Connect on LinkedIn">
        <LinkedInIcon size={s} color="#0A66C2" />
      </a>
      <a href={data.social.youtube} target="_blank" rel="noopener noreferrer"
        className="social-icon" style={{ width: w, height: w, background: "var(--navy-600)" }}
        title="Watch on YouTube">
        <YouTubeIcon size={s} color="#FF0000" />
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
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.863L2 30l7.343-1.76A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.35 18.912c-.347-.174-2.057-1.015-2.376-1.13-.32-.117-.553-.174-.786.174-.233.348-.903 1.13-1.107 1.363-.204.232-.407.26-.754.087-.347-.174-1.465-.54-2.79-1.72-1.03-.918-1.726-2.052-1.93-2.4-.203-.347-.022-.534.153-.707.157-.155.347-.405.52-.607.175-.203.233-.348.349-.58.116-.233.058-.437-.03-.61-.087-.174-.786-1.893-1.077-2.594-.284-.681-.572-.588-.786-.599l-.668-.012c-.233 0-.61.087-.93.435-.32.347-1.223 1.194-1.223 2.913s1.252 3.38 1.427 3.613c.174.232 2.464 3.763 5.97 5.277.834.36 1.485.575 1.993.736.837.267 1.6.23 2.202.14.672-.101 2.057-.842 2.348-1.655.29-.813.29-1.51.203-1.656-.086-.145-.32-.232-.668-.406z"/>
    </svg>
  </a>
);

// ── Navbar ─────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage, scrolled }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(2,8,16,0.98)" : "rgba(2,8,16,0.2)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.5)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <span className="text-2xl font-bold tracking-wider" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>
            BUILD<span style={{ color: "var(--cream)" }}>CORE</span>
          </span>
        </button>
        <div className="hidden lg:flex items-center gap-6">
          {data.navbar.links.map(l => (
            <button key={l} onClick={() => setPage(l)} className={`nav-link ${page === l ? "active" : ""}`}>{l}</button>
          ))}
          <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20a%20free%20quote.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none", transition: "all 0.2s" }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}>
            <WhatsAppSVG size={14} /> WhatsApp
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
          style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
          {data.navbar.links.map(l => (
            <button key={l} onClick={() => { setPage(l); setOpen(false); }}
              className={`nav-link text-left ${page === l ? "active" : ""}`}>{l}</button>
          ))}
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="text-left text-sm font-bold" style={{ color: "#25D366", textDecoration: "none" }}>
            💬 WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer className="border-t" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <p className="text-3xl font-bold mb-2" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>
          BUILD<span style={{ color: "var(--cream)" }}>CORE</span>
        </p>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{data.footer.tagline}</p>
        <div className="space-y-2 mb-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>📍 {data.contact.address}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>📞 {data.contact.phone}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>✉ {data.contact.email}</p>
        </div>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--cream)" }}>Follow Us</p>
          <SocialLinks />
        </div>
        <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
          style={{ background: "#25D36622", color: "#25D366", border: "1px solid #25D36644", textDecoration: "none" }}>
          <WhatsAppSVG size={14} /> Chat on WhatsApp
        </a>
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
        <div className="p-4 rounded-lg border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>📍 Find Us</p>
          <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Brigade Road, Bangalore</p>
          <a href="https://maps.google.com/?q=Brigade+Road+Bangalore" target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold" style={{ color: "var(--gold)", textDecoration: "none" }}>
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
    <div className="border-t py-4 text-center text-xs" style={{ borderColor: "var(--border-light)", color: "var(--text-muted)" }}>
      {data.footer.text}
    </div>
  </footer>
);

// ── Project Detail Modal ───────────────────────────────────────────────────
const ProjectModal = ({ project, index, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ position: "relative", height: 320, overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          <img src={IMGS.projectDetails[imgIdx]} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", border: "1px solid var(--border-light)", color: "var(--cream)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>✕</button>
          <div className="flex gap-2" style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            {[0,1,2,3].map(i => (
              <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? "var(--gold)" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
          <span style={{ position: "absolute", top: 16, left: 16, background: "rgba(200,146,42,0.9)", color: "var(--navy-900)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.08em" }}>{project.type}</span>
        </div>
        <div className="p-8">
          <h2 className="font-bold text-3xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{project.title}</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Location", val: project.location },
              { label: "Area", val: project.area },
              { label: "Duration", val: project.duration },
              { label: "Project Value", val: project.value },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-lg text-center" style={{ background: "var(--navy-800)", border: "1px solid var(--border-light)" }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--gold)" }}>{s.label}</p>
                <p className="font-bold text-sm" style={{ color: "var(--cream)" }}>{s.val}</p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--gold)" }}>Key Features</p>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((h, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(200,146,42,0.15)", color: "var(--gold)", border: "1px solid rgba(200,146,42,0.3)" }}>✓ {h}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi!%20I'm%20interested%20in%20a%20similar%20project%20to%20${encodeURIComponent(project.title)}.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded text-sm font-bold"
              style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
              <WhatsAppSVG size={14} /> Enquire on WhatsApp
            </a>
            <button onClick={onClose} className="outline-btn px-6 py-3 rounded text-sm font-semibold">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Team Member Modal ──────────────────────────────────────────────────────
const TeamModal = ({ member, index, onClose }) => {
  if (!member) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <div className="p-8">
          <button onClick={onClose} style={{ float: "right", background: "var(--navy-600)", border: "1px solid var(--border-light)", color: "var(--cream)", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 14 }}>✕</button>
          <div className="flex items-center gap-5 mb-6">
            <img src={IMGS.team[index]} alt={member.name} style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "3px solid var(--gold)" }} />
            <div>
              <h3 className="font-bold text-2xl" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{member.name}</h3>
              <p className="text-sm" style={{ color: "var(--gold)" }}>{member.role}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{member.exp} experience</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{member.bio}</p>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--gold)" }}>Expertise</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((s, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--navy-600)", color: "var(--cream)", border: "1px solid var(--border-light)" }}>{s}</span>
              ))}
            </div>
          </div>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded text-sm font-bold"
            style={{ background: "#0A66C2", color: "#fff", textDecoration: "none" }}>
            <LinkedInIcon size={14} color="#fff" /> Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

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
                  <WhatsAppSVG size={16} /> WhatsApp Us
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
              <p className="font-bold text-3xl" style={{ color: "var(--navy-900)", fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</p>
              <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "rgba(26,26,26,0.7)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-24" style={{ background: "var(--navy-900)" }}>
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
              <div key={i} className="card-hover p-8 rounded-xl border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage("Why Us")} className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
              See Why 500+ Chose Us →
            </button>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24" style={{ background: "var(--navy-800)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Our Process</SectionLabel>
            <SectionHeading center>How We Work</SectionHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.home.process.map((p, i) => (
              <div key={i} className="card-hover text-center p-8 rounded-xl border" style={{ background: "var(--navy-700)", borderColor: "var(--border-light)" }}>
                <p className="text-5xl font-bold mb-4" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", opacity: 0.3 }}>{p.step}</p>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: "var(--navy-900)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Client Stories</SectionLabel>
            <SectionHeading center>Trusted by Hundreds Across India</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.home.testimonialsPreview.map((t, i) => (
              <div key={i} className="card-hover p-8 rounded-xl border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
                <Stars />
                <p className="text-sm leading-relaxed my-4" style={{ color: "var(--text-muted)" }}>"{t.feedback}"</p>
                <p className="font-semibold text-sm" style={{ color: "var(--cream)" }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--gold)" }}>{t.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage("Projects")} className="outline-btn px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase">
              View All Projects & Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Follow Us on Social */}
      <section className="py-16" style={{ background: "var(--navy-800)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionLabel>Stay Connected</SectionLabel>
          <SectionHeading center>Follow Our Journey</SectionHeading>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Behind-the-scenes construction updates, design inspiration, and project stories — follow us for daily content.
          </p>
          <div className="flex justify-center mb-6">
            <SocialLinks size="large" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[IMGS.projects[0], IMGS.projects[1], IMGS.projects[2], IMGS.projects[3]].map((img, i) => (
              <a key={i} href={data.social.instagram} target="_blank" rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden relative" style={{ paddingBottom: "100%", cursor: "pointer" }}>
                <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  onMouseOver={e => e.target.style.transform = "scale(1.06)"}
                  onMouseOut={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(200,146,42,0.4)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(0,0,0,0)"; }}>
                  <InstagramIcon size={28} color="white" />
                </div>
              </a>
            ))}
          </div>
          <a href={data.social.instagram} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-bold"
            style={{ color: "#E1306C", textDecoration: "none" }}>
            <InstagramIcon size={16} color="#E1306C" /> @buildcore.in — Follow on Instagram
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-28 overflow-hidden">
        <img src={IMGS.ctaBg} alt="cta" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(200,146,42,0.88)" }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
          <h2 className="font-bold mb-4" style={{ color: "var(--navy-900)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Ready to Build Your Dream?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(26,26,26,0.8)" }}>
            Get a free consultation and detailed quote within 48 hours. No obligations, just honest advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("Contact")} className="px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
              style={{ background: "var(--navy-900)", color: "#C8922A" }}>
              Get Free Quote
            </button>
            <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi!%20I'd%20like%20a%20free%20quote.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-10 py-4 rounded font-bold text-sm tracking-wider uppercase"
              style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
              <WhatsAppSVG size={16} /> WhatsApp Now
            </a>
          </div>
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

    <section className="py-24" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="border-l-4 pl-6 mb-8" style={{ borderColor: "var(--gold)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>Our Mission</p>
            <p className="text-xl" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{data.about.mission}</p>
          </div>
          <div className="border-l-4 pl-6 mb-8" style={{ borderColor: "var(--border-light)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>Our Vision</p>
            <p className="text-xl" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{data.about.vision}</p>
          </div>
          <div className="space-y-3">
            {data.about.values.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
                <span style={{ color: "var(--gold)", fontSize: 18 }}>▸</span>
                <span className="text-sm" style={{ color: "var(--cream)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={IMGS.aboutOffice} alt="office" className="rounded-xl w-full" style={{ objectFit: "cover", height: 420 }} />
          <div className="absolute bottom-6 left-6 p-5 rounded-lg" style={{ background: "rgba(2,8,16,0.95)", backdropFilter: "blur(12px)", border: "1px solid var(--border-light)" }}>
            <div className="flex gap-6">
              {[["500+","Projects"],["15+","Years"],["98%","Satisfaction"]].map(([v,l],i)=>(
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>{v}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16" style={{ background: "var(--navy-800)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-6 text-center" style={{ color: "var(--gold)" }}>Recognition & Certifications</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.about.awards.map((a, i) => (
            <div key={i} className="p-4 rounded-lg border text-center text-sm" style={{ background: "var(--navy-700)", borderColor: "var(--border-light)", color: "var(--cream)" }}>
              🏆 {a}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionLabel>Our People</SectionLabel>
        <SectionHeading center>200+ Experts Behind Every Project</SectionHeading>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
          From architects and engineers to project managers and client relations — meet the team that makes it all happen.
        </p>
        <div className="flex justify-center -space-x-3 mb-8">
          {IMGS.team.slice(0,5).map((img, i) => (
            <img key={i} src={img} alt="" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "3px solid var(--navy-900)" }} />
          ))}
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid var(--navy-900)", fontSize: 11, fontWeight: 700, color: "var(--navy-900)" }}>195+</div>
        </div>
        <button onClick={() => setPage("Team")} className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
          Meet the Leadership Team →
        </button>
      </div>
    </section>
  </div>
);

// ── Why Us Page ────────────────────────────────────────────────────────────
const WhyUsPage = ({ setPage }) => (
  <div className="pt-16">
    <section className="relative py-32 overflow-hidden">
      <img src={IMGS.whyUsBg} alt="why us" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.76)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Why BuildCore</SectionLabel>
        <h1 className="font-bold mb-4" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)" }}>
          {data.whyUs.headline}
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>{data.whyUs.subtitle}</p>
      </div>
    </section>

    <div style={{ background: "linear-gradient(90deg, #C8922A, #A0701C)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.whyUs.stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl mb-1">{s.icon}</p>
            <p className="font-bold text-3xl" style={{ color: "var(--navy-900)", fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(26,26,26,0.75)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>

    <section className="py-24" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Our Differentiators</SectionLabel>
          <SectionHeading center>What Sets Us Apart</SectionHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.whyUs.pillars.map((p, i) => (
            <div key={i} className="card-hover p-8 rounded-xl border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
              <div className="text-4xl mb-4">{p.icon}</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(200,146,42,0.15)", color: "var(--gold)", border: "1px solid rgba(200,146,42,0.3)" }}>
                {p.highlight}
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24" style={{ background: "var(--navy-800)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>Comparison</SectionLabel>
          <SectionHeading center>BuildCore vs Others</SectionHeading>
        </div>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border-light)" }}>
          <div className="grid grid-cols-3 py-4 px-6" style={{ background: "var(--gold)" }}>
            <p className="text-sm font-bold" style={{ color: "var(--navy-900)" }}>Feature</p>
            <p className="text-sm font-bold text-center" style={{ color: "var(--navy-900)" }}>BuildCore</p>
            <p className="text-sm font-bold text-center" style={{ color: "var(--navy-900)" }}>Others</p>
          </div>
          {data.whyUs.comparison.map((c, i) => (
            <div key={i} className="grid grid-cols-3 py-4 px-6 border-t items-center" style={{ background: i % 2 === 0 ? "var(--navy-700)" : "var(--navy-900)", borderColor: "var(--border-light)" }}>
              <p className="text-sm" style={{ color: "var(--cream)" }}>{c.feature}</p>
              <div className="text-center text-lg">{c.us ? "✅" : "❌"}</div>
              <div className="text-center text-lg">{c.others ? "✅" : "❌"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="p-10 rounded-2xl border text-center" style={{ background: "var(--navy-800)", borderColor: "var(--gold)", borderWidth: 2 }}>
          <div className="text-4xl mb-6" style={{ color: "var(--gold)" }}>"</div>
          <p className="text-xl leading-relaxed mb-8 italic" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {data.whyUs.testimonialHighlight.quote}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ background: "var(--gold)", color: "var(--navy-900)" }}>
              {data.whyUs.testimonialHighlight.avatar}
            </div>
            <div className="text-left">
              <p className="font-bold text-sm" style={{ color: "var(--cream)" }}>{data.whyUs.testimonialHighlight.name}</p>
              <p className="text-xs" style={{ color: "var(--gold)" }}>{data.whyUs.testimonialHighlight.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="relative py-20 overflow-hidden">
      <img src={IMGS.ctaBg} alt="cta" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(200,146,42,0.9)" }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <h2 className="font-bold text-3xl mb-4" style={{ color: "var(--navy-900)", fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to Experience the BuildCore Difference?</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(26,26,26,0.8)" }}>Get a free 30-min consultation. No commitment, just clarity.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setPage("Contact")} className="px-8 py-3 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "var(--navy-900)", color: "#C8922A" }}>Book Consultation</button>
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppSVG size={14} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  </div>
);

// ── Team Page ──────────────────────────────────────────────────────────────
const deptColors = {
  "Leadership":      { bg: "rgba(200,146,42,0.12)", color: "#E5B04A",  border: "rgba(200,146,42,0.3)" },
  "Operations":      { bg: "rgba(99,179,237,0.10)", color: "#63B3ED",  border: "rgba(99,179,237,0.3)" },
  "Design":          { bg: "rgba(154,117,235,0.12)", color: "#B794F4", border: "rgba(154,117,235,0.3)" },
  "Engineering":     { bg: "rgba(72,199,142,0.10)", color: "#48C78E",  border: "rgba(72,199,142,0.3)" },
  "Client Success":  { bg: "rgba(252,129,74,0.10)", color: "#FC814A",  border: "rgba(252,129,74,0.3)" },
  "Green Initiatives":{ bg: "rgba(72,199,142,0.10)", color: "#48C78E", border: "rgba(72,199,142,0.3)" },
};

const TeamPage = () => {
  const [selected, setSelected] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [filter, setFilter] = useState("All");
  const depts = ["All", ...Array.from(new Set(data.team.map(m => m.dept)))];
  const filtered = filter === "All" ? data.team : data.team.filter(m => m.dept === filter);

  return (
    <div className="pt-16">
      {selected && <TeamModal member={selected} index={selectedIdx} onClose={() => setSelected(null)} />}

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <img src={IMGS.teamHero} alt="team" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(2,8,16,0.92) 0%, rgba(7,17,32,0.75) 100%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,146,42,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 2 }}>
          <SectionLabel>Our People</SectionLabel>
          <h1 className="font-bold mb-5" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.8rem,6vw,5rem)", maxWidth: 680, lineHeight: 1.0 }}>
            The Minds Behind BuildCore
          </h1>
          <p className="text-lg mb-10" style={{ color: "var(--text-soft)", maxWidth: 520 }}>
            200+ architects, engineers, designers, and specialists — united by one purpose: to deliver extraordinary.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {[
              { val: "200+", lbl: "Team Members" },
              { val: "8", lbl: "Departments" },
              { val: "15+", lbl: "Avg. Years Exp." },
              { val: "500+", lbl: "Projects Together" },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 14 }}>
                <p style={{ fontSize: 26, fontWeight: 800, color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Filter */}
      <div style={{ background: "var(--navy-800)", borderBottom: "1px solid var(--border)", position: "sticky", top: 64, zIndex: 30 }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2 items-center">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginRight: 8 }}>Filter:</span>
          {depts.map(d => (
            <button key={d} className={`tab-btn ${filter === d ? "active" : ""}`} onClick={() => setFilter(d)}>{d}</button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>{filtered.length} member{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Horizontal Card Grid */}
      <section style={{ background: "var(--navy-900)", padding: "64px 24px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {filtered.map((m, idx) => {
            const origIdx = data.team.indexOf(m);
            const dc = deptColors[m.dept] || { bg: "rgba(200,146,42,0.1)", color: "var(--gold)", border: "rgba(200,146,42,0.25)" };
            return (
              <div key={idx} className="team-hcard"
                onClick={() => { setSelected(m); setSelectedIdx(origIdx); }}
                style={{ cursor: "pointer" }}>
                <div className="team-hcard-photo" style={{ width: 180, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                  <img
                    src={IMGS.team[origIdx]}
                    alt={m.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.4s", display: "block", minHeight: 200 }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(7,17,32,0.5) 100%)" }} />
                </div>
                <div style={{ flex: 1, padding: "24px 28px 24px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                      <div>
                        <h3 style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, lineHeight: 1.1, marginBottom: 2 }}>{m.name}</h3>
                        <p style={{ fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>{m.role}</p>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 20, background: dc.bg, color: dc.color, border: `1px solid ${dc.border}`, whiteSpace: "nowrap" }}>
                        {m.dept}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 20, marginBottom: 12, marginTop: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 13 }}>⏱</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.exp} experience</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 13 }}>🏗</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.projects}+ projects</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-soft)", lineHeight: 1.65, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {m.bio}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {m.skills.map((sk, j) => (
                        <span key={j} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 4, background: "var(--navy-700)", color: "var(--text-soft)", border: "1px solid var(--border-light)", fontWeight: 600 }}>{sk}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={m.linkedin} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
                        className="social-icon" style={{ width: 32, height: 32, borderRadius: 6 }}
                        title="LinkedIn">
                        <LinkedInIcon size={15} color="#0A66C2" />
                      </a>
                      <a href={m.instagram || data.social.instagram} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
                        className="social-icon" style={{ width: 32, height: 32, borderRadius: 6 }}
                        title="Instagram">
                        <InstagramIcon size={15} color="#E1306C" />
                      </a>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", display: "flex", alignItems: "center", gap: 4 }}>
                      View Full Profile
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── UPDATED: Our Culture Section — all 4 images now filled ── */}
      <section className="py-20" style={{ background: "var(--navy-800)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Our Culture</SectionLabel>
            <SectionHeading>A Culture of Excellence & Care</SectionHeading>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Exceptional buildings are built by exceptional people. We invest in our team's growth, wellbeing, and professional development at every level.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📚", title: "Continuous Learning", desc: "Monthly training programs and site visits to global construction projects." },
                { icon: "🤝", title: "Collaborative Environment", desc: "Cross-functional teams that work together, never in silos." },
                { icon: "📈", title: "Merit-Based Growth", desc: "Promotions based purely on performance, initiative, and measurable impact." },
                { icon: "❤️", title: "Employee Wellbeing", desc: "Health insurance, flexible leaves, and milestone celebrations across the team." },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 10, background: "var(--navy-700)", border: "1px solid var(--border-light)" }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{c.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--cream)", marginBottom: 3 }}>{c.title}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FIXED: 4 distinct culture images, all valid Unsplash URLs ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { src: IMGS.cultureOffice,       alt: "Modern office interior",     offset: false },
              { src: IMGS.cultureConstruction,  alt: "Construction site teamwork", offset: true  },
              { src: IMGS.cultureTeam,          alt: "Team collaboration",         offset: false },
              { src: IMGS.cultureAwards,        alt: "Awards and recognition",     offset: true  },
            ].map((img, i) => (
              <div key={i} style={{ marginTop: img.offset ? 24 : 0, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border-light)" }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                  onError={e => {
                    // graceful fallback: show a dark placeholder on load failure
                    e.target.style.background = "var(--navy-700)";
                    e.target.style.display = "none";
                    e.target.parentNode.style.background = "var(--navy-700)";
                    e.target.parentNode.style.display = "flex";
                    e.target.parentNode.style.alignItems = "center";
                    e.target.parentNode.style.justifyContent = "center";
                    e.target.parentNode.innerHTML = `<span style="color:var(--text-muted);font-size:11px;">${img.alt}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20" style={{ background: "var(--navy-900)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionLabel>Careers</SectionLabel>
          <SectionHeading center>Join the BuildCore Family</SectionHeading>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            We're always looking for talented architects, engineers, project managers, and creative minds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:careers@buildcore.in"
              className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase" style={{ display: "inline-block", textDecoration: "none" }}>
              Send Your Resume →
            </a>
            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 rounded text-sm font-bold tracking-wider uppercase"
              style={{ background: "#0A66C2", color: "#fff", textDecoration: "none" }}>
              <LinkedInIcon size={14} color="#fff" /> LinkedIn Careers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

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
    <section className="py-24" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.services.map((s, i) => (
          <div key={i} className="card-hover rounded-xl border overflow-hidden" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
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
        <h2 className="font-bold text-3xl mb-4" style={{ color: "var(--navy-900)", fontFamily: "'Barlow Condensed', sans-serif" }}>Not Sure Which Service You Need?</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(26,26,26,0.8)" }}>Book a free 30-minute consultation. Our experts guide you.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setPage("Contact")} className="px-8 py-3 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "var(--navy-900)", color: "#C8922A" }}>Book Consultation</button>
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded font-bold text-sm tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppSVG size={14} /> WhatsApp Us
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
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Transparent Pricing</SectionLabel>
        <SectionHeading center>Clear Plans. No Hidden Costs.</SectionHeading>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>
          Per square foot pricing with full engineering, procurement, and PM included.
        </p>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.pricing.map((p, i) => (
          <div key={i} className="card-hover rounded-xl border flex flex-col overflow-hidden"
            style={{ background: "var(--navy-800)", borderColor: p.badge ? "var(--gold)" : "var(--border)", borderWidth: p.badge ? 2 : 1 }}>
            {p.badge && (
              <div className="text-center py-2 text-xs font-bold tracking-widest uppercase"
                style={{ background: "var(--gold)", color: "var(--navy-900)" }}>{p.badge}</div>
            )}
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-bold text-2xl mb-1" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.plan}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-bold text-4xl" style={{ color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.price}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{p.unit}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="text-sm flex items-start gap-2" style={{ color: "var(--cream)" }}>
                    <span style={{ color: "var(--gold)" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setPage("Contact")}
                className={`w-full py-3 rounded text-sm font-bold tracking-wider uppercase ${p.badge ? "gold-btn" : "outline-btn"}`}>
                {p.cta}
              </button>
              <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi!%20I'm%20interested%20in%20the%20${p.plan}%20plan.`}
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded text-xs font-bold mt-3"
                style={{ background: "#25D36618", color: "#25D366", border: "1px solid #25D36644", textDecoration: "none" }}>
                <WhatsAppSVG size={13} /> Ask on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs mt-10" style={{ color: "var(--text-muted)" }}>
        * Prices are indicative. Contact us for a site-specific detailed quotation.
      </p>
    </section>
  </div>
);

// ── Projects Page ──────────────────────────────────────────────────────────
const ProjectsPage = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const filters = ["All", "Residential", "Commercial"];
  const filtered = filter === "All" ? data.projects : data.projects.filter(p => p.type === filter);

  return (
    <div className="pt-16">
      {selected && <ProjectModal project={selected} index={selectedIdx} onClose={() => setSelected(null)} />}

      <section className="relative py-28 overflow-hidden">
        <img src={IMGS.projects[0]} alt="projects" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
          <SectionLabel>Our Portfolio</SectionLabel>
          <SectionHeading center>500+ Projects. Countless Stories.</SectionHeading>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>
            Explore our latest completed projects across residential and commercial categories.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--navy-900)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-3 mb-12">
            {filters.map(f => (
              <button key={f} className={`tab-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filtered.map((p, i) => {
              const origIdx = data.projects.indexOf(p);
              return (
                <div key={i} className="card-hover rounded-xl border overflow-hidden cursor-pointer" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}
                  onClick={() => { setSelected(p); setSelectedIdx(origIdx); }}>
                  <div style={{ position: "relative", height: 220 }}>
                    <img src={IMGS.projects[origIdx]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{ background: "rgba(200,146,42,0.9)", color: "var(--navy-900)" }}>{p.type}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 12, left: 16 }}>
                      <p className="text-xs" style={{ color: "rgba(245,240,232,0.7)" }}>📍 {p.location}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>{p.title}</h3>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.year}</span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{p.area} · {p.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>{p.value}</span>
                      <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>View Details →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <SectionHeading center>What Our Clients Say</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.map((t, i) => (
              <div key={i} className="card-hover p-8 rounded-xl border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
                <Stars />
                <p className="text-base leading-relaxed my-5 italic" style={{ color: "var(--cream)" }}>"{t.feedback}"</p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--border-light)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                    style={{ background: "var(--gold)", color: "var(--navy-900)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18 }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--cream)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--gold)" }}>{t.company} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ── Blog Page ──────────────────────────────────────────────────────────────
const BlogPage = () => (
  <div className="pt-16">
    <section className="relative py-28 overflow-hidden">
      <img src={IMGS.blog[0]} alt="blog" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
      <div className="relative max-w-7xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        <SectionLabel>Insights & Resources</SectionLabel>
        <SectionHeading center>The BuildCore Knowledge Hub</SectionHeading>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.75)" }}>
          Expert articles, construction guides, and industry insights.
        </p>
      </div>
    </section>
    <section className="py-24" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.blog.map((b, i) => (
          <div key={i} className="card-hover rounded-xl border overflow-hidden" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
            <div style={{ position: "relative", height: 220 }}>
              <img src={IMGS.blog[i]} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                  style={{ background: "rgba(200,146,42,0.9)", color: "var(--navy-900)" }}>{b.category}</span>
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
    <section className="py-24" style={{ background: "var(--navy-900)" }}>
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        {data.faq.map((f, i) => (
          <details key={i} className="faq-item rounded-xl border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
            <summary className="flex items-center justify-between p-6 gap-4">
              <span className="font-semibold text-base" style={{ color: "var(--cream)" }}>{f.question}</span>
              <span className="text-xl flex-shrink-0" style={{ color: "var(--gold)" }}>+</span>
            </summary>
            <div className="px-6 pb-6 border-t" style={{ borderColor: "var(--border-light)" }}>
              <p className="text-sm leading-relaxed pt-4" style={{ color: "var(--text-muted)" }}>{f.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <div className="max-w-3xl mx-auto px-6 mt-12 p-8 rounded-xl border text-center"
        style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
        <p className="font-bold text-2xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Still have questions?</p>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Our team is happy to answer anything.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setPage("Contact")} className="gold-btn px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
            Contact Us
          </button>
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded text-sm font-bold tracking-wider uppercase"
            style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
            <WhatsAppSVG size={14} /> WhatsApp
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
            <WhatsAppSVG size={16} /> Quick Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--navy-900)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-bold text-2xl mb-8" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Contact Information</h3>
            {[
              { icon: "📍", label: "Address", val: data.contact.address },
              { icon: "📞", label: "Phone", val: data.contact.phone },
              { icon: "✉️", label: "Email", val: data.contact.email },
              { icon: "🕐", label: "Hours", val: data.contact.hours },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 mb-4 p-5 rounded-xl border"
                style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
                <span className="text-xl">{c.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1 font-bold" style={{ color: "var(--gold)" }}>{c.label}</p>
                  <p className="text-sm" style={{ color: "var(--cream)" }}>{c.val}</p>
                </div>
              </div>
            ))}

            <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'd%20like%20a%20consultation.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border mb-6"
              style={{ background: "#25D36614", borderColor: "#25D36644", textDecoration: "none", transition: "all 0.2s", display: "flex" }}
              onMouseOver={e => e.currentTarget.style.background = "#25D36624"}
              onMouseOut={e => e.currentTarget.style.background = "#25D36614"}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-content center"
                style={{ background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <WhatsAppSVG size={22} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#25D366" }}>WhatsApp Us Directly</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>+91 98765 43210 · Instant reply</p>
              </div>
              <span className="ml-auto" style={{ color: "#25D366" }}>→</span>
            </a>

            <div className="p-5 rounded-xl border" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
              <p className="text-xs uppercase tracking-wider font-bold mb-4" style={{ color: "var(--gold)" }}>Follow Us</p>
              <SocialLinks />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a href={data.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg text-xs font-bold"
                  style={{ background: "rgba(225,48,108,0.1)", color: "#E1306C", border: "1px solid rgba(225,48,108,0.3)", textDecoration: "none" }}>
                  <InstagramIcon size={14} color="#E1306C" /> Instagram
                </a>
                <a href={data.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg text-xs font-bold"
                  style={{ background: "rgba(24,119,242,0.1)", color: "#1877F2", border: "1px solid rgba(24,119,242,0.3)", textDecoration: "none" }}>
                  <FacebookIcon size={14} color="#1877F2" /> Facebook
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="p-8 rounded-xl border mb-8" style={{ background: "var(--navy-800)", borderColor: "var(--border-light)" }}>
              {sent ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">✅</p>
                  <h3 className="font-bold text-2xl mb-2" style={{ color: "var(--cream)", fontFamily: "'Barlow Condensed', sans-serif" }}>Message Sent!</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Our team will reach out within 24 hours.</p>
                  <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi!%20I%20just%20submitted%20a%20form.%20Following%20up!`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold"
                    style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
                    <WhatsAppSVG size={14} /> Or Follow Up on WhatsApp
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
                      style={{ background: "var(--navy-600)", border: "1px solid var(--border-light)", color: form.service ? "var(--cream)" : "#9A9A9A", padding: "12px 16px", width: "100%", borderRadius: 4, outline: "none", fontFamily: "'Barlow', sans-serif" }}>
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
                    <WhatsAppSVG size={16} /> Or Message on WhatsApp Instead
                  </a>
                </form>
              )}
            </div>

            <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-light)" }}>
              <div className="p-4 flex items-center gap-3" style={{ background: "var(--navy-800)", borderBottom: "1px solid var(--border)" }}>
                <span className="text-lg">📍</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--cream)" }}>Our Office — Brigade Road, Bangalore</p>
                  <a href="https://maps.google.com/?q=Brigade+Road+Bangalore" target="_blank" rel="noopener noreferrer"
                    className="text-xs font-semibold" style={{ color: "var(--gold)", textDecoration: "none" }}>
                    Open in Google Maps →
                  </a>
                </div>
              </div>
              <iframe
                title="BuildCore Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985285566604!2d77.59219931469194!3d12.971611290856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167aded5e74f%3A0x9f155679a0a93e3!2sBrigade%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%" height="280" style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
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
      case "Home":     return <HomePage {...p} />;
      case "About":    return <AboutPage {...p} />;
      case "Services": return <ServicesPage {...p} />;
      case "Why Us":   return <WhyUsPage {...p} />;
      case "Team":     return <TeamPage />;
      case "Pricing":  return <PricingPage {...p} />;
      case "Projects": return <ProjectsPage />;
      case "Blog":     return <BlogPage />;
      case "FAQ":      return <FAQPage {...p} />;
      case "Contact":  return <ContactPage />;
      default:         return <HomePage {...p} />;
    }
  };

  return (
    <div style={{ background: "var(--navy-900)", minHeight: "100vh", color: "var(--cream)" }}>
      <FontLoader />
      <Navbar page={page} setPage={setPage} scrolled={scrolled} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
      <WhatsAppFloat />
    </div>
  );
}
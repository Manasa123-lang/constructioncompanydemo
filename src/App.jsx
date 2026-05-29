import { useState, useEffect, useRef } from "react";

if (typeof document !== "undefined") {
  document.title = "BuildCore Constructions | Premium Construction Services";
}

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
    * { font-family: 'Barlow', sans-serif; box-sizing: border-box; }
    h1,h2,h3,h4 { font-family: 'Barlow Condensed', sans-serif; }
    :root {
      --gold: #E8A030; --gold-light: #F5C060; --gold-dim: rgba(232,160,48,0.12);
      --gold-border: rgba(232,160,48,0.28); --navy-900: #07050F; --navy-800: #0F0A1E;
      --navy-700: #160E2E; --navy-600: #1C1240; --navy-500: #241652;
      --border: #2A1D5C; --border-light: #362570; --text-muted: #7A6FAA;
      --text-soft: #A89DCE; --cream: #F0EEFF;
      --grad-bg: linear-gradient(160deg, #07050F 0%, #0F0A20 25%, #1A0D3A 55%, #0C0818 100%);
      --grad-section-a: linear-gradient(145deg, #0A071A 0%, #140B30 50%, #08050E 100%);
      --grad-section-b: linear-gradient(145deg, #110D28 0%, #1C1244 60%, #0F0920 100%);
      --grad-card: linear-gradient(145deg, #140E2E 0%, #1C1542 100%);
      --grad-card-hover: linear-gradient(145deg, #1C1644 0%, #261A58 100%);
    }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--navy-900); }
    .gold-btn {
      background: linear-gradient(135deg, #C87820 0%, #F5C060 50%, #C87820 100%);
      background-size: 200% auto; color: #07050F; font-weight: 700; letter-spacing: 0.06em;
      transition: all 0.3s; cursor: pointer; border: none;
    }
    .gold-btn:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(232,160,48,0.45); }
    .outline-btn { border: 1.5px solid var(--gold); color: var(--gold); transition: all 0.25s; background: transparent; cursor: pointer; }
    .outline-btn:hover { background: var(--gold); color: var(--navy-900); box-shadow: 0 6px 20px rgba(232,160,48,0.3); }
    .card-hover { background: var(--grad-card); transition: all 0.3s; }
    .card-hover:hover { background: var(--grad-card-hover); transform: translateY(-5px); border-color: var(--gold) !important; box-shadow: 0 0 0 1px var(--gold), 0 20px 52px rgba(232,160,48,0.18); }
    .section-line::before { content: ''; display: inline-block; width: 40px; height: 2px; background: linear-gradient(90deg, #9B5DE5, var(--gold)); margin-right: 12px; vertical-align: middle; }
    input, textarea, select { background: var(--navy-700) !important; border: 1px solid var(--border-light) !important; color: var(--cream) !important; border-radius: 6px; padding: 12px 16px; width: 100%; outline: none; transition: border-color 0.2s; font-family: 'Barlow', sans-serif; font-size: 14px; }
    input:focus, textarea:focus, select:focus { border-color: var(--gold) !important; box-shadow: 0 0 0 3px rgba(232,160,48,0.12); }
    input::placeholder, textarea::placeholder { color: var(--text-muted); }
    .nav-link { position: relative; color: var(--text-muted); transition: color 0.2s; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; background: none; border: none; cursor: pointer; white-space: nowrap; }
    .nav-link:hover, .nav-link.active { color: var(--gold); }
    .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1.5px; background: linear-gradient(90deg, #9B5DE5, var(--gold)); transition: width 0.25s; }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .faq-item summary { list-style: none; cursor: pointer; }
    .faq-item summary::-webkit-details-marker { display: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
    @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes splashFade { 0%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
    @keyframes splashLogo { 0%{opacity:0;transform:translateY(20px)} 30%{opacity:1;transform:translateY(0)} 80%{opacity:1} 100%{opacity:0} }
    @keyframes modalIn { from{opacity:0;transform:scale(.96) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .slide-in { animation: slideIn 0.7s ease forwards; }
    .star { color: var(--gold); }
    .hero-slide { position: absolute; inset: 0; transition: opacity 1.2s ease; }
    .whatsapp-float { position: fixed; bottom: 28px; right: 28px; z-index: 1000; width: 60px; height: 60px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 24px rgba(37,211,102,0.45); cursor: pointer; transition: all 0.25s; border: none; text-decoration: none; }
    .whatsapp-float:hover { transform: scale(1.12) translateY(-3px); box-shadow: 0 10px 32px rgba(37,211,102,0.55); }
    .whatsapp-tooltip { position: absolute; right: 70px; top: 50%; transform: translateY(-50%); background: var(--navy-800); color: var(--cream); font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 6px; white-space: nowrap; opacity: 0; transition: opacity 0.2s; pointer-events: none; border: 1px solid var(--border-light); }
    .whatsapp-float:hover .whatsapp-tooltip { opacity: 1; }
    .img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(7,5,15,0.35) 0%, rgba(7,5,15,0.8) 100%); }
    .social-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.22s; text-decoration: none; border: 1px solid var(--border-light); background: var(--navy-700); }
    .social-icon:hover { transform: translateY(-3px); border-color: var(--gold); background: var(--gold-dim); }
    .social-platform-card { border-radius: 20px; padding: 28px 24px 24px; position: relative; overflow: hidden; transition: all 0.38s cubic-bezier(.25,.8,.25,1); cursor: pointer; text-decoration: none; display: block; }
    .social-platform-card:hover { transform: translateY(-10px); box-shadow: 0 28px 64px rgba(0,0,0,.5); }
    .social-platform-card::before { content: ''; position: absolute; top: -60px; right: -60px; width: 180px; height: 180px; border-radius: 50%; background: rgba(255,255,255,0.07); pointer-events: none; }
    .social-platform-card::after { content: ''; position: absolute; bottom: -40px; left: -40px; width: 130px; height: 130px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
    .spc-ig { background: linear-gradient(135deg, #6A0DAD 0%, #C13584 45%, #F77737 100%); }
    .spc-fb { background: linear-gradient(135deg, #1a3c8c 0%, #1877F2 100%); }
    .spc-li { background: linear-gradient(135deg, #0a3060 0%, #0A66C2 100%); }
    .spc-yt { background: linear-gradient(135deg, #8B0000 0%, #FF0000 100%); }
    .spc-stat { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; background: rgba(255,255,255,0.18); backdrop-filter: blur(4px); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; }
    .follow-icon-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; text-decoration: none; transition: all 0.3s; }
    .follow-icon-btn:hover { transform: translateY(-5px); }
    .follow-icon-ring { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; transition: all 0.3s; }
    .follow-icon-btn:hover .follow-icon-ring { box-shadow: 0 12px 32px rgba(0,0,0,.4); }
    .fir-ig { background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); }
    .fir-fb { background: linear-gradient(135deg, #1877F2, #0d5fc0); }
    .fir-li { background: linear-gradient(135deg, #0A66C2, #0a3060); }
    .fir-yt { background: linear-gradient(135deg, #FF0000, #8B0000); }
    .fir-wa { background: linear-gradient(135deg, #25D366, #128C7E); }
    .feed-item { border-radius: 10px; overflow: hidden; position: relative; cursor: pointer; }
    .feed-item img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.4s; }
    .feed-item:hover img { transform: scale(1.08); }
    .feed-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(90,20,180,0.75) 0%, transparent 55%); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 10px; }
    .feed-item:hover .feed-overlay { opacity: 1; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(7,5,15,0.93); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(10px); animation: fadeIn .2s ease; }
    .modal-box { background: var(--grad-card); border: 1px solid var(--border-light); border-radius: 18px; max-width: 860px; width: 100%; max-height: 92vh; overflow-y: auto; animation: modalIn .3s ease; }
    .auth-modal-box { background: linear-gradient(145deg,#0F0A1E,#180D38); border: 1px solid var(--border-light); border-radius: 20px; width: 100%; max-width: 440px; animation: modalIn .3s ease; overflow: hidden; }
    .tab-btn { padding: 8px 20px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
    .tab-btn.active { background: linear-gradient(135deg, #7C3AED, var(--gold)); color: #fff; border: none; }
    .tab-btn:not(.active) { background: transparent; color: var(--text-muted); border: 1px solid var(--border-light); }
    .tab-btn:not(.active):hover { border-color: var(--gold); color: var(--gold); }
    .team-hcard { display: flex; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-light); background: var(--grad-card); transition: all 0.3s; cursor: pointer; }
    .team-hcard:hover { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold), 0 20px 56px rgba(232,160,48,0.16); transform: translateY(-4px); }
    .team-hcard:hover .team-hcard-photo img { transform: scale(1.06); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--navy-900); }
    ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold); }
    .icon-box { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(232,160,48,0.15), rgba(155,93,229,0.15)); border: 1px solid rgba(232,160,48,0.25); margin-bottom: 16px; flex-shrink: 0; }
    .icon-box-sm { width: 44px; height: 44px; border-radius: 11px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(232,160,48,0.12), rgba(155,93,229,0.12)); border: 1px solid rgba(232,160,48,0.2); flex-shrink: 0; }
    .process-icon-wrap { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #C87820, #F5C060); margin: 0 auto 16px; box-shadow: 0 8px 24px rgba(232,160,48,0.35); }
    .why-icon-wrap { width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(232,160,48,0.18), rgba(155,93,229,0.18)); border: 1px solid rgba(232,160,48,0.3); margin-bottom: 16px; }
    .splash-screen { position: fixed; inset: 0; z-index: 9999; background: linear-gradient(135deg, #07050F 0%, #1A0D3A 60%, #07050F 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; animation: splashFade 2.8s ease forwards; pointer-events: none; }
    .splash-logo { animation: splashLogo 2.8s ease forwards; text-align: center; }
    .splash-bar { width: 120px; height: 3px; border-radius: 2px; margin-top: 24px; background: linear-gradient(90deg, #9B5DE5, var(--gold)); animation: splashLogo 2.8s ease forwards; }
    .back-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; border: 1.5px solid var(--border-light); background: transparent; color: var(--cream); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-decoration: none; }
    .back-btn:hover { border-color: var(--gold); color: var(--gold); }
    .gallery-thumb { border-radius: 8px; overflow: hidden; cursor: pointer; transition: border .2s, transform .2s; }
    .gallery-thumb:hover { transform: scale(1.04); }
    .gallery-thumb img { width: 100%; height: 80px; object-fit: cover; display: block; transition: transform .3s; }
    .gallery-thumb:hover img { transform: scale(1.08); }
    .auth-tab { padding: 10px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all .2s; border: none; background: transparent; flex: 1; }
    .auth-tab.active { color: var(--gold); border-bottom: 2px solid var(--gold); }
    .auth-tab:not(.active) { color: var(--text-muted); border-bottom: 2px solid transparent; }
    .auth-tab:not(.active):hover { color: var(--cream); }
    .user-dropdown { position: absolute; top: calc(100% + 10px); right: 0; background: linear-gradient(145deg,#0F0A1E,#180D38); border: 1px solid var(--border-light); border-radius: 14px; min-width: 220px; z-index: 200; animation: modalIn .2s ease; box-shadow: 0 20px 48px rgba(0,0,0,.6); overflow: hidden; }
    .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 12px 18px; font-size: 13px; color: var(--text-soft); cursor: pointer; transition: all .18s; border: none; background: transparent; width: 100%; text-align: left; }
    .dropdown-item:hover { background: var(--gold-dim); color: var(--cream); }
    .dropdown-item.danger:hover { background: rgba(239,68,68,.12); color: #EF4444; }
    .profile-stat-card { padding: 20px 24px; border-radius: 14px; background: var(--grad-card); border: 1px solid var(--border-light); text-align: center; transition: all .25s; }
    .profile-stat-card:hover { border-color: var(--gold); transform: translateY(-3px); }
    .profile-activity-row { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 10px; background: linear-gradient(145deg,#140E2E,#1A1240); border: 1px solid var(--border-light); transition: all .2s; cursor: default; }
    .profile-activity-row:hover { border-color: var(--gold); }
    .edit-btn { padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: all .2s; border: 1.5px solid var(--border-light); background: transparent; color: var(--text-muted); }
    .edit-btn:hover { border-color: var(--gold); color: var(--gold); }
    .edit-btn.active { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }
    .booking-step-card { border-radius: 16px; border: 1px solid var(--border-light); background: var(--grad-card); padding: 28px; transition: all .25s; cursor: pointer; }
    .booking-step-card:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(232,160,48,.15); }
    .booking-step-card.selected { border-color: var(--gold); background: linear-gradient(145deg, #1C1644, #261A58); box-shadow: 0 0 0 1px var(--gold), 0 16px 40px rgba(232,160,48,.18); }
    .slot-btn { padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-light); background: var(--navy-700); color: var(--cream); font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; text-align: center; }
    .slot-btn:hover { border-color: var(--gold); color: var(--gold); }
    .slot-btn.selected { border-color: var(--gold); background: rgba(232,160,48,.15); color: var(--gold); }
    .slot-btn.disabled { opacity: .35; cursor: not-allowed; text-decoration: line-through; }
    .stepper-dot { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; transition: all .3s; flex-shrink: 0; }
    .stepper-dot.done { background: linear-gradient(135deg,#C87820,#F5C060); color: var(--navy-900); }
    .stepper-dot.active { background: linear-gradient(135deg,#7C3AED,var(--gold)); color: #fff; box-shadow: 0 0 0 4px rgba(232,160,48,.2); }
    .stepper-dot.pending { background: var(--navy-600); color: var(--text-muted); border: 1px solid var(--border-light); }
    .stepper-line { flex: 1; height: 2px; background: var(--border-light); transition: background .3s; }
    .stepper-line.done { background: linear-gradient(90deg,#C87820,#F5C060); }
    .cal-day { width: 100%; aspect-ratio: 1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; border: 1px solid transparent; }
    .cal-day:hover:not(.cal-disabled):not(.cal-selected) { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
    .cal-day.cal-selected { background: linear-gradient(135deg,#C87820,#F5C060); color: var(--navy-900); border-color: transparent; font-weight: 800; }
    .cal-day.cal-disabled { opacity: .3; cursor: not-allowed; }
    .cal-day.cal-today { border-color: rgba(232,160,48,.4); color: var(--gold); }
    .summary-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid var(--border); gap: 16px; }
    .summary-row:last-child { border-bottom: none; }
  `}</style>
);

const InstagramIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/></svg>;
const FacebookIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const LinkedInIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
const YouTubeIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1A1A1A"/></svg>;
const WhatsAppSVG=({size=16})=><svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.863L2 30l7.343-1.76A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.35 18.912c-.347-.174-2.057-1.015-2.376-1.13-.32-.117-.553-.174-.786.174-.233.348-.903 1.13-1.107 1.363-.204.232-.407.26-.754.087-.347-.174-1.465-.54-2.79-1.72-1.03-.918-1.726-2.052-1.93-2.4-.203-.347-.022-.534.153-.707.157-.155.347-.405.52-.607.175-.203.233-.348.349-.58.116-.233.058-.437-.03-.61-.087-.174-.786-1.893-1.077-2.594-.284-.681-.572-.588-.786-.599l-.668-.012c-.233 0-.61.087-.93.435-.32.347-1.223 1.194-1.223 2.913s1.252 3.38 1.427 3.613c.174.232 2.464 3.763 5.97 5.277.834.36 1.485.575 1.993.736.837.267 1.6.23 2.202.14.672-.101 2.057-.842 2.348-1.655.29-.813.29-1.51.203-1.656-.086-.145-.32-.232-.668-.406z"/></svg>;
const HardHatIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M12 4a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8z"/><path d="M12 4v4M4 12v2a8 8 0 0 0 16 0v-2"/></svg>;
const ClockIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const BrickIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="5" rx="1"/><rect x="2" y="12" width="9" height="5" rx="1"/><rect x="13" y="12" width="9" height="5" rx="1"/><line x1="7" y1="7" x2="7" y2="12"/><line x1="17" y1="7" x2="17" y2="12"/></svg>;
const CompassIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} opacity="0.3"/></svg>;
const ShieldCheckIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
const HeadphonesIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
const MessageSquareIcon=({size=24,color="var(--navy-900)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const FileTextIcon=({size=24,color="var(--navy-900)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const ConstructIcon=({size=24,color="var(--navy-900)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="6" height="4"/><rect x="16" y="3" width="6" height="4"/><rect x="9" y="3" width="6" height="4"/><path d="M4 7v10M20 7v10M12 7v10"/><path d="M2 17h20"/></svg>;
const KeyIcon=({size=24,color="var(--navy-900)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const SearchIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const TrophyIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/><rect x="6" y="18" width="12" height="4"/><line x1="12" y1="9" x2="12" y2="13"/><path d="M6 9a6 6 0 0 0 12 0"/></svg>;
const UsersIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CalendarCheckIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/></svg>;
const LeafIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34c-.38.57-.55 1.29-.2 1.9.72 1.26 2.3.6 3.4-.19C9.72 19.25 14 17 22 17c0-5.02-2.69-9-5-9z"/><path d="M3.83 19.35L12 13"/></svg>;
const SmartphoneIcon=({size=24,color="var(--gold)"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const HomeIcon2=({size=20,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BuildingIcon=({size=20,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22V12h6v10"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/></svg>;
const ArrowLeftIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const UserIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LogOutIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const LockIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const MailIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const EditIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const HeartIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const FileIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const CheckCircleIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const BellIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const MapPinIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const EyeIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOffIcon=({size=16,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const CheckIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ChevronLeftIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRightIcon=({size=18,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;

const IMGS = {
  heroSlides: [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
  ],
  heroCaptions: [
    { tag: "Residential Excellence", heading: "Building Strong Foundations for the Future" },
    { tag: "Commercial Projects",    heading: "Spaces That Drive Business Forward" },
    { tag: "Premium Interiors",      heading: "Designed for Life. Built to Last." },
    { tag: "Modern Architecture",    heading: "Where Vision Meets Craftsmanship" },
  ],
  about:     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  aboutOffice:"https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80",
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
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
  ],
  ctaBg:      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1400&q=80",
  contactBg:  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  pricingBg:  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
  whyUsBg:    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
  teamHero:   "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80",
  bookingBg:  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
  cultureOffice:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  cultureConstruction:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  cultureTeam:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  cultureAwards:"https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
  feed: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
    "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  ],
};

const data = {
  // ── Navbar: "Booking" removed from links ──
  navbar: { logo:"BuildCore", links:["Home","About","Services","Why Us","Team","Pricing","Projects","FAQ","Contact"] },
  home: {
    stats:[
      {value:"500+",label:"Projects Completed"},
      {value:"15+",label:"Years Experience"},
      {value:"200+",label:"Expert Engineers"},
      {value:"98%",label:"Client Satisfaction"},
    ],
    features:[
      {icon:"engineer",title:"Expert Engineers",description:"Highly skilled professionals delivering precision and quality in every single project."},
      {icon:"clock",title:"On-Time Delivery",description:"We ensure your projects are completed within deadlines, every time, without compromise."},
      {icon:"brick",title:"Premium Materials",description:"Only top-grade ISI-certified materials for long-lasting durability and structural integrity."},
      {icon:"compass",title:"Modern Design",description:"Contemporary architectural designs tailored to your lifestyle, taste, and vision."},
      {icon:"shield",title:"Quality Assured",description:"Rigorous quality checks at every stage to exceed industry standards."},
      {icon:"support",title:"Dedicated Support",description:"Project managers available at every step to keep you informed and at ease."},
    ],
    process:[
      {step:"01",iconType:"consult",title:"Consultation",desc:"Free 30-min discovery call to understand your vision and requirements."},
      {step:"02",iconType:"design",title:"Design & Quote",desc:"Detailed architectural design and transparent itemized quotation."},
      {step:"03",iconType:"construct",title:"Construction",desc:"Professional execution with weekly progress updates and site visits."},
      {step:"04",iconType:"handover",title:"Handover",desc:"Quality-verified final handover with warranty documentation."},
    ],
    testimonialsPreview:[
      {name:"Ravi Kumar",role:"Homeowner, Bangalore",feedback:"BuildCore delivered our dream home on time with outstanding quality. Absolutely professional team!",rating:5},
      {name:"Anita Reddy",role:"Property Developer",feedback:"Exceptional workmanship and attention to detail. They truly understand commercial construction.",rating:5},
      {name:"Suresh Nair",role:"Business Owner",feedback:"Our office was completed ahead of schedule. Complete transparency throughout the project.",rating:5},
    ],
  },
  about:{
    intro:"BuildCore Constructions is a leading construction company delivering reliable, innovative, and high-quality building solutions across India since 2009.",
    mission:"To deliver exceptional construction services with integrity, transparency, and uncompromising professionalism — transforming visions into enduring structures.",
    vision:"To become India's most trusted construction brand, setting new benchmarks in quality, sustainability, and design.",
    values:["Integrity in every brick we lay","Precision in every plan we execute","Safety as our non-negotiable priority","Innovation driving every project forward"],
    awards:["Best Construction Company — Karnataka 2023","ISO 9001:2015 Certified","CREDAI Member","Green Building Council Partner"],
  },
  team:[
    {name:"Arjun Mehta",role:"Founder & CEO",exp:"20+ years",dept:"Leadership",projects:300,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Arjun founded BuildCore in 2009 with a vision to redefine construction standards in India. A civil engineering graduate from IIT Bombay, he has personally led over 300 landmark projects.",skills:["Strategic Leadership","Civil Engineering","Business Development","Project Finance"]},
    {name:"Priya Sharma",role:"Head of Projects",exp:"14 years",dept:"Operations",projects:180,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Priya oversees all project delivery operations, ensuring timelines, budgets, and quality benchmarks are met across every active site.",skills:["Project Management","Site Operations","Risk Management","Team Leadership"]},
    {name:"Vikram Rao",role:"Chief Architect",exp:"18 years",dept:"Design",projects:220,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"An award-winning architect who has designed iconic residential and commercial landmarks across India.",skills:["Architecture","3D Visualization","Sustainable Design","AutoCAD / Revit"]},
    {name:"Deepa Iyer",role:"Interior Design Lead",exp:"12 years",dept:"Design",projects:140,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Deepa creates stunning interiors that balance aesthetics with functionality. Her work has been featured in Architectural Digest India.",skills:["Interior Design","Space Planning","Material Sourcing","Client Styling"]},
    {name:"Rohan Desai",role:"Structural Engineer",exp:"16 years",dept:"Engineering",projects:260,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Rohan ensures every structure BuildCore builds is engineered to outlast generations.",skills:["Structural Analysis","Foundation Engineering","Seismic Design","AutoCAD Structural"]},
    {name:"Nisha Patel",role:"Client Relations Manager",exp:"9 years",dept:"Client Success",projects:400,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Nisha is the face clients interact with throughout their entire project journey.",skills:["Client Management","Communication","CRM Systems","Conflict Resolution"]},
    {name:"Sameer Joshi",role:"Site Director",exp:"15 years",dept:"Operations",projects:190,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Sameer manages on-ground operations across all active construction sites.",skills:["Site Management","Safety Compliance","Contractor Relations","Scheduling"]},
    {name:"Kavya Menon",role:"Sustainability Lead",exp:"10 years",dept:"Green Initiatives",projects:80,linkedin:"https://linkedin.com",instagram:"https://instagram.com",bio:"Kavya drives BuildCore's green building program — from LEED certifications to eco-material sourcing.",skills:["LEED Consulting","Eco Materials","Energy Auditing","Solar Systems"]},
  ],
  whyUs:{
    headline:"Why 500+ Families & Businesses Chose BuildCore",
    subtitle:"We don't just build structures — we build trust, one project at a time.",
    stats:[{value:"500+",label:"Projects Delivered",iconType:"build"},{value:"₹0",label:"Hidden Charges. Ever.",iconType:"money"},{value:"48hr",label:"Quote Turnaround",iconType:"fast"},{value:"10yr",label:"Max Warranty",iconType:"shield"}],
    pillars:[
      {iconType:"search",title:"Full Transparency",description:"Itemized quotes, weekly reports, real-time dashboards. You always know where your money goes.",highlight:"No surprise costs"},
      {iconType:"trophy",title:"Award-Winning Quality",description:"ISO 9001:2015 certified processes, ISI-certified materials, and 6-stage quality inspections.",highlight:"ISO Certified"},
      {iconType:"users",title:"In-House Expertise",description:"We employ our own engineers, architects, and site managers — no subcontracting your dreams.",highlight:"200+ In-house experts"},
      {iconType:"calendar",title:"Strict Timelines",description:"92% of our projects delivered on or before the committed date. Deadlines are promises.",highlight:"92% on-time record"},
      {iconType:"leaf",title:"Sustainable Practices",description:"Green building materials and LEED consultation are standard offerings, not add-ons.",highlight:"LEED Certified designs"},
      {iconType:"phone",title:"Tech-Enabled Projects",description:"Live project tracking, digital approvals, and a dedicated project app for every client.",highlight:"Real-time updates"},
    ],
    comparison:[
      {feature:"Transparent Itemized Quotes",us:true,others:false},
      {feature:"In-House Engineers (No Subcontracting)",us:true,others:false},
      {feature:"Dedicated Project Manager",us:true,others:false},
      {feature:"Weekly Progress Reports",us:true,others:false},
      {feature:"Structural Warranty (up to 10 years)",us:true,others:false},
      {feature:"Government Approval Handling",us:true,others:false},
      {feature:"3D Design Visualization",us:true,others:false},
      {feature:"Post-Handover Support",us:true,others:false},
    ],
    testimonialHighlight:{quote:"I've worked with three other builders before BuildCore. The difference is night and day — in transparency, in quality, and in how much they genuinely care. Our villa was delivered 12 days ahead of schedule.",name:"Meera Krishnan",role:"Homeowner, Pune",avatar:"MK"},
  },
  services:[
    {icon:"🏠",title:"Residential Construction",description:"Custom homes built with precision engineering and modern design philosophy.",items:["Villa Construction","Luxury Apartments","Row Houses","Renovation & Remodeling"]},
    {icon:"🏢",title:"Commercial Construction",description:"Scalable, efficient commercial buildings that drive business performance.",items:["Office Complexes","Retail Spaces","Warehouses","IT Parks"]},
    {icon:"🎨",title:"Interior Design",description:"Functional, stunning interiors crafted to reflect your identity and lifestyle.",items:["Modular Kitchens","Office Interiors","Space Planning","False Ceilings"]},
    {icon:"🏗️",title:"Structural Engineering",description:"Expert structural analysis and engineering for safe, enduring foundations.",items:["Soil Testing","Foundation Design","Structural Audits","Retrofit Solutions"]},
    {icon:"🌿",title:"Green Construction",description:"Eco-conscious building practices that reduce your environmental footprint.",items:["LEED Consulting","Solar Integration","Rainwater Harvesting","Sustainable Materials"]},
    {icon:"📋",title:"Project Management",description:"End-to-end project management ensuring timelines, budget, and quality.",items:["Site Supervision","Contractor Coordination","Progress Reporting","Budget Tracking"]},
  ],
  pricing:[
    {plan:"Essential",price:"₹1,500",unit:"per sq ft",badge:null,features:["Standard Grade Materials","Basic Architectural Design","Structural Engineering","1 Year Warranty","Monthly Progress Reports","Site Manager Assigned"],cta:"Get Started"},
    {plan:"Premium",price:"₹2,500",unit:"per sq ft",badge:"Most Popular",features:["High-Quality Materials","Custom Architectural Design","Interior Design Package","5 Year Warranty","Weekly Progress Reports","Dedicated Project Manager","3D Visualization"],cta:"Get Started"},
    {plan:"Luxury",price:"₹4,000",unit:"per sq ft",badge:null,features:["Premium Imported Materials","Bespoke Design & Architecture","Full Interior Package","10 Year Warranty","Real-time Progress Dashboard","Senior PM + Architect","Smart Home Integration","Landscape Design"],cta:"Get Started"},
  ],
  projects:[
    {title:"Whitefield Luxury Villas",type:"Residential",area:"4,200 sq ft",year:"2024",location:"Bangalore",client:"Private Homeowner",duration:"14 months",value:"₹2.8 Cr",description:"A stunning cluster of 6 premium villas featuring smart home automation, landscaped gardens, and a community pool.",highlights:["Smart Home Integration","Rainwater Harvesting","Community Pool","Landscaped Gardens"],longDesc:"The Whitefield Luxury Villas project is a landmark residential development in Bangalore's thriving eastern corridor. Spread across 1.2 acres, the cluster of six independent villas was designed to offer an unparalleled lifestyle experience combining modern architecture with thoughtful sustainability features. Each villa features 4 bedrooms, a private terrace, and a smart home system that controls lighting, security, and climate. The project was completed 12 days ahead of schedule and earned a Green Building certification."},
    {title:"TechHub Office Complex",type:"Commercial",area:"28,000 sq ft",year:"2024",location:"Hyderabad",client:"TechHub Ventures Pvt. Ltd.",duration:"18 months",value:"₹14.5 Cr",description:"A cutting-edge 7-floor commercial complex with open-plan offices, conference suites, a rooftop café, and LEED Gold certification.",highlights:["LEED Gold Certified","Rooftop Café","EV Charging Bays","Seismic-Safe Structure"],longDesc:"TechHub Office Complex redefines the modern workplace in Hyderabad's HITEC City. The 7-storey building features column-free open-plan floors, state-of-the-art conference suites, and a rooftop café with panoramic city views. BuildCore engineered the structure to exceed seismic safety standards while achieving LEED Gold certification."},
    {title:"Coastal Retreat",type:"Residential",area:"6,800 sq ft",year:"2023",location:"Goa",client:"Mr. Sameer D'Souza",duration:"16 months",value:"₹4.2 Cr",description:"An oceanfront private villa blending contemporary architecture with natural stone and wood.",highlights:["Oceanfront Location","Private Pool Deck","Natural Stone Finish","Outdoor Cinema"],longDesc:"Perched on a cliff overlooking the Arabian Sea, Coastal Retreat is BuildCore's most visually striking residential project."},
    {title:"Grand Retail Mall",type:"Commercial",area:"85,000 sq ft",year:"2023",location:"Chennai",client:"Grand Retail Corp.",duration:"28 months",value:"₹48 Cr",description:"A landmark multi-level retail destination with 120 stores, 2 food courts, an IMAX theatre.",highlights:["120 Retail Stores","IMAX Theatre","600 Parking Slots","Central HVAC System"],longDesc:"Grand Retail Mall in Chennai stands as one of BuildCore's most ambitious commercial undertakings."},
    {title:"Skyline Apartments",type:"Residential",area:"12,500 sq ft",year:"2023",location:"Pune",client:"Skyline Realty Group",duration:"20 months",value:"₹7.8 Cr",description:"A boutique residential tower with 18 premium 3BHK apartments and a rooftop terrace.",highlights:["18 Premium 3BHK Units","Rooftop Terrace","Fitness Centre","EV Parking"],longDesc:"Skyline Apartments introduced boutique high-rise living to Pune's Koregaon Park neighbourhood."},
    {title:"Corporate HQ — Infra Co.",type:"Commercial",area:"42,000 sq ft",year:"2022",location:"Mumbai",client:"Infra Co. Ltd.",duration:"22 months",value:"₹22 Cr",description:"Infra Co.'s flagship headquarters featuring a grand atrium lobby and sky garden.",highlights:["Grand Atrium Lobby","Training Auditorium","Sky Garden","24/7 Backup Power"],longDesc:"Infra Co.'s new headquarters in Mumbai's BKC district is a statement of corporate ambition."},
  ],
  testimonials:[
    {name:"Ravi Kumar",company:"Homeowner",location:"Bangalore",feedback:"BuildCore delivered our dream villa on time and within budget. The quality of construction and finishing exceeded every expectation.",rating:5},
    {name:"Anita Reddy",company:"Real Estate Developer",location:"Hyderabad",feedback:"I've worked with many contractors, but BuildCore is on a different level. Exceptional quality control and flawless execution.",rating:5},
    {name:"Suresh Nair",company:"Business Owner",location:"Chennai",feedback:"Our retail outlet was handed over ahead of schedule. Zero surprises — pure professionalism.",rating:5},
    {name:"Meera Krishnan",company:"Homeowner",location:"Pune",feedback:"From design consultation to final handover, BuildCore was outstanding. Our home is more beautiful than we ever imagined.",rating:5},
  ],
  faq:[
    {question:"How long does residential construction typically take?",answer:"Project timelines vary based on size and complexity. A standard villa typically takes 10–14 months, while apartments may take 18–24 months. We provide a detailed project timeline before work begins."},
    {question:"Do you provide architectural and interior design services?",answer:"Yes, we offer complete design-build solutions — from concept architecture and 3D visualization to interior design, furnishing guidance, and landscaping."},
    {question:"What materials do you use? Can I choose my own?",answer:"We use premium, ISI-certified materials across all plans. Clients on Premium and Luxury plans can co-select materials and finishes."},
    {question:"Is there a warranty on construction?",answer:"Yes. Essential plan includes a 1-year structural warranty, Premium offers 5 years, and Luxury comes with a 10-year comprehensive warranty."},
    {question:"How do you handle cost overruns?",answer:"We provide a detailed, itemized quote before starting. Any scope changes are discussed transparently with written approval. No surprise costs — ever."},
    {question:"Do you handle government approvals and permits?",answer:"Absolutely. Our team manages all BBMP / BDA approvals, building plan sanctions, occupancy certificates, and other regulatory requirements."},
  ],
  contact:{
    email:"info@buildcore.in",phone:"+91 98765 43210",whatsapp:"919876543210",
    address:"12, Brigade Road, Bangalore — 560001, Karnataka",
    hours:"Mon–Sat: 9:00 AM – 6:00 PM",
  },
  social:{instagram:"https://www.instagram.com/",facebook:"https://www.facebook.com/",linkedin:"https://www.linkedin.com/",youtube:"https://www.youtube.com/"},
  footer:{text:"© 2026 BuildCore Constructions Pvt. Ltd. All rights reserved.",links:["Privacy Policy","Terms of Service","Support"],tagline:"Built on Trust. Delivered with Pride."},
};

const FeatureIcon = ({ type }) => {
  const map = { engineer:<HardHatIcon/>, clock:<ClockIcon/>, brick:<BrickIcon/>, compass:<CompassIcon/>, shield:<ShieldCheckIcon/>, support:<HeadphonesIcon/> };
  return <div className="icon-box">{map[type] || <HardHatIcon />}</div>;
};
const ProcessIcon = ({ type }) => {
  const map = { consult:<MessageSquareIcon/>, design:<FileTextIcon/>, construct:<ConstructIcon/>, handover:<KeyIcon/> };
  return <div className="process-icon-wrap">{map[type] || <MessageSquareIcon />}</div>;
};
const WhyIcon = ({ type }) => {
  const map = { search:<SearchIcon/>, trophy:<TrophyIcon/>, users:<UsersIcon/>, calendar:<CalendarCheckIcon/>, leaf:<LeafIcon/>, phone:<SmartphoneIcon/> };
  return <div className="why-icon-wrap">{map[type] || <SearchIcon />}</div>;
};

const SectionLabel=({children})=>(
  <p className="section-line" style={{color:"var(--gold)",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>{children}</p>
);
const SectionHeading=({children,center=false})=>(
  <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:800,lineHeight:1.08,marginBottom:16,textAlign:center?"center":"left"}}>{children}</h2>
);
const Stars=()=><div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(i=><span key={i} className="star">★</span>)}</div>;

const SocialLinks=({size="normal"})=>{
  const s=size==="large"?22:18,w=size==="large"?48:40;
  return<div style={{display:"flex",gap:12}}>
    <a href={data.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" style={{width:w,height:w,background:"var(--navy-600)"}}><InstagramIcon size={s} color="#E1306C"/></a>
    <a href={data.social.facebook}  target="_blank" rel="noopener noreferrer" className="social-icon" style={{width:w,height:w,background:"var(--navy-600)"}}><FacebookIcon  size={s} color="#1877F2"/></a>
    <a href={data.social.linkedin}  target="_blank" rel="noopener noreferrer" className="social-icon" style={{width:w,height:w,background:"var(--navy-600)"}}><LinkedInIcon  size={s} color="#0A66C2"/></a>
    <a href={data.social.youtube}   target="_blank" rel="noopener noreferrer" className="social-icon" style={{width:w,height:w,background:"var(--navy-600)"}}><YouTubeIcon   size={s} color="#FF0000"/></a>
  </div>;
};

const WhatsAppFloat=()=>(
  <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20BuildCore!%20I'm%20interested%20in%20a%20construction%20quote.`}
    target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
    <div className="whatsapp-tooltip">Chat with us!</div>
    <svg width="28" height="28" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.783 6.863L2 30l7.343-1.76A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.35 18.912c-.347-.174-2.057-1.015-2.376-1.13-.32-.117-.553-.174-.786.174-.233.348-.903 1.13-1.107 1.363-.204.232-.407.26-.754.087-.347-.174-1.465-.54-2.79-1.72-1.03-.918-1.726-2.052-1.93-2.4-.203-.347-.022-.534.153-.707.157-.155.347-.405.52-.607.175-.203.233-.348.349-.58.116-.233.058-.437-.03-.61-.087-.174-.786-1.893-1.077-2.594-.284-.681-.572-.588-.786-.599l-.668-.012c-.233 0-.61.087-.93.435-.32.347-1.223 1.194-1.223 2.913s1.252 3.38 1.427 3.613c.174.232 2.464 3.763 5.97 5.277.834.36 1.485.575 1.993.736.837.267 1.6.23 2.202.14.672-.101 2.057-.842 2.348-1.655.29-.813.29-1.51.203-1.656-.086-.145-.32-.232-.668-.406z"/></svg>
  </a>
);

const SplashScreen=()=>(
  <div className="splash-screen">
    <div className="splash-logo">
      <p style={{fontSize:52,fontWeight:800,letterSpacing:"0.12em",fontFamily:"'Barlow Condensed',sans-serif",color:"var(--gold)",lineHeight:1}}>
        BUILD<span style={{color:"var(--cream)"}}>CORE</span>
      </p>
      <p style={{fontSize:13,color:"rgba(240,238,255,0.55)",letterSpacing:"0.2em",textTransform:"uppercase",marginTop:8}}>Constructions</p>
      <div className="splash-bar"/>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   AUTH SYSTEM
   ══════════════════════════════════════════════════════════════════ */
const USERS_DB = [
  { id:1, name:"Ravi Kumar", email:"ravi@example.com", password:"password123", phone:"+91 98765 00001", location:"Bangalore", joinDate:"Jan 2025", avatar:"RK", plan:"Premium", savedProjects:["Whitefield Luxury Villas","Skyline Apartments"], inquiries:3 },
];

const AuthModal = ({ onClose, onLogin }) => {
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email:"", password:"" });
  const [signupForm, setSignupForm] = useState({ name:"", email:"", phone:"", password:"", confirm:"" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    setTimeout(() => {
      const user = USERS_DB.find(u => u.email === loginForm.email && u.password === loginForm.password);
      if (user) { onLogin(user); onClose(); } else { setError("Invalid email or password. Try: ravi@example.com / password123"); }
      setLoading(false);
    }, 800);
  };

  const handleSignup = (e) => {
    e.preventDefault(); setError("");
    if (signupForm.password !== signupForm.confirm) { setError("Passwords don't match."); return; }
    if (signupForm.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (USERS_DB.find(u => u.email === signupForm.email)) { setError("Email already registered. Please log in."); return; }
    setLoading(true);
    setTimeout(() => {
      const newUser = { id:USERS_DB.length+1, name:signupForm.name, email:signupForm.email, password:signupForm.password, phone:signupForm.phone||"Not provided", location:"India", joinDate:new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"}), avatar:signupForm.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase(), plan:"Essential", savedProjects:[], inquiries:0 };
      USERS_DB.push(newUser); onLogin(newUser); onClose(); setLoading(false);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal-box" onClick={e=>e.stopPropagation()}>
        <div style={{padding:"28px 28px 0",textAlign:"center"}}>
          <button onClick={onClose} style={{float:"right",background:"var(--navy-600)",border:"1px solid var(--border-light)",color:"var(--cream)",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:13}}>✕</button>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,rgba(232,160,48,.18),rgba(155,93,229,.18))",border:"1px solid rgba(232,160,48,.3)",marginBottom:14}}>
            <UserIcon size={24} color="var(--gold)"/>
          </div>
          <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:4}}>{tab==="login"?"Welcome Back":"Create Account"}</h2>
          <p style={{fontSize:12,color:"var(--text-muted)",marginBottom:0}}>{tab==="login"?"Sign in to your BuildCore account":"Join thousands of happy BuildCore clients"}</p>
        </div>
        <div style={{display:"flex",borderBottom:"1px solid var(--border-light)",margin:"20px 28px 0"}}>
          <button className={`auth-tab ${tab==="login"?"active":""}`} onClick={()=>{setTab("login");setError("");}}>Sign In</button>
          <button className={`auth-tab ${tab==="signup"?"active":""}`} onClick={()=>{setTab("signup");setError("");}}>Create Account</button>
        </div>
        <div style={{padding:"24px 28px 28px"}}>
          {error&&<div style={{padding:"10px 14px",borderRadius:8,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",color:"#EF4444",fontSize:12,marginBottom:16}}>⚠ {error}</div>}
          {tab==="login"?(
            <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Email Address</label>
                <div style={{position:"relative"}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><MailIcon size={15} color="var(--text-muted)"/></span>
                  <input required type="email" placeholder="you@email.com" value={loginForm.email} onChange={e=>setLoginForm(p=>({...p,email:e.target.value}))} style={{paddingLeft:40}}/></div></div>
              <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Password</label>
                <div style={{position:"relative"}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><LockIcon size={15} color="var(--text-muted)"/></span>
                  <input required type={showPw?"text":"password"} placeholder="Your password" value={loginForm.password} onChange={e=>setLoginForm(p=>({...p,password:e.target.value}))} style={{paddingLeft:40,paddingRight:44}}/>
                  <button type="button" onClick={()=>setShowPw(v=>!v)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)"}}>{showPw?<EyeOffIcon size={16}/>:<EyeIcon size={16}/>}</button></div></div>
              <button type="submit" className="gold-btn" disabled={loading} style={{width:"100%",padding:"13px",borderRadius:8,fontSize:13,letterSpacing:".08em",textTransform:"uppercase",opacity:loading?.7:1}}>{loading?"Signing In…":"Sign In →"}</button>
              <div style={{textAlign:"center",fontSize:12,color:"var(--text-muted)"}}>Hint: ravi@example.com / password123</div>
            </form>
          ):(
            <form onSubmit={handleSignup} style={{display:"flex",flexDirection:"column",gap:12}}>
              <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Full Name *</label>
                <div style={{position:"relative"}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><UserIcon size={15} color="var(--text-muted)"/></span>
                  <input required placeholder="Ravi Kumar" value={signupForm.name} onChange={e=>setSignupForm(p=>({...p,name:e.target.value}))} style={{paddingLeft:40}}/></div></div>
              <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Email Address *</label>
                <div style={{position:"relative"}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><MailIcon size={15} color="var(--text-muted)"/></span>
                  <input required type="email" placeholder="you@email.com" value={signupForm.email} onChange={e=>setSignupForm(p=>({...p,email:e.target.value}))} style={{paddingLeft:40}}/></div></div>
              <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Phone</label>
                <div style={{position:"relative"}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><PhoneIcon size={15} color="var(--text-muted)"/></span>
                  <input type="tel" placeholder="+91 98765 43210" value={signupForm.phone} onChange={e=>setSignupForm(p=>({...p,phone:e.target.value}))} style={{paddingLeft:40}}/></div></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Password *</label>
                  <input required type="password" placeholder="Min 6 chars" value={signupForm.password} onChange={e=>setSignupForm(p=>({...p,password:e.target.value}))}/></div>
                <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Confirm *</label>
                  <input required type="password" placeholder="Repeat" value={signupForm.confirm} onChange={e=>setSignupForm(p=>({...p,confirm:e.target.value}))}/></div>
              </div>
              <button type="submit" className="gold-btn" disabled={loading} style={{width:"100%",padding:"13px",borderRadius:8,fontSize:13,letterSpacing:".08em",textTransform:"uppercase",marginTop:4,opacity:loading?.7:1}}>{loading?"Creating Account…":"Create Account →"}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const UserDropdown = ({ user, onProfile, onLogout, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return (
    <div ref={ref} className="user-dropdown">
      <div style={{padding:"16px 18px",borderBottom:"1px solid var(--border-light)",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#C87820,#F5C060)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:"var(--navy-900)",flexShrink:0}}>{user.avatar}</div>
        <div style={{minWidth:0}}>
          <p style={{fontSize:14,fontWeight:700,color:"var(--cream)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.name}</p>
          <p style={{fontSize:11,color:"var(--text-muted)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.email}</p>
        </div>
        <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,background:"rgba(232,160,48,.15)",color:"var(--gold)",border:"1px solid rgba(232,160,48,.3)",whiteSpace:"nowrap",flexShrink:0}}>{user.plan}</span>
      </div>
      <div style={{padding:"8px 0"}}>
        <button className="dropdown-item" onClick={()=>{onProfile();onClose();}}><UserIcon size={15} color="var(--gold)"/> My Profile</button>
        <button className="dropdown-item" onClick={()=>{onProfile();onClose();}}><FileIcon size={15} color="var(--text-soft)"/> My Inquiries</button>
        <button className="dropdown-item" onClick={()=>{onProfile();onClose();}}><HeartIcon size={15} color="var(--text-soft)"/> Saved Projects</button>
        <button className="dropdown-item" onClick={()=>{onProfile();onClose();}}><BellIcon size={15} color="var(--text-soft)"/> Notifications</button>
        <div style={{height:1,background:"var(--border-light)",margin:"8px 18px"}}/>
        <button className="dropdown-item" onClick={()=>{onProfile();onClose();}}><EditIcon size={15} color="var(--text-soft)"/> Edit Profile</button>
        <button className="dropdown-item danger" onClick={()=>{onLogout();onClose();}}><LogOutIcon size={15} color="#EF4444"/> Sign Out</button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   BOOKING PAGE
   ══════════════════════════════════════════════════════════════════ */

const BOOKING_SERVICES = [
  { id:"residential", icon:"🏠", title:"Residential Construction", subtitle:"Villas, Apartments, Row Houses", duration:"60 min", tag:"Most Booked" },
  { id:"commercial",  icon:"🏢", title:"Commercial Construction",  subtitle:"Offices, Warehouses, IT Parks", duration:"60 min", tag:null },
  { id:"interior",    icon:"🎨", title:"Interior Design",          subtitle:"Full home or office makeover", duration:"45 min", tag:null },
  { id:"structural",  icon:"🏗️", title:"Structural Engineering",  subtitle:"Foundation, Audit, Retrofit", duration:"45 min", tag:null },
  { id:"green",       icon:"🌿", title:"Green / Sustainable Build",subtitle:"LEED, Solar, Eco Materials",   duration:"45 min", tag:"New" },
  { id:"renovation",  icon:"🔨", title:"Renovation & Remodeling",  subtitle:"Expand, Upgrade, Transform",  duration:"30 min", tag:null },
];

const CONSULTANTS = [
  { id:"arjun",  name:"Arjun Mehta",  role:"Founder & CEO",          exp:"20 yrs", img:0, tag:"Senior" },
  { id:"priya",  name:"Priya Sharma", role:"Head of Projects",        exp:"14 yrs", img:1, tag:null },
  { id:"vikram", name:"Vikram Rao",   role:"Chief Architect",         exp:"18 yrs", img:2, tag:"Architecture" },
  { id:"deepa",  name:"Deepa Iyer",   role:"Interior Design Lead",    exp:"12 yrs", img:3, tag:"Interior" },
  { id:"rohan",  name:"Rohan Desai",  role:"Structural Engineer",     exp:"16 yrs", img:4, tag:"Structural" },
  { id:"nisha",  name:"Nisha Patel",  role:"Client Relations Manager",exp:"9 yrs",  img:5, tag:null },
];

const MEETING_MODES = [
  { id:"video",    icon:"🎥", title:"Video Call",     subtitle:"Google Meet / Zoom", note:"Link sent by email" },
  { id:"phone",    icon:"📞", title:"Phone Call",     subtitle:"We call you",        note:"Confirm your number" },
  { id:"inperson", icon:"🏢", title:"In-Person Visit",subtitle:"Our Bangalore office",note:"Brigade Road, MG Road" },
  { id:"site",     icon:"📍", title:"Site Visit",     subtitle:"We visit your plot",  note:"Bangalore & NCR only" },
];

const TIME_SLOTS = ["9:00 AM","9:45 AM","10:30 AM","11:15 AM","12:00 PM","2:00 PM","2:45 PM","3:30 PM","4:15 PM","5:00 PM"];
const BOOKED_SLOTS = ["10:30 AM","2:45 PM"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function Calendar({ selected, onSelect }) {
  const today = new Date(2026, 4, 29);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (d) => {
    if (!d) return true;
    const dt = new Date(viewYear, viewMonth, d);
    return dt < today || dt.getDay() === 0;
  };
  const isSelected = (d) => {
    if (!d || !selected) return false;
    return selected.year === viewYear && selected.month === viewMonth && selected.day === d;
  };
  const isToday = (d) => {
    if (!d) return false;
    return viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate();
  };

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y=>y-1); } else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y=>y+1); } else setViewMonth(m=>m+1); };
  const canPrev = !(viewYear === today.getFullYear() && viewMonth === today.getMonth());

  return (
    <div style={{background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)",borderRadius:14,padding:"20px 18px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <button onClick={prevMonth} disabled={!canPrev} style={{width:32,height:32,borderRadius:8,border:"1px solid var(--border-light)",background:"transparent",color:canPrev?"var(--cream)":"var(--border-light)",cursor:canPrev?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <ChevronLeftIcon size={16} color={canPrev?"var(--cream)":"var(--border-light)"}/>
        </button>
        <span style={{fontSize:14,fontWeight:700,color:"var(--cream)"}}>{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{width:32,height:32,borderRadius:8,border:"1px solid var(--border-light)",background:"transparent",color:"var(--cream)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <ChevronRightIcon size={16} color="var(--cream)"/>
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:8}}>
        {DAYS_SHORT.map(d=><div key={d} style={{textAlign:"center",fontSize:10,fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.08em",padding:"4px 0"}}>{d}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
        {cells.map((d,i)=>{
          const disabled = isDisabled(d);
          const sel = isSelected(d);
          const tod = isToday(d);
          return (
            <button key={i} onClick={()=>!disabled&&d&&onSelect({year:viewYear,month:viewMonth,day:d})}
              disabled={disabled||!d}
              className={`cal-day${sel?" cal-selected":tod?" cal-today":disabled?" cal-disabled":""}`}
              style={{background:sel?"linear-gradient(135deg,#C87820,#F5C060)":undefined,color:sel?"var(--navy-900)":undefined,border:sel?"none":undefined,cursor:d&&!disabled?"pointer":"default"}}>
              {d||""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const BookingPage = ({ setPage, user, onOpenAuth }) => {
  const STEPS = ["Service","Consultant","Mode","Date & Time","Details","Confirm"];
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [mode, setMode] = useState(null);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [details, setDetails] = useState({ name: user?.name||"", email: user?.email||"", phone: user?.phone||"", plot:"", budget:"", notes:"" });
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef] = useState("BK-" + Math.floor(100000+Math.random()*900000));

  const canNext = () => {
    if (step===0) return !!service;
    if (step===1) return !!consultant;
    if (step===2) return !!mode;
    if (step===3) return !!date && !!slot;
    if (step===4) return details.name && details.email && details.phone;
    return true;
  };

  const formatDate = (d) => {
    if (!d) return "";
    return `${DAYS_SHORT[new Date(d.year,d.month,d.day).getDay()]}, ${d.day} ${MONTHS[d.month].slice(0,3)} ${d.year}`;
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setConfirmed(true); }, 1200);
  };

  if (confirmed) {
    return (
      <div style={{paddingTop:64,minHeight:"100vh",background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)"}}>
        <div style={{maxWidth:640,margin:"0 auto",padding:"80px 24px",textAlign:"center"}}>
          <div style={{width:96,height:96,borderRadius:"50%",background:"linear-gradient(135deg,#C87820,#F5C060)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 28px",boxShadow:"0 0 0 12px rgba(232,160,48,.12)"}}>
            <CheckIcon size={44} color="var(--navy-900)"/>
          </div>
          <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:42,fontWeight:800,marginBottom:8}}>Booking Confirmed!</h1>
          <p style={{fontSize:15,color:"var(--text-soft)",marginBottom:32,lineHeight:1.7}}>
            Your consultation has been booked. A confirmation email is on its way to <strong style={{color:"var(--cream)"}}>{details.email}</strong>.
          </p>
          <div style={{padding:28,borderRadius:18,border:"1px solid rgba(232,160,48,.4)",background:"linear-gradient(145deg,#1A1240,#221650)",textAlign:"left",marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:16,marginBottom:16,borderBottom:"1px solid var(--border)"}}>
              <div>
                <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",fontWeight:700,marginBottom:4}}>Booking Reference</p>
                <p style={{fontSize:22,fontWeight:800,color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif"}}>{bookingRef}</p>
              </div>
              <span style={{fontSize:11,fontWeight:700,padding:"6px 14px",borderRadius:20,background:"rgba(72,199,142,.12)",color:"#48C78E",border:"1px solid rgba(72,199,142,.3)"}}>Confirmed</span>
            </div>
            {[
              {label:"Service",val:BOOKING_SERVICES.find(s=>s.id===service)?.title},
              {label:"Consultant",val:CONSULTANTS.find(c=>c.id===consultant)?.name},
              {label:"Meeting Mode",val:MEETING_MODES.find(m=>m.id===mode)?.title},
              {label:"Date & Time",val:`${formatDate(date)} · ${slot}`},
              {label:"Your Name",val:details.name},
              {label:"Phone",val:details.phone},
            ].map((r,i)=>(
              <div key={i} className="summary-row">
                <span style={{fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,flexShrink:0}}>{r.label}</span>
                <span style={{fontSize:14,color:"var(--cream)",fontWeight:600,textAlign:"right"}}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setPage("Home")} className="gold-btn" style={{padding:"13px 32px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase"}}>Back to Home</button>
            <a href={`https://wa.me/${data.contact.whatsapp}?text=Hi! I just booked a consultation (Ref: ${bookingRef}). Looking forward to our meeting!`} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",gap:8,padding:"13px 28px",borderRadius:8,fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",background:"#25D366",color:"#fff",textDecoration:"none"}}>
              <WhatsAppSVG size={14}/> Message Us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{paddingTop:64,minHeight:"100vh",background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)"}}>
      <section style={{position:"relative",padding:"72px 0 56px",overflow:"hidden"}}>
        <img src={IMGS.bookingBg} alt="booking" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.9),rgba(26,13,58,.82))"}}/>
        <div style={{position:"relative",maxWidth:1100,margin:"0 auto",padding:"0 32px",zIndex:2}}>
          <SectionLabel>Free Consultation</SectionLabel>
          <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:800,lineHeight:1.04,maxWidth:680,marginBottom:12}}>
            Book Your Construction Consultation
          </h1>
          <p style={{fontSize:15,color:"rgba(240,238,255,.75)",maxWidth:520,lineHeight:1.7}}>
            Free 30–60 minute sessions with our senior experts. No obligations — just honest advice tailored to your project.
          </p>
          <div style={{display:"flex",gap:24,marginTop:24,flexWrap:"wrap"}}>
            {["✅ 100% Free Consultation","⚡ 48hr Confirmation","🔒 No Commitment Required","📍 Online or In-Person"].map((t,i)=>(
              <span key={i} style={{fontSize:12,color:"rgba(240,238,255,.7)",fontWeight:600}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 32px 80px"}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:48,overflowX:"auto",paddingBottom:4}}>
          {STEPS.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:"none",minWidth:i<STEPS.length-1?0:"auto"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0}}>
                <div className={`stepper-dot ${i<step?"done":i===step?"active":"pending"}`}>
                  {i<step?<CheckIcon size={15} color="var(--navy-900)"/>:i+1}
                </div>
                <span style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:i===step?"var(--gold)":i<step?"var(--cream)":"var(--text-muted)",whiteSpace:"nowrap"}}>{s}</span>
              </div>
              {i<STEPS.length-1&&<div className={`stepper-line ${i<step?"done":""}`} style={{margin:"0 8px",marginBottom:20}}/>}
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:28,alignItems:"start"}}>
          <div>
            {step===0&&(
              <div>
                <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:6}}>What can we help you with?</h2>
                <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Select the service you'd like to discuss in your consultation.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {BOOKING_SERVICES.map(sv=>(
                    <div key={sv.id} className={`booking-step-card ${service===sv.id?"selected":""}`} onClick={()=>setService(sv.id)}>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                        <span style={{fontSize:28}}>{sv.icon}</span>
                        {sv.tag&&<span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,background:sv.tag==="Most Booked"?"rgba(232,160,48,.15)":"rgba(99,179,237,.12)",color:sv.tag==="Most Booked"?"var(--gold)":"#63B3ED",border:`1px solid ${sv.tag==="Most Booked"?"rgba(232,160,48,.35)":"rgba(99,179,237,.3)"}`}}>{sv.tag}</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
                        <div>
                          <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:800,marginBottom:4}}>{sv.title}</h3>
                          <p style={{fontSize:12,color:"var(--text-muted)"}}>{sv.subtitle}</p>
                        </div>
                        <span style={{fontSize:11,color:"var(--text-soft)",whiteSpace:"nowrap",flexShrink:0,marginTop:2}}>⏱ {sv.duration}</span>
                      </div>
                      {service===sv.id&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:6,color:"var(--gold)",fontSize:12,fontWeight:700}}><CheckCircleIcon size={14} color="var(--gold)"/> Selected</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step===1&&(
              <div>
                <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:6}}>Choose your consultant</h2>
                <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Pick the expert best suited to your project.</p>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {CONSULTANTS.map((c,ci)=>(
                    <div key={c.id} className={`booking-step-card ${consultant===c.id?"selected":""}`} style={{padding:"18px 22px",cursor:"pointer"}} onClick={()=>setConsultant(c.id)}>
                      <div style={{display:"flex",alignItems:"center",gap:16}}>
                        <div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:`2px solid ${consultant===c.id?"var(--gold)":"var(--border-light)"}`}}>
                          <img src={IMGS.team[c.img]} alt={c.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                            <p style={{fontSize:15,fontWeight:700,color:"var(--cream)"}}>{c.name}</p>
                            {c.tag&&<span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:"rgba(232,160,48,.12)",color:"var(--gold)",border:"1px solid rgba(232,160,48,.3)"}}>{c.tag}</span>}
                          </div>
                          <p style={{fontSize:12,color:"var(--gold)",marginTop:1}}>{c.role}</p>
                          <p style={{fontSize:11,color:"var(--text-muted)",marginTop:2}}>{c.exp} experience</p>
                        </div>
                        <div style={{flexShrink:0,width:24,height:24,borderRadius:"50%",border:`2px solid ${consultant===c.id?"var(--gold)":"var(--border-light)"}`,display:"flex",alignItems:"center",justifyContent:"center",background:consultant===c.id?"var(--gold)":"transparent"}}>
                          {consultant===c.id&&<CheckIcon size={13} color="var(--navy-900)"/>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step===2&&(
              <div>
                <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:6}}>How would you like to meet?</h2>
                <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Choose the format that works best for you.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {MEETING_MODES.map(m=>(
                    <div key={m.id} className={`booking-step-card ${mode===m.id?"selected":""}`} onClick={()=>setMode(m.id)}>
                      <span style={{fontSize:32,display:"block",marginBottom:12}}>{m.icon}</span>
                      <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800,marginBottom:4}}>{m.title}</h3>
                      <p style={{fontSize:12,color:"var(--text-muted)",marginBottom:8}}>{m.subtitle}</p>
                      <span style={{fontSize:11,color:"var(--text-soft)",background:"var(--navy-700)",padding:"3px 10px",borderRadius:4,border:"1px solid var(--border)"}}>{m.note}</span>
                      {mode===m.id&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:6,color:"var(--gold)",fontSize:12,fontWeight:700}}><CheckCircleIcon size={14} color="var(--gold)"/> Selected</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step===3&&(
              <div>
                <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:6}}>Pick a date and time</h2>
                <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Available Mon–Sat. Sundays and past dates are unavailable.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                  <Calendar selected={date} onSelect={d=>{setDate(d);setSlot(null);}}/>
                  <div>
                    {date?(
                      <>
                        <p style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"var(--gold)",marginBottom:14}}>Available Slots — {formatDate(date)}</p>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                          {TIME_SLOTS.map(t=>{
                            const booked = BOOKED_SLOTS.includes(t);
                            return(
                              <button key={t} onClick={()=>!booked&&setSlot(t)}
                                className={`slot-btn${slot===t?" selected":""}${booked?" disabled":""}`}
                                disabled={booked}>
                                {t}{booked&&" ✗"}
                              </button>
                            );
                          })}
                        </div>
                        <p style={{fontSize:11,color:"var(--text-muted)",marginTop:12}}>All times in IST (UTC+5:30). Strikethrough = booked.</p>
                      </>
                    ):(
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:10,opacity:.5}}>
                        <CalendarCheckIcon size={40}/>
                        <p style={{fontSize:13,color:"var(--text-muted)",textAlign:"center"}}>Select a date to see available time slots</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step===4&&(
              <div>
                <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:6}}>Your project details</h2>
                <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Help your consultant prepare by sharing some basics about your project.</p>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                    <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Full Name *</label>
                      <input required value={details.name} onChange={e=>setDetails(p=>({...p,name:e.target.value}))} placeholder="Ravi Kumar"/></div>
                    <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Email *</label>
                      <input required type="email" value={details.email} onChange={e=>setDetails(p=>({...p,email:e.target.value}))} placeholder="you@email.com"/></div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                    <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Phone *</label>
                      <input required type="tel" value={details.phone} onChange={e=>setDetails(p=>({...p,phone:e.target.value}))} placeholder="+91 98765 43210"/></div>
                    <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Plot / Location</label>
                      <input value={details.plot} onChange={e=>setDetails(p=>({...p,plot:e.target.value}))} placeholder="e.g. Whitefield, Bangalore"/></div>
                  </div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Approximate Budget</label>
                    <select value={details.budget} onChange={e=>setDetails(p=>({...p,budget:e.target.value}))}>
                      <option value="">Select a range</option>
                      <option>Under ₹25 Lakhs</option>
                      <option>₹25L – ₹75L</option>
                      <option>₹75L – ₹1.5 Cr</option>
                      <option>₹1.5 Cr – ₹3 Cr</option>
                      <option>₹3 Cr – ₹10 Cr</option>
                      <option>Above ₹10 Cr</option>
                    </select></div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Additional Notes</label>
                    <textarea rows={4} value={details.notes} onChange={e=>setDetails(p=>({...p,notes:e.target.value}))} placeholder="Tell us anything else about your project..."/></div>
                </div>
              </div>
            )}

            {step===5&&(
              <div>
                <h2 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,marginBottom:6}}>Review & confirm your booking</h2>
                <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Double-check your details before confirming.</p>
                <div style={{padding:24,borderRadius:14,border:"1px solid var(--border-light)",background:"linear-gradient(145deg,#140E2E,#1C1542)",marginBottom:20}}>
                  <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:14}}>Booking Summary</p>
                  {[
                    {label:"Service",val:BOOKING_SERVICES.find(s=>s.id===service)?.title,sub:BOOKING_SERVICES.find(s=>s.id===service)?.subtitle},
                    {label:"Consultant",val:CONSULTANTS.find(c=>c.id===consultant)?.name,sub:CONSULTANTS.find(c=>c.id===consultant)?.role},
                    {label:"Meeting Mode",val:MEETING_MODES.find(m=>m.id===mode)?.title,sub:MEETING_MODES.find(m=>m.id===mode)?.note},
                    {label:"Date & Time",val:formatDate(date),sub:slot},
                    {label:"Your Name",val:details.name,sub:details.email},
                    {label:"Phone",val:details.phone,sub:details.plot||"No location specified"},
                  ].map((r,i)=>(
                    <div key={i} className="summary-row">
                      <span style={{fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,flexShrink:0,minWidth:110}}>{r.label}</span>
                      <div style={{textAlign:"right"}}>
                        <p style={{fontSize:14,color:"var(--cream)",fontWeight:700,marginBottom:1}}>{r.val}</p>
                        {r.sub&&<p style={{fontSize:11,color:"var(--text-muted)"}}>{r.sub}</p>}
                      </div>
                    </div>
                  ))}
                  {details.budget&&(
                    <div className="summary-row">
                      <span style={{fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700}}>Budget</span>
                      <span style={{fontSize:14,color:"var(--gold)",fontWeight:700}}>{details.budget}</span>
                    </div>
                  )}
                </div>
                <div style={{padding:16,borderRadius:10,border:"1px solid rgba(232,160,48,.3)",background:"rgba(232,160,48,.06)",marginBottom:20,display:"flex",alignItems:"flex-start",gap:12}}>
                  <span style={{fontSize:18,flexShrink:0}}>ℹ️</span>
                  <p style={{fontSize:12,color:"var(--text-soft)",lineHeight:1.7}}>This consultation is <strong style={{color:"var(--cream)"}}>completely free</strong>. A confirmation email and calendar invite will be sent within 30 minutes of booking.</p>
                </div>
                <button onClick={handleConfirm} className="gold-btn" disabled={loading}
                  style={{width:"100%",padding:"16px",borderRadius:10,fontSize:14,letterSpacing:".08em",textTransform:"uppercase",opacity:loading?.7:1}}>
                  {loading?"Confirming Your Booking…":"Confirm Booking — It's Free →"}
                </button>
              </div>
            )}

            {step < 5 && (
              <div style={{display:"flex",justifyContent:"space-between",marginTop:32,paddingTop:20,borderTop:"1px solid var(--border)"}}>
                <button onClick={()=>step>0&&setStep(s=>s-1)} disabled={step===0}
                  className="outline-btn" style={{display:"flex",alignItems:"center",gap:8,padding:"12px 24px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase",opacity:step===0?.4:1,cursor:step===0?"not-allowed":"pointer"}}>
                  <ChevronLeftIcon size={14}/> Back
                </button>
                <button onClick={()=>canNext()&&setStep(s=>s+1)} disabled={!canNext()}
                  className="gold-btn" style={{display:"flex",alignItems:"center",gap:8,padding:"12px 28px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase",opacity:canNext()?1:.45,cursor:canNext()?"pointer":"not-allowed"}}>
                  Continue <ChevronRightIcon size={14} color="var(--navy-900)"/>
                </button>
              </div>
            )}
          </div>

          <div style={{position:"sticky",top:84,display:"flex",flexDirection:"column",gap:16}}>
            <div style={{padding:22,borderRadius:14,border:"1px solid var(--border-light)",background:"linear-gradient(145deg,#140E2E,#1C1542)"}}>
              <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:16}}>Your Selections</p>
              {[
                {step:0,label:"Service",val:service?BOOKING_SERVICES.find(s=>s.id===service)?.title:null,icon:"🏠"},
                {step:1,label:"Consultant",val:consultant?CONSULTANTS.find(c=>c.id===consultant)?.name:null,icon:"👤"},
                {step:2,label:"Meeting Mode",val:mode?MEETING_MODES.find(m=>m.id===mode)?.title:null,icon:"📹"},
                {step:3,label:"Date & Time",val:date&&slot?`${formatDate(date)} · ${slot}`:date?formatDate(date):null,icon:"📅"},
                {step:4,label:"Name",val:details.name||null,icon:"👋"},
              ].map((r,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12}}>
                  <span style={{fontSize:14,marginTop:1,flexShrink:0}}>{r.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:10,textTransform:"uppercase",letterSpacing:".08em",color:"var(--text-muted)",fontWeight:700,marginBottom:1}}>{r.label}</p>
                    {r.val?(
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <p style={{fontSize:12,color:"var(--cream)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.val}</p>
                        {step>r.step&&<button onClick={()=>setStep(r.step)} style={{fontSize:9,color:"var(--gold)",background:"none",border:"none",cursor:"pointer",flexShrink:0,textTransform:"uppercase",fontWeight:700}}>Edit</button>}
                      </div>
                    ):(
                      <p style={{fontSize:12,color:"var(--border-light)",fontStyle:"italic"}}>Not selected</p>
                    )}
                  </div>
                  <span style={{fontSize:14,flexShrink:0}}>{r.val?"✅":"○"}</span>
                </div>
              ))}
            </div>

            <div style={{padding:22,borderRadius:14,border:"1px solid var(--border-light)",background:"linear-gradient(145deg,#140E2E,#1C1542)"}}>
              <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:14}}>Why Book with Us?</p>
              {["100% Free — no charges","Expert consultants (10–20 yrs exp)","Personalized advice for your project","Receive a detailed project outline","No pushy sales tactics"].map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <CheckCircleIcon size={14} color="#48C78E"/>
                  <span style={{fontSize:12,color:"var(--text-soft)"}}>{t}</span>
                </div>
              ))}
            </div>

            <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",gap:12,padding:"16px",borderRadius:12,background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.3)",textDecoration:"none",transition:"all .2s"}}
              onMouseOver={e=>e.currentTarget.style.background="rgba(37,211,102,.15)"}
              onMouseOut={e=>e.currentTarget.style.background="rgba(37,211,102,.1)"}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <WhatsAppSVG size={20}/>
              </div>
              <div>
                <p style={{fontSize:12,fontWeight:700,color:"var(--cream)",marginBottom:2}}>Prefer WhatsApp?</p>
                <p style={{fontSize:11,color:"rgba(37,211,102,.9)"}}>Chat with us directly →</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Profile Page ────────────────────────────────────────────────────────── */
const ProfilePage = ({ user, onUpdateUser, onLogout, setPage }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name, phone: user.phone, location: user.location });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateUser({ ...user, ...editForm, avatar: editForm.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase() });
    setEditing(false); setSaved(true); setTimeout(()=>setSaved(false),2500);
  };

  const activityFeed = [
    { icon:"📋", label:"Submitted inquiry for Residential Construction", time:"2 days ago", status:"Pending" },
    { icon:"👁️", label:"Viewed Whitefield Luxury Villas project", time:"5 days ago", status:"" },
    { icon:"❤️", label:"Saved Skyline Apartments to favourites", time:"1 week ago", status:"" },
    { icon:"💬", label:"Sent message via Contact form", time:"2 weeks ago", status:"Replied" },
    { icon:"📞", label:"Requested callback for Premium plan", time:"3 weeks ago", status:"Done" },
  ];

  const tabs = ["overview","inquiries","saved","settings"];

  return (
    <div style={{paddingTop:64,minHeight:"100vh",background:"linear-gradient(160deg,#07050F 0%,#0F0A20 30%,#160D30 70%,#07050F 100%)"}}>
      <div style={{position:"relative",padding:"60px 0 0",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#0F0824 0%,#1A0D3A 60%,#0C0818 100%)"}}/>
        <div style={{position:"relative",maxWidth:1100,margin:"0 auto",padding:"0 32px"}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:28,flexWrap:"wrap",marginBottom:0,paddingBottom:0}}>
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{width:96,height:96,borderRadius:"50%",background:"linear-gradient(135deg,#C87820,#F5C060)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:32,color:"var(--navy-900)",border:"4px solid var(--navy-900)",boxShadow:"0 0 0 2px var(--gold)"}}>{user.avatar}</div>
              <div style={{position:"absolute",bottom:4,right:4,width:22,height:22,borderRadius:"50%",background:"#25D366",border:"2px solid var(--navy-900)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/></div>
            </div>
            <div style={{flex:1,minWidth:200,paddingBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:4}}>
                <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:800,lineHeight:1,margin:0}}>{user.name}</h1>
                <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20,background:"linear-gradient(135deg,rgba(232,160,48,.2),rgba(155,93,229,.2))",color:"var(--gold)",border:"1px solid rgba(232,160,48,.35)"}}>{user.plan} Plan</span>
              </div>
              <div style={{display:"flex",gap:18,flexWrap:"wrap",marginTop:8}}>
                <span style={{fontSize:12,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:5}}><MailIcon size={12} color="var(--text-muted)"/> {user.email}</span>
                <span style={{fontSize:12,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:5}}><PhoneIcon size={12} color="var(--text-muted)"/> {user.phone}</span>
                <span style={{fontSize:12,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:5}}><MapPinIcon size={12} color="var(--text-muted)"/> {user.location}</span>
              </div>
              <p style={{fontSize:11,color:"var(--text-muted)",marginTop:6}}>Member since {user.joinDate}</p>
            </div>
            <div style={{display:"flex",gap:10,flexShrink:0,paddingBottom:8}}>
              <button className="edit-btn" onClick={()=>setEditing(v=>!v)} style={editing?{borderColor:"var(--gold)",color:"var(--gold)",background:"var(--gold-dim)"}:{}}><EditIcon size={13}/> {editing?"Cancel":"Edit Profile"}</button>
              <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",background:"rgba(239,68,68,.08)",border:"1.5px solid rgba(239,68,68,.25)",color:"#EF4444",cursor:"pointer"}}>
                <LogOutIcon size={13}/> Sign Out
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:0,borderBottom:"1px solid var(--border-light)",marginTop:24}}>
            {tabs.map(t=>(
              <button key={t} className={`auth-tab ${activeTab===t?"active":""}`} style={{textTransform:"capitalize",letterSpacing:".08em"}} onClick={()=>setActiveTab(t)}>
                {t==="overview"?"Overview":t==="inquiries"?"My Inquiries":t==="saved"?"Saved Projects":"Settings"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"36px 32px 80px"}}>
        {activeTab==="overview"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:28}}>
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:28}}>
                {[{label:"Active Inquiries",value:user.inquiries,icon:"📋",color:"var(--gold)"},{label:"Saved Projects",value:user.savedProjects.length,icon:"❤️",color:"#E1306C"},{label:"Months Active",value:4,icon:"📅",color:"#63B3ED"}].map((s,i)=>(
                  <div key={i} className="profile-stat-card">
                    <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
                    <p style={{fontSize:28,fontWeight:800,color:s.color,fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1,marginBottom:4}}>{s.value}</p>
                    <p style={{fontSize:12,color:"var(--text-muted)"}}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:28}}>
                <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:16}}>Recent Activity</p>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {activityFeed.map((a,i)=>(
                    <div key={i} className="profile-activity-row">
                      <span style={{fontSize:20,flexShrink:0}}>{a.icon}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{fontSize:13,color:"var(--cream)",marginBottom:2}}>{a.label}</p>
                        <p style={{fontSize:11,color:"var(--text-muted)"}}>{a.time}</p>
                      </div>
                      {a.status&&<span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,background:a.status==="Pending"?"rgba(232,160,48,.12)":a.status==="Replied"?"rgba(72,199,142,.12)":"rgba(99,179,237,.12)",color:a.status==="Pending"?"var(--gold)":a.status==="Replied"?"#48C78E":"#63B3ED",border:`1px solid ${a.status==="Pending"?"rgba(232,160,48,.3)":a.status==="Replied"?"rgba(72,199,142,.3)":"rgba(99,179,237,.3)"}`,whiteSpace:"nowrap"}}>{a.status}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{padding:22,borderRadius:14,background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)"}}>
                <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:14}}>Quick Actions</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[{label:"Book Consultation",action:()=>setPage("Booking"),icon:"📅"},{label:"Get a Free Quote",action:()=>setPage("Contact"),icon:"📋"},{label:"Browse Projects",action:()=>setPage("Projects"),icon:"🏗️"},{label:"View Pricing Plans",action:()=>setPage("Pricing"),icon:"💰"}].map((a,i)=>(
                    <button key={i} onClick={a.action} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:8,background:"var(--navy-700)",border:"1px solid var(--border-light)",color:"var(--cream)",fontSize:13,cursor:"pointer",transition:"all .2s",textAlign:"left"}}
                      onMouseOver={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
                      onMouseOut={e=>{e.currentTarget.style.borderColor="var(--border-light)";e.currentTarget.style.color="var(--cream)"}}>
                      <span style={{fontSize:16}}>{a.icon}</span> {a.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{padding:22,borderRadius:14,background:"linear-gradient(135deg,rgba(232,160,48,.1),rgba(155,93,229,.1))",border:"1px solid rgba(232,160,48,.3)"}}>
                <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:8}}>Current Plan</p>
                <p style={{fontSize:24,fontWeight:800,color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",marginBottom:4}}>{user.plan}</p>
                <p style={{fontSize:12,color:"var(--text-muted)",marginBottom:16}}>{user.plan==="Essential"?"₹1,500 / sq ft":user.plan==="Premium"?"₹2,500 / sq ft":"₹4,000 / sq ft"}</p>
                <button onClick={()=>setPage("Pricing")} className="gold-btn" style={{width:"100%",padding:"10px",borderRadius:8,fontSize:11,letterSpacing:".08em",textTransform:"uppercase"}}>Upgrade Plan →</button>
              </div>
            </div>
          </div>
        )}
        {activeTab==="inquiries"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800}}>Your Service Requests</h3>
              <button onClick={()=>setPage("Contact")} className="gold-btn" style={{padding:"10px 22px",borderRadius:8,fontSize:11,letterSpacing:".08em",textTransform:"uppercase"}}>New Inquiry +</button>
            </div>
            <div style={{textAlign:"center",padding:"80px 0"}}>
              <p style={{fontSize:48,marginBottom:16}}>📋</p>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,marginBottom:8}}>No inquiries yet</h3>
              <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Get started by submitting a project inquiry.</p>
              <button onClick={()=>setPage("Contact")} className="gold-btn" style={{padding:"12px 28px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase"}}>Submit Inquiry →</button>
            </div>
          </div>
        )}
        {activeTab==="saved"&&(
          <div>
            <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,marginBottom:24}}>Your Favourites</h3>
            <div style={{textAlign:"center",padding:"80px 0"}}>
              <p style={{fontSize:48,marginBottom:16}}>❤️</p>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,marginBottom:8}}>No saved projects yet</h3>
              <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Browse our portfolio and save projects you like.</p>
              <button onClick={()=>setPage("Projects")} className="gold-btn" style={{padding:"12px 28px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase"}}>Browse Projects →</button>
            </div>
          </div>
        )}
        {activeTab==="settings"&&(
          <div style={{maxWidth:680}}>
            <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,marginBottom:24}}>Profile Information</h3>
            {saved&&<div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderRadius:10,background:"rgba(72,199,142,.1)",border:"1px solid rgba(72,199,142,.3)",color:"#48C78E",fontSize:13,fontWeight:600,marginBottom:20}}><CheckCircleIcon size={16} color="#48C78E"/> Profile updated successfully!</div>}
            <div style={{padding:28,borderRadius:16,background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)"}}>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Full Name</label>
                    {editing?<input value={editForm.name} onChange={e=>setEditForm(p=>({...p,name:e.target.value}))} placeholder="Your name"/>:<div style={{padding:"12px 16px",background:"var(--navy-800)",borderRadius:6,fontSize:14,color:"var(--cream)",border:"1px solid var(--border)"}}>{user.name}</div>}</div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Email</label>
                    <div style={{padding:"12px 16px",background:"var(--navy-800)",borderRadius:6,fontSize:14,color:"var(--text-muted)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8}}><LockIcon size={13} color="var(--text-muted)"/> {user.email}</div></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Phone</label>
                    {editing?<input value={editForm.phone} onChange={e=>setEditForm(p=>({...p,phone:e.target.value}))} placeholder="+91 98765 43210"/>:<div style={{padding:"12px 16px",background:"var(--navy-800)",borderRadius:6,fontSize:14,color:"var(--cream)",border:"1px solid var(--border)"}}>{user.phone}</div>}</div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:".1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Location</label>
                    {editing?<input value={editForm.location} onChange={e=>setEditForm(p=>({...p,location:e.target.value}))} placeholder="City, State"/>:<div style={{padding:"12px 16px",background:"var(--navy-800)",borderRadius:6,fontSize:14,color:"var(--cream)",border:"1px solid var(--border)"}}>{user.location}</div>}</div>
                </div>
              </div>
              {editing?<div style={{display:"flex",gap:12,marginTop:20}}><button onClick={handleSave} className="gold-btn" style={{padding:"11px 28px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase"}}>Save Changes</button><button onClick={()=>{setEditing(false);setEditForm({name:user.name,phone:user.phone,location:user.location});}} className="outline-btn" style={{padding:"11px 24px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase"}}>Cancel</button></div>:<button onClick={()=>setEditing(true)} className="edit-btn" style={{marginTop:20}}><EditIcon size={13}/> Edit Information</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Navbar ──────────────────────────────────────────────────────────────── */
const Navbar = ({ page, setPage, scrolled, user, onOpenAuth, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,transition:"all .3s",background:scrolled?"rgba(7,5,15,0.97)":"rgba(7,5,15,0.18)",backdropFilter:"blur(16px)",borderBottom:scrolled?"1px solid var(--border)":"1px solid transparent",boxShadow:scrolled?"0 2px 24px rgba(0,0,0,.6)":"none"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <button onClick={()=>setPage("Home")} style={{background:"none",border:"none",cursor:"pointer"}}>
          <span style={{fontSize:22,fontWeight:800,letterSpacing:"0.1em",fontFamily:"'Barlow Condensed',sans-serif"}}><span style={{color:"var(--gold)"}}>BUILD</span><span style={{color:"var(--cream)"}}>CORE</span></span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          {/* Booking is removed from navbar links — only shown via "Book Now" CTA button */}
          {data.navbar.links.map(l=>(
            <button key={l} onClick={()=>setPage(l)} className={`nav-link ${page===l?"active":""}`}>{l}</button>
          ))}
          <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:6,background:"#25D366",color:"#fff",textDecoration:"none",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>
            <WhatsAppSVG size={13}/> WhatsApp
          </a>
          {user?(
            <div style={{position:"relative"}}>
              <button onClick={()=>setDropdownOpen(v=>!v)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px 6px 8px",borderRadius:8,background:"linear-gradient(135deg,rgba(232,160,48,.12),rgba(155,93,229,.12))",border:"1.5px solid rgba(232,160,48,.35)",cursor:"pointer"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#C87820,#F5C060)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:11,color:"var(--navy-900)"}}>{user.avatar}</div>
                <span style={{fontSize:12,fontWeight:700,color:"var(--cream)",maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name.split(" ")[0]}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {dropdownOpen&&<UserDropdown user={user} onProfile={()=>setPage("Profile")} onLogout={onLogout} onClose={()=>setDropdownOpen(false)}/>}
            </div>
          ):(
            <button onClick={onOpenAuth} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:6,background:"linear-gradient(135deg,rgba(232,160,48,.12),rgba(155,93,229,.12))",border:"1.5px solid rgba(232,160,48,.35)",color:"var(--gold)",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer"}}>
              <UserIcon size={14} color="var(--gold)"/> Sign In
            </button>
          )}
          {/* Book Now CTA — the primary entry point to the booking page */}
          <button onClick={()=>setPage("Booking")} className="gold-btn" style={{padding:"8px 18px",borderRadius:6,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase"}}>Book Now</button>
        </div>
      </div>
    </nav>
  );
};

/* ─── Footer ──────────────────────────────────────────────────────────────── */
const Footer=({setPage})=>(
  <footer style={{background:"linear-gradient(145deg,#0A071A 0%,#140B30 60%,#07050F 100%)",borderTop:"1px solid var(--border-light)"}}>
    <div style={{maxWidth:1280,margin:"0 auto",padding:"64px 24px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:48}}>
      <div>
        <p style={{fontSize:28,fontWeight:800,color:"var(--gold)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.1em",marginBottom:8}}>BUILD<span style={{color:"var(--cream)"}}>CORE</span></p>
        <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:16}}>{data.footer.tagline}</p>
        <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:6}}>📍 {data.contact.address}</p>
        <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:6}}>📞 {data.contact.phone}</p>
        <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:20}}>✉ {data.contact.email}</p>
        <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--cream)",marginBottom:12}}>Follow Us</p>
        <SocialLinks/>
      </div>
      <div>
        <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--cream)",marginBottom:20}}>Pages</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {data.navbar.links.map(l=>(
            <button key={l} onClick={()=>setPage(l)} style={{fontSize:13,color:"var(--text-muted)",background:"none",border:"none",cursor:"pointer",textAlign:"left"}} onMouseOver={e=>e.currentTarget.style.color="var(--gold)"} onMouseOut={e=>e.currentTarget.style.color="var(--text-muted)"}>{l}</button>
          ))}
        </div>
      </div>
      <div>
        <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--cream)",marginBottom:20}}>Legal</p>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
          {data.footer.links.map(l=><span key={l} style={{fontSize:13,color:"var(--text-muted)",cursor:"pointer"}}>{l}</span>)}
        </div>
        <a href="https://maps.google.com/?q=Brigade+Road+Bangalore" target="_blank" rel="noopener noreferrer" style={{display:"block",padding:16,borderRadius:10,background:"var(--navy-700)",border:"1px solid var(--border-light)",textDecoration:"none"}}>
          <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--gold)",marginBottom:4}}>📍 Find Us</p>
          <p style={{fontSize:12,color:"var(--text-muted)",marginBottom:8}}>Brigade Road, Bangalore</p>
          <p style={{fontSize:12,fontWeight:700,color:"var(--gold)"}}>Open in Google Maps →</p>
        </a>
      </div>
    </div>
    <div style={{borderTop:"1px solid var(--border)",padding:"16px 24px",textAlign:"center",fontSize:12,color:"var(--text-muted)"}}>{data.footer.text}</div>
  </footer>
);

/* ─── Team Modal ──────────────────────────────────────────────────────────── */
const TeamModal=({member,index,onClose})=>{
  if(!member)return null;
  return(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{maxWidth:520}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:32}}>
          <button onClick={onClose} style={{float:"right",background:"var(--navy-600)",border:"1px solid var(--border-light)",color:"var(--cream)",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>
          <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:24}}>
            <img src={IMGS.team[index]} alt={member.name} style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",objectPosition:"top",border:"3px solid var(--gold)"}}/>
            <div>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800}}>{member.name}</h3>
              <p style={{fontSize:13,color:"var(--gold)"}}>{member.role}</p>
              <p style={{fontSize:11,color:"var(--text-muted)",marginTop:2}}>{member.exp} experience</p>
            </div>
          </div>
          <p style={{fontSize:13,color:"var(--text-muted)",lineHeight:1.7,marginBottom:20}}>{member.bio}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
            {member.skills.map((s,i)=><span key={i} style={{fontSize:11,padding:"4px 12px",borderRadius:4,background:"var(--navy-600)",color:"var(--cream)",border:"1px solid var(--border-light)"}}>{s}</span>)}
          </div>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:6,background:"#0A66C2",color:"#fff",textDecoration:"none",fontSize:13,fontWeight:700}}><LinkedInIcon size={14} color="#fff"/> Connect on LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

/* ─── Follow Us Section ───────────────────────────────────────────────────── */
const FollowUsSection=()=>{
  const platforms=[
    {cls:"spc-ig",icon:<InstagramIcon size={30} color="#fff"/>,name:"Instagram",handle:"@buildcore.in",followers:"48.2K",posts:"320",desc:"Daily project updates, design inspo & behind-the-scenes content",cta:"Follow",url:data.social.instagram},
    {cls:"spc-fb",icon:<FacebookIcon size={30} color="#fff"/>,name:"Facebook",handle:"BuildCore Constructions",followers:"32.1K",posts:"180",desc:"Project showcases, client stories & construction news",cta:"Like Page",url:data.social.facebook},
    {cls:"spc-li",icon:<LinkedInIcon size={30} color="#fff"/>,name:"LinkedIn",handle:"BuildCore Constructions",followers:"18.5K",posts:"95",desc:"Professional insights, careers & company milestones",cta:"Connect",url:data.social.linkedin},
    {cls:"spc-yt",icon:<YouTubeIcon size={30} color="#fff"/>,name:"YouTube",handle:"BuildCore Official",followers:"12.3K",posts:"64",desc:"Full project walkthroughs, time-lapses & expert interviews",cta:"Subscribe",url:data.social.youtube},
  ];
  const followIcons=[
    {ringCls:"fir-ig",icon:<InstagramIcon size={26} color="#fff"/>,label:"Instagram",url:data.social.instagram},
    {ringCls:"fir-fb",icon:<FacebookIcon  size={26} color="#fff"/>,label:"Facebook",url:data.social.facebook},
    {ringCls:"fir-li",icon:<LinkedInIcon  size={26} color="#fff"/>,label:"LinkedIn",url:data.social.linkedin},
    {ringCls:"fir-yt",icon:<YouTubeIcon   size={26} color="#fff"/>,label:"YouTube",url:data.social.youtube},
    {ringCls:"fir-wa",icon:<WhatsAppSVG   size={24}/>,label:"WhatsApp",url:`https://wa.me/${data.contact.whatsapp}`},
  ];
  return(
    <section style={{background:"linear-gradient(160deg,#0A071A 0%,#180B36 40%,#07050F 100%)",padding:"100px 0 80px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <SectionLabel>Stay Connected</SectionLabel>
          <SectionHeading center>Follow Our Journey</SectionHeading>
          <p style={{fontSize:14,color:"var(--text-muted)",maxWidth:480,margin:"0 auto 40px"}}>Behind-the-scenes construction updates, design inspiration, and project stories.</p>
          <div style={{display:"flex",justifyContent:"center",gap:28,flexWrap:"wrap"}}>
            {followIcons.map((fi,i)=>(
              <a key={i} href={fi.url} target="_blank" rel="noopener noreferrer" className="follow-icon-btn">
                <div className={`follow-icon-ring ${fi.ringCls}`}>{fi.icon}</div>
                <span style={{fontSize:11,fontWeight:700,color:"var(--text-soft)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{fi.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18,marginBottom:56}}>
          {platforms.map((p,i)=>(
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className={`social-platform-card ${p.cls}`}>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{marginBottom:14}}>{p.icon}</div>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10,gap:8}}>
                  <div>
                    <p style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1.1}}>{p.name}</p>
                    <p style={{fontSize:11,color:"rgba(255,255,255,.75)",marginTop:3}}>{p.handle}</p>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <p style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1}}>{p.followers}</p>
                    <p style={{fontSize:10,color:"rgba(255,255,255,.7)"}}>Followers</p>
                  </div>
                </div>
                <p style={{fontSize:12,color:"rgba(255,255,255,.82)",lineHeight:1.6,marginBottom:16}}>{p.desc}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span className="spc-stat">{p.posts} Posts</span>
                  <span style={{fontSize:12,color:"rgba(255,255,255,.95)",fontWeight:700}}>{p.cta} →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{marginBottom:32}}>
          <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--text-muted)",marginBottom:14,textAlign:"center"}}>Latest from Instagram</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
            {IMGS.feed.map((img,i)=>(
              <a key={i} href={data.social.instagram} target="_blank" rel="noopener noreferrer" className="feed-item" style={{aspectRatio:"1"}}>
                <img src={img} alt={`post-${i}`}/>
                <div className="feed-overlay"><InstagramIcon size={16} color="rgba(255,255,255,.9)"/></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── All Pages ───────────────────────────────────────────────────────────── */
const HomePage=({setPage})=>{
  const [slide,setSlide]=useState(0);
  const total=IMGS.heroSlides.length;
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%total),5000);return()=>clearInterval(t)},[total]);
  return(
    <div>
      <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
        {IMGS.heroSlides.map((img,i)=>(
          <div key={i} className="hero-slide" style={{opacity:i===slide?1:0}}>
            <img src={img} alt={`slide-${i}`} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
            <div className="img-overlay"/>
          </div>
        ))}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:200,background:"linear-gradient(to top,var(--navy-900) 0%,transparent 100%)",zIndex:3}}/>
        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",gap:8}}>
          {IMGS.heroSlides.map((_,i)=><button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?32:10,height:10,borderRadius:5,background:i===slide?"var(--gold)":"rgba(255,255,255,.4)",border:"none",cursor:"pointer",transition:"all .4s"}}/>)}
        </div>
        <button onClick={()=>setSlide(s=>(s-1+total)%total)} style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",zIndex:10,background:"rgba(232,160,48,.18)",border:"1px solid var(--gold)",color:"var(--gold)",width:44,height:44,borderRadius:"50%",fontSize:18,cursor:"pointer",backdropFilter:"blur(6px)"}}>‹</button>
        <button onClick={()=>setSlide(s=>(s+1)%total)} style={{position:"absolute",right:20,top:"50%",transform:"translateY(-50%)",zIndex:10,background:"rgba(232,160,48,.18)",border:"1px solid var(--gold)",color:"var(--gold)",width:44,height:44,borderRadius:"50%",fontSize:18,cursor:"pointer",backdropFilter:"blur(6px)"}}>›</button>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",zIndex:5}}>
          <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",width:"100%"}}>
            <div style={{maxWidth:680}}>
              <div key={slide} className="slide-in">
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                  <div style={{width:48,height:2,background:"linear-gradient(90deg,#9B5DE5,var(--gold))"}}/>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--gold)"}}>{IMGS.heroCaptions[slide].tag} · Est. 2009</span>
                </div>
                <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:800,lineHeight:1.04,marginBottom:24}}>{IMGS.heroCaptions[slide].heading}</h1>
              </div>
              <p className="fade-up" style={{color:"rgba(240,238,255,0.82)",fontSize:17,lineHeight:1.7,maxWidth:520,marginBottom:36,animationDelay:"0.2s",opacity:0}}>Trusted construction services for residential and commercial projects across India.</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:14}}>
                <button onClick={()=>setPage("Booking")} className="gold-btn" style={{padding:"14px 32px",borderRadius:8,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase"}}>Book Free Consultation</button>
                <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"14px 32px",borderRadius:8,fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",background:"rgba(37,211,102,.14)",border:"1.5px solid #25D366",color:"#25D366",textDecoration:"none"}}><WhatsAppSVG size={15}/> WhatsApp Us</a>
                <button onClick={()=>setPage("Projects")} className="outline-btn" style={{padding:"14px 32px",borderRadius:8,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase"}}>View Projects</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{background:"linear-gradient(90deg,#C87820,#F0A030,#C87820)"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"20px 24px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {data.home.stats.map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <p style={{fontSize:28,fontWeight:800,color:"var(--navy-900)",fontFamily:"'Barlow Condensed',sans-serif"}}>{s.value}</p>
              <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,color:"rgba(7,5,15,.7)"}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <section style={{background:"linear-gradient(160deg,#07050F 0%,#0F0A20 40%,#160B2E 80%,#07050F 100%)",padding:"96px 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:60}}>
            <SectionLabel>Why BuildCore</SectionLabel>
            <SectionHeading center>Built Different. Built Better.</SectionHeading>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {data.home.features.map((f,i)=>(
              <div key={i} className="card-hover" style={{padding:32,borderRadius:16,border:"1px solid var(--border-light)"}}>
                <FeatureIcon type={f.icon}/>
                <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,marginBottom:8}}>{f.title}</h3>
                <p style={{fontSize:13,color:"var(--text-muted)",lineHeight:1.7}}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{background:"linear-gradient(145deg,#110D28,#1C1244)",padding:"64px 0",borderTop:"1px solid var(--border-light)",borderBottom:"1px solid var(--border-light)"}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1fr auto",gap:32,alignItems:"center"}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"var(--gold)",marginBottom:8}}>Free Consultation</p>
            <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:800,marginBottom:8}}>Ready to start your project?</h3>
            <p style={{fontSize:13,color:"var(--text-muted)"}}>Book a free 30–60 min consultation with one of our senior experts. No commitments required.</p>
            <div style={{display:"flex",gap:16,marginTop:16,flexWrap:"wrap"}}>
              {["✅ 100% Free","⚡ 48hr Confirmation","👤 Senior Consultant","📍 Online or In-Person"].map((t,i)=>(
                <span key={i} style={{fontSize:11,color:"var(--text-soft)",fontWeight:600}}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12,flexShrink:0}}>
            <button onClick={()=>setPage("Booking")} className="gold-btn" style={{padding:"14px 32px",borderRadius:8,fontSize:13,letterSpacing:".08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>Book Consultation →</button>
            <button onClick={()=>setPage("Contact")} className="outline-btn" style={{padding:"12px 28px",borderRadius:8,fontSize:12,letterSpacing:".08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>Get a Quote</button>
          </div>
        </div>
      </section>
      <section style={{background:"linear-gradient(160deg,#07050F,#0F0A22 50%,#160E30 100%)",padding:"96px 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:60}}>
            <SectionLabel>Client Stories</SectionLabel>
            <SectionHeading center>Trusted by Hundreds Across India</SectionHeading>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
            {data.home.testimonialsPreview.map((t,i)=>(
              <div key={i} className="card-hover" style={{padding:32,borderRadius:16,border:"1px solid var(--border-light)"}}>
                <Stars/>
                <p style={{fontSize:13,color:"var(--text-muted)",lineHeight:1.8,margin:"14px 0"}}>"{t.feedback}"</p>
                <p style={{fontWeight:700,fontSize:14,color:"var(--cream)"}}>{t.name}</p>
                <p style={{fontSize:12,color:"var(--gold)",marginTop:2}}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FollowUsSection/>
      <section style={{position:"relative",padding:"112px 0",overflow:"hidden"}}>
        <img src={IMGS.ctaBg} alt="cta" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(232,160,48,0.88)"}}/>
        <div style={{position:"relative",maxWidth:720,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
          <h2 style={{color:"var(--navy-900)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,marginBottom:16}}>Ready to Build Your Dream?</h2>
          <p style={{fontSize:15,color:"rgba(7,5,15,.78)",marginBottom:32}}>Get a free consultation and detailed quote within 48 hours. No obligations, just honest advice.</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:16}}>
            <button onClick={()=>setPage("Booking")} style={{padding:"14px 36px",borderRadius:8,fontWeight:800,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",background:"var(--navy-900)",color:"var(--gold)",border:"none",cursor:"pointer"}}>Book Free Consultation</button>
            <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"14px 36px",borderRadius:8,fontWeight:800,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",background:"#25D366",color:"#fff",textDecoration:"none"}}><WhatsAppSVG size={15}/> WhatsApp Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage=({setPage})=>(
  <div style={{paddingTop:64}}>
    <section style={{position:"relative",padding:"128px 0",overflow:"hidden"}}>
      <img src={IMGS.about} alt="about" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.9) 0%,rgba(24,11,54,.7) 100%)"}}/>
      <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",zIndex:2}}>
        <SectionLabel>About BuildCore</SectionLabel>
        <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:800,maxWidth:700,marginBottom:16,lineHeight:1.04}}>15 Years of Building India's Best</h1>
        <p style={{fontSize:16,color:"rgba(240,238,255,.78)",maxWidth:560,lineHeight:1.8}}>{data.about.intro}</p>
      </div>
    </section>
    <section style={{background:"linear-gradient(160deg,#07050F 0%,#0F0A20 40%,#1A0D3A 80%,#07050F 100%)",padding:"96px 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
        <div>
          <div style={{borderLeft:"4px solid var(--gold)",paddingLeft:24,marginBottom:32}}>
            <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--gold)",marginBottom:8}}>Our Mission</p>
            <p style={{fontSize:18,color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1.5}}>{data.about.mission}</p>
          </div>
          <div style={{borderLeft:"4px solid var(--border-light)",paddingLeft:24,marginBottom:32}}>
            <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--gold)",marginBottom:8}}>Our Vision</p>
            <p style={{fontSize:18,color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1.5}}>{data.about.vision}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {data.about.values.map((v,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:10,background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)"}}>
                <span style={{color:"var(--gold)",fontSize:16}}>▸</span>
                <span style={{fontSize:14,color:"var(--cream)"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"relative"}}>
          <img src={IMGS.aboutOffice} alt="office" style={{borderRadius:16,width:"100%",objectFit:"cover",height:420}}/>
          <div style={{position:"absolute",bottom:24,left:24,padding:20,borderRadius:12,background:"rgba(7,5,15,.94)",backdropFilter:"blur(14px)",border:"1px solid var(--border-light)"}}>
            <div style={{display:"flex",gap:24}}>
              {[["500+","Projects"],["15+","Years"],["98%","Satisfaction"]].map(([v,l],i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <p style={{fontSize:28,fontWeight:800,color:"var(--gold)",fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</p>
                  <p style={{fontSize:11,color:"var(--text-muted)"}}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style={{background:"linear-gradient(145deg,#110D28,#1C1244,#0F0920)",padding:"64px 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--gold)",textAlign:"center",marginBottom:24}}>Recognition & Certifications</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
          {data.about.awards.map((a,i)=>(
            <div key={i} style={{padding:16,borderRadius:10,border:"1px solid var(--border-light)",textAlign:"center",fontSize:13,color:"var(--cream)",background:"linear-gradient(145deg,#140E2E,#1C1542)"}}>🏆 {a}</div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const WhyUsPage=({setPage})=>{
  const statIcons={
    build:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="6" height="4"/><rect x="9" y="3" width="6" height="4"/><rect x="16" y="3" width="6" height="4"/><path d="M4 7v10M12 7v10M20 7v10M2 17h20"/></svg>,
    money:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    fast:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    shield:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  };
  return(
    <div style={{paddingTop:64}}>
      <section style={{position:"relative",padding:"128px 0",overflow:"hidden"}}>
        <img src={IMGS.whyUsBg} alt="why us" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.9),rgba(24,11,54,.75))"}}/>
        <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
          <SectionLabel>Why BuildCore</SectionLabel>
          <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2.2rem,5vw,4.5rem)",fontWeight:800,marginBottom:16,lineHeight:1.08}}>{data.whyUs.headline}</h1>
          <p style={{fontSize:16,color:"rgba(240,238,255,.75)",maxWidth:520,margin:"0 auto"}}>{data.whyUs.subtitle}</p>
        </div>
      </section>
      <div style={{background:"linear-gradient(90deg,#C87820,#F0A030,#C87820)"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"24px 24px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {data.whyUs.stats.map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(7,5,15,.15)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>{statIcons[s.iconType]}</div>
              <p style={{fontSize:28,fontWeight:800,color:"var(--navy-900)",fontFamily:"'Barlow Condensed',sans-serif"}}>{s.value}</p>
              <p style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(7,5,15,.72)"}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"96px 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <SectionLabel>Our Differentiators</SectionLabel>
            <SectionHeading center>What Sets Us Apart</SectionHeading>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {data.whyUs.pillars.map((p,i)=>(
              <div key={i} className="card-hover" style={{padding:32,borderRadius:16,border:"1px solid var(--border-light)"}}>
                <WhyIcon type={p.iconType}/>
                <span style={{display:"inline-block",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20,background:"rgba(232,160,48,.14)",color:"var(--gold)",border:"1px solid rgba(232,160,48,.3)",marginBottom:14}}>{p.highlight}</span>
                <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,marginBottom:10}}>{p.title}</h3>
                <p style={{fontSize:13,color:"var(--text-muted)",lineHeight:1.7}}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{background:"linear-gradient(145deg,#110D28,#1C1244,#0F0920)",padding:"96px 0"}}>
        <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <SectionLabel>Comparison</SectionLabel>
            <SectionHeading center>BuildCore vs Others</SectionHeading>
          </div>
          <div style={{borderRadius:14,border:"1px solid var(--border-light)",overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"16px 24px",background:"linear-gradient(90deg,#C87820,#F0A030)"}}>
              {["Feature","BuildCore","Others"].map((h,i)=><p key={i} style={{fontSize:13,fontWeight:700,color:"var(--navy-900)",textAlign:i>0?"center":"left"}}>{h}</p>)}
            </div>
            {data.whyUs.comparison.map((c,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"14px 24px",borderTop:"1px solid var(--border-light)",alignItems:"center",background:i%2===0?"linear-gradient(145deg,#140E2E,#1A1240)":"linear-gradient(145deg,#0F0A1E,#160E2C)"}}>
                <p style={{fontSize:13,color:"var(--cream)"}}>{c.feature}</p>
                <div style={{textAlign:"center",fontSize:16}}>{c.us?"✅":"❌"}</div>
                <div style={{textAlign:"center",fontSize:16}}>{c.others?"✅":"❌"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage=({setPage})=>(
  <div style={{paddingTop:64}}>
    <section style={{position:"relative",padding:"112px 0",overflow:"hidden"}}>
      <img src={IMGS.services[0]} alt="services" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.88),rgba(24,11,54,.72))"}}/>
      <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
        <SectionLabel>What We Do</SectionLabel>
        <SectionHeading center>End-to-End Construction Services</SectionHeading>
      </div>
    </section>
    <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"96px 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
        {data.services.map((s,i)=>(
          <div key={i} className="card-hover" style={{borderRadius:16,border:"1px solid var(--border-light)",overflow:"hidden"}}>
            <div style={{position:"relative",height:180}}>
              <img src={IMGS.services[i]} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(7,5,15,.4)"}}/>
              <span style={{position:"absolute",bottom:12,left:16,fontSize:26}}>{s.icon}</span>
            </div>
            <div style={{padding:28}}>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,marginBottom:8}}>{s.title}</h3>
              <p style={{fontSize:13,color:"var(--text-muted)",lineHeight:1.7,marginBottom:18}}>{s.description}</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {s.items.map((item,j)=><span key={j} style={{fontSize:13,color:"var(--cream)",display:"flex",alignItems:"center",gap:8}}><span style={{color:"var(--gold)"}}>✓</span>{item}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const PricingPage=({setPage})=>(
  <div style={{paddingTop:64}}>
    <section style={{position:"relative",padding:"112px 0",overflow:"hidden"}}>
      <img src={IMGS.pricingBg} alt="pricing" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.88),rgba(24,11,54,.72))"}}/>
      <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
        <SectionLabel>Transparent Pricing</SectionLabel>
        <SectionHeading center>Clear Plans. No Hidden Costs.</SectionHeading>
      </div>
    </section>
    <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"96px 0"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
        {data.pricing.map((p,i)=>(
          <div key={i} className="card-hover" style={{borderRadius:16,border:p.badge?"2px solid var(--gold)":"1px solid var(--border-light)",overflow:"hidden",display:"flex",flexDirection:"column"}}>
            {p.badge&&<div style={{textAlign:"center",padding:"8px",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",background:"linear-gradient(90deg,#C87820,#F0A030)",color:"var(--navy-900)"}}>{p.badge}</div>}
            <div style={{padding:32,display:"flex",flexDirection:"column",flex:1}}>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,marginBottom:8}}>{p.plan}</h3>
              <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:24}}>
                <span style={{fontSize:36,fontWeight:800,color:"var(--gold)",fontFamily:"'Barlow Condensed',sans-serif"}}>{p.price}</span>
                <span style={{fontSize:13,color:"var(--text-muted)"}}>{p.unit}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28,flex:1}}>
                {p.features.map((f,j)=><span key={j} style={{fontSize:13,color:"var(--cream)",display:"flex",alignItems:"flex-start",gap:8}}><span style={{color:"var(--gold)",flexShrink:0}}>✓</span>{f}</span>)}
              </div>
              <button onClick={()=>setPage("Booking")} className={p.badge?"gold-btn":"outline-btn"} style={{width:"100%",padding:"12px",borderRadius:8,fontSize:12,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>{p.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ProjectDetailPage=({project,projectIndex,onBack,setPage})=>{
  const [imgIdx,setImgIdx]=useState(0);
  if(!project)return null;
  const gallery=[IMGS.projects[projectIndex],IMGS.projectDetails[1],IMGS.projectDetails[2],IMGS.projectDetails[3]];
  return(
    <div style={{paddingTop:64}}>
      <section style={{position:"relative",height:480,overflow:"hidden"}}>
        <img key={imgIdx} src={gallery[imgIdx]} alt={project.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",transition:"opacity .5s"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.75) 0%,rgba(24,11,54,.5) 100%)"}}/>
        <div style={{position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:10,zIndex:5}}>
          {gallery.map((_,i)=><button key={i} onClick={()=>setImgIdx(i)} style={{width:i===imgIdx?28:10,height:10,borderRadius:5,background:i===imgIdx?"var(--gold)":"rgba(255,255,255,.5)",border:"none",cursor:"pointer",transition:"all .3s"}}/>)}
        </div>
        <button onClick={()=>setImgIdx(s=>(s-1+gallery.length)%gallery.length)} style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",zIndex:5,background:"rgba(232,160,48,.2)",border:"1px solid var(--gold)",color:"var(--gold)",width:42,height:42,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>‹</button>
        <button onClick={()=>setImgIdx(s=>(s+1)%gallery.length)} style={{position:"absolute",right:20,top:"50%",transform:"translateY(-50%)",zIndex:5,background:"rgba(232,160,48,.2)",border:"1px solid var(--gold)",color:"var(--gold)",width:42,height:42,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>›</button>
        <div style={{position:"absolute",top:20,left:24,zIndex:5,display:"flex",alignItems:"center",gap:6,background:"rgba(232,160,48,.92)",color:"var(--navy-900)",fontSize:11,fontWeight:700,padding:"5px 14px",borderRadius:20,textTransform:"uppercase"}}>{project.type}</div>
        <button onClick={onBack} className="back-btn" style={{position:"absolute",top:20,right:24,zIndex:5}}><ArrowLeftIcon size={15}/> Back</button>
        <div style={{position:"absolute",bottom:60,left:0,right:0,padding:"0 40px",zIndex:5}}>
          <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,lineHeight:1.04,marginBottom:8}}>{project.title}</h1>
          <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <span style={{fontSize:13,color:"rgba(240,238,255,.75)"}}>{project.location}</span>
            <span style={{fontSize:13,color:"rgba(240,238,255,.75)"}}>· {project.year}</span>
          </div>
        </div>
      </section>
      <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"64px 0 96px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"1fr 380px",gap:48,alignItems:"start"}}>
          <div>
            <SectionLabel>Project Overview</SectionLabel>
            <p style={{fontSize:15,color:"var(--text-soft)",lineHeight:1.85,marginBottom:32}}>{project.longDesc||project.description}</p>
            <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,marginBottom:16}}>Key Highlights</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:40}}>
              {project.highlights.map((h,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderRadius:10,background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)"}}>
                  <span style={{color:"var(--gold)",fontSize:14,fontWeight:700,flexShrink:0}}>✓</span>
                  <span style={{fontSize:13,color:"var(--cream)",fontWeight:600}}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"sticky",top:80}}>
            <div style={{padding:28,borderRadius:16,border:"1px solid var(--border-light)",background:"linear-gradient(145deg,#140E2E,#1C1542)",marginBottom:20}}>
              <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,marginBottom:20}}>Project Details</h3>
              {[{label:"Client",val:project.client},{label:"Location",val:project.location},{label:"Type",val:project.type},{label:"Area",val:project.area},{label:"Duration",val:project.duration},{label:"Completed",val:project.year}].map((d,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid var(--border)",gap:12}}>
                  <span style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700}}>{d.label}</span>
                  <span style={{fontSize:13,color:"var(--cream)",fontWeight:600,textAlign:"right"}}>{d.val}</span>
                </div>
              ))}
              <div style={{paddingTop:12}}>
                <span style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700}}>Project Value</span>
                <p style={{fontSize:28,fontWeight:800,color:"var(--gold)",fontFamily:"'Barlow Condensed',sans-serif",marginTop:4}}>{project.value}</p>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <button onClick={()=>setPage("Booking")} className="gold-btn" style={{width:"100%",padding:"14px",borderRadius:8,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase"}}>Book Consultation →</button>
              <button onClick={onBack} className="outline-btn" style={{width:"100%",padding:"12px",borderRadius:8,fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><ArrowLeftIcon size={14}/> All Projects</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectsPage=({setPage})=>{
  const [filter,setFilter]=useState("All");
  const [selectedProject,setSelectedProject]=useState(null);
  const [selectedIndex,setSelectedIndex]=useState(null);
  const filtered=filter==="All"?data.projects:data.projects.filter(p=>p.type===filter);
  if(selectedProject){
    return <ProjectDetailPage project={selectedProject} projectIndex={selectedIndex} onBack={()=>{setSelectedProject(null);setSelectedIndex(null);}} setPage={setPage}/>;
  }
  return(
    <div style={{paddingTop:64}}>
      <section style={{position:"relative",padding:"112px 0",overflow:"hidden"}}>
        <img src={IMGS.projects[0]} alt="projects" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.88),rgba(24,11,54,.72))"}}/>
        <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
          <SectionLabel>Our Portfolio</SectionLabel>
          <SectionHeading center>500+ Projects. Countless Stories.</SectionHeading>
        </div>
      </section>
      <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"96px 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
          <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:48}}>
            {["All","Residential","Commercial"].map(f=><button key={f} className={`tab-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
            {filtered.map((p,i)=>{
              const origIdx=data.projects.indexOf(p);
              return(
                <div key={i} className="card-hover" style={{borderRadius:16,border:"1px solid var(--border-light)",overflow:"hidden",cursor:"pointer"}} onClick={()=>{setSelectedProject(p);setSelectedIndex(origIdx);window.scrollTo({top:0,behavior:"smooth"});}}>
                  <div style={{position:"relative",height:220}}>
                    <img src={IMGS.projects[origIdx]} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,5,15,.75) 0%,transparent 50%)"}}/>
                    <div style={{position:"absolute",top:12,right:12,fontSize:11,fontWeight:700,textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(232,160,48,.92)",color:"var(--navy-900)"}}>{p.type}</div>
                    <div style={{position:"absolute",bottom:12,left:16,fontSize:12,color:"rgba(240,238,255,.85)"}}>{p.location}</div>
                  </div>
                  <div style={{padding:24}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                      <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800}}>{p.title}</h3>
                      <span style={{fontSize:11,color:"var(--text-muted)"}}>{p.year}</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
                      <span style={{fontSize:16,fontWeight:800,color:"var(--gold)",fontFamily:"'Barlow Condensed',sans-serif"}}>{p.value}</span>
                      <span style={{fontSize:12,fontWeight:700,color:"var(--gold)"}}>View Details →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const deptColors={
  "Leadership":{bg:"rgba(232,160,48,.12)",color:"#F0B840",border:"rgba(232,160,48,.3)"},
  "Operations":{bg:"rgba(99,179,237,.10)",color:"#63B3ED",border:"rgba(99,179,237,.3)"},
  "Design":{bg:"rgba(154,117,235,.12)",color:"#B794F4",border:"rgba(154,117,235,.3)"},
  "Engineering":{bg:"rgba(72,199,142,.10)",color:"#48C78E",border:"rgba(72,199,142,.3)"},
  "Client Success":{bg:"rgba(252,129,74,.10)",color:"#FC814A",border:"rgba(252,129,74,.3)"},
  "Green Initiatives":{bg:"rgba(72,199,142,.10)",color:"#48C78E",border:"rgba(72,199,142,.3)"},
};

const TeamPage=()=>{
  const [selected,setSelected]=useState(null);
  const [selIdx,setSelIdx]=useState(null);
  const [filter,setFilter]=useState("All");
  const depts=["All",...Array.from(new Set(data.team.map(m=>m.dept)))];
  const filtered=filter==="All"?data.team:data.team.filter(m=>m.dept===filter);
  return(
    <div style={{paddingTop:64}}>
      {selected&&<TeamModal member={selected} index={selIdx} onClose={()=>setSelected(null)}/>}
      <section style={{position:"relative",padding:"128px 0",overflow:"hidden"}}>
        <img src={IMGS.teamHero} alt="team" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.92),rgba(24,11,54,.78))"}}/>
        <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",zIndex:2}}>
          <SectionLabel>Our People</SectionLabel>
          <h1 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2.8rem,6vw,5rem)",fontWeight:800,maxWidth:680,lineHeight:1.02,marginBottom:20}}>The Minds Behind BuildCore</h1>
        </div>
      </section>
      <div style={{background:"linear-gradient(145deg,#110D28,#1C1244)",borderBottom:"1px solid var(--border)",position:"sticky",top:64,zIndex:30}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"14px 24px",display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
          {depts.map(d=><button key={d} className={`tab-btn ${filter===d?"active":""}`} onClick={()=>setFilter(d)}>{d}</button>)}
        </div>
      </div>
      <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#160D30,#07050F)",padding:"64px 24px 96px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexDirection:"column",gap:18}}>
          {filtered.map((m,idx)=>{
            const origIdx=data.team.indexOf(m);
            const dc=deptColors[m.dept]||{bg:"rgba(232,160,48,.1)",color:"var(--gold)",border:"rgba(232,160,48,.25)"};
            return(
              <div key={idx} className="team-hcard" onClick={()=>{setSelected(m);setSelIdx(origIdx);}}>
                <div className="team-hcard-photo" style={{width:180,flexShrink:0,overflow:"hidden",position:"relative"}}>
                  <img src={IMGS.team[origIdx]} alt={m.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",transition:"transform .4s",display:"block",minHeight:200}}/>
                </div>
                <div style={{flex:1,padding:"24px 28px 24px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between",minWidth:0}}>
                  <div>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:4}}>
                      <div>
                        <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,lineHeight:1.1,marginBottom:2}}>{m.name}</h3>
                        <p style={{fontSize:11,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.12em",fontWeight:700}}>{m.role}</p>
                      </div>
                      <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",padding:"4px 12px",borderRadius:20,background:dc.bg,color:dc.color,border:`1px solid ${dc.border}`,whiteSpace:"nowrap"}}>{m.dept}</span>
                    </div>
                    <p style={{fontSize:13,color:"var(--text-soft)",lineHeight:1.65,marginBottom:12,marginTop:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{m.bio}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {m.skills.map((sk,j)=><span key={j} style={{fontSize:10,padding:"3px 10px",borderRadius:4,background:"var(--navy-700)",color:"var(--text-soft)",border:"1px solid var(--border-light)",fontWeight:600}}>{sk}</span>)}
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16,paddingTop:14,borderTop:"1px solid var(--border)"}}>
                    <a href={m.linkedin} onClick={e=>e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="social-icon" style={{width:32,height:32,borderRadius:6}}><LinkedInIcon size={15} color="#0A66C2"/></a>
                    <span style={{fontSize:12,fontWeight:700,color:"var(--gold)"}}>View Full Profile →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const FAQPage=({setPage})=>(
  <div style={{paddingTop:64}}>
    <section style={{position:"relative",padding:"112px 0",overflow:"hidden"}}>
      <img src={IMGS.services[3]} alt="faq" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.88),rgba(24,11,54,.72))"}}/>
      <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
        <SectionLabel>FAQ</SectionLabel>
        <SectionHeading center>Questions We Hear All the Time</SectionHeading>
      </div>
    </section>
    <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"96px 0"}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px",display:"flex",flexDirection:"column",gap:12}}>
        {data.faq.map((f,i)=>(
          <details key={i} className="faq-item" style={{borderRadius:14,border:"1px solid var(--border-light)",background:"linear-gradient(145deg,#140E2E,#1C1542)"}}>
            <summary style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:24,gap:16}}>
              <span style={{fontWeight:700,fontSize:15,color:"var(--cream)"}}>{f.question}</span>
              <span style={{fontSize:20,color:"var(--gold)",flexShrink:0}}>+</span>
            </summary>
            <div style={{padding:"0 24px 24px",borderTop:"1px solid var(--border-light)"}}>
              <p style={{fontSize:13,color:"var(--text-muted)",lineHeight:1.8,paddingTop:16}}>{f.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <div style={{maxWidth:800,margin:"48px auto 0",padding:"0 24px"}}>
        <div style={{padding:40,borderRadius:16,border:"1px solid var(--border-light)",textAlign:"center",background:"linear-gradient(145deg,#140E2E,#1C1542)"}}>
          <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,marginBottom:8}}>Still have questions?</h3>
          <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Our team is happy to answer anything.</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
            <button onClick={()=>setPage("Booking")} className="gold-btn" style={{padding:"12px 28px",borderRadius:8,fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase"}}>Book Consultation</button>
            <button onClick={()=>setPage("Contact")} className="outline-btn" style={{padding:"12px 24px",borderRadius:8,fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase"}}>Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage=()=>{
  const [form,setForm]=useState({name:"",email:"",phone:"",service:"",message:""});
  const [sent,setSent]=useState(false);
  const update=(k,v)=>setForm(p=>({...p,[k]:v}));
  return(
    <div style={{paddingTop:64}}>
      <section style={{position:"relative",padding:"112px 0",overflow:"hidden"}}>
        <img src={IMGS.contactBg} alt="contact" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,5,15,.88),rgba(24,11,54,.72))"}}/>
        <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center",zIndex:2}}>
          <SectionLabel>Get In Touch</SectionLabel>
          <SectionHeading center>Let's Build Something Great Together</SectionHeading>
        </div>
      </section>
      <section style={{background:"linear-gradient(160deg,#07050F,#0F0A20,#1A0D3A,#07050F)",padding:"96px 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64}}>
          <div>
            <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,marginBottom:28}}>Contact Information</h3>
            {[{icon:"📍",label:"Address",val:data.contact.address},{icon:"📞",label:"Phone",val:data.contact.phone},{icon:"✉️",label:"Email",val:data.contact.email},{icon:"🕐",label:"Hours",val:data.contact.hours}].map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:14,padding:20,borderRadius:12,background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)"}}>
                <span style={{fontSize:20}}>{c.icon}</span>
                <div>
                  <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--gold)",fontWeight:700,marginBottom:4}}>{c.label}</p>
                  <p style={{fontSize:13,color:"var(--cream)"}}>{c.val}</p>
                </div>
              </div>
            ))}
            <div style={{padding:20,borderRadius:12,background:"linear-gradient(145deg,#140E2E,#1C1542)",border:"1px solid var(--border-light)",marginTop:8}}>
              <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--gold)",fontWeight:700,marginBottom:14}}>Follow Us</p>
              <SocialLinks/>
            </div>
          </div>
          <div>
            <div style={{padding:36,borderRadius:16,border:"1px solid var(--border-light)",background:"linear-gradient(145deg,#140E2E,#1C1542)"}}>
              {sent?(
                <div style={{textAlign:"center",padding:"48px 0"}}>
                  <p style={{fontSize:48,marginBottom:16}}>✅</p>
                  <h3 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,marginBottom:8}}>Message Sent!</h3>
                  <p style={{fontSize:13,color:"var(--text-muted)",marginBottom:24}}>Our team will reach out within 24 hours.</p>
                </div>
              ):(
                <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{display:"flex",flexDirection:"column",gap:16}}>
                  <h4 style={{color:"var(--cream)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,marginBottom:4}}>Send Us a Message</h4>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                    <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Full Name *</label>
                      <input required placeholder="Ravi Kumar" value={form.name} onChange={e=>update("name",e.target.value)}/></div>
                    <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Email *</label>
                      <input type="email" required placeholder="you@email.com" value={form.email} onChange={e=>update("email",e.target.value)}/></div>
                  </div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e=>update("phone",e.target.value)}/></div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Service</label>
                    <select value={form.service} onChange={e=>update("service",e.target.value)}>
                      <option value="">Select a service</option>
                      {data.services.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                    </select></div>
                  <div><label style={{display:"block",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--text-muted)",fontWeight:700,marginBottom:8}}>Message *</label>
                    <textarea required rows={4} placeholder="Tell us about your project..." value={form.message} onChange={e=>update("message",e.target.value)}/></div>
                  <button type="submit" className="gold-btn" style={{width:"100%",padding:"14px",borderRadius:8,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase"}}>Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── App Root ────────────────────────────────────────────────────────────── */
export default function App(){
  const [page,setPage]=useState("Home");
  const [scrolled,setScrolled]=useState(false);
  const [showSplash,setShowSplash]=useState(true);
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);

  useEffect(()=>{
    document.title="BuildCore Constructions | Premium Construction Services";
    const t=setTimeout(()=>setShowSplash(false),2800);
    return()=>clearTimeout(t);
  },[]);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[page]);

  const handleLogin=(u)=>{ setUser(u); setPage("Profile"); };
  const handleLogout=()=>{ setUser(null); setPage("Home"); };
  const handleUpdateUser=(u)=>setUser(u);

  const renderPage=()=>{
    const p={setPage};
    switch(page){
      case"Home":    return <HomePage {...p}/>;
      case"About":   return <AboutPage {...p}/>;
      case"Services":return <ServicesPage {...p}/>;
      case"Why Us":  return <WhyUsPage {...p}/>;
      case"Team":    return <TeamPage/>;
      case"Pricing": return <PricingPage {...p}/>;
      case"Projects":return <ProjectsPage {...p}/>;
      case"Booking": return <BookingPage setPage={setPage} user={user} onOpenAuth={()=>setShowAuth(true)}/>;
      case"FAQ":     return <FAQPage {...p}/>;
      case"Contact": return <ContactPage/>;
      case"Profile": return user
        ? <ProfilePage user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} setPage={setPage}/>
        : <HomePage {...p}/>;
      default:       return <HomePage {...p}/>;
    }
  };

  return(
    <div style={{background:"var(--grad-bg)",minHeight:"100vh",color:"var(--cream)"}}>
      <FontLoader/>
      {showSplash&&<SplashScreen/>}
      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onLogin={handleLogin}/>}
      <Navbar page={page} setPage={setPage} scrolled={scrolled} user={user} onOpenAuth={()=>setShowAuth(true)} onLogout={handleLogout}/>
      <main>{renderPage()}</main>
      <Footer setPage={setPage}/>
      <WhatsAppFloat/>
    </div>
  );
}
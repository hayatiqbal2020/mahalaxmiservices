import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div>
          <div className="badge"><i></i> Authorised Fire Extinguisher Dealer</div>
          <h1>Protecting Lives &amp; Property From <span>Fire</span></h1>
          <p>Mahalaxmi Services supplies, installs, refills and maintains ISI-marked fire extinguishers and fire safety systems for homes, offices, factories, hospitals, schools and commercial spaces across {site.city}.</p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary">Book a Free Site Visit →</a>
            <a href={site.telHref} className="btn btn-outline">📞 Call Now</a>
          </div>
          <div className="hero-points">
            <div><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffb400" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"></path></svg> ISI / BIS Certified</div>
            <div><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffb400" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"></path></svg> Same-Day Refilling</div>
            <div><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffb400" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"></path></svg> Fire NOC Assistance</div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow"></div>
          {/* Fire extinguisher illustration */}
          <svg className="ext" viewBox="0 0 220 380" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 62 C190 70 200 110 186 150 L176 148 C188 112 178 84 148 74Z" fill="#222"></path>
            <path d="M176 148 l14 4 -6 22 -14 -4Z" fill="#111"></path>
            <rect x="88" y="20" width="44" height="30" rx="6" fill="url(#gMetal)"></rect>
            <path d="M70 26 L132 26 L150 10 L156 16 L138 34 L70 34Z" fill="#2a2a2e"></path>
            <rect x="64" y="34" width="72" height="12" rx="4" fill="#2a2a2e"></rect>
            <circle cx="132" cy="44" r="10" fill="#fff" stroke="#333" strokeWidth="3"></circle>
            <path d="M132 44 l5 -5" stroke="#d7261e" strokeWidth="2.5" strokeLinecap="round"></path>
            <rect x="84" y="2" width="6" height="22" rx="2" fill="#ffb400"></rect>
            <circle cx="87" cy="6" r="6" fill="none" stroke="#ffb400" strokeWidth="3"></circle>
            <path d="M60 70 Q60 50 110 50 Q160 50 160 70 L160 350 Q160 368 142 368 L78 368 Q60 368 60 350Z" fill="url(#gRed)"></path>
            <rect x="70" y="120" width="80" height="140" rx="8" fill="#fff"></rect>
            <rect x="70" y="120" width="80" height="30" rx="8" fill="#141414"></rect>
            <rect x="70" y="140" width="80" height="10" fill="#141414"></rect>
            <text x="110" y="141" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="17" fill="#fff">FIRE</text>
            <text x="110" y="178" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="26" fill="#d7261e">ABC</text>
            <text x="110" y="196" textAnchor="middle" fontFamily="Poppins,Arial" fontSize="9" fill="#555">DRY POWDER</text>
            <rect x="80" y="206" width="60" height="3" fill="#eee"></rect>
            <g transform="translate(83 216)">
              <rect width="16" height="16" rx="3" fill="#2e7d32"></rect><text x="8" y="12" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Arial">A</text>
              <rect x="19" width="16" height="16" rx="3" fill="#d7261e"></rect><text x="27" y="12" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Arial">B</text>
              <rect x="38" width="16" height="16" rx="3" fill="#1565c0"></rect><text x="46" y="12" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Arial">C</text>
            </g>
            <text x="110" y="250" textAnchor="middle" fontFamily="Poppins,Arial" fontSize="8" fill="#888">MAHALAXMI SERVICES</text>
            <rect x="74" y="72" width="10" height="270" rx="5" fill="#fff" opacity=".18"></rect>
            <rect x="60" y="340" width="100" height="10" fill="#000" opacity=".2"></rect>
          </svg>
          <div className="float-card fc-1"><div className="ic">🧯</div><div>5000+ Units<small>Installed &amp; Serviced</small></div></div>
          <div className="float-card fc-2"><div className="ic">⚡</div><div>Fast Response<small>Within 4 hours</small></div></div>
        </div>
      </div>
      <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 40 C360 80 1080 0 1440 40 L1440 70 L0 70Z" fill="#fff"></path></svg>
    </section>
  );
}

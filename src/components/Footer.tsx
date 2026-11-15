import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <a href="#home" className="logo">
            <div className="logo-icon"><svg width="26" height="26"><use href="#flame"></use></svg></div>
            <div className="logo-text"><strong>MAHALAXMI <em>SERVICES</em></strong><small>Fire Safety Solutions</small></div>
          </a>
          <p className="about-f">Authorised fire extinguisher agency in {site.city} providing sales, refilling, installation and AMC services for homes and businesses.</p>
          <a href={site.adminLoginHref} className="admin-btn" rel="nofollow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>Admin Login</a>
          <div className="socials">
            {site.socials.facebook && <a href={site.socials.facebook} target="_blank" rel="noopener" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M14 9V7c0-1 .5-1.5 1.5-1.5H17V2h-3c-3 0-4 2-4 4.5V9H8v3.5h2V22h4v-9.5h2.6L17 9z"></path></svg></a>}
            {site.socials.instagram && <a href={site.socials.instagram} target="_blank" rel="noopener" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="#fff"></circle></svg></a>}
            {site.socials.youtube && <a href={site.socials.youtube} target="_blank" rel="noopener" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1c.4-1.5.4-4.5.4-4.5s0-3-.4-4.5zM9.7 15V9l5.6 3z"></path></svg></a>}
            {site.socials.linkedin && <a href={site.socials.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"></path></svg></a>}
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Extinguisher Sales</a></li>
            <li><a href="#services">Refilling</a></li>
            <li><a href="#services">AMC Contracts</a></li>
            <li><a href="#services">Hydro Testing</a></li>
            <li><a href="#services">Safety Training</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>📍 {site.addressLine1} {site.addressLine2}</li>
            <li>📞 <a href={site.telHref}>{site.phone}</a></li>
            <li>✉ <a href={site.mailHref}>{site.email}</a></li>
            <li>🕘 Mon – Sat : 9 AM – 7 PM</li>
          </ul>
        </div>
      </div>
      <div className="copy">© <span id="year">2026</span> Mahalaxmi Services. All rights reserved. | Stay Safe, Stay Protected 🔥
      </div>
    </footer>
  );
}

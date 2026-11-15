import { site } from "@/lib/site";

export default function WhyUs() {
  return (
    <section id="why">
      <div className="container">
        <div className="section-head reveal">
          <span className="tag">Why Choose Us</span>
          <h2>Safety You Can Rely On</h2>
          <p>We don&apos;t just sell extinguishers — we make sure you&apos;re truly protected.</p>
        </div>
        <div className="why-grid">
          <div className="why reveal"><div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7261e" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg></div><div><h4>Certified Products</h4><p>Only ISI/BIS-approved, quality-tested equipment from trusted brands.</p></div></div>
          <div className="why reveal"><div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7261e" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg></div><div><h4>Quick Response</h4><p>Same-day refilling and emergency service across {site.city}.</p></div></div>
          <div className="why reveal"><div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7261e" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div><div><h4>Best Prices</h4><p>Competitive, transparent pricing with no hidden charges.</p></div></div>
          <div className="why reveal"><div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7261e" strokeWidth="2"><circle cx="12" cy="8" r="6"></circle><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"></path></svg></div><div><h4>Expert Team</h4><p>Trained technicians with years of hands-on fire safety experience.</p></div></div>
          <div className="why reveal"><div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7261e" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></svg></div><div><h4>Proper Documentation</h4><p>Service tags, test certificates and records for audits &amp; inspections.</p></div></div>
          <div className="why reveal"><div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7261e" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"></path></svg></div><div><h4>24×7 Support</h4><p>Round-the-clock helpline for emergencies and service requests.</p></div></div>
        </div>
      </div>
    </section>
  );
}

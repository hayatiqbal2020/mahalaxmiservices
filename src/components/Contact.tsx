import QuoteForm from "./QuoteForm";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-info reveal">
          <h3>Get In Touch</h3>
          <p>Have a requirement or need a quote? Reach out — we&apos;ll respond quickly.</p>
          <div className="info-item"><div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div><small>Address</small><b>{site.addressLine1}<br />{site.addressLine2}</b></div></div>
          <div className="info-item"><div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"></path></svg></div><div><small>Phone</small><b><a href={site.telHref}>{site.phone}</a></b></div></div>
          <div className="info-item"><div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 6-10 7L2 6"></path></svg></div><div><small>Email</small><b><a href={site.mailHref}>{site.email}</a></b></div></div>
          <div className="info-item"><div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg></div><div><small>Working Hours</small><b>Mon – Sat : 9:00 AM – 7:00 PM</b></div></div>
          <div className="emergency"><small>🚨 24×7 Emergency Helpline</small><b>{site.phone}</b></div>
        </div>

        <QuoteForm />
      </div>
      <div className="container map-wrap reveal">
        <iframe
          className="map"
          src={site.mapEmbedSrc}
          title={`Map showing ${site.name}, ${site.city}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <a href={site.directionsHref} target="_blank" rel="noopener" className="btn btn-primary">📍 Get Directions</a>
      </div>
    </section>
  );
}

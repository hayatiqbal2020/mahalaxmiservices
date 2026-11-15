export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <div className="about-img reveal">
          <svg viewBox="0 0 200 200" fill="none">
            <path d="M100 10 L170 38 V95 C170 140 140 172 100 190 C60 172 30 140 30 95 V38Z" fill="#fff" opacity=".95"></path>
            <path d="M100 52c6 18 28 30 28 56a28 28 0 0 1-56 4c0-11 6-20 12-26-.5 9 3 16 10 19C92 90 94 70 100 52Z" fill="url(#gFlame)"></path>
          </svg>
          <div className="exp-box"><b>10+</b><span>Years of Trusted<br />Fire Safety Service</span></div>
        </div>
        <div className="about-text reveal">
          <span className="tag">About Us</span>
          <h2>Your Trusted Partner in Fire Safety</h2>
          <p>Mahalaxmi Services is an authorised agency for fire extinguishers and fire protection equipment. We help businesses and families stay prepared with the right equipment, timely maintenance and expert guidance — all as per Indian Standards (IS 2190 / IS 15683) and local fire department norms.</p>
          <p>From a single extinguisher for your home to complete fire safety setups for large factories, our trained technicians ensure every unit is ready to perform when it matters most.</p>
          <ul className="check-list">
            <li>Genuine ISI-marked products</li>
            <li>Trained &amp; certified technicians</li>
            <li>Doorstep refilling service</li>
            <li>Affordable AMC plans</li>
            <li>Fire audit &amp; NOC support</li>
            <li>Prompt after-sales service</li>
          </ul>
          <a href="#contact" className="btn btn-primary">Talk to Our Expert →</a>
        </div>
      </div>
    </section>
  );
}

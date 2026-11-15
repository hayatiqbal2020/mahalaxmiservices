export default function Testimonials() {
  return (
    <section>
      <div className="container">
        <div className="section-head reveal">
          <span className="tag">Testimonials</span>
          <h2>What Our Clients Say</h2>
        </div>
        <div className="testi-grid">
          <div className="testi reveal"><div className="stars">★★★★★</div><p>Mahalaxmi Services installed extinguishers across our factory and helped us with the fire NOC. Very professional team and timely service.</p><div className="who"><div className="avatar">RK</div><div><b>Rajesh K.</b><small>Factory Owner</small></div></div></div>
          <div className="testi reveal"><div className="stars">★★★★★</div><p>We have their AMC for our hospital. They never miss a refilling date and the documentation is always ready for inspections.</p><div className="who"><div className="avatar">SP</div><div><b>Dr. Sunita P.</b><small>Hospital Administrator</small></div></div></div>
          <div className="testi reveal"><div className="stars">★★★★★</div><p>Got all 40 extinguishers of our society refilled in a single day. Fair pricing and they also gave a free safety demo to residents.</p><div className="who"><div className="avatar">AM</div><div><b>Amit M.</b><small>Society Secretary</small></div></div></div>
        </div>
      </div>
    </section>
  );
}

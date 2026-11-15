export default function FireClasses() {
  return (
    <section className="classes">
      <div className="container">
        <div className="section-head reveal">
          <span className="tag">Know Your Fire</span>
          <h2>Classes of Fire</h2>
          <p>Using the right extinguisher on the right fire saves lives. Here&apos;s a quick guide.</p>
        </div>
        <div className="class-grid">
          <div className="class-card reveal"><div className="letter" style={{ background: "#2e7d32" }}>A</div><h4>Ordinary Solids</h4><p>Wood, paper, cloth, plastic, rubber</p></div>
          <div className="class-card reveal"><div className="letter" style={{ background: "#d7261e" }}>B</div><h4>Flammable Liquids</h4><p>Petrol, diesel, oil, paint, solvents</p></div>
          <div className="class-card reveal"><div className="letter" style={{ background: "#1565c0" }}>C</div><h4>Flammable Gases</h4><p>LPG, CNG, methane, butane</p></div>
          <div className="class-card reveal"><div className="letter" style={{ background: "#6a6a72" }}>D</div><h4>Metal Fires</h4><p>Magnesium, sodium, potassium</p></div>
          <div className="class-card reveal"><div className="letter" style={{ background: "#ff8f00" }}>K</div><h4>Kitchen Fires</h4><p>Cooking oils &amp; fats in kitchens</p></div>
        </div>
      </div>
    </section>
  );
}

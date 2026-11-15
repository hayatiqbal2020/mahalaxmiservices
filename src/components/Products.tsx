export default function Products() {
  return (
    <section id="products">
      <div className="container">
        <div className="section-head reveal">
          <span className="tag">Our Products</span>
          <h2>Fire Extinguishers For Every Need</h2>
          <p>Choose the right extinguisher for your space. Available in 1 kg to 75 kg capacities, portable and trolley-mounted.</p>
        </div>
        <div className="products-grid">
          {/* product template uses a small extinguisher svg with a band colour */}
          <div className="product reveal">
            <div className="product-top" style={{ background: "linear-gradient(135deg,#fff0ec,#ffe0d6)" }}><span className="class">Class A B C</span>
              <svg viewBox="0 0 80 160"><rect x="30" y="4" width="20" height="14" rx="3" fill="#333"></rect><path d="M50 10 q20 4 18 40" stroke="#222" strokeWidth="5" fill="none"></path><path d="M14 34 Q14 20 40 20 Q66 20 66 34 V148 Q66 156 58 156 H22 Q14 156 14 148Z" fill="url(#gRed)"></path><rect x="20" y="64" width="40" height="46" rx="4" fill="#fff"></rect><rect x="20" y="64" width="40" height="12" rx="4" fill="#1565c0"></rect><text x="40" y="96" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="12" fill="#d7261e">ABC</text></svg>
            </div>
            <div className="product-body">
              <h3>ABC Dry Powder</h3>
              <p>Multi-purpose extinguisher for solids, liquids &amp; electrical fires. Ideal for homes, offices and shops.</p>
              <div className="chips"><span>1 kg</span><span>2 kg</span><span>4 kg</span><span>6 kg</span><span>9 kg</span></div>
            </div>
          </div>
          <div className="product reveal">
            <div className="product-top" style={{ background: "linear-gradient(135deg,#f0f0f3,#dcdce3)" }}><span className="class">Class B C</span>
              <svg viewBox="0 0 80 160"><rect x="30" y="4" width="20" height="14" rx="3" fill="#333"></rect><path d="M50 10 q20 4 22 30 l-6 14 h10 l-4-14" stroke="#222" strokeWidth="5" fill="none"></path><path d="M18 34 Q18 20 40 20 Q62 20 62 34 V148 Q62 156 54 156 H26 Q18 156 18 148Z" fill="url(#gRed)"></path><rect x="24" y="64" width="32" height="46" rx="4" fill="#fff"></rect><rect x="24" y="64" width="32" height="12" rx="4" fill="#111"></rect><text x="40" y="96" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="12" fill="#111">CO₂</text></svg>
            </div>
            <div className="product-body">
              <h3>CO₂ Type</h3>
              <p>Leaves no residue — perfect for server rooms, electrical panels, labs and sensitive equipment.</p>
              <div className="chips"><span>2 kg</span><span>3 kg</span><span>4.5 kg</span><span>6.5 kg</span><span>9 kg</span></div>
            </div>
          </div>
          <div className="product reveal">
            <div className="product-top" style={{ background: "linear-gradient(135deg,#fff8e6,#ffecbc)" }}><span className="class">Class A B</span>
              <svg viewBox="0 0 80 160"><rect x="30" y="4" width="20" height="14" rx="3" fill="#333"></rect><path d="M50 10 q20 4 18 40" stroke="#222" strokeWidth="5" fill="none"></path><path d="M14 34 Q14 20 40 20 Q66 20 66 34 V148 Q66 156 58 156 H22 Q14 156 14 148Z" fill="url(#gRed)"></path><rect x="20" y="64" width="40" height="46" rx="4" fill="#fff"></rect><rect x="20" y="64" width="40" height="12" rx="4" fill="#f2b600"></rect><text x="40" y="96" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="11" fill="#c48a00">FOAM</text></svg>
            </div>
            <div className="product-body">
              <h3>Mechanical Foam</h3>
              <p>Smothers flammable liquid fires — suited for petrol pumps, garages, kitchens and warehouses.</p>
              <div className="chips"><span>9 L</span><span>50 L</span><span>Trolley</span></div>
            </div>
          </div>
          <div className="product reveal">
            <div className="product-top" style={{ background: "linear-gradient(135deg,#ecf6ff,#d3e9ff)" }}><span className="class">Class A</span>
              <svg viewBox="0 0 80 160"><rect x="30" y="4" width="20" height="14" rx="3" fill="#333"></rect><path d="M50 10 q20 4 18 40" stroke="#222" strokeWidth="5" fill="none"></path><path d="M14 34 Q14 20 40 20 Q66 20 66 34 V148 Q66 156 58 156 H22 Q14 156 14 148Z" fill="url(#gRed)"></path><rect x="20" y="64" width="40" height="46" rx="4" fill="#fff"></rect><rect x="20" y="64" width="40" height="12" rx="4" fill="#d7261e"></rect><text x="40" y="96" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="11" fill="#1565c0">WATER</text></svg>
            </div>
            <div className="product-body">
              <h3>Water / Water-CO₂</h3>
              <p>Economical choice for ordinary combustibles like wood, paper, cloth — schools and godowns.</p>
              <div className="chips"><span>9 L</span><span>Stored Pressure</span><span>Cartridge</span></div>
            </div>
          </div>
          <div className="product reveal">
            <div className="product-top" style={{ background: "linear-gradient(135deg,#eefaf2,#d2f1dd)" }}><span className="class">Clean Agent</span>
              <svg viewBox="0 0 80 160"><rect x="30" y="4" width="20" height="14" rx="3" fill="#333"></rect><path d="M50 10 q20 4 18 40" stroke="#222" strokeWidth="5" fill="none"></path><path d="M14 34 Q14 20 40 20 Q66 20 66 34 V148 Q66 156 58 156 H22 Q14 156 14 148Z" fill="url(#gRed)"></path><rect x="20" y="64" width="40" height="46" rx="4" fill="#fff"></rect><rect x="20" y="64" width="40" height="12" rx="4" fill="#2e7d32"></rect><text x="40" y="96" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="9" fill="#2e7d32">CLEAN</text></svg>
            </div>
            <div className="product-body">
              <h3>Clean Agent (HFC-236fa)</h3>
              <p>Eco-friendly, non-conductive gas — ideal for data centres, banks, hospitals and car interiors.</p>
              <div className="chips"><span>2 kg</span><span>4 kg</span><span>6 kg</span></div>
            </div>
          </div>
          <div className="product reveal">
            <div className="product-top" style={{ background: "linear-gradient(135deg,#f6efff,#e6d8ff)" }}><span className="class">Automatic</span>
              <svg viewBox="0 0 80 160"><rect x="36" y="4" width="8" height="30" fill="#333"></rect><rect x="8" y="2" width="64" height="6" rx="3" fill="#555"></rect><circle cx="40" cy="92" r="40" fill="url(#gRed)"></circle><rect x="24" y="80" width="32" height="24" rx="4" fill="#fff"></rect><text x="40" y="96" textAnchor="middle" fontFamily="Oswald,Arial" fontWeight="700" fontSize="9" fill="#d7261e">AUTO</text><circle cx="40" cy="138" r="5" fill="#333"></circle><rect x="38" y="130" width="4" height="6" fill="#333"></rect></svg>
            </div>
            <div className="product-body">
              <h3>Modular / Ceiling Mounted</h3>
              <p>Automatic heat-activated extinguishers for kitchens, electrical rooms and storage areas.</p>
              <div className="chips"><span>5 kg</span><span>10 kg</span><span>Heat Sensing</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

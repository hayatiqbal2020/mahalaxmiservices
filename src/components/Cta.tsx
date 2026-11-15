import { site } from "@/lib/site";

export default function Cta() {
  return (
    <section className="cta">
      <div className="container">
        <div>
          <h2>Is Your Fire Extinguisher Due for Refilling?</h2>
          <p>Expired extinguishers may fail in an emergency. Get them checked today — free inspection!</p>
        </div>
        <a href={site.telHref} className="btn btn-white">📞 Call {site.phone}</a>
      </div>
    </section>
  );
}

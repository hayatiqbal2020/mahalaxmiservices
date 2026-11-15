import { ImageResponse } from "next/og";

// Preview picture shown when the site link is shared on WhatsApp, Facebook etc.
export const alt = "Mahalaxmi Services – Fire Safety Solutions, Ranchi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#fff",
          background: "linear-gradient(120deg,#0d0d0f 0%,#2a0d0b 55%,#5a0f0a 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#d7261e,#ff6a00)",
            }}
          >
            <svg width="70" height="70" viewBox="0 0 24 24">
              <path
                d="M12 2c1 3.5 5 5.6 5 10.5A5 5 0 0 1 7 13c0-2 1-3.6 2.2-4.6-.1 1.7.6 3 1.8 3.6C10.6 8.5 11 5 12 2Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: 1 }}>
              MAHALAXMI <span style={{ color: "#ff6a00", marginLeft: 18 }}>SERVICES</span>
            </div>
            <div style={{ fontSize: 28, letterSpacing: 6, color: "#ccc" }}>
              FIRE SAFETY SOLUTIONS
            </div>
          </div>
        </div>
        <div style={{ marginTop: 60, fontSize: 44, fontWeight: 700 }}>
          Fire Extinguisher Sales, Refilling &amp; AMC
        </div>
        <div style={{ marginTop: 16, fontSize: 32, color: "#ffb400" }}>
          Ranchi, Jharkhand · +91 9304126825
        </div>
      </div>
    ),
    size,
  );
}

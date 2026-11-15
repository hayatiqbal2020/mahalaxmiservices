"use client";

import { useEffect, useState } from "react";

// Full-screen loader shown until the page is interactive.
export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(true);
    if (document.readyState === "complete") {
      hide();
      return;
    }
    window.addEventListener("load", hide, { once: true });
    return () => window.removeEventListener("load", hide);
  }, []);

  return (
    <div className={`loader${hidden ? " hide" : ""}`} aria-hidden={hidden}>
      <div className="loader-inner">
        <div className="loader-ring">
          <div className="logo-icon">
            <svg width="30" height="30" viewBox="0 0 24 24">
              <path
                d="M12 2c1 3.5 5 5.6 5 10.5A5 5 0 0 1 7 13c0-2 1-3.6 2.2-4.6-.1 1.7.6 3 1.8 3.6C10.6 8.5 11 5 12 2Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        <div>
          <strong>
            MAHALAXMI <em>SERVICES</em>
          </strong>
        </div>
        <small>Fire Safety Solutions</small>
      </div>
    </div>
  );
}

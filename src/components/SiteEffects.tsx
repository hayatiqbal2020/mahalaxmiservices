"use client";

import { useEffect } from "react";

// Reveal-on-scroll, stat counters and the footer year.
export default function SiteEffects() {
  useEffect(() => {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const animateCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const dur = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent =
          Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN") +
          (p === 1 ? "+" : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("show");
          e.target
            .querySelectorAll<HTMLElement>("[data-count]")
            .forEach(animateCount);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

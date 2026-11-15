"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container nav">
        <a href="#home" className="logo">
          <div className="logo-icon"><svg width="26" height="26"><use href="#flame"></use></svg></div>
          <div className="logo-text"><strong>MAHALAXMI <em>SERVICES</em></strong><small>Fire Safety Solutions</small></div>
        </a>
        <ul
          className={`nav-links${open ? " open" : ""}`}
          id="navLinks"
          onClick={() => setOpen(false)}
        >
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#why">Why Us</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact" className="btn btn-primary">Get Free Quote</a></li>
        </ul>
        <button
          className={`menu-btn${open ? " open" : ""}`}
          id="menuBtn"
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
        ><span></span><span></span><span></span></button>
      </div>
    </header>
  );
}

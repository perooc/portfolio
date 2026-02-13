"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // por si ya carga scrolleado
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#inicio"
              className={`flex items-center space-x-2 transition-all duration-300 ease-in-out
    ${isMobileMenuOpen ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}
    md:opacity-100 md:translate-y-0 md:pointer-events-auto
  `}
            >
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-light">
                PEROOC
              </span>
            </a>

            {/* Links de navegación - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-accent hover:text-secondary transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}

              {/* CTA Button */}
              <a
                href="#contacto"
                className="px-6 py-2.5 bg-primary-light hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Solicitar Demo
              </a>
            </div>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden text-white p-2 z-50 relative"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay oscuro */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Menú móvil - Slide desde la derecha */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-primary shadow-2xl z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Logo en el menú móvil */}
          <div className="mb-8">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-light">
              PEROOC
            </span>
            <p className="text-accent text-sm mt-2">
              Soluciones SaaS de última generación
            </p>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block text-accent hover:text-secondary hover:bg-white/5 transition-all duration-200 font-medium py-4 px-4 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button en móvil */}
          <div className="pb-8">
            <a
              href="#contacto"
              onClick={handleLinkClick}
              className="block w-full text-center px-6 py-4 bg-primary-light hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

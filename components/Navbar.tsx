'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/#filmografia', label: 'Filmografía' },
  { href: '/#galeria', label: 'Galería' },
  { href: '/#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fdfcf9]/90 backdrop-blur-md shadow-sm border-b border-[#e2d0c4]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo SVG */}
        <Link href="/" aria-label="Inicio" className="flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
            <circle cx="18" cy="18" r="17" stroke="#8faa8f" strokeWidth="1.5" />
            <text x="18" y="23" textAnchor="middle" fontFamily="serif" fontSize="14" fontStyle="italic" fill="#3d3831">AH</text>
          </svg>
          <span className="font-[var(--font-display)] text-[#3d3831] text-sm tracking-widest uppercase hidden sm:block">
            Aythami Hernandez
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-[#7a6e66] hover:text-[#3d3831] tracking-wide transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#7a6e66] hover:text-[#3d3831] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#fdfcf9]/95 backdrop-blur-md border-b border-[#e2d0c4] overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-base text-[#7a6e66] hover:text-[#3d3831] tracking-wide transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

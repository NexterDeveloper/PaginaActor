'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Props {
  name: string;
  tagline: string;
  headshotUrl?: string;
}

export default function HeroSection({ name, tagline, headshotUrl }: Props) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fdfcf9 0%, #f5ede3 50%, #ecddd0 100%)' }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-xs tracking-[0.3em] uppercase text-[#b5a99f] mb-4"
          >
            Portfolio &mdash; Actor
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-[var(--font-display)] text-5xl md:text-7xl text-[#3d3831] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="text-lg text-[#7a6e66] mb-8"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#contacto"
              className="px-6 py-3 rounded-full text-sm font-medium bg-[#8faa8f] text-white hover:bg-[#6b8a6b] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Contactar
            </a>
            <a
              href="#filmografia"
              className="px-6 py-3 rounded-full text-sm font-medium border border-[#d9c5b8] text-[#7a6e66] hover:bg-[#f5ede3] transition-all duration-200"
            >
              Ver trabajos
            </a>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex justify-center"
        >
          <div
            className="relative w-72 h-96 md:w-80 md:h-[480px] rounded-2xl overflow-hidden shadow-lg"
            style={{ background: 'linear-gradient(135deg, #ecddd0 0%, #e2d0c4 100%)' }}
          >
            {headshotUrl ? (
              <img src={headshotUrl} alt={`Foto de ${name}`} className="w-full h-full object-cover" loading="eager" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-label="Foto de perfil">
                  <circle cx="40" cy="32" r="18" stroke="#b5a99f" strokeWidth="1.5" fill="none" />
                  <path d="M10 74c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#b5a99f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            )}
            {/* Decorative frame */}
            <div className="absolute inset-0 rounded-2xl border border-[#d9c5b8]/40 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#sobre-mi"
        aria-label="Scroll hacia abajo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#b5a99f] hover:text-[#8faa8f] transition-colors"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
}

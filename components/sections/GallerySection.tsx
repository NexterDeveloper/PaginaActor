'use client';
import AnimatedSection from '@/components/AnimatedSection';
import type { GalleryImage } from '@/lib/types';
import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: GalleryImage[];
}

export default function GallerySection({ images }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  if (images.length === 0) {
    return (
      <section id="galeria" className="py-24 bg-[#fdfcf9]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#b5a99f] mb-3">Galería</p>
            <h2 className="font-[var(--font-display)] text-4xl text-[#3d3831] mb-6" style={{ fontFamily: 'var(--font-display)' }}>Fotografías</h2>
            <div className="rounded-2xl bg-[#faf7f1] border border-[#e2d0c4] p-16 text-center">
              <svg className="mx-auto mb-4 text-[#b5a99f]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
              <p className="text-[#b5a99f] text-sm">Las fotos aparecerán aquí una vez añadidas desde el panel de administración.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-24 bg-[#fdfcf9]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#b5a99f] mb-3">Galería</p>
          <h2 className="font-[var(--font-display)] text-4xl text-[#3d3831] mb-12" style={{ fontFamily: 'var(--font-display)' }}>Fotografías</h2>
        </AnimatedSection>

        <div className="columns-2 md:columns-3 gap-4">
          {images.map((img, i) => (
            <AnimatedSection key={img.id} delay={i * 60}>
              <button
                className="relative block w-full mb-4 rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setSelected(img)}
                aria-label={`Ver ${img.alt}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#3d3831]/0 group-hover:bg-[#3d3831]/10 transition-colors duration-300" />
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3d3831]/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.url} alt={selected.alt} className="w-full h-full object-contain" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-[#fdfcf9]/80 hover:bg-[#fdfcf9] text-[#3d3831] transition-colors"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

'use client';
import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Send } from 'lucide-react';

export default function ContactSection({ email }: { email: string }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 bg-[#faf7f1]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#b5a99f] mb-3">Contacto</p>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-[#3d3831] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Hablemos
          </h2>
          <p className="text-[#7a6e66] mb-12">
            Para proyectos, castings o colaboraciones: <a href={`mailto:${email}`} className="underline hover:text-[#3d3831] transition-colors">{email}</a>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <form onSubmit={handleSubmit} className="max-w-xl bg-[#fdfcf9] rounded-2xl p-8 border border-[#e2d0c4] shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-xs tracking-wide uppercase text-[#b5a99f] mb-1.5">Nombre</label>
                <input
                  id="name" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e2d0c4] bg-[#faf7f1] text-[#3d3831] text-sm focus:outline-none focus:border-[#8faa8f] focus:ring-1 focus:ring-[#8faa8f] transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs tracking-wide uppercase text-[#b5a99f] mb-1.5">Email</label>
                <input
                  id="contact-email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e2d0c4] bg-[#faf7f1] text-[#3d3831] text-sm focus:outline-none focus:border-[#8faa8f] focus:ring-1 focus:ring-[#8faa8f] transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-xs tracking-wide uppercase text-[#b5a99f] mb-1.5">Asunto</label>
              <input
                id="subject" required value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#e2d0c4] bg-[#faf7f1] text-[#3d3831] text-sm focus:outline-none focus:border-[#8faa8f] focus:ring-1 focus:ring-[#8faa8f] transition-colors"
                placeholder="Proyecto, casting..."
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-xs tracking-wide uppercase text-[#b5a99f] mb-1.5">Mensaje</label>
              <textarea
                id="message" required rows={4} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#e2d0c4] bg-[#faf7f1] text-[#3d3831] text-sm focus:outline-none focus:border-[#8faa8f] focus:ring-1 focus:ring-[#8faa8f] transition-colors resize-none"
                placeholder="Tu mensaje..."
              />
            </div>

            {status === 'success' && (
              <p className="text-sm text-[#6b8a6b] mb-4">✓ Mensaje enviado con éxito. Te respondo pronto.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-[#c07c72] mb-4">× Algo salió mal. Inténtalo de nuevo.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8faa8f] text-white text-sm font-medium hover:bg-[#6b8a6b] disabled:opacity-60 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Send size={14} />
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}

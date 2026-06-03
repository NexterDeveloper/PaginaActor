'use client';
import AnimatedSection from '@/components/AnimatedSection';

interface Props {
  bio: string;
  bioExtended: string;
  height: string;
  hair: string;
  eyes: string;
  ageRange: string;
  reelUrl?: string;
}

export default function AboutSection({ bio, bioExtended, height, hair, eyes, ageRange, reelUrl }: Props) {
  const specs = [
    { label: 'Altura', value: height },
    { label: 'Cabello', value: hair },
    { label: 'Ojos', value: eyes },
    { label: 'Rango de edad', value: ageRange },
  ];

  return (
    <section id="sobre-mi" className="py-24 bg-[#fdfcf9]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#b5a99f] mb-3">Sobre mí</p>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-[#3d3831] mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            El Actor
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection delay={100}>
            <p className="text-[#7a6e66] text-base leading-relaxed mb-4">{bio}</p>
            <p className="text-[#7a6e66] text-base leading-relaxed">{bioExtended}</p>

            {reelUrl && (
              <a
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-[#d9c5b8] text-sm text-[#7a6e66] hover:bg-[#f5ede3] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Ver showreel
              </a>
            )}
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-[#faf7f1] rounded-2xl p-8 border border-[#e2d0c4]">
              <h3 className="text-sm font-medium tracking-widest uppercase text-[#b5a99f] mb-6">Ficha Técnica</h3>
              <dl className="grid grid-cols-2 gap-4">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-[#b5a99f] tracking-wide uppercase mb-1">{s.label}</dt>
                    <dd className="text-[#3d3831] font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

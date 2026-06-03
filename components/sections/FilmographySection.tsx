'use client';
import AnimatedSection from '@/components/AnimatedSection';
import type { Project } from '@/lib/types';
import { clsx } from 'clsx';

const typeLabels: Record<string, string> = {
  film: 'Cine',
  tv: 'Televisión',
  theater: 'Teatro',
  short: 'Cortometraje',
};

const typeColors: Record<string, string> = {
  film: 'bg-[#f7e8e4] text-[#c07c72]',
  tv: 'bg-[#e8efe8] text-[#6b8a6b]',
  theater: 'bg-[#f4ede0] text-[#c4a84a]',
  short: 'bg-[#ecddd0] text-[#7a6e66]',
};

interface Props {
  projects: Project[];
}

export default function FilmographySection({ projects }: Props) {
  return (
    <section id="filmografia" className="py-24 bg-[#faf7f1]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#b5a99f] mb-3">Filmografía</p>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-[#3d3831] mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            Trabajos
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 80}>
              <article className="group bg-[#fdfcf9] rounded-xl p-6 border border-[#e2d0c4] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={clsx('text-xs font-medium px-2.5 py-1 rounded-full', typeColors[project.type])}>
                    {typeLabels[project.type]}
                  </span>
                  <span className="text-sm text-[#b5a99f]">{project.year}</span>
                </div>
                <h3 className="font-[var(--font-display)] text-xl text-[#3d3831] mb-1" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                <p className="text-sm text-[#8faa8f] font-medium mb-2">{project.role}</p>
                <p className="text-sm text-[#7a6e66] leading-relaxed">{project.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

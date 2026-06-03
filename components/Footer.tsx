import Link from 'next/link';
import { Instagram, ExternalLink, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f5ede3] border-t border-[#e2d0c4] py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#7a6e66]">
          &copy; {new Date().getFullYear()} Aythami Hernandez. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          <a href="mailto:contacto@aythamihernandez.com" aria-label="Email" className="text-[#b5a99f] hover:text-[#8faa8f] transition-colors">
            <Mail size={18} />
          </a>
          <a href="https://instagram.com/aythamihernandez" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#b5a99f] hover:text-[#8faa8f] transition-colors">
            <Instagram size={18} />
          </a>
          <a href="https://imdb.com/name/nm0000000" target="_blank" rel="noopener noreferrer" aria-label="IMDb" className="text-[#b5a99f] hover:text-[#8faa8f] transition-colors">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

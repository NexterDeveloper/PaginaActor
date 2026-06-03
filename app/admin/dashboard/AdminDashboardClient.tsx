'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Film, Image, Mail, LogOut, ChevronRight, Plus, Eye
} from 'lucide-react';
import { defaultProjects, defaultProfile } from '@/lib/default-content';

type Tab = 'overview' | 'projects' | 'gallery' | 'messages';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'projects', label: 'Filmografía', icon: Film },
  { id: 'gallery', label: 'Galería', icon: Image },
  { id: 'messages', label: 'Mensajes', icon: Mail },
];

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-bg, #fdfcf9)' }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#faf7f1] border-r border-[#e2d0c4] flex flex-col">
        <div className="px-6 py-6 border-b border-[#e2d0c4]">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="#8faa8f" strokeWidth="1.5" />
              <text x="18" y="23" textAnchor="middle" fontFamily="serif" fontSize="14" fontStyle="italic" fill="#3d3831">AH</text>
            </svg>
            <div>
              <p className="text-sm font-medium text-[#3d3831]">Admin</p>
              <p className="text-xs text-[#b5a99f]">Panel de control</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#e8efe8] text-[#3d3831] font-medium'
                      : 'text-[#7a6e66] hover:bg-[#f5ede3]'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-3 py-4 border-t border-[#e2d0c4]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#7a6e66] hover:bg-[#f5ede3] transition-all duration-200 mb-1"
          >
            <Eye size={16} />
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#c07c72] hover:bg-[#f7e8e4] transition-all duration-200"
          >
            <LogOut size={16} />
            {loggingOut ? 'Saliendo...' : 'Cerrar sesión'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'messages' && <MessagesTab />}
      </main>
    </div>
  );
}

function OverviewTab() {
  const stats = [
    { label: 'Proyectos', value: defaultProjects.length, color: 'bg-[#e8efe8] text-[#6b8a6b]' },
    { label: 'Fotos en galería', value: 0, color: 'bg-[#f7e8e4] text-[#c07c72]' },
    { label: 'Mensajes nuevos', value: 0, color: 'bg-[#f4ede0] text-[#c4a84a]' },
  ];
  return (
    <div>
      <h1 className="text-2xl text-[#3d3831] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Resumen</h1>
      <p className="text-sm text-[#b5a99f] mb-8">Bienvenido al panel de administración</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#fdfcf9] rounded-xl p-6 border border-[#e2d0c4]">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 ${s.color}`}>
              <span className="text-lg font-semibold">{s.value}</span>
            </div>
            <p className="text-sm text-[#7a6e66]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#fdfcf9] rounded-xl p-6 border border-[#e2d0c4]">
        <h2 className="text-base font-medium text-[#3d3831] mb-2">Perfil del actor</h2>
        <dl className="grid sm:grid-cols-2 gap-3">
          {Object.entries(defaultProfile).filter(([k]) => k !== 'bio_extended' && k !== 'headshot_url' && k !== 'reel_url').map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs uppercase tracking-wide text-[#b5a99f]">{k.replace(/_/g, ' ')}</dt>
              <dd className="text-sm text-[#3d3831] truncate">{v || '—'}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-[#b5a99f] mt-4">
          ℹ️ Para editar el perfil, modifica <code className="bg-[#f5ede3] px-1 rounded">lib/default-content.ts</code> o conecta Supabase para edición dinámica.
        </p>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-[#3d3831]" style={{ fontFamily: 'var(--font-display)' }}>Filmografía</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8faa8f] text-white text-sm hover:bg-[#6b8a6b] transition-colors">
          <Plus size={14} /> Nuevo
        </button>
      </div>
      <div className="space-y-3">
        {defaultProjects.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-[#fdfcf9] rounded-xl px-5 py-4 border border-[#e2d0c4]">
            <div>
              <p className="text-sm font-medium text-[#3d3831]">{p.title}</p>
              <p className="text-xs text-[#b5a99f]">{p.role} &bull; {p.year} &bull; {p.type}</p>
            </div>
            <ChevronRight size={16} className="text-[#b5a99f]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-[#3d3831]" style={{ fontFamily: 'var(--font-display)' }}>Galería</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8faa8f] text-white text-sm hover:bg-[#6b8a6b] transition-colors">
          <Plus size={14} /> Subir foto
        </button>
      </div>
      <div className="bg-[#faf7f1] rounded-xl border border-[#e2d0c4] p-16 text-center">
        <svg className="mx-auto mb-4 text-[#b5a99f]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        <p className="text-sm text-[#b5a99f]">No hay fotos todavía. Sube fotos para mostrarlas en la galería pública.</p>
      </div>
    </div>
  );
}

function MessagesTab() {
  return (
    <div>
      <h1 className="text-2xl text-[#3d3831] mb-6" style={{ fontFamily: 'var(--font-display)' }}>Mensajes</h1>
      <div className="bg-[#faf7f1] rounded-xl border border-[#e2d0c4] p-16 text-center">
        <svg className="mx-auto mb-4 text-[#b5a99f]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <p className="text-sm text-[#b5a99f]">No hay mensajes todavía. Los mensajes del formulario de contacto aparecerán aquí.</p>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Film, Image, Mail, LogOut, Eye,
  Plus, Pencil, Trash2, Check, X, Upload, RefreshCw,
  User, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';

type Tab = 'overview' | 'profile' | 'projects' | 'gallery' | 'messages';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview',  label: 'Resumen',     icon: LayoutDashboard },
  { id: 'profile',   label: 'Perfil',      icon: User },
  { id: 'projects',  label: 'Filmografía', icon: Film },
  { id: 'gallery',   label: 'Galería',     icon: Image },
  { id: 'messages',  label: 'Mensajes',    icon: Mail },
];

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loggingOut, setLoggingOut] = useState(false);
  const [stats, setStats] = useState({ projects: 0, gallery: 0, messages: 0, unread: 0 });

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {});
  }, [activeTab]);

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
                    activeTab === tab.id ? 'bg-[#e8efe8] text-[#3d3831] font-medium' : 'text-[#7a6e66] hover:bg-[#f5ede3]'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {tab.id === 'messages' && stats.unread > 0 && (
                    <span className="ml-auto bg-[#c07c72] text-white text-xs rounded-full px-1.5 py-0.5 leading-none">{stats.unread}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-3 py-4 border-t border-[#e2d0c4]">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#7a6e66] hover:bg-[#f5ede3] transition-all duration-200 mb-1">
            <Eye size={16} /> Ver sitio <ExternalLink size={12} className="ml-auto" />
          </a>
          <button onClick={handleLogout} disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#c07c72] hover:bg-[#f7e8e4] transition-all duration-200">
            <LogOut size={16} />
            {loggingOut ? 'Saliendo...' : 'Cerrar sesión'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        {activeTab === 'overview'  && <OverviewTab  stats={stats} onNavigate={setActiveTab} />}
        {activeTab === 'profile'   && <ProfileTab />}
        {activeTab === 'projects'  && <ProjectsTab />}
        {activeTab === 'gallery'   && <GalleryTab />}
        {activeTab === 'messages'  && <MessagesTab />}
      </main>
    </div>
  );
}

/* ─── OVERVIEW ─── */
function OverviewTab({ stats, onNavigate }: { stats: any; onNavigate: (t: Tab) => void }) {
  const cards = [
    { label: 'Proyectos',      value: stats.projects, color: 'bg-[#e8efe8] text-[#6b8a6b]', tab: 'projects' as Tab },
    { label: 'Fotos',          value: stats.gallery,  color: 'bg-[#f7e8e4] text-[#c07c72]', tab: 'gallery'  as Tab },
    { label: 'Mensajes nuevos', value: stats.unread,   color: 'bg-[#f4ede0] text-[#c4a84a]', tab: 'messages' as Tab },
  ];
  return (
    <div>
      <h1 className="text-2xl text-[#3d3831] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Resumen</h1>
      <p className="text-sm text-[#b5a99f] mb-8">Bienvenido al panel de administración</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <button key={c.label} onClick={() => onNavigate(c.tab)}
            className="text-left bg-[#fdfcf9] rounded-xl p-6 border border-[#e2d0c4] hover:border-[#8faa8f] hover:shadow-sm transition-all duration-200">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 text-lg font-semibold ${c.color}`}>
              {c.value}
            </div>
            <p className="text-sm text-[#7a6e66]">{c.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── PROFILE ─── */
const PROFILE_FIELDS = [
  { key: 'name',        label: 'Nombre completo',   type: 'text' },
  { key: 'tagline',     label: 'Tagline',            type: 'text' },
  { key: 'email',       label: 'Email de contacto', type: 'email' },
  { key: 'phone',       label: 'Teléfono',          type: 'text' },
  { key: 'location',    label: 'Ubicación',         type: 'text' },
  { key: 'age',         label: 'Edad',              type: 'text' },
  { key: 'height',      label: 'Altura',            type: 'text' },
  { key: 'hair',        label: 'Color de pelo',     type: 'text' },
  { key: 'eyes',        label: 'Color de ojos',     type: 'text' },
  { key: 'languages',   label: 'Idiomas',           type: 'text' },
  { key: 'skills',      label: 'Habilidades',       type: 'text' },
  { key: 'agency',      label: 'Agencia / Reel URL', type: 'text' },
  { key: 'bio',         label: 'Biografía corta',   type: 'textarea' },
  { key: 'bio_extended',label: 'Biografía completa', type: 'textarea' },
];

function ProfileTab() {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/profile').then(r => r.json()).then(d => { setFields(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-[#3d3831]" style={{ fontFamily: 'var(--font-display)' }}>Perfil</h1>
          <p className="text-sm text-[#b5a99f]">Información pública del actor</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#8faa8f] text-white text-sm hover:bg-[#6b8a6b] transition-colors disabled:opacity-60">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : saved ? <Check size={14} /> : null}
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>
      <div className="bg-[#fdfcf9] rounded-xl border border-[#e2d0c4] p-6 grid sm:grid-cols-2 gap-5">
        {PROFILE_FIELDS.map(({ key, label, type }) => (
          <div key={key} className={type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label className="block text-xs uppercase tracking-wide text-[#b5a99f] mb-1">{label}</label>
            {type === 'textarea' ? (
              <textarea rows={4} value={fields[key] || ''}
                onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                className="w-full rounded-lg border border-[#e2d0c4] bg-[#faf7f1] px-3 py-2 text-sm text-[#3d3831] focus:outline-none focus:border-[#8faa8f] resize-none transition" />
            ) : (
              <input type={type} value={fields[key] || ''}
                onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                className="w-full rounded-lg border border-[#e2d0c4] bg-[#faf7f1] px-3 py-2 text-sm text-[#3d3831] focus:outline-none focus:border-[#8faa8f] transition" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PROJECTS ─── */
type Project = { id?: string; title: string; role: string; year: number; type: string; description: string; image_url: string; trailer_url: string; order_index: number };
const emptyProject: Omit<Project, 'id'> = { title: '', role: '', year: new Date().getFullYear(), type: 'film', description: '', image_url: '', trailer_url: '', order_index: 0 };

function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = () => fetch('/api/admin/projects').then(r => r.json()).then(d => { setProjects(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = isNew ? 'POST' : 'PUT';
    await fetch('/api/admin/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    setEditing(null); setIsNew(false); load();
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
    load();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-[#3d3831]" style={{ fontFamily: 'var(--font-display)' }}>Filmografía</h1>
        <button onClick={() => { setEditing({ ...emptyProject }); setIsNew(true); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8faa8f] text-white text-sm hover:bg-[#6b8a6b] transition-colors">
          <Plus size={14} /> Nuevo proyecto
        </button>
      </div>

      {editing && (
        <div className="bg-[#fdfcf9] rounded-xl border border-[#8faa8f] p-6 mb-6">
          <h2 className="text-base font-medium text-[#3d3831] mb-4">{isNew ? 'Nuevo proyecto' : 'Editar proyecto'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              ['title',       'Título',       'text'],
              ['role',        'Rol',          'text'],
              ['year',        'Año',          'number'],
              ['image_url',   'URL imagen',   'text'],
              ['trailer_url', 'URL trailer',  'text'],
              ['order_index', 'Orden',        'number'],
            ] as [keyof Project, string, string][]).map(([k, l, t]) => (
              <div key={k}>
                <label className="block text-xs uppercase tracking-wide text-[#b5a99f] mb-1">{l}</label>
                <input type={t} value={(editing as any)[k] || ''}
                  onChange={e => setEditing(p => ({ ...p!, [k]: t === 'number' ? +e.target.value : e.target.value }))}
                  className="w-full rounded-lg border border-[#e2d0c4] bg-[#faf7f1] px-3 py-2 text-sm text-[#3d3831] focus:outline-none focus:border-[#8faa8f] transition" />
              </div>
            ))}
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#b5a99f] mb-1">Tipo</label>
              <select value={editing.type} onChange={e => setEditing(p => ({ ...p!, type: e.target.value }))}
                className="w-full rounded-lg border border-[#e2d0c4] bg-[#faf7f1] px-3 py-2 text-sm text-[#3d3831] focus:outline-none focus:border-[#8faa8f] transition">
                <option value="film">Cine</option>
                <option value="tv">TV / Serie</option>
                <option value="theater">Teatro</option>
                <option value="short">Cortometraje</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wide text-[#b5a99f] mb-1">Descripción</label>
              <textarea rows={3} value={editing.description || ''}
                onChange={e => setEditing(p => ({ ...p!, description: e.target.value }))}
                className="w-full rounded-lg border border-[#e2d0c4] bg-[#faf7f1] px-3 py-2 text-sm text-[#3d3831] focus:outline-none focus:border-[#8faa8f] resize-none transition" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8faa8f] text-white text-sm hover:bg-[#6b8a6b] transition-colors">
              <Check size={14} /> Guardar
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e2d0c4] text-[#7a6e66] text-sm hover:bg-[#f5ede3] transition-colors">
              <X size={14} /> Cancelar
            </button>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <EmptyState icon={Film} text="No hay proyectos. Añade el primero con el botón de arriba." />
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-[#fdfcf9] rounded-xl px-5 py-4 border border-[#e2d0c4] hover:border-[#8faa8f] transition-colors">
              <div>
                <p className="text-sm font-medium text-[#3d3831]">{p.title}</p>
                <p className="text-xs text-[#b5a99f] mt-0.5">{p.role} &bull; {p.year} &bull; {p.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setEditing({ ...p }); setIsNew(false); }}
                  className="p-2 rounded-lg text-[#b5a99f] hover:text-[#3d3831] hover:bg-[#f5ede3] transition-colors"><Pencil size={14} /></button>
                <button onClick={() => del(p.id!)}
                  className="p-2 rounded-lg text-[#b5a99f] hover:text-[#c07c72] hover:bg-[#f7e8e4] transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── GALLERY ─── */
type GalleryImage = { id: string; url: string; alt: string; caption: string; order_index: number };

function GalleryTab() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => fetch('/api/admin/gallery').then(r => r.json()).then(d => { setImages(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    await fetch('/api/admin/gallery', { method: 'POST', body: form });
    setUploading(false);
    load();
    if (fileRef.current) fileRef.current.value = '';
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar esta foto?')) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
    load();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-[#3d3831]" style={{ fontFamily: 'var(--font-display)' }}>Galería</h1>
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8faa8f] text-white text-sm hover:bg-[#6b8a6b] transition-colors disabled:opacity-60">
          {uploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? 'Subiendo...' : 'Subir foto'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={upload} />
      </div>

      {images.length === 0 ? (
        <EmptyState icon={Image} text="No hay fotos. Sube la primera con el botón de arriba." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden border border-[#e2d0c4] aspect-square bg-[#faf7f1]">
              <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => del(img.id)}
                  className="p-2 rounded-full bg-white/90 text-[#c07c72] hover:bg-white transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MESSAGES ─── */
type Message = { id: string; name: string; email: string; subject: string; message: string; read: boolean; created_at: string };

function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => fetch('/api/admin/messages').then(r => r.json()).then(d => { setMessages(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/messages?id=${id}`, { method: 'PATCH' });
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje?')) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
    load();
  };

  const toggle = (id: string) => {
    setExpanded(e => e === id ? null : id);
    const msg = messages.find(m => m.id === id);
    if (msg && !msg.read) markRead(id);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-[#3d3831]" style={{ fontFamily: 'var(--font-display)' }}>Mensajes</h1>
        <span className="text-sm text-[#b5a99f]">{messages.filter(m => !m.read).length} sin leer</span>
      </div>

      {messages.length === 0 ? (
        <EmptyState icon={Mail} text="No hay mensajes todavía. Los del formulario de contacto aparecerán aquí." />
      ) : (
        <div className="space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={`rounded-xl border transition-colors ${
              !m.read ? 'border-[#8faa8f] bg-[#f4f8f4]' : 'border-[#e2d0c4] bg-[#fdfcf9]'
            }`}>
              <button onClick={() => toggle(m.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  {!m.read && <span className="w-2 h-2 rounded-full bg-[#8faa8f] shrink-0" />}
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${!m.read ? 'font-semibold text-[#3d3831]' : 'text-[#3d3831]'}`}>{m.name}</p>
                    <p className="text-xs text-[#b5a99f] truncate">{m.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-xs text-[#b5a99f]">{new Date(m.created_at).toLocaleDateString('es-ES')}</span>
                  {expanded === m.id ? <ChevronUp size={14} className="text-[#b5a99f]" /> : <ChevronDown size={14} className="text-[#b5a99f]" />}
                </div>
              </button>
              {expanded === m.id && (
                <div className="px-5 pb-5 border-t border-[#e2d0c4]">
                  <p className="text-xs text-[#b5a99f] mt-3 mb-1">De: <span className="text-[#3d3831]">{m.name}</span> &lt;{m.email}&gt;</p>
                  <p className="text-sm text-[#3d3831] whitespace-pre-wrap mt-2">{m.message}</p>
                  <div className="flex gap-2 mt-4">
                    <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8efe8] text-[#6b8a6b] text-xs hover:bg-[#d0e0d0] transition-colors">
                      Responder
                    </a>
                    <button onClick={() => del(m.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#c07c72] border border-[#e2d0c4] text-xs hover:bg-[#f7e8e4] transition-colors">
                      <Trash2 size={11} /> Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── SHARED ─── */
function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <RefreshCw size={20} className="animate-spin text-[#8faa8f]" />
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="bg-[#faf7f1] rounded-xl border border-[#e2d0c4] p-16 text-center">
      <Icon size={36} className="mx-auto mb-4 text-[#b5a99f]" />
      <p className="text-sm text-[#b5a99f] max-w-xs mx-auto">{text}</p>
    </div>
  );
}

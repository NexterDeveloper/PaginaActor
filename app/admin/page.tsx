'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Contraseña incorrecta');
        return;
      }
      router.push('/admin/dashboard');
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(160deg, #fdfcf9 0%, #f5ede3 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-full bg-[#e8efe8] flex items-center justify-center mb-4">
            <Lock size={24} className="text-[#6b8a6b]" />
          </div>
          <h1
            className="text-2xl text-[#3d3831] mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Panel de Administración
          </h1>
          <p className="text-sm text-[#b5a99f]">Introduce tu contraseña para continuar</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#fdfcf9] rounded-2xl p-8 border border-[#e2d0c4] shadow-sm"
        >
          <div className="mb-5">
            <label htmlFor="admin-password" className="block text-xs tracking-wide uppercase text-[#b5a99f] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPw ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-[#e2d0c4] bg-[#faf7f1] text-[#3d3831] text-sm focus:outline-none focus:border-[#8faa8f] focus:ring-1 focus:ring-[#8faa8f] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5a99f] hover:text-[#7a6e66] transition-colors"
                aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-[#c07c72] mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-[#8faa8f] text-white text-sm font-medium hover:bg-[#6b8a6b] disabled:opacity-60 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-[#b5a99f]">
          <a href="/" className="hover:text-[#7a6e66] transition-colors">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}

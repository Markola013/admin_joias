// app/login/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gem, Lock, Mail, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de autenticação
    setTimeout(() => {
      if (email === "admin@joias.com" && password === "123456") {
        router.push('/');
      } else {
        alert("Credenciais inválidas. Tente admin@joias.com | 123456");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden border border-gray-100">
        
        {/* Topo Decorativo */}
        <div className="bg-admin-accent p-8 text-center text-white">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
            <Gem size={40} fill="white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Bem-vindo</h1>
          <p className="text-blue-100 opacity-90">Gestão de Joias & Clientes</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-admin-accent transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent focus:bg-white outline-none transition-all text-gray-800"
                  placeholder="admin@joias.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Senha de Acesso</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-admin-accent transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent focus:bg-white outline-none transition-all text-gray-800"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-admin-accent focus:ring-admin-accent" />
                Lembrar acesso
              </label>
              <button type="button" className="text-sm text-admin-accent hover:underline font-medium">Esqueceu a senha?</button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-admin-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar no Painel
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Acesso restrito à equipe técnica e administradores.
          </p>
        </div>
      </div>
    </div>
  );
}
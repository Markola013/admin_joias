// components/layout/Sidebar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gem, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/' },
    { name: 'Produtos (Joias)', icon: <Gem size={20} />, href: '/produtos' },
    { name: 'Vendas Realizadas', icon: <ShoppingCart size={20} />, href: '/vendas' },
    { name: 'Gestão de Clientes', icon: <Users size={20} />, href: '/clientes' },
    { name: 'Configurações', icon: <Settings size={20} />, href: '/config' },
  ];

  return (
    <aside className="w-64 bg-admin-sidebar border-r border-gray-200 min-h-screen p-4 flex flex-col shadow-sm">
      {/* Logo com destaque em azul */}
      <div className="text-2xl font-bold mb-10 px-2 flex items-center gap-2 text-admin-accent">
        <Gem fill="currentColor" className="animate-pulse" /> 
        <span className="text-gray-800 tracking-tight">JoiasAdmin</span>
      </div>
      
      {/* Navegação Principal */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive 
                ? 'bg-blue-50 text-admin-accent font-bold shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-admin-accent'
              }`}
            >
              <span className={isActive ? "text-admin-accent" : "text-gray-400"}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="pt-4 border-t border-gray-100">
        <Link 
          href="/login" 
          className="flex items-center gap-3 p-3 text-gray-400 hover:text-admin-danger hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span>Sair do Sistema</span>
        </Link>
      </div>
    </aside>
  );
}
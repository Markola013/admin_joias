// app/clientes/page.tsx
"use client";
import { useEffect, useState } from 'react';
import ClientesTable from '@/components/ClientesTable';
import ClienteForm from '@/components/ClienteForm';
import { Plus, Users, RefreshCw } from 'lucide-react';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/clientes');
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-admin-accent" /> Gestão de Clientes
          </h1>
          <p className="text-gray-500">Visualize e gerencie os dados dos seus clientes</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={fetchClientes}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-admin-success text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-emerald-100"
          >
            <Plus size={20} /> Novo Cliente
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Buscando dados no banco Vercel...</div>
      ) : (
        <ClientesTable clientes={clientes} />
      )}

      {isModalOpen && (
        <ClienteForm 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchClientes} 
        />
      )}
    </div>
  );
}
"use client";
import { useEffect, useState, useMemo } from 'react';
import JoiasTable from '@/components/JoiasTable';
import JoiaForm from '@/components/JoiaForm';
import { Plus, Gem, RefreshCw, Search, AlertCircle } from 'lucide-react';

// 1. Definimos o molde da Joia para o TypeScript não reclamar
interface Joia {
  id: number;
  nome: string;
  sku: string;
  preco: number;
  estoque: number;
  material?: string;
  imagem_url?: string;
}

export default function ProdutosPage() {
  const [joias, setJoias] = useState<Joia[]>([]); // Tipado como array de Joia
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joiaParaEditar, setJoiaParaEditar] = useState<Joia | null>(null);
  const [busca, setBusca] = useState('');

  const carregarJoias = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/joias');
      if (!res.ok) throw new Error('Falha ao carregar');
      const data = await res.json();
      setJoias(data);
    } catch (error) {
      console.error("Erro ao carregar joias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarJoias(); }, []);

  // 2. Filtro Corrigido com Verificação de Segurança
  const joiasFiltradas = useMemo(() => {
    if (!Array.isArray(joias)) return [];
    
    return joias.filter((j) => {
      const nome = j?.nome?.toLowerCase() || '';
      const sku = j?.sku?.toLowerCase() || '';
      const termo = busca.toLowerCase();
      return nome.includes(termo) || sku.includes(termo);
    });
  }, [busca, joias]);

  const handleEdit = (joia: Joia) => {
    setJoiaParaEditar(joia);
    setIsModalOpen(true);
  };

  const handleNovo = () => {
    setJoiaParaEditar(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir esta joia permanentemente?")) {
      try {
        const res = await fetch(`/api/joias/${id}`, { method: 'DELETE' });
        if (res.ok) carregarJoias();
      } catch (err) {
        alert("Erro ao deletar.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-admin-accent">
              <Gem size={28} />
            </div>
            Estoque de Joias
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie seu catálogo de produtos.</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={carregarJoias} className="p-3 text-gray-400 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          
          <button 
            onClick={handleNovo}
            className="flex-1 md:flex-none bg-admin-accent text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <Plus size={20} /> Nova Joia
          </button>
        </div>
      </div>

      {/* Busca */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-admin-accent transition-colors" size={20} />
        <input 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-admin-accent/10 focus:border-admin-accent transition-all shadow-sm"
          placeholder="Pesquisar joia ou SKU..." 
        />
      </div>

      {/* Conteúdo */}
      {loading ? (
        <div className="bg-white rounded-3xl p-20 text-center text-gray-400 border border-gray-100">
          <div className="w-10 h-10 border-4 border-admin-accent/20 border-t-admin-accent rounded-full animate-spin mx-auto mb-4" />
          <p>Sincronizando com Vercel...</p>
        </div>
      ) : joiasFiltradas.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-gray-100">
          <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-700">Nada encontrado</h3>
          <p className="text-gray-500">Tente outro termo ou cadastre uma joia.</p>
        </div>
      ) : (
        <JoiasTable 
          joias={joiasFiltradas} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {isModalOpen && (
        <JoiaForm 
          joiaParaEditar={joiaParaEditar} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={carregarJoias} 
        />
      )}
    </div>
  );
}
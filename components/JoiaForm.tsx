"use client";
import { useState, useEffect } from 'react';
import { X, Save, Gem, ImageIcon, Tag } from 'lucide-react';

interface JoiaFormProps {
  onClose: () => void;
  onSuccess: () => void;
  joiaParaEditar?: any; 
}

export default function JoiaForm({ onClose, onSuccess, joiaParaEditar }: JoiaFormProps) {
  const [formData, setFormData] = useState({
    nome: '', 
    material: '', 
    preco: '', 
    estoque: '', 
    categoria: '', 
    imagem_url: ''
    // SKU REMOVIDO DAQUI
  });

  useEffect(() => {
    if (joiaParaEditar) {
      setFormData({
        nome: joiaParaEditar.nome || '',
        material: joiaParaEditar.material || '',
        preco: joiaParaEditar.preco?.toString() || '',
        estoque: joiaParaEditar.estoque?.toString() || '',
        categoria: joiaParaEditar.categoria || '',
        imagem_url: joiaParaEditar.imagem_url || ''
      });
    }
  }, [joiaParaEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = joiaParaEditar ? 'PUT' : 'POST';
    const url = joiaParaEditar ? `/api/joias/${joiaParaEditar.id}` : '/api/joias';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preco: Number(formData.preco.toString().replace(',', '.')),
          estoque: Number(formData.estoque)
        }),
      });

      if (res.ok) { 
        onSuccess(); 
        onClose(); 
      } else {
        alert("Erro ao salvar. Verifique se os campos obrigatórios estão preenchidos.");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-admin-accent p-6 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Gem size={24} /> {joiaParaEditar ? 'Editar Joia' : 'Nova Joia'}
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Nome */}
            <div className="col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nome da Joia</label>
              <input 
                required 
                value={formData.nome} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-admin-accent/20 focus:bg-white transition-all" 
                onChange={e => setFormData({...formData, nome: e.target.value})} 
              />
            </div>

            {/* Categoria */}
            <div className="col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                <Tag size={14} /> Categoria
              </label>
              <input 
                required
                value={formData.categoria} 
                placeholder="Ex: Anéis, Colares, Pulseiras"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-admin-accent/20 focus:bg-white transition-all" 
                onChange={e => setFormData({...formData, categoria: e.target.value})} 
              />
            </div>

            {/* URL da Imagem */}
            <div className="col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                <ImageIcon size={14} /> URL da Imagem (Link)
              </label>
              <input 
                value={formData.imagem_url} 
                placeholder="https://link-da-imagem.com/foto.jpg"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-admin-accent/20 focus:bg-white transition-all" 
                onChange={e => setFormData({...formData, imagem_url: e.target.value})} 
              />
            </div>
            
            {/* Preço */}
            <div>
              <label className="text-sm font-bold text-gray-700 ml-1">Preço (R$)</label>
              <input 
                type="number" 
                step="0.01"
                required 
                value={formData.preco} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-admin-accent/20 focus:bg-white transition-all" 
                onChange={e => setFormData({...formData, preco: e.target.value})} 
              />
            </div>

            {/* Estoque */}
            <div>
              <label className="text-sm font-bold text-gray-700 ml-1">Estoque</label>
              <input 
                type="number" 
                required 
                value={formData.estoque} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-admin-accent/20 focus:bg-white transition-all" 
                onChange={e => setFormData({...formData, estoque: e.target.value})} 
              />
            </div>

            {/* Material - Ocupa a linha inteira agora que o SKU saiu */}
            <div className="col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Material</label>
              <input 
                value={formData.material} 
                placeholder="Ex: Prata 925, Ouro 18k"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-admin-accent/20 focus:bg-white transition-all" 
                onChange={e => setFormData({...formData, material: e.target.value})} 
              />
            </div>

          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-admin-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all mt-4 active:scale-95"
          >
            <Save size={20} /> {joiaParaEditar ? 'Salvar Alterações' : 'Cadastrar Joia'}
          </button>
        </form>
      </div>
    </div>
  );
}
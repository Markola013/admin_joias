"use client";
import { Edit, Trash2, Package, Gem } from 'lucide-react';

export default function JoiasTable({ data, onDelete, onEdit }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="p-4 font-bold text-gray-700">Produto</th>
            <th className="p-4 font-bold text-gray-700">Material</th>
            <th className="p-4 font-bold text-gray-700 text-center">Preço</th>
            <th className="p-4 font-bold text-gray-700 text-center">Estoque</th>
            <th className="p-4 font-bold text-gray-700 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item: any) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                {/* Nome e Imagem */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-admin-accent overflow-hidden border border-blue-100">
                      {item.imagem_url ? (
                        <img src={item.imagem_url} alt={item.nome} className="w-full h-full object-cover" />
                      ) : (
                        <Gem size={20} />
                      )}
                    </div>
                    <div>
                      <span className="block font-bold text-gray-800">{item.nome}</span>
                      <span className="text-xs text-blue-500 font-semibold uppercase">{item.categoria || 'Geral'}</span>
                    </div>
                  </div>
                </td>

                {/* Material */}
                <td className="p-4 text-gray-600 font-medium">
                  {item.material}
                </td>

                {/* Preço formatado */}
                <td className="p-4 text-center font-bold text-gray-900">
                  R$ {Number(item.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>

                {/* Estoque com cor dinâmica */}
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${
                    item.estoque <= 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {item.estoque} UN
                  </span>
                </td>

                {/* Ações */}
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-2 text-admin-accent hover:bg-blue-100 rounded-lg transition-all"
                      title="Editar Joia"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Excluir Joia"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-12 text-center">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Package size={40} strokeWidth={1} />
                  <p className="font-medium">Nenhuma joia encontrada no estoque.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
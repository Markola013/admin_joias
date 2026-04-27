// components/ClientesTable.tsx
"use client";
import { User, Phone, CreditCard, Mail } from 'lucide-react';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
}

export default function ClientesTable({ clientes }: { clientes: Cliente[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-gray-100">
          <tr>
            <th className="p-4 font-semibold text-gray-700">Cliente</th>
            <th className="p-4 font-semibold text-gray-700">Contato</th>
            <th className="p-4 font-semibold text-gray-700">Documento</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {clientes.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-8 text-center text-gray-500">
                Nenhum cliente cadastrado no banco da Vercel.
              </td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                      <User size={18} />
                    </div>
                    <span className="font-medium text-gray-900">{cliente.nome}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Mail size={14} /> {cliente.email}</span>
                    <span className="flex items-center gap-1"><Phone size={14} /> {cliente.telefone || 'N/A'}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard size={14} /> {cliente.cpf || 'Não informado'}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
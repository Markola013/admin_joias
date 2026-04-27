// components/ClienteForm.tsx
"use client";
import { useState } from 'react';
import { X, Save, User, Mail, Phone, CreditCard } from 'lucide-react';

export default function ClienteForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao salvar cliente");
      }
    } catch (err) {
      alert("Erro de conexão");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-admin-accent p-4 text-white flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <User size={20} /> Novo Cliente
          </h2>
          <button onClick={onClose} className="hover:bg-blue-600 p-1 rounded"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                <input 
                  type="email" required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                <input 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(11) 99999-9999"
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 text-gray-400" size={16} />
                <input 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="000.000.000-00"
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 py-2 bg-admin-success text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-emerald-100"
            >
              <Save size={18} /> Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
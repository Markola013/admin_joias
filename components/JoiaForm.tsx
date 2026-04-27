// components/JoiaForm.tsx
'use client';

import { useState } from 'react';

export default function JoiaForm({ onSubmit, initial }: any) {
  const [form, setForm] = useState(initial || {});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="grid grid-cols-2 gap-4"
    >
      <input placeholder="Nome" onChange={e => setForm({ ...form, nome: e.target.value })} />
      <input placeholder="Material" onChange={e => setForm({ ...form, material: e.target.value })} />
      <input type="number" placeholder="Preço" onChange={e => setForm({ ...form, preco: Number(e.target.value) })} />
      <input type="number" placeholder="Estoque" onChange={e => setForm({ ...form, estoque: Number(e.target.value) })} />
      <input placeholder="Categoria" onChange={e => setForm({ ...form, categoria: e.target.value })} />
      <input placeholder="SKU" onChange={e => setForm({ ...form, sku: e.target.value })} />
      <input placeholder="Imagem URL" onChange={e => setForm({ ...form, imagem_url: e.target.value })} />

      <button className="col-span-2 bg-black text-white p-2">
        Salvar
      </button>
    </form>
  );
}
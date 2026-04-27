// components/layout/Header.tsx
'use client';

import { useState } from 'react';

export default function Header({ onSearch }: { onSearch: (v: string) => void }) {
  const [value, setValue] = useState('');

  return (
    <header className="p-4 border-b flex justify-between">
      <input
        className="border p-2 w-80"
        placeholder="Buscar por nome ou SKU..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </header>
  );
}
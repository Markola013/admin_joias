// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import JoiasTable from '@/components/JoiasTable';
import Header from '@/components/layout/Header';

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
  const res = await fetch(`/api/joias?search=${search}`);
  const json = await res.json();

  // Garante que SEMPRE será array
  setData(Array.isArray(json) ? json : []);
};

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div>
      <Header onSearch={setSearch} />
      <JoiasTable data={data} onDelete={() => {}} onEdit={() => {}} />
    </div>
  );
  
}
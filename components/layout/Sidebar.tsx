// components/layout/Sidebar.tsx
export default function Sidebar() {
  const categorias = ['Anéis', 'Colares', 'Brincos', 'Relógios'];

  return (
    <aside className="w-64 bg-zinc-900 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Categorias</h2>
      <ul className="space-y-2">
        {categorias.map((cat) => (
          <li key={cat} className="hover:text-gold cursor-pointer">
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
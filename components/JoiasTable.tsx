// components/JoiasTable.tsx
import { formatCurrency } from '@/utils/format';

export default function JoiasTable({ data, onDelete, onEdit }: any) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-zinc-100">
          <th>Nome</th>
          <th>Material</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>SKU</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  {Array.isArray(data) && data.length > 0 ? (
    data.map((item: any) => (
      <tr key={item.id}>
        <td>{item.nome}</td>
        <td>{item.material}</td>
        <td>{item.preco}</td>
        <td>{item.estoque}</td>
        <td>{item.sku}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center py-4">
        Nenhum item encontrado
      </td>
    </tr>
  )}
</tbody>
    </table>
  );
}
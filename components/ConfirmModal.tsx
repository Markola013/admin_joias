// components/ConfirmModal.tsx
export default function ConfirmModal({ open, onConfirm, onCancel }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <p>Tem certeza que deseja excluir?</p>
        <div className="flex gap-4 mt-4">
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
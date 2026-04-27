// app/api/joias/[id]/route.ts
import { sql } from '@/lib/db';
import { joiaSchema } from '@/lib/validators/joias';
import { NextResponse } from 'next/server';

// PUT - EDITAR
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = joiaSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 });
  }

  const { nome, material, preco, estoque, categoria, sku, imagem_url } = parsed.data;

  try {
    await sql`
      UPDATE joias SET
        nome = ${nome},
        material = ${material},
        preco = ${preco},
        estoque = ${estoque},
        categoria = ${categoria},
        sku = ${sku},
        imagem_url = ${imagem_url},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM joias WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 });
  }
}
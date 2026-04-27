import { sql } from '@/lib/db';
import { joiaSchema } from '@/lib/validators/joias';
import { NextRequest, NextResponse } from 'next/server';

// PUT - EDITAR
export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Aguarda a resolução dos parâmetros
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
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  _: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Aguarda a resolução dos parâmetros
  
  try {
    await sql`DELETE FROM joias WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 });
  }
}